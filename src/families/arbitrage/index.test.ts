import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ArbitrageFormulas } from './index.js'
import '../../mcp/families.js'

test('arbitrage: spread, netprofit, triangularrate, pricedifference, returnrate, transactioncost, breakeven, edge — crossing to trading', async (t) => {
  assert.equal(ArbitrageFormulas.spread(10050, 10000).value, 50, 'the bid-ask spread')
  assert.equal(ArbitrageFormulas.netprofit(5000, 300).value, 4700)
  assert.equal(ArbitrageFormulas.triangularrate(120, 110, 100).value, 132, 'the rate across three markets')
  assert.equal(ArbitrageFormulas.pricedifference(110, 100).value, 10, 'ten percent apart')
  assert.equal(ArbitrageFormulas.returnrate(250, 1000).value, 25)
  assert.equal(ArbitrageFormulas.transactioncost(50000, 25).value, 125)
  assert.equal(ArbitrageFormulas.breakeven(1000, 30).value, 34, 'units to break even')
  assert.equal(ArbitrageFormulas.edge(1000, 600, 100).value, 300, 'the edge after every cost')
  assert.equal(ArbitrageFormulas.pricedifference(100, 110).value, 0)
  assert.equal(ArbitrageFormulas.spread(10050, 10000).dst, 'trading')
  assert.equal(hexFamiliesOf().get('arbitrage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'arbitrage', program: ['triangularrate'], params: [120, 110, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 132, `arbitrage.triangularrate at ${uuid}`)
  uuidReceiptOf('arbitrage triangularrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; spread 50, netprofit 4700, triangularrate 132, pricedifference 10, returnrate 25, transactioncost 125, breakeven 34, edge 300; crossing to trading')
})
