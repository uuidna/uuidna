import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VolatilityFormulas } from './index.js'
import '../../mcp/families.js'

test('volatility: range, annualized, historicalband, beta, variance, impliedmove, zscore, drawdown — crossing to trading', async (t) => {
  assert.equal(VolatilityFormulas.range(150, 90).value, 60, 'the day\'s spread')
  assert.equal(VolatilityFormulas.annualized(2).value, 32, 'a daily move scaled by 16')
  assert.equal(VolatilityFormulas.historicalband(5, 2).value, 20, 'a two-sigma band width')
  assert.equal(VolatilityFormulas.beta(150, 100).value, 150, 'beta in hundredths')
  assert.equal(VolatilityFormulas.variance(500, 5).value, 100)
  assert.equal(VolatilityFormulas.impliedmove(200, 25).value, 50, 'the implied move')
  assert.equal(VolatilityFormulas.zscore(120, 100, 10).value, 2, 'two sigmas out')
  assert.equal(VolatilityFormulas.drawdown(200, 150).value, 25, 'a 25% drawdown')
  assert.equal(VolatilityFormulas.range2(9, 4).value, 5)
  assert.equal(VolatilityFormulas.drawdown2(10, 3).value, 7)
  assert.equal(VolatilityFormulas.valueatrisk(1000, 5).value, 50)
  assert.equal(VolatilityFormulas.sumsquares(3, 4).value, 25)
  assert.equal(VolatilityFormulas.meandeviation(20, 4).value, 5)
  assert.equal(VolatilityFormulas.excessreturn(8, 3).value, 5)
  assert.equal(VolatilityFormulas.beta2(10, 4).value, 2)
  assert.equal(VolatilityFormulas.beta(150, 0).value, 0)
  assert.equal(VolatilityFormulas.range(150, 90).dst, 'trading')
  assert.equal(hexFamiliesOf().get('volatility')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'volatility', program: ['beta'], params: [150, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `volatility.beta at ${uuid}`)
  uuidReceiptOf('volatility beta', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; range 60, annualized 32, historicalband 20, beta 150, variance 100, impliedmove 50, zscore 2, drawdown 25; crossing to trading')
})
