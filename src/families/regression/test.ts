import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RegressionFormulas } from './index.js'
import '../../mcp/families.js'

test('regression: slope, intercept, residual, sse, rsquared, prediction, leverage, mse — crossing to statistics', async (t) => {
  assert.equal(RegressionFormulas.slope(100, 20).value, 5, 'rise over run')
  assert.equal(RegressionFormulas.intercept(50, 2, 10).value, 30)
  assert.equal(RegressionFormulas.residual(80, 75).value, 5, 'observed minus fitted')
  assert.equal(RegressionFormulas.sse(5, 4).value, 100)
  assert.equal(RegressionFormulas.rsquared(80, 100).value, 80, 'percent of variance explained')
  assert.equal(RegressionFormulas.prediction(2, 10, 30).value, 50)
  assert.equal(RegressionFormulas.leverage(25, 100).value, 25)
  assert.equal(RegressionFormulas.mse(100, 4).value, 25, 'error over degrees')
  assert.equal(RegressionFormulas.slope(100, 20).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('regression')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'regression', program: ['slope'], params: [100, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `regression.slope at ${uuid}`)
  uuidReceiptOf('regression slope', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; slope 5, intercept 30, residual 5, sse 100, rsquared 80, prediction 50, leverage 25, mse 25; crossing to statistics')
})
