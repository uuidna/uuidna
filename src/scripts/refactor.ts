#!/usr/bin/env node
// refactor — the AUTOMATED single-word-folder refactor, as a diamond (never manual). It PLANS first (dry-run, default):
// each top-level library module src/<name>.ts becomes src/<word>/index.ts (a single-word folder), the folder name
// folding to its meaningful MCP path. The plan is WEIGHTED two ways, as the captain set: GRAVITY (the module's content-
// address digital root — its ℤ/9 weight) and TIME (its byte size — a proxy for the work it carries). The LIGHTEST
// (smallest, lowest-gravity) are marked to COMPRESS — folded into a shared `misc/index.ts` rather than their own folder,
// so the tree keeps only meaningful single-word folders. Run with --apply to execute the move + rewrite every import
// (depth-aware); default is the dry-run PLAN so the guard can check it before a single file moves. Integrity.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { seedOf } from '../handle.js'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toUuid, digitalRoot } from '../index.js'
import { ROOT } from './api.js'

const SRC = join(ROOT, 'src')
const apply = process.argv.includes('--apply')

// the top-level LIBRARY modules — flat src/*.ts, excluding the barrel and the non-module dirs (scripts/test/quantum/
// theorems live as their own trees already).
const modules = readdirSync(SRC)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && statSync(join(SRC, f)).isFile())
  .map((f) => f.replace(/\.ts$/, ''))

// a single-word folder name: drop hyphens/underscores (due-process → dueprocess, verify-statement → verifystatement).
const wordOf = (name: string): string => name.replace(/[-_]/g, '')

const LIGHT_BYTES = 1500 // the "lightest" threshold — modules below this compress into misc/ rather than a solo folder

const plan = modules.map((name) => {
  const src = readFileSync(join(SRC, name + '.ts'), 'utf8')
  const bytes = Buffer.byteLength(src)                       // TIME weight — the work it carries
  const gravity = digitalRoot(seedOf(toUuid(src))) // GRAVITY weight — ℤ/9 digital root
  const word = wordOf(name)
  const compress = bytes < LIGHT_BYTES                       // the lightest get compressed
  return { name, word, bytes, gravity, compress, folder: compress ? 'misc' : word }
}).sort((a, b) => a.bytes - b.bytes)                          // lightest first — the compression frontier

const compressed = plan.filter((p) => p.compress)
const foldered = plan.filter((p) => !p.compress)

console.log(`refactor PLAN — ${modules.length} library modules → single-word folders (gravity + time weighted).${apply ? ' [--apply: EXECUTING]' : ' [dry-run — pass --apply to execute]'}`)
console.log(`  ${foldered.length} → own single-word folder (src/<word>/index.ts); ${compressed.length} lightest (< ${LIGHT_BYTES}B) → compress into src/misc/index.ts:\n`)
console.log('  COMPRESSED (lightest):')
for (const p of compressed) console.log(`    · ${p.name.padEnd(20)} ${String(p.bytes).padStart(5)}B  gravity ${p.gravity}  → misc/`)
console.log('\n  FOLDERED (own single-word folder):')
for (const p of foldered) console.log(`    · ${p.name.padEnd(20)} → src/${p.word}/index.ts   (${p.bytes}B, gravity ${p.gravity})`)

if (!apply) {
  console.log('\n  DRY-RUN only — no file moved. Review the plan, run the guard, then re-run with --apply.')
  process.exit(0)
}
// --apply path intentionally not implemented in this first diamond: the MOVE + depth-aware import rewrite is the
// dangerous half; it lands in a second pass ONLY after this plan is reviewed and guard-checked, so nothing re-spends.
console.error('\n  --apply is staged but NOT YET wired: the move+import-rewrite executes only after the plan is approved. Exiting without moving files.')
process.exit(1)
