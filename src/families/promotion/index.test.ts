import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PromotionFormulas } from './index.js'
import '../../mcp/families.js'

test('promotion: discount, redemption, lift, coupon, bundle, markdown, spiff, incremental — crossing to marketing', async (t) => {
  assert.equal(PromotionFormulas.discount(1000, 25).value, 250, 'a quarter off a thousand')
  assert.equal(PromotionFormulas.redemption(150, 1000).value, 15)
  assert.equal(PromotionFormulas.lift(1500, 1000).value, 50, 'the promo bought half again')
  assert.equal(PromotionFormulas.coupon(5, 2000).value, 10000)
  assert.equal(PromotionFormulas.bundle(1200, 999).value, 201, 'what the bundle saves')
  assert.equal(PromotionFormulas.markdown(80, 60).value, 25)
  assert.equal(PromotionFormulas.spiff(40, 25).value, 1000, 'the rep incentive')
  assert.equal(PromotionFormulas.incremental(500, 320).value, 180)
  assert.equal(PromotionFormulas.bundle(900, 1200).value, 0)
  assert.equal(PromotionFormulas.discount(1000, 25).dst, 'marketing')
  assert.equal(hexFamiliesOf().get('promotion')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'promotion', program: ['lift'], params: [1500, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `promotion.lift at ${uuid}`)
  uuidReceiptOf('promotion lift', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; discount 250, redemption 15, lift 50, coupon 10000, bundle 201, markdown 25, spiff 1000, incremental 180; crossing to marketing')
})
