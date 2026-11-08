import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CachingFormulas } from './index.js'
import '../../mcp/families.js'

test('caching: hitrate, missrate, eviction, ttl, latency, utilization, warmup, speedup — crossing to cloud', async (t) => {
  assert.equal(CachingFormulas.hitrate(950, 1000).value, 95, 'hit rate percent')
  assert.equal(CachingFormulas.missrate(50, 1000).value, 5)
  assert.equal(CachingFormulas.eviction(30, 100).value, 30)
  assert.equal(CachingFormulas.ttl(3600).value, 3600, 'seconds held as-is')
  assert.equal(CachingFormulas.latency(5000, 100).value, 50)
  assert.equal(CachingFormulas.utilization(75, 100).value, 75)
  assert.equal(CachingFormulas.warmup(800, 1000).value, 80)
  assert.equal(CachingFormulas.speedup(900, 100).value, 900, 'nine times faster')
  assert.equal(CachingFormulas.hitrate(950, 1000).dst, 'cloud')
  assert.equal(hexFamiliesOf().get('caching')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'caching', program: ['hitrate'], params: [950, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `caching.hitrate at ${uuid}`)
  uuidReceiptOf('caching hitrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hitrate 95, missrate 5, eviction 30, ttl 3600, latency 50, utilization 75, warmup 80, speedup 900; crossing to cloud')
})
