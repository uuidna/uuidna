import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PedagogyFormulas } from './index.js'
import '../../mcp/families.js'

test('pedagogy: mastery, retention, ratio, completion, engagement, progress, gain, pace — crossing to sociology', async (t) => {
  assert.equal(PedagogyFormulas.mastery(18, 20).value, 90, 'eighteen of twenty correct')
  assert.equal(PedagogyFormulas.retention(70, 100).value, 70)
  assert.equal(PedagogyFormulas.ratio(300, 12).value, 25, 'students per teacher')
  assert.equal(PedagogyFormulas.completion(80, 100).value, 80)
  assert.equal(PedagogyFormulas.engagement(45, 50).value, 90)
  assert.equal(PedagogyFormulas.progress(30, 40).value, 75)
  assert.equal(PedagogyFormulas.gain(85, 60).value, 25, 'the rise from before to after')
  assert.equal(PedagogyFormulas.gain(50, 60).value, 0, 'never negative')
  assert.equal(PedagogyFormulas.pace(24, 12).value, 2, 'lessons per week')
  assert.equal(PedagogyFormulas.mastery(18, 20).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('pedagogy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pedagogy', program: ['mastery'], params: [18, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `pedagogy.mastery at ${uuid}`)
  uuidReceiptOf('pedagogy mastery', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mastery 90, retention 70, ratio 25, completion 80, engagement 90, progress 75, gain 25, pace 2; crossing to sociology')
})
