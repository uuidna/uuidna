#!/usr/bin/env node
// @non-harmonic: spawns git and gate scripts as subprocesses — NAMED boundary (like deploy-run / wave-run).
//
// release-cut — AUTOMATE THE VERSION TAG (captain 2026-08-27: "address release errors and automate").
//
// THE TAG GATE IS THE PUBLISH GATE. prepublishOnly is `npm run gate-all` — that is the one source of truth
// npm consults. Hexbit-fast `next --verify` may push main; it must not cut a version. v0.3.0 was tagged
// green on the fast path and refused on CI's gate-all. One ready, one cut.
//
//   npm run release-cut           → gate-all; print the tag that would be cut (no push)
//   npm run release-cut -- --push → gate-all, annotated tag v$version, push tag (triggers publish.yml)
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

// ── 3 · THE PUBLISH GATE — AND IT MUST BE THE GATE THE TAG ACTUALLY TRIGGERS ─────────────────────────────────
// THIS STEP USED TO CLAIM IT WAS "the same instrument as prepublishOnly" AND IT WAS NOT. gate-all names neither
// `editorial` nor `prepublish-seal` — measured, zero occurrences of either — while .github/workflows/publish.yml
// runs BOTH as its first job and makes `publish` depend on them. So the tag was cut by one gate and then handed to
// a different, stricter one, which is the whole answer to why a deploy failed after every cut: the publish gate was
// already red BEFORE the tag existed, and nothing at cut time asked it.
//
// MEASURED 2026-09-25: prepublishSeal() reported 41 gaps, and 40 of them were one class — `seo-freeze: URL FREEZE —
// new route not in sealed map`, for routes added by the waves since the freeze was last regenerated. Every wave that
// seals a theorem mints a /theorem/<key> route, so the publish gate goes red on ordinary work while gate-all stays
// green. A cut then guarantees a failed deploy rather than risking one.
//
// THE FIX IS SUBTRACTION. There is now ONE gate before a tag, and it is the union of what the tag triggers, so the
// two can no longer disagree — "cut on green only", where green means the green the tag will be judged by.
await step('gate-all', 'node dist/scripts/gate-all.js')
await step('editorial (publish.yml job 1)', 'npm run editorial')
await step('prepublish-seal (publish.yml job 1)', 'npm run prepublish-seal')

// ── 4 · CHANGELOG CARRIES THIS VERSION + THIS LEDGER RECEIPT ──────────────────────────────────────────────────
await step('sync changelog ledger line', 'node dist/scripts/sync-changelog.js')
const afterSync = (await step('tree after sync', 'git status --porcelain')).trim()
if (afterSync) {
  console.error('✗ release-cut — sync-changelog moved the tree; commit the receipt line, then re-run')
  console.error(afterSync)
  process.exit(1)
}

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
