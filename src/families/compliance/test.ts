import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ComplianceFormulas } from './index.js'
import '../../mcp/families.js'

test('compliance: penalty, control gap, deadline, reportable, risk, remediation, retention, coverage — crossing to law', async (t) => {
  assert.equal(ComplianceFormulas.penalty(1000000, 4).value, 40000, '4% of turnover')
  assert.equal(ComplianceFormulas.breach(7, 10).value, 3, 'three controls short')
  assert.equal(ComplianceFormulas.breach(12, 10).value, 0, 'fully controlled')
  assert.equal(ComplianceFormulas.deadline(2460000, 3).value, 2460003, 'a 72-hour report window')
  assert.equal(ComplianceFormulas.reportable(600, 500).value, 1, 'over the notification threshold')
  assert.equal(ComplianceFormulas.reportable(100, 500).value, 0)
  assert.equal(ComplianceFormulas.risk(4, 5).value, 20, 'likelihood times impact')
  assert.equal(ComplianceFormulas.remediation(3, 5000).value, 15000)
  assert.equal(ComplianceFormulas.retention(7, 5).value, 1, 'kept long enough')
  assert.equal(ComplianceFormulas.coverage(8, 10).value, 80, '80% control coverage')
  assert.equal(ComplianceFormulas.penalty(1000000, 4).dst, 'law')
  assert.equal(hexFamiliesOf().get('compliance')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'compliance', program: ['risk'], params: [4, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `compliance.risk at ${uuid}`)
  uuidReceiptOf('compliance risk', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; penalty 40000, breach 3, deadline +3, reportable 1, risk 20, remediation 15000, retention 1, coverage 80; crossing to law')
})
