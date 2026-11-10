import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SamplingFormulas } from './index.js'
import '../../mcp/families.js'

test('sampling: samplesize, marginoferror, standarderror, stratum, cluster, systematic, weight, finitecorrection — crossing to probability', async (t) => {
  assert.equal(SamplingFormulas.samplesize(10000, 5).value, 500, 'five percent of the population')
  assert.equal(SamplingFormulas.marginoferror(2, 25).value, 50)
  assert.equal(SamplingFormulas.standarderror(100, 10).value, 10)
  assert.equal(SamplingFormulas.stratum(1000, 7).value, 143, 'ceil allocation per stratum')
  assert.equal(SamplingFormulas.cluster(1000, 40).value, 25, 'whole clusters')
  assert.equal(SamplingFormulas.systematic(1000, 50).value, 20, 'the sampling interval k')
  assert.equal(SamplingFormulas.weight(5000, 250).value, 20000)
  assert.equal(SamplingFormulas.finitecorrection(1000, 100).value, 90)
  assert.equal(SamplingFormulas.finitecorrection(1000, 1000).value, 0)
  assert.equal(SamplingFormulas.samplesize(10000, 5).dst, 'probability')
  assert.equal(hexFamiliesOf().get('sampling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sampling', program: ['cluster'], params: [1000, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `sampling.cluster at ${uuid}`)
  uuidReceiptOf('sampling cluster', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; samplesize 500, marginoferror 50, standarderror 10, stratum 143, cluster 25, systematic 20, weight 20000, finitecorrection 90; crossing to probability')
})
