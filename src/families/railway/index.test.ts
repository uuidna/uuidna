import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RailwayFormulas } from './index.js'
import '../../mcp/families.js'

test('railway: braking, capacity, dwell, gradient, headway, load, punctuality, throughput — crossing to transport', async (t) => {
  assert.equal(RailwayFormulas.braking(30, 3).value, 150, 'stopping distance')
  assert.equal(RailwayFormulas.capacity(8, 60).value, 480, 'seats on the consist')
  assert.equal(RailwayFormulas.dwell(45).value, 45)
  assert.equal(RailwayFormulas.gradient(5, 1000).value, 5, 'per mille')
  assert.equal(RailwayFormulas.headway(3600, 12).value, 300, 'seconds between trains')
  assert.equal(RailwayFormulas.load(400, 480).value, 83)
  assert.equal(RailwayFormulas.punctuality(950, 1000).value, 95)
  assert.equal(RailwayFormulas.throughput(240, 12).value, 20, 'trains per hour')
  assert.equal(RailwayFormulas.capacity(8, 60).dst, 'transport')
  assert.equal(hexFamiliesOf().get('railway')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'railway', program: ['headway'], params: [3600, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `railway.headway at ${uuid}`)
  uuidReceiptOf('railway headway', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; braking 150, capacity 480, dwell 45, gradient 5, headway 300, load 83, punctuality 95, throughput 20; crossing to transport')
})
