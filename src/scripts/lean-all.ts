#!/usr/bin/env node
// lean-all — run EVERY generator, verify EVERY hand-written proof, regenerate the ledger. Auto-discovers
// dist/scripts/lean-*.js, so a NEW domain needs NO package.json wiring: drop src/scripts/lean-<domain>.ts, run
// `npm run lean`, and it is generated, verified sorry-free, and folded into the receipt. Best cost per theorem —
// write the facts, nothing else. Order does not matter for correctness (the derivation order is the PRINCIPLE
// metadata, not the run order). Integrity, not truth.
// THE DELTA GATE: generators execute by dynamic import in ONE process (a spawn per generator would pay node
// startup each), and the hand-written proofs ride the same receipt cache as the generated wings — a
// byte-identical file's prior kernel signature stands, a changed file always re-proves, and UUIDNA_PROVE_ALL=1
// forces every spawn. A stale cache can only cause extra proving, never a false pass.
import { execSync } from 'node:child_process'
import { readdirSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { MAXBUF, readProofCache, writeProofCache } from './lean-gen.js'
import { toUuid } from '../address.js'
import { ROOT } from './api.js'

const SCRIPTS = join(ROOT, 'dist', 'scripts')
const LEAN = join(ROOT, 'lean')

// 1) every generator — dist/scripts/lean-*.js — imported into THIS process (top-level executes on import).
// A failing generator prints its own cause (emit names the file and the Lean diagnostic) and exits; the
// try/catch only adds the step name for anything that throws without exiting.
const SKIP = new Set(['lean-gen.js', 'lean-ledger.js', 'lean-all.js', 'lean-heartbeats.js', 'lean-one.js']) // heartbeats is an on-demand cost probe, not a generator; lean-one is the single-domain dispatcher, not a domain itself
const generators = readdirSync(SCRIPTS).filter((f) => /^lean-.*\.js$/.test(f) && !SKIP.has(f)).sort()
for (const g of generators) {
  try {
    await import(pathToFileURL(join(SCRIPTS, g)).href)
  } catch (e) {
    console.error('\n✗ lean-all — generator FAILED: ' + g + '\n  ' + String(e).slice(0, 300))
    process.exit(1)
  }
}

// 2) hand-authored proofs (no generator writes them) — verified with `lean`, through the SAME receipt cache:
// unchanged text = the kernel's prior signature stands; a moved address always re-proves; UUIDNA_PROVE_ALL=1
// forces every spawn.
const HAND_WRITTEN = ['Uuidna.lean', 'Vortex.lean', 'OneLeap.lean', 'AntiFraud.lean', 'SailingSeals.lean', 'DisputedTopics.lean'].filter((f) => existsSync(join(LEAN, f)))
const cache = readProofCache()
for (const f of HAND_WRITTEN) {
  const text = readFileSync(join(LEAN, f), 'utf8')
  const address = toUuid(text)
  if (cache[f] === address && !process.env.UUIDNA_PROVE_ALL) {
    console.log('✓ lean/' + f + ' — hand-written, verified by receipt (unchanged at ' + address.slice(0, 8) + ')')
    continue
  }
  try {
    execSync('lean ' + JSON.stringify(join(LEAN, f)), { cwd: ROOT, stdio: 'inherit', maxBuffer: MAXBUF })
    cache[f] = address
    writeProofCache(cache)
    console.log('✓ lean/' + f + ' — hand-written, verified sorry-free (receipt ' + address.slice(0, 8) + ' cached).')
  } catch {
    console.error('\n✗ lean-all — hand-written proof FAILED: lean/' + f)
    process.exit(1)
  }
}

// 3) regenerate the single derived ledger (src/theorems/generated.ts + lean/PRINCIPLE.md) from all lean/*.lean.
try {
  await import(pathToFileURL(join(SCRIPTS, 'lean-ledger.js')).href)
} catch (e) {
  console.error('\n✗ lean-all — ledger regeneration FAILED\n  ' + String(e).slice(0, 300))
  process.exit(1)
}
console.log('✓ lean-all — ' + generators.length + ' generators + ' + HAND_WRITTEN.length + ' hand-written proofs, one process, auto-discovered, verified, folded.')
