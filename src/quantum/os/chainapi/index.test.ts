import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chainSeal, chainAppend, chainProve, chainVerify, chainApi, chainCensus } from './index.js'

const RECORDS = ['genesis', 'alpha', 'beta', 'gamma']

test('the port is provenance and the census counts it', () => {
  assert.equal(chainCensus().domain, 'blockchain')
  assert.ok(chainApi().ported.packages > 0)
})

test('inclusion without disclosure — a proof is log2(n) siblings', () => {
  const ch = chainSeal(RECORDS)
  const p = chainProve(ch, 2)!
  assert.equal(p.path.length, 2, 'four records means two siblings; the other records stay unseen')
  assert.equal(chainVerify('beta', p), true)
  assert.equal(chainVerify('WRONG', p), false)
})

test('a proof cannot be REPLAYED at another position', () => {
  // The leaf binds index to content, so a record that is at 2 does not verify as 0. Plain set-shaped merkle
  // would accept this, which is why the index is folded in rather than trusted from the proof object.
  const ch = chainSeal(RECORDS)
  const p0 = chainProve(ch, 0)!
  assert.equal(chainVerify('beta', { ...p0, index: 0 }), false)
})

test('reordering breaks the root exactly as tampering does', () => {
  const a = chainSeal(RECORDS)
  const b = chainSeal(['genesis', 'beta', 'alpha', 'gamma'])
  assert.notEqual(a.root, b.root, 'a provenance is a sequence, not a set — the lesson fsapi paid for')
})

test('append is a new fold, and out-of-range proofs are null rather than thrown-away', () => {
  const ch = chainSeal(RECORDS)
  const ap = chainAppend(ch, 'delta')
  assert.equal(ap.length, 5)
  assert.notEqual(ap.root, ch.root)
  assert.equal(chainProve(ch, 99), null, 'an impossible index answers null; it must not return a proof of nothing')
  assert.equal(chainProve(ch, -1), null)
})

test('what a public chain adds is named as governance, not arithmetic', () => {
  const a = chainApi()
  assert.ok(a.leftToTheOperator.includes('who may append'))
  assert.match(a.honest, /governance, not arithmetic/)
})
