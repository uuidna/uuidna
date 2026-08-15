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

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
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

console.log(`✓ copy-lean-to-site — ${n} Lean proof files at /lean/*.lean, ${s} Payload page seeds at /seeds/<uuid>/page.json (the theorem, its proof, and its seed — one click apart)`)
