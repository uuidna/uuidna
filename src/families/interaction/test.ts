import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InteractionFormulas } from './index.js'
import '../../mcp/families.js'

test('interaction: fitts, responsetime, clicks, gestures, feedback, affordance, flow, targetsize — crossing to layout', async (t) => {
  assert.equal(InteractionFormulas.fitts(500, 10).value, 5000, 'index of difficulty proxy')
  assert.equal(InteractionFormulas.responsetime(200).value, 200)
  assert.equal(InteractionFormulas.clicks(10, 2).value, 5, 'clicks per goal')
  assert.equal(InteractionFormulas.gestures(7).value, 7)
  assert.equal(InteractionFormulas.feedback(300, 100).value, 200, 'lag past the threshold')
  assert.equal(InteractionFormulas.affordance(8, 10).value, 80)
  assert.equal(InteractionFormulas.flow(90, 10).value, 90, 'completion flow percentage')
  assert.equal(InteractionFormulas.targetsize(44).value, 44)
  assert.equal(InteractionFormulas.fitts(500, 10).dst, 'layout')
  assert.equal(hexFamiliesOf().get('interaction')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'interaction', program: ['fitts'], params: [500, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `interaction.fitts at ${uuid}`)
  uuidReceiptOf('interaction fitts', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fitts 5000, responsetime 200, clicks 5, gestures 7, feedback 200, affordance 80, flow 90, targetsize 44; crossing to layout')
})
