import { test } from 'node:test'
import assert from 'node:assert/strict'
import { compareLedgers, ledgerDrain, ledgerDrainGaps } from './audit-ledger-drain.js'

// THE FINDER MUST FIRE, and it is checked on injected input because a check that only ever sees a healthy tree
// returns the same empty list as a check that does nothing — the two are identical by construction.
test('it names a theorem proved in Lean but absent from the served ledger', () => {
  const c = compareLedgers(['a', 'b', 'c'], ['a', 'b'])
  assert.deepEqual(c.undrained, ['c'])
  assert.deepEqual(c.unproved, [])
  assert.equal(c.agrees, false)
})

test('it names a key served by the ledger that no wing proves', () => {
  const c = compareLedgers(['a'], ['a', 'ghost'])
  assert.deepEqual(c.unproved, ['ghost'])
  assert.equal(c.agrees, false)
})

test('a RENAME that keeps the count steady is still caught — this is why it compares sets', () => {
  const c = compareLedgers(['a', 'b'], ['a', 'renamed'])
  assert.equal(c.inLean.length, c.inLedger.length, 'the counts agree, so a count check would pass here')
  assert.deepEqual(c.undrained, ['b'])
  assert.deepEqual(c.unproved, ['renamed'])
  assert.equal(c.agrees, false)
})

test('agreement is exact, and equal sets give equal receipts', () => {
  const a = compareLedgers(['x', 'y'], ['y', 'x'])
  assert.equal(a.agrees, true)
  assert.deepEqual(a.undrained, [])
  assert.equal(a.receipt, compareLedgers(['y', 'x'], ['x', 'y']).receipt, 'order must not change the receipt')
})

test('this tree agrees: every proved theorem is served, every served theorem proved', () => {
  const c = ledgerDrain()
  assert.ok(c.inLean.length > 2500, 'the walk must cover the ledger, not a sample')
  assert.deepEqual(c.undrained, [], 'proved and unserved is invisible work')
  assert.deepEqual(c.unproved, [], 'served with no proof is the one thing refused outright')
  assert.deepEqual(ledgerDrainGaps(), [])
})
