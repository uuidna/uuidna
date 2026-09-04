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

test('it AGREES when the live record is the identifier we cite', async () => {
  const r = await harvestSeal(seal, ok('uuidna — content-addressed identity, honest by construction: 2499 theorems', seal.standingDoi!))
  assert.equal(r.read, true)
  assert.equal(r.role, 'own')
  assert.equal(r.agrees, true)
})

// THE ACTUAL DEFECT, 2026-09-04: the registry declared 21787144, and that record is a different work. The
// identifier is what moved, which is why the identifier is what decides.
test('it FIRES when the identifier resolves to a different record', async () => {
  const r = await harvestSeal(seal, ok('Quantum Proofs of the Clay Millennium Problems v1.0', seal.standingDoi!, 21787144))
  assert.equal(r.read, true)
  assert.equal(r.agrees, false, 'landing on another record must not read as agreement')
  assert.equal(r.titleOverlaps, false, 'and the title divergence is reported alongside it')
})

test('it FIRES when the live DOI is not the DOI we declare', async () => {
  const r = await harvestSeal(seal, ok(seal.title, '10.5281/zenodo.99999999'))
  assert.equal(r.agrees, false)
})

// THE FALSE POSITIVE THIS RULE EXISTS TO AVOID, and it was shipped for about four minutes. A peer warned that a
// title comparison would misfire; the very next run failed the cited Nature letter because our registry appends
// "(Nature)" to a title the publisher does not, so the declared string was LONGER and a prefix test ran the
// wrong way. Nothing was wrong with the citation. A title is prose two parties phrase differently; an identifier
// either resolves to the work or does not.
test('a title ANNOTATION does not fail a correct citation', async () => {
  const cited = { ...seal, owned: false, standingRecordId: undefined, standingDoi: '10.1038/s41586-026-10846-4',
    title: 'A gas-enshrouded and gas-reddened black hole at cosmic dawn (Nature)' }
  const r = await harvestSeal(cited, async () => ({
    status: 200,
    body: { message: { title: ['A gas-enshrouded and gas-reddened black hole at cosmic dawn'], DOI: '10.1038/s41586-026-10846-4' } },
  }))
  assert.equal(r.role, 'cited', 'a work we reference is checked in the cited role')
  assert.equal(r.read, true)
  assert.equal(r.agrees, true, 'the identifier is the one we cite, so the citation is sound')
  assert.equal(r.titleOverlaps, true, 'and the overlap check is symmetric, so the annotation is fine')
})

// A CITED DOI MUST BE CHECKED AT ALL. The first version read back only the owned seals, so the Nature letter —
// whose published numbers are sealed as theorems here — was never verified. A peer's role split closed that.
test('a non-Zenodo cited DOI is resolved through its own registrar', async () => {
  const cited = { ...seal, owned: false, standingRecordId: undefined, standingDoi: '10.1038/x' }
  let asked = ''
  const r = await harvestSeal(cited, async (url) => { asked = url; return { status: 200, body: { message: { title: ['x'], DOI: '10.1038/x' } } } })
  assert.match(asked, /api\.crossref\.org/, 'a Nature DOI has no Zenodo record id and must go to Crossref')
  assert.equal(r.agrees, true)
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
  const h = await harvestOwnedDois(ok('wrong work entirely', '10.5281/zenodo.1', 999))
  assert.ok(h.owned > 0)
  assert.equal(h.readCount, h.owned)
  assert.equal(h.agreeing, 0, 'every seal resolved to the wrong identifier')
  const same = await harvestOwnedDois(ok('wrong work entirely', '10.5281/zenodo.1', 999))
  assert.equal(h.receipt, same.receipt)
})

test('every seal with a DOI is in scope — cited ones included', async () => {
  const h = await harvestOwnedDois(ok(seal.title, seal.standingDoi!))
  assert.ok(h.rows.some((r) => r.role === 'cited'), 'a cited DOI left unchecked is an unverified assertion in print')
  assert.ok(h.rows.some((r) => r.role === 'own'))
})

test('a seal with neither DOI nor record id has nothing to read back, and says so', async () => {
  const r = await harvestSeal({ ...seal, standingRecordId: undefined, standingDoi: '' }, ok(seal.title, 'x'))
  assert.equal(r.read, false)
  assert.match(String(r.reason), /nothing to read back/)
})
