import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TaxFormulas } from './index.js'

/** tax: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('tax: bracket, taxable, liability, deductions, credits, effective, brackets, combos', async (t) => {
  assert.equal(TaxFormulas.bracket(22, 100).value, 22, 'bracket(22, 100)')
  assert.equal(TaxFormulas.taxable(80000, 12000).value, 68000, 'taxable(80000, 12000)')
  assert.equal(TaxFormulas.liability(80000, 5).value, 16000, 'liability(80000, 5)')
  assert.equal(TaxFormulas.deductions(12000, 0).value, 12000, 'deductions(12000, 0)')
  assert.equal(TaxFormulas.credits(5000, 2000).value, 3000, 'credits(5000, 2000)')
  assert.equal(TaxFormulas.effective(18, 100).value, 18, 'effective(18, 100)')
  assert.equal(TaxFormulas.brackets(7, 0).value, 7, 'brackets(7, 0)')
  assert.equal(TaxFormulas.combos(7, 2).value, 21, 'combos(7, 2)')
  assert.equal(hexFamiliesOf().get('tax')?.length, 8)
  for (const [name, params, expected] of [["bracket",[22,100],22],["deductions",[12000,0],12000],["credits",[5000,2000],3000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'tax', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `tax.${name} at ${uuid}`)
    uuidReceiptOf(`tax ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "bracket=22, deductions=12000, credits=3000")
})
