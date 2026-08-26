#!/usr/bin/env node
// gen-seo-freeze — SEAL the final URL↔hexbit map (lean/seo-url-map.json).
// Run deliberately when the site's navigable identity set grows (new theorem/publication/page).
// After seal, finalSeoAudit refuses route renames; permanence is https://uuidna.com/<handle>.
import { buildSeoUrlMap, writeSeoUrlMap, SEO_URL_MAP_PATH } from '../seo-freeze.js'

const map = writeSeoUrlMap(buildSeoUrlMap())
console.log(`✓ ${SEO_URL_MAP_PATH} — ${map.entries.length} routes frozen · receipt ${map.receipt}`)
console.log(`  hexbit doors: https://uuidna.com/<handle> (handleOf content-address)`)
console.log(`  ${map.honest}`)
