import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PsychologyFormulas } from './index.js'
import '../../mcp/families.js'

test('psychology: iq, correlation, reliability, reaction, conditioning, recall, arousal, conformity — crossing to sociology', async (t) => {
  assert.equal(PsychologyFormulas.iq(12, 10).value, 120, 'mental ahead of chronological')
  assert.equal(PsychologyFormulas.correlation(80, 100).value, 80)
  assert.equal(PsychologyFormulas.reliability(90, 100).value, 90)
  assert.equal(PsychologyFormulas.reaction(5000, 20).value, 250, 'mean reaction time')
  assert.equal(PsychologyFormulas.conditioning(45, 50).value, 90)
  assert.equal(PsychologyFormulas.recall(7, 10).value, 70)
  assert.equal(PsychologyFormulas.arousal(80, 30).value, 50, 'above baseline')
  assert.equal(PsychologyFormulas.arousal(20, 30).value, 0, 'never below zero')
  assert.equal(PsychologyFormulas.conformity(6, 8).value, 75)
  assert.equal(PsychologyFormulas.iq(12, 10).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('psychology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'psychology', program: ['iq'], params: [12, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `psychology.iq at ${uuid}`)
  uuidReceiptOf('psychology iq', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; iq 120, correlation 80, reliability 90, reaction 250, conditioning 90, recall 70, arousal 50, conformity 75; crossing to sociology')
})
