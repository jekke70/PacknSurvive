import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocFromServer,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Timestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

export const ADMIN_EMAIL = 'jerker70@gmail.com';
export const PRO_PURCHASES_COLLECTION = 'pro_purchases';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

export type PurchaseSource = 'stripe' | 'code' | 'admin_grant' | 'manual';
export type PurchaseStatus = 'active' | 'revoked';

export interface ProPurchaseRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  source: PurchaseSource;
  status: PurchaseStatus;
  amountSek: number;
  bonusCode: string;
  note: string;
  createdByUid: string;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ID_PATTERN = /^[a-zA-Z0-9_\-]+$/;
const VALID_SOURCES: PurchaseSource[] = ['stripe', 'code', 'admin_grant', 'manual'];
const VALID_STATUSES: PurchaseStatus[] = ['active', 'revoked'];

export function isAdminUser(user: User | null): boolean {
  return Boolean(
    user &&
      user.emailVerified === true &&
      (user.email || '').trim().toLowerCase() === ADMIN_EMAIL
  );
}

export async function signInWithGooglePopup(): Promise<User> {
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
}

export async function signOutFirebase(): Promise<void> {
  await signOut(auth);
}

export function subscribeAuth(cb: (user: User | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, cb);
}

function sanitizePurchaseId(rawId?: string): string {
  const base = rawId && ID_PATTERN.test(rawId) ? rawId : `pro_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  return base.slice(0, 128);
}

export async function createProPurchase(input: {
  id?: string;
  customerName: string;
  customerEmail: string;
  source: PurchaseSource;
  status?: PurchaseStatus;
  amountSek: number;
  bonusCode?: string;
  note?: string;
}): Promise<string> {
  const user = auth.currentUser;
  if (!user || !user.emailVerified) {
    throw new Error('Du måste vara inloggad med ett verifierat Google-konto.');
  }

  const customerName = String(input.customerName || '').trim().slice(0, 120);
  const customerEmail = String(input.customerEmail || '').trim().toLowerCase().slice(0, 160);
  const source: PurchaseSource = VALID_SOURCES.includes(input.source) ? input.source : 'manual';
  const status: PurchaseStatus = input.status && VALID_STATUSES.includes(input.status) ? input.status : 'active';
  const amountSek = Math.max(0, Math.min(9999, Number(input.amountSek) || 0));
  const bonusCode = String(input.bonusCode ?? 'PACKAPRO1MAN').trim().slice(0, 40);
  const note = String(input.note || '').trim().slice(0, 400);

  if (!customerName) {
    throw new Error('Ange ett namn för kunden.');
  }
  if (!EMAIL_PATTERN.test(customerEmail)) {
    throw new Error('Ange en giltig e-postadress.');
  }

  const purchaseId = sanitizePurchaseId(input.id);
  const docPath = `${PRO_PURCHASES_COLLECTION}/${purchaseId}`;
  try {
    await setDoc(doc(db, PRO_PURCHASES_COLLECTION, purchaseId), {
      customerName,
      customerEmail,
      source,
      status,
      amountSek,
      bonusCode,
      note,
      createdByUid: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return purchaseId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, docPath);
  }
}

export async function updateProPurchase(
  purchaseId: string,
  updates: {
    customerName?: string;
    customerEmail?: string;
    source?: PurchaseSource;
    status?: PurchaseStatus;
    amountSek?: number;
    bonusCode?: string;
    note?: string;
  }
): Promise<void> {
  if (!ID_PATTERN.test(purchaseId)) {
    throw new Error('Ogiltigt dokument-ID.');
  }
  const docPath = `${PRO_PURCHASES_COLLECTION}/${purchaseId}`;
  const payload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };
  if (typeof updates.customerName === 'string') {
    const trimmed = updates.customerName.trim().slice(0, 120);
    if (!trimmed) throw new Error('Namn får inte vara tomt.');
    payload.customerName = trimmed;
  }
  if (typeof updates.customerEmail === 'string') {
    const email = updates.customerEmail.trim().toLowerCase().slice(0, 160);
    if (!EMAIL_PATTERN.test(email)) throw new Error('Ogiltig e-postadress.');
    payload.customerEmail = email;
  }
  if (updates.source && VALID_SOURCES.includes(updates.source)) {
    payload.source = updates.source;
  }
  if (updates.status && VALID_STATUSES.includes(updates.status)) {
    payload.status = updates.status;
  }
  if (typeof updates.amountSek === 'number' && Number.isFinite(updates.amountSek)) {
    payload.amountSek = Math.max(0, Math.min(9999, updates.amountSek));
  }
  if (typeof updates.bonusCode === 'string') {
    payload.bonusCode = updates.bonusCode.trim().slice(0, 40);
  }
  if (typeof updates.note === 'string') {
    payload.note = updates.note.trim().slice(0, 400);
  }

  try {
    await updateDoc(doc(db, PRO_PURCHASES_COLLECTION, purchaseId), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

export async function deleteProPurchase(purchaseId: string): Promise<void> {
  if (!ID_PATTERN.test(purchaseId)) {
    throw new Error('Ogiltigt dokument-ID.');
  }
  const docPath = `${PRO_PURCHASES_COLLECTION}/${purchaseId}`;
  try {
    await deleteDoc(doc(db, PRO_PURCHASES_COLLECTION, purchaseId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}

export function subscribeAllProPurchases(
  onData: (records: ProPurchaseRecord[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const q = query(collection(db, PRO_PURCHASES_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      const rows: ProPurchaseRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          customerName: String(data.customerName || ''),
          customerEmail: String(data.customerEmail || ''),
          source: (data.source as PurchaseSource) || 'stripe',
          status: (data.status as PurchaseStatus) || 'active',
          amountSek: Number(data.amountSek) || 0,
          bonusCode: String(data.bonusCode || ''),
          note: String(data.note || ''),
          createdByUid: String(data.createdByUid || ''),
          createdAt: (data.createdAt as Timestamp | null) || null,
          updatedAt: (data.updatedAt as Timestamp | null) || null,
        };
      });
      onData(rows);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, PRO_PURCHASES_COLLECTION);
      } catch (wrapped) {
        if (onError) onError(wrapped as Error);
      }
    }
  );
}

export function subscribeOwnProPurchases(
  uid: string,
  onData: (records: ProPurchaseRecord[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, PRO_PURCHASES_COLLECTION),
    where('createdByUid', '==', uid)
  );
  return onSnapshot(
    q,
    (snap) => {
      const rows: ProPurchaseRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          customerName: String(data.customerName || ''),
          customerEmail: String(data.customerEmail || ''),
          source: (data.source as PurchaseSource) || 'stripe',
          status: (data.status as PurchaseStatus) || 'active',
          amountSek: Number(data.amountSek) || 0,
          bonusCode: String(data.bonusCode || ''),
          note: String(data.note || ''),
          createdByUid: String(data.createdByUid || ''),
          createdAt: (data.createdAt as Timestamp | null) || null,
          updatedAt: (data.updatedAt as Timestamp | null) || null,
        };
      });
      onData(rows);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, PRO_PURCHASES_COLLECTION);
      } catch (wrapped) {
        if (onError) onError(wrapped as Error);
      }
    }
  );
}

void testConnection();
