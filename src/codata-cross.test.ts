import { test } from 'node:test'
import assert from 'node:assert/strict'
import { evidenceFloor, parseCodata, parseCodataLine, provenBridges } from './codata-cross.js'

// NIST's own formatting: spaces group the digits, and the defining constants are marked exact.
const TABLE = [
  'Quantity                                                   Value                 Uncertainty           Unit',
  '-----------------------------------------------------------------------------------------------------------',
  'Boltzmann constant                                          1.380 649 e-23        (exact)               J K^-1',
  'Planck length                                               1.616 255 e-35        0.000 018 e-35        m',
  'speed of light in vacuum                                    299 792 458           (exact)               m s^-1',
  'elementary charge                                           1.602 176 634 e-19    (exact)               C',
  'fine-structure constant                                     7.297 352 5643 e-3    0.000 000 0011 e-3    ',
].join('\n')

test('parseCodataLine — joins the grouped digits into the integer a wing would carry', () => {
  const k = parseCodataLine('Boltzmann constant                                          1.380 649 e-23        (exact)               J K^-1')
  assert.ok(k)
  assert.equal(k!.quantity, 'Boltzmann constant')
  assert.equal(k!.mantissa, '1380649')
  assert.equal(k!.exponent, 'e-23')
  assert.equal(k!.exact, true)
})

test('parseCodataLine — a value with no exponent keeps all its digits', () => {
  const c = parseCodataLine('speed of light in vacuum                                    299 792 458           (exact)               m s^-1')
  assert.equal(c!.mantissa, '299792458')
  assert.equal(c!.exponent, '')
  assert.equal(c!.exact, true)
})

test('parseCodataLine — a measured constant is not marked exact', () => {
  const p = parseCodataLine('Planck length                                               1.616 255 e-35        0.000 018 e-35        m')
  assert.equal(p!.mantissa, '1616255')
  assert.equal(p!.exact, false)
})

// A LINE THIS CANNOT READ IS SKIPPED, never guessed at.
test('parseCodataLine — headers, rules and unparseable lines return null', () => {
  assert.equal(parseCodataLine(''), null)
  assert.equal(parseCodataLine('-------------------------'), null)
  assert.equal(parseCodataLine('Quantity      Value     Uncertainty    Unit'), null)
  assert.equal(parseCodataLine('some prose with no value at all'), null)
})

test('parseCodata — reads every constant in the table and no header', () => {
  const cs = parseCodata(TABLE)
  assert.equal(cs.length, 5)
  assert.deepEqual(cs.map((c) => c.mantissa),
    ['1380649', '1616255', '299792458', '1602176634', '72973525643'])
})

// THE FLOOR IS THE TABLE'S OWN MEDIAN, so a match on a short digit string cannot count as evidence.
test('evidenceFloor — computed from the table, not chosen', () => {
  const cs = parseCodata(TABLE)
  const floor = evidenceFloor(cs)
  assert.equal(floor, 9, 'the median mantissa length of this table')
  assert.equal(evidenceFloor([]), 0)
})

test('provenBridges — a shared quantity that IS a published constant is proven', () => {
  const cs = parseCodata(TABLE)
  const proven = provenBridges(
    [{ value: '1380649', wings: ['Relativity', 'Thermodynamics'] }],
    cs,
    7,
  )
  assert.equal(proven.length, 1)
  assert.equal(proven[0]!.constants[0]!.quantity, 'Boltzmann constant')
  assert.equal(proven[0]!.constants[0]!.exact, true)
})

// THE COUNTER-EXAMPLE MUST NOT PASS: 340 is a hue angle and a wave speed, and no constant has that mantissa.
test('provenBridges — a digit coincidence is NOT proven', () => {
  const proven = provenBridges(
    [{ value: '340', wings: ['Colour', 'Acoustics'] }],
    parseCodata(TABLE),
    7,
  )
  assert.deepEqual(proven, [], 'sharing 340 is sharing a digit string, and the dataset refuses to dignify it')
})

test('provenBridges — a mantissa below the evidence floor cannot match', () => {
  const cs = parseCodata(TABLE)
  const proven = provenBridges([{ value: '1380649', wings: ['a', 'b'] }], cs, 20)
  assert.deepEqual(proven, [], 'raise the floor above the mantissa and the evidence is correctly withheld')
})

// EXACT CONSTANTS RANK FIRST: a defining constant's digits cannot drift under a later CODATA adjustment.
test('provenBridges — exact constants sort before measured ones', () => {
  const cs = parseCodata(TABLE)
  const proven = provenBridges([
    { value: '1616255', wings: ['StringTheory', 'HandleStore'] },
    { value: '1380649', wings: ['Relativity', 'Thermodynamics'] },
  ], cs, 7)
  assert.equal(proven.length, 2)
  assert.equal(proven[0]!.value, '1380649', 'the exact one first — its digits are permanent')
})

test('provenBridges — every matching constant is kept, not just the first', () => {
  const cs = [
    ...parseCodata(TABLE),
    { quantity: 'a related quantity sharing the digits', mantissa: '1380649', exponent: 'e-3', unit: 'x', exact: false },
  ]
  const proven = provenBridges([{ value: '1380649', wings: ['a', 'b'] }], cs, 7)
  assert.equal(proven[0]!.constants.length, 2, 'shared digits across quantities is the thing being measured')
})
