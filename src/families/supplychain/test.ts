import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SupplychainFormulas } from './index.js'
import '../../mcp/families.js'

test('supplychain: leadtime, turnover, fillrate, safetystock, reorder, backorder, utilization, cycle — crossing to logistics', async (t) => {
  assert.equal(SupplychainFormulas.leadtime(10, 17).value, 7, 'seven days to ship')
  assert.equal(SupplychainFormulas.leadtime(17, 10).value, 0, 'never negative')
  assert.equal(SupplychainFormulas.turnover(1000, 250).value, 4, 'inventory turns four times')
  assert.equal(SupplychainFormulas.fillrate(95, 100).value, 95)
  assert.equal(SupplychainFormulas.safetystock(50, 3).value, 150)
  assert.equal(SupplychainFormulas.reorder(40, 5).value, 200)
  assert.equal(SupplychainFormulas.backorder(5, 100).value, 5)
  assert.equal(SupplychainFormulas.utilization(80, 100).value, 80)
  assert.equal(SupplychainFormulas.cycle(20, 100).value, 5, 'five time units in work')
  assert.equal(SupplychainFormulas.leadtime(10, 17).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('supplychain')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'supplychain', program: ['turnover'], params: [1000, 250] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `supplychain.turnover at ${uuid}`)
  uuidReceiptOf('supplychain turnover', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; leadtime 7, turnover 4, fillrate 95, safetystock 150, reorder 200, backorder 5, utilization 80, cycle 5; crossing to logistics')
})
