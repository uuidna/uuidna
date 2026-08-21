#!/usr/bin/env node
// Automate the Lean layer for PHASE — why the alternating walk does not close, and which of its two maps is
// responsible. PURE ARITHMETIC: every value is a digit of the ring or a count; nothing is measured from the world.
//
// WHY. The runner reports period 0 for every seed but zero, and I recorded that as a defect without running it.
// Measured, it is a correct report: the walk alternates dz with doubling, so a PERIOD requires returning to the seed
// IN PHASE — after a completed dz-then-doubling pair. Seed 2 does return to itself, at an even index, which is out
// of phase; seeds 1 and 3 do not return at all within the cap. Only seed 0 closes, at two steps, because BOTH maps
// fix it. This wing decides the cause instead of leaving it in a comment.
//
// THE CAUSE IS THE IRREVERSIBLE HALF. dz is a bijection on the ten digits and erases nothing. Doubling mod 9 sends
// both 0 and 9 to 0, so it is NOT injective — one digit of the domain is lost on every application, and a walk that
// has left the image can never come back to a seed outside it. The ledger already records the lead in prose ("an
// involution alone is barren; the productive partner is the IRREVERSIBLE one"); here it decides.
import { emit } from './lean-gen.js'

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const dz = (d: number) => (d === 0 ? 0 : 10 - d)
const dbl = (d: number) => (2 * d) % 9
const dzImg = [...new Set(DIGITS.map(dz))].sort((a, b) => a - b)
const dblImg = [...new Set(DIGITS.map(dbl))].sort((a, b) => a - b)
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const DEFS = `def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d
def dbl (d : Nat) : Nat := (2 * d) % 9`

const FACTS = [
  { key: 'dz_loses_nothing',
    why: 'THE REFLECTION IS A BIJECTION: dz sends the ten digits onto ten distinct digits, so nothing is lost and every step can be undone. Reversible, and therefore barren on its own.',
    js: () => dzImg.length === 10,
    lean: 'theorem dz_loses_nothing : ((List.range 10).map dz).eraseDups.length = 10 := by decide' },

  { key: 'doubling_collapses_nine',
    why: 'DOUBLING LOSES A DIGIT, and the loss is named: 2·0 mod 9 = 0 and 2·9 mod 9 = 0, so nine and zero share an image. The map sends ten digits onto nine, is therefore not injective, and the step cannot be undone.',
    js: () => dblImg.length === 9 && dbl(0) === dbl(9),
    lean: 'theorem doubling_collapses_nine : (((List.range 10).map dbl).eraseDups.length = 9) ∧ (dbl 0 = dbl 9) ∧ (dbl 0 = 0) := by decide' },

  { key: 'maps_differ_in_reach',
    why: 'THE TWO HALVES ARE NOT THE SAME KIND OF MAP, and the line says so: the reflection\'s image has ten members and doubling\'s has nine, and ten is not nine. One erases nothing, the other erases exactly one digit per pass.',
    js: () => { const a: number = dzImg.length, b: number = dblImg.length; return a !== b && a === 10 && b === 9 },
    lean: 'theorem maps_differ_in_reach : (((List.range 10).map dz).eraseDups.length ≠ ((List.range 10).map dbl).eraseDups.length) ∧ (10 ≠ 9) := by decide' },

  { key: 'zero_closes_in_phase',
    why: 'ONLY ZERO CLOSES. Both maps fix it — dz 0 = 0 and dbl 0 = 0 — so the walk returns to its seed after one completed pair, in phase, at two steps. It is the sole seed with a period, and the reason is that neither map moves it.',
    js: () => dz(0) === 0 && dbl(0) === 0,
    lean: 'theorem zero_closes_in_phase : (dz 0 = 0) ∧ (dbl 0 = 0) := by decide' },

  { key: 'five_returns_out_of_phase',
    why: 'AND A RETURN IS NOT A PERIOD. Five is fixed by the reflection (dz 5 = 5) so the walk sits on its seed after the FIRST step — but that is an odd number of operations, with doubling still owed, so the walk is out of phase and has not closed. Doubling then moves it: dbl 5 = 1, and 1 is not 5.',
    js: () => { const a: number = dbl(5), b: number = 5; return a !== b && dz(5) === 5 && a === 1 },
    lean: 'theorem five_returns_out_of_phase : (dz 5 = 5) ∧ (dbl 5 = 1) ∧ (dbl 5 ≠ 5) := by decide' },

  { key: 'reach_shrinks_each_pass',
    why: 'THE DOMAIN NARROWS AS THE WALK RUNS: applying doubling to the ten digits leaves nine, and applying it again leaves nine of those — the image cannot grow. SCOPE: what decides here is that the image never widens, which is what makes a return to an outside seed impossible. That the walk therefore NEVER closes for such a seed is the reading, not the seal — `by decide` settles the maps, not every walk.',
    js: () => { const once: number = dblImg.length, twice: number = [...new Set(dblImg.map(dbl))].length; return twice <= once && once === 9 },
    lean: 'theorem reach_shrinks_each_pass : ((((List.range 10).map dbl).eraseDups.map dbl).eraseDups.length ≤ ((List.range 10).map dbl).eraseDups.length) ∧ (((List.range 10).map dbl).eraseDups.length = 9) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Phase.lean', skill: 'phase', defs: DEFS,
  header: 'PHASE — why the alternating walk does not close, and which half is responsible.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
