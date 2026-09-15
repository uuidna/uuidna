// school/progress/identity — A LEARNER IS A PSEUDONYMOUS HANDLE (the owner's decision, 2026-09-15).
//
// The learner picks a passphrase; its content address is their handle. No email, name or other personal datum is
// asked for or stored. The passphrase never leaves the browser: the handle and a key are derived from it here, and
// the Worker keeps only a digest of the key, so progress under a handle can be extended only by whoever holds the
// passphrase. Lose the passphrase and the link to the handle is lost with it — by construction, since nothing else
// names the learner. Imports only address.ts and handle.ts, so a browser can derive both without the ledger.
import { toUuid, cryptoAddress } from '../../../address.js'
import { handleOf, isHandle } from '../../../handle.js'

export { isHandle }

/** the shortest passphrase accepted — this project's decision: a handle is eight hex, so the passphrase, not the
 *  handle, is what keeps a learner's record theirs */
export const PASSPHRASE_MIN = 12

/** learnerHandleOf(passphrase) → handleOf(toUuid('learner:' + passphrase)), the owner's derivation */
export const learnerHandleOf = (passphrase: string): string => handleOf(toUuid('learner:' + passphrase))

/** learnerKeyOf(passphrase) → the key a learner's browser sends to extend their record (SHA-256 based) */
export const learnerKeyOf = (passphrase: string): string => cryptoAddress('learner-key:' + passphrase)

/** lockOf(key) → the digest the Worker stores in place of the key: the first write sets it, every later write must match */
export const lockOf = (key: string): string => cryptoAddress('learner-lock:' + key)
