// crossref — A CITATION THAT CAN BE CHECKED, on trial. The witness leg is granted by a keyword roster over text,
// so writing "DOI 10.1234/nothing" earns the scarcest leg in this ledger without opening a source — the vacuity
// trap rosetta.ts names in its own words. Resolving the DOI is the difference between a citation and a string
// shaped like one, and these tests run entirely offline: the fetch is injected, so a test that needs the internet
// to pass is a test that fails on a train.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { doisIn, crossrefUrl, parseCrossref, verifyCitations } from '../crossref.js'

// the real envelope shape, reduced — taken from the record api.crossref.org actually returned for this DOI
const WATSON_CRICK = {
  message: {
    DOI: '10.1038/171737a0',
    title: ['Molecular Structure of Nucleic Acids: A Structure for Deoxyribose Nucleic Acid'],
    author: [{ given: 'J. D.', family: 'Watson' }, { given: 'F. H. C.', family: 'Crick' }],
    'container-title': ['Nature'],
    volume: '171', page: '737-738',
    'published-print': { 'date-parts': [[1953, 4, 25]] },
  },
}

test('a DOI is found in prose and stripped of the punctuation that ends the sentence', () => {
  assert.deepEqual(doisIn('base pairing — witness: Watson & Crick, DOI 10.1038/171737a0.'), ['10.1038/171737a0'])
  // THE TRAILING STOP IS THE BUG THIS PREVENTS: a DOI at the end of a clause collects the full stop, and a
  // resolver would then ask for a work nobody registered and report the citation unresolved.
  assert.deepEqual(doisIn('see 10.1073/pnas.47.10.1588, and also 10.1038/345229a0)'), ['10.1073/pnas.47.10.1588', '10.1038/345229a0'])
  assert.deepEqual(doisIn('no citation here at all'), [])
  // the same DOI twice is one DOI — a report should not resolve it twice or count it twice
  assert.equal(doisIn('10.1038/171737a0 and again 10.1038/171737a0').length, 1)
})

test('the endpoint encodes the slash, which Crossref requires and a raw path would break', () => {
  assert.equal(crossrefUrl('10.1038/171737a0'), 'https://api.crossref.org/works/10.1038%2F171737a0')
  // a DOI always contains a slash, so an unencoded suffix reads as extra path segments
  assert.ok(!crossrefUrl('10.1038/171737a0').includes('works/10.1038/'), 'the slash must not survive as a path separator')
})

test('mailto is added only when a caller gives one — a library must not disclose an identity nobody chose', () => {
  assert.ok(!crossrefUrl('10.1038/171737a0').includes('mailto'), 'no address by default')
  assert.match(crossrefUrl('10.1038/171737a0', 'x@example.org'), /\?mailto=x%40example\.org$/)
})

test('the envelope is read into the fields a citation is checked against', () => {
  const c = parseCrossref(WATSON_CRICK)
  assert.ok(c)
  assert.equal(c.doi, '10.1038/171737a0')
  assert.equal(c.journal, 'Nature')
  assert.equal(c.volume, '171')
  assert.equal(c.year, 1953)
  assert.deepEqual(c.authors, ['J. D. Watson', 'F. H. C. Crick'])
  // a thin record is still a record: refusing to parse it would report "unregistered" for a registered work
  assert.equal(parseCrossref({ message: { DOI: '10.1/x' } })?.journal, '')
  assert.equal(parseCrossref({ nonsense: true }), null)
})

test('a registered DOI resolves and an invented one does not — the whole point of the module', async () => {
  const get = async (url: string): Promise<unknown | null> =>
    url.includes('171737a0') ? WATSON_CRICK : null
  const r = await verifyCitations('witness: Watson & Crick DOI 10.1038/171737a0 and DOI 10.9999/invented', get)
  assert.equal(r.found, 2)
  assert.equal(r.resolved, 1)
  assert.equal(r.checkable, true)
  const bad = r.checks.find((c) => c.doi === '10.9999/invented')
  assert.equal(bad?.resolved, false)
  assert.match(bad?.why ?? '', /a string shaped like a DOI is not a citation/)
})

test('AN ANSWER FOR A DIFFERENT DOI IS NOT AN ANSWER — the resolver must not vouch for what was not asked', async () => {
  // a redirect, a cached body or a lazy mock can all return the wrong record; accepting it would let one real
  // citation launder every DOI beside it
  const get = async (): Promise<unknown> => WATSON_CRICK
  const r = await verifyCitations('DOI 10.9999/invented', get)
  assert.equal(r.resolved, 0)
  assert.match(r.checks[0]!.why, /which is not the DOI that was asked for/)
})

test('no DOI at all reports NOT CHECKABLE, never a clean bill of health', async () => {
  const r = await verifyCitations('this note cites nothing', async () => null)
  assert.equal(r.found, 0)
  assert.equal(r.resolved, 0)
  assert.equal(r.checkable, false)
  assert.match(r.honest, /NOT CHECKABLE/)
  assert.match(r.honest, /never evidence that the claim is witnessed/)
})

test('the honest note refuses the stronger reading a resolved DOI invites', async () => {
  const get = async (): Promise<unknown> => WATSON_CRICK
  const r = await verifyCitations('DOI 10.1038/171737a0', get)
  assert.equal(r.resolved, 1)
  // THE LIMIT THAT MATTERS. Resolving proves the record exists. It does not read the paper, and it cannot tell
  // whether the cited work SUPPORTS the claim citing it — the same gap the citation gate has, which stamped
  // "uuidna achieves quantum advantage, by theorem n_qubit_dimension" VERIFIED against a theorem whose own last
  // clause denies it. No metadata service closes that gap and this one says so rather than implying otherwise.
  assert.match(r.honest, /does not read the paper/)
  assert.match(r.honest, /cannot tell whether the cited work supports the/)
})
