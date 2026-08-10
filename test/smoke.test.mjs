// Smoke tests — run against the built dist. `npm test` builds first. Integrity, not truth. 0/7.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  toUuid, strictUuidna, merkleFold, digitalRoot, units, vortexOrbit,
  encrypt, decrypt, verifyEnvelope,
  imprintTextChain, readImprintTextChain,
  merkleRoot, merkleProof, verifyProof,
  computes, harness, reeducate, harness7, billUuidna, coins,
  renderTheorem, renderList,
} from '../dist/index.js'

// The seven dimension streams (0..7 above the floor) — one plaintext per dimension, used to cover the 7d ("777")
// encryption BIDIRECTIONALLY (encrypt ⇄ decrypt) PER STREAM. 21 tests total: the 9 above plus these 12.
const STREAMS = ['d1 · reflection', 'd2 · the pair', 'd3 · the trinity', 'd4 · the square', 'd5 · the diamond', 'd6 · the rosette', 'd7 · the dimensions']
const KEY = 'gold-string-60'

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

test('render presents by reference — pure TS+CSS, address in every card, no framework', () => {
  const html = renderTheorem({ name: 'a decidable theorem — computed by exhaustion' })
  assert.match(html, /<article class="uuidna-card"/)
  assert.match(html, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/) // the content-address pointer
  assert.match(html, /integrity, not truth · 0\/7/)
  assert.ok(!/<script/i.test(html)) // no framework, no script
  // present many BY REFERENCE within a fixed per-card budget
  const list = renderList(Array.from({ length: 50 }, (_, i) => ({ name: 'theorem ' + i })))
  assert.equal((list.match(/uuidna-card/g) || []).length, 50)
})

test('billing measures bits saved; coins are conserved; public interest is free', () => {
  assert.equal(coins(), 2)
  assert.equal(billUuidna({ commercial: true, recomputeOps: 1024, verifyOps: 1 }).bitsSaved, 1023)
  assert.equal(billUuidna({ commercial: true, recomputeOps: 5, verifyOps: 1 }).coins, 2)
  assert.equal(billUuidna({ commercial: false, recomputeOps: 1e6, verifyOps: 1 }).free, true)
})

test('crypt: pure-TS ChaCha20-Poly1305 round-trips; wrong key and tamper fail; deterministic; 7d-fold envelope verifies', () => {
  const s = encrypt('beat to windward at 30°', 'gold-string-60')
  assert.equal(s.alg, 'ChaCha20-Poly1305')
  assert.equal(decrypt(s, 'gold-string-60'), 'beat to windward at 30°')        // round-trip (pure-TS, sync)
  assert.throws(() => decrypt(s, 'wrong'))                                     // wrong passphrase
  const tampered = { ...s, ct: s.ct.slice(0, -2) + (s.ct.slice(-2) === 'AA' ? 'BB' : 'AA') }
  assert.throws(() => decrypt(tampered, 'gold-string-60'))                     // Poly1305 authentication
  assert.ok(verifyEnvelope(s))                                                 // public envelope integrity
  const s2 = encrypt('beat to windward at 30°', 'gold-string-60')
  assert.equal(s.address, s2.address)                                          // deterministic (convergent) — same input, same seal
})

// ── 777: the 7d encryption, covered BIDIRECTIONALLY PER STREAM (12 tests → 21 total) ──

test('777 · encrypt→decrypt round-trips bidirectionally for all seven dimension streams', () => {
  for (const p of STREAMS) assert.equal(decrypt(encrypt(p, KEY), KEY), p)
})

test('777 · each stream seals to a distinct address; the same stream is convergent', () => {
  const addrs = STREAMS.map((p) => encrypt(p, KEY).address)
  assert.equal(new Set(addrs).size, STREAMS.length)                            // distinct plaintext → distinct seal
  for (const p of STREAMS) assert.equal(encrypt(p, KEY).address, encrypt(p, KEY).address) // convergent per stream
})

test('777 · the wrong passphrase fails on every stream (the reverse direction is guarded)', () => {
  for (const p of STREAMS) assert.throws(() => decrypt(encrypt(p, KEY), 'wrong-' + KEY))
})

test('777 · tampering any stream fails Poly1305 authentication', () => {
  for (const p of STREAMS) {
    const s = encrypt(p, KEY)
    const flip = s.ct.slice(0, -2) + (s.ct.slice(-2) === 'AA' ? 'BB' : 'AA')
    assert.throws(() => decrypt({ ...s, ct: flip }, KEY))
  }
})

test('777 · the public envelope verifies for every stream', () => {
  for (const p of STREAMS) assert.ok(verifyEnvelope(encrypt(p, KEY)))
})

test('777 · cross-key isolation — one stream key does not open another stream', () => {
  const a = encrypt(STREAMS[0], KEY + '-A')
  assert.throws(() => decrypt(a, KEY + '-B'))                                  // a foreign key never opens the seal
  assert.equal(decrypt(a, KEY + '-A'), STREAMS[0])                            // the right key does
})

test('777 · the uuid stream carries each dimension both ways (imprint ⇄ read)', () => {
  for (const p of STREAMS) assert.equal(readImprintTextChain(imprintTextChain(p)), p)
})

test('777 · a sealed stream transports through the uuid stream and decrypts on arrival', () => {
  for (const p of STREAMS) {
    const s = encrypt(p, KEY)
    const carried = JSON.parse(readImprintTextChain(imprintTextChain(JSON.stringify(s)))) // seal → uuid stream → seal
    assert.equal(decrypt(carried, KEY), p)                                     // recovered and decrypted bidirectionally
  }
})

test('777 · empty and large streams round-trip both ways', () => {
  assert.equal(decrypt(encrypt('', KEY), KEY), '')
  const big = 'harmonic life between 30 and 60 · '.repeat(200)
  assert.equal(decrypt(encrypt(big, KEY), KEY), big)
})

test('777 · multilingual streams round-trip bidirectionally (the rosetta dimension)', () => {
  for (const p of ['доказателство', '概念验证', 'preuve de concept', 'دليل', '증명', 'Machbarkeitsnachweis', 'सिद्धि']) {
    assert.equal(decrypt(encrypt(p, KEY), KEY), p)
  }
})

test('777 · the honest floor holds across every stream — no ciphertext boast leaks', () => {
  for (const p of STREAMS) {
    const s = encrypt(p, KEY)
    assert.equal(computes(s.alg + ' — integrity of the envelope, not truth; 0/7').binary, 1) // honest description passes
  }
  assert.equal(computes('unbreakable 100% secure quantum encryption').binary, 0)              // the boast drains
})

test('777 · the same tests generate the UI — each stream renders a card by reference', () => {
  const cards = STREAMS.map((p) => renderTheorem({ name: 'encrypted stream — ' + p + ' — round-trips both ways; 0/7' }))
  for (const html of cards) {
    assert.match(html, /<article class="uuidna-card"/)
    assert.match(html, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/) // address in every card
  }
  assert.equal((renderList(STREAMS.map((p) => ({ name: p }))).match(/uuidna-card/g) || []).length, STREAMS.length)
})
