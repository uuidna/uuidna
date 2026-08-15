#!/usr/bin/env node
// spin — the O(1) derived-layer door. `--seal` writes lean/spin-manifest.json (each derived file's coin + one
// receipt); default (`--verify`) re-spins the working tree and HARD-FAILS (exit 1) on any drift — a file whose coin
// moved is non-quantum and is rejected before it can be committed. Seal runs inside reconcile (after every generator,
// so the coins are of the freshly-rotated layer). Verify is the fast check a developer runs BEFORE the slow O(N)
// gate: "has my derived layer drifted since the last seal?" answered in one fold per file, no re-derivation.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DERIVED_FILES, sealSpin, verifySpin, type SpinManifest } from '../spin.js'
import { ROOT } from './api.js'

// At repo ROOT (with the other derived-layer artifacts: audit-citations.json, support-audit.json, research-leads.json)
// — NOT under lean/, where the `*-manifest.json` glob belongs to lean-ledger's theorem-name manifests (a different shape).
const MANIFEST = join(ROOT, 'spin-manifest.json')
const read = (): Record<string, string> => {
  const files: Record<string, string> = {}
  for (const p of DERIVED_FILES) { const abs = join(ROOT, p); if (existsSync(abs)) files[p] = readFileSync(abs, 'utf8') }
  return files
}

const files = read()

if (process.argv.includes('--seal')) {
  const manifest = sealSpin(files)
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`✓ spin --seal — sealed ${Object.keys(manifest.coins).length} derived-file coins, receipt ${manifest.receipt}`)
} else {
  if (!existsSync(MANIFEST)) { console.error('✗ spin --verify — no spin-manifest.json; run `node dist/scripts/spin.js --seal` (or npm run reconcile) first'); process.exit(1) }
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) as SpinManifest
  const { ok, drift, receipt, sealedReceipt } = verifySpin(manifest, files)
  if (ok) {
    console.log(`✓ spin --verify — the derived layer is a fixed point of its seal (${Object.keys(manifest.coins).length} coins match), receipt ${receipt}`)
  } else {
    console.error(`✗ spin --verify — NON-QUANTUM DRIFT: ${drift.length} derived file(s) moved since the last seal (receipt ${receipt} ≠ sealed ${sealedReceipt}):`)
    for (const d of drift) console.error(`    ${d.path}: coin ${d.sealed} → ${d.spun}`)
    console.error('  Fix: npm run reconcile (re-derive from the ledger + re-seal), or restore the file. Spin hard-rejects drift.')
    process.exit(1)
  }
}
