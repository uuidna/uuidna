#!/usr/bin/env node
// gen-zenodo-seals — GENERATE zenodo/manifest.json + zenodo/seals/<id>.json for EVERY depositable seal.
// DOES NOT PUBLISH. Zenodo deposits are WORKFLOW-ONLY (publish.yml job `zenodo-seals` loops the manifest).
// Agnostic: adding a seal to ZENODO_SEALS (role=publication, owned) is enough — no per-publication script.
// Rich metadata + canonical license via publication-metadata (CC-BY-NC-ND-4.0 for all).
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { depositableSeals, type ZenodoSeal } from '../zenodo-seals.js'
import { richZenodoDepositMetadata, publicationMetadataAudit, CANONICAL_LICENSE_ZENODO } from '../publication-metadata.js'

const OUT = join(ROOT, 'zenodo')
const SEALS_DIR = join(OUT, 'seals')

if (existsSync(SEALS_DIR)) rmSync(SEALS_DIR, { recursive: true })
mkdirSync(SEALS_DIR, { recursive: true })

const seals = depositableSeals()
const manifest = seals.map((s: ZenodoSeal) => {
  const meta = richZenodoDepositMetadata(s)
  const metaRel = `zenodo/seals/${s.id}.json`
  writeFileSync(join(ROOT, metaRel), JSON.stringify(meta, null, 2) + '\n')
  return {
    id: s.id,
    standingRecordId: s.standingRecordId,
    conceptId: s.conceptId,
    standingDoi: s.standingDoi,
    conceptDoi: s.conceptDoi,
    pageUrl: s.pageUrl,
    license: CANONICAL_LICENSE_ZENODO(),
    metaFile: metaRel,
    bundlePaths: s.bundlePaths ?? [],
    leanFiles: s.leanFiles ?? [],
  }
})

const manPath = join(OUT, 'manifest.json')
writeFileSync(manPath, JSON.stringify({ seals: manifest, count: manifest.length, license: CANONICAL_LICENSE_ZENODO() }, null, 2) + '\n')

const audit = publicationMetadataAudit()
if (!audit.ok) {
  console.error('✗ gen-zenodo-seals — publication metadata incomplete:')
  for (const g of audit.gaps.slice(0, 12)) console.error(`  · ${g.id}: ${g.what}`)
  process.exit(1)
}
console.log(
  `✓ gen-zenodo-seals — ${manifest.length} depositable seal(s), license ${CANONICAL_LICENSE_ZENODO()}, ` +
  `metadata audit clean → zenodo/manifest.json` +
  (manifest.length ? ` (${manifest.map((m) => m.id).join(', ')})` : ''),
)
