#!/usr/bin/env node
// copy-lean-to-site — SERVE THE PROOFS AND THE SEEDS. Every theorem page links to /lean/<File>.lean (its actual
// `by decide` source), but VitePress builds only markdown into its outDir (docs/.vitepress/dist — the default), so
// /lean/*.lean would 404 on the deployed site — the theorem and its proof were one click apart, and the click was
// broken. This copies lean/*.lean into <outDir>/lean/ AFTER the VitePress build, so every proof link resolves.
// It ALSO serves the PayloadCMS page seeds (src/lean/<uuid>/page.json, the imprint-named append-only versions) at
// /seeds/<uuid>/page.json — the seed folder stays the ONE source (DRY); the build serves it, nothing duplicates it.
// Idempotent; runs in docs:build (and thus in the Cloudflare deploy build). Integrity, not truth — it serves the
// source, it proves nothing new.
import { readdirSync, mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const LEAN = join(ROOT, 'lean')
const SEEDS = join(ROOT, 'src', 'lean')
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

// THE SECOND FORENSIC — the VitePress dead-link check is architecturally blind to non-page assets (it validates
// page routes only), so /lean/* and /seeds/* are allowlisted there and verified HERE instead: scan every built
// HTML page for /lean and /seeds references and FAIL the build if any referenced file was not served. Together
// the two checks leave zero blind spots — no link ships unverified.
import { readFileSync, statSync } from 'node:fs'
import { HERE, ROOT } from './api.js'
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

console.log(`✓ copy-lean-to-site — ${n} Lean proof files at /lean/*.lean, ${s} Payload page seeds at /seeds/<uuid>/page.json, every /lean and /seeds reference in ${htmlFiles.length} built pages verified served (the theorem, its proof, and its seed — one click apart, no click dead)`)
