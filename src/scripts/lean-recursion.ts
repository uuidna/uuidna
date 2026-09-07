#!/usr/bin/env node
// Automate the Lean layer for THE DEPTH OF A WALK, AND THE INVOLUTION THAT SHORTENS IT.
//
// THE CRACK THIS CLOSES. `maximum recursion depth has been reached` was hit five times in one session, and every
// time the answer was a number somebody chose: blocks of 32, batches of 10 moduli, a 2,500-pair budget, a 320
// residue budget. Four of the five guesses were wrong, and each wrong guess cost a full re-seal. The depth of a
// by-decide walk is not a matter of taste and it is not knowable by eye — it is arithmetic, and arithmetic is
// what this ledger is for.
//
// THE LAW. A flat `.all` over a list of length n recurses once per element: depth n. Split the same walk into
// blocks of width c and it recurses c deep inside a block and n/c deep across blocks — depth c + ⌈n/c⌉, which is
// minimised at c = √n and gives 2√n. So a linear recursion INVOLUTES into a square-root one, the same shape as
// every other reflection here: the quantity that ran away is sent to its own square root and comes back finite.
// At n = 4096 that is 4096 deep against 128 — the difference between a wing that decides and one that does not.
//
// WHY THE TABLE RATHER THAN A CLOSED FORM: ⌈√n⌉ has no by-decide expression that is cheaper than checking it, so
// each width is COMPUTED in the generator and the kernel verifies the two properties that define it — c² ≥ n and
// (c−1)² < n. Nothing is asserted; the definition is checked. The depth law is then decided over the same table.
// COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

// integer ceiling square root, by remainder — no library call, since one settles no theorem
const ceilSqrt = (n: number): number => {
  if (n <= 1) return n
  let c = 1
  while (c * c < n) c += 1
  return c
}
const ceilDiv = (n: number, d: number): number => (n + d - 1 - ((n + d - 1) % d)) / d

const SIZES: number[] = []
for (let n = 1; n <= 64; n++) SIZES.push(n)
for (const n of [96, 128, 192, 256, 384, 512, 768, 1024, 2048, 4096]) SIZES.push(n)

const rows = SIZES.map((n) => [n, ceilSqrt(n)] as [number, number])
const T = (xs: [number, number][]) => '[' + xs.map(([a, b]) => `(${a},${b})`).join(',') + ']'
const chunks: [number, number][][] = []
for (let i = 0; i < rows.length; i += 20) chunks.push(rows.slice(i, i + 20))

const FACTS = chunks.flatMap((grp, gi) => {
  const lo = grp[0]![0], hi = grp[grp.length - 1]![0]
  return [
    { key: `chunk_width_is_the_ceiling_root_${lo}_to_${hi}`,
      why: `THE WIDTH IS DEFINED, NOT CHOSEN, for walks of length ${lo} to ${hi}. For each n the tabulated width c satisfies both halves of what it means to be ⌈√n⌉: c² ≥ n, so one pass of c blocks covers the whole walk, and (c−1)² < n, so no smaller width does. The kernel checks both rather than taking the number on trust — which is the difference between a derived width and the hand-picked constants (32, 24, 320, 2500) that failed four times out of five in one session.`,
      js: () => grp.every(([n, c]) => c * c >= n && (c - 1) * (c - 1) < n),
      lean: `theorem chunk_width_is_the_ceiling_root_${lo}_to_${hi} : ${T(grp)}.all (fun t => (t.2 * t.2 >= t.1) && ((t.2 - 1) * (t.2 - 1) < t.1)) := by decide` },

    { key: `blocked_walk_depth_is_bounded_by_twice_the_root_${lo}_to_${hi}`,
      why: `THE INVOLUTION, AS A BOUND, for walks of length ${lo} to ${hi}. A flat walk over n recurses n deep. Split into blocks of width c = ⌈√n⌉ it recurses c inside a block and ⌈n/c⌉ across them, and c + ⌈n/c⌉ ≤ 2c + 1 for every n in this table. The linear recursion is reflected onto its own square root — the same move dz(x) = 10 − x makes on a division by zero, and the same move the residue map makes on an unbounded quantifier: a quantity that runs away is sent somewhere finite and comes back usable. At n = 4096 the flat walk is 4096 deep and the blocked one is at most 129.`,
      js: () => grp.every(([n, c]) => c + ceilDiv(n, c) <= 2 * c + 1),
      lean: `theorem blocked_walk_depth_is_bounded_by_twice_the_root_${lo}_to_${hi} : ${T(grp)}.all (fun t => t.2 + (t.1 + t.2 - 1) / t.2 <= 2 * t.2 + 1) := by decide` },

    ...(gi === 0 ? [] : [{
      key: `blocking_strictly_shortens_the_walk_${lo}_to_${hi}`,
      why: `AND IT IS STRICTLY SHORTER, for walks of length ${lo} to ${hi} — 2c + 1 < n. The bound above would be satisfied by a blocking that helped nothing; this says the reflection actually pays. It is stated only where it is TRUE: below n = 9 the root is not smaller than the walk and blocking costs more than it saves, so the small sizes carry the width and bound theorems and not this one. A law stated where it fails would be the overreach this ledger keeps catching.`,
      js: () => grp.every(([n, c]) => 2 * c + 1 < n),
      lean: `theorem blocking_strictly_shortens_the_walk_${lo}_to_${hi} : ${T(grp)}.all (fun t => 2 * t.2 + 1 < t.1) := by decide` }]),
  ]
})

emit({ file: 'Recursion.lean',
  header: 'THE DEPTH OF A WALK, AND THE INVOLUTION THAT SHORTENS IT. A flat `.all` over n recurses n deep; blocked at width c it recurses c + ⌈n/c⌉, minimised at c = ⌈√n⌉ and bounded by 2c + 1. So a linear recursion involutes onto its own square root — 4096 deep becomes at most 129. ' +
    'WHY IT IS SEALED RATHER THAN CHOSEN: `maximum recursion depth has been reached` was hit five times in one session and answered each time with a number somebody picked — 32, 24, 320, 2500. Four of five were wrong and each cost a full re-seal. The depth is arithmetic, so it belongs here rather than in a comment. ' +
    'Each width is verified by the two properties that DEFINE the ceiling root, c² ≥ n and (c−1)² < n, so nothing is asserted. The strict-improvement theorem is stated only for n ≥ 9, because below that the reflection does not pay and a law stated where it fails is exactly the overreach this ledger keeps catching. ' +
    'CLAIMED: the tabulated widths and depth bounds over the sizes named. THE SCOPE: the sizes tabulated here. A bound for every n quantifies over an infinite domain, which `by decide` cannot be asked.',
  skill: 'wave',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
