import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AlertingFormulas } from './index.js'
import '../../mcp/families.js'

test('alerting: threshold, falsepositiverate, mttd, escalation, noiseratio, deduplication, severityscore, flappingindex — crossing to observability', async (t) => {
  assert.equal(AlertingFormulas.threshold(80, 70).value, 1, 'signal over the limit fires')
  assert.equal(AlertingFormulas.threshold(50, 70).value, 0)
  assert.equal(AlertingFormulas.falsepositiverate(30, 200).value, 15)
  assert.equal(AlertingFormulas.mttd(600, 20).value, 30, 'minutes to detect')
  assert.equal(AlertingFormulas.escalation(3, 5).value, 15)
  assert.equal(AlertingFormulas.noiseratio(40, 50).value, 80)
  assert.equal(AlertingFormulas.deduplication(1000, 150).value, 850, 'duplicates collapsed')
  assert.equal(AlertingFormulas.severityscore(4, 5).value, 20)
  assert.equal(AlertingFormulas.flappingindex(12, 60).value, 20)
  assert.equal(AlertingFormulas.threshold(80, 70).dst, 'observability')
  assert.equal(hexFamiliesOf().get('alerting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'alerting', program: ['mttd'], params: [600, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `alerting.mttd at ${uuid}`)
  uuidReceiptOf('alerting mttd', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; threshold 1, falsepositiverate 15, mttd 30, escalation 15, noiseratio 80, deduplication 850, severityscore 20, flappingindex 20; crossing to observability')
})
