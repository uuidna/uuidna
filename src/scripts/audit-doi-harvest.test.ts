import { test } from 'node:test'
import assert from 'node:assert/strict'
import { harvestSeal, harvestTwin, harvestOwnedDois } from './audit-doi-harvest.js'
import { ZENODO_SEALS } from '../zenodo-seals.js'

// OFFLINE BY CONSTRUCTION — every fetch is injected, so this suite never touches the network. The live harvest
// is the CLI's job; these tests prove the comparison is sound, including on the exact defect that motivated it.

const seal = ZENODO_SEALS.find((s) => s.id === 'uuidna-software')!
// THE FIXTURE IS DERIVED FROM THE SEAL, NOT TYPED BESIDE IT. This hardcoded id 22256708 and conceptdoi 21787143 —
// the API-deposit chain — so when the archive moved to the chain Zenodo mints from the GitHub release (the captain,
// 2026-09-26: "let zenodo mint the doi from github release. No need of redundancy") the fixture went on answering with
// the abandoned record and the test failed for the one reason a test must never fail: it disagreed with the seal about
// which record is ours. Read from the seal, it follows the next move too.
const ok = (title: string, doi: string, id = Number(seal.standingRecordId)) => async () => ({
  status: 200, body: { id, doi, conceptdoi: seal.conceptDoi, metadata: { title } },
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

// THE TWIN DEFECT, MEASURED 2026-09-12 ON THE LIVE RECORDS: every version on both uuidna chains declared
// isIdenticalTo 21970356, so the sync chain's own records pointed at themselves and nothing on Zenodo led back
// to the standing chain. The harvest read only the standing record, whose declaration was right, so nothing
// fired. The twin is now read back, offline here, with the exact shape the live record had.
const twinBody = (identical: string[], conceptdoi = '10.5281/zenodo.21787143') => async () => ({
  status: 200,
  body: { id: 22256731, conceptdoi, metadata: { title: seal.title + ': 2499 theorems', related_identifiers: identical.map((identifier) => ({ identifier, relation: 'isIdenticalTo' })) } },
})

// THE LIVE SEAL NO LONGER DECLARES A TWIN, so the mechanism is exercised on a seal that does. Both facts matter and
// they are separate tests: harvestTwin must still catch a self-declaring twin (the defect it was written for), and the
// seal this repository actually ships must have no twin to catch — the redundancy that produced one is gone.
// THE SYNTHETIC TWIN MUST BE A CHAIN THAT IS NOT OURS, and 21970356 became ours the day the archive moved to the
// chain Zenodo mints from the GitHub release. Injecting it declared identity with our OWN concept, which is the AGREES
// case wearing the FIRES test's name — the two tests silently swapped meaning. 21787143 is the abandoned API-deposit
// chain: genuinely another chain, genuinely not ours, which is what a twin is.
const TWIN = '10.5281/zenodo.21787143'
const twinned = { ...seal, related: [...(seal.related ?? []), { identifier: TWIN, relation: 'isIdenticalTo' as const, resource_type: 'software' as const }] }

test('the live software seal declares NO twin chain — the redundancy that made one is gone', async () => {
  assert.equal(await harvestTwin(seal, twinBody([TWIN])), null,
    'one chain means no twin: Zenodo mints the archive from the GitHub release and nothing else deposits it')
  assert.ok(!(seal.related ?? []).some((r) => r.relation === 'isIdenticalTo' && /^10\.5281\/zenodo\./.test(String(r.identifier))),
    'and the seal must not claim identity with another Zenodo chain, which is what could never be reciprocated')
})

test('the twin FIRES when its latest record names its own concept instead of ours', async () => {
  const r = await harvestTwin(twinned, twinBody([TWIN]))
  assert.ok(r, 'the software seal declares a twin chain, so there is a twin row')
  assert.equal(r.id, 'uuidna-software:twin')
  assert.equal(r.read, true)
  assert.equal(r.agrees, false, 'a pointer to itself is not a pointer to us')
  assert.equal(r.twinSelfDeclared, true, 'and the self-declaration is named, not folded into a generic mismatch')
})

test('the twin AGREES when its latest record declares isIdenticalTo our concept', async () => {
  const r = await harvestTwin(twinned, twinBody([seal.conceptDoi!]))
  assert.equal(r?.agrees, true)
  assert.equal(r?.twinSelfDeclared, false)
})

test('a seal without a twin declaration has no twin row', async () => {
  const r = await harvestTwin({ ...seal, related: (seal.related ?? []).filter((x) => x.relation !== 'isIdenticalTo') }, twinBody([]))
  assert.equal(r, null)
})

test('an unreachable twin is UNREAD, not disagreeing', async () => {
  const r = await harvestTwin(twinned, async () => ({ status: 403, body: null }))
  assert.equal(r?.read, false)
  assert.equal(r?.agrees, undefined)
})

// THE CENSUS COUNTS WHAT THE SEAL DECLARES, and the seal declares no twin any more, so the row that used to be
// asserted here must be ABSENT. That is the fact worth pinning: a census which still produced a twin row would mean
// the harvester was inventing scope the registry does not claim.
test('the census carries no twin row, because the seal declares no twin', async () => {
  const h = await harvestOwnedDois(async () => ok(seal.title, seal.standingDoi!)())
  assert.ok(!h.rows.some((r) => r.id.endsWith(':twin')),
    'one chain, one row — a twin row here would be scope the seal does not declare')
  assert.equal(h.owned, h.rows.length, 'every identifier in scope is counted, and none beyond it')
  assert.ok(h.rows.some((r) => r.id === 'uuidna-software' && r.agrees === true),
    'and the standing record still reads back as ours')
})
