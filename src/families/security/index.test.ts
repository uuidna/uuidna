import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SecurityFormulas } from './index.js'
import '../../mcp/families.js'

test('security: severity, patch, mttr, exposure, strength, detection, window, coverage — crossing to access', async (t) => {
  assert.equal(SecurityFormulas.severity(90, 8).value, 72, 'base scaled by the temporal factor')
  assert.equal(SecurityFormulas.patch(40, 25).value, 15, 'unpatched vulnerabilities')
  assert.equal(SecurityFormulas.mttr(480, 12).value, 40)
  assert.equal(SecurityFormulas.exposure(100, 85).value, 15)
  assert.equal(SecurityFormulas.strength(16, 4).value, 64)
  assert.equal(SecurityFormulas.detection(95, 100).value, 95)
  assert.equal(SecurityFormulas.window(2460000, 2460030).value, 30, 'the exposure window in days')
  assert.equal(SecurityFormulas.coverage(180, 200).value, 90)
  assert.equal(SecurityFormulas.severity(90, 8).dst, 'access')
  assert.equal(hexFamiliesOf().get('security')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'security', program: ['severity'], params: [90, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 72, `security.severity at ${uuid}`)
  uuidReceiptOf('security severity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; severity 72, patch 15, mttr 40, exposure 15, strength 64, detection 95, window 30, coverage 90; crossing to access')
})
