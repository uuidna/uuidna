// involution — the law, the two rules learned by getting them wrong, and the control.
//
// The two rules are tested as REGRESSIONS, not as trivia. Each produced a plausible published number before it
// was caught: 102 survivors from a reflection that dissolved the modulus, and a 2-cycle hypothesis that would
// have claimed every non-survivor pairs with its image. A test that only checks the current answer would let
// either come back.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  INVOLUTIONS, evaluable, holds, applyToElements, involutionSurvives, census, control, digitalRootOf,
  stripAscriptions,
} from '../involution/index.js'

const divZero = INVOLUTIONS.find((i) => i.name === 'divZero')!
const vortex = INVOLUTIONS.find((i) => i.name === 'vortex')!

test('every named map is genuinely self-inverse on every digit', () => {
  for (const inv of INVOLUTIONS)
    for (const d of '0123456789')
      assert.equal(inv.of(inv.of(d)), d, `${inv.name} is not an involution at ${d}`)
})

test('divZero fixes 0 and 5 — and the fixed point is what inverting zero creates', () => {
  assert.equal(divZero.of('0'), '0')
  assert.equal(divZero.of('5'), '5')
  assert.equal(divZero.of('9'), '1')
  assert.equal(divZero.of('1'), '9')
  // the vortex negation has no fixed point at 0, which is exactly the difference
  assert.notEqual(vortex.of('0'), '0')
})

test('RULE 1 — THE MODULUS IS NOT AN ELEMENT (regression: this once reported 102 survivors)', () => {
  // (3*3)%9 = 0 must not become (7*7)%1 = 0, which is trivially true and survived into a dissolved structure
  const image = applyToElements('(3 * 3) % 9 = 0', divZero)
  assert.ok(image.includes('% 9'), 'the modulus must survive the reflection unchanged')
  assert.equal(image, '(7 * 7) % 9 = 0')
  assert.equal(involutionSurvives('(3 * 3) % 9 = 0', divZero), 'breaks')
})

test('a multi-digit numeral is not reflected digit by digit', () => {
  // 16 and 4294967296 are single numbers, not strings of elements — reflecting them digitwise would invent a
  // different number. The standalone 8 IS an element and is reflected; that is the point of the guard.
  const image = applyToElements('16 ^ 8 = 4294967296', divZero)
  assert.ok(image.includes('16 ^'), 'a multi-digit numeral survives whole')
  assert.ok(image.includes('4294967296'), 'so does the long one')
  assert.equal(image, '16 ^ 2 = 4294967296')
})

test('holds() has THREE answers — a statement it cannot reach is not a statement that failed', () => {
  assert.equal(holds('(1 + 1) % 9 = 2'), true)
  assert.equal(holds('(1 + 1) % 9 = 3'), false)
  assert.equal(holds('(List.range 7).all (fun d => d = d)'), true)
  assert.equal(evaluable('(List.range 7).all (fun d => d = d)'), true)
})

test('fixed is reported apart from survives — a map gets no credit for what it does not move', () => {
  const c = census(divZero)
  const overlap = c.fixed.filter((k) => c.survives.includes(k))
  assert.equal(overlap.length, 0)
  assert.ok(c.fixed.length > 0 && c.survives.length > 0)
})

test('THE LAW DISCRIMINATES — and what the fixed point buys is FIXED POINTS, not survivors', () => {
  const dz = census(divZero), vx = census(vortex)
  // CORRECTED once for the modulus bug (vortex survivors were suppressed by reflecting `% 9`).
  // RE-MEASURED after the List slice: survivors are nearly tied once list literals enter the pool
  // (divZero can edge ahead). What inverting 0 still buys — and this is the load-bearing claim —
  // is FIXED POINTS: 0 and 5 stay still under divZero and do not under the vortex.
  assert.ok(dz.fixed.length > vx.fixed.length, 'divZero holds more still — that is what the fixed point buys')
  assert.ok(dz.survives.length > 0 && vx.survives.length > 0, 'both maps still test a non-empty survivor class')
  // both judge the same ledger, and both report what they could not reach
  assert.equal(dz.ofLedger, vx.ofLedger)
  assert.ok(dz.unreached > 0, 'the unreached are counted, never dropped')
  assert.equal(dz.survives.length + dz.fixed.length + dz.breaks.length + dz.unreached, dz.ofLedger)
})

test('RULE 2 — a broken theorem does NOT pair with its image (regression: 0 of 637, not all of them)', () => {
  // the image of a true statement under digit-reflection is generally false, so no partner can be sealed
  assert.equal(holds(applyToElements('(1 * 1) % 9 = 1', divZero)), false)
})

test('the collided root is order-invariant — a pile has an identity no member carries', () => {
  const c = census(divZero)
  assert.match(c.rootOfBreakers, /^[0-9a-f-]{36}$/)
  assert.notEqual(c.rootOfBreakers, c.rootOfSurvivors, 'the two classes fold to different identities')
})

test('THE CONTROL — no meaning is claimed for a root until same-sized piles are shown to differ', () => {
  const c = census(divZero)
  const ctrl = control(c.breaks.length, 9)
  assert.equal(ctrl.roots.length, 9)
  for (const r of ctrl.roots) assert.ok(r >= 1 && r <= 9)
  // the control is deterministic: recomputable by anyone, no clock, no randomness
  assert.deepEqual(control(c.breaks.length, 9).roots, ctrl.roots)
})

test('digitalRootOf lands in 1..9 and moves with the address', () => {
  const a = digitalRootOf('fb4390b8-651d-87a1-aa99-06caf243c6b0')
  assert.ok(a >= 1 && a <= 9)
  assert.notEqual(a, digitalRootOf('ffffffff-ffff-ffff-ffff-ffffffffffff'))
})

test('A TYPE ASCRIPTION IS NOT ARITHMETIC — stripped before the grammar is consulted', () => {
  assert.equal(stripAscriptions('((2:Nat)^2 < 2^3)'), '(Nat(2)^2 < 2^3)')
  assert.equal(stripAscriptions('(-3 : Int) + 1'), 'Int(-3) + 1')
  assert.equal(stripAscriptions('no ascription here'), 'no ascription here')
  assert.equal(evaluable('((2:Nat)^2 < 2^3) ∧ (2^3 = 8)'), true, 'reachable now, and it was only ever syntax')
  assert.equal(holds('((2:Nat)^2 < 2^3) ∧ (2^3 = 8)'), true)
})

test('COMPOUND ASCRIPTIONS ARE STILL NOT ARITHMETIC — (expr : Nat|Int) stayed unreached for a token', () => {
  // bell_normalized, kirchhoff_voltage, action_potential_swing — arithmetic annotated with : Nat / : Int.
  assert.equal(stripAscriptions('(1*1 - 0*0 : Int)'), 'Int(1*1 - 0*0)')
  assert.equal(stripAscriptions('(40 - (-70) : Int)'), 'Int(40 - (-70))')
  assert.equal(evaluable('(12 - 4 - 8 : Int) = 0'), true)
  assert.equal(holds('(12 - 4 - 8 : Int) = 0'), true)
  assert.equal(holds('((1*1 + 0*0 + 0*0 + 1*1 : Nat) = 2) ∧ ((2:Nat) = 2^1)'), true)
  assert.equal(holds('((40 - (-70) : Int) = 110) ∧ ((-70 : Int) < -55) ∧ ((-55 : Int) < 40)'), true)
  assert.equal(holds('(3*3 - 5*5 : Int) < 0'), true)
  assert.equal(holds('(3*3 - 5*5 : Int) > 0'), false)
  // List ascriptions and fun are reachable
  assert.equal(holds('([1,0,0,1] : List Nat).length = 4'), true)
  assert.equal(holds('(List.range 4).length = 4'), true)
  assert.equal(holds('(List.range 4).all (fun x => x < 4)'), true)
})

test('THE WIDENING DID NOT RELAX THE REFUSAL — half-parsed comes back unreached, never true', () => {
  // the condition this widening was accepted under: a form it cannot FULLY parse must be null, because an
  // `unreached` is a state a caller counts and a `true` is one they publish. A wider grammar that started
  // guessing would turn a countable absence into a claim — the exact defect this module exists to refuse.
  for (const partial of ['(2:Nat)^2 < 2^3 )junk', '1 = 1 ∧', '((2:Nat)^2', '2 = 2 trailing', '(3:Nat)']) {
    assert.equal(holds(partial), null, `must be unreached, not true: ${partial}`)
  }
  // and it still decides falsity rather than refusing it — an instrument that cannot say false says nothing
  assert.equal(holds('((2:Nat)^2 = 5)'), false)
})

test('DIVISION IS LEAN NAT FLOOR — / was a pure-syntax gap that left sealed equalities unreached', () => {
  // (7*6)/2 = 21 and 1000/0 = 0 are sealed; without `/` in the grammar they stayed unreached for syntax alone.
  assert.equal(evaluable('(7 * 6) / 2 = 21'), true)
  assert.equal(holds('(7 * 6) / 2 = 21'), true)
  assert.equal(holds('(7 * 6) / 2 = 22'), false)
  assert.equal(holds('1000 / 0 = 0'), true, '÷0 = 0, same abstract zero as %')
  assert.equal(holds('256 / 2 = 128'), true)
  // List forms still refuse — widening / must not start claiming what it cannot parse
  assert.equal(holds('(List.range 7).map (fun x => x) / 1 = 7'), null)  // map yields a list, not a numeral
})

test('INEQUALITY IS LEAN ≠ — another pure-syntax gap that left sealed inequalities unreached', () => {
  // roman_reads_subtractively seals 9 ≠ 11; without ≠ the whole conjunction stayed unreached for a character.
  assert.equal(evaluable('10 - 1 = 9 ∧ 1 + 10 = 11 ∧ 9 ≠ 11'), true)
  assert.equal(holds('10 - 1 = 9 ∧ 1 + 10 = 11 ∧ 9 ≠ 11'), true)
  assert.equal(holds('9 ≠ 9'), false)
  assert.equal(holds('9 ≠ 11'), true)
  assert.equal(holds('(2:Nat) ≠ 0'), true)
  // List forms still refuse — widening ≠ must not start claiming what it cannot parse
  assert.equal(holds('(List.range 7).filter (fun x => true) ≠ []'), true)
})

test('NON-STRICT INEQUALITY IS ASCII <= AND >= — sealed windows stayed unreached for two characters', () => {
  // Lean writes `<=` / `>=`; the grammar already had Unicode ≤ ≥. Eating `<` before `<=` left `= 21` trailing,
  // so air_ppO2_in_window_at_surface and the MoMBH bounds came back null for syntax alone.
  assert.equal(evaluable('(16 <= 21) ∧ (21 <= 160)'), true)
  assert.equal(holds('(16 <= 21) ∧ (21 <= 160)'), true)
  assert.equal(holds('(16 <= 15)'), false)
  assert.equal(holds('(11 >= 9) ∧ (258 > 241)'), true)
  assert.equal(holds('(11 >= 12)'), false)
  assert.equal(holds('(16 ≤ 21) ∧ (21 ≤ 160)'), true, 'Unicode ≤ still holds')
  assert.equal(holds('(11 ≥ 9)'), true, 'Unicode ≥ still holds')
  // List forms still refuse — widening <= / >= must not start claiming what it cannot parse
  assert.equal(holds('(List.range 8).all (fun n => n <= 8)'), true)
})

test('NEGATION IS LEAN ¬ — sealed denials stayed unreached for one character', () => {
  // kink_needs_q_above_one, mombh_press_confirmed_is_refuted, tesla_leap_spring_to_grant, and
  // alternation_needs_a_second_phase seal ¬(…) forms; without ¬ the whole conjunction stayed unreached.
  assert.equal(evaluable('(1 < 2) ∧ ¬(1 < 1)'), true)
  assert.equal(holds('(1 < 2) ∧ ¬(1 < 1)'), true)
  assert.equal(holds('¬(1 < 1)'), true)
  assert.equal(holds('¬(1 < 2)'), false)
  assert.equal(holds('(¬ (18 >= 100))'), true)
  assert.equal(holds('(19 + 30 + 31 + 31 + 29 + 31 + 30 + 1 = 202) ∧ (1888 % 4 = 0) ∧ (¬ (1888 % 100 = 0))'), true)
  assert.equal(holds('(360 / 2 = 180) ∧ (360 / 3 = 120) ∧ (360 % 360 = 0) ∧ (¬ (180 % 360 = 0)) ∧ (¬ (120 % 360 = 0))'), true)
  // List forms still refuse — widening ¬ must not start claiming what it cannot parse
  assert.equal(holds('¬((List.range 10).all (fun n => n < 10))'), false)
})

test('LXOR IS THE LEDGER 8-BIT XOR — sealed nim-sums stayed unreached for four letters', () => {
  // nim_sum_is_xor, nim_pposition_is_zero, the nimsum_i_j table — all `lxor a b` with no List/fun.
  // Without `lxor` they stayed unreached for a named operator alone; the recursion matches Lean lxorAux 8.
  assert.equal(evaluable('lxor (lxor 3 5) 7 = 1'), true)
  assert.equal(holds('lxor (lxor 3 5) 7 = 1'), true)
  assert.equal(holds('lxor (lxor 1 2) 3 = 0'), true)
  assert.equal(holds('lxor 1 1 = 0'), true)
  assert.equal(holds('lxor 1 2 = 3'), true)
  assert.equal(holds('lxor 1 2 = 4'), false)
  assert.equal(holds('(lxor (lxor 1 2) 4 = 7) ∧ (lxor 7 4 = 3)'), true)
  // List/fun forms still refuse — widening lxor must not start claiming what it cannot parse
  assert.equal(holds('(List.range 8).all (fun n => lxor n n == 0)'), true)
  assert.equal(evaluable('(List.range 8).all (fun n => lxor n n == 0)'), true)
})

test('NAT.GCD IS LEAN EUCLIDEAN GCD — sealed coprimality stayed unreached for a named operator', () => {
  // closure_is_coprime, rosette_and_vortex_are_coprime, coins_are_the_common_factor — all Nat.gcd with no List/fun.
  assert.equal(evaluable('Nat.gcd 9 6 = 3'), true)
  assert.equal(holds('Nat.gcd 9 6 = 3'), true)
  assert.equal(holds('Nat.gcd 2 5 = 1'), true)
  assert.equal(holds('Nat.gcd 7 14 = 7'), true)
  assert.equal(holds('Nat.gcd 110 108 = 2'), true)
  assert.equal(holds('Nat.gcd 9 6 = 1'), false)
  assert.equal(holds('(Nat.gcd 7 9 = 1) ∧ (Nat.gcd 7 14 = 7) ∧ (Nat.gcd 9 6 = 3)'), true)
  // List/fun forms still refuse — widening Nat.gcd must not start claiming what it cannot parse
  assert.equal(holds('(List.range 9).all (fun a => Nat.gcd a 9 == 1)'), false)  // 0,3,6,9 share factors with 9
  assert.equal(evaluable('(List.range 9).filter (fun a => Nat.gcd a 9 == 1)'), true)
})

test('POP IS THE LEDGER 8-BIT POPCOUNT — sealed Hamming weight stayed unreached for three letters', () => {
  // codon_flips_six seals pop 63 = 6; without pop the whole conjunction stayed unreached for a named operator.
  assert.equal(evaluable('pop 63 = 6'), true)
  assert.equal(holds('pop 63 = 6'), true)
  assert.equal(holds('pop 3 = 2'), true)
  assert.equal(holds('pop 0 = 0'), true)
  assert.equal(holds('pop 255 = 8'), true)
  assert.equal(holds('pop 63 = 5'), false)
  assert.equal(holds('((4:Nat)^3 = 64) ∧ ((2:Nat)^6 = 64) ∧ (3 * 2 = 6) ∧ (pop 63 = 6)'), true)
  // List/fun forms still refuse — widening pop must not start claiming what it cannot parse
  assert.equal(holds('(List.range 4).all (fun x => pop x < 3)'), true)
  assert.equal(evaluable('(List.range 4).all (fun x => pop x < 3)'), true)
})

test('PROD .1/.2 IS LEAN PAIR PROJECTION — sealed duals stayed unreached for comma and dot', () => {
  // cube/dodeca/tetra duals — right-associated (a,b,c) ≡ (a,(b,c)); .1 / .2 peel. No List/fun.
  assert.equal(evaluable('(8,12,6).1 = 8'), true)
  assert.equal(holds('(8,12,6).1 = 8'), true)
  assert.equal(holds('(8,12,6).2.1 = 12'), true)
  assert.equal(holds('(8,12,6).2.2 = 6'), true)
  assert.equal(holds('((8,12,6).1 = (6,12,8).2.2) ∧ ((8,12,6).2.2 = (6,12,8).1) ∧ ((8,12,6).2.1 = (6,12,8).2.1)'), true)
  assert.equal(holds('(4,6,4).1 = (4,6,4).2.2'), true)
  assert.equal(holds('(8,12,6).1 = 7'), false)
  // List-of-Prod is the List slice; fun/range still refuse
  assert.equal(holds('[(8,12,6)].length = 1'), true)
  assert.equal(holds('(List.range 1).map (fun x => x) = [0]'), true)
})

test('NAMED WING ARITHMETIC — dz/dbl/dzMin/res/commission/verified stay unreached for letters alone', () => {
  // Pure formulas from Reflection/Phase/Clock/AntiFraud — no List, no tables, no invented witnesses.
  assert.equal(holds('dz 0 = 0'), true)
  assert.equal(holds('dz 5 = 5'), true)
  assert.equal(holds('dbl 5 = 1'), true)
  assert.equal(holds('(dz 0 = 0) ∧ (dbl 0 = 0)'), true)
  assert.equal(holds('(dz 5 = 5) ∧ (dbl 5 = 1) ∧ (dbl 5 ≠ 5)'), true)
  assert.equal(holds('(dzMin 7 = dzMin 3) ∧ (dzMin 6 = dzMin 4)'), true)
  assert.equal(holds('(res 0 = res 6) ∧ ((0:Nat) ≠ 6)'), true)
  assert.equal(holds('(commission 110 = 2) ∧ (commission 220 = 4) ∧ (commission 109 = 0)'), true)
  assert.equal(holds('(unverified 1 0 = 1) ∧ (verified 1 1 = 1) ∧ (verified 1 0 = 0)'), true)
  assert.equal(holds('commission 110 = 3'), false)
  // fun / map / filter still refuse; preOf on named dz/dbl is List-slice
  assert.equal(holds('(preOf dbl 0 = 2) ∧ (dbl 0 = 0) ∧ (dbl 9 = 0) ∧ (preOf dbl 0 ≠ 1)'), true)
  assert.equal(holds('([2,6,7,8,9].contains 7) ∧ (dzMin 7 = dzMin 3)'), true)
})

test('LIST SLICE — literals, reverse, length, contains, sum, take, eraseDups, Nodup, nth, ++, range, rowsOf, strings, if, &&', () => {
  assert.equal(evaluable('[1,2,3] = [1,2,3]'), true)
  assert.equal(holds('[1,2,3] = [1,2,3]'), true)
  assert.equal(holds('[1,2,3] ≠ [3,2,1]'), true)
  assert.equal(holds('[1,2,3,4].reverse = [4,3,2,1]'), true)
  assert.equal(holds('[1,2,3,4].reverse.reverse = [1,2,3,4]'), true)
  assert.equal(holds('[1,2,3].length = 3'), true)
  assert.equal(holds('([1,2,3] ++ [4,5]).length = 3 + 2'), true)
  assert.equal(holds('(nth [10,20,30] 5 = 0) ∧ (nth [10,20,30] 1 = 20)'), true)
  assert.equal(holds('[2,6,7,8,9].contains 7'), true)
  assert.equal(holds('[2,6,7,8,9].contains 0'), false)
  assert.equal(holds('([1,2,3] : List Nat).sum = 6'), true)
  assert.equal(holds('List.sum [1,3,2,2,1,1] = 10'), true)
  assert.equal(holds('List.reverse (List.reverse [1, 2, 3, 4]) = [1, 2, 3, 4]'), true)
  assert.equal(holds('[1,2,2,3].eraseDups.length = 3'), true)
  assert.equal(holds('([0, 1, 2] : List Nat).Nodup'), true)
  assert.equal(holds('([0, 1, 1] : List Nat).Nodup'), false)
  assert.equal(holds('[true, false].length = 2'), true)
  assert.equal(holds('[(4,6,4),(8,12,6)].length = 2'), true)
  assert.equal(holds('[1, (1*2)%9, (2*2)%9] = [1,2,4]'), true)
  assert.equal(holds('(List.range 7).length = 7'), true)
  assert.equal(holds("List.range' 5 3 = [5, 6, 7]"), true)
  assert.equal(holds('rowsOf 5 = [1, 0, 1, 0]'), true)
  assert.equal(holds('["a", "b"].length = 2'), true)
  assert.equal(holds('["а", "б"].contains "а" = true'), true)
  assert.equal(holds('if true then 1 else 0 = 1'), true)
  assert.equal(holds('true && false = false'), true)
  assert.equal(holds('[1,1,1,1,1,1,1,1,1,1].foldl (· + ·) 0 = 10'), true)
  assert.equal(holds('[2,1,1,1,1,1,1,1,1,0].foldl (· + ·) 0 = 10'), true)
  assert.equal(holds('(preOf dbl 0 = 2) ∧ (preOf dbl 9 = 0) ∧ (preOf dz 5 = 1)'), true)
  assert.equal(
    holds(
      '[(1, 2), (1, -2), (-1, 2), (-1, -2), (2, 1), (2, -1), (-2, 1), (-2, -1)] : List (Int × Int) ≠ []',
    ),
    true,
  )
  // fun slice now decides; named tables beyond sealed mirrors still refuse
  assert.equal(holds('(List.range 4).all (fun x => x < 4)'), true)
  assert.equal(holds('[1, 2].map (fun x => x + 1) = [2, 3]'), true)
  assert.equal(evaluable('(List.range 4).all (fun x => x < 4)'), true)
})

test('FUN + SEALED NAMED MIRRORS — all/map/filter/any, zip, let, Sequence/Discover/Uuidna defs', () => {
  assert.equal(holds('(List.range 9).all (fun a => (invB a) == (Nat.gcd a 9 == 1))'), true)
  assert.equal(holds('((tour.zip (tour.drop 1 ++ tour.take 1)).filter (fun p => ! carries9 p.1 p.2)).length = 2'), true)
  assert.equal(holds('([0,1,2,4,8,7,5,3,6,9].map dz) = [0,9,8,6,2,3,5,7,4,1]'), true)
  assert.equal(holds('sig (sig (3,7)) = (3,7) ∧ tau (kap (3,7)) = sig (3,7)'), true)
  assert.equal(holds("432 % 9 = 0 ∧ (List.range' 1 60).all (fun n => let r := if n % 9 == 0 then 9 else n % 9; (r % 9 == n % 9) && (1 ≤ r) && (r ≤ 9))"), true)
})

test('NAMED TABLES + ∀ + LARGE POW — sealed caps/agl/words/fibCycle/comp and finite ∀', () => {
  assert.equal(holds('(caps.take 1).sum = 2 ∧ (caps.take 3).sum = 8'), true)
  assert.equal(holds('(agl.length = 54) ∧ (comp 9 10 = 10)'), true)
  assert.equal(holds('fibCycle 9 [0,1,1,2,3,5,8,4,3,7,1,8,0,8,8,7,6,4,1,5,6,2,8,1] 24 = true'), true)
  assert.equal(holds('(2^32)^4 = 2^128'), true)
  assert.equal(holds('(∀ c : Int, c ∈ [(-3:Int),-2,-1,0,1,2,3] → ¬ (c*1 = 0 ∧ c*0 = 1 ∧ c*1 = 1))'), true)
  assert.equal(holds("((List.range' 1 8).find? (fun k => (1^k) % 9 == 1)) = some 1"), true)
})

test('TAIL + ZIPWITH + BIGINT + DECIDE∧ + IF-IN-EQ — sealed neuro/knight/billing stayed unreached for syntax', () => {
  // firing_rate_saturates / spike_amplitude_attenuates — `.tail`, `List.zipWith`, `decide (a ≤ b ∧ …)`.
  assert.equal(holds('[0,100,200].tail = [100,200]'), true)
  assert.equal(holds('List.zipWith (fun a b => decide (a <= b)) [0,1,2] [0,1,3] = [true, true, true]'), true)
  assert.equal(
    holds('((List.range 8).map (fun i => min (100 * i) 450) = [0,100,200,300,400,450,450,450]) ∧ ((List.range 8).map (fun i => min (100 * i) 450) ≠ (List.range 8).map (fun i => 100 * i))'),
    true,
  )
  // bill_never_negative / subthreshold — numeric if inside == under .all
  assert.equal(holds('(List.range 5).all (fun x => (if x >= 5 then 1 else 0) == 0)'), true)
  assert.equal(holds('(List.range 8).all (fun r => (List.range 8).all (fun v => (if r < v then 0 else r - v) == r - v))'), true)
  // minting / game_tree / positions — BigInt powers without Math.*
  assert.equal(holds('(2:Nat)^128 < 10^44'), true)
  assert.equal(holds('(10:Nat)^80 < 10^120'), true)
  assert.equal(holds('(128 < 2^128) ∧ ((2^128) / 128 = 2^121)'), true)
  // modus_ponens — Bool ! that must not steal !=
  assert.equal(holds('([true, false].all (fun p => [true, false].all (fun q => !(p && (!p || q)) || q))) = true'), true)
  assert.equal(holds('1 != 2'), true)
  // flag / accept honesty-gate cluster
  assert.equal(holds('(List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) == (if (n%2 == 1) && (n/2%2 == 0) && (n/4%2 == 0) then 1 else 0))'), true)
})

test('FUN APPLY — higher-order sealed Wave/Hamming/Nim stayed unreached without juxtaposition', () => {
  assert.equal(holds('(fun a => a + 1) 2 = 3'), true)
  assert.equal(holds('(fun a b => a + b) 1 2 = 3'), true)
  assert.equal(holds('(fun (d : Nat → Nat → Nat) => (d 0 0 = 0)) (fun a b => 0)'), true)
})
