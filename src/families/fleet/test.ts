import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FleetFormulas } from './index.js'
import '../../mcp/families.js'

test('fleet: availability, downtime, utilization, maintenance, lifecycle, idle, replacement, telematics — crossing to transport', async (t) => {
  assert.equal(FleetFormulas.availability(95, 100).value, 95)
  assert.equal(FleetFormulas.downtime(5, 100).value, 5)
  assert.equal(FleetFormulas.utilization(60, 80).value, 75, 'active share of the fleet')
  assert.equal(FleetFormulas.maintenance(12000, 40).value, 300, 'upkeep per vehicle')
  assert.equal(FleetFormulas.lifecycle(80000, 100000).value, 80)
  assert.equal(FleetFormulas.idle(20, 80).value, 25)
  assert.equal(FleetFormulas.replacement(6, 10).value, 60)
  assert.equal(FleetFormulas.telematics(6000, 120).value, 50, 'events per trip')
  assert.equal(FleetFormulas.availability(95, 100).dst, 'transport')
  assert.equal(hexFamiliesOf().get('fleet')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fleet', program: ['utilization'], params: [60, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `fleet.utilization at ${uuid}`)
  uuidReceiptOf('fleet utilization', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; availability 95, downtime 5, utilization 75, maintenance 300, lifecycle 80, idle 25, replacement 60, telematics 50; crossing to transport')
})
