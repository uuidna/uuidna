import { test } from 'node:test'
import assert from 'node:assert/strict'
import { planChange, renderPlan, commitChange } from './index.js'

const A = [{ key: 'a' }, { key: 'b' }, { key: 'c' }]

test('a plan says exactly what a change would do, and changes nothing', () => {
  const after = [{ key: 'a' }, { key: 'c', extra: 1 }, { key: 'd' }]
  const p = planChange(A, after)
  assert.deepEqual(p.added.map((r) => r.key), ['d'])
  assert.deepEqual(p.removed.map((r) => r.key), ['b'])
  assert.deepEqual(p.changed.map((c) => c.key), ['c'])
  assert.equal(p.kept, 1)
  assert.equal(A.length, 3, 'planning must not mutate the input — simulate touches nothing')
})

test('a lossy commit is REFUSED by default', () => {
  // The incident: a revert discarded 30 accepted claims and the ledger fell 2532 → 2502 with nothing reporting
  // it. A destructive change must be chosen, never defaulted into.
  const r = commitChange(A, [{ key: 'a' }])
  assert.equal(r.ok, false)
  assert.match(r.why, /REMOVES 2 record/)
  assert.match(r.why, /b, c/, 'and the removals are NAMED — a count is a thing a reader skims past')
})

test('and allowed when the removal is the point, with a reason', () => {
  const r = commitChange(A, [{ key: 'a' }], { allowRemovals: true, reason: 'duplicate propositions withdrawn' })
  assert.equal(r.ok, true)
  assert.match(r.why, /duplicate propositions withdrawn/, 'the reason is recorded in the result, not left implicit')
})

test('removals are rendered individually, never folded into a total', () => {
  const lines = renderPlan(planChange(A, [{ key: 'a' }]), 'claim')
  assert.ok(lines.some((l) => l.includes('REMOVING b')))
  assert.ok(lines.some((l) => l.includes('REMOVING c')))
  assert.ok(lines.some((l) => l.includes('DESTROYS 2 claim')))
})

test('a lossless change is lossless, and an empty one says so', () => {
  assert.equal(commitChange(A, [...A, { key: 'd' }]).ok, true, 'pure addition destroys nothing')
  assert.equal(planChange(A, A).lossless, true)
  assert.match(renderPlan(planChange(A, A), 'claim')[0]!, /nothing to do/)
})

test('the plan carries a receipt that moves with the plan', () => {
  const one = planChange(A, [{ key: 'a' }, { key: 'd' }])
  const same = planChange(A, [{ key: 'a' }, { key: 'd' }])
  const other = planChange(A, [{ key: 'a' }, { key: 'e' }])
  assert.equal(one.receipt, same.receipt, 'the same plan recomputes to the same receipt')
  assert.notEqual(one.receipt, other.receipt, 'a different plan must not share it')
})
