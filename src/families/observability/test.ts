import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ObservabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('observability: errorbudget, slo, apdex, percentile, cardinality, sampling, saturation, signal — crossing to cloud', async (t) => {
  assert.equal(ObservabilityFormulas.errorbudget(1000, 250).value, 750, 'budget left')
  assert.equal(ObservabilityFormulas.errorbudget(100, 250).value, 0, 'budget spent, floored at zero')
  assert.equal(ObservabilityFormulas.slo(999, 1000).value, 99)
  assert.equal(ObservabilityFormulas.apdex(950, 1000).value, 95)
  assert.equal(ObservabilityFormulas.percentile(99, 100).value, 99)
  assert.equal(ObservabilityFormulas.cardinality(5000, 50).value, 100, 'series per metric')
  assert.equal(ObservabilityFormulas.sampling(10, 100).value, 10, 'ten percent sampled')
  assert.equal(ObservabilityFormulas.saturation(80, 100).value, 80)
  assert.equal(ObservabilityFormulas.signal(900, 100).value, 900)
  assert.equal(ObservabilityFormulas.slo(999, 1000).dst, 'cloud')
  assert.equal(hexFamiliesOf().get('observability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'observability', program: ['slo'], params: [999, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 99, `observability.slo at ${uuid}`)
  uuidReceiptOf('observability slo', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; errorbudget 750, slo 99, apdex 95, percentile 99, cardinality 100, sampling 10, saturation 80, signal 900; crossing to cloud')
})
