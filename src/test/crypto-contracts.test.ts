// crypto-contracts — THE CONTRACT-KEYED LAYER, THE QUANTUM FUSION AND THE ADVERSARIAL DRILL. Folded from
// contract.test.ts + quantum-crypt.test.ts + adversarial-messaging.test.ts (13 declarations → 6; the work-factor
// refusals moved to crypto-bounds, which is heavy enough to deserve its own process). Same law as the streams file:
// each seal is paid for ONCE at module scope and every assertion reads it, so the PBKDF2 work factor is untouched
// while the repetition is gone. The honest property under all of it: confidentiality here is exactly the secrecy
// of the terms.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { contractId, contractDomain, sealToContract, openFromContract, sealChainToContract, openChainFromContract,
  toUuid, encrypt, decrypt, imprintTextChain, readImprintTextChain, verifyEnvelope } from '../index.js'
import { sealMessage, openMessage, verifyMessage, serializeMessage } from '../quantum/message.js'
import { UUID } from './api.js'

const TERMS = 'CC-COMMERCIAL — deployment #7, secret between uuidna and the licensee, do not share'
const PAYLOAD = 'SECRET-PAYLOAD-XYZ — the quarterly figures'
const SEALED = sealToContract(PAYLOAD, TERMS)          // one contract seal, read by four tests

test('the domain IS the contract address — the licence is a contract, folded like any other text', () => {
  assert.match(contractId(TERMS), UUID)
  assert.equal(contractId(TERMS), toUuid(TERMS))       // the same fold as uuidna_address
  assert.equal(contractDomain(TERMS), `${contractId(TERMS)}.uuidna.org`)
})

test('seal → open round-trips under the contract, and the tag routes without decrypting', () => {
  assert.equal(SEALED.contract, contractId(TERMS))     // tagged with the public routing id
  SEALED.uuids.forEach((u) => assert.match(u, UUID))
  assert.equal(openFromContract(SEALED, TERMS), PAYLOAD)
  const wire = JSON.stringify(SEALED)
  assert.ok(wire.includes(SEALED.contract))            // the contract-uuid is on the wire (routing)
  assert.ok(!wire.includes(PAYLOAD))                   // the plaintext is not
})

test('a wrong contract is refused before decrypting, and amended terms cannot open the old ciphertext', () => {
  assert.throws(() => openFromContract(SEALED, 'some other contract text'), /wrong contract/)
  const amended = TERMS + ' — amended clause 4'
  assert.notEqual(contractId(amended), contractId(TERMS))   // changed terms → a new content-address…
  assert.throws(() => openFromContract(SEALED, amended))    // …and a new key: the old seal stays shut
})

test('the contract ratchet seals and opens in order; drop, reorder or the wrong contract breaks it', () => {
  const msgs = ['link one', 'link two', 'link three']
  const chain = sealChainToContract(msgs, TERMS)
  assert.equal(chain.contract, contractId(TERMS))
  assert.deepEqual(openChainFromContract(chain, TERMS), msgs)
  assert.throws(() => openChainFromContract({ contract: chain.contract, links: chain.links.slice(1) }, TERMS))
  assert.throws(() => openChainFromContract({ contract: chain.contract, links: [chain.links[1], chain.links[0], chain.links[2]] }, TERMS))
  assert.throws(() => openChainFromContract(chain, 'wrong terms'), /wrong contract/)
})

test('the quantum fusion: the witness binds the ciphertext, verifies publicly, and every failure mode drains', () => {
  const PLAIN = 'the two coins are conserved', PASS = 'a strong passphrase for the fusion test', KEY = 'two_coins'
  const sqm = sealMessage(PLAIN, PASS, KEY)
  assert.equal(verifyEnvelope(sqm.sealed), true)                          // the envelope address recomputes
  assert.equal(sqm.witness.plaintext, sqm.sealed.address, 'the witness binds the CIPHERTEXT address')
  assert.equal(verifyMessage(sqm.witness).valid, true)                    // and verifies against the ledger
  const opened = openMessage(sqm, PASS)
  assert.equal(opened.plaintext, PLAIN)
  assert.equal(opened.theoremKey, KEY)
  const publicFace = JSON.stringify({ sealed: sqm.sealed, witness: serializeMessage(sqm.witness), fold: sqm.fold })
  assert.equal(publicFace.includes(PLAIN), false, 'the plaintext appears nowhere in the serialized fusion')
  assert.equal(sealMessage(PLAIN, PASS, KEY).fold, sqm.fold, 'convergent by default — same message, same identity')
  assert.notEqual(sealMessage(PLAIN, PASS, KEY, 1).sealed.address, sqm.sealed.address, 'a step freshens the salt')
  const tampered = { ...sqm, sealed: { ...sqm.sealed, ct: sqm.sealed.ct.slice(0, -2) + (sqm.sealed.ct.endsWith('A') ? 'BB' : 'AA') } }
  assert.throws(() => openMessage(tampered, PASS), /does not recompute|tampered/)
  const other = sealMessage('a different message', PASS, KEY)
  assert.throws(() => openMessage({ ...sqm, witness: other.witness }, PASS), /witness/)  // a rebound witness
  assert.throws(() => openMessage(sqm, 'not the passphrase'))                            // the wrong key
  assert.throws(() => sealMessage(PLAIN, PASS, 'not_a_sealed_theorem'), /not found/)     // a fabricated theorem
})

test('the three-team drill: the cipher path stays private, and the carrier path honestly breaks', () => {
  const SECRET = 'the privacy message: rendezvous at the double torus'
  const KEY = 'correct horse battery staple — the only secret the teams do not share'
  const sealed = encrypt(SECRET, KEY, 7)                                  // Team 1 seals at full strength
  assert.notEqual(Buffer.from(sealed.ct, 'base64').toString('latin1'), SECRET)
  let team2 = ''                                                          // Team 2 reverses by the carrier codec
  try { team2 = readImprintTextChain([sealed.ct]) } catch { team2 = '<threw>' }
  assert.notEqual(team2, SECRET)
  let team3 = ''                                                          // Team 3 reverses by guessing the key
  try { team3 = decrypt(sealed, 'wrong passphrase') } catch { team3 = '<threw>' }
  assert.notEqual(team3, SECRET)
  assert.equal(team2 !== SECRET && team3 !== SECRET, true, 'privacy is BOTH reversers failing — the security NOR')
  assert.equal(decrypt(sealed, KEY), SECRET, 'only the key holder reads it')
  // and the drill CAN succeed: the carrier was never encryption, so the first reverser recovers it immediately.
  assert.equal(readImprintTextChain(imprintTextChain(SECRET)), SECRET)
})
