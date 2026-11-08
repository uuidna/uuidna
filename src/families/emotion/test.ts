import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EmotionFormulas } from './index.js'
import '../../mcp/families.js'

test('emotion: valence, arousal, regulation, empathy, stress, recovery, contagion, intensity — crossing to med', async (t) => {
  assert.equal(EmotionFormulas.valence(70, 30).value, 40, 'positive over negative')
  assert.equal(EmotionFormulas.valence(30, 70).value, -40, 'valence may be negative')
  assert.equal(EmotionFormulas.arousal(80, 20).value, 60)
  assert.equal(EmotionFormulas.arousal(10, 20).value, 0, 'never below baseline')
  assert.equal(EmotionFormulas.regulation(3, 4).value, 75)
  assert.equal(EmotionFormulas.empathy(4, 5).value, 80)
  assert.equal(EmotionFormulas.stress(150, 100).value, 150)
  assert.equal(EmotionFormulas.recovery(20, 80).value, 60)
  assert.equal(EmotionFormulas.contagion(3, 12).value, 25)
  assert.equal(EmotionFormulas.intensity(100, 4).value, 25)
  assert.equal(EmotionFormulas.valence(70, 30).dst, 'med')
  assert.equal(hexFamiliesOf().get('emotion')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'emotion', program: ['regulation'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `emotion.regulation at ${uuid}`)
  uuidReceiptOf('emotion regulation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; valence 40/−40, arousal 60, regulation 75, empathy 80, stress 150, recovery 60, contagion 25, intensity 25; crossing to med')
})
