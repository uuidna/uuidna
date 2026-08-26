// publication-metadata — one rich schema + license identity for every seal (agnostic).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import {
  publicationMetadataAudit,
  richPublicationMetadata,
  richZenodoDepositMetadata,
  CANONICAL_LICENSE_SPDX,
  CANONICAL_LICENSE_ZENODO,
  PUBLICATION_METADATA_REQUIRED,
} from '../publication-metadata.js'
import { ZENODO_SEALS, depositableSeals } from '../zenodo-seals.js'
import { ZENODO_SEALS_PUBLISH_JOB, ZENODO_PUBLISH_WORKFLOW } from '../zenodo-publish.js'

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
    assert.ok(rich.relatedIdentifiers.some((r) => r.identifier.includes('uuidna.com')), `${seal.id} one-way`)
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

test('clay-involution is an instance in the registry, not a one-off license', () => {
  const clay = ZENODO_SEALS.find((s) => s.id === 'clay-involution')
  assert.ok(clay)
  assert.equal(clay!.standingDoi, '10.5281/zenodo.21781603')
  assert.equal(Object.prototype.hasOwnProperty.call(clay, 'license'), false)
  const rich = richPublicationMetadata(clay!)
  assert.equal(rich.license.toUpperCase(), 'CC-BY-NC-ND-4.0')
})
