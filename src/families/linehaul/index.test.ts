import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LinehaulFormulas } from './index.js'
import '../../mcp/families.js'

test('linehaul: transittime, costpermile, avgspeed, fuelburn, payloadmiles, driverhours, teamutilization, laneprofit — crossing to logistics', async (t) => {
  assert.equal(LinehaulFormulas.transittime(1200, 60).value, 20)
  assert.equal(LinehaulFormulas.costpermile(1000, 2).value, 2000)
  assert.equal(LinehaulFormulas.avgspeed(1200, 20).value, 60)
  assert.equal(LinehaulFormulas.fuelburn(1200, 6).value, 200)
  assert.equal(LinehaulFormulas.payloadmiles(20000, 1200).value, 24000000)
  assert.equal(LinehaulFormulas.driverhours(600, 60).value, 10)
  assert.equal(LinehaulFormulas.teamutilization(20, 24).value, 83)
  assert.equal(LinehaulFormulas.laneprofit(3000, 2000).value, 1000)
  assert.equal(LinehaulFormulas.transittime(1200, 60).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('linehaul')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'linehaul', program: ['transittime'], params: [1200, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `linehaul.transittime at ${uuid}`)
  uuidReceiptOf('linehaul transittime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; transittime 20, costpermile 2000, avgspeed 60, fuelburn 200, payloadmiles 24000000, driverhours 10, teamutilization 83, laneprofit 1000; crossing to logistics')
})
