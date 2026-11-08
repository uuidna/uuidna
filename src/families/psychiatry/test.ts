import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PsychiatryFormulas } from './index.js'
import '../../mcp/families.js'

test('psychiatry: phq, severity, remission, relapse, adherence, response, risk, wellbeing — crossing to med', async (t) => {
  assert.equal(PsychiatryFormulas.phq(21).value, 21, 'a PHQ-9 total')
  assert.equal(PsychiatryFormulas.severity(45, 100).value, 45)
  assert.equal(PsychiatryFormulas.remission(60, 200).value, 30, 'remission rate')
  assert.equal(PsychiatryFormulas.relapse(20, 100).value, 20)
  assert.equal(PsychiatryFormulas.adherence(27, 30).value, 90, 'medication adherence')
  assert.equal(PsychiatryFormulas.response(20, 5).value, 75, 'symptom reduction')
  assert.equal(PsychiatryFormulas.risk(3, 12).value, 25)
  assert.equal(PsychiatryFormulas.wellbeing(8, 3).value, 5)
  assert.equal(PsychiatryFormulas.wellbeing(3, 8).value, 0, 'never below zero')
  assert.equal(PsychiatryFormulas.phq(21).dst, 'med')
  assert.equal(hexFamiliesOf().get('psychiatry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'psychiatry', program: ['severity'], params: [45, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 45, `psychiatry.severity at ${uuid}`)
  uuidReceiptOf('psychiatry severity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; phq 21, severity 45, remission 30, relapse 20, adherence 90, response 75, risk 25, wellbeing 5; crossing to med')
})
