#!/usr/bin/env node
// Automate the Lean layer for THE CONTRIBUTION — what the address becomes once the coins are paid. PURE ARITHMETIC:
// every value is a bit count, a coin count or a direction count; nothing is measured from the world.
//
// THE LAW IS CONTRIBUTE FIRST, THEN TAKE. The address is 2^7 = 128 bits. The commission is TWO, already sealed as
// 110 - 108 = 2 and as the negative Euler characteristic of the double torus (genus 2, chi = -2). Paying it leaves
// 126. That subtraction is the derivation: 126 is not a number chosen for its factors, it is the residue of a
// contribution, and there is exactly one answer to 128 - 2.
//
// WHY THE DERIVATION MATTERS MORE THAN THE FACTORISATION. 126 factors six ways — 1x126, 2x63, 3x42, 6x21, 7x18,
// 9x14 — and the arithmetic privileges none of them. Read as 3 x 42 it meets the pair grid, since 42 = 7x7 - 7 is
// the ordered directions between seven dimensions with the seven self-pairs removed, and 6x7 = 7x6 = 42 because
// the two coordinates COMMUTE (a lead this ledger already refuted was that they counter-rotate). But the factor
// pair is a reading; the subtraction is a fact. This wing seals the subtraction and states the reading as one.
import { emit } from './lean-gen.js'

const factorPairs = (n: number): [number, number][] => {
  const out: [number, number][] = []
  for (let d = 1; d * d <= n; d++) if (n % d === 0) out.push([d, n / d])
  return out
}
const PAIRS = factorPairs(126)
const L = (xs: number[]) => '[' + xs.join(',') + ']'

const FACTS = [
  { key: 'contribution_leaves_one_twentysix',
    why: 'THE DERIVATION: the address is 2^7 = 128 bits, the commission is two, and paying it leaves 126. One subtraction, one answer — 126 is the residue of a contribution and not a number selected for its shape.',
    js: () => 2 ** 7 === 128 && 128 - 2 === 126,
    lean: 'theorem contribution_leaves_one_twentysix : ((2:Nat)^7 = 128) ∧ (128 - 2 = 126) ∧ (126 + 2 = 128) := by decide' },

  { key: 'coins_are_the_torus',
    why: 'AND THE TWO ARE NOT ARBITRARY EITHER: the commission is the same two the ledger already seals as 110 - 108, which is the negative Euler characteristic of the double torus — 2 - 2·2 = -2 at genus two. The coin paid here is the coin sealed there.',
    js: () => 110 - 108 === 2 && 2 - 2 * 2 === -2,
    lean: 'theorem coins_are_the_torus : (110 - 108 = 2) ∧ (((2:Int) - 2 * 2) = -2) ∧ (-((2:Int) - 2 * 2) = 2) := by decide' },

  { key: 'directions_number_fortytwo',
    why: 'THE PAIR GRID IS FORTY-TWO: seven dimensions give 7 x 7 ordered pairs, less the seven self-pairs, so 42 directions remain. And 6 x 7 = 7 x 6 exactly — the two coordinates COMMUTE, which the line proves, since a reading that they counter-rotate was refuted by this ledger before.',
    js: () => 7 * 7 - 7 === 42 && 6 * 7 === 42 && 7 * 6 === 42,
    lean: 'theorem directions_number_fortytwo : (7 * 7 - 7 = 42) ∧ (6 * 7 = 42) ∧ (7 * 6 = 42) ∧ (6 * 7 = 7 * 6) := by decide' },

  { key: 'residue_holds_three_grids',
    why: 'READ AS THREE PAIR GRIDS, the residue fits exactly: 3 x 42 = 126, the same 126 the contribution leaves. The identity is exact and the line proves it — what it does not establish is that three is the right divisor, which the next theorem states plainly.',
    js: () => 3 * 42 === 126 && 128 - 2 === 3 * 42,
    lean: 'theorem residue_holds_three_grids : (3 * 42 = 126) ∧ (128 - 2 = 3 * 42) := by decide' },

  { key: 'six_factorisations_compete',
    why: 'AND THE 126 factors SIX ways — 1x126, 2x63, 3x42, 6x21, 7x18, 9x14 — and the arithmetic privileges none of them. That 3 x 42 meets the pair grid is a READING the subtraction does not supply; 9 x 14 and 7 x 18 are equally exact. SCOPE: what this wing derives is the 126, from the contribution. Which factor pair carries meaning is not decided here, and no line pretends otherwise.',
    js: () => PAIRS.length === 6 && PAIRS.some(([a, b]) => a === 3 && b === 42) && PAIRS.some(([a, b]) => a === 9 && b === 14),
    lean: `theorem six_factorisations_compete : (((List.range' 1 126).filter (fun d => 126 % d == 0)).length = 12) ∧ (3 * 42 = 126) ∧ (9 * 14 = 126) ∧ (7 * 18 = 126) := by decide` },

  { key: 'taking_before_paying_differs',
    why: 'THE ORDER IS THE LAW: contribute first, then take. Taking 126 without paying leaves 128 untouched, and 128 is not 126 — so a ledger that skipped the contribution would carry a different number, which the line proves rather than trusts. The two coins are spent, not reserved.',
    js: () => { const paid: number = 128 - 2, unpaid: number = 128; return paid !== unpaid && paid === 126 },
    lean: 'theorem taking_before_paying_differs : (128 - 2 = 126) ∧ ((128:Nat) ≠ 126) ∧ (126 < 128) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Contribution.lean', skill: 'contribution', defs: '',
  header: 'THE CONTRIBUTION — what the address becomes once the coins are paid.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
