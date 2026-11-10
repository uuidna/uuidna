import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ShippingFormulas } from './index.js'
import '../../mcp/families.js'

test('shipping: teu, utilization, transittime, freightrate, demurrage, dwelltime, ontime, bunkerfuel — crossing to logistics', async (t) => {
  assert.equal(ShippingFormulas.teu(100, 2).value, 200, 'twenty-foot equivalents')
  assert.equal(ShippingFormulas.utilization(900, 1000).value, 90)
  assert.equal(ShippingFormulas.transittime(12000, 500).value, 24, 'days at sea')
  assert.equal(ShippingFormulas.freightrate(10000, 50).value, 200)
  assert.equal(ShippingFormulas.demurrage(5, 150).value, 750)
  assert.equal(ShippingFormulas.dwelltime(72).value, 72)
  assert.equal(ShippingFormulas.ontime(95, 100).value, 95, 'on-time share')
  assert.equal(ShippingFormulas.bunkerfuel(1000, 30).value, 30000)
  assert.equal(ShippingFormulas.teu(100, 2).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('shipping')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'shipping', program: ['teu'], params: [100, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `shipping.teu at ${uuid}`)
  uuidReceiptOf('shipping teu', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; teu 200, utilization 90, transittime 24, freightrate 200, demurrage 750, dwelltime 72, ontime 95, bunkerfuel 30000; crossing to logistics')
})
