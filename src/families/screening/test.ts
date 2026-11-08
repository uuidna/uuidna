import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ScreeningFormulas } from './index.js'
import '../../mcp/families.js'

test('screening: sensitivity, specificity, ppv, npv, falsepositiverate, prevalenceadjusted, youdenindex, numbertoscreen — crossing to epidemiology', async (t) => {
  assert.equal(ScreeningFormulas.sensitivity(90, 10).value, 90, 'caught 90 of 100 sick')
  assert.equal(ScreeningFormulas.specificity(85, 15).value, 85)
  assert.equal(ScreeningFormulas.ppv(60, 40).value, 60, 'a positive is 60% likely true')
  assert.equal(ScreeningFormulas.npv(70, 30).value, 70)
  assert.equal(ScreeningFormulas.falsepositiverate(15, 85).value, 15)
  assert.equal(ScreeningFormulas.prevalenceadjusted(5, 1000).value, 500, 'cases per 100000')
  assert.equal(ScreeningFormulas.youdenindex(90, 85).value, 75, 'sens + spec − 100')
  assert.equal(ScreeningFormulas.numbertoscreen(1000, 10).value, 100, 'screen 100 to find one case')
  assert.equal(ScreeningFormulas.sensitivity(90, 10).dst, 'epidemiology')
  assert.equal(hexFamiliesOf().get('screening')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'screening', program: ['sensitivity'], params: [90, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `screening.sensitivity at ${uuid}`)
  uuidReceiptOf('screening sensitivity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; sensitivity 90, specificity 85, ppv 60, npv 70, falsepositiverate 15, prevalenceadjusted 500, youdenindex 75, numbertoscreen 100; crossing to epidemiology')
})
