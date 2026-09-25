import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
  BASE_QUANTITIES,
  CONCENTRATION,
  DIMENSIONLESS,
  MASS,
  TEMPERATURE,
  VOLUME,
  degenerate,
  dimensionOf,
  formatQuantity,
  per,
  quantity,
  readEquation,
  same,
  times,
  toThe,
  type SymbolTable,
} from './si.js'

const TABLE: SymbolTable = { m: MASS, m2: MASS, V: VOLUME, T: TEMPERATURE, C: CONCENTRATION }

test('the seven are the seven the SI brochure fixes, and there is no eighth', () => {
  assert.equal(BASE_QUANTITIES.length, 7)
  assert.deepEqual(
    BASE_QUANTITIES.map((b) => b.unit),
    ['second', 'metre', 'kilogram', 'ampere', 'kelvin', 'mole', 'candela'],
  )
})

test('the arithmetic is the exponent arithmetic', () => {
  assert.ok(same(times(MASS, VOLUME), quantity({ M: 1, L: 3 })))
  assert.ok(same(per(MASS, VOLUME), quantity({ M: 1, L: -3 })))
  assert.ok(same(toThe(VOLUME, 2), quantity({ L: 6 })))
  assert.ok(same(per(CONCENTRATION, CONCENTRATION), DIMENSIONLESS))
  assert.equal(formatQuantity(CONCENTRATION), 'L⁻³·N')
  assert.equal(formatQuantity(DIMENSIONLESS), '1')
})

/**
 * THE CONTROL BOTH WAYS. An instrument that only ever says "no" agrees with every bad plate by accident and
 * has measured nothing; one that only ever says "yes" is worse. Both answers are demanded of the same checker
 * on the same shapes.
 */
test('a sound equation reads consistent and an unsound one reads inconsistent', () => {
  const sound = readEquation(
    { left: 'm', right: { kind: 'sum', terms: [{ kind: 'symbol', name: 'm' }, { kind: 'symbol', name: 'm2' }] } },
    TABLE,
  )
  assert.equal(sound.verdict, 'consistent')

  const unsound = readEquation(
    { left: 'm', right: { kind: 'sum', terms: [{ kind: 'symbol', name: 'm' }, { kind: 'symbol', name: 'V' }] } },
    TABLE,
  )
  assert.equal(unsound.verdict, 'inconsistent')
})

/**
 * THE MANUFACTURED-AGREEMENT GUARD. A checker that reads what it cannot parse as dimensionless would pass a
 * plate of glyph soup as sound arithmetic — the exact failure this file exists to avoid — so an unknown symbol
 * must REFUSE, and refusal must not be reachable by calling it consistent.
 */
test('an unknown symbol is refused, never taken for a pure number', () => {
  const read = dimensionOf({ kind: 'symbol', name: 'ħ_garbled' }, TABLE)
  assert.equal(read.verdict, 'illegible')

  // and the refusal propagates rather than being swallowed by the surrounding arithmetic
  const inside = dimensionOf(
    { kind: 'quotient', over: { kind: 'symbol', name: 'ħ_garbled' }, by: { kind: 'symbol', name: 'm' } },
    TABLE,
  )
  assert.equal(inside.verdict, 'illegible')
})

/**
 * THE VERDICT MUST DEPEND ON THE TABLE. If a shape alone decided the answer, the seven base quantities would be
 * decoration and the instrument would be measuring its own syntax. Moving ONE symbol's dimension flips it.
 */
test('changing one symbol changes the verdict on the same shape', () => {
  const shape = {
    left: 'm',
    right: { kind: 'sum' as const, terms: [{ kind: 'symbol' as const, name: 'm' }, { kind: 'symbol' as const, name: 'V' }] },
  }
  assert.equal(readEquation(shape, TABLE).verdict, 'inconsistent')
  assert.equal(readEquation(shape, { ...TABLE, V: MASS }).verdict, 'consistent')
})

/**
 * A DEFINITION IS NOT A DISAGREEMENT. Without this rule every definition reads as a failure and the instrument
 * becomes useless and flattering at once — it would report a 100% failure rate on any honest plate.
 */
test('an undeclared left side is defined by its equation, not judged against nothing', () => {
  const defining = readEquation(
    { left: 'F_new', right: { kind: 'quotient', over: { kind: 'symbol', name: 'm' }, by: { kind: 'symbol', name: 'V' } } },
    TABLE,
  )
  assert.equal(defining.verdict, 'consistent')

  // but its right side is still held to account
  const badDefinition = readEquation(
    { left: 'F_new', right: { kind: 'sum', terms: [{ kind: 'symbol', name: 'm' }, { kind: 'symbol', name: 'V' }] } },
    TABLE,
  )
  assert.equal(badDefinition.verdict, 'inconsistent')
})

/**
 * NECESSARY, NOT SUFFICIENT — the claim the header makes, demonstrated rather than asserted. The same equation
 * passes the dimensional read and is still arithmetic nonsense, so one instrument cannot stand in for the other.
 */
test('dimensions pass an equation that forces its own addend to zero', () => {
  const selfSum = {
    left: 'm',
    right: { kind: 'sum' as const, terms: [{ kind: 'symbol' as const, name: 'm' }, { kind: 'symbol' as const, name: 'm2' }] },
  }
  assert.equal(readEquation(selfSum, TABLE).verdict, 'consistent')
  assert.match(degenerate(selfSum) ?? '', /forced to zero/)

  // and the second instrument does not fire on an equation that is merely wrong
  assert.equal(
    degenerate({ left: 'm', right: { kind: 'sum', terms: [{ kind: 'symbol', name: 'V' }, { kind: 'symbol', name: 'C' }] } }),
    undefined,
  )
})
