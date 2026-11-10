import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StaffingFormulas } from './index.js'
import '../../mcp/families.js'

test('staffing: headcount, coverage, shift, ratio, demand, allocation, overtime, vacancy — crossing to logistics', async (t) => {
  assert.equal(StaffingFormulas.headcount(50, 4).value, 200, 'fifty to a site, four sites')
  assert.equal(StaffingFormulas.coverage(90, 100).value, 90)
  assert.equal(StaffingFormulas.shift(100, 8).value, 13, 'thirteen shifts for the crew')
  assert.equal(StaffingFormulas.ratio(100, 10).value, 10, 'ten to a manager')
  assert.equal(StaffingFormulas.demand(6000, 60).value, 100, 'tasks per day')
  assert.equal(StaffingFormulas.allocation(10, 40).value, 400)
  assert.equal(StaffingFormulas.overtime(50, 40).value, 10)
  assert.equal(StaffingFormulas.overtime(30, 40).value, 0)
  assert.equal(StaffingFormulas.vacancy(100, 80).value, 20, 'twenty seats open')
  assert.equal(StaffingFormulas.vacancy(80, 100).value, 0)
  assert.equal(StaffingFormulas.headcount(50, 4).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('staffing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'staffing', program: ['shift'], params: [100, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 13, `staffing.shift at ${uuid}`)
  uuidReceiptOf('staffing shift', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; headcount 200, coverage 90, shift 13, ratio 10, demand 100, allocation 400, overtime 10, vacancy 20; crossing to logistics')
})
