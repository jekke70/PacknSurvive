/**
 * Firestore Security Rules TDD Specification ("Dirty Dozen" Payloads)
 * Designed for execution with @firebase/rules-unit-testing against Firestore Emulator.
 */
export interface DirtyDozenTestCase {
  id: number;
  name: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  path: string;
  auth: { uid: string; email: string; email_verified: boolean } | null;
  payload?: Record<string, unknown>;
  expected: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_CASES: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Shadow Field Injection on ProPurchase Create',
    operation: 'create',
    path: 'pro_purchases/purchase_shadow_1',
    auth: { uid: 'user_1', email: 'buyer@example.com', email_verified: true },
    payload: {
      customerName: 'Test Buyer',
      customerEmail: 'buyer@example.com',
      source: 'stripe',
      status: 'active',
      amountSek: 29,
      bonusCode: 'PACKAPRO1MAN',
      note: 'Stripe return',
      createdByUid: 'user_1',
      isAdmin: true,
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Unverified Admin Email Spoofing Attack',
    operation: 'list',
    path: 'pro_purchases',
    auth: { uid: 'spoof_uid', email: 'jerker70@gmail.com', email_verified: false },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'PII Blanket Get by Non-Owner',
    operation: 'get',
    path: 'pro_purchases/other_user_purchase',
    auth: { uid: 'user_2', email: 'other@example.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Unbounded Collection List Scraping by Non-Admin',
    operation: 'list',
    path: 'pro_purchases',
    auth: { uid: 'user_2', email: 'other@example.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Identity Spoofing on Create (Mismatched createdByUid)',
    operation: 'create',
    path: 'pro_purchases/purchase_spoof_uid',
    auth: { uid: 'user_1', email: 'buyer@example.com', email_verified: true },
    payload: {
      customerName: 'Spoofer',
      customerEmail: 'buyer@example.com',
      source: 'stripe',
      status: 'active',
      amountSek: 29,
      bonusCode: 'PACKAPRO1MAN',
      note: '',
      createdByUid: 'victim_uid',
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Self-Assigned Admin Escalation in /admins',
    operation: 'create',
    path: 'admins/user_1',
    auth: { uid: 'user_1', email: 'attacker@example.com', email_verified: true },
    payload: {
      email: 'attacker@example.com',
      role: 'admin',
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Non-Admin Forging admin_grant Source',
    operation: 'create',
    path: 'pro_purchases/purchase_forged_source',
    auth: { uid: 'user_1', email: 'buyer@example.com', email_verified: true },
    payload: {
      customerName: 'Test Buyer',
      customerEmail: 'buyer@example.com',
      source: 'admin_grant',
      status: 'active',
      amountSek: 0,
      bonusCode: 'PACKAPRO1MAN',
      note: 'Forged grant',
      createdByUid: 'user_1',
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Document ID Poisoning Attack',
    operation: 'create',
    path: `pro_purchases/${'a'.repeat(140)}!@#`,
    auth: { uid: 'admin_uid', email: 'jerker70@gmail.com', email_verified: true },
    payload: {
      customerName: 'Valid Name',
      customerEmail: 'buyer@example.com',
      source: 'manual',
      status: 'active',
      amountSek: 29,
      bonusCode: 'PACKAPRO1MAN',
      note: '',
      createdByUid: 'admin_uid',
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Resource Exhaustion / Oversized Note Value Poisoning',
    operation: 'create',
    path: 'pro_purchases/purchase_oversized_note',
    auth: { uid: 'user_1', email: 'buyer@example.com', email_verified: true },
    payload: {
      customerName: 'Buyer',
      customerEmail: 'buyer@example.com',
      source: 'stripe',
      status: 'active',
      amountSek: 29,
      bonusCode: 'PACKAPRO1MAN',
      note: 'x'.repeat(10000),
      createdByUid: 'user_1',
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Client Timestamp Forgery (Non-serverTimestamp createdAt)',
    operation: 'create',
    path: 'pro_purchases/purchase_bad_time',
    auth: { uid: 'user_1', email: 'buyer@example.com', email_verified: true },
    payload: {
      customerName: 'Buyer',
      customerEmail: 'buyer@example.com',
      source: 'stripe',
      status: 'active',
      amountSek: 29,
      bonusCode: 'PACKAPRO1MAN',
      note: '',
      createdByUid: 'user_1',
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2020-01-01T00:00:00Z',
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Immortal Field Tampering on Update (Changing createdByUid)',
    operation: 'update',
    path: 'pro_purchases/existing_purchase',
    auth: { uid: 'admin_uid', email: 'jerker70@gmail.com', email_verified: true },
    payload: {
      createdByUid: 'someone_else',
      status: 'revoked',
    },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Non-Admin Update or Delete of Own Purchase',
    operation: 'delete',
    path: 'pro_purchases/own_purchase',
    auth: { uid: 'user_1', email: 'buyer@example.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
  },
];
