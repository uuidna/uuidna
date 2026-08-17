// Reason tests — the in-house forward-chainer uses the sealed rules, is bounded, and is deterministic. It derives
// only what the rules entail, cites a sealed inference rule per step, and never loops forever. Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { reason } from '../index.js'

test('modus ponens and the chained syllogism, each citing a sealed rule', () => {
  const r = reason(['a'], [{ if: ['a'], then: 'b' }, { if: ['b'], then: 'c' }])
  assert.deepEqual(r.derived.sort(), ['b', 'c'])
  assert.ok(r.reachedFixpoint)
  assert.ok(r.trace.every((t) => /modus_ponens|hypothetical_syllogism/.test(t.rule)))
  assert.ok(r.trace.every((t) => t.cites.startsWith('/theorem/')))
})

test('an unmet premise never fires — it derives only what follows', () => {
  const r = reason(['a'], [{ if: ['x'], then: 'y' }])
  assert.deepEqual(r.derived, [])
})

test('deterministic — same facts and rules give the same receipt', () => {
  const a = reason(['p'], [{ if: ['p'], then: 'q' }])
  const b = reason(['p'], [{ if: ['p'], then: 'q' }])
  assert.equal(a.receipt, b.receipt)
  assert.match(a.receipt, /^[0-9a-f-]{36}$/)
})

test('bounded — a cyclic rule set settles at the round cap, never loops forever', () => {
  const r = reason(['a'], [{ if: ['a'], then: 'b' }, { if: ['b'], then: 'a' }])
  assert.ok(r.rounds <= 64, 'the round cap holds')
  assert.ok(r.derived.includes('b'))
})
