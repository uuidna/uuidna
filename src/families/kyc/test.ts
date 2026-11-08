import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { KycFormulas } from './index.js'
import '../../mcp/families.js'

// the KYC domain as the FATF Recommendations and AML/CFT regimes write it: completeness is the CDD record built on what
// identity verified, screening is the sanctions/PEP hit rate, risk is a rated score, aml flags a reportable transaction,
// diligence fires EDD over CDD when risk crosses a tier, ubo covers the beneficial owners, expiry counts down to the next
// periodic review, monitoring is the ongoing cadence. A measure, never a legal conclusion.
test('kyc: completeness, screening, risk, aml, diligence, ubo, expiry, monitoring — crossing to law', async (t) => {
  assert.equal(KycFormulas.completeness(18, 20).value, 90, 'eighteen of twenty CDD fields verified')
  assert.equal(KycFormulas.completeness(21, 20).holds, false, 'more verified than required is unlawful')
  assert.equal(KycFormulas.screening(3, 10000).value, 3, 'three sanctions/PEP hits per ten thousand checks, in basis points')
  assert.equal(KycFormulas.risk(7, 10).value, 70, 'seven of ten risk factors flagged = 70% rating')
  assert.equal(KycFormulas.aml(15000, 10000).value, 1, 'a transaction at or above the reporting threshold is reportable')
  assert.equal(KycFormulas.aml(5000, 10000).value, 0, 'below the threshold is not reportable')
  assert.equal(KycFormulas.diligence(80, 70).value, 1, 'risk at or above the tier demands enhanced diligence')
  assert.equal(KycFormulas.diligence(50, 70).value, 0, 'risk below the tier needs only standard diligence')
  assert.equal(KycFormulas.ubo(4, 5).value, 80, 'four of five beneficial owners identified')
  assert.equal(KycFormulas.expiry(365, 100).value, 265, 'two hundred sixty-five days to the next periodic review')
  assert.equal(KycFormulas.expiry(100, 365).value, 0, 'an overdue review floors at zero, never negative')
  assert.equal(KycFormulas.monitoring(12, 4).value, 3, 'twelve reviews over four periods = three per period')
  assert.equal(KycFormulas.completeness(18, 20).dst, 'law', 'kyc crosses into law — what the law requires before service')
  assert.equal(hexFamiliesOf().get('kyc')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'kyc', program: ['completeness'], params: [18, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `kyc.completeness at ${uuid}`)
  uuidReceiptOf('kyc completeness', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas (FATF/AML due diligence); completeness 90, screening 3bps, risk 70, aml 1/0, diligence 1/0, ubo 80, expiry 265/0, monitoring 3; crossing to law — a measure, never a legal conclusion')
})
