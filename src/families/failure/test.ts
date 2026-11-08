import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FailureFormulas } from './index.js'
import '../../mcp/families.js'

test('failure: rpn, severity, occurrence, detection, criticality, modecount, rootcauses, escaperate — crossing to quality', async (t) => {
  assert.equal(FailureFormulas.rpn(8, 5, 4).value, 160, 'the FMEA risk priority number')
  assert.equal(FailureFormulas.severity(7, 3).value, 21)
  assert.equal(FailureFormulas.occurrence(50, 1000).value, 5, 'five percent of runs fail')
  assert.equal(FailureFormulas.detection(80, 100).value, 80)
  assert.equal(FailureFormulas.criticality(8, 5).value, 40)
  assert.equal(FailureFormulas.modecount(12, 4).value, 48, 'modes across the system')
  assert.equal(FailureFormulas.rootcauses(10, 3).value, 30)
  assert.equal(FailureFormulas.escaperate(1000, 950).value, 5, 'five percent escape')
  assert.equal(FailureFormulas.escaperate(1000, 1100).value, 0)
  assert.equal(FailureFormulas.rpn(8, 5, 4).dst, 'quality')
  assert.equal(hexFamiliesOf().get('failure')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'failure', program: ['rpn'], params: [8, 5, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 160, `failure.rpn at ${uuid}`)
  uuidReceiptOf('failure rpn', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rpn 160, severity 21, occurrence 5, detection 80, criticality 40, modecount 48, rootcauses 30, escaperate 5; crossing to quality')
})
