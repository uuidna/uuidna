// publication-metadata — one rich schema + license identity for every seal (agnostic).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'
import {

  publicationMetadataAudit,
  richPublicationMetadata,
  richZenodoDepositMetadata,
  CANONICAL_LICENSE_SPDX,
  CANONICAL_LICENSE_ZENODO,
  PUBLICATION_METADATA_REQUIRED,
} from '../../../index.js'
import { ZENODO_SEALS, depositableSeals } from '../../../index.js'
import { ZENODO_SEALS_PUBLISH_JOB, ZENODO_PUBLISH_WORKFLOW } from '../../../zenodo-publish.js'

// THE LAW IS "THE CAPTAIN IS LAST AMONG CLAIMANTS", and with one credit system carrying roles that is a filter
// rather than a position. Cited sources now sit in the same ordered list with role 'cited-source', so the last
// ELEMENT may legitimately be a dataset while the last CLAIMANT is still the captain. Checking the position was
// only ever a proxy for the law; it is the law that is checked now.
const lastClaimant = (order: readonly { who: string; role?: string }[]): string | undefined => {
  const claimants = order.filter((c) => (c.role ?? 'claimant') === 'claimant')
  return claimants.length ? claimants[claimants.length - 1]!.who : undefined
}

test('canonical license is CC-BY-NC-ND-4.0 and matches package.json', () => {
  assert.equal(CANONICAL_LICENSE_SPDX().toUpperCase(), 'CC-BY-NC-ND-4.0')
  assert.equal(CANONICAL_LICENSE_ZENODO(), 'cc-by-nc-nd-4.0')
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { license: string }
  assert.equal(pkg.license.toUpperCase(), 'CC-BY-NC-ND-4.0')
})

test('every registry seal gets rich metadata with the SAME license — no drift', () => {
  const canon = CANONICAL_LICENSE_SPDX()
  for (const seal of ZENODO_SEALS) {
    const rich = richPublicationMetadata(seal)
    assert.equal(rich.complete, true)
    assert.equal(rich.license.toUpperCase(), canon.toUpperCase())
    assert.equal(rich.licenseUrl, 'https://uuidna.com/license')
    for (const f of PUBLICATION_METADATA_REQUIRED) {
      assert.ok(rich[f] !== undefined && rich[f] !== null, `${seal.id} missing ${f}`)
    }
    assert.ok(rich.abstract.length >= 80, `${seal.id} abstract thin`)
    assert.ok(rich.keywords.length >= 3, `${seal.id} keywords thin`)
    assert.ok(rich.relatedIdentifiers.some((r) => {
      try { return new URL(r.identifier).hostname === 'uuidna.com' } catch { return false }
    }), `${seal.id} one-way`)
    assert.equal(Object.prototype.hasOwnProperty.call(seal, 'license'), false, `${seal.id} must not declare per-seal license`)
  }
})

test('Zenodo deposit metadata mirrors rich set + canonical license', () => {
  for (const seal of depositableSeals()) {
    const meta = richZenodoDepositMetadata(seal)
    assert.equal(meta.license, 'cc-by-nc-nd-4.0')
    assert.ok(typeof meta.title === 'string' && (meta.title as string).length > 0)
    assert.ok(typeof meta.description === 'string' && (meta.description as string).length >= 80)
    assert.ok(Array.isArray(meta.keywords) && (meta.keywords as unknown[]).length >= 3)
    assert.ok(typeof meta.language === 'string')
    assert.ok(typeof meta.publication_date === 'string')
    assert.ok(Array.isArray(meta.related_identifiers))
  }
})

test('publicationMetadataAudit is clean (completeness + bidirectional + license identity)', () => {
  const a = publicationMetadataAudit()
  assert.equal(a.ok, true, a.gaps.map((g) => `${g.id}: ${g.what}`).join('\n'))
  assert.equal(a.license.toUpperCase(), 'CC-BY-NC-ND-4.0')
  assert.ok(a.count >= 2)
})

test('publish.yml has zenodo-seals (agnostic loop), not clay-only job', () => {
  const yml = readFileSync(join(ROOT, ZENODO_PUBLISH_WORKFLOW), 'utf8')
  assert.match(yml, new RegExp(`^\\s+${ZENODO_SEALS_PUBLISH_JOB}:`, 'm'))
  assert.doesNotMatch(yml, /^\s+zenodo-clay:/m)
  assert.match(yml, /zenodo\/manifest\.json/)
  assert.match(yml, /cc-by-nc-nd-4\.0/)
})

test('gen-zenodo-seals exists and does not call the deposit API', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'gen-zenodo-seals.ts'), 'utf8')
  assert.equal(/zenodo\.org\/api\/deposit/.test(src), false)
  assert.match(src, /richZenodoDepositMetadata|publicationMetadataAudit/)
})

test('every seal researches prior art — credit (priors first, captain next) or claim', () => {
  for (const seal of ZENODO_SEALS) {
    const rich = richPublicationMetadata(seal)
    assert.equal(rich.priorArt.researched, true)
    assert.ok(rich.priorArt.outcome === 'credit' || rich.priorArt.outcome === 'claim')
    assert.ok(rich.priorArt.creditOrder.length >= 1)
    assert.equal(lastClaimant(rich.priorArt.creditOrder), 'the captain')
    if (rich.priorArt.outcome === 'credit') {
      assert.ok(rich.priorArt.priors.length >= 1)
      assert.notEqual(rich.priorArt.creditOrder[0]!.who, 'the captain')
      assert.ok(rich.keywords.includes('prior-art-credited'))
    } else {
      // A CLAIM MEANS NOBODY ARRIVED FIRST — not that nothing is cited. This asserted `priors.length === 0`,
      // which conflated "no prior art" with "no sources at all", so citing a dataset forfeited the claim. The
      // invariant that matters is that no external work CLAIMS this first; provenance and cited sources may be
      // many, and here they are eight.
      assert.equal(rich.priorArt.priorArt.length, 0, 'a claim outcome requires zero genuine prior art')
      assert.ok(rich.keywords.includes('captain-claim'))
    }
  }
})

test('related publications are crosslinked in identifiers and keywords whenever siblings exist', () => {
  assert.ok(ZENODO_SEALS.length >= 2)
  for (const seal of ZENODO_SEALS) {
    const rich = richPublicationMetadata(seal)
    assert.equal(rich.relatedPublications.length, ZENODO_SEALS.length - 1)
    for (const p of rich.relatedPublications) {
      assert.ok(rich.keywords.includes(`related:${p.id}`), `${seal.id} missing keyword related:${p.id}`)
      assert.ok(
        rich.relatedIdentifiers.some((r) => r.identifier === p.doi || r.identifier === p.pageUrl),
        `${seal.id} missing related_identifier for ${p.id}`,
      )
    }
    assert.ok(rich.relatedIdentifiers.some((r) => r.relation === 'isAlternateIdentifier'))
    assert.match(rich.depositUrl, /^https:\/\/revolut\.me\/ceccec\?note=/)
  }
})

test('Zenodo deposit metadata carries communities, notes, references, contributors', () => {
  for (const seal of depositableSeals()) {
    const meta = richZenodoDepositMetadata(seal)
    assert.ok(Array.isArray(meta.communities) && (meta.communities as unknown[]).length >= 1)
    assert.ok(typeof meta.notes === 'string' && (meta.notes as string).length > 40)
    assert.ok(Array.isArray(meta.references))
    assert.ok(Array.isArray(meta.contributors) && (meta.contributors as unknown[]).length >= 1)
    assert.ok(Array.isArray(meta.related_identifiers) && (meta.related_identifiers as unknown[]).length >= 2)
  }
})

test('publicationPriorArtAudit is clean', async () => {
  const { publicationPriorArtAudit } = await import('../../../publication-prior-art.js')
  const a = publicationPriorArtAudit()
  assert.equal(a.ok, true, a.gaps.map((g) => `${g.id}: ${g.what}`).join('\n'))
  assert.equal(a.count, ZENODO_SEALS.length)
})

test('clay-involution is an instance in the registry, not a one-off license', () => {
  const clay = ZENODO_SEALS.find((s) => s.id === 'clay-involution')
  assert.ok(clay)
  assert.equal(clay!.standingDoi, '10.5281/zenodo.21781603')
  assert.equal(Object.prototype.hasOwnProperty.call(clay, 'license'), false)
  const rich = richPublicationMetadata(clay!)
  assert.equal(rich.license.toUpperCase(), 'CC-BY-NC-ND-4.0')
  // OUTCOME IS 'claim', NOT 'credit', AND THAT IS THE CORRECTION RATHER THAN A REGRESSION. In this tree's credit
  // law 'credit' means PRIOR ART IS CREDITED FIRST AND THE CAPTAIN COMES LAST — so it requires that somebody
  // else claimed this first. Measured 2026-09-05: nobody did. The clay seal cites external sources (a Nature
  // letter whose numbers are sealed as arithmetic, CERN datasets likewise) and every one of them is a CITED
  // SOURCE rather than prior art — CERN's records declare resourceTypeGeneral "Dataset" and all 82385 of them
  // return zero hits for formal verification, Lean, kernel-verified proof or axiom-free. The outcome test used
  // to be `priors.length > 0`, so citing anything at all forfeited the claim, which is backwards.
  assert.equal(rich.priorArt.outcome, 'claim', 'no external work claims this first, so the captain claims')
  assert.equal(rich.priorArt.priorArt.length, 0, 'nothing is recorded as arriving first')
  assert.ok(rich.priorArt.citedSources.length > 0, 'and the sources it does cite are credited as sources')
  assert.deepEqual(rich.priorArt.creditOrder.filter((c) => (c.role ?? 'claimant') === 'claimant').map((c) => c.who),
    ['the captain'], 'the captain is the only CLAIMANT; cited sources ride the same list with their own role')
})
