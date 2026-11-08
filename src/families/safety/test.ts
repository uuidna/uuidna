import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SafetyFormulas } from './index.js'
import '../../mcp/families.js'

test('safety: incidentrate, severity, risk, nearmiss, compliance, exposure, margin, training — crossing to construction', async (t) => {
  assert.equal(SafetyFormulas.incidentrate(3, 200000).value, 3, 'three incidents per 200,000 hours')
  assert.equal(SafetyFormulas.severity(40, 8).value, 5, 'five lost days per incident')
  assert.equal(SafetyFormulas.risk(4, 5).value, 20, 'probability times impact')
  assert.equal(SafetyFormulas.nearmiss(30, 3).value, 10, 'ten near-misses per incident')
  assert.equal(SafetyFormulas.compliance(95, 100).value, 95)
  assert.equal(SafetyFormulas.exposure(50, 8).value, 400)
  assert.equal(SafetyFormulas.margin(100, 70).value, 30, 'under the limit')
  assert.equal(SafetyFormulas.margin(70, 100).value, 0, 'over the limit, clamped')
  assert.equal(SafetyFormulas.training(80, 100).value, 80)
  assert.equal(SafetyFormulas.incidentrate(3, 200000).dst, 'construction')
  assert.equal(hexFamiliesOf().get('safety')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'safety', program: ['risk'], params: [4, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `safety.risk at ${uuid}`)
  uuidReceiptOf('safety risk', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; incidentrate 3, severity 5, risk 20, nearmiss 10, compliance 95, exposure 400, margin 30, training 80; crossing to construction')
})
