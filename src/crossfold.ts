// crossfold — A HASH THAT IS A CROSS, NOT A DIGEST.
//
// The captain, 2026-09-28: "why arrays and hashes are not result of cross formulas?!? formulate all!" The question is
// exact, and three artifacts this session wrote answer it badly: lean/api-discovery.json, lean/api-cross.json and
// lean/door-demand.json carried no fold at all. An array with no receipt is an enumeration — a reader can compare it
// to nothing — and a receipt folded ONE way is barely better, because a digest agrees with itself by construction and
// the only thing it proves is that the same bytes went in.
//
// WHAT MAKES A FOLD A CROSS is that two routes that share no step must land on one address. This tree already states
// the principle where it matters most: the rosette receipt is "seven rays, no line privileged", and the spin fold is
// "order-invariant within trinities, stroke-walked across them". Order-invariance is not decoration there — it is the
// claim, and it is what lets two parties who assembled the same facts in different orders compare one string.
//
// So this folds the SAME leaves twice, in two orders that share no step: sorted, and reversed. An order-invariant fold
// must return one address; a fold that is secretly order-dependent returns two, and `agrees` is then false rather than
// a receipt quietly describing whichever order the writer happened to build. That is the whole difference between a
// hash and a cross — one records, the other can be wrong.
//
// WHAT THIS DOES NOT CLAIM. Two orders agreeing does not prove the fold is collision-resistant, and it does not prove
// the leaves are true; `gematria_forces_collisions` is sealed in this ledger and integrity is not content truth
// (theorem provenance_integrity_not_content_truth). It proves that the address does not depend on the order the writer
// assembled, which is precisely the property a second party needs in order to recompute it.
import { hexbitReceipt } from './hexbit/index.js'

export interface CrossFold {
  /** the content address of these leaves, independent of the order they arrived in */
  receipt: string
  handle: string
  leaves: number
  /** the two routes, and whether they met — false is a finding about the FOLD, never about the leaves */
  crossed: { sorted: string; reversed: string; agrees: boolean }
}

/**
 * crossFold(leaves) → the address, plus the two routes that had to agree on it.
 *
 * The leaves are strings a reader can rebuild from the artifact itself: that is what makes the receipt recomputable
 * rather than a number the writer asserts. Sorting is done here so a caller cannot make the cross vacuous by handing
 * over an already-reversed list — both orders are derived from the leaves, not from the argument's arrangement.
 */
export function crossFold(leaves: readonly string[]): CrossFold {
  const sorted = [...leaves].sort()
  const a = hexbitReceipt(sorted)
  const b = hexbitReceipt([...sorted].reverse())
  return {
    receipt: a.receipt,
    handle: a.handle,
    leaves: sorted.length,
    crossed: { sorted: a.receipt, reversed: b.receipt, agrees: a.receipt === b.receipt },
  }
}
