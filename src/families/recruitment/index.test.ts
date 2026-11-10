import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RecruitmentFormulas } from './index.js'
import '../../mcp/families.js'

test('recruitment: funnel, yield, timetofill, costperhire, offer, acceptance, sourcing, retention — crossing to sociology', async (t) => {
  assert.equal(RecruitmentFormulas.funnel(100, 3).value, 300, 'interviews across the funnel')
  assert.equal(RecruitmentFormulas.yield(50, 1000).value, 5)
  assert.equal(RecruitmentFormulas.timetofill(300, 10).value, 30, 'average days to fill')
  assert.equal(RecruitmentFormulas.costperhire(50000, 10).value, 5000)
  assert.equal(RecruitmentFormulas.offer(10, 90000).value, 900000, 'total offer value')
  assert.equal(RecruitmentFormulas.acceptance(45, 50).value, 90)
  assert.equal(RecruitmentFormulas.sourcing(100, 30).value, 4, 'four recruiters for the req load')
  assert.equal(RecruitmentFormulas.retention(90, 100).value, 90, 'retained a year on')
  assert.equal(RecruitmentFormulas.retention(50, 100).value, 50)
  assert.equal(RecruitmentFormulas.funnel(100, 3).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('recruitment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'recruitment', program: ['sourcing'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `recruitment.sourcing at ${uuid}`)
  uuidReceiptOf('recruitment sourcing', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; funnel 300, yield 5, timetofill 30, costperhire 5000, offer 900000, acceptance 90, sourcing 4, retention 90; crossing to sociology')
})
