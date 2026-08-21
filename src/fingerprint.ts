// fingerprint — FUSE the two integrity layers into one ledger fingerprint, and state the tampering cost HONESTLY as
// a bound, never a maximum. The FNV content-address is TAMPER-EVIDENT: any change moves it, keyless and fast — but it
// is NOT collision-resistant, so it detects change without resisting a determined forger. The SHA-256 fold IS
// collision-resistant: forging a theorem that survives it costs a ~2^128 collision, the primitive's ceiling. Carry
// both and a change is caught for free while a forgery that passes both costs a SHA-256 collision. Add a key (HMAC)
// and forgery also needs the secret — the cost becomes the key's entropy. None of this is "maximum" — no scheme
// proves a maximum; it raises the cost to the honest ceiling of the primitive used. Integrity.
import { theorems } from './theorems/index.js'
import { merkleGravity } from './gravity/index.js'
import { sha256 } from './sha256.js'

const hex = (b: Uint8Array): string => Array.from(b).map((x) => x.toString(16).padStart(2, '0')).join('')
const bytes = (s: string): Uint8Array => new TextEncoder().encode(s)

export interface LedgerFingerprint {
  count: number
  fnvReceipt: string   // order-invariant FNV fold — tamper-evident, keyless, fast; NOT collision-resistant
  sha256: string       // SHA-256 over the sorted addresses — collision-resistant; forgery costs a ~2^128 collision
  tamperCost: string   // the honest bound (NOT a maximum)
}

/** ledgerFingerprint() → the fused fingerprint of the whole ledger: the fast tamper-evident FNV receipt AND the
 *  collision-resistant SHA-256 fold (over the SORTED addresses, so it too is order-invariant). Recomputable by anyone
 *  from the same lean/*.lean. It raises the cost of an undetected forgery to the SHA-256 collision bound — a ceiling,
 *  not a maximum. */
export function ledgerFingerprint(): LedgerFingerprint {
  const addrs = theorems().map((t) => t.address)
  return {
    count: addrs.length,
    fnvReceipt: merkleGravity(addrs),
    sha256: hex(sha256(bytes([...addrs].sort().join('|')))),
    tamperCost:
      'A change is detected for free — the FNV receipt moves. A forgery that also survives the SHA-256 fingerprint ' +
      'costs a SHA-256 collision (~2^128 work), and one that survives an HMAC signature also needs the secret key ' +
      '(cost = the key entropy). These are BOUNDS set by the primitives— no scheme proves a maximum. ' +
      'The gap raises tampering cost to the honest ceiling; it does not close it to zero or claim it is unbreakable.',
  }
}
