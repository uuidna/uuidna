import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PayablesFormulas } from './index.js'
import '../../mcp/families.js'

test('payables: turnover, dpo, aging, discount, outstanding, accrual, settlement, terms — crossing to accounting', async (t) => {
  assert.equal(PayablesFormulas.turnover(900, 100).value, 9, 'nine times a year')
  assert.equal(PayablesFormulas.dpo(1000, 2000).value, 182)
  assert.equal(PayablesFormulas.aging(1000, 600).value, 400, 'still owed')
  assert.equal(PayablesFormulas.discount(10000, 2).value, 200)
  assert.equal(PayablesFormulas.outstanding(5000, 1500).value, 3500)
  assert.equal(PayablesFormulas.accrual(50, 30).value, 1500)
  assert.equal(PayablesFormulas.settlement(1000, 12).value, 84, 'per installment')
  assert.equal(PayablesFormulas.terms(30, 10).value, 20)
  assert.equal(PayablesFormulas.terms(10, 30).value, 0)
  assert.equal(PayablesFormulas.turnover(900, 100).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('payables')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'payables', program: ['settlement'], params: [1000, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 84, `payables.settlement at ${uuid}`)
  uuidReceiptOf('payables settlement', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; turnover 9, dpo 182, aging 400, discount 200, outstanding 3500, accrual 1500, settlement 84, terms 20; crossing to accounting')
})
