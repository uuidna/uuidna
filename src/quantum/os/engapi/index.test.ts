import { test } from 'node:test'
import assert from 'node:assert/strict'
import { quantity, qMul, qDiv, qAdd, qSub, qEq, dimUnit, engApi, typeAdvantage, DIMENSIONLESS, DERIVED, BASE_DIMENSIONS, type Dim } from './index.js'

const N: Dim = [1, 1, -2, 0, 0, 0, 0]
const M: Dim = [1, 0, 0, 0, 0, 0, 0]
const S: Dim = [0, 0, 1, 0, 0, 0, 0]

test('an unlawful sum COMPUTES — it returns the gap that would make it lawful, never a throw', () => {
  const bad = qAdd(quantity(1n, 1n, M), quantity(1n, 1n, S))
  assert.equal(bad.lawful, false)
  assert.equal(bad.quantity, null)                    // the wrong NUMBER is still withheld
  assert.deepEqual([...bad.gap], [1, 0, -1, 0, 0, 0, 0])   // m − s: exactly the factor the second operand lacks
  assert.equal(bad.gapUnit, 'm·s⁻¹')
  assert.match(bad.why, /Multiply the second operand/)
  // and the gap is the CURE, not a label: apply it and the same sum becomes lawful
  const fixed = qAdd(quantity(1n, 1n, M), qMul(quantity(1n, 1n, S), quantity(1n, 1n, bad.gap)))
  assert.equal(fixed.lawful, true)
  assert.equal(fixed.quantity!.num, 2n)
})

test('a lawful sum carries the value, and subtraction is the same totality', () => {
  const ok = qAdd(quantity(1n, 2n, M), quantity(1n, 3n, M))
  assert.equal(ok.lawful, true)
  assert.equal(ok.quantity!.num, 5n)
  assert.equal(ok.quantity!.den, 6n)
  assert.equal(qSub(quantity(1n, 1n, M), quantity(1n, 1n, S)).lawful, false)
  assert.equal(qSub(quantity(3n, 1n, M), quantity(1n, 1n, M)).quantity!.num, 2n)
})

test('types decide before anything computes — and the count refutes closure', () => {
  const t = typeAdvantage()
  assert.equal(t.addLawful + t.addCarriesGap, t.orderedPairs)
  assert.equal(t.multiplyAccepts, t.orderedPairs)        // multiplication is TOTAL on the type system
  assert.ok(t.namedProducts < t.orderedPairs)            // the NAMED table is not closed, and says so
  assert.equal(t.comparisonsPerCheck, 7)
})

test('multiply then divide is EXACT — the same num/den pair, not a rounding of it', () => {
  const a = quantity(3n, 7n, N)
  const b = quantity(11n, 13n, S)
  const back = qDiv(qMul(a, b), b)
  assert.ok(qEq(back, a))
  assert.equal(back.num, 3n)
  assert.equal(back.den, 7n)
})

test('exponents add under multiplication and the derived name comes back', () => {
  assert.equal(qMul(quantity(3n, 1n, N), quantity(2n, 1n, M)).unit, 'J')   // force × distance = energy
  assert.equal(dimUnit([2, 1, -3, 0, 0, 0, 0]), 'W')
  assert.equal(dimUnit(DIMENSIONLESS), '1')
  assert.equal(dimUnit([0, 0, -2, 0, 0, 0, 0]), 's⁻²')
})

test('nothing is quietly normalised — zero denominator and zero divisor are refused, never NaN', () => {
  assert.throws(() => quantity(1n, 0n, M), /REFUSED/)
  assert.throws(() => qDiv(quantity(1n, 1n, M), quantity(0n, 1n, S)), /REFUSED/)
})

test('the rational is reduced and the sign rides the numerator', () => {
  const q = quantity(-6n, -4n, M)
  assert.equal(q.num, 3n)
  assert.equal(q.den, 2n)
  assert.equal(quantity(2n, -4n, M).num, -1n)
})

test('equality is of value AND dimension — 1 m is not 1 s', () => {
  assert.equal(qEq(quantity(1n, 1n, M), quantity(1n, 1n, S)), false)
  assert.equal(qEq(quantity(2n, 4n, M), quantity(1n, 2n, M)), true)
})

test('the derived table is definitions, and the claims over it are exact', () => {
  const a = engApi()
  assert.equal(a.base.length, 7)
  assert.equal(BASE_DIMENSIONS.length, 7)
  assert.ok(DERIVED.every((d) => d.dim.length === 7))
  const split = a.claims.find((c) => c.key.includes('cancel_split'))!
  const [l, r] = split.fragment.split('=')
  assert.equal(l!.split('+').reduce((x, y) => x + Number(y), 0), Number(r))
  assert.ok(a.claims.every((c) => !/-\d/.test(c.lean)))   // natural arithmetic only: no negative literals in Lean
})
