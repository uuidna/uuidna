import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AmortizationFormulas } from './index.js'
import '../../mcp/families.js'

test('amortization: schedulepayment, principalportion, interestportion, remainingbalance, payoffmonths, totalcost, extrapayment, intangible — crossing to accounting', async (t) => {
  assert.equal(AmortizationFormulas.schedulepayment(24000, 24).value, 1000, 'a level payment over two years')
  assert.equal(AmortizationFormulas.principalportion(1000, 150).value, 850)
  assert.equal(AmortizationFormulas.principalportion(100, 150).value, 0, 'interest alone exceeds the payment')
  assert.equal(AmortizationFormulas.interestportion(60000, 6).value, 300, 'a month at 6% a year')
  assert.equal(AmortizationFormulas.remainingbalance(60000, 18000).value, 42000)
  assert.equal(AmortizationFormulas.payoffmonths(12500, 1000).value, 13, 'thirteen months to clear it')
  assert.equal(AmortizationFormulas.totalcost(1000, 360).value, 360000)
  assert.equal(AmortizationFormulas.extrapayment(12000, 800, 200).value, 12, 'paid off a year sooner')
  assert.equal(AmortizationFormulas.intangible(50000, 10).value, 5000)
  assert.equal(AmortizationFormulas.schedulepayment(24000, 24).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('amortization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'amortization', program: ['payoffmonths'], params: [12500, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 13, `amortization.payoffmonths at ${uuid}`)
  uuidReceiptOf('amortization payoffmonths', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; schedulepayment 1000, principalportion 850, interestportion 300, remainingbalance 42000, payoffmonths 13, totalcost 360000, extrapayment 12, intangible 5000; crossing to accounting')
})
