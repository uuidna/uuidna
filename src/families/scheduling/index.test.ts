import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SchedulingFormulas } from './index.js'
import '../../mcp/families.js'

test('scheduling: criticalpath, duration, float, lateness, leadlag, makespan, slack, utilization — crossing to logistics', async (t) => {
  assert.equal(SchedulingFormulas.criticalpath(10, 25, 15).value, 25, 'the longest parallel leg')
  assert.equal(SchedulingFormulas.duration(100, 4).value, 25, 'work over a crew of four')
  assert.equal(SchedulingFormulas.float(50, 35).value, 15)
  assert.equal(SchedulingFormulas.lateness(45, 40).value, 5, 'five over the due date')
  assert.equal(SchedulingFormulas.lateness(30, 40).value, 0, 'early, no lateness')
  assert.equal(SchedulingFormulas.leadlag(20, 5).value, 25)
  assert.equal(SchedulingFormulas.makespan(100, 10).value, 90, 'first start to last finish')
  assert.equal(SchedulingFormulas.slack(40, 30).value, 10)
  assert.equal(SchedulingFormulas.utilization(30, 40).value, 75, 'percent busy')
  assert.equal(SchedulingFormulas.duration(100, 4).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('scheduling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'scheduling', program: ['duration'], params: [100, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `scheduling.duration at ${uuid}`)
  uuidReceiptOf('scheduling duration', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; criticalpath 25, duration 25, float 15, lateness 5, leadlag 25, makespan 90, slack 10, utilization 75; crossing to logistics')
})
