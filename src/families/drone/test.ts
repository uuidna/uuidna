import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DroneFormulas } from './index.js'
import '../../mcp/families.js'

test('drone: flighttime, payload, rotorcount, range, thrust, batterykwh, maxaltitude, stabilitymargin — crossing to aerospace', async (t) => {
  assert.equal(DroneFormulas.flighttime(5000, 100).value, 50)
  assert.equal(DroneFormulas.payload(2, 1000).value, 2000)
  assert.equal(DroneFormulas.rotorcount(4, 0).value, 4)
  assert.equal(DroneFormulas.range(10, 1000).value, 10000)
  assert.equal(DroneFormulas.thrust(4, 500).value, 2000)
  assert.equal(DroneFormulas.batterykwh(100, 1).value, 100)
  assert.equal(DroneFormulas.maxaltitude(120, 1).value, 120)
  assert.equal(DroneFormulas.stabilitymargin(90, 100).value, 90)
  assert.equal(DroneFormulas.flighttime(5000, 100).dst, 'aerospace')
  assert.equal(hexFamiliesOf().get('drone')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'drone', program: ['flighttime'], params: [5000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `drone.flighttime at ${uuid}`)
  uuidReceiptOf('drone flighttime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; flighttime 50, payload 2000, rotorcount 4, range 10000, thrust 2000, batterykwh 100, maxaltitude 120, stabilitymargin 90; crossing to aerospace')
})
