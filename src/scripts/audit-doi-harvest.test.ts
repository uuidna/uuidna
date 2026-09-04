import { test } from 'node:test'
import assert from 'node:assert/strict'
import { harvestSeal, harvestOwnedDois } from './audit-doi-harvest.js'
import { ZENODO_SEALS } from '../zenodo-seals.js'

// OFFLINE BY CONSTRUCTION — every fetch is injected, so this suite never touches the network. The live harvest
// is the CLI's job; these tests prove the comparison is sound, including on the exact defect that motivated it.

const seal = ZENODO_SEALS.find((s) => s.id === 'uuidna-software')!
const ok = (title: string, doi: string, id = 22256708) => async () => ({
  status: 200, body: { id, doi, conceptdoi: '10.5281/zenodo.21787143', metadata: { title } },
})

test('it AGREES when the live record is the work we claim', async () => {
  const r = await harvestSeal(seal, ok('uuidna — content-addressed identity, honest by construction: 2499 theorems', seal.standingDoi!))
  assert.equal(r.read, true)
  assert.equal(r.agrees, true, 'the live title extends the declared one, which is what a release does')
})

// THE ACTUAL DEFECT, 2026-09-04: the registry declared 21787144, and that record is a different work.
test('it FIRES on the real defect — a declared record that is someone else’s paper', async () => {
  const r = await harvestSeal(seal, ok('Quantum Proofs of the Clay Millennium Problems v1.0', seal.standingDoi!, 21787144))
  assert.equal(r.read, true)
  assert.equal(r.agrees, false, 'a record whose title is a different work must not read as agreement')
})

test('it FIRES when the live DOI is not the DOI we declare', async () => {
  const r = await harvestSeal(seal, ok(seal.title, '10.5281/zenodo.99999999'))
  assert.equal(r.agrees, false, 'the record must carry the DOI this repository cites')
})

// UNREAD IS NOT MISMATCHED. A gate that reads an unreachable host as agreement is worse than no gate; one that
// reads it as disagreement raises a false alarm on every offline run.
test('an unreachable record is UNREAD, neither agreeing nor disagreeing', async () => {
  const r429 = await harvestSeal(seal, async () => ({ status: 429, body: null }))
  assert.equal(r429.read, false)
  assert.equal(r429.agrees, undefined, 'unread must not decide')
  assert.match(String(r429.reason), /429/)
  const thrown = await harvestSeal(seal, async () => { throw new Error('getaddrinfo ENOTFOUND') })
  assert.equal(thrown.read, false)
  assert.match(String(thrown.reason), /ENOTFOUND/)
})

test('the census separates read, agreeing and disagreeing, and folds to one receipt', async () => {
  const h = await harvestOwnedDois(ok('wrong work entirely', '10.5281/zenodo.1'))
  assert.ok(h.owned > 0, 'there must be owned records to check')
  assert.equal(h.readCount, h.owned)
  assert.equal(h.agreeing, 0)
  assert.equal(h.disagreeing.length, h.owned)
  const same = await harvestOwnedDois(ok('wrong work entirely', '10.5281/zenodo.1'))
  assert.equal(h.receipt, same.receipt, 'the same answer must fold to the same receipt')
})

test('a seal with no record id has nothing to read back, and says so', async () => {
  const r = await harvestSeal({ ...seal, standingRecordId: undefined }, ok(seal.title, seal.standingDoi!))
  assert.equal(r.read, false)
  assert.match(String(r.reason), /nothing to read back/)
})
