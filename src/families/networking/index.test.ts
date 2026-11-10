import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NetworkingFormulas } from './index.js'
import '../../mcp/families.js'

test('networking: bandwidth, latency, throughput, loss, hops, utilization, jitter, subnet — crossing to logistics', async (t) => {
  assert.equal(NetworkingFormulas.bandwidth(1000, 8).value, 125, 'bits per second')
  assert.equal(NetworkingFormulas.latency(3000, 200).value, 15)
  assert.equal(NetworkingFormulas.throughput(6000, 60).value, 100, 'packets per window')
  assert.equal(NetworkingFormulas.loss(5, 1000).value, 0)
  assert.equal(NetworkingFormulas.loss(30, 1000).value, 3)
  assert.equal(NetworkingFormulas.hops(5).value, 4, 'four hops on a five-node path')
  assert.equal(NetworkingFormulas.utilization(750, 1000).value, 75)
  assert.equal(NetworkingFormulas.jitter(50, 12).value, 38)
  assert.equal(NetworkingFormulas.subnet(1, 8).value, 256, 'a /24 holds 256 addresses')
  assert.equal(NetworkingFormulas.bandwidth(1000, 8).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('networking')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'networking', program: ['utilization'], params: [750, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `networking.utilization at ${uuid}`)
  uuidReceiptOf('networking utilization', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bandwidth 125, latency 15, throughput 100, loss 3, hops 4, utilization 75, jitter 38, subnet 256; crossing to logistics')
})
