// recompute — GENERATED FROM LEAN. For EVERY sealed theorem it reads the ledger the Lean layer
// generated (theorems()) and recomputes its content-address from the theorem's own (key, statement). It therefore
// covers the WHOLE ledger automatically — add a domain, this test grows with it, no edit here. It is ALWAYS GREEN
// unless an INTRUDER writes: tamper a theorem's key, statement, or address and its content-address no longer
// recomputes and this goes red; leave the ledger as Lean sealed it and every one returns. The tests are the ledger's
// own self-check — integrity by recomputation.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems, toUuid, merkleGravity } from '../index.js'

test('every sealed theorem recomputes its content-address — generated from the ledger, red only if an intruder tampers', () => {
  const T = theorems()
  assert.ok(T.length > 0, 'the ledger is non-empty')

  // 1) DNA — every theorem's address IS toUuid(key ":" statement). A tampered key/statement/address breaks exactly one.
  const forged = T.filter((t) => toUuid(t.key + ':' + t.statement) !== t.address)
  assert.deepEqual(forged.map((t) => t.key), [], 'no theorem tampered — every content-address recomputes from its own (key, statement)')

  // 2) SINGLE-SOURCE — every theorem carries the lean/*.lean file it was generated from (nothing authored elsewhere).
  const orphan = T.filter((t) => !t.file || !t.file.endsWith('.lean'))
  assert.deepEqual(orphan.map((t) => t.key), [], 'every theorem is sourced from a lean/*.lean file')

  // 3) UNIQUE — no two theorems share a key (a key is a content-address handle; a collision would be an intrusion).
  assert.equal(new Set(T.map((t) => t.key)).size, T.length, 'every theorem key is unique')

  // 4) ORDER-INVARIANT — the whole ledger folds to ONE receipt independent of order; recompute it and it returns.
  const receipt = merkleGravity(T.map((t) => t.address))
  assert.equal(merkleGravity([...T].reverse().map((t) => t.address)), receipt, 'the ledger receipt is order-invariant')
  assert.match(receipt, /^[0-9a-f-]{36}$/)
})
