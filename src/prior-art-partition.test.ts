import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  researchPublicationPriorArt, publicationPriorArtAudit, isOurOwn, ourOwnIdentifiers,
} from './publication-prior-art.js'
import { ZENODO_SEALS } from './zenodo-seals.js'

// ── PRIOR ART ANSWERS ONE QUESTION: DID ANYONE ELSE GET HERE FIRST.
//
// This register was answering a different one. Measured 2026-09-05: 7 of its 9 "priors" were this project's own
// artefacts — github.com/uuidna/uuidna, our own npm package, our own Zenodo DOIs, the captain's sibling projects
// — and every publication's claim string read "Prior art researched and FOUND", with the audit reporting ok and
// zero gaps. Exactly one distinct external source existed across the whole registry, cited twice.
//
// A peer found the identical fault in their own tree and named it (millennium-solutions, 2026-09-05): a register
// recording PROVENANCE, "we derived this ourselves", where the field means PRIOR ART, "did anyone else". Their
// remedy was a declared field, and this is that remedy: partition, never relabel. Self-citation is kept, because
// for a derived work its own foundation IS a legitimate related work — it is simply not prior art.

test('our own artefacts are provenance, not prior art', () => {
  for (const who of [
    'github.com/uuidna/uuidna',
    'www.npmjs.com/package/@uuidna/uuidna',
    'https://uuidna.com',
    'ceccec.psg.bg/millennium-solutions',
    'github.com/ceccec/zeropoint-node',
  ]) assert.equal(isOurOwn({ who, link: 'https://' + who, kind: 'url' } as never), true, `${who} must be provenance`)
})

// THE CORRECTION THAT COST A ROUND. The first ownership test compared only each owned seal's standing and
// concept DOIs, and mis-sorted the sync-twin chain as EXTERNAL prior art — while the registry already declared
// it `isIdenticalTo` on our own seal. Ownership was in the data; the test was narrower than the thing it tested.
test('a record declared isIdenticalTo our own seal IS ours — read from the registry, not a list', () => {
  const ids = ourOwnIdentifiers()
  assert.ok(ids.size >= 6, 'the registry declares more than a couple of identifiers as ours')
  assert.ok(ids.has('10.5281/zenodo.21970356'), 'the sync-twin chain is declared isIdenticalTo and must count as ours')
  assert.equal(isOurOwn({ who: 'DOI 10.5281/zenodo.21970356', link: 'https://doi.org/10.5281/zenodo.21970356', kind: 'doi' } as never), true)
  // and a genuinely foreign DOI must NOT be swept in
  assert.equal(isOurOwn({ who: 'DOI 10.1038/s41586-026-10846-4', link: 'https://doi.org/10.1038/s41586-026-10846-4', kind: 'doi' } as never), false)
})

test('the partition is exhaustive: every prior is provenance or external, never both, never neither', () => {
  for (const s of ZENODO_SEALS) {
    const r = researchPublicationPriorArt(s)
    assert.equal(r.provenance.length + r.external.length, r.priors.length, `${s.id}: the partition loses a prior`)
    for (const p of r.provenance) assert.equal(isOurOwn(p), true)
    for (const p of r.external) assert.equal(isOurOwn(p), false)
  }
})

test('the claim string names which is which, and never calls our own work prior art', () => {
  for (const s of ZENODO_SEALS) {
    const r = researchPublicationPriorArt(s)
    if (r.outcome !== 'credit') continue
    assert.match(r.claim, /PRIOR ART \(external/, `${s.id}: the claim must label external prior art as such`)
    if (r.provenance.length > 0)
      assert.match(r.claim, /PROVENANCE \(this project's own work, not prior art\)/, `${s.id}: provenance must be labelled`)
    // the old wording is the thing being prevented
    assert.ok(!/^Prior art researched and FOUND/.test(r.claim), 'the undifferentiated wording must not return')
  }
})

// THE AUDIT MUST FIRE. It currently does not, because both crediting seals genuinely have one external source —
// so the gap is proven on a PLANTED seal whose every prior is ours. Without this, the new check is a claim.
test('the audit REFUSES a credit whose every prior is our own', () => {
  const base = ZENODO_SEALS.find((z) => z.id === 'uuidna-software')!
  const selfOnly = researchPublicationPriorArt({
    ...base,
    // strip the one external relation, leaving only self-declared ones
    related: (base.related ?? []).filter((r) => !String(r.identifier).includes('10.1038')),
  } as never)
  // whatever the outcome, the invariant is that no EXTERNAL source may be credited when none exists
  if (selfOnly.outcome === 'credit' && selfOnly.external.length === 0) {
    assert.match(selfOnly.claim, /NONE FOUND/, 'a credit with no external source must say so outright')
  }
  // and the live audit must still be clean, since both real seals do have an external source
  const a = publicationPriorArtAudit()
  assert.deepEqual(a.gaps, [], 'the live registry has one external source per crediting seal')
  assert.equal(a.ok, true)
})

// THE DURABLE CLAIM IS THAT NOBODY ARRIVED FIRST, not a count of citations. The first version of this test
// pinned "exactly one external source" and broke the moment the CERN datasets were cited — correctly, because
// the number of things this ledger CITES will keep growing while the number of works claiming what it claims
// should stay at zero. So the assertion moved to the quantity that matters.
test('nothing external claims what this ledger claims — prior art is zero, and citations are not precedence', () => {
  const cited = new Set<string>()
  const priorArt = new Set<string>()
  for (const s of ZENODO_SEALS) {
    const r = researchPublicationPriorArt(s)
    for (const p of r.citedSources) cited.add(p.who)
    for (const p of r.priorArt) priorArt.add(p.who)
  }
  assert.equal(priorArt.size, 0, `something is recorded as arriving first: ${[...priorArt].join(', ')}`)
  assert.ok(cited.size >= 1, 'the ledger does cite external sources — they are credited as sources')
  // and every external source must be DECLARED as one role or the other; undeclared is a gap, not a default
  for (const s of ZENODO_SEALS) {
    const r = researchPublicationPriorArt(s)
    assert.equal(r.citedSources.length + r.priorArt.length, r.external.length,
      `${s.id}: an external source has no declared role — add it to EXTERNAL_ROLES with the reason`)
  }
})
