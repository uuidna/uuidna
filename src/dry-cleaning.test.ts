import { test } from 'node:test'
import assert from 'node:assert/strict'

import { PLATE, READINGS, auditPlate, plateCensus } from './dry-cleaning.js'
import { readEquation } from './si.js'

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

  const withSymbol = { ...READINGS[0].symbols, C2Cl4: READINGS[0].symbols.C_soil }
  assert.notEqual(readEquation(refused, withSymbol).verdict, 'illegible')
})

/** Every equation carries the panel it is printed in, so a reader can go and look at the plate. */
test('every transcription says where on the plate it is printed', () => {
  const panels = new Set(PLATE.map((p) => p.panel))
  assert.deepEqual([...panels].sort(), ['distillation', 'emulsification', 'equilibrium', 'kinetics'])
  for (const printed of PLATE) assert.ok(printed.as_printed.includes('='))
})
