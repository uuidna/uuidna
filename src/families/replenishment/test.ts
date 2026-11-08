import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReplenishmentFormulas } from './index.js'
import '../../mcp/families.js'

test('replenishment: reorder, safetystock, eoq, leadtime, cycle, parlevel, fill, stockout — crossing to warehousing', async (t) => {
  assert.equal(ReplenishmentFormulas.reorder(50, 7).value, 350, 'a week of daily demand')
  assert.equal(ReplenishmentFormulas.safetystock(80, 50, 7).value, 210, 'the spike held across the lead time')
  assert.equal(ReplenishmentFormulas.eoq(1000, 50, 20).value, 5000, 'the squared economic order quantity')
  assert.equal(ReplenishmentFormulas.leadtime(5, 2).value, 7)
  assert.equal(ReplenishmentFormulas.cycle(200).value, 100, 'half the order quantity')
  assert.equal(ReplenishmentFormulas.parlevel(50, 7, 100).value, 450)
  assert.equal(ReplenishmentFormulas.fill(950, 1000).value, 95, 'fill rate percent')
  assert.equal(ReplenishmentFormulas.stockout(100, 30).value, 70, 'what the shelf could not meet')
  assert.equal(ReplenishmentFormulas.stockout(30, 100).value, 0)
  assert.equal(ReplenishmentFormulas.reorder(50, 7).dst, 'warehousing')
  assert.equal(hexFamiliesOf().get('replenishment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'replenishment', program: ['reorder'], params: [50, 7] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 350, `replenishment.reorder at ${uuid}`)
  uuidReceiptOf('replenishment reorder', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; reorder 350, safetystock 210, eoq 5000, leadtime 7, cycle 100, parlevel 450, fill 95, stockout 70; crossing to warehousing')
})
