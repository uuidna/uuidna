import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BackendFormulas } from './index.js'
import '../../mcp/families.js'

test('backend: requests, latency, error, pool, cache, queue, throughput, saturation — crossing to obs', async (t) => {
  assert.equal(BackendFormulas.requests(500, 60).value, 30000, 'a minute of requests')
  assert.equal(BackendFormulas.latency(5000, 100).value, 50)
  assert.equal(BackendFormulas.error(5, 1000).value, 0)
  assert.equal(BackendFormulas.error(30, 1000).value, 3)
  assert.equal(BackendFormulas.pool(120, 100).value, 100, 'capped at the pool max')
  assert.equal(BackendFormulas.cache(950, 1000).value, 95)
  assert.equal(BackendFormulas.queue(500, 300).value, 200, 'backlog')
  assert.equal(BackendFormulas.queue(100, 300).value, 0, 'drained')
  assert.equal(BackendFormulas.throughput(6000, 60).value, 100, 'requests per second')
  assert.equal(BackendFormulas.saturation(75, 100).value, 75)
  assert.equal(BackendFormulas.requests(500, 60).dst, 'obs')
  assert.equal(hexFamiliesOf().get('backend')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'backend', program: ['throughput'], params: [6000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `backend.throughput at ${uuid}`)
  uuidReceiptOf('backend throughput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; requests 30000, latency 50, error 3, pool 100, cache 95, queue 200, throughput 100, saturation 75; crossing to obs')
})
