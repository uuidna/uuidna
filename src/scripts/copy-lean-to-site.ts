#!/usr/bin/env node
// copy-lean-to-site — SERVE THE PROOFS. Every theorem page links to /lean/<File>.lean (its actual `by decide` source),
// but VitePress builds only docs/ into its outDir (./src/diamonds/docs — .vitepress/config.ts), so /lean/*.lean 404s
// on the deployed site — the theorem and its proof were one click apart, and the click was broken. This copies
// lean/*.lean into <outDir>/lean/ AFTER the VitePress build,
// so every proof link resolves: anyone reads the theorem, then reads the exact Lean that proves it. Idempotent; runs in
// docs:build (and thus in the Cloudflare deploy build). Integrity, not truth — it serves the source, it proves nothing new.
import { readdirSync, mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const LEAN = join(ROOT, 'lean')
// the VitePress outDir — keep in lock-step with .vitepress/config.ts (outDir: './src/diamonds/docs')
const SITE = join(ROOT, 'src', 'diamonds', 'docs')
const OUT = join(SITE, 'lean')

if (!existsSync(SITE)) {
  console.error('✗ copy-lean-to-site — ./src/diamonds/docs (the VitePress outDir) does not exist; run `vitepress build` first (this step runs after it in docs:build)')
  process.exit(1)
}
mkdirSync(OUT, { recursive: true })

let n = 0
for (const f of readdirSync(LEAN)) if (f.endsWith('.lean')) { copyFileSync(join(LEAN, f), join(OUT, f)); n++ }
console.log(`✓ copy-lean-to-site — ${n} Lean proof files served at /lean/*.lean (the theorem and its proof, one click apart)`)
