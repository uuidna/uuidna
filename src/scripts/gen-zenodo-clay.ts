#!/usr/bin/env node
// gen-zenodo-clay — GENERATE .zenodo.clay.json, the clay σ-involution publication metadata.
// DOES NOT PUBLISH. Zenodo DOI minting for this concept is WORKFLOW-ONLY
// (`.github/workflows/publish.yml` job `zenodo-clay` versions standing record 21781603 / concept 21781602).
// Local deposit attempts: `npm run zenodo-deposit` (refused outside that job).
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import {
  CLAY_INVOLUTION_CONCEPT_DOI,
  CLAY_INVOLUTION_DOI,
  CLAY_INVOLUTION_RECORD_ID,
  clayInvolutionZenodoMetadata,
} from '../clay-involution.js'

const zenodo = clayInvolutionZenodoMetadata()
const out = JSON.stringify(zenodo, null, 2) + '\n'
writeFileSync(join(ROOT, '.zenodo.clay.json'), out)
console.log(
  `✓ Generated .zenodo.clay.json (${out.length} bytes) — standing ${CLAY_INVOLUTION_DOI} ` +
  `(record ${CLAY_INVOLUTION_RECORD_ID}) / concept ${CLAY_INVOLUTION_CONCEPT_DOI}`,
)
