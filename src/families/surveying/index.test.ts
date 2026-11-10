import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SurveyingFormulas } from './index.js'
import '../../mcp/families.js'

test('surveying: bearing, traverse, elevation, grade, area, contour, offset, closure — crossing to civil', async (t) => {
  assert.equal(SurveyingFormulas.bearing(100, 90).value, 190, 'forward bearing wrapped to the circle')
  assert.equal(SurveyingFormulas.traverse(10, 66).value, 660, 'ten chains of sixty-six feet')
  assert.equal(SurveyingFormulas.elevation(100, 5, 3).value, 102, 'bench plus backsight less foresight')
  assert.equal(SurveyingFormulas.grade(5, 100).value, 5, 'a five percent grade')
  assert.equal(SurveyingFormulas.area(40, 30).value, 600, 'half base times height')
  assert.equal(SurveyingFormulas.contour(100, 40, 20).value, 3, 'contour lines the cut crosses')
  assert.equal(SurveyingFormulas.offset(1000, 100).value, 10, 'offset stakes along the line')
  assert.equal(SurveyingFormulas.closure(5000, 1).value, 5000, 'closure precision 1:5000')
  assert.equal(SurveyingFormulas.closure(5000, 0).value, 0, 'no misclosure, guarded division')
  assert.equal(SurveyingFormulas.bearing(100, 90).dst, 'civil')
  assert.equal(hexFamiliesOf().get('surveying')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'surveying', program: ['bearing'], params: [100, 90] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 190, `surveying.bearing at ${uuid}`)
  uuidReceiptOf('surveying bearing', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bearing 190, traverse 660, elevation 102, grade 5, area 600, contour 3, offset 10, closure 5000; crossing to civil')
})
