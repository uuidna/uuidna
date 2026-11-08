import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { verifyHex } from '../verify.js'
import { AuditingFormulas } from './index.js'
import '../../mcp/families.js'

test('auditing: materiality, samplesize, errorrate, coverage, findings, variance, risk, compliance — crossing to accounting', async (t) => {
  assert.equal(AuditingFormulas.materiality(5, 1000).value, 0, 'threshold a half-percent of the total')
  assert.equal(AuditingFormulas.samplesize(1000, 20).value, 50, 'fifty items to sample')
  assert.equal(AuditingFormulas.errorrate(3, 50).value, 6)
  assert.equal(AuditingFormulas.coverage(80, 100).value, 80)
  assert.equal(AuditingFormulas.findings(2, 40).value, 5)
  assert.equal(AuditingFormulas.variance(110, 100).value, 110)
  assert.equal(AuditingFormulas.risk(3, 4).value, 12, 'likelihood times impact')
  assert.equal(AuditingFormulas.compliance(95, 100).value, 95)
  assert.equal(AuditingFormulas.materiality(5, 1000).dst, 'accounting')
  await verifyHex('auditing', 8, [
    ['materiality', [5, 1000], 0],
    ['samplesize', [1000, 20], 50],
    ['errorrate', [3, 50], 6],
    ['coverage', [80, 100], 80],
    ['findings', [2, 40], 5],
    ['variance', [110, 100], 110],
    ['risk', [3, 4], 12],
    ['compliance', [95, 100], 95],
  ])
  t.diagnostic('8 formulas; materiality 0, samplesize 50, errorrate 6, coverage 80, findings 5, variance 110, risk 12, compliance 95; crossing to accounting')
})
