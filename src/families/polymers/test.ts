import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PolymersFormulas } from './index.js'
import '../../mcp/families.js'

test('polymers: degreeofpolymerization, molecularweight, crystallinity, glasstransition, tensilestrength, elongation, crosslink, viscosity — crossing to materials', async (t) => {
  assert.equal(PolymersFormulas.degreeofpolymerization(28000, 28).value, 1000, 'a thousand ethylene units')
  assert.equal(PolymersFormulas.molecularweight(1000, 28).value, 28000)
  assert.equal(PolymersFormulas.crystallinity(65, 100).value, 65, 'percent crystalline')
  assert.equal(PolymersFormulas.glasstransition(378, 60000, 1000).value, 318, 'Flory–Fox Tg')
  assert.equal(PolymersFormulas.tensilestrength(5000, 100).value, 50)
  assert.equal(PolymersFormulas.elongation(150, 100).value, 150, 'strain at break')
  assert.equal(PolymersFormulas.crosslink(50000, 25).value, 2000, 'mass between crosslinks')
  assert.equal(PolymersFormulas.viscosity(250, 100).value, 250)
  assert.equal(PolymersFormulas.degreeofpolymerization(28000, 28).dst, 'materials')
  assert.equal(hexFamiliesOf().get('polymers')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'polymers', program: ['degreeofpolymerization'], params: [28000, 28] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `polymers.degreeofpolymerization at ${uuid}`)
  uuidReceiptOf('polymers degreeofpolymerization', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; degreeofpolymerization 1000, molecularweight 28000, crystallinity 65, glasstransition 318, tensilestrength 50, elongation 150, crosslink 2000, viscosity 250; crossing to materials')
})
