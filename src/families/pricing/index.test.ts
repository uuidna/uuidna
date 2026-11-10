import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PricingFormulas } from './index.js'
import '../../mcp/families.js'

test('pricing: annual, arr, discount, mrr, savings, seats, tier, upgrade — crossing to ecommerce', async (t) => {
  assert.equal(PricingFormulas.annual(50, 12).value, 600, 'a year billed monthly')
  assert.equal(PricingFormulas.arr(1000, 12).value, 12000)
  assert.equal(PricingFormulas.discount(200, 15).value, 30, '15% off 200')
  assert.equal(PricingFormulas.mrr(100, 50).value, 5000)
  assert.equal(PricingFormulas.savings(50, 500).value, 100, 'a year of monthly over the annual price')
  assert.equal(PricingFormulas.savings(40, 600).value, 0)
  assert.equal(PricingFormulas.seats(10, 25).value, 250)
  assert.equal(PricingFormulas.tier(12, 3).value, 4)
  assert.equal(PricingFormulas.upgrade(50, 90).value, 40)
  assert.equal(PricingFormulas.upgrade(90, 50).value, 0)
  assert.equal(PricingFormulas.annual(50, 12).dst, 'ecommerce')
  assert.equal(hexFamiliesOf().get('pricing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pricing', program: ['annual'], params: [50, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `pricing.annual at ${uuid}`)
  uuidReceiptOf('pricing annual', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; annual 600, arr 12000, discount 30, mrr 5000, savings 100, seats 250, tier 4, upgrade 40; crossing to ecommerce')
})
