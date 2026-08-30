// crypto-streams — THE SEVEN DIMENSION STREAMS, sealed ONCE and then interrogated. Folded from the twelve `777 ·`
// tests in smoke.test.ts plus stream.test.ts, losing no assertion: every stream, every negative
// direction and every carrier path is still exercised.
//
// WHY IT IS FASTER WITHOUT WEAKENING ANYTHING: the cost of this layer is PBKDF2 at ITER=600,000 — one derivation per
// distinct (passphrase, salt) pair, ~1.8s each, and the derived key is memoised per pair. The old tests re-sealed the
// same seven plaintexts in a dozen separate tests, paying the same derivations over and over; this file seals the
// corpus once at module scope and every test reads it. The work factor is untouched — only the repetition is gone.
// A tampered-ciphertext or wrong-envelope check reuses the corpus salt, so it is free; a wrong-PASSPHRASE check
// genuinely costs a derivation per stream, and it is kept, because that is the coverage.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { encrypt, decrypt, sealSequenceAcross, verifyEnvelope, imprintTextChain, readImprintTextChain } from './index.js'
import { UUID } from './test-api.js'

const STREAMS = ['d1 · reflection', 'd2 · the pair', 'd3 · the trinity', 'd4 · the square', 'd5 · the diamond', 'd6 · the rosette', 'd7 · the dimensions']
const KEY = 'gold-string-60'
const SEALED = STREAMS.map((p) => encrypt(p, KEY))   // the corpus — seven derivations, paid once for the whole file

test('every dimension stream round-trips bidirectionally through its envelope', () => {
  STREAMS.forEach((p, i) => assert.equal(decrypt(SEALED[i], KEY), p))
  SEALED.forEach((s) => assert.match(s.address, UUID))
})

test('each stream seals to a distinct address, the same stream is convergent, and a step freshens the salt', () => {
  const addrs = SEALED.map((s) => s.address)
  assert.equal(new Set(addrs).size, STREAMS.length)                       // distinct plaintext → distinct seal
  STREAMS.forEach((p, i) => assert.equal(encrypt(p, KEY).address, addrs[i]))  // convergent (memoised, free)
  // an explicit step produces the v2, sequence-stamped envelope: same plaintext, a fresh salt per step
  const s0 = encrypt(STREAMS[0], KEY, 0), s1 = encrypt(STREAMS[0], KEY, 1)
  assert.equal(s0.v, 2)
  assert.equal(s0.seq, 0)
  assert.equal(s1.seq, 1)
  assert.notEqual(s0.address, s1.address)                                 // the equality leak is closed
  assert.notEqual(s0.ct, s1.ct)
  const across = sealSequenceAcross([STREAMS[0], STREAMS[0], STREAMS[0]], KEY)
  const seq = across.envelopes
  assert.equal(across.balance.gpuWorkers, 0, 'three jobs do not pay GPU postage')
  assert.ok(across.balance.parallelSteps <= 3)
  assert.equal(new Set(seq.map((s) => s.address)).size, 3)                // …three distinct seals
  for (const s of seq) assert.equal(decrypt(s, KEY), STREAMS[0])          // and every step still decrypts
})

test('the negative matrix holds on every stream: wrong passphrase, tampered ciphertext, and a foreign key all fail', () => {
  for (const s of SEALED) {
    assert.throws(() => decrypt(s, 'wrong-' + KEY))                       // the reverse direction is guarded
    const flip = s.ct.slice(0, -2) + (s.ct.slice(-2) === 'AA' ? 'BB' : 'AA')
    assert.throws(() => decrypt({ ...s, ct: flip }, KEY))                 // Poly1305 refuses a tampered envelope
  }
  const a = encrypt(STREAMS[0], KEY + '-A')
  assert.throws(() => decrypt(a, KEY + '-B'))                             // a foreign key never opens the seal
  assert.equal(decrypt(a, KEY + '-A'), STREAMS[0])                        // the right key does
})

test('the public envelope verifies for every stream and carries no plaintext on the wire', () => {
  SEALED.forEach((s, i) => {
    assert.ok(verifyEnvelope(s))                                          // the address recomputes publicly
    assert.ok(!JSON.stringify(s).includes(STREAMS[i]))                    // the plaintext is nowhere on the wire
  })
})

test('the uuid carrier moves every stream both ways, and a sealed envelope survives the trip', () => {
  for (const p of STREAMS) assert.equal(readImprintTextChain(imprintTextChain(p)), p)   // imprint ⇄ read, free
  SEALED.forEach((s, i) => {
    const carried = JSON.parse(readImprintTextChain(imprintTextChain(JSON.stringify(s))))
    assert.equal(decrypt(carried, KEY), STREAMS[i])                       // seal → uuid stream → seal, still opens
  })
})
