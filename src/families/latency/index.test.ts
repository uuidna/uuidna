import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LatencyFormulas } from './index.js'
import '../../mcp/families.js'

test('latency: oneway, processing, propagation, queuing, roundtrip, serialization, total, transmission — crossing to networking', async (t) => {
  assert.equal(LatencyFormulas.oneway(15, 8, 2).value, 25, 'prop + trans + queue')
  assert.equal(LatencyFormulas.processing(100, 2).value, 200)
  assert.equal(LatencyFormulas.propagation(3000, 200).value, 15, 'distance over signal speed')
  assert.equal(LatencyFormulas.queuing(10, 5).value, 50)
  assert.equal(LatencyFormulas.roundtrip(25).value, 50, 'there and back')
  assert.equal(LatencyFormulas.serialization(1500, 1000).value, 12)
  assert.equal(LatencyFormulas.total(20, 3).value, 60, 'end-to-end across hops')
  assert.equal(LatencyFormulas.transmission(8000, 1000).value, 8)
  assert.equal(LatencyFormulas.roundtrip(25).dst, 'networking')
  assert.equal(hexFamiliesOf().get('latency')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'latency', program: ['total'], params: [20, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `latency.total at ${uuid}`)
  uuidReceiptOf('latency total', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; oneway 25, processing 200, propagation 15, queuing 50, roundtrip 50, serialization 12, total 60, transmission 8; crossing to networking')
})
