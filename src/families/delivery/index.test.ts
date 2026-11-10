import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DeliveryFormulas } from './index.js'
import '../../mcp/families.js'

test('delivery: ontime, density, firstattempt, lastmile, window, returns, eta, productivity — crossing to logistics', async (t) => {
  assert.equal(DeliveryFormulas.ontime(950, 1000).value, 95, 'on-time rate')
  assert.equal(DeliveryFormulas.density(120, 8).value, 15, 'stops per route')
  assert.equal(DeliveryFormulas.firstattempt(880, 1000).value, 88)
  assert.equal(DeliveryFormulas.lastmile(4500, 900).value, 5, 'cost per parcel')
  assert.equal(DeliveryFormulas.window(270, 300).value, 90)
  assert.equal(DeliveryFormulas.returns(30, 1000).value, 3, 'return rate')
  assert.equal(DeliveryFormulas.eta(600, 50).value, 12, 'hours to arrival')
  assert.equal(DeliveryFormulas.productivity(96, 8).value, 12, 'deliveries per hour')
  assert.equal(DeliveryFormulas.ontime(950, 1000).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('delivery')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'delivery', program: ['density'], params: [120, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `delivery.density at ${uuid}`)
  uuidReceiptOf('delivery density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ontime 95, density 15, firstattempt 88, lastmile 5, window 90, returns 3, eta 12, productivity 12; crossing to logistics')
})
