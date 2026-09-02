import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  DOI_PREFIXES, creditOrderFor, doiPrefixOf, doiPrefixTag, doiTagCensus, involuteOutcome, outcomeOf,
  doorsMintingUntagged, ownDoiRecords, priorArtByDoi, renderDoiPrefixAudit, renderOwnDoiRecords, renderPriorArtByDoi, resolveDoiPrefix,
  tagDoi, untaggedOwnPrefixes, verifyDoiPrefixes, type DoiRecord,
} from './index.js'
import { CAPTAIN_CREDIT } from '../../../captain/credits/index.js'

const rec = (doi: string, owner = 'x'): DoiRecord => ({
  doi, prefix: doiPrefixOf(doi), owner, agency: 'crossref', door: 'd', title: 't', url: 'u', venue: 'v', address: 'a',
})

test('doiPrefixOf reads the registered prefix, and refuses what is not a DOI', () => {
  assert.equal(doiPrefixOf('10.3847/1538-4357/abc123'), '10.3847')
  assert.equal(doiPrefixOf('https://doi.org/10.5281/zenodo.21787144'), '10.5281')
  assert.equal(doiPrefixOf('http://dx.doi.org/10.1371/journal.pone.0048868'), '10.1371')
  assert.equal(doiPrefixOf('  10.1088/1538-3873/x  '), '10.1088')
  // NEGATIVE CONTROLS: a bare prefix is not a DOI, and neither is a PMID or an arXiv id
  assert.equal(doiPrefixOf('10.3847'), '', 'a prefix with no suffix names no work')
  assert.equal(doiPrefixOf('42679246'), '')
  assert.equal(doiPrefixOf('arXiv:2401.00001'), '')
  assert.equal(doiPrefixOf('11.3847/x'), '', 'every DOI directory indicator is 10')
})

test('tagDoi resolves the prefix tag, and returns null for a non-DOI', () => {
  const t = tagDoi('10.3847/1538-4357/abc', 'crossref-journals', { title: 'A paper', venue: 'ApJ' })!
  assert.equal(t.prefix, '10.3847')
  assert.equal(t.owner, 'American Astronomical Society')
  assert.equal(t.agency, 'crossref')
  assert.equal(t.url, 'https://doi.org/10.3847/1538-4357/abc')
  assert.equal(tagDoi('not-a-doi', 'x'), null)
  // an unknown prefix is tagged as unknown rather than guessed
  const u = tagDoi('10.9999/x', 'x')!
  assert.equal(u.owner, '')
  assert.equal(u.agency, 'unknown')
})

test('every named prefix is well-formed, distinct, and says why THIS tree names it', () => {
  assert.equal(new Set(DOI_PREFIXES.map((p) => p.prefix)).size, DOI_PREFIXES.length)
  for (const p of DOI_PREFIXES) {
    assert.match(p.prefix, /^10\.\d{4,9}$/, `${p.prefix} is not a DOI prefix`)
    assert.ok(p.owner.length > 2, `${p.prefix} must name an owner`)
    assert.ok(p.why.length > 40, `${p.prefix} must say why it is on file here`)
    assert.ok(p.doors.length >= 1, `${p.prefix} must name a door that serves it`)
    assert.equal(doiPrefixTag(p.prefix), p)
  }
})

// THE FINDER THE CENSUS EARNED. ownDoiRecords reported a cite-only seal under 10.1038 with an EMPTY owner — this
// tree cited a Nature paper in its own registry and had no tag for the prefix. That class is now checked.
test('every prefix in this tree’s OWN deposit registry is tagged — we may not cite under a prefix we cannot name', () => {
  assert.deepEqual(untaggedOwnPrefixes(), [], 'add the prefix to DOI_PREFIXES with the reason this tree names it')
})

// THE SECOND FINDER A LIVE SWEEP EARNED. A sweep returned 10.48550/arxiv.… and arxiv.org was already a wired
// door — a door minting under a prefix this tree had not named. Zenodo, arXiv, PLOS and bioRxiv register their
// own DOIs; a wired minter's prefix belongs on file.
test('every wired door that mints its own DOIs has its prefix on file', () => {
  assert.deepEqual(doorsMintingUntagged(), [], 'add the minting door’s prefix to DOI_PREFIXES with its reason')
})

test('own deposits are read off the registry, each tagged with its prefix owner', () => {
  const o = ownDoiRecords()
  assert.ok(o.count >= 2, 'the two-chain law mints in pairs')
  assert.equal(o.count, o.records.length)
  for (const r of o.records) {
    assert.match(r.standingDoi, /^10\.\d{4,9}\//, `${r.id}: a standing DOI is a DOI`)
    assert.equal(r.prefix, doiPrefixOf(r.standingDoi))
    assert.ok(r.owner.length > 0, `${r.id}: its prefix must be on file — see untaggedOwnPrefixes`)
    assert.equal(r.link, `https://doi.org/${r.standingDoi}`)
  }
  assert.match(renderOwnDoiRecords(o), /^OWN DEPOSITS \d+ · prefix /)
})

// THE INVOLUTION. credit ↔ claim is self-inverse AND fixed-point-free: nothing is both, nothing is neither.
test('involuteOutcome is a fixed-point-free involution, and outcomeOf is its only lawful source', () => {
  for (const o of ['credit', 'claim'] as const) {
    assert.equal(involuteOutcome(involuteOutcome(o)), o, 'self-inverse: two applications are the identity')
    assert.notEqual(involuteOutcome(o), o, 'fixed-point-free: the two ends never collapse into one')
  }
  assert.equal(outcomeOf([rec('10.3847/a')]), 'credit')
  assert.equal(outcomeOf([]), 'claim')
  // the outcome IS the emptiness of the record set — involuting it without changing the records is false by construction
  assert.equal(involuteOutcome(outcomeOf([])), 'credit')
  assert.notEqual(outcomeOf([]), involuteOutcome(outcomeOf([])))
})

test('the credit law: priors first, the captain last among claimants, and never unclaimed', () => {
  const order = creditOrderFor([rec('10.3847/a', 'American Astronomical Society'), rec('10.1371/b', 'PLoS')])
  assert.equal(order.length, 3)
  assert.equal(order[0]!.who, 'American Astronomical Society', 'prior art is never behind the captain')
  assert.equal(order[order.length - 1]!.who, CAPTAIN_CREDIT.who, 'the captain is last among claimants')
  // THE UNCLAIMED, CLAIMED: with no priors the captain is the only claimant — never an empty credit order
  const alone = creditOrderFor([])
  assert.deepEqual(alone, [CAPTAIN_CREDIT])
  assert.ok(alone.length >= 1, 'never unclaimed')
  // the same DOI twice is one credit, not two
  assert.equal(creditOrderFor([rec('10.3847/a', 'AAS'), rec('10.3847/a', 'AAS')]).length, 2)
})

test('the tag census scores every door: tagged with prefixes, or an index with what it serves', () => {
  const c = doiTagCensus()
  assert.equal(c.prefixes, DOI_PREFIXES.length)
  assert.ok(c.doors > c.prefixes, 'the catalogue is wider than the prefixes it names')
  for (const t of c.tagged) assert.ok(t.prefixes.length >= 1)
  assert.ok(c.indexes.length >= 3, 'the index doors are a real class, scored separately')
  for (const m of c.indexes) {
    assert.ok(m.serves.length > 30, `${m.door} must say WHICH identifier it serves`)
    assert.equal(c.tagged.some((t) => t.door === m.door), false, `${m.door} appears in exactly one class`)
  }
  // the AAS door and its publisher's prefix are both reachable — the distinction the port exists to keep
  assert.ok(c.tagged.some((t) => t.door === 'journals-aas-org' && t.prefixes.includes('10.3847')))
  assert.ok(DOI_PREFIXES.some((p) => p.prefix === '10.1088' && /IOP/i.test(p.owner)))
})

// uuidna_doi is the wire name. These reach the registration agencies and the journal doors.
test('uuidna_doi verify — every named prefix agrees with its registration agency, or is reported unread', async () => {
  const a = await verifyDoiPrefixes()
  assert.equal(a.checked, DOI_PREFIXES.length)
  assert.deepEqual(a.disagreeing, [], 'a prefix whose agency names a different owner is a stale tag, not a detail')
  assert.equal(a.agreeing + a.declined.length, a.checked, 'agreement and unread must account for every prefix')
  for (const v of a.verdicts) {
    if (v.declined) { assert.ok(v.note.length > 0); continue }
    assert.ok(v.reportedOwner.length > 0, `${v.prefix}: an agreement must rest on something the agency said`)
  }
  assert.match(renderDoiPrefixAudit(a), /^DOI PREFIXES \d+\/\d+ agree/)
})

test('uuidna_doi subject — prior art comes back as tagged DOIs with the credit law applied', async () => {
  const p = await priorArtByDoi('merkle tree provenance receipt', 3)
  assert.equal(p.definition, 'uuidnaOS·doi·prior-art')
  assert.equal(p.outcome, outcomeOf(p.records), 'the outcome must BE the record set’s emptiness')
  assert.equal(p.notOutcome, involuteOutcome(p.outcome))
  assert.equal(p.claimedTheUnclaimed, p.records.length === 0)
  assert.equal(p.citableByDoi, p.records.length, 'the citable-by-DOI count IS the record set')
  assert.equal(p.creditOrder[p.creditOrder.length - 1]!.who, CAPTAIN_CREDIT.who, 'the captain is always last')
  for (const r of p.records) {
    assert.equal(r.prefix, doiPrefixOf(r.doi))
    assert.match(r.doi, /^10\.\d{4,9}\//, 'every record is a resolvable DOI, never a bare id')
  }
  if (p.records.length > 0) {
    assert.equal(p.outcome, 'credit')
    assert.ok(p.creditOrder.length >= 2, 'a credit names someone besides the captain')
  }
  assert.match(renderPriorArtByDoi(p), /credit order:/)
})

test('uuidna_doi enrich — a prefix this tree does not name is resolved from the agency, not guessed', async () => {
  const known = await resolveDoiPrefix('10.3847')
  assert.equal(known.note, 'on file')
  assert.equal(known.owner, 'American Astronomical Society')
  // Frontiers turned up in a real sweep and is deliberately NOT on the hand list — the agency answers for it
  const unknown = await resolveDoiPrefix('10.3389')
  if (/unreachable|responded|neither agency/.test(unknown.note)) { assert.equal(unknown.owner, ''); return }
  assert.match(unknown.owner, /Frontiers/i)
  assert.equal(unknown.agency, 'crossref')
  // NEGATIVE CONTROL: an unregistered prefix must resolve to nothing rather than to a plausible name
  const nobody = await resolveDoiPrefix('10.99999')
  assert.equal(nobody.owner, '')
  assert.equal(nobody.agency, 'unknown')
})
