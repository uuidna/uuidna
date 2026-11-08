import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BudgetingFormulas } from './index.js'
import '../../mcp/families.js'

test('budgeting: variance, utilization, surplus, forecast, allocation, burnrate, runway, savings — crossing to accounting', async (t) => {
  assert.equal(BudgetingFormulas.variance(1100, 1000).value, 10, 'ten percent over budget')
  assert.equal(BudgetingFormulas.utilization(750, 1000).value, 75)
  assert.equal(BudgetingFormulas.surplus(5000, 3000).value, 2000, 'income left over expenses')
  assert.equal(BudgetingFormulas.forecast(100, 12).value, 1200)
  assert.equal(BudgetingFormulas.allocation(250, 1000).value, 25, 'a quarter of the total')
  assert.equal(BudgetingFormulas.burnrate(12000, 6).value, 2000, 'per month')
  assert.equal(BudgetingFormulas.runway(24000, 2000).value, 12, 'twelve months of runway')
  assert.equal(BudgetingFormulas.savings(1000, 700).value, 300)
  assert.equal(BudgetingFormulas.surplus(3000, 5000).value, 0)
  assert.equal(BudgetingFormulas.variance(1100, 1000).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('budgeting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'budgeting', program: ['runway'], params: [24000, 2000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `budgeting.runway at ${uuid}`)
  uuidReceiptOf('budgeting runway', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; variance 10, utilization 75, surplus 2000, forecast 1200, allocation 25, burnrate 2000, runway 12, savings 300; crossing to accounting')
})
