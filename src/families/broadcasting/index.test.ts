import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BroadcastingFormulas } from './index.js'
import '../../mcp/families.js'

test('broadcasting: reach, share, bitrate, latency, coverage, rating, bandwidth, dropout — crossing to frontend', async (t) => {
  assert.equal(BroadcastingFormulas.reach(250, 1000).value, 25, 'a quarter of the population')
  assert.equal(BroadcastingFormulas.share(300, 1200).value, 25)
  assert.equal(BroadcastingFormulas.bitrate(6000000, 2).value, 3000000, 'bits per second')
  assert.equal(BroadcastingFormulas.latency(40).value, 40)
  assert.equal(BroadcastingFormulas.coverage(50, 12).value, 600)
  assert.equal(BroadcastingFormulas.rating(45, 1000).value, 4)
  assert.equal(BroadcastingFormulas.bandwidth(8, 6).value, 48)
  assert.equal(BroadcastingFormulas.dropout(3, 300).value, 1)
  assert.equal(BroadcastingFormulas.reach(250, 1000).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('broadcasting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'broadcasting', program: ['coverage'], params: [50, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `broadcasting.coverage at ${uuid}`)
  uuidReceiptOf('broadcasting coverage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; reach 25, share 25, bitrate 3000000, latency 40, coverage 600, rating 4, bandwidth 48, dropout 1; crossing to frontend')
})
