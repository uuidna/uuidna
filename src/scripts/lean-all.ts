#!/usr/bin/env node
// lean-all — run EVERY generator, verify EVERY hand-written proof, regenerate the ledger. Auto-discovers
// dist/scripts/lean-*.js, so a NEW domain needs NO package.json wiring: drop src/scripts/lean-<domain>.ts, run
// `npm run lean`, and it is generated, verified sorry-free, and folded into the receipt. Best cost per theorem —
// write the facts, nothing else. The generators self-verify (each shells out to `lean`); order does not matter for
// correctness (the derivation order is the PRINCIPLE metadata, not the run order). Integrity, not truth.
import { execSync } from 'node:child_process'
import { readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MAXBUF } from './lean-gen.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const SCRIPTS = join(ROOT, 'dist', 'scripts')
const LEAN = join(ROOT, 'lean')
// Each step streams its own output (stdio:'inherit'); on failure, replace Node's raw status-object dump with a clean
// line NAMING the step that failed (the generator/file already printed the cause above), then drain.
const run = (cmd: string) => {
  try {
    execSync(cmd, { cwd: ROOT, stdio: 'inherit', maxBuffer: MAXBUF })
  } catch {
    console.error('\n✗ lean-all — step FAILED: ' + cmd + '\n  (the cause is in that step\'s output above)')
    process.exit(1)
  }
}

// 1) every generator — dist/scripts/lean-*.js — except the shared helper, the aggregator, and this runner itself.
const SKIP = new Set(['lean-gen.js', 'lean-ledger.js', 'lean-all.js', 'lean-heartbeats.js']) // heartbeats is an on-demand cost probe, not a generator
const generators = readdirSync(SCRIPTS).filter((f) => /^lean-.*\.js$/.test(f) && !SKIP.has(f)).sort()
for (const g of generators) run('node ' + JSON.stringify(join(SCRIPTS, g)))

// 2) hand-authored proofs (no generator writes them) — verified directly with `lean`.
const HAND_WRITTEN = ['Uuidna.lean', 'Vortex.lean', 'OneLeap.lean', 'AntiFraud.lean', 'SailingSeals.lean', 'DisputedTopics.lean'].filter((f) => existsSync(join(LEAN, f)))
for (const f of HAND_WRITTEN) run('lean ' + JSON.stringify(join(LEAN, f)))

// 3) regenerate the single derived ledger (src/theorems/generated.ts + lean/PRINCIPLE.md) from all lean/*.lean.
run('node ' + JSON.stringify(join(SCRIPTS, 'lean-ledger.js')))
console.log('✓ lean-all — ' + generators.length + ' generators + ' + HAND_WRITTEN.length + ' hand-written proofs, auto-discovered, verified, folded.')
