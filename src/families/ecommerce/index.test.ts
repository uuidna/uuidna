import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EcommerceFormulas } from './index.js'
import '../../mcp/families.js'

test('ecommerce: cart, discount, shipping, margin, aov, conversion, refund, inventory — crossing to accounting', async (t) => {
  assert.equal(EcommerceFormulas.cart(3, 2000).value, 6000)
  assert.equal(EcommerceFormulas.discount(2000, 15).value, 300)
  assert.equal(EcommerceFormulas.shipping(5, 400).value, 2000)
  assert.equal(EcommerceFormulas.margin(100, 60).value, 40, 'a 40% margin')
  assert.equal(EcommerceFormulas.aov(50000, 250).value, 200)
  assert.equal(EcommerceFormulas.conversion(50, 1000).value, 5)
  assert.equal(EcommerceFormulas.refund(2000, 100).value, 2000, 'a full refund')
  assert.equal(EcommerceFormulas.inventory(500, 320).value, 180)
  assert.equal(EcommerceFormulas.cart(3, 2000).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('ecommerce')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ecommerce', program: ['cart'], params: [3, 2000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `ecommerce.cart at ${uuid}`)
  uuidReceiptOf('ecommerce cart', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cart 6000, discount 300, shipping 2000, margin 40, aov 200, conversion 5, refund 2000, inventory 180; crossing to accounting')
})
