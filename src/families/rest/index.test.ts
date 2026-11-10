import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RestFormulas } from './index.js'
import '../../mcp/families.js'

test('rest: throughput, latency, payloadsize, statusclass, ratelimit, cachettl, pagination, errorrate — crossing to networking', async (t) => {
  assert.equal(RestFormulas.throughput(6000, 60).value, 100, 'requests per second')
  assert.equal(RestFormulas.latency(5000, 100).value, 50)
  assert.equal(RestFormulas.payloadsize(10, 256).value, 2560)
  assert.equal(RestFormulas.statusclass(404).value, 4, 'a client-error class')
  assert.equal(RestFormulas.ratelimit(1000, 60).value, 16)
  assert.equal(RestFormulas.cachettl(300, 120).value, 180, 'freshness left')
  assert.equal(RestFormulas.pagination(100, 30).value, 4, 'four pages for the set')
  assert.equal(RestFormulas.errorrate(50, 1000).value, 5)
  assert.equal(RestFormulas.errorrate(1000, 1000).value, 100)
  assert.equal(RestFormulas.throughput(6000, 60).dst, 'networking')
  assert.equal(hexFamiliesOf().get('rest')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rest', program: ['pagination'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `rest.pagination at ${uuid}`)
  uuidReceiptOf('rest pagination', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; throughput 100, latency 50, payloadsize 2560, statusclass 4, ratelimit 16, cachettl 180, pagination 4, errorrate 5; crossing to networking')
})
