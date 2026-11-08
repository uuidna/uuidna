import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CourtFormulas } from './index.js'
import '../../mcp/families.js'

/** The court arithmetic a firm or a bench runs on a matter, jurisdiction-agnostic and exact — and a lead until reviewed:
 *  it crosses to law, whose reviewed-gate is the only thing that turns a computation into advice. */
test('court: standard of proof, damages, interest, costs, apportionment, settlement, cap, fee — exact, a lead until reviewed', async (t) => {
  assert.equal(CourtFormulas.standard(60, 51).value, 1, 'balance of probabilities met')
  assert.equal(CourtFormulas.standard(85, 90).value, 0, 'beyond reasonable doubt not met at 85%')
  assert.equal(CourtFormulas.damages(1000, 5, 3).value, 1150, '1000 + 5%·3y = 1150')
  assert.equal(CourtFormulas.interest(10000, 8, 365).value, 800, '8% of 10000 for a year')
  assert.equal(CourtFormulas.costs(10, 250).value, 2500, '10 hours at 250')
  assert.equal(CourtFormulas.apportion(3000, 2, 3).value, 2000, "two thirds of the defendant's award")
  assert.equal(CourtFormulas.apportion(3000, 4, 3).holds, false, 'fault cannot exceed total')
  assert.equal(CourtFormulas.settlement(100000, 30).value, 30000, 'expected value at 30% success')
  assert.equal(CourtFormulas.cap(500000, 250000).value, 250000, 'the statutory cap applies')
  assert.equal(CourtFormulas.cap(100000, 250000).value, 100000, 'under the cap, the award stands')
  assert.equal(CourtFormulas.fee(100000, 33).value, 33000, 'a 33% contingency fee')
  // the added instances, across legal domains — each exact, jurisdiction-agnostic, a lead until reviewed
  assert.equal(CourtFormulas.restitution(10000, 120, 500).value, 12500, 'harm at a 120% restitution multiplier plus 500 fixed')
  assert.equal(CourtFormulas.restitution(1000, 250, 0).holds, false, 'a restitution multiplier over 200% is not lawful input')
  assert.equal(CourtFormulas.penalty(1000, 365, 10).value, 1100, 'a 10%/yr escalation on 1000 over a year')
  assert.equal(CourtFormulas.possession(20, 21).value, 0, '20 years does not meet a 21-year adverse-possession period')
  assert.equal(CourtFormulas.possession(21, 21).value, 1, 'the statutory period is met')
  assert.equal(CourtFormulas.distribution(100000, 3, 10).value, 30000, 'a pro-rata bankruptcy distribution')
  assert.equal(CourtFormulas.distribution(100000, 11, 10).holds, false, 'a claim cannot exceed the class total')
  assert.equal(CourtFormulas.liquidated(500, 1000).value, 1, 'a clause at or under actual harm is a reasonable estimate')
  assert.equal(CourtFormulas.liquidated(2000, 1000).value, 0, 'a clause over actual harm is an unenforceable penalty')
  assert.equal(CourtFormulas.barred(400, 365).value, 1, 'a claim 400 days after accrual is time-barred at a 1-year limit')
  assert.equal(CourtFormulas.barred(200, 365).value, 0, 'within the limitation period')
  assert.equal(CourtFormulas.compliant(2, 3).value, 1, 'a breach notified within a 3-day (GDPR 72h) deadline')
  assert.equal(CourtFormulas.compliant(5, 3).value, 0, 'past the regulatory deadline')
  // it is a measure crossed to law, not advice: the src is court, the dst is law's advice gate
  assert.equal(CourtFormulas.damages(1000, 5, 3).src, 'court')
  assert.equal(CourtFormulas.restitution(10000, 120, 500).dst, 'law')
  // registered and runs at its hex address
  assert.equal(hexFamiliesOf().get('court')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'court', program: ['restitution'], params: [10000, 120, 500] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12500, `court.restitution at ${uuid}`)
  uuidReceiptOf('court restitution', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas across legal instances, jurisdiction-agnostic; restitution 12500, penalty 1100, possession 0/1, distribution 30000, liquidated 1/0, barred 1/0, compliant 1/0; a lead crossing to law until reviewed')
})
