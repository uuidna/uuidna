import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EndpointFormulas } from './index.js'
import '../../mcp/families.js'

test('endpoint: latency, rate, status, methods, auth, payload, depth, error — crossing to payload', async (t) => {
  assert.equal(EndpointFormulas.latency(5000, 100).value, 50)
  assert.equal(EndpointFormulas.rate(6000, 60).value, 100, 'requests per second')
  assert.equal(EndpointFormulas.status(990, 1000).value, 99)
  assert.equal(EndpointFormulas.methods(4).value, 4, 'get, post, patch, delete')
  assert.equal(EndpointFormulas.auth(3, 10).value, 30)
  assert.equal(EndpointFormulas.payload(20, 8).value, 160)
  assert.equal(EndpointFormulas.depth(5).value, 5)
  assert.equal(EndpointFormulas.depth(5).holds, true, 'depth holds at or below 10')
  assert.equal(EndpointFormulas.depth(11).holds, false)
  assert.equal(EndpointFormulas.error(5, 1000).value, 0)
  assert.equal(EndpointFormulas.error(50, 1000).value, 5)
  assert.equal(EndpointFormulas.latency(5000, 100).dst, 'payload')
  assert.equal(hexFamiliesOf().get('endpoint')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'endpoint', program: ['latency'], params: [5000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `endpoint.latency at ${uuid}`)
  uuidReceiptOf('endpoint latency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; latency 50, rate 100, status 99, methods 4, auth 30, payload 160, depth 5, error 5; crossing to payload')
})
