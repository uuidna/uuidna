import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MotionFormulas } from './index.js'
import '../../mcp/families.js'

test('motion: duration, frames, fps, delay, stagger, total, progress, easing — crossing to css', async (t) => {
  assert.equal(MotionFormulas.duration(0).value, 75, 'the first step of the scale')
  assert.equal(MotionFormulas.duration(7).value, 1000)
  assert.equal(MotionFormulas.duration(8).value, 0, 'off the scale')
  assert.equal(MotionFormulas.frames(1000, 60).value, 60, 'a second at 60fps')
  assert.equal(MotionFormulas.fps(120, 2).value, 60)
  assert.equal(MotionFormulas.delay(4).value, 300)
  assert.equal(MotionFormulas.stagger(5, 50).value, 250)
  assert.equal(MotionFormulas.total(300, 150).value, 450)
  assert.equal(MotionFormulas.progress(150, 300).value, 50, 'halfway')
  assert.equal(MotionFormulas.easing(12).value, 12)
  assert.equal(MotionFormulas.duration(0).dst, 'css')
  assert.equal(hexFamiliesOf().get('motion')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'motion', program: ['frames'], params: [1000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `motion.frames at ${uuid}`)
  uuidReceiptOf('motion frames', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; duration 75/1000/0, frames 60, fps 60, delay 300, stagger 250, total 450, progress 50, easing 12; crossing to css')
})
