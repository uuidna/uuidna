import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BudgetFormulas } from './index.js'

/** budget: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('budget: allocated, spent, variance, categories, surplus, utilization, quarters, combos', async (t) => {
  assert.equal(BudgetFormulas.allocated(10000, 12).value, 120000, 'allocated(10000, 12)')
  assert.equal(BudgetFormulas.spent(120000, 90000).value, 30000, 'spent(120000, 90000)')
  assert.equal(BudgetFormulas.variance(100, 85).value, 15, 'variance(100, 85)')
  assert.equal(BudgetFormulas.categories(8, 0).value, 8, 'categories(8, 0)')
  assert.equal(BudgetFormulas.surplus(120000, 110000).value, 10000, 'surplus(120000, 110000)')
  assert.equal(BudgetFormulas.utilization(90, 100).value, 90, 'utilization(90, 100)')
  assert.equal(BudgetFormulas.quarters(4, 0).value, 4, 'quarters(4, 0)')
  assert.equal(BudgetFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('budget')?.length, 8)
  for (const [name, params, expected] of [["allocated",[10000,12],120000],["variance",[100,85],15],["categories",[8,0],8]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'budget', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `budget.${name} at ${uuid}`)
    uuidReceiptOf(`budget ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "allocated=120000, variance=15, categories=8")
})
