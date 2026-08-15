// Contract-keyed messaging tests — the domain IS the contract's address; the terms are the key. Round-trips, the
// public-identity/private-key split, wrong-contract rejection, license-change invalidation, and the ratchet. The
// honest property under test: confidentiality is exactly the secrecy of the terms. Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { contractId, contractDomain, sealToContract, openFromContract, sealChainToContract, openChainFromContract, toUuid } from '../index.js'
import { UUID } from './api.js'

const TERMS = 'CC-COMMERCIAL — deployment #7, secret between uuidna and the licensee, do not share'

test('the domain IS the contract address (contractId = uuidna_address of the terms)', () => {
  assert.match(contractId(TERMS), UUID)
  assert.equal(contractId(TERMS), toUuid(TERMS)) // same fold as uuidna_address — the license is a contract
  assert.equal(contractDomain(TERMS), `${contractId(TERMS)}.uuidna.org`)
})

test('seal → open round-trips under the same contract', () => {
  const sealed = sealToContract('the quarterly figures', TERMS)
  assert.equal(sealed.contract, contractId(TERMS)) // tagged with the public routing id
  sealed.uuids.forEach((u) => assert.match(u, UUID))
  assert.equal(openFromContract(sealed, TERMS), 'the quarterly figures')
})

test('the tag is public routing but not the key — the ciphertext does not leak the plaintext', () => {
  const sealed = sealToContract('SECRET-PAYLOAD-XYZ', TERMS)
  const wire = JSON.stringify(sealed)
  assert.ok(wire.includes(sealed.contract)) // the contract-uuid is on the wire (routing)
  assert.ok(!wire.includes('SECRET-PAYLOAD-XYZ')) // the plaintext is not
})

test('wrong contract is rejected before decrypting (address check) — secrecy is the secrecy of the terms', () => {
  const sealed = sealToContract('for holders of the contract only', TERMS)
  assert.throws(() => openFromContract(sealed, 'some other contract text'), /wrong contract/)
})

test('a license change is a new signature: changed terms → new address AND new key → old ciphertext will not open', () => {
  const sealed = sealToContract('under the old terms', TERMS)
  const changed = TERMS + ' — amended clause 4'
  assert.notEqual(contractId(changed), contractId(TERMS)) // new content-address
  assert.throws(() => openFromContract(sealed, changed)) // and it cannot open the old ciphertext
})

test('contract ratchet: a stream seals and opens in order under the contract', () => {
  const msgs = ['link one', 'link two', 'link three']
  const chain = sealChainToContract(msgs, TERMS)
  assert.equal(chain.contract, contractId(TERMS))
  assert.deepEqual(openChainFromContract(chain, TERMS), msgs)
})

test('contract ratchet breaks if a link is dropped, reordered, or the contract is wrong', () => {
  const chain = sealChainToContract(['a', 'b', 'c'], TERMS)
  assert.throws(() => openChainFromContract({ contract: chain.contract, links: chain.links.slice(1) }, TERMS)) // dropped head
  assert.throws(() => openChainFromContract({ contract: chain.contract, links: [chain.links[1], chain.links[0], chain.links[2]] }, TERMS)) // reordered
  assert.throws(() => openChainFromContract(chain, 'wrong terms'), /wrong contract/) // wrong contract
})
