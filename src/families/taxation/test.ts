import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TaxationFormulas } from './index.js'
import '../../mcp/families.js'

test('taxation: income, vat, bracket, deduction, effective, withholding, capitalgains, liability — crossing to econ', async (t) => {
  assert.equal(TaxationFormulas.income(50000, 20).value, 10000, 'income tax at 20%')
  assert.equal(TaxationFormulas.vat(1000, 20).value, 200)
  assert.equal(TaxationFormulas.bracket(60000, 50000).value, 10000, 'income above the threshold')
  assert.equal(TaxationFormulas.bracket(40000, 50000).value, 0)
  assert.equal(TaxationFormulas.deduction(50000, 12000).value, 38000)
  assert.equal(TaxationFormulas.effective(10000, 50000).value, 20, 'effective rate percent')
  assert.equal(TaxationFormulas.withholding(52000, 12).value, 4333, 'monthly withholding')
  assert.equal(TaxationFormulas.capitalgains(15000, 10000).value, 5000)
  assert.equal(TaxationFormulas.liability(38000, 25).value, 9500)
  assert.equal(TaxationFormulas.income(50000, 20).dst, 'econ')
  assert.equal(hexFamiliesOf().get('taxation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'taxation', program: ['liability'], params: [38000, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9500, `taxation.liability at ${uuid}`)
  uuidReceiptOf('taxation liability', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; income 10000, vat 200, bracket 10000, deduction 38000, effective 20, withholding 4333, capitalgains 5000, liability 9500; crossing to econ')
})
