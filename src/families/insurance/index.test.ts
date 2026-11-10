import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InsuranceFormulas } from './index.js'
import '../../mcp/families.js'

test('insurance: premium, claim, coinsurance, indemnity, loss ratio, reserve, subrogation — crossing to law', async (t) => {
  assert.equal(InsuranceFormulas.premium(100000, 2).value, 2000, '2% of the sum insured')
  assert.equal(InsuranceFormulas.claim(5000, 500).value, 4500, 'loss net of the deductible')
  assert.equal(InsuranceFormulas.claim(300, 500).value, 0, 'loss under the deductible')
  assert.equal(InsuranceFormulas.coinsurance(10000, 60, 100).value, 6000, 'under-insured: 60% carried')
  assert.equal(InsuranceFormulas.coinsurance(10000, 120, 100).value, 10000, 'over-insured never pays above the claim')
  assert.equal(InsuranceFormulas.indemnity(8000, 5000).value, 5000, 'capped at the policy limit')
  assert.equal(InsuranceFormulas.lossratio(70000, 100000).value, 70, 'a 70% loss ratio')
  assert.equal(InsuranceFormulas.reserve(50000, 30000).value, 20000, 'incurred not yet paid')
  assert.equal(InsuranceFormulas.subrogation(8000, 10000).value, 8000, 'recovery never exceeds what was paid')
  assert.equal(InsuranceFormulas.copay(4000, 20).value, 800, "the insured's 20% share")
  assert.equal(InsuranceFormulas.premium2(5, 1000).value, 50)
  assert.equal(InsuranceFormulas.claimratio(20, 100).value, 20)
  assert.equal(InsuranceFormulas.retained(100, 30).value, 70)
  assert.equal(InsuranceFormulas.coinsurance2(100, 80).value, 80)
  assert.equal(InsuranceFormulas.ceded(100, 40).value, 60)
  assert.equal(InsuranceFormulas.frequencyseverity(3, 4).value, 12)
  assert.equal(InsuranceFormulas.solvencymargin(100, 70).value, 30)
  assert.equal(InsuranceFormulas.claim(5000, 500).dst, 'law', 'coverage is decided by the policy and the court')
  assert.equal(hexFamiliesOf().get('insurance')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'insurance', program: ['indemnity'], params: [8000, 5000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `insurance.indemnity at ${uuid}`)
  uuidReceiptOf('insurance indemnity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; premium 2000, claim 4500, coinsurance 6000, indemnity 5000, lossratio 70%, reserve 20000, subrogation 8000, copay 800; crossing to law')
})
