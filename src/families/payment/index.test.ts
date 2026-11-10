import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PaymentFormulas } from './index.js'
import '../../mcp/families.js'

test('payment: fee, chargeback, settlement, interchange, fx, payout, decline, authorization — crossing to accounting', async (t) => {
  assert.equal(PaymentFormulas.fee(10000, 290).value, 290, '2.9% in basis points')
  assert.equal(PaymentFormulas.chargeback(5, 1000).value, 0, 'a low chargeback rate rounds down')
  assert.equal(PaymentFormulas.chargeback(50, 1000).value, 5)
  assert.equal(PaymentFormulas.settlement(10000, 320).value, 9680)
  assert.equal(PaymentFormulas.interchange(10000, 2).value, 200)
  assert.equal(PaymentFormulas.fx(10000, 10850).value, 10850, 'a 1.085 rate')
  assert.equal(PaymentFormulas.payout(50000, 5000).value, 45000)
  assert.equal(PaymentFormulas.decline(30, 1000).value, 3)
  assert.equal(PaymentFormulas.authorization(8000, 10000).value, 8000, 'captured within the hold')
  assert.equal(PaymentFormulas.fee(10000, 290).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('payment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'payment', program: ['settlement'], params: [10000, 320] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9680, `payment.settlement at ${uuid}`)
  uuidReceiptOf('payment settlement', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fee 290, chargeback 5, settlement 9680, interchange 200, fx 10850, payout 45000, decline 3, authorization 8000; crossing to accounting')
})
