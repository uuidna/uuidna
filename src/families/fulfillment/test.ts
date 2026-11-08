import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FulfillmentFormulas } from './index.js'
import '../../mcp/families.js'

test('fulfillment: rate, cycle, accuracy, backorder, perfectorder, pick, pack, ship — crossing to logistics', async (t) => {
  assert.equal(FulfillmentFormulas.rate(950, 1000).value, 95, 'fill rate percentage')
  assert.equal(FulfillmentFormulas.cycle(4800, 100).value, 48, 'hours per order')
  assert.equal(FulfillmentFormulas.accuracy(980, 1000).value, 98)
  assert.equal(FulfillmentFormulas.backorder(500, 320).value, 180, 'units short')
  assert.equal(FulfillmentFormulas.perfectorder(920, 1000).value, 92)
  assert.equal(FulfillmentFormulas.pick(600, 5).value, 120, 'items picked per hour')
  assert.equal(FulfillmentFormulas.pack(100, 12).value, 9, 'cartons for the items')
  assert.equal(FulfillmentFormulas.ship(200, 7).value, 1400)
  assert.equal(FulfillmentFormulas.rate(950, 1000).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('fulfillment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fulfillment', program: ['rate'], params: [950, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `fulfillment.rate at ${uuid}`)
  uuidReceiptOf('fulfillment rate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 95, cycle 48, accuracy 98, backorder 180, perfectorder 92, pick 120, pack 9, ship 1400; crossing to logistics')
})
