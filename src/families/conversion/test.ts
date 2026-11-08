import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConversionFormulas } from './index.js'
import '../../mcp/families.js'

test('conversion: rate, funnel, cpa, roas, bounce, cart, checkout, uplift — crossing to marketing', async (t) => {
  assert.equal(ConversionFormulas.rate(50, 1000).value, 5, 'five percent convert')
  assert.equal(ConversionFormulas.funnel(1000, 250).value, 25, 'a quarter reach the bottom')
  assert.equal(ConversionFormulas.cpa(1000, 25).value, 40)
  assert.equal(ConversionFormulas.roas(5000, 1000).value, 500, 'five-to-one on ad spend')
  assert.equal(ConversionFormulas.bounce(300, 1000).value, 30)
  assert.equal(ConversionFormulas.cart(1000, 300).value, 70, 'most carts abandoned')
  assert.equal(ConversionFormulas.checkout(80, 100).value, 80)
  assert.equal(ConversionFormulas.uplift(120, 100).value, 20, 'the variant wins')
  assert.equal(ConversionFormulas.uplift(100, 100).value, 0)
  assert.equal(ConversionFormulas.rate(50, 1000).dst, 'marketing')
  assert.equal(hexFamiliesOf().get('conversion')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'conversion', program: ['rate'], params: [50, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `conversion.rate at ${uuid}`)
  uuidReceiptOf('conversion rate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 5, funnel 25, cpa 40, roas 500, bounce 30, cart 70, checkout 80, uplift 20; crossing to marketing')
})
