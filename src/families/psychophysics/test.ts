import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PsychophysicsFormulas } from './index.js'
import '../../mcp/families.js'

test('psychophysics: weberfraction, jnd, thresholds, stevenspower, sensitivity, reactiontime, adaptation, magnitude — crossing to neuroscience', async (t) => {
  assert.equal(PsychophysicsFormulas.weberfraction(5, 100).value, 50, 'a five-percent Weber fraction, per mille')
  assert.equal(PsychophysicsFormulas.weberfraction(5, 0).value, 0)
  assert.equal(PsychophysicsFormulas.jnd(200, 50).value, 10)
  assert.equal(PsychophysicsFormulas.thresholds(75, 100).value, 75, 'percent correct at threshold')
  assert.equal(PsychophysicsFormulas.stevenspower(120, 50).value, 60)
  assert.equal(PsychophysicsFormulas.sensitivity(40, 10).value, 400)
  assert.equal(PsychophysicsFormulas.reactiontime(200, 600, 30).value, 220, 'base latency plus travel time')
  assert.equal(PsychophysicsFormulas.adaptation(100, 3, 10).value, 70)
  assert.equal(PsychophysicsFormulas.magnitude(25, 4).value, 100)
  assert.equal(PsychophysicsFormulas.weberfraction(5, 100).dst, 'neuroscience')
  assert.equal(hexFamiliesOf().get('psychophysics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'psychophysics', program: ['thresholds'], params: [75, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `psychophysics.thresholds at ${uuid}`)
  uuidReceiptOf('psychophysics thresholds', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; weberfraction 50, jnd 10, thresholds 75, stevenspower 60, sensitivity 400, reactiontime 220, adaptation 70, magnitude 100; crossing to neuroscience')
})
