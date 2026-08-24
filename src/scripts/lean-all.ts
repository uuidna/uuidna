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
// re-proves. A FORGED entry was not — proof-cache.json is committed, and before the signed cache nothing
// validated it, so an entry naming the current text's address made this gate answer "verified by receipt" for
// text the kernel never signed. NOW (queue captain-item 4, the mechanism half): a host holding
// UUIDNA_PROOF_KEY mints `address|hmac` entries and DISTRUSTS any entry unsigned or mis-signed — the forgery
// is caught locally on keyed hosts. A keyless host keeps the weaker address-match floor, named; and the
// RELEASE still consults no cache: `npm run audit` sets UUIDNA_PROVE_ALL=1, so everything shipped is
// kernel-signed in that run regardless of any key.
import { execSync } from 'node:child_process'
import { readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { MAXBUF, readProofCache, writeProofCache, signProofEntry, proofEntryValid } from './lean-gen.js'
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

// NO SECOND GATE. A run-cache sat here: it hashed each generator's source with the ledger and skipped the run
// when neither had moved, worth about seven seconds. It also wrote lean/generator-cache.json, and it changed
// WHICH generators fired on a given pass — so proof-cache and the wing manifests moved differently run to run,
// and spin refused a seal the same gate had invalidated. Ten pushes died on that.
//
// emit() already holds the delta: it content-addresses the generated text and the kernel's prior signature
// stands when the bytes are identical. That is one mechanism, and it was enough. A second gate over the first
// bought seconds and cost the fixed point — harmony did not need the intervention.
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
  if (proofEntryValid(cache[f], f, address) && !process.env.UUIDNA_PROVE_ALL) {
    console.log('✓ lean/' + f + ' — hand-written, verified by receipt (unchanged at ' + handleOf(address) + ')')
    continue
  }
  try {
    execSync('lean ' + JSON.stringify(join(LEAN, f)), { cwd: ROOT, stdio: 'inherit', maxBuffer: MAXBUF })
    cache[f] = signProofEntry(f, address)
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
