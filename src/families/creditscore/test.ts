import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CreditscoreFormulas } from './index.js'
import '../../mcp/families.js'

test('creditscore: score, paymenthistory, utilization, riskbands, defaultprob, factorcombos, inquiries, tier — crossing to banking', async (t) => {
  assert.equal(CreditscoreFormulas.score(700, 50).value, 750)
  assert.equal(CreditscoreFormulas.paymenthistory(35, 100).value, 35)
  assert.equal(CreditscoreFormulas.utilization(30, 100).value, 30)
  assert.equal(CreditscoreFormulas.riskbands(5, 0).value, 5)
  assert.equal(CreditscoreFormulas.defaultprob(2, 100).value, 2)
  assert.equal(CreditscoreFormulas.factorcombos(5, 2).value, 10)
  assert.equal(CreditscoreFormulas.inquiries(10, 3).value, 7)
  assert.equal(CreditscoreFormulas.tier(750, 100).value, 7)
  assert.equal(CreditscoreFormulas.utilization2(30, 100).value, 30)
  assert.equal(CreditscoreFormulas.dti(40, 100).value, 40)
  assert.equal(CreditscoreFormulas.expectedloss(10, 50, 1000).value, 50)
  assert.equal(CreditscoreFormulas.exposureatdefault(100, 200, 50).value, 200)
  assert.equal(CreditscoreFormulas.delinquency(2, 10).value, 20)
  assert.equal(CreditscoreFormulas.recovery(1000, 40).value, 600)
  assert.equal(CreditscoreFormulas.band(720).value, 7)
  assert.equal(CreditscoreFormulas.score(700, 50).dst, 'banking')
  assert.equal(hexFamiliesOf().get('creditscore')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'creditscore', program: ['score'], params: [700, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 750, `creditscore.score at ${uuid}`)
  uuidReceiptOf('creditscore score', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; score 750, paymenthistory 35, utilization 30, riskbands 5, defaultprob 2, factorcombos 10, inquiries 7, tier 7; crossing to banking')
})
