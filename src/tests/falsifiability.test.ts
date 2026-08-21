// falsifiability — an audit that cannot fail is not an audit. The ledger refuses a THEOREM that is true
// regardless of its content (vacuousGaps); this is the same disease in running code, where it hides behind a
// green boolean. Met in domain-wave, whose per-wing audit reported 72/72 order-invariant while merkleFold sorts
// its leaves — true for every input, so the number was unearnable.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { falsify } from '../scripts/api.js'
import { theorems, toUuid, merkleGravity } from '../index.js'

test('falsify reports a check that catches every mutation', () => {
  const r = falsify(6, (n) => n % 2 === 0, [(n) => n + 1, (n) => n + 3])
  assert.equal(r.holds, true)
  assert.deepEqual(r.survived, [], 'both mutations must be caught')
})

test('falsify NAMES the mutations a weak check lets through', () => {
  // "is a number" holds on the subject and survives every mutation — the vacuous shape
  const r = falsify(6, (n) => typeof n === 'number', [(n) => n + 1, (n) => n * -5])
  assert.equal(r.holds, true)
  assert.deepEqual(r.survived, [0, 1], 'a check nothing breaks must be reported as surviving everything')
})

// ── the two real audits from domain-wave, side by side. This is the whole lesson in one test.
test('the recompute audit IS falsifiable — tampering with key or statement breaks it', () => {
  const t = theorems()[0]!
  const r = falsify(
    { key: t.key, statement: t.statement, address: t.address },
    (x) => toUuid(x.key + ':' + x.statement) === x.address,
    [
      (x) => ({ ...x, statement: x.statement + ' ' }),   // a space in the statement
      (x) => ({ ...x, key: x.key + 'x' }),               // a character in the key
      (x) => ({ ...x, address: toUuid('forged') }),      // a substituted address
    ],
  )
  assert.equal(r.holds, true, 'the real theorem must pass')
  assert.deepEqual(r.survived, [], 'every tamper must be caught, or the audit proves nothing')
})

test('order-invariance is NOT falsifiable — it survives every mutation, which is why it is not an audit', () => {
  const addrs = theorems().slice(0, 12).map((t) => t.address)
  const r = falsify(
    addrs,
    (a) => merkleGravity(a) === merkleGravity([...a].reverse()),
    [(a) => [...a].reverse(), (a) => [...a].sort(), (a) => [...a].slice(1)],
  )
  assert.equal(r.holds, true)
  assert.deepEqual(r.survived, [0, 1, 2],
    'merkleFold sorts, so this holds for every input — it is a structural property')
})
