// Reason tests — the in-house forward-chainer uses the sealed rules, is bounded, and is deterministic. It derives
// only what the rules entail, cites a sealed inference rule per step, and never loops forever. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { reason } from './index.js'

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

test('a rule may cite a more specific sealed license than the default ponens', () => {
  const r = reason(['hull-closed'], [{ if: ['hull-closed'], then: 'skipped-is-zero', cites: 'solutions_not_skipped' }])
  assert.deepEqual(r.derived, ['skipped-is-zero'])
  assert.equal(r.trace[0]!.rule, 'solutions_not_skipped')
  assert.equal(r.trace[0]!.cites, '/theorem/solutions_not_skipped')
})

test('reasoning proves the point uninterrupted — it is not an order to act', () => {
  const r = reason(['p'], [{ if: ['p'], then: 'q' }])
  assert.match(r.honest, /uninterrupted proof of a point/i)
  assert.match(r.honest, /does not tell anyone what to do/)
  assert.match(r.honest, /court_theorem_beats_assertion/)
  assert.match(r.honest, /court_loser_develops_the_proven/)
})

test('bounded — a cyclic rule set settles at the round cap', () => {
  const r = reason(['a'], [{ if: ['a'], then: 'b' }, { if: ['b'], then: 'a' }])
  assert.ok(r.rounds <= 64, 'the round cap holds')
  assert.ok(r.derived.includes('b'))
})
