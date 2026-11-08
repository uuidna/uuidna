import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SubsidyFormulas } from './index.js'
import '../../mcp/families.js'

test('subsidy: amount, costtotal, pricereduction, beneficiaries, efficiencyloss, passthrough, budgetpct, multipliereffect — crossing to macroeconomics', async (t) => {
  assert.equal(SubsidyFormulas.amount(500, 2).value, 1000)
  assert.equal(SubsidyFormulas.costtotal(1000, 100).value, 100000)
  assert.equal(SubsidyFormulas.pricereduction(100, 70).value, 30)
  assert.equal(SubsidyFormulas.beneficiaries(1000, 10).value, 10000)
  assert.equal(SubsidyFormulas.efficiencyloss(300, 10).value, 30)
  assert.equal(SubsidyFormulas.passthrough(60, 100).value, 60)
  assert.equal(SubsidyFormulas.budgetpct(5, 100).value, 5)
  assert.equal(SubsidyFormulas.multipliereffect(1000, 2).value, 2000)
  assert.equal(SubsidyFormulas.amount(500, 2).dst, 'macroeconomics')
  assert.equal(hexFamiliesOf().get('subsidy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'subsidy', program: ['amount'], params: [500, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `subsidy.amount at ${uuid}`)
  uuidReceiptOf('subsidy amount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; amount 1000, costtotal 100000, pricereduction 30, beneficiaries 10000, efficiencyloss 30, passthrough 60, budgetpct 5, multipliereffect 2000; crossing to macroeconomics')
})
