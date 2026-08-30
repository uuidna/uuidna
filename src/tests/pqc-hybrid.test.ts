// pqc-hybrid — hybrid derivation and v4 envelope round-trip; KEM bytes are opaque transport.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  hybridDerive, sealHybrid, openHybrid, pqcPosture, suitePolicy, missingAsymmetricSlots,
  HYBRID_SUITE_ID, SYMMETRIC_SUITE_ID,
} from '../pqc/index.js'

const secrets = {
  classical: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]),
  pqc: new Uint8Array([32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]),
}

const ctx = {
  suiteId: HYBRID_SUITE_ID,
  senderKeyId: 'sender-1',
  recipientKeyId: 'recipient-1',
  sequence: 1,
  createdAt: '2026-08-30T00:00:00Z',
}

test('pqcPosture names symmetric present and hybrid slots absent', () => {
  const p = pqcPosture()
  assert.equal(p.label, 'PQC-adjacent')
  assert.equal(p.symmetricPresent, true)
  assert.equal(p.hybridDeployable, false)
  assert.ok(p.missing.includes('ML-KEM-768'))
  assert.ok(p.missing.includes('X25519'))
  assert.ok(p.missing.includes('ML-DSA-65'))
})

test('suitePolicy refuses hybrid → symmetric downgrade', () => {
  const r = suitePolicy(HYBRID_SUITE_ID, SYMMETRIC_SUITE_ID)
  assert.equal(r.allowed, false)
  assert.match(r.reason, /downgrade/)
})

test('hybridDerive is deterministic and separates subkeys', () => {
  const a = hybridDerive(secrets, ctx)
  const b = hybridDerive(secrets, ctx)
  assert.deepEqual([...a.encryption], [...b.encryption])
  assert.notDeepEqual([...a.encryption], [...a.chain])
  assert.notDeepEqual([...a.chain], [...a.receipt])
})

test('sealHybrid round-trips through openHybrid', () => {
  const env = sealHybrid({
    plaintext: 'school-at-pqc',
    secrets,
    context: ctx,
    kemCiphertext: new Uint8Array([9, 8, 7, 6]),
    classicalEphemeralPublic: new Uint8Array([1, 2, 3, 4]),
    senderKeyId: ctx.senderKeyId,
    recipientKeyId: ctx.recipientKeyId,
  })
  assert.equal(env.v, 4)
  assert.equal(env.suite, HYBRID_SUITE_ID)
  assert.equal(openHybrid(env, secrets), 'school-at-pqc')
})

test('openHybrid refuses wrong suite address tamper', () => {
  const env = sealHybrid({
    plaintext: 'tamper',
    secrets,
    context: ctx,
    kemCiphertext: new Uint8Array([1]),
    classicalEphemeralPublic: new Uint8Array([2]),
    senderKeyId: ctx.senderKeyId,
    recipientKeyId: ctx.recipientKeyId,
  })
  const bad = { ...env, ct: env.ct.slice(0, -1) + (env.ct.endsWith('A') ? 'B' : 'A') }
  assert.throws(() => openHybrid(bad, secrets), /address does not recompute/)
})

test('missingAsymmetricSlots lists every hybrid slot', () => {
  assert.equal(missingAsymmetricSlots().length, 4)
})
