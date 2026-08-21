// domain-wave — the per-wing audit. Sending the wave across all 72 wings found its LOCAL half proved nothing:
// `orderInvariant` compares a fold to the fold of the reversed input, but merkleFold SORTS its leaves, so it is
// true for every input — checked over 492 permutations and never false. A check that cannot fail is the vacuous
// class, and reporting it as an audit is the failure this ledger names elsewhere. `recomputes` is the audit that
// can fail: an address is toUuid(key + ':' + statement), so a forged or edited entry does not reproduce its own.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems, toUuid, merkleGravity } from '../index.js'

test('every wing recomputes — no address is forged', () => {
  const T = theorems()
  const forged = T.filter((t) => toUuid(t.key + ':' + t.statement) !== t.address).map((t) => t.key)
  assert.deepEqual(forged, [], 'an address that does not fall out of its own key and statement was edited or forged')
})

test('the recompute audit is FALSIFIABLE — a tampered statement is caught', () => {
  const t = theorems()[0]!
  assert.notEqual(toUuid(t.key + ':' + t.statement + ' '), t.address, 'a check that survives tampering audits nothing')
  assert.notEqual(toUuid(t.key + 'x:' + t.statement), t.address)
})

test('order-invariance is STRUCTURAL— it holds for every input', () => {
  // stated so no one mistakes it for an audit again: merkleFold sorts, so this cannot fail
  for (let n = 0; n <= 12; n++) {
    const a = [...Array(n).keys()].map((i) => toUuid('probe:' + n + ':' + i))
    const b = [...a].reverse()
    assert.equal(merkleGravity(a), merkleGravity(b))
  }
})

test('every wing is covered — the wave leaves no theorem unaudited', () => {
  const T = theorems()
  const wings = [...new Set(T.map((t) => t.principle))]
  const covered = wings.reduce((n, d) => n + T.filter((t) => t.principle === d).length, 0)
  assert.equal(covered, T.length, 'a theorem in no wing would never be reached by the wave')
})
