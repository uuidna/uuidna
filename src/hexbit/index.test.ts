// hexbit-animator — the kernel's second layer held to the layer law: same states, same keyframes, same fold on
// any machine; one moved state moves the fold; the bars align with the recording by the sealed arithmetic; the
// off-lattice refuses; and the two layers of one identity really do share it.
import { test } from 'node:test'
import assert from 'node:assert'
import { animateStates, layersOf, BAR_MS, FRAMES_PER_BAR, SAMPLES_PER_FRAME } from '../quantum/apps/hexbit-animator.js'

test('the motion layer is deterministic and the fold moves with one state', () => {
  const a = animateStates([1, 2, 4, 8, 7, 5])
  const b = animateStates([1, 2, 4, 8, 7, 5])
  assert.deepEqual(a, b, 'same states, same animation, same fold')
  assert.notEqual(animateStates([1, 2, 4, 8, 7, 6]).fold, a.fold, 'one moved state moves the identity')
})

test('the bars align with the recording by the sealed arithmetic, not by code', () => {
  assert.equal(16 * BAR_MS, FRAMES_PER_BAR * SAMPLES_PER_FRAME, '4032 samples = 24 film slots of 168 — the seal, live')
  const a = animateStates([3, 6, 9 % 9])
  assert.equal(a.keyframes[1]!.atMs, BAR_MS + 40, 'the second bar starts after one bar and one breath')
  assert.equal(a.totalMs, 3 * BAR_MS + 2 * 40)
})

test('the two layers of one identity share it exactly', () => {
  const { animation, recording } = layersOf([1, 4, 2, 8, 5, 7])
  assert.equal(animation.states.length, 6)
  assert.equal(recording.states.length, 6)
  assert.deepEqual([...animation.states], [...recording.states], 'one uuid, two renderings, the same cause')
  assert.equal(animation.keyframes[0]!.hz, 432 * 2, 'the keyframe labels the tone the recording actually plays')
})

test('off-lattice refuses loudly, as the player does', () => {
  assert.throws(() => animateStates([16]), /outside the lattice/)
  assert.throws(() => animateStates([-1]), /outside the lattice/)
})
