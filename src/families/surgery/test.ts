import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SurgeryFormulas } from './index.js'
import '../../mcp/families.js'

test('surgery: duration, bloodloss, mortality, complication, recovery, margin, throughput, success — crossing to med', async (t) => {
  assert.equal(SurgeryFormulas.duration(60, 180).value, 120, 'two hours on the table')
  assert.equal(SurgeryFormulas.duration(180, 60).value, 0, 'never negative')
  assert.equal(SurgeryFormulas.bloodloss(450).value, 450)
  assert.equal(SurgeryFormulas.mortality(2, 100).value, 2)
  assert.equal(SurgeryFormulas.complication(15, 200).value, 7)
  assert.equal(SurgeryFormulas.recovery(90, 100).value, 90)
  assert.equal(SurgeryFormulas.margin(85, 100).value, 85)
  assert.equal(SurgeryFormulas.throughput(12, 8).value, 1, 'cases per hour')
  assert.equal(SurgeryFormulas.success(95, 100).value, 95)
  assert.equal(SurgeryFormulas.duration(60, 180).dst, 'med')
  assert.equal(hexFamiliesOf().get('surgery')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'surgery', program: ['recovery'], params: [90, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `surgery.recovery at ${uuid}`)
  uuidReceiptOf('surgery recovery', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; duration 120, bloodloss 450, mortality 2, complication 7, recovery 90, margin 85, throughput 1, success 95; crossing to med')
})
