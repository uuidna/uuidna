#!/usr/bin/env node
// copy-lean-to-site — SERVE THE PROOFS AND THE SEEDS. Every theorem page links to /lean/<File>.lean (its actual
// `by decide` source), but VitePress builds only markdown into its outDir (docs/.vitepress/dist — the default), so
// /lean/*.lean would 404 on the deployed site — the theorem and its proof were one click apart, and the click was
// broken. This copies lean/*.lean into <outDir>/lean/ AFTER the VitePress build, so every proof link resolves.
// It ALSO serves the PayloadCMS page seeds (src/seeds/<uuid>/page.json, the imprint-named append-only versions) at
// /seeds/<uuid>/page.json — the seed folder stays the ONE source (DRY); the build serves it, nothing duplicates it.
// It ALSO serves the repo-root llm.txt (the canonical agent entry point src/index.ts cites) at /llm.txt AND at
// /llms.txt (the emerging llms-txt standard path) — same DRY rule: the root file is the one source, the build serves it.
// It ALSO serves the Alpine catalogue (mirror/alpine-catalogue.tsv) at /alpine-catalogue.tsv — the committed census
// uuidnaOS primes in the browser. docs/public/alpine-catalogue.tsv is a BUILD ARTIFACT (gitignored); VitePress will
// only copy it when a prior local `gen-alpine-catalogue` left it there, so a clean Cloudflare Workers Build would
// ship a 404 for the catalogue and report Alpine as ABSENT. Copy from the committed mirror after the VitePress
// build so production cannot disagree with the repo.
// It ALSO serves lean/unlocks.json at /lean/unlocks.json — the unlock board census linked from /unlocks.
// Idempotent; runs in docs:build (and thus in the Cloudflare deploy build). Integrity— it serves the
// source, it proves nothing new.
import { readdirSync, mkdirSync, copyFileSync, existsSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { CATALOGUE_FILE, CATALOGUE_OVERLAY_FILE, CATALOGUE_TESTING_FILE, parseCatalogue, mergeCatalogueLayers, catalogueTsvBody } from '../quantum/os/catalogue/index.js'

const LEAN = join(ROOT, 'lean')
const SEEDS = join(ROOT, 'src', 'seeds')
// the VitePress outDir — the DEFAULT (<srcDir>/.vitepress/dist); keep in lock-step with `vitepress build docs`
const SITE = join(ROOT, 'docs', '.vitepress', 'dist')

if (!existsSync(SITE)) {
  console.error('✗ copy-lean-to-site — ./docs/.vitepress/dist (the VitePress outDir) does not exist; run `vitepress build docs` first (this step runs after it in docs:build)')
  process.exit(1)
}

const OUT = join(SITE, 'lean')
mkdirSync(OUT, { recursive: true })
let n = 0
for (const f of readdirSync(LEAN)) if (f.endsWith('.lean')) { copyFileSync(join(LEAN, f), join(OUT, f)); n++ }

// Derived lean JSON the site cites as /lean/<name>.json (e.g. unlocks board). Proofs are .lean; these are
// structured receipts linked from markdown. Missing source FAILS — same dead-pointer law as llm.txt.
const LEAN_JSON_SERVE = ['unlocks.json'] as const
let j = 0
for (const f of LEAN_JSON_SERVE) {
  const src = join(LEAN, f)
  if (!existsSync(src)) {
    console.error(`✗ copy-lean-to-site — lean/${f} missing: pages link /lean/${f}; regenerate (gen-unlocks) before docs:build`)
    process.exit(1)
  }
  copyFileSync(src, join(OUT, f))
  j++
}

const SEEDS_OUT = join(SITE, 'seeds')
let s = 0
if (existsSync(SEEDS)) {
  for (const dir of readdirSync(SEEDS)) {
    const page = join(SEEDS, dir, 'page.json')
    if (!existsSync(page)) continue
    mkdirSync(join(SEEDS_OUT, dir), { recursive: true })
    copyFileSync(page, join(SEEDS_OUT, dir, 'page.json'))
    s++
  }
  // the vanilla-Payload sync fold (payload:sync) — one fetch, the whole site in stock Payload shapes
  const sync = join(SEEDS, 'payload-sync.json')
  if (existsSync(sync)) { mkdirSync(SEEDS_OUT, { recursive: true }); copyFileSync(sync, join(SEEDS_OUT, 'payload-sync.json')) }
}

// llm.txt — src/index.ts names it the canonical reference for agents, so a 404 there is a dead pointer in the
// source's own front door. Served at BOTH /llm.txt (the cited path) and /llms.txt (the llms-txt standard path
// agents probe first). Missing source FAILS the build — the pointer must never ship dead.
const LLM = join(ROOT, 'llm.txt')
if (!existsSync(LLM)) {
  console.error('✗ copy-lean-to-site — ./llm.txt missing: src/index.ts cites it as canonical; restore it (the build refuses to ship the dead pointer)')
  process.exit(1)
}
copyFileSync(LLM, join(SITE, 'llm.txt'))
copyFileSync(LLM, join(SITE, 'llms.txt'))

// THE ALPINE CATALOGUE — committed in mirror/, served at /alpine-catalogue.tsv. Without this copy a clean
// Workers Build has no docs/public/alpine-catalogue.tsv (gitignored), VitePress cannot passthrough it, and
// uuidnaOS in the browser reports the census ABSENT while the repo holds 28,639 packages. Fail loud if the
// mirror is missing — same law as llm.txt: the pointer must never ship dead.
const CATALOGUE = join(ROOT, CATALOGUE_FILE)
if (!existsSync(CATALOGUE)) {
  console.error(`✗ copy-lean-to-site — ${CATALOGUE_FILE} missing: the browser OS primes from /alpine-catalogue.tsv; restore it with \`node dist/scripts/gen-alpine-catalogue.js\` (the build refuses to ship the dead pointer)`)
  process.exit(1)
}
const baseText = readFileSync(CATALOGUE, 'utf8')
const overlayPath = join(ROOT, CATALOGUE_OVERLAY_FILE)
const testingPath = join(ROOT, CATALOGUE_TESTING_FILE)
const overlay = existsSync(overlayPath) ? parseCatalogue(readFileSync(overlayPath, 'utf8')) : []
const testing = existsSync(testingPath) ? parseCatalogue(readFileSync(testingPath, 'utf8')) : []
const merged = mergeCatalogueLayers(parseCatalogue(baseText), testing, overlay)
const catHeader = baseText.split('\n').filter((l) => l.charCodeAt(0) === 35).join('\n') + '\n'
writeFileSync(join(SITE, 'alpine-catalogue.tsv'), catHeader + catalogueTsvBody(merged) + '\n')

// THE SECOND FORENSIC — the VitePress dead-link check is architecturally blind to non-page assets (it validates
// page routes only), so /lean/* and /seeds/* are allowlisted there and verified HERE instead: scan every built
// HTML page for /lean and /seeds references and FAIL the build if any referenced file was not served. Together
// the two checks leave zero blind spots — no link ships unverified.
const htmlFiles: string[] = []
const walk = (dir: string) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p)
    else if (e.endsWith('.html')) htmlFiles.push(p)
  }
}
walk(SITE)
const missing = new Set<string>()
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8')
  for (const m of html.matchAll(/(?:href|src)="(\/(?:lean|seeds)\/[^"#?]+)/g)) {
    const target = join(SITE, decodeURIComponent(m[1]))
    if (!existsSync(target)) missing.add(`${m[1]} (referenced by ${f.slice(SITE.length + 1)})`)
  }
}
if (missing.size) {
  console.error(`✗ copy-lean-to-site — ${missing.size} referenced asset(s) NOT served:`)
  for (const x of missing) console.error(`    ${x}`)
  process.exit(1)
}

console.log(`✓ copy-lean-to-site — ${n} Lean proof files at /lean/*.lean, ${j} lean JSON at /lean/*.json, ${s} Payload page seeds at /seeds/<uuid>/page.json, llm.txt at /llm.txt + /llms.txt, ${CATALOGUE_FILE} at /alpine-catalogue.tsv, every /lean and /seeds reference in ${htmlFiles.length} built pages verified served (the theorem, its proof, and its seed — one click apart, no click dead)`)
