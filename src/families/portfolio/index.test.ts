import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PortfolioFormulas } from './index.js'
import '../../mcp/families.js'

test('portfolio: allocation, beta, diversification, drawdown, income, rebalance, sharpe, weight — crossing to trading', async (t) => {
  assert.equal(PortfolioFormulas.allocation(60, 40).value, 60, 'sixty percent stocks')
  assert.equal(PortfolioFormulas.beta(120, 100).value, 120)
  assert.equal(PortfolioFormulas.diversification(30, 10).value, 3, 'three holdings per sector')
  assert.equal(PortfolioFormulas.drawdown(1000, 800).value, 20)
  assert.equal(PortfolioFormulas.income(50, 1000).value, 5, 'five percent yield')
  assert.equal(PortfolioFormulas.rebalance(15, 5).value, 10)
  assert.equal(PortfolioFormulas.rebalance(3, 5).value, 0, 'within threshold')
  assert.equal(PortfolioFormulas.sharpe(200, 100).value, 200)
  assert.equal(PortfolioFormulas.weight(25, 100).value, 25)
  assert.equal(PortfolioFormulas.weight(25, 100).dst, 'trading')
  assert.equal(hexFamiliesOf().get('portfolio')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'portfolio', program: ['diversification'], params: [30, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `portfolio.diversification at ${uuid}`)
  uuidReceiptOf('portfolio diversification', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; allocation 60, beta 120, diversification 3, drawdown 20, income 5, rebalance 10, sharpe 200, weight 25; crossing to trading')
})
