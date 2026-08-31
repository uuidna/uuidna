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

// ── CONTRADICTION: the thing a monotone reasoner cannot do for itself ────────────────────────────────────────
// Forward chaining only ever ADDS atoms. Give it rules that license both `x` and "not_x" and it concludes both,
// then reports a clean trace over an inconsistent set — after which every later rule fires and every conclusion
// looks equally earned. The engine holds no policy for choosing a side, so it names the pair rather than picking.
test('a contradiction is NAMED, and consistency drops with it', () => {
  const r = reason(['storm'], [
    { if: ['storm'], then: 'sail' },
    { if: ['storm'], then: 'not_sail' },
  ])
  assert.equal(r.consistent, false, 'both an atom and its negation were concluded')
  assert.deepEqual(r.contradictions, [{ atom: 'sail', negation: 'not_sail' }])
  assert.ok(r.derived.includes('sail') && r.derived.includes('not_sail'),
    'both are still reported — a monotone reasoner cannot retract, and hiding one would be the lie')
})

test('the ¬ spelling is caught too, since this tree writes both', () => {
  const r = reason(['a'], [{ if: ['a'], then: 'b' }, { if: ['a'], then: '¬b' }])
  assert.equal(r.consistent, false)
  assert.deepEqual(r.contradictions, [{ atom: 'b', negation: '¬b' }])
})

test('CONTROL — an ordinary derivation stays consistent, so the flag means something', () => {
  const r = reason(['hull-closed'], [{ if: ['hull-closed'], then: 'skipped-is-zero' }])
  assert.equal(r.consistent, true)
  assert.deepEqual(r.contradictions, [])
})

test('CONTROL — an unrelated not_ atom is not a contradiction; only a PAIR is', () => {
  // "not_rain" alone denies nothing that is also known: absence of `rain` is not its presence.
  const r = reason(['clear'], [{ if: ['clear'], then: 'not_rain' }])
  assert.equal(r.consistent, true, 'a negation without its atom is just another fact')
  assert.deepEqual(r.contradictions, [])
})

test('the contradiction rides the receipt — a derivation cannot be altered to look consistent', () => {
  const bad = reason(['s'], [{ if: ['s'], then: 'x' }, { if: ['s'], then: 'not_x' }])
  const good = reason(['s'], [{ if: ['s'], then: 'x' }, { if: ['s'], then: 'not_y' }])
  assert.notEqual(bad.receipt, good.receipt, 'the folded receipt must record that the pair was held')
})
