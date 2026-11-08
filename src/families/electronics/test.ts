import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ElectronicsFormulas } from './index.js'
import '../../mcp/families.js'

test('electronics: ohm, power, series, parallel, charge, capacitance, frequency, efficiency — crossing to energy', async (t) => {
  assert.equal(ElectronicsFormulas.ohm(12, 3).value, 4, 'resistance from Ohm\'s law')
  assert.equal(ElectronicsFormulas.power(12, 3).value, 36, 'watts')
  assert.equal(ElectronicsFormulas.series(6, 3).value, 9)
  assert.equal(ElectronicsFormulas.parallel(6, 3).value, 2, '⌊18 / 9⌋')
  assert.equal(ElectronicsFormulas.charge(5, 10).value, 50, 'coulombs')
  assert.equal(ElectronicsFormulas.capacitance(100, 5).value, 20)
  assert.equal(ElectronicsFormulas.frequency(1000, 10).value, 100)
  assert.equal(ElectronicsFormulas.efficiency(80, 100).value, 80, 'percent')
  assert.equal(ElectronicsFormulas.power(12, 3).dst, 'energy')
  assert.equal(hexFamiliesOf().get('electronics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'electronics', program: ['series'], params: [6, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9, `electronics.series at ${uuid}`)
  uuidReceiptOf('electronics series', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ohm 4, power 36, series 9, parallel 2, charge 50, capacitance 20, frequency 100, efficiency 80; crossing to energy')
})
