// Smoke tests — run against the built dist. `npm test` builds first. Integrity, not truth. 0/7.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  toUuid, strictUuidna, merkleFold, digitalRoot, units, vortexOrbit,
  imprintTextChain, readImprintTextChain,
  merkleRoot, merkleProof, verifyProof,
  computes, harness, reeducate, harness7, billUuidna, coins,
} from '../dist/index.js'

test('content-address is deterministic and context-free', () => {
  assert.equal(toUuid('uuidna'), toUuid('uuidna'))
  assert.notEqual(toUuid('a'), toUuid('b'))
  assert.match(toUuid('x'), /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  assert.equal(strictUuidna(3), strictUuidna(' 3 '))
})

test('ℤ/9 primitives compute from the axiom', () => {
  assert.deepEqual(units(), [1, 2, 4, 5, 7, 8])
  assert.deepEqual(vortexOrbit(), [1, 2, 4, 8, 7, 5])
  assert.equal(digitalRoot(432), 9)
})

test('imprint codec round-trips arbitrary text', () => {
  for (const s of ['', 'Hi', 'the units of Z/9', '你好 · Riemann']) {
    assert.equal(readImprintTextChain(imprintTextChain(s)), s)
  }
})

test('merkle proof is sound — the true leaf verifies, a forgery fails', () => {
  const leaves = Array.from({ length: 16 }, (_, i) => toUuid('leaf' + i))
  const root = merkleRoot(leaves)
  for (let i = 0; i < leaves.length; i++) {
    const proof = merkleProof(leaves, i)
    assert.equal(verifyProof(leaves[i], proof, root), true)
    assert.equal(verifyProof(toUuid('forge' + i), proof, root), false)
  }
})

test('the honesty gate drains overclaims and signs the honest floor', () => {
  assert.equal(computes('we prove the Riemann hypothesis').binary, 0)
  assert.equal(computes('это faster than light').binary, 0)
  assert.equal(computes('мы доказали гипотезу').binary, 0) // hard in all 7 dimensions
  assert.equal(computes('a content-address proves integrity, not truth; 0/7').binary, 1)
})

test('harness makes any output auditable; reeducate bounds overclaims until they hold', () => {
  assert.equal(harness('anything').auditable, true)
  assert.equal(harness7('x').auditableInAll, true)
  const r = reeducate('we prove the Riemann hypothesis and it is faster than light, unbreakable')
  assert.equal(r.passed, true)
  assert.ok(r.steps.length >= 1)
})

test('billing measures bits saved; coins are conserved; public interest is free', () => {
  assert.equal(coins(), 2)
  assert.equal(billUuidna({ commercial: true, recomputeOps: 1024, verifyOps: 1 }).bitsSaved, 1023)
  assert.equal(billUuidna({ commercial: true, recomputeOps: 5, verifyOps: 1 }).coins, 2)
  assert.equal(billUuidna({ commercial: false, recomputeOps: 1e6, verifyOps: 1 }).free, true)
})
