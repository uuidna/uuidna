import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProcurementFormulas } from './index.js'
import '../../mcp/families.js'

test('procurement: savings, spend, compliance, leadtime, eoq, supplier, discount, quality — crossing to logistics', async (t) => {
  assert.equal(ProcurementFormulas.savings(100, 70).value, 30, 'a negotiation shaves 30')
  assert.equal(ProcurementFormulas.savings(70, 100).value, 0, 'never below zero')
  assert.equal(ProcurementFormulas.spend(100, 5).value, 500)
  assert.equal(ProcurementFormulas.compliance(90, 100).value, 90)
  assert.equal(ProcurementFormulas.leadtime(3, 10).value, 7, 'seven days to receipt')
  assert.equal(ProcurementFormulas.eoq(1000, 50).value, 20)
  assert.equal(ProcurementFormulas.supplier(95, 100).value, 95, 'on-time percent')
  assert.equal(ProcurementFormulas.discount(1000, 10).value, 100)
  assert.equal(ProcurementFormulas.quality(990, 1000).value, 99)
  assert.equal(ProcurementFormulas.spend(100, 5).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('procurement')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'procurement', program: ['spend'], params: [100, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `procurement.spend at ${uuid}`)
  uuidReceiptOf('procurement spend', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; savings 30, spend 500, compliance 90, leadtime 7, eoq 20, supplier 95, discount 100, quality 99; crossing to logistics')
})
