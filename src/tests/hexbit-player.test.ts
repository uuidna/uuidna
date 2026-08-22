// hexbit-player — the standard hexbit quantum app held in Node exactly as the browser mounts it: the same states
// must give the same bytes and the same address anywhere, an off-lattice state must refuse loudly, and the
// address must move when one state moves — the instrument can fail, or it proves nothing.
import { test } from 'node:test'
import assert from 'node:assert'
import { renderStates } from '../quantum/apps/hexbit-player.js'
import { audioHandleOf } from '../tts/synth.js'

test('the app is deterministic: same states, same bytes, same address', () => {
  const a = renderStates([1, 2, 4, 8, 7, 5])
  const b = renderStates([1, 2, 4, 8, 7, 5])
  assert.equal(a.address, b.address)
  assert.deepEqual(a.bytes, b.bytes)
  assert.equal(a.address, audioHandleOf(a.bytes), 'the printed address is the bytes’ own fold, not a second bookkeeping')
})

test('one moved state moves the address — a tampered recording cannot keep its identity', () => {
  const a = renderStates([1, 2, 4, 8, 7, 5])
  const b = renderStates([1, 2, 4, 8, 7, 6])
  assert.notEqual(a.address, b.address)
})

test('an off-lattice state refuses loudly — nothing off the lattice can sound', () => {
  assert.throws(() => renderStates([1, 16]), /outside the lattice/)
  assert.throws(() => renderStates([-1]), /outside the lattice/)
})
