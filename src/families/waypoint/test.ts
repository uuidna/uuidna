import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WaypointFormulas } from './index.js'
import '../../mcp/families.js'

test('waypoint: legdistance, eta, crosstrack, totalroute, bearingdelta, fuelburn, groundspeed, turnradius — crossing to navigation', async (t) => {
  assert.equal(WaypointFormulas.legdistance(30, 40).value, 2500, 'a 3-4-5 leg, squared')
  assert.equal(WaypointFormulas.eta(1000, 50).value, 20)
  assert.equal(WaypointFormulas.crosstrack(50, 30).value, 1600, 'off-track, squared')
  assert.equal(WaypointFormulas.totalroute(5, 120).value, 600)
  assert.equal(WaypointFormulas.bearingdelta(350, 10).value, 20, 'turning through north')
  assert.equal(WaypointFormulas.fuelburn(1000, 25).value, 250)
  assert.equal(WaypointFormulas.groundspeed(900, 15).value, 60, 'distance over the ground')
  assert.equal(WaypointFormulas.turnradius(200, 10).value, 4000)
  assert.equal(WaypointFormulas.eta(1000, 50).dst, 'navigation')
  assert.equal(hexFamiliesOf().get('waypoint')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'waypoint', program: ['eta'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `waypoint.eta at ${uuid}`)
  uuidReceiptOf('waypoint eta', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; legdistance 2500, eta 20, crosstrack 1600, totalroute 600, bearingdelta 20, fuelburn 250, groundspeed 60, turnradius 4000; crossing to navigation')
})
