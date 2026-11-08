import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EstimationFormulas } from './index.js'
import '../../mcp/families.js'

test('estimation: meansquareerror, bias, variance, confidence, residual, likelihood, innovation, estimategain — crossing to cybernetics', async (t) => {
  assert.equal(EstimationFormulas.meansquareerror(1000, 10).value, 100, 'mean of the squared errors')
  assert.equal(EstimationFormulas.bias(50, 42).value, 8)
  assert.equal(EstimationFormulas.variance(900, 9).value, 100)
  assert.equal(EstimationFormulas.confidence(95, 100).value, 95, 'ninety-five percent')
  assert.equal(EstimationFormulas.residual(80, 65).value, 15)
  assert.equal(EstimationFormulas.likelihood(750, 1000).value, 75, 'matches over trials')
  assert.equal(EstimationFormulas.innovation(120, 100).value, 20)
  assert.equal(EstimationFormulas.estimategain(30, 70).value, 30, 'Kalman-style gain')
  assert.equal(EstimationFormulas.bias(40, 50).value, 0)
  assert.equal(EstimationFormulas.meansquareerror(1000, 10).dst, 'cybernetics')
  assert.equal(hexFamiliesOf().get('estimation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'estimation', program: ['meansquareerror'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `estimation.meansquareerror at ${uuid}`)
  uuidReceiptOf('estimation meansquareerror', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; meansquareerror 100, bias 8, variance 100, confidence 95, residual 15, likelihood 75, innovation 20, estimategain 30; crossing to cybernetics')
})
