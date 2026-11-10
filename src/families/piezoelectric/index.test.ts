import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PiezoelectricFormulas } from './index.js'
import '../../mcp/families.js'

test('piezoelectric: charge, voltage, chargeconstant, resonantfrequency, couplingfactor, capacitance, displacement, energyharvest — crossing to electrical', async (t) => {
  assert.equal(PiezoelectricFormulas.charge(50, 20).value, 1000, 'the charge a force frees')
  assert.equal(PiezoelectricFormulas.voltage(1000, 10).value, 100)
  assert.equal(PiezoelectricFormulas.chargeconstant(1000, 50).value, 20)
  assert.equal(PiezoelectricFormulas.resonantfrequency(4000, 2).value, 1000, 'half the sound speed over thickness')
  assert.equal(PiezoelectricFormulas.couplingfactor(49, 100).value, 49, 'percent of input converted')
  assert.equal(PiezoelectricFormulas.couplingfactor(0, 100).value, 0)
  assert.equal(PiezoelectricFormulas.capacitance(12, 100, 6).value, 200)
  assert.equal(PiezoelectricFormulas.displacement(100, 20).value, 2000, 'the converse effect')
  assert.equal(PiezoelectricFormulas.energyharvest(1000, 100).value, 50000)
  assert.equal(PiezoelectricFormulas.charge(50, 20).dst, 'electrical')
  assert.equal(hexFamiliesOf().get('piezoelectric')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'piezoelectric', program: ['charge'], params: [50, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `piezoelectric.charge at ${uuid}`)
  uuidReceiptOf('piezoelectric charge', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; charge 1000, voltage 100, chargeconstant 20, resonantfrequency 1000, couplingfactor 49, capacitance 200, displacement 2000, energyharvest 50000; crossing to electrical')
})
