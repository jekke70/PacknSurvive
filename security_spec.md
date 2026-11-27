# Security Specification — Crazy Camper: Packa & Överlev

## 1. Data Invariants
1. **Default Deny**: Every unspecified Firestore path is denied for both reads and writes.
2. **Admin Isolation**: Only the bootstrapped verified admin (`jerker70@gmail.com`, `email_verified == true`) can list all Pro purchases, update or revoke purchases, delete purchases, or manage `/admins/{adminUid}` documents.
3. **PII Isolation**: `/pro_purchases/{purchaseId}` contains PII (`customerName`, `customerEmail`). Reads (`get`, `list`) are strictly restricted to the bootstrapped verified admin (`jerker70@gmail.com`) or the verified creator (`existing().createdByUid == request.auth.uid`). Blanket `isSignedIn()` reads are forbidden.
4. **No Self-Escalation**: Non-admin users can never write to `/admins/{adminUid}`, can never create a `pro_purchases` record with `source: 'admin_grant'` or `source: 'manual'`, can never create a record with another user's `createdByUid`, and can never update or delete existing `pro_purchases` documents.
5. **Strict Schema & Bounds**: All string fields enforce `minLength`/`maxLength` and regex patterns synchronized verbatim with `firebase-blueprint.json`. No shadow/ghost keys are permitted (`keys().hasAll(...) && keys().hasOnly(...)`).
6. **Temporal & Immutability Integrity**: `createdAt` and `updatedAt` must equal `request.time` on creation. On update, `createdAt` and `createdByUid` are strictly immutable and `updatedAt` must equal `request.time`.
7. **Cost-Safe List Queries**: `allow list` never invokes `get()` or `exists()`, preventing O(n) read-cost amplification.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Shadow Field Injection on Create**: Valid `ProPurchase` + extra key `isAdmin: true`. Must be rejected by `keys().hasOnly(...)`.
2. **Email Spoofing Attack**: User with `email: 'jerker70@gmail.com'` and `email_verified: false` attempts to list `/pro_purchases`. Must be rejected by `email_verified == true`.
3. **PII Blanket Read**: Authenticated non-admin user attempts `get` on another buyer's `/pro_purchases/{purchaseId}`. Must be rejected.
4. **Query Scraping Attack**: Authenticated non-admin user attempts unbounded `list` on `/pro_purchases` without matching `createdByUid == request.auth.uid`. Must be rejected.
5. **Identity Spoofing on Create**: Non-admin user attempts to create a `ProPurchase` with `createdByUid: 'victim_uid'`. Must be rejected.
6. **Admin Privilege Escalation**: Non-admin user attempts to create `/admins/{theirUid}` with `{ email: 'attacker@example.com', role: 'admin', createdAt: request.time }`. Must be rejected.
7. **Unauthorized Source Forgery**: Non-admin user attempts to create a `ProPurchase` with `source: 'admin_grant'`. Must be rejected.
8. **ID Poisoning Attack**: Attempt to create `/pro_purchases/<200-char-invalid-id!@#>` violating `isValidId()`. Must be rejected.
9. **Resource Exhaustion / Value Poisoning**: Attempt to write a 10,000-character string into `note` (exceeding `maxLength: 400`). Must be rejected.
10. **Client Timestamp Forgery**: Attempt to create a `ProPurchase` with a backdated client timestamp instead of `serverTimestamp()`. Must be rejected (`createdAt == request.time`).
11. **Immortal Field Tampering**: Admin attempts to update a `ProPurchase` while altering `createdAt` or `createdByUid`. Must be rejected.
12. **Non-Admin Update/Delete Attempt**: Non-admin buyer attempts to update or delete their own `ProPurchase` document (e.g., changing `status` or `amountSek`). Must be rejected.
