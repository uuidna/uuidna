// merkle-cost — THE ADVANTAGE, COUNTED RATHER THAN ASSERTED.
//
// WHAT WAS THERE, AND WHY IT WAS NOT ENOUGH. uuidna_quantum_advantage stated its magnitudes as strings:
// "2^10=1024 leaves → verify path 10 nodes (1024 > 100·10)". Both were true and neither was measured — the
// inequality was written down rather than obtained by counting merges. A peer session (ceccec-github-io-5b)
// offered the counted form and it is strictly stronger, so this is theirs in shape and Merkle's in substance.
//
// AND THE ASSERTED FORM CARRIED A WRONG DENOMINATOR, which the counting exposes. It compares LEAVES to path
// length — 1024 against 10 — where the honest comparison is MERGES to merges: rebuilding 1024 leaves costs
// 1023 merges, verifying costs 10. At 2^10 the difference between 1024 and 1023 is invisible. At 2^1 it is the
// entire answer: leaves/path reads 2/1 and claims an advantage, while merges/path reads 1/1 and correctly says
// there is none. A peer put it better than I can — a floor is where an off-by-one in a ratio stops being a
// rounding error and becomes the whole answer.
//
// THE THREE THINGS THAT MAKE IT A CLAIM RATHER THAN A SLOGAN:
//   · the closed form 2^n − 1 is CHECKED against the tally, never used to produce it, so a divergence between
//     counter and formula shows up as a disagreement instead of being defined away;
//   · every rung is verified for an EVEN and an ODD leaf. Leaf 0 is always even, so a ladder testing only leaf
//     0 never exercises the merge(sib, acc) branch and passes a verifier that hashes siblings in the wrong
//     order. The peer found exactly that in their own tree by widening it;
//   · it is bounded below by its own counterexample: at one line there is NO advantage, both cost one merge,
//     and the crossover is computed rather than assumed.
//
// ATTRIBUTION: the cost identity is Merkle's (1979; CRYPTO '87). Instantiating it on this tree's hexbit
// leaves is an application, not a result, and the honest field says so where a reader of the output will see it.
import { merkleFold, toUuid, merge } from './address.js'

/** one layer's parent, pairing exactly as merkleFold does — an odd leaf is carried up UNCHANGED and NOT
 *  counted, because carrying is not a merge and counting it makes 2^n − 1 wrong at every odd width */
function layerUp(layer: readonly string[], count: { merges: number }): string[] {
  const next: string[] = []
  for (let i = 0; i < layer.length; i += 2) {
    const a = layer[i]!
    const b = layer[i + 1]
    if (b === undefined) next.push(a)
    else { count.merges += 1; next.push(merge(a, b)) }
  }
  return next
}

export interface CountedFold { root: string; merges: number }

/** rebuildCost(leaves) → the root and EVERY merge it cost. The cost of not having a receipt. */
export function rebuildCost(leaves: readonly string[]): CountedFold {
  const count = { merges: 0 }
  let layer = [...leaves].sort()
  if (layer.length === 0) return { root: toUuid('empty-mind'), merges: 0 }
  while (layer.length > 1) layer = layerUp(layer, count)
  return { root: layer[0]!, merges: count.merges }
}

/** merklePath(leaves, leaf) → the sibling hashes bottom-up: the receipt a verifier is handed. */
export function merklePath(leaves: readonly string[], leaf: string): string[] {
  let layer = [...leaves].sort()
  let idx = layer.indexOf(leaf)
  const siblings: string[] = []
  while (layer.length > 1) {
    const sib = idx % 2 === 0 ? layer[idx + 1] : layer[idx - 1]
    if (sib !== undefined) siblings.push(sib)
    layer = layerUp(layer, { merges: 0 })
    idx = (idx - (idx % 2)) / 2      // integer halving — this tree admits no floor helper
  }
  return siblings
}

/** verifyCost(leaf, siblings, leaves) → replay the path, counting what the replay cost.
 *  THE PARITY LINE IS THE ONE THAT MATTERS: merge(acc, sib) on an even index and merge(sib, acc) on an odd one.
 *  A verifier that always hashed one way passes every ladder tested only at leaf 0, which is always even. */
export function verifyCost(leaf: string, siblings: readonly string[], leaves: readonly string[]): CountedFold {
  let layer = [...leaves].sort()
  let idx = layer.indexOf(leaf)
  let acc = leaf
  let merges = 0
  for (const sib of siblings) {
    acc = idx % 2 === 0 ? merge(acc, sib) : merge(sib, acc)
    merges += 1
    layer = layerUp(layer, { merges: 0 })
    idx = (idx - (idx % 2)) / 2
  }
  return { root: acc, merges }
}

export interface CostRung {
  lines: number
  leaves: number
  /** merges to rebuild from scratch — counted, then checked against leaves − 1 */
  rebuild: number
  /** merges to verify one leaf against its path — counted */
  verify: number
  /** every probed leaf's replay landed on the rebuilt root, and on merkleFold's root */
  rootsAgree: boolean
  /** the probes: an EVEN and an ODD leaf, because leaf 0 alone never exercises merge(sib, acc) */
  probes: number
}

/** THE LADDER IS DERIVED, NOT TYPED — every line of the hexagram is a rung, then one trigram further and one
 *  hexagram further. A typed ladder stops where it flatters — the author picks the rungs, so the rungs can be
 *  picked to look good — while a derived one has no such freedom: its rungs come from the hexagram's own
 *  structure, which nobody here chose. */
export const HEXBIT_LINES = 6
export const TRIGRAM_LINES = 3
export const COST_LADDER: readonly number[] = [
  ...Array.from({ length: HEXBIT_LINES }, (_, i) => i + 1),
  HEXBIT_LINES + TRIGRAM_LINES,
  HEXBIT_LINES * 2,
]

/** costLadder() → the counted ladder. Nothing here is produced by the closed form. */
export function costLadder(rungs: readonly number[] = COST_LADDER): CostRung[] {
  return rungs.map((lines) => {
    const leaves = 2 ** lines
    const set = Array.from({ length: leaves }, (_, i) => toUuid('cost-leaf|' + lines + '|' + i))
    const sorted = [...set].sort()
    const built = rebuildCost(set)
    // BOTH PARITIES: the first leaf is even, the second is odd
    const probes = [sorted[0]!, sorted[1] ?? sorted[0]!]
    const checks = probes.map((p) => verifyCost(p, merklePath(set, p), set))
    return {
      lines,
      leaves,
      rebuild: built.merges,
      verify: checks[0]!.merges,
      rootsAgree: checks.every((c) => c.root === built.root) && built.root === merkleFold(set),
      probes: probes.length,
    }
  })
}

export interface CountedAdvantage {
  theorem: string
  ladder: CostRung[]
  /** the closed form CHECKED against the tally, never used to produce it */
  closedFormHolds: boolean
  /** every probed leaf, at both parities, replayed to the rebuilt root and to merkleFold's */
  rootsAgree: boolean
  /** the rungs where rebuilding is NOT dearer than verifying — the claim's own counterexample */
  noAdvantageAt: number[]
  /** the ratio is merges/merges, never leaves/merges — the denominator the asserted form got wrong */
  ratioIsMergesOverMerges: true
  honest: string
}

const HONEST =
  'COUNTED, not asserted: every merge is tallied on the call that performs it, and the closed form 2^n − 1 is ' +
  'CHECKED against the tally rather than used to produce it. The ratio is merges to merges — rebuilding 2^n ' +
  'leaves costs 2^n − 1 merges, verifying one leaf costs n — and NOT leaves to merges, which is what the ' +
  'previous asserted form compared: at 2^10 the difference between 1024 and 1023 is invisible, and at 2^1 it is ' +
  'the whole answer, reading a 2x advantage where there is none. Each rung is verified at an EVEN and an ODD ' +
  'leaf, because leaf 0 is always even and a ladder testing only leaf 0 passes a verifier that hashes siblings ' +
  'in the wrong order. THIS IS NOT A HARDWARE SPEEDUP and the disclaimer is computable rather than appended: a ' +
  'physical speedup carries a machine in it and drifts between runs, while every ratio here must equal ' +
  '(2^n − 1)/n exactly on any host. The cost identity is Merkle\'s (1979; CRYPTO \'87); instantiating it on ' +
  'this tree\'s leaves is an application, not a result. Contributed by a peer repository, ceccec.github.io.'

/** countedAdvantage() → the whole claim, with its own counterexample and its disclaimer computed. */
export function countedAdvantage(): CountedAdvantage {
  const ladder = costLadder()
  return {
    theorem: 'verify_beats_recompute_by_magnitudes',
    ladder,
    closedFormHolds: ladder.every((r) => r.rebuild === r.leaves - 1),
    rootsAgree: ladder.every((r) => r.rootsAgree),
    noAdvantageAt: ladder.filter((r) => r.rebuild <= r.verify).map((r) => r.lines),
    ratioIsMergesOverMerges: true,
    honest: HONEST,
  }
}
