import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FuturesFormulas } from './index.js'
import '../../mcp/families.js'

test('futures: forwardprice, basis, marginrequirement, contractvalue, rollyield, notional, maintenancemargin, settlementprice — crossing to trading', async (t) => {
  assert.equal(FuturesFormulas.forwardprice(100, 5, 2).value, 110, 'spot carried two periods')
  assert.equal(FuturesFormulas.basis(110, 100).value, 10)
  assert.equal(FuturesFormulas.marginrequirement(10000, 10).value, 1000, 'ten percent of the contract value')
  assert.equal(FuturesFormulas.contractvalue(50, 100).value, 5000)
  assert.equal(FuturesFormulas.rollyield(110, 100).value, 10, 'ten percent in backwardation')
  assert.equal(FuturesFormulas.notional(50, 100, 2).value, 10000)
  assert.equal(FuturesFormulas.maintenancemargin(1000, 75).value, 750)
  assert.equal(FuturesFormulas.settlementprice(110, 90, 100).value, 100, 'the mean of the day')
  assert.equal(FuturesFormulas.contractvalue(50, 100).dst, 'trading')
  assert.equal(hexFamiliesOf().get('futures')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'futures', program: ['contractvalue'], params: [50, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `futures.contractvalue at ${uuid}`)
  uuidReceiptOf('futures contractvalue', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; forwardprice 110, basis 10, marginrequirement 1000, contractvalue 5000, rollyield 10, notional 10000, maintenancemargin 750, settlementprice 100; crossing to trading')
})
