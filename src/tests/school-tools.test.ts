// school-tools — the three coding-shelf instruments held to the hexbit-app law: deterministic, refusing loudly,
// and each able to fail (a tool that cannot fail teaches nothing).
import { test } from 'node:test'
import assert from 'node:assert'
import { testClaim } from '../quantum/apps/categories/coding/claim-tester.js'
import { start, applyStride, undo, unitSquaresToOne, UNITS_24, FRAME_RING } from '../quantum/apps/categories/coding/frame-editor.js'
import { build } from '../quantum/apps/categories/coding/state-builder.js'

test('the tester runs its controls first and all reject — then the subject gets a real verdict', () => {
  const r = testClaim('the round turns on seven, proven by theorem song_round_turns_on_seven')
  assert.equal(r.instrumentValid, true, 'every control must reject or the instrument is void')
  assert.equal(r.controls.length, 3)
  assert.ok(r.subject, 'a valid instrument must adjudicate the subject')
  assert.equal(r.subject!.verdict, 'VERIFIED', 'a real on-topic citation verifies')
})

test('the tester leaves an unproven claim honestly UNVERIFIED, and a recomputation verifies', () => {
  const bare = testClaim('this claim brings nothing')
  assert.equal(bare.subject!.verdict, 'UNVERIFIED')
  const paid = testClaim('the bar is 4032 samples', () => 16 * 252 === 4032)
  assert.equal(paid.subject!.verdict, 'VERIFIED', 'an exact predicate pays the second coin')
})

test('the editor: every unit squares to one, undo returns from any walk, and a non-unit refuses loudly', () => {
  for (const u of UNITS_24) assert.ok(unitSquaresToOne(u), `unit ${u} must be its own multiplicative inverse`)
  let s = start()
  for (const u of [5, 7, 23]) s = applyStride(s, u)
  const before = s.position
  s = undo(s)
  assert.equal((s.position + 23) % FRAME_RING, before, 'undo must exactly reverse the last stride')
  assert.throws(() => applyStride(start(), 6), /not a unit/, 'a move that cannot be undone is refused')
})

test('the builder reports door, multiplier and beats consistently with the seals it cites', () => {
  const c = build([1, 2, 4, 8, 7, 5])
  assert.equal(c.door, 1 % 6)
  assert.equal(c.multiplier, 3 ** (1 % 6) % 7)
  assert.deepEqual(c.beats, [432, 864, 1728, 432, 864], 'adjacent steps beat at 432·|Δ|')
  assert.equal(c.address, build([1, 2, 4, 8, 7, 5]).address, 'same states, same address')
  assert.notEqual(c.address, build([1, 2, 4, 8, 7, 6]).address, 'one moved state moves the address')
})
