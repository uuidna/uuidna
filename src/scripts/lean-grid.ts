#!/usr/bin/env node
// Automate the Lean layer for THE GRID RULE, BASE-AGNOSTIC — the growth law stated so it does not depend on how
// numbers are written. PURE ARITHMETIC: every value is a wing count, a ray count or a remainder.
//
// WHAT WAS FITTED. k432 seals 432 = 6 x 72 and 432 = 16 x 27, fused through the "involution" rev(72) = 27. The 6
// is DERIVED and survives untouched: seven dimensions minus the identity ray, since projecting a wing into the
// language it is written in computes nothing (7 x 72 - 72 = 432). The 27 is not derived — it is 72's decimal
// digits reversed, and Notation.lean decides that digit reversal acts on the SPELLING: rev(75) = 57 gives 912 and
// rev(78) = 87 gives 1392, neither of them 432. In hexadecimal it fails outright, since 72 is 0x48, its reversal
// is 0x84 = 132, and 16 x 132 = 2112.
//
// AND THE GROWTH RULE INHERITED THE BASE. Harmony was "6w has digital root 9", which is the base-ten digit-sum
// invariant (10 = 1 mod 9), giving w = 0 mod 3 — wings three at a time. The addresses this ledger computes are
// written in BASE SIXTEEN, whose invariant is mod 15 (16 = 1 mod 15), and that asks for w = 0 mod 5 — five at a
// time. Two bases, two different rules, and neither is a property of wings.
//
// THE BASE-AGNOSTIC FORM. A count satisfying both is w = 0 mod 15, since lcm(3,5) = 15. That rule holds whatever
// base the reader writes in, which is the only kind of rule worth gating on.
import { emit } from './lean-gen.js'

const RAYS = 6
const rev10 = (n: number) => Number(String(n).split('').reverse().join(''))
const CASES = [72, 75, 78, 90, 91, 95, 105]
const L = (xs: number[]) => '[' + xs.join(',') + ']'

const FACTS = [
  { key: 'decimal_asks_three',
    why: 'THE BASE-TEN RULE: 6w carries digital root nine exactly when w is a multiple of three, since the decimal digit-sum invariant is mod 9 and gcd(6,9) = 3. Wings three at a time — a consequence of writing in ten.',
    js: () => [72, 75, 78, 90, 105].every((w) => (RAYS * w) % 9 === 0 && w % 3 === 0) && (RAYS * 91) % 9 !== 0,
    lean: 'theorem decimal_asks_three : ((List.range 40).all (fun w => ((6 * w) % 9 == 0) == (w % 3 == 0))) ∧ ((6 * 91) % 9 ≠ 0) := by decide' },

  { key: 'hexadecimal_asks_five',
    why: 'THE BASE-SIXTEEN RULE: the hexadecimal digit-sum invariant is mod 15 (since 16 = 1 mod 15), so 6w vanishes there exactly when w is a multiple of FIVE. The same grid, the same six rays, a different demand — and the addresses this ledger computes are written in sixteen.',
    js: () => [90, 95, 105].every((w) => (RAYS * w) % 15 === 0 && w % 5 === 0) && (RAYS * 72) % 15 !== 0,
    lean: 'theorem hexadecimal_asks_five : ((List.range 40).all (fun w => ((6 * w) % 15 == 0) == (w % 5 == 0))) ∧ ((6 * 72) % 15 ≠ 0) := by decide' },

  { key: 'seventytwo_is_decimal_only',
    why: 'AND THE SEALED WIDTH SATISFIES ONE BASE ONLY: 6 x 72 = 432 leaves 0 mod 9 and 12 mod 15. The count the grid was fitted to is harmonic in decimal and unremarkable in hexadecimal, which the line proves rather than leaves to be noticed.',
    js: () => { const nine: number = 432 % 9, fifteen: number = 432 % 15; return nine !== fifteen && nine === 0 && fifteen === 12 },
    lean: 'theorem seventytwo_is_decimal_only : (6 * 72 = 432) ∧ (432 % 9 = 0) ∧ (432 % 15 = 12) ∧ (432 % 15 ≠ 0) := by decide' },

  { key: 'reversal_fails_in_hexadecimal',
    why: 'THE FUSION IS DECIMAL SPELLING, shown in the base the addresses use: 72 is 0x48, its hex reversal is 0x84 = 132, and 16 x 132 = 2112 rather than 432. The identity that fused the two factorisations holds for one spelling in one base and nowhere else.',
    js: () => rev10(72) === 27 && 16 * 27 === 432 && 16 * 132 !== 432 && 16 * 132 === 2112,
    lean: 'theorem reversal_fails_in_hexadecimal : (16 * 27 = 432) ∧ (16 * 132 = 2112) ∧ (16 * 132 ≠ 432) := by decide' },

  { key: 'fifteen_satisfies_both',
    why: 'THE BASE-AGNOSTIC RULE: a wing count divisible by FIFTEEN satisfies decimal and hexadecimal at once, because lcm(3,5) = 15. Such a rule holds whatever base a reader writes in, which is the only kind worth gating on — and 90 is the first count in range that meets it.',
    js: () => [90, 105].every((w) => w % 15 === 0 && (RAYS * w) % 9 === 0 && (RAYS * w) % 15 === 0) && 91 % 15 !== 0,
    lean: 'theorem fifteen_satisfies_both : ((List.range 40).all (fun w => (w % 15 == 0) == (((6 * w) % 9 == 0) && ((6 * w) % 15 == 0)))) ∧ (90 % 15 = 0) ∧ (91 % 15 ≠ 0) := by decide' },

  { key: 'six_rays_stay_derived',
    why: 'AND WHAT SURVIVES UNTOUCHED: the six is derived. Seven dimensions less the identity ray, because projecting a wing into the language it is already written in computes nothing — 7 x 72 - 72 = 432 = 6 x 72. The multiplier was never the problem; only the constant it was multiplied to.',
    js: () => 7 * 72 - 72 === 432 && RAYS * 72 === 432 && 7 - 1 === 6,
    lean: 'theorem six_rays_stay_derived : (7 * 72 - 72 = 432) ∧ (6 * 72 = 432) ∧ (7 - 1 = 6) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Grid.lean', skill: 'grid', defs: '',
  header: 'THE GRID RULE, BASE-AGNOSTIC — the growth law stated so it does not depend on how numbers are written.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
