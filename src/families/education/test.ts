import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EducationFormulas } from './index.js'
import '../../mcp/families.js'

test('education: grade, gpa, attendance, pass, ratio, completion, credits, cost — crossing to cross', async (t) => {
  assert.equal(EducationFormulas.grade(85, 100).value, 85)
  assert.equal(EducationFormulas.gpa(48, 12).value, 4, 'four grade points per credit')
  assert.equal(EducationFormulas.attendance(90, 100).value, 90)
  assert.equal(EducationFormulas.pass(45, 50).value, 90, 'pass rate')
  assert.equal(EducationFormulas.ratio(300, 20).value, 15, 'students per teacher')
  assert.equal(EducationFormulas.completion(80, 100).value, 80)
  assert.equal(EducationFormulas.credits(5, 3).value, 15)
  assert.equal(EducationFormulas.cost(15, 200).value, 3000)
  assert.equal(EducationFormulas.grade(85, 100).dst, 'cross')
  assert.equal(hexFamiliesOf().get('education')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'education', program: ['grade'], params: [85, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 85, `education.grade at ${uuid}`)
  uuidReceiptOf('education grade', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; grade 85, gpa 4, attendance 90, pass 90, ratio 15, completion 80, credits 15, cost 3000; crossing to cross')
})
