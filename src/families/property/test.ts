import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PropertyFormulas } from './index.js'
import '../../mcp/families.js'

test('property: ltv, cap rate, mortgage, instalment, stamp duty, equity, affordability — crossing to law', async (t) => {
  assert.equal(PropertyFormulas.ltv(80000, 100000).value, 80, 'an 80% loan-to-value')
  assert.equal(PropertyFormulas.cap(12000, 200000).value, 6, 'a 6% cap rate')
  assert.equal(PropertyFormulas.mortgage(10000, 5, 10).value, 15000, 'simple interest over ten years')
  assert.equal(PropertyFormulas.payment(12000, 12).value, 1000, 'monthly instalment')
  assert.equal(PropertyFormulas.stampduty(50000, 3).value, 1500)
  assert.equal(PropertyFormulas.equity(40000, 25000).value, 15000)
  assert.equal(PropertyFormulas.afford(40000, 4).value, 160000, 'four times income')
  assert.equal(PropertyFormulas.appreciation(50000, 10).value, 5000)
  assert.equal(PropertyFormulas.ltv(80000, 100000).dst, 'law')
  assert.equal(hexFamiliesOf().get('property')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'property', program: ['mortgage'], params: [10000, 5, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15000, `property.mortgage at ${uuid}`)
  uuidReceiptOf('property mortgage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ltv 80%, cap 6%, mortgage 15000, payment 1000, stampduty 1500, equity 15000, afford 160000; crossing to law')
})
