import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
  PLATE,
  READINGS,
  auditPlate,
  degenerate,
  dimensionOf,
  plateCensus,
  readEquation,
  type SymbolTable,
} from './dry-cleaning.js'
import { DIMENSIONLESS, type Dim } from './quantum/os/engapi/index.js'

const MASS: Dim = [0, 1, 0, 0, 0, 0, 0]
const VOLUME: Dim = [3, 0, 0, 0, 0, 0, 0]
const CONCENTRATION: Dim = [-3, 0, 0, 0, 0, 1, 0]
const TABLE: SymbolTable = { m: MASS, m2: MASS, V: VOLUME, C: CONCENTRATION, k: DIMENSIONLESS }

/**
 * THE RESULT THE RECORD DID NOT ALREADY CARRY. The plate's own assessment rates its mathematics "standard
 * chemical engineering models". The instrument agrees about exactly one equation and disagrees about ten, and
 * the one it agrees with is the textbook tetrachloroethylene partition ratio — the chemistry survived the
 * render and the algebra around it did not. Pinned, so a later edit to the plate or the table has to say so.
 */
test('the plate reads: two consistent, ten inconsistent, three refused', () => {
  const census = plateCensus()
  assert.deepEqual(census, {
    consistent: 2,
    contested: 0,
    illegible: 3,
    inconsistent: 10,
    passing_but_forced: 1,
    total: 15,
  })
  assert.equal(census.total, PLATE.length)
})

/** The surviving equation is named, so "two consistent" cannot quietly become two different ones. */
test('the equation that survives the render is the partition ratio', () => {
  const surviving = auditPlate()
    .filter((a) => a.verdict === 'consistent' && a.forced === undefined)
    .map((a) => a.as_printed)
  assert.deepEqual(surviving, ['K_eq = [C2Cl4_gas]/[C2Cl4_liquid]'])
})

/**
 * THE AMBIGUITY DID NOT DECIDE ANYTHING. `T_dist` could be a stage temperature or a cut time, and picking one
 * would put the instrument's thumb on the scale. Every verdict holds under both, which is a computed
 * robustness result — `contested` is the count that would have exposed a reading-dependent finding.
 */
test('no verdict depends on which reading of T_ is taken', () => {
  assert.equal(READINGS.length, 2)
  for (const row of auditPlate()) {
    assert.notEqual(row.verdict, 'contested', `${row.as_printed} depends on the reading of T_`)
  }
})

/**
 * THE REFUSALS ARE THE TABLE'S, NOT THE TRANSCRIBER'S. Three equations are refused because a symbol on the
 * plate could not be read. Adding that symbol to the table must move them out of `illegible` — otherwise
 * `illegible` is a bucket the transcriber controls and the census is his opinion.
 */
test('a refused equation becomes decidable the moment its symbol is read', () => {
  const refused = PLATE.find((p) => p.as_printed === 'C_dist = (m_e·[C2Cl4])/(−t·C_soil)')
  assert.ok(refused)
  assert.equal(readEquation(refused, READINGS[0].symbols).verdict, 'illegible')

  const withSymbol = { ...READINGS[0].symbols, C2Cl4: CONCENTRATION }
  assert.notEqual(readEquation(refused, withSymbol).verdict, 'illegible')
})

/** Every equation carries the panel it is printed in, so a reader can go and look at the plate. */
test('every transcription says where on the plate it is printed', () => {
  const panels = new Set(PLATE.map((p) => p.panel))
  assert.deepEqual([...panels].sort(), ['distillation', 'emulsification', 'equilibrium', 'kinetics'])
  for (const printed of PLATE) assert.ok(printed.as_printed.includes('='))
})

/**
 * THE CONTROL BOTH WAYS. An instrument that only ever says "no" agrees with every bad plate by accident and
 * has measured nothing; one that only ever says "yes" is worse. Both answers are demanded of the same reader
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
 * THE MANUFACTURED-AGREEMENT GUARD. A reader that treats what it cannot parse as dimensionless would pass a
 * plate of glyph soup as sound arithmetic — the exact failure this module exists to avoid — so an unknown
 * symbol must REFUSE, and the refusal must survive the arithmetic around it.
 */
test('an unknown symbol is refused, never taken for a pure number', () => {
  assert.equal(dimensionOf({ kind: 'symbol', name: 'x_garbled' }, TABLE).verdict, 'illegible')
  assert.equal(
    dimensionOf(
      { kind: 'quotient', over: { kind: 'symbol', name: 'x_garbled' }, by: { kind: 'symbol', name: 'm' } },
      TABLE,
    ).verdict,
    'illegible',
  )
})

/**
 * THE VERDICT MUST DEPEND ON THE TABLE. If a shape alone decided the answer, the SI seven would be decoration
 * and the instrument would be measuring its own syntax. Moving ONE symbol's dimension flips it.
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
  assert.equal(
    readEquation(
      { left: 'F_new', right: { kind: 'quotient', over: { kind: 'symbol', name: 'm' }, by: { kind: 'symbol', name: 'V' } } },
      TABLE,
    ).verdict,
    'consistent',
  )
  // but its right side is still held to account
  assert.equal(
    readEquation(
      { left: 'F_new', right: { kind: 'sum', terms: [{ kind: 'symbol', name: 'm' }, { kind: 'symbol', name: 'V' }] } },
      TABLE,
    ).verdict,
    'inconsistent',
  )
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

/**
 * THE ARITHMETIC IS ENGAPI'S. An unlawful sum there hands back the exact factor that would make it lawful, and
 * that sentence must reach the reader rather than being replaced by a flatter one written here — otherwise the
 * duplication this rebuild removed would grow back as prose.
 */
test('an inconsistent sum carries engapi’s own cure', () => {
  const read = readEquation(
    { left: 'm', right: { kind: 'sum', terms: [{ kind: 'symbol', name: 'm' }, { kind: 'symbol', name: 'V' }] } },
    TABLE,
  )
  assert.equal(read.verdict, 'inconsistent')
  assert.match(read.because, /dimensional homogeneity/)
  assert.match(read.because, /Multiply the second operand by/)
})
