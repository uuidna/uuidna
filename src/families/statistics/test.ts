import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StatisticsFormulas } from './index.js'
import '../../mcp/families.js'

test('statistics: mean, range, variance, zscore, percentile, correlation, confidence, sample — crossing to code', async (t) => {
  assert.equal(StatisticsFormulas.mean(1000, 4).value, 250, 'the mean of the four')
  assert.equal(StatisticsFormulas.range(90, 10).value, 80)
  assert.equal(StatisticsFormulas.variance(800, 4).value, 200)
  assert.equal(StatisticsFormulas.zscore(5, 2).value, 250, 'standardised, scaled by 100')
  assert.equal(StatisticsFormulas.percentile(75, 100).value, 75)
  assert.equal(StatisticsFormulas.correlation(8, 10).value, 80)
  assert.equal(StatisticsFormulas.confidence(5, 100).value, 5)
  assert.equal(StatisticsFormulas.sample(1000, 10).value, 100, 'a tenth of the population')
  assert.equal(StatisticsFormulas.mean(1000, 4).dst, 'code')
  assert.equal(hexFamiliesOf().get('statistics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'statistics', program: ['mean'], params: [1000, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `statistics.mean at ${uuid}`)
  uuidReceiptOf('statistics mean', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mean 250, range 80, variance 200, zscore 250, percentile 75, correlation 80, confidence 5, sample 100; crossing to code')
})
