import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ElectricalFormulas } from './index.js'
import '../../mcp/families.js'

test('electrical: power, resistance, impedance, powerfactor, transformer, load, efficiency, frequency — crossing to energy', async (t) => {
  assert.equal(ElectricalFormulas.power(120, 10).value, 1200, 'watts from volts and amps')
  assert.equal(ElectricalFormulas.resistance(240, 10).value, 24, 'ohms by Ohm\'s law')
  assert.equal(ElectricalFormulas.impedance(30, 40).value, 70)
  assert.equal(ElectricalFormulas.powerfactor(80, 100).value, 80, 'power factor as a percentage')
  assert.equal(ElectricalFormulas.transformer(240, 120).value, 200, 'turns ratio as a percentage')
  assert.equal(ElectricalFormulas.load(1200, 120).value, 10, 'amps the supply carries')
  assert.equal(ElectricalFormulas.efficiency(90, 100).value, 90, 'conversion efficiency as a percentage')
  assert.equal(ElectricalFormulas.frequency(3000, 60).value, 50, 'cycles per second')
  assert.equal(ElectricalFormulas.power(120, 10).dst, 'energy')
  assert.equal(hexFamiliesOf().get('electrical')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'electrical', program: ['power'], params: [120, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `electrical.power at ${uuid}`)
  uuidReceiptOf('electrical power', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; power 1200, resistance 24, impedance 70, powerfactor 80, transformer 200, load 10, efficiency 90, frequency 50; crossing to energy')
})
