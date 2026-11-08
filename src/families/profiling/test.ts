import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProfilingFormulas } from './index.js'
import '../../mcp/families.js'

test('profiling: hotspot, throughput, allocation, speedup, overhead, cachehit, flamegraph, gc — crossing to code', async (t) => {
  assert.equal(ProfilingFormulas.hotspot(30, 120).value, 25, 'a quarter of the time in one function')
  assert.equal(ProfilingFormulas.throughput(6000, 60).value, 100, 'operations per second')
  assert.equal(ProfilingFormulas.allocation(10000, 500).value, 20)
  assert.equal(ProfilingFormulas.speedup(300, 100).value, 300, 'three times faster')
  assert.equal(ProfilingFormulas.overhead(120, 100).value, 20, 'a fifth slower under instrumentation')
  assert.equal(ProfilingFormulas.cachehit(950, 1000).value, 95)
  assert.equal(ProfilingFormulas.flamegraph(640, 8).value, 80)
  assert.equal(ProfilingFormulas.gc(3, 1000).value, 3, 'collections per thousand')
  assert.equal(ProfilingFormulas.hotspot(30, 120).dst, 'code')
  assert.equal(hexFamiliesOf().get('profiling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'profiling', program: ['throughput'], params: [6000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `profiling.throughput at ${uuid}`)
  uuidReceiptOf('profiling throughput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hotspot 25, throughput 100, allocation 20, speedup 300, overhead 20, cachehit 95, flamegraph 80, gc 3; crossing to code')
})
