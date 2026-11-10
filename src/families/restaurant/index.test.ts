import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RestaurantFormulas } from './index.js'
import '../../mcp/families.js'

test('restaurant: foodcost, turnover, averagecheck, laborcost, waste, margin, seatutilization, preptime — crossing to retail', async (t) => {
  assert.equal(RestaurantFormulas.foodcost(30, 100).value, 30, 'food cost percent of sales')
  assert.equal(RestaurantFormulas.turnover(120, 40).value, 3, 'three table turns')
  assert.equal(RestaurantFormulas.averagecheck(2000, 80).value, 25, 'average check per cover')
  assert.equal(RestaurantFormulas.laborcost(28, 100).value, 28)
  assert.equal(RestaurantFormulas.waste(5, 100).value, 5)
  assert.equal(RestaurantFormulas.margin(40, 10).value, 75, 'menu margin percent')
  assert.equal(RestaurantFormulas.seatutilization(60, 80).value, 75)
  assert.equal(RestaurantFormulas.preptime(90, 30).value, 3, 'minutes per dish')
  assert.equal(RestaurantFormulas.foodcost(30, 100).dst, 'retail')
  assert.equal(hexFamiliesOf().get('restaurant')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'restaurant', program: ['turnover'], params: [120, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `restaurant.turnover at ${uuid}`)
  uuidReceiptOf('restaurant turnover', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; foodcost 30, turnover 3, averagecheck 25, laborcost 28, waste 5, margin 75, seatutilization 75, preptime 3; crossing to retail')
})
