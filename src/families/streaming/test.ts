import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StreamingFormulas } from './index.js'
import '../../mcp/families.js'

test('streaming: bitrate, buffer, rebuffer, latency, bandwidth, quality, concurrency, startup — crossing to media', async (t) => {
  assert.equal(StreamingFormulas.bitrate(6000, 60).value, 100, 'bits per second')
  assert.equal(StreamingFormulas.buffer(30, 100).value, 30)
  assert.equal(StreamingFormulas.rebuffer(12, 4).value, 3, 'stalls per minute')
  assert.equal(StreamingFormulas.latency(250).value, 250)
  assert.equal(StreamingFormulas.bandwidth(1000, 8).value, 125, 'per stream')
  assert.equal(StreamingFormulas.quality(90, 100).value, 90)
  assert.equal(StreamingFormulas.concurrency(750, 1000).value, 75)
  assert.equal(StreamingFormulas.startup(1200).value, 1200)
  assert.equal(StreamingFormulas.bitrate(6000, 60).dst, 'media')
  assert.equal(hexFamiliesOf().get('streaming')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'streaming', program: ['bandwidth'], params: [1000, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 125, `streaming.bandwidth at ${uuid}`)
  uuidReceiptOf('streaming bandwidth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bitrate 100, buffer 30, rebuffer 3, latency 250, bandwidth 125, quality 90, concurrency 75, startup 1200; crossing to media')
})
