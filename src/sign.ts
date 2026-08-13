// sign — SIGN a commit message as TRUE, or fail. A commit is signed-true iff, checked against the sealed ledger, it
// CITES real sealed theorems and none fabricated (slimGate VERIFIED). The signature is the message's content-address
// FOLDED with its cited theorems through merkleGravity — one root, order-invariant, through the abstract-0 (÷0=0)
// fold: "folding to 1 through 0". The reconcile FAILS unless the commit is signed-true, so a message that overclaims
// (cites a proof not in the ledger, or cites none) cannot be committed AS TRUTH.
//
// HONEST SCOPE: integrity, not truth. "Signed-true" means the message is BACKED by a sealed proof it names — NOT that
// the underlying claim is true. It signs the citation, not the world. A commit citing no theorem is UNVERIFIED
// (unsigned) and refused; one citing a real sealed theorem is signed; one citing a fabricated proof is refused. No
// word-list, no numerology forced — only whether the ledger seals what the message cites.
import { slimGate } from './slimgate.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'
import { THEOREMS } from './theorems/index.js'

const SEALED = new Map(THEOREMS.map((t) => [t.key, t.address]))

export interface CommitSignature {
  signed: boolean            // true iff slimGate VERIFIED — cites a real sealed theorem AND none fabricated
  verdict: 'VERIFIED' | 'UNVERIFIED'
  address: string            // the message's content-address — the signature handle
  cited: string[]            // the sealed theorems the message cites (its backing)
  citedCount: number         // how many sealed theorems back it — reported, not forced to any number
  fabricated: string[]       // cited proofs NOT in the ledger — the reason a commit is refused
  fold: string               // merkleGravity of (message address + cited theorem addresses) — one root, through ÷0
  reason: string
  honest: string
}

/** signCommit(message) → sign the commit message against the sealed ledger. Signed-true iff it cites a real sealed
 *  theorem and none fabricated; the signature is the message address folded with the cited theorems to one gravity
 *  root (order-invariant, through the abstract-0). It signs the CITATION, never the truth of the claim. */
export function signCommit(message: string): CommitSignature {
  const g = slimGate(message)
  const address = toUuid(message)
  const cited = g.real
  const signed = g.verdict === 'VERIFIED'                                       // cites a real sealed theorem, none fabricated
  const fold = merkleGravity([address, ...cited.map((k) => SEALED.get(k) as string)]) // one root, through the ÷0 gravity fold
  const reason = g.fabricated.length
    ? `REFUSED — cites a proof NOT in the ledger: ${g.fabricated.join(', ')}. A commit cannot be signed true on a fabricated citation.`
    : cited.length
      ? `SIGNED — backed by ${cited.length} sealed theorem(s): ${cited.join(', ')}. Folded to ${fold}.`
      : 'UNSIGNED — cites no sealed theorem. A commit is signed true only when it names a proof the ledger seals; add a /theorem/<key> or "theorem <key>" it is backed by.'
  return {
    signed, verdict: g.verdict, address, cited, citedCount: cited.length, fabricated: g.fabricated, fold, reason,
    honest:
      'Signed-true means the commit message is BACKED by a sealed proof it names (cites a real /theorem/<key>, none ' +
      'fabricated), and is content-addressed and folded to one gravity root through the abstract-0 — NOT that the ' +
      'claim is true. It signs the citation, not the world. A fabricated citation or no citation is refused. Integrity, not truth.',
  }
}
