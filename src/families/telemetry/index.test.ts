import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TelemetryFormulas } from './index.js'
import '../../mcp/families.js'

test('telemetry: metrics, spanpairs, samplingrate, cardinality, retentiondays, dimensionsubsets, aggregationpaths, ingestrate — crossing to statistics', async (t) => {
  assert.equal(TelemetryFormulas.metrics(50, 30).value, 80)
  assert.equal(TelemetryFormulas.spanpairs(12, 2).value, 66)
  assert.equal(TelemetryFormulas.samplingrate(10, 100).value, 10)
  assert.equal(TelemetryFormulas.cardinality(1000, 5).value, 5000)
  assert.equal(TelemetryFormulas.retentiondays(30, 1).value, 30)
  assert.equal(TelemetryFormulas.dimensionsubsets(6).value, 64)
  assert.equal(TelemetryFormulas.aggregationpaths(6, 2).value, 30)
  assert.equal(TelemetryFormulas.ingestrate(60000, 60).value, 1000)
  assert.equal(TelemetryFormulas.metrics(50, 30).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('telemetry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'telemetry', program: ['metrics'], params: [50, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `telemetry.metrics at ${uuid}`)
  uuidReceiptOf('telemetry metrics', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; metrics 80, spanpairs 66, samplingrate 10, cardinality 5000, retentiondays 30, dimensionsubsets 64, aggregationpaths 30, ingestrate 1000; crossing to statistics')
})
