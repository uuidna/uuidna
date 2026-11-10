import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BenchmarkFormulas } from './index.js'
import '../../mcp/families.js'

test('benchmark: opspersec, throughput, latencyp50, speedup, iterationpairs, variance, percentilesubsets, efficiency — crossing to statistics', async (t) => {
  assert.equal(BenchmarkFormulas.opspersec(60000, 60).value, 1000)
  assert.equal(BenchmarkFormulas.throughput(1000, 10).value, 10000)
  assert.equal(BenchmarkFormulas.latencyp50(5000, 100).value, 50)
  assert.equal(BenchmarkFormulas.speedup(400, 100).value, 4)
  assert.equal(BenchmarkFormulas.iterationpairs(10, 2).value, 45)
  assert.equal(BenchmarkFormulas.variance(500, 5).value, 100)
  assert.equal(BenchmarkFormulas.percentilesubsets(4).value, 16)
  assert.equal(BenchmarkFormulas.efficiency(85, 100).value, 85)
  assert.equal(BenchmarkFormulas.opspersec(60000, 60).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('benchmark')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'benchmark', program: ['opspersec'], params: [60000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `benchmark.opspersec at ${uuid}`)
  uuidReceiptOf('benchmark opspersec', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; opspersec 1000, throughput 10000, latencyp50 50, speedup 4, iterationpairs 45, variance 100, percentilesubsets 16, efficiency 85; crossing to statistics')
})
