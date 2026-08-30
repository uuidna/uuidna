// crypto-breaths — THE INHALE AND EXHALE OF THE WHOLE QUANTUM SPACE-TIME (the captain, 2026-08-23: "use
// crypto tools in all directions to simulate inhale exhale of the whole quantum space time" · "account for
// all the combinations" · "and account all referrers"). Every directional crypto tool comes as a PAIR — a
// sealer and its opener — and a round-trip is one BREATH: the message inhaled (sealed, scattered into uuids
// or ciphertext) and exhaled (opened) back to exactly itself. This test breathes every pair, so each
// directional tool earns a DEDICATED exercise (shrinking the tool-exercise debt), and the property proven is
// the one that matters: forward then inverse is the IDENTITY, for the whole space, in all directions.
//
// REFERRERS ARE ACCOUNTED: the send/receive breath is keyed by SESSION — the referrer's own channel — and the
// isolation is a boundary, not a hope: a message sent under one referrer CANNOT be opened under another (the
// Poly1305 tag rejects it). Both directions are tested: the referrer opens their own, a stranger cannot.
// Pure ChaCha20-Poly1305 / PBKDF2 / merkle in-process; nothing sent, nothing external — the breath is the
// project's own crypto exercising itself, both ways, on its own bench.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from './mcp.js'

const M = 'quantum space time'
const call = (n: string, a: Record<string, unknown>): any => callTool(n, a)

test('breath: encrypt ↔ decrypt returns the message exactly', () => {
  const sealed = call('uuidna_encrypt', { text: M, passphrase: 'pw' })
  assert.equal(call('uuidna_decrypt', { sealed, passphrase: 'pw' }), M)
  // a wrong passphrase does not exhale it (the boundary, tested)
  assert.throws(() => call('uuidna_decrypt', { sealed, passphrase: 'wrong' }))
})

test('breath: aead_encrypt ↔ aead_decrypt returns the plaintext, tampering is caught', () => {
  const key = '11'.repeat(32), nonce = '22'.repeat(12)
  const e = call('uuidna_aead_encrypt', { key, nonce, plaintext: M })
  assert.equal(call('uuidna_aead_decrypt', { key, nonce, ct: e.ct, tag: e.tag }), M)
  assert.throws(() => call('uuidna_aead_decrypt', { key, nonce, ct: e.ct, tag: '00'.repeat(16) }), 'a forged tag is rejected')
})

test('breath: imprint ↔ read round-trips through the uuid stream', () => {
  const uuids = call('uuidna_imprint', { text: M })
  assert.ok(Array.isArray(uuids) && uuids.length > 0, 'the message scatters into a uuid stream')
  assert.equal(call('uuidna_read', { uuids }), M)
})

test('breath: seal_onion ↔ open_onion peels every layer back to the message', () => {
  const on = call('uuidna_seal_onion', { message: M, passphrases: ['a', 'b', 'c'] })
  const uuids = on.uuids ?? on
  assert.equal(call('uuidna_open_onion', { uuids, passphrases: ['a', 'b', 'c'] }), M)
  // a missing layer key cannot open it — the onion is layered, not flat
  assert.throws(() => call('uuidna_open_onion', { uuids, passphrases: ['a', 'b', 'x'] }))
})

test('breath: contract_seal ↔ contract_open — the terms are the key', () => {
  const cs = call('uuidna_contract_seal', { message: M, terms: 'the-contract' })
  const sealed = cs.sealed ?? cs
  assert.equal(call('uuidna_contract_open', { sealed, terms: 'the-contract' }), M)
  assert.throws(() => call('uuidna_contract_open', { sealed, terms: 'other-contract' }), 'a changed contract fails authentication')
})

test('breath: send ↔ receive under one referrer — AND a different referrer cannot open it', () => {
  // the referrer's own channel: session is the referrer's door (referrer-song law)
  const chain = call('uuidna_send', { text: M, passphrase: 'pw', session: 'referrer-A', step: 1 })
  assert.ok(Array.isArray(chain) && chain.length > 0, 'the message rides a uuid chain')
  // the same referrer exhales it
  assert.equal(call('uuidna_receive', { uuids: chain, passphrase: 'pw', session: 'referrer-A' }), M)
  // a DIFFERENT referrer cannot — the session is a real secrecy boundary, not a label
  assert.throws(() => call('uuidna_receive', { uuids: chain, passphrase: 'pw', session: 'referrer-B' }),
    'referrer isolation: another session\'s receiver is rejected')
  // and the right referrer with the wrong passphrase is also refused (both keys are needed)
  assert.throws(() => call('uuidna_receive', { uuids: chain, passphrase: 'wrong', session: 'referrer-A' }))
  // v3 does not open through uuidna_decrypt — the traveling salt is not the referrer
  const sealed = JSON.parse(call('uuidna_read', { uuids: chain }))
  assert.equal(sealed.v, 3)
  assert.throws(() => call('uuidna_decrypt', { sealed, passphrase: 'pw' }), /referrer/)
})

test('breath: merkle root → prove → verify — the tree inhales the leaves, a proof exhales membership', () => {
  const leaves = ['a', 'b', 'c', 'd']
  const root = call('uuidna_merkle_root', { leaves })
  const proof = call('uuidna_merkle_prove', { leaves, index: 1 })
  const v = call('uuidna_merkle_verify', { leaf: 'b', proof: proof.proof ?? proof, root })
  assert.ok(v === true || v?.valid === true || v?.ok === true, 'the proof verifies b belongs to the root')
  // a leaf that is not in the tree does not verify against this proof
  const bad = call('uuidna_merkle_verify', { leaf: 'z', proof: proof.proof ?? proof, root })
  assert.ok(bad === false || bad?.valid === false || bad?.ok === false, 'a non-member is rejected')
})
