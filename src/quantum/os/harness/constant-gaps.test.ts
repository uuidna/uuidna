// constant-gaps — THE FINDER THAT MUST BE ABLE TO FAIL.
//
// constantGaps flags a literal whose own trailing comment states the arithmetic producing it. A finder is only
// worth its runtime if it can distinguish; these tests give it both directions, because the first two versions
// of this finder each passed a naive smoke check while being wrong: one matched its own docstring's worked
// example, and one blanked /* */ regions so clumsily that a regex containing the comment bytes swallowed real
// code and LOST a genuine finding. Both failures looked like "0 gaps" — the same output a clean tree gives.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { constantGaps } from '../../../scripts/one-receipt.js'

test('the tree is clean — every prose derivation has been swept onto an expression', () => {
  const gaps = constantGaps()
  assert.deepEqual(gaps.map((g) => g.what), [], 'a literal is carrying its derivation in a comment again')
})

test('the swept constants still hold their exact values — a sweep must not move a number', async () => {
  const m = await import('../../apps/hexbit-animator.js')
  assert.equal(m.BAR_MS, 252, '9 * 7 * 4')
  assert.equal(m.SAMPLES_PER_FRAME, 168, '24 * 7')
  assert.equal(m.FRAMES_PER_BAR, 24)
  // the relation the comments assert, now checkable rather than merely written
  assert.equal(m.FRAMES_PER_BAR * m.SAMPLES_PER_FRAME, 4032, 'the film ring inside every bar')
})

test('CONTROL — a derivation the code ALREADY computes must NOT be flagged', async () => {
  const { HANDLE_SPAN } = await import('../../../hexbit/index.js')
  // hexbit/index.ts writes `HEXBIT_STATES ** HANDLE_HEXBITS`: the comment states arithmetic and the code computes
  // it. That is the CURED shape, and a finder that flagged it would be demanding the impossible of a correct
  // line. Its absence from the gap list is what makes the four real findings meaningful.
  assert.equal(HANDLE_SPAN, 4294967296, 'HEXBIT_STATES ** HANDLE_HEXBITS')
  const flagged = constantGaps().some((g) => g.what.includes('hexbit/index.ts'))
  assert.equal(flagged, false, 'a line that already derives must never be reported')
})
