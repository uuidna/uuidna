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
  assert.equal(holds('(List.range 7).all (fun d => d = d)'), null)
  assert.equal(evaluable('(List.range 7).all (fun d => d = d)'), false)
})

test('fixed is reported apart from survives — a map gets no credit for what it does not move', () => {
  const c = census(divZero)
  const overlap = c.fixed.filter((k) => c.survives.includes(k))
  assert.equal(overlap.length, 0)
  assert.ok(c.fixed.length > 0 && c.survives.length > 0)
})

test('THE LAW DISCRIMINATES — and what the fixed point buys is FIXED POINTS, not survivors', () => {
  const dz = census(divZero), vx = census(vortex)
  // CORRECTED. I claimed divZero admits ~5x more survivors than the vortex negation. That was an artifact of
  // the same modulus bug rule 1 records: the earlier vortex run reflected the 9 in `% 9` to 0, wrecking those
  // statements and suppressing its count to 17. With the modulus preserved the vortex admits MORE survivors
  // than divZero, not fewer. What inverting 0 actually buys is fixed points — 78 against 46 — because 0 and 5
  // are held still, and a survivor and a fixed point are different things: one was tested and passed, the
  // other was never moved.
  assert.ok(vx.survives.length > dz.survives.length, 'measured: the vortex admits more survivors')
  assert.ok(dz.fixed.length > vx.fixed.length, 'and divZero holds more still — that is what the fixed point buys')
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
  assert.equal(stripAscriptions('((2:Nat)^2 < 2^3)'), '(2^2 < 2^3)')
  assert.equal(stripAscriptions('(-3 : Int) + 1'), '-3 + 1')
  assert.equal(stripAscriptions('no ascription here'), 'no ascription here')
  assert.equal(evaluable('((2:Nat)^2 < 2^3) ∧ (2^3 = 8)'), true, 'reachable now, and it was only ever syntax')
  assert.equal(holds('((2:Nat)^2 < 2^3) ∧ (2^3 = 8)'), true)
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
  assert.equal(holds('(List.range 7).length / 1 = 7'), null)
})

test('INEQUALITY IS LEAN ≠ — another pure-syntax gap that left sealed inequalities unreached', () => {
  // roman_reads_subtractively seals 9 ≠ 11; without ≠ the whole conjunction stayed unreached for a character.
  assert.equal(evaluable('10 - 1 = 9 ∧ 1 + 10 = 11 ∧ 9 ≠ 11'), true)
  assert.equal(holds('10 - 1 = 9 ∧ 1 + 10 = 11 ∧ 9 ≠ 11'), true)
  assert.equal(holds('9 ≠ 9'), false)
  assert.equal(holds('9 ≠ 11'), true)
  assert.equal(holds('(2:Nat) ≠ 0'), true)
  // List forms still refuse — widening ≠ must not start claiming what it cannot parse
  assert.equal(holds('(List.range 7).length ≠ 0'), null)
})
