import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RetailFormulas } from './index.js'
import '../../mcp/families.js'

test('retail: markup, margin, turnover, footfall, basket, shrinkage, restock, sales — crossing to econ', async (t) => {
  assert.equal(RetailFormulas.markup(50, 80).value, 60, 'a 60% markup over cost')
  assert.equal(RetailFormulas.margin(80, 50).value, 37)
  assert.equal(RetailFormulas.turnover(12000, 1000).value, 12, 'twelve turns a year')
  assert.equal(RetailFormulas.footfall(200, 1000).value, 20, 'one in five converts')
  assert.equal(RetailFormulas.basket(5000, 100).value, 50)
  assert.equal(RetailFormulas.shrinkage(30, 1000).value, 3)
  assert.equal(RetailFormulas.restock(90, 75).value, 1, 'reorder point reached')
  assert.equal(RetailFormulas.restock(50, 75).value, 0)
  assert.equal(RetailFormulas.sales(40, 25).value, 1000)
  assert.equal(RetailFormulas.markup(50, 80).dst, 'econ')
  assert.equal(hexFamiliesOf().get('retail')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'retail', program: ['footfall'], params: [200, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `retail.footfall at ${uuid}`)
  uuidReceiptOf('retail footfall', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; markup 60, margin 37, turnover 12, footfall 20, basket 50, shrinkage 3, restock 1, sales 1000; crossing to econ')
})
