import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InvoiceFormulas } from './index.js'

/** invoice: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('invoice: subtotal, tax, total, lineitems, discount, duedays, overdue, combos', async (t) => {
  assert.equal(InvoiceFormulas.subtotal(100, 5).value, 500, 'subtotal(100, 5)')
  assert.equal(InvoiceFormulas.tax(20, 100).value, 20, 'tax(20, 100)')
  assert.equal(InvoiceFormulas.total(500, 100).value, 600, 'total(500, 100)')
  assert.equal(InvoiceFormulas.lineitems(8, 0).value, 8, 'lineitems(8, 0)')
  assert.equal(InvoiceFormulas.discount(10, 100).value, 10, 'discount(10, 100)')
  assert.equal(InvoiceFormulas.duedays(30, 0).value, 30, 'duedays(30, 0)')
  assert.equal(InvoiceFormulas.overdue(45, 30).value, 15, 'overdue(45, 30)')
  assert.equal(InvoiceFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('invoice')?.length, 8)
  for (const [name, params, expected] of [["subtotal",[100,5],500],["tax",[20,100],20],["total",[500,100],600]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'invoice', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `invoice.${name} at ${uuid}`)
    uuidReceiptOf(`invoice ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "subtotal=500, tax=20, total=600")
})
