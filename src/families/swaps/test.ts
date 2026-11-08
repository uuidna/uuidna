import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SwapsFormulas } from './index.js'
import '../../mcp/families.js'

test('swaps: fixedleg, floatingleg, netpayment, notionalvalue, swaprate, spreadbasis, presentvalue, accruedinterest — crossing to trading', async (t) => {
  assert.equal(SwapsFormulas.fixedleg(10000, 500).value, 500, 'the fixed coupon leg')
  assert.equal(SwapsFormulas.floatingleg(10000, 300, 200).value, 500, 'index plus spread')
  assert.equal(SwapsFormulas.netpayment(800, 300).value, 500, 'fixed payer owes the net')
  assert.equal(SwapsFormulas.netpayment(300, 800).value, 0)
  assert.equal(SwapsFormulas.notionalvalue(1000, 50).value, 50000)
  assert.equal(SwapsFormulas.swaprate(500, 10000).value, 500, 'implied rate in bps')
  assert.equal(SwapsFormulas.spreadbasis(200, 250).value, 50)
  assert.equal(SwapsFormulas.presentvalue(10500, 500).value, 10000, 'discounted to today')
  assert.equal(SwapsFormulas.accruedinterest(50000, 500, 365).value, 2500, 'a full year of interest')
  assert.equal(SwapsFormulas.fixedleg(10000, 500).dst, 'trading')
  assert.equal(hexFamiliesOf().get('swaps')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'swaps', program: ['notionalvalue'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50000, `swaps.notionalvalue at ${uuid}`)
  uuidReceiptOf('swaps notionalvalue', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fixedleg 500, floatingleg 500, netpayment 500, notionalvalue 50000, swaprate 500, spreadbasis 50, presentvalue 10000, accruedinterest 2500; crossing to trading')
})
