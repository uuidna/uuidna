import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GastronomyFormulas } from './index.js'
import '../../mcp/families.js'

test('gastronomy: portioncost, platecost, foodcostpercent, yield, menuprice, covers, waste, margin — crossing to cuisine', async (t) => {
  assert.equal(GastronomyFormulas.portioncost(2000, 8).value, 250, 'cost of one portion')
  assert.equal(GastronomyFormulas.platecost(250, 120, 80).value, 450, 'food, labor, overhead on the plate')
  assert.equal(GastronomyFormulas.foodcostpercent(300, 1000).value, 30)
  assert.equal(GastronomyFormulas.yield(1000, 250).value, 750, 'usable weight after trim')
  assert.equal(GastronomyFormulas.menuprice(300, 3).value, 900, 'cost at a 3x markup')
  assert.equal(GastronomyFormulas.covers(60, 3).value, 180, 'covers served over the night')
  assert.equal(GastronomyFormulas.waste(200, 180).value, 20)
  assert.equal(GastronomyFormulas.margin(900, 300).value, 600, 'profit on the plate')
  assert.equal(GastronomyFormulas.margin(300, 900).value, 0)
  assert.equal(GastronomyFormulas.portioncost(2000, 8).dst, 'cuisine')
  assert.equal(hexFamiliesOf().get('gastronomy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gastronomy', program: ['covers'], params: [60, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 180, `gastronomy.covers at ${uuid}`)
  uuidReceiptOf('gastronomy covers', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; portioncost 250, platecost 450, foodcostpercent 30, yield 750, menuprice 900, covers 180, waste 20, margin 600; crossing to cuisine')
})
