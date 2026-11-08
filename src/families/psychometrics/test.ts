import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PsychometricsFormulas } from './index.js'
import '../../mcp/families.js'

test('psychometrics: reliability, validity, standardscore, percentile, itemdifficulty, discrimination, cronbach, normalization — crossing to psychology', async (t) => {
  assert.equal(PsychometricsFormulas.reliability(85, 100).value, 85)
  assert.equal(PsychometricsFormulas.validity(75, 100).value, 75)
  assert.equal(PsychometricsFormulas.standardscore(130, 100, 15).value, 200, 'two SD above the mean')
  assert.equal(PsychometricsFormulas.standardscore(90, 100, 15).value, 0, 'below the mean floors at 0')
  assert.equal(PsychometricsFormulas.percentile(84, 100).value, 84)
  assert.equal(PsychometricsFormulas.itemdifficulty(60, 80).value, 75)
  assert.equal(PsychometricsFormulas.discrimination(18, 6, 20).value, 60, 'upper separates from lower')
  assert.equal(PsychometricsFormulas.cronbach(10, 20, 100).value, 88, "Cronbach's alpha")
  assert.equal(PsychometricsFormulas.normalization(40, 50, 100).value, 80)
  assert.equal(PsychometricsFormulas.reliability(85, 100).dst, 'psychology')
  assert.equal(hexFamiliesOf().get('psychometrics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'psychometrics', program: ['standardscore'], params: [130, 100, 15] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `psychometrics.standardscore at ${uuid}`)
  uuidReceiptOf('psychometrics standardscore', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; reliability 85, validity 75, standardscore 200, percentile 84, itemdifficulty 75, discrimination 60, cronbach 88, normalization 80; crossing to psychology')
})
