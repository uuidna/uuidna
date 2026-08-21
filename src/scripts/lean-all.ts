#!/usr/bin/env node
// lean-all — run EVERY generator, verify EVERY hand-written proof, regenerate the ledger. Auto-discovers
// dist/scripts/lean-*.js, so a NEW domain needs NO package.json wiring: drop src/scripts/lean-<domain>.ts, run
// `npm run lean`, and it is generated, verified sorry-free, and folded into the receipt. Best cost per theorem —
// write the facts, nothing else. Order does not matter for correctness (the derivation order is the PRINCIPLE
// metadata, not the run order). Integrity.
// THE DELTA GATE: generators execute by dynamic import in ONE process (a spawn per generator would pay node
// startup each), and the hand-written proofs ride the same receipt cache as the generated wings — a
// byte-identical file's prior kernel signature stands, a changed file always re-proves, and UUIDNA_PROVE_ALL=1
// forces every spawn.
//
// WHAT THE CACHE CAN AND CANNOT PROMISE. A STALE entry is safe: the text moved, its address moved, the file
// re-proves. A FORGED entry is not — proof-cache.json is committed and nothing validates it, so an entry naming
// the current text's address makes this gate answer "verified by receipt" for text the kernel never signed.
// The cure is not to trust the cache harder: the RELEASE consults no cache. `npm run audit` sets
// UUIDNA_PROVE_ALL=1, so everything shipped is kernel-signed in that run. The cache is for local iteration.
import { execSync } from 'node:child_process'
import { readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { MAXBUF, readProofCache, writeProofCache } from './lean-gen.js'
import { toUuid } from '../address.js'
import { ROOT } from './api.js'
import { handleOf } from '../handle.js'   // THE one derivation — see handle.ts

const SCRIPTS = join(ROOT, 'dist', 'scripts')
const LEAN = join(ROOT, 'lean')

// 1) every generator — dist/scripts/lean-*.js — imported into THIS process (top-level executes on import).
// A failing generator prints its own cause (emit names the file and the Lean diagnostic) and exits; the
// try/catch only adds the step name for anything that throws without exiting.
const SKIP = new Set(['lean-gen.js', 'lean-ledger.js', 'lean-all.js', 'lean-heartbeats.js', 'lean-one.js']) // heartbeats is an on-demand cost probe; lean-one is the single-domain dispatcher
const generators = readdirSync(SCRIPTS).filter((f) => /^lean-.*\.js$/.test(f) && !SKIP.has(f)).sort()

// THE GATE, ONE LEVEL UP — SKIP THE RUN, NOT JUST THE SPAWN.
//
// emit() already compares an 8-hexbit handle to decide whether the kernel must re-prove a wing, and an unchanged
// wing costs neither the Lean spawn nor the writes. But the handle only exists AFTER the generator has computed
// its facts and rendered its text, so a full pass still paid ~22s to recompute what it was about to discard. A
// deterministic generator on unchanged inputs cannot produce a changed output, so the run itself is skippable.
//
// THE KEY IS TWO-PART, and the second part is why this is safe. Some generators read the LEDGER rather than only
// their own constants — lean-prose counts wings and articles — so their output moves when the ledger moves even
// though their source did not. A source-only gate would silently freeze those wings at a stale text and report
// them green. So the key folds the generator's source address WITH the ledger's, and any movement in either
// re-runs everything. `cases` are recorded during the run, so a skipped generator must also leave its manifest
// standing; both artifacts are checked before the skip is taken, exactly as emit() checks its own.
const LEDGER = join(ROOT, 'src', 'theorems', 'generated.ts')
const ledgerAddress = existsSync(LEDGER) ? toUuid(readFileSync(LEDGER, 'utf8')) : 'no-ledger'
// A SEPARATE CACHE, BECAUSE IT IS A SEPARATE CLAIM. proof-cache.json says "the kernel signed this exact text";
// this says "the generator's inputs did not move, so re-running it cannot change the text". Both are receipts,
// but only one is the kernel's, and a reader who cannot tell them apart cannot audit either. Keeping them in one
// file broke the proof cache's own stated invariant — every key is a .lean file — and a test caught it.
const RUN_CACHE = join(ROOT, 'lean', 'generator-cache.json')
const readRunCache = (): Record<string, string> => {
  try { return JSON.parse(readFileSync(RUN_CACHE, 'utf8')) as Record<string, string> } catch { return {} }
}
const runCache = readRunCache()
const wingOf = (g: string): string => g.replace(/^lean-/, '').replace(/\.js$/, '')
const skipKey = (g: string): string => 'run:' + g
let skipped = 0
for (const g of generators) {
  const source = join(ROOT, 'src', 'scripts', g.replace(/\.js$/, '.ts'))
  const key = existsSync(source) ? handleOf(toUuid(readFileSync(source, 'utf8') + ledgerAddress)) : ''
  const artifacts = readdirSync(LEAN).some((f) => f.toLowerCase() === wingOf(g) + '-manifest.json')
  if (key && artifacts && runCache[skipKey(g)] === key && !process.env.UUIDNA_PROVE_ALL) { skipped++; continue }
  try {
    await import(pathToFileURL(join(SCRIPTS, g)).href)
    if (key) { runCache[skipKey(g)] = key; writeFileSync(RUN_CACHE, JSON.stringify(runCache, null, 0) + '\n') }
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
    console.log('✓ lean/' + f + ' — hand-written, verified by receipt (unchanged at ' + handleOf(address) + ')')
    continue
  }
  try {
    execSync('lean ' + JSON.stringify(join(LEAN, f)), { cwd: ROOT, stdio: 'inherit', maxBuffer: MAXBUF })
    cache[f] = address
    writeProofCache(cache)
    console.log('✓ lean/' + f + ' — hand-written, verified sorry-free (receipt ' + handleOf(address) + ' cached).')
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
