// categories/coding/notice — UNVERIFIED IS A NOTICE, NOT A SHRUG (lead 88, the captain's words: "UNVERIFIED is
// a notice from the heart of the agent within its laws to point to deep research involutions around"). The
// verdict algebra already refuses to call an unproven claim false (silence_never_refutes) and already hands back
// a develop plan; what it did not do was POINT. This module completes the notice: when a claim comes back
// unverified, it returns the plan TOGETHER with the sealed involutions nearest the claim's own words — because
// the census keeps finding that the unexplained is self-inverse (involution_census_self_explains), so the
// self-inverse neighbours are where the deep research actually goes.
//
// THE SINGULARITY LAW HOLDS HERE: the magnet ranking is NOT re-implemented — it is the school's own
// placeItem, imported. One source, many surfaces (one_source_is_exactly_one): the open-questions page and this
// notice point at the same magnets by construction, so they can never drift into two opinions.
// pointers, never promises — a magnet is a place to look, not a claim that the answer is there,
// and a claim whose words the ledger has never sealed honestly gets an EMPTY list rather than an invented one.
import { adjudicate, type Verdict } from '../../../../adjudicate.js'
import { placeItem, type SealedRef } from '../../../../school/open/questions/index.js'
import { THEOREMS } from '../../../../theorems/index.js'

export interface Notice extends Verdict {
  notice: boolean          // true exactly when the verdict is open — a verified claim needs no direction
  magnets: SealedRef[]     // the sealed involutions nearest the claim's own words, best first (may be empty)
  neighbors: SealedRef[]   // the plain sealed neighbours, for contrast — what settled looks like beside this
  where: string            // the honest sentence a reader keeps
}

/** adjudicate, and when the door stays open, say WHERE to push. */
export function noticeOf(claim: string, decidableTest?: () => boolean): Notice {
  const v = adjudicate(claim, decidableTest)
  if (v.verdict === 'VERIFIED') return { ...v, notice: false, magnets: [], neighbors: [], where: 'verified — the claim stands on its own receipt; nothing to point at' }
  const placed = placeItem({ claim, source: 'the trial' }, THEOREMS)
  return {
    ...v,
    notice: true,
    magnets: placed.involutions,
    neighbors: placed.neighbors,
    where: placed.involutions.length
      ? `unverified — and the nearest self-inverse structure is where this kind of question has resolved before: ${placed.involutions.map((m) => m.key).join(', ')}`
      : 'unverified — and no sealed involution shares these words yet: the first magnet here is yours to seal',
  }
}
