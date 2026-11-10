import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CurriculumFormulas } from './index.js'
import '../../mcp/families.js'

test('curriculum: credithours, coursecount, contacthours, coverage, prerequisitedepth, pacing, workload, alignment — crossing to pedagogy', async (t) => {
  assert.equal(CurriculumFormulas.credithours(40, 3).value, 120, 'a degree of credit hours')
  assert.equal(CurriculumFormulas.coursecount(120, 3).value, 40, 'the courses that many credits buys')
  assert.equal(CurriculumFormulas.contacthours(15, 3).value, 45, 'a term of contact hours')
  assert.equal(CurriculumFormulas.coverage(45, 50).value, 90)
  assert.equal(CurriculumFormulas.prerequisitedepth(10, 3).value, 4, 'four levels of prerequisites')
  assert.equal(CurriculumFormulas.pacing(30, 15).value, 2, 'topics per week')
  assert.equal(CurriculumFormulas.workload(12, 5).value, 60)
  assert.equal(CurriculumFormulas.alignment(90, 80).value, 1, 'outcomes aligned')
  assert.equal(CurriculumFormulas.alignment(70, 80).value, 0)
  assert.equal(CurriculumFormulas.credithours(40, 3).dst, 'pedagogy')
  assert.equal(hexFamiliesOf().get('curriculum')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'curriculum', program: ['prerequisitedepth'], params: [10, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `curriculum.prerequisitedepth at ${uuid}`)
  uuidReceiptOf('curriculum prerequisitedepth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; credithours 120, coursecount 40, contacthours 45, coverage 90, prerequisitedepth 4, pacing 2, workload 60, alignment 1; crossing to pedagogy')
})
