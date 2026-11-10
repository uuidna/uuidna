import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AssessmentFormulas } from './index.js'
import '../../mcp/families.js'

test('assessment: score, percentile, gradecurve, passrate, weightedmean, rubricscore, masterylevel, improvement — crossing to pedagogy', async (t) => {
  assert.equal(AssessmentFormulas.score(45, 50).value, 90, 'forty-five of fifty correct')
  assert.equal(AssessmentFormulas.percentile(80, 100).value, 80)
  assert.equal(AssessmentFormulas.gradecurve(72, 8).value, 80, 'a raw grade lifted to eighty')
  assert.equal(AssessmentFormulas.passrate(18, 20).value, 90)
  assert.equal(AssessmentFormulas.weightedmean(350, 4).value, 87)
  assert.equal(AssessmentFormulas.rubricscore(5, 4).value, 20)
  assert.equal(AssessmentFormulas.masterylevel(7, 10).value, 70)
  assert.equal(AssessmentFormulas.improvement(85, 60).value, 25, 'a gain of twenty-five')
  assert.equal(AssessmentFormulas.improvement(50, 70).value, 0)
  assert.equal(AssessmentFormulas.score(45, 50).dst, 'pedagogy')
  assert.equal(hexFamiliesOf().get('assessment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'assessment', program: ['score'], params: [45, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `assessment.score at ${uuid}`)
  uuidReceiptOf('assessment score', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; score 90, percentile 80, gradecurve 80, passrate 90, weightedmean 87, rubricscore 20, masterylevel 70, improvement 25; crossing to pedagogy')
})
