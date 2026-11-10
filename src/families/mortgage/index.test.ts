import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MortgageFormulas } from './index.js'
import '../../mcp/families.js'

test('mortgage: ltv, dti, downpayment, principal, interestportion, equity, pmi, affordability — crossing to banking', async (t) => {
  assert.equal(MortgageFormulas.ltv(160, 200).value, 80, 'an 80% loan-to-value')
  assert.equal(MortgageFormulas.dti(2000, 5000).value, 40)
  assert.equal(MortgageFormulas.downpayment(200, 160).value, 40, 'forty down')
  assert.equal(MortgageFormulas.principal(1200, 500).value, 700)
  assert.equal(MortgageFormulas.interestportion(50000, 6).value, 250, 'a month of interest')
  assert.equal(MortgageFormulas.equity(50000, 30000).value, 20000)
  assert.equal(MortgageFormulas.pmi(85, 80).value, 1, 'PMI owed')
  assert.equal(MortgageFormulas.pmi(75, 80).value, 0)
  assert.equal(MortgageFormulas.affordability(12000, 4).value, 48000)
  assert.equal(MortgageFormulas.ltv(160, 200).dst, 'banking')
  assert.equal(hexFamiliesOf().get('mortgage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mortgage', program: ['ltv'], params: [160, 200] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `mortgage.ltv at ${uuid}`)
  uuidReceiptOf('mortgage ltv', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ltv 80, dti 40, downpayment 40, principal 700, interestportion 250, equity 20000, pmi 1, affordability 48000; crossing to banking')
})
