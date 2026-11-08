import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AnimationFormulas } from './index.js'
import '../../mcp/families.js'

test('animation: cel, duration, easing, frames, keyframes, onionskin, playback, tweening — crossing to media', async (t) => {
  assert.equal(AnimationFormulas.cel(5, 12).value, 60, 'cels across layers')
  assert.equal(AnimationFormulas.duration(48, 24).value, 2000, 'two seconds in milliseconds')
  assert.equal(AnimationFormulas.easing(50, 200).value, 25)
  assert.equal(AnimationFormulas.frames(24, 30).value, 720, 'a 24-second shot at 30 fps')
  assert.equal(AnimationFormulas.keyframes(100, 12).value, 9, 'nine keyframes along the timeline')
  assert.equal(AnimationFormulas.onionskin(2, 2).value, 5)
  assert.equal(AnimationFormulas.playback(720, 24).value, 30, 'thirty seconds of playback')
  assert.equal(AnimationFormulas.tweening(0, 100, 5).value, 20)
  assert.equal(AnimationFormulas.cel(5, 12).dst, 'media')
  assert.equal(hexFamiliesOf().get('animation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'animation', program: ['frames'], params: [24, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 720, `animation.frames at ${uuid}`)
  uuidReceiptOf('animation frames', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cel 60, duration 2000, easing 25, frames 720, keyframes 9, onionskin 5, playback 30, tweening 20; crossing to media')
})
