import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MonorailFormulas } from './index.js'
import '../../mcp/families.js'

test('monorail: speed, headwayseconds, capacity, stations, traveltime, accelrate, gradientpct, throughput — crossing to kinematics', async (t) => {
  assert.equal(MonorailFormulas.speed(8000, 60).value, 133)
  assert.equal(MonorailFormulas.headwayseconds(600, 10).value, 60)
  assert.equal(MonorailFormulas.capacity(200, 6).value, 1200)
  assert.equal(MonorailFormulas.stations(12, 8).value, 20)
  assert.equal(MonorailFormulas.traveltime(3600, 133).value, 27)
  assert.equal(MonorailFormulas.accelrate(100, 10).value, 10)
  assert.equal(MonorailFormulas.gradientpct(6, 100).value, 6)
  assert.equal(MonorailFormulas.throughput(1200, 10).value, 12000)
  assert.equal(MonorailFormulas.speed(8000, 60).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('monorail')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'monorail', program: ['speed'], params: [8000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 133, `monorail.speed at ${uuid}`)
  uuidReceiptOf('monorail speed', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; speed 133, headwayseconds 60, capacity 1200, stations 20, traveltime 27, accelrate 10, gradientpct 6, throughput 12000; crossing to kinematics')
})
