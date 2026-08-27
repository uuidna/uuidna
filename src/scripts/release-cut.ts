#!/usr/bin/env node
// @non-harmonic: spawns git and gate scripts as subprocesses — NAMED boundary (like deploy-run / wave-run).
//
// release-cut — AUTOMATE THE VERSION TAG (captain 2026-08-27: "address release errors and automate").
//
// The first v0.2.9 tag failed because `npm run audit` reached `dist/` before any compile on a fresh CI
// checkout. That class is fixed at the source (audit builds first). This runner is the OTHER half: the
// human-shaped cut (leads-gate → changelog receipt → annotated tag → push) was hand-typed every release
// and drifted. One command; honest failure; no retries around the outward push.
//
//   npm run release-cut           → verify ready; print the tag that would be cut (no push)
//   npm run release-cut -- --push → verify, annotated tag v$version, push tag (triggers release.yml)
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, streamStep } from './api.js'

const PUSH = process.argv.includes('--push')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string }
const VERSION = pkg.version
const TAG = `v${VERSION}`

async function step(name: string, cmd: string): Promise<string> {
  const r = await streamStep(`release-cut · ${name}`, cmd)
  if (!r.ok) { console.error(`✗ release-cut — ${name} failed; the tag is NOT cut`); process.exit(1) }
  return r.out
}

// ── 1 · ONLY WHAT ORIGIN HOLDS ────────────────────────────────────────────────────────────────────────────────
await step('fetch origin', 'git fetch origin main')
const ahead = (await step('ahead of origin', 'git rev-list --count origin/main..HEAD')).trim()
const behind = (await step('behind origin', 'git rev-list --count HEAD..origin/main')).trim()
if (ahead !== '0' || behind !== '0') {
  console.error(`✗ release-cut — tree is ${ahead} ahead / ${behind} behind origin; a tag on a private tip is unrecomputable`)
  process.exit(1)
}
const dirty = (await step('working tree', 'git status --porcelain')).trim()
if (dirty) {
  console.error('✗ release-cut — working tree dirty; commit or restore before cutting a version')
  process.exit(1)
}

// ── 2 · NO RELEASE OVER AN OPEN LEAD ──────────────────────────────────────────────────────────────────────────
await step('leads-gate', 'node dist/scripts/leads-gate.js')

// ── 3 · DERIVED LAYER CURRENT (rename / grow must not leave heartbeats or SEO freeze stale) ───────────────────
await step('lean-heartbeats --sync', 'node dist/scripts/lean-heartbeats.js --sync')
await step('gen-seo-freeze', 'node dist/scripts/gen-seo-freeze.js')
await step('account', 'node dist/scripts/account.js')
const afterDerive = (await step('tree after derive', 'git status --porcelain')).trim()
if (afterDerive) {
  console.error('✗ release-cut — heartbeats/SEO freeze moved the tree; commit the derived layer, then re-run')
  console.error(afterDerive)
  process.exit(1)
}

// ── 4 · CHANGELOG CARRIES THIS VERSION + THIS LEDGER RECEIPT ──────────────────────────────────────────────────
await step('sync changelog ledger line', 'node dist/scripts/sync-changelog.js')
const afterSync = (await step('tree after sync', 'git status --porcelain')).trim()
if (afterSync) {
  console.error('✗ release-cut — sync-changelog moved the tree; commit the receipt line, then re-run')
  console.error(afterSync)
  process.exit(1)
}
await step('next --verify', 'node dist/scripts/next.js --verify')

// ── 5 · TAG ───────────────────────────────────────────────────────────────────────────────────────────────────
const existing = (await step('local tag?', `git tag -l ${TAG}`)).trim()
if (existing) {
  const at = (await step('tag commit', `git rev-parse ${TAG}^{commit}`)).trim()
  const head = (await step('HEAD', 'git rev-parse HEAD')).trim()
  if (at === head) {
    console.log(`\nrelease-cut · ${TAG} already points at HEAD (${head.slice(0, 8)})`)
  } else {
    console.error(`✗ release-cut — ${TAG} exists at ${at.slice(0, 8)} ≠ HEAD ${head.slice(0, 8)}; move it deliberately (git tag -d / push :refs/tags)`)
    process.exit(1)
  }
} else if (PUSH) {
  await step(`annotate ${TAG}`, `git tag -a ${TAG} -m "${TAG} — leads settled; READY"`)
} else {
  console.log(`\nrelease-cut · DRY: would annotate ${TAG} at HEAD. Pass --push to cut and publish.`)
}

if (PUSH) {
  await step(`push ${TAG}`, `git push origin ${TAG}`)
  console.log(`\nrelease-cut — COMPLETE: ${TAG} published. release.yml is the gate; ship is the live edge.`)
} else {
  console.log(`\nrelease-cut — READY to cut ${TAG}. Re-run with --push to annotate and push.`)
}
