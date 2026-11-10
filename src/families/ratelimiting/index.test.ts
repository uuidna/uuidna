import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RatelimitingFormulas } from './index.js'
import '../../mcp/families.js'

test('ratelimiting: tokenbucket, leakyrate, windowcount, throttlemargin, refillrate, burstcapacity, retryafter, quotaremaining — crossing to networking', async (t) => {
  assert.equal(RatelimitingFormulas.tokenbucket(10, 5, 100).value, 50, 'rate · seconds, capped at capacity')
  assert.equal(RatelimitingFormulas.leakyrate(1000, 10).value, 100)
  assert.equal(RatelimitingFormulas.windowcount(500, 5).value, 100, 'requests per window')
  assert.equal(RatelimitingFormulas.throttlemargin(100, 30).value, 70)
  assert.equal(RatelimitingFormulas.refillrate(600, 60).value, 10, 'tokens per second')
  assert.equal(RatelimitingFormulas.burstcapacity(100, 50).value, 150)
  assert.equal(RatelimitingFormulas.retryafter(100, 10).value, 10)
  assert.equal(RatelimitingFormulas.quotaremaining(1000, 250).value, 750, 'quota unspent')
  assert.equal(RatelimitingFormulas.tokenbucket(10, 5, 100).dst, 'networking')
  assert.equal(hexFamiliesOf().get('ratelimiting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ratelimiting', program: ['tokenbucket'], params: [10, 5, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `ratelimiting.tokenbucket at ${uuid}`)
  uuidReceiptOf('ratelimiting tokenbucket', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; tokenbucket 50, leakyrate 100, windowcount 100, throttlemargin 70, refillrate 10, burstcapacity 150, retryafter 10, quotaremaining 750; crossing to networking')
})
