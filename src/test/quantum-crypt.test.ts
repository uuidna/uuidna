// quantum-crypt — the crypto↔quantum FUSION, tested at the seam: a sealed quantum message carries secrecy from the
// ChaCha20-Poly1305 envelope and a quantum witness bound to the CIPHERTEXT address (never the plaintext), so the
// witness verifies publicly while only the key holder reads. Each failure mode drains: a tampered envelope, a
// rebound witness, a fabricated theorem, a wrong key. Pure and offline — the KDF memo keeps repeated seals fast.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sealMessage, openMessage, verifyMessage, serializeMessage } from '../quantum/message.js'
import { verifyEnvelope } from '../crypt.js'

const PLAIN = 'the two coins are conserved'
const PASS = 'a strong passphrase for the fusion test'
const KEY = 'two_coins' // sealed in the ledger — the witness must cite a real theorem

test('seal → open round-trips, and the whole fusion verifies on the way', () => {
  const sqm = sealMessage(PLAIN, PASS, KEY)
  assert.equal(verifyEnvelope(sqm.sealed), true, 'the envelope address recomputes')
  assert.equal(sqm.witness.plaintext, sqm.sealed.address, 'the witness binds the CIPHERTEXT address, not the plaintext')
  assert.equal(verifyMessage(sqm.witness).valid, true, 'the witness verifies against the ledger')
  const opened = openMessage(sqm, PASS)
  assert.equal(opened.plaintext, PLAIN)
  assert.equal(opened.theoremKey, KEY)
})

test('the witness leaks nothing — the public face of a sealed message never contains the plaintext', () => {
  const sqm = sealMessage(PLAIN, PASS, KEY)
  const publicFace = JSON.stringify({ sealed: sqm.sealed, witness: serializeMessage(sqm.witness), fold: sqm.fold })
  assert.equal(publicFace.includes(PLAIN), false, 'plaintext appears nowhere in the serialized fusion')
})

test('deterministic: the same inputs seal to the same fold; an advancing step moves the envelope', () => {
  const a = sealMessage(PLAIN, PASS, KEY)
  const b = sealMessage(PLAIN, PASS, KEY)
  assert.equal(a.fold, b.fold, 'convergent by default — same message, same fusion identity')
  const c = sealMessage(PLAIN, PASS, KEY, 1)
  assert.notEqual(c.sealed.address, a.sealed.address, 'the advancing step freshens the salt — equality no longer leaks')
})

test('every failure mode drains: tampered ciphertext, rebound witness, wrong key, fabricated theorem', () => {
  const sqm = sealMessage(PLAIN, PASS, KEY)
  // a tampered envelope: flip the ciphertext — the address no longer recomputes
  const tampered = { ...sqm, sealed: { ...sqm.sealed, ct: sqm.sealed.ct.slice(0, -2) + (sqm.sealed.ct.endsWith('A') ? 'BB' : 'AA') } }
  assert.throws(() => openMessage(tampered, PASS), /does not recompute|tampered/)
  // a rebound witness: a witness for a DIFFERENT envelope must not open this one
  const other = sealMessage('a different message', PASS, KEY)
  assert.throws(() => openMessage({ ...sqm, witness: other.witness }, PASS), /witness/)
  // the wrong key: Poly1305 refuses
  assert.throws(() => openMessage(sqm, 'not the passphrase'))
  // a fabricated theorem never seals a message at all
  assert.throws(() => sealMessage(PLAIN, PASS, 'not_a_sealed_theorem'), /not found/)
})
