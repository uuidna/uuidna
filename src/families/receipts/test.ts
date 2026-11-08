import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReceiptsFormulas } from './index.js'
import '../../mcp/families.js'

test('receipts: total, linepairs, taxamount, subtotal, itemcount, orderings, discountpct, chainlength — crossing to accounting', async (t) => {
  assert.equal(ReceiptsFormulas.total(100, 12).value, 1200)
  assert.equal(ReceiptsFormulas.linepairs(10, 2).value, 45)
  assert.equal(ReceiptsFormulas.taxamount(1000, 10).value, 100)
  assert.equal(ReceiptsFormulas.subtotal(1200, 100).value, 1100)
  assert.equal(ReceiptsFormulas.itemcount(8, 4).value, 12)
  assert.equal(ReceiptsFormulas.orderings(5).value, 120)
  assert.equal(ReceiptsFormulas.discountpct(15, 100).value, 15)
  assert.equal(ReceiptsFormulas.chainlength(30, 1).value, 30)
  assert.equal(ReceiptsFormulas.total(100, 12).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('receipts')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'receipts', program: ['total'], params: [100, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `receipts.total at ${uuid}`)
  uuidReceiptOf('receipts total', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; total 1200, linepairs 45, taxamount 100, subtotal 1100, itemcount 12, orderings 120, discountpct 15, chainlength 30; crossing to accounting')
})
