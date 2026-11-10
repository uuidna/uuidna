import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MerchandisingFormulas } from './index.js'
import '../../mcp/families.js'

test('merchandising: margin, markup, sellthrough, turnover, facings, planogram, assortment, gmroi — crossing to retail', async (t) => {
  assert.equal(MerchandisingFormulas.margin(100, 60).value, 40, 'forty points of margin')
  assert.equal(MerchandisingFormulas.markup(100, 80).value, 25)
  assert.equal(MerchandisingFormulas.sellthrough(75, 100).value, 75, 'three quarters sold through')
  assert.equal(MerchandisingFormulas.turnover(1000, 200).value, 5)
  assert.equal(MerchandisingFormulas.facings(120, 8).value, 15, 'fifteen facings on the shelf')
  assert.equal(MerchandisingFormulas.planogram(5, 20).value, 100)
  assert.equal(MerchandisingFormulas.assortment(12, 30).value, 360)
  assert.equal(MerchandisingFormulas.gmroi(500, 250).value, 200, 'two hundred percent return')
  assert.equal(MerchandisingFormulas.margin(100, 60).dst, 'retail')
  assert.equal(hexFamiliesOf().get('merchandising')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'merchandising', program: ['turnover'], params: [1000, 200] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `merchandising.turnover at ${uuid}`)
  uuidReceiptOf('merchandising turnover', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; margin 40, markup 25, sellthrough 75, turnover 5, facings 15, planogram 100, assortment 360, gmroi 200; crossing to retail')
})
