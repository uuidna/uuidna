import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EnergyFormulas } from './index.js'
import '../../mcp/families.js'

test('energy: power, energy, efficiency, load, cost, capacity, carbon, storage — crossing to obs', async (t) => {
  assert.equal(EnergyFormulas.power(240, 10).value, 2400, 'watts from volts and amps')
  assert.equal(EnergyFormulas.energy(2400, 3).value, 7200, 'watt-hours')
  assert.equal(EnergyFormulas.efficiency(85, 100).value, 85)
  assert.equal(EnergyFormulas.load(800, 1000).value, 80, 'grid at four fifths')
  assert.equal(EnergyFormulas.cost(500, 15).value, 75, 'the bill in dollars')
  assert.equal(EnergyFormulas.capacity(20, 400).value, 8000, 'installed watts')
  assert.equal(EnergyFormulas.carbon(1000, 420).value, 420, 'grams emitted')
  assert.equal(EnergyFormulas.storage(90, 100).value, 90, 'state of charge')
  assert.equal(EnergyFormulas.power(240, 10).dst, 'obs')
  assert.equal(hexFamiliesOf().get('energy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'energy', program: ['power'], params: [240, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2400, `energy.power at ${uuid}`)
  uuidReceiptOf('energy power', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; power 2400, energy 7200, efficiency 85, load 80, cost 75, capacity 8000, carbon 420, storage 90; crossing to obs')
})
