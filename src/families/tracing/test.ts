import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TracingFormulas } from './index.js'
import '../../mcp/families.js'

test('tracing: spancount, criticalpath, samplerate, latencybudget, fanout, tracedepth, overhead, tailsampling — crossing to observability', async (t) => {
  assert.equal(TracingFormulas.spancount(50, 12).value, 600, 'spans across the services a trace touches')
  assert.equal(TracingFormulas.criticalpath(800, 300).value, 500, 'serial path after parallel work')
  assert.equal(TracingFormulas.samplerate(100, 1000).value, 10, 'ten percent of traces kept')
  assert.equal(TracingFormulas.latencybudget(1000, 650).value, 350)
  assert.equal(TracingFormulas.fanout(8, 25).value, 200, 'downstream calls per request')
  assert.equal(TracingFormulas.tracedepth(100, 30).value, 4, 'levels of the span tree')
  assert.equal(TracingFormulas.overhead(10000, 90).value, 900)
  assert.equal(TracingFormulas.tailsampling(500, 300).value, 1, 'slow trace kept')
  assert.equal(TracingFormulas.tailsampling(100, 300).value, 0)
  assert.equal(TracingFormulas.spancount(50, 12).dst, 'observability')
  assert.equal(hexFamiliesOf().get('tracing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tracing', program: ['tracedepth'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `tracing.tracedepth at ${uuid}`)
  uuidReceiptOf('tracing tracedepth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; spancount 600, criticalpath 500, samplerate 10, latencybudget 350, fanout 200, tracedepth 4, overhead 900, tailsampling 1; crossing to observability')
})
