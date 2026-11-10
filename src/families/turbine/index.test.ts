import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TurbineFormulas } from './index.js'
import '../../mcp/families.js'

test('turbine: power, rpm, torque, efficiency, capacity, sweep, tipspeed, output — crossing to energy', async (t) => {
  assert.equal(TurbineFormulas.power(50, 20).value, 1000, 'shaft power from flow and head')
  assert.equal(TurbineFormulas.rpm(50, 4).value, 1500, 'synchronous rpm')
  assert.equal(TurbineFormulas.torque(1000, 50).value, 20)
  assert.equal(TurbineFormulas.efficiency(80, 100).value, 80)
  assert.equal(TurbineFormulas.capacity(600, 1000).value, 60, 'capacity factor percent')
  assert.equal(TurbineFormulas.sweep(10).value, 314, 'swept area')
  assert.equal(TurbineFormulas.tipspeed(1500, 10).value, 1570)
  assert.equal(TurbineFormulas.output(1000, 24, 90).value, 21600, 'energy over a day')
  assert.equal(TurbineFormulas.power(50, 20).dst, 'energy')
  assert.equal(hexFamiliesOf().get('turbine')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'turbine', program: ['rpm'], params: [50, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1500, `turbine.rpm at ${uuid}`)
  uuidReceiptOf('turbine rpm', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; power 1000, rpm 1500, torque 20, efficiency 80, capacity 60, sweep 314, tipspeed 1570, output 21600; crossing to energy')
})
