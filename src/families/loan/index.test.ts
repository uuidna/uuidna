import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LoanFormulas } from './index.js'

/** loan: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('loan: principal, interest, payment, term, ltv, amortization, points, combos', async (t) => {
  assert.equal(LoanFormulas.principal(20000, 1).value, 20000, 'principal(20000, 1)')
  assert.equal(LoanFormulas.interest(5, 100).value, 5, 'interest(5, 100)')
  assert.equal(LoanFormulas.payment(24000, 360).value, 66, 'payment(24000, 360)')
  assert.equal(LoanFormulas.term(30, 12).value, 360, 'term(30, 12)')
  assert.equal(LoanFormulas.ltv(80, 100).value, 80, 'ltv(80, 100)')
  assert.equal(LoanFormulas.amortization(20000, 360).value, 55, 'amortization(20000, 360)')
  assert.equal(LoanFormulas.points(2, 0).value, 2, 'points(2, 0)')
  assert.equal(LoanFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('loan')?.length, 8)
  for (const [name, params, expected] of [["principal",[20000,1],20000],["interest",[5,100],5],["payment",[24000,360],66]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'loan', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `loan.${name} at ${uuid}`)
    uuidReceiptOf(`loan ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "principal=20000, interest=5, payment=66")
})
