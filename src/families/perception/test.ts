import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PerceptionFormulas } from './index.js'
import '../../mcp/families.js'

test('perception: threshold, weber, acuity, contrast, adaptation, sensitivity, illusion, latency — crossing to neuroscience', async (t) => {
  assert.equal(PerceptionFormulas.threshold(45, 100).value, 45, 'detected in just under half the trials')
  assert.equal(PerceptionFormulas.weber(2, 100).value, 2, 'a 2% just-noticeable difference')
  assert.equal(PerceptionFormulas.acuity(600, 10).value, 60)
  assert.equal(PerceptionFormulas.contrast(800, 100).value, 800)
  assert.equal(PerceptionFormulas.adaptation(100, 30).value, 70, 'response faded by 70')
  assert.equal(PerceptionFormulas.sensitivity(90, 100).value, 90)
  assert.equal(PerceptionFormulas.illusion(120, 100).value, 120, 'perceived 20% larger than actual')
  assert.equal(PerceptionFormulas.latency(250).value, 250, 'a quarter-second reaction')
  assert.equal(PerceptionFormulas.threshold(45, 100).dst, 'neuroscience')
  assert.equal(hexFamiliesOf().get('perception')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'perception', program: ['acuity'], params: [600, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `perception.acuity at ${uuid}`)
  uuidReceiptOf('perception acuity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; threshold 45, weber 2, acuity 60, contrast 800, adaptation 70, sensitivity 90, illusion 120, latency 250; crossing to neuroscience')
})
