import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NursingFormulas } from './index.js'
import '../../mcp/families.js'

test('nursing: dosage, droprate, ratio, acuity, handwash, fluid, medication, workload — crossing to med', async (t) => {
  assert.equal(NursingFormulas.dosage(70, 5).value, 350, 'a weight-based dose')
  assert.equal(NursingFormulas.droprate(1000, 480).value, 2, 'drops over the minutes it runs')
  assert.equal(NursingFormulas.droprate(1000, 0).value, 0, 'no minutes, no rate')
  assert.equal(NursingFormulas.ratio(24, 6).value, 4, 'four patients per nurse')
  assert.equal(NursingFormulas.ratio(24, 0).value, 0)
  assert.equal(NursingFormulas.acuity(7).value, 7)
  assert.equal(NursingFormulas.handwash(90, 100).value, 90)
  assert.equal(NursingFormulas.handwash(5, 0).value, 0)
  assert.equal(NursingFormulas.fluid(2000, 1500).value, 500, 'positive fluid balance')
  assert.equal(NursingFormulas.fluid(1000, 1500).value, 0, 'never negative')
  assert.equal(NursingFormulas.medication(95, 100).value, 95)
  assert.equal(NursingFormulas.medication(5, 0).value, 0)
  assert.equal(NursingFormulas.workload(12, 8).value, 1, 'tasks per hour')
  assert.equal(NursingFormulas.workload(12, 0).value, 0)
  assert.equal(NursingFormulas.dosage(70, 5).dst, 'med')
  assert.equal(hexFamiliesOf().get('nursing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'nursing', program: ['ratio'], params: [24, 6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `nursing.ratio at ${uuid}`)
  uuidReceiptOf('nursing ratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dosage 350, droprate 2, ratio 4, acuity 7, handwash 90, fluid 500, medication 95, workload 1; crossing to med')
})
