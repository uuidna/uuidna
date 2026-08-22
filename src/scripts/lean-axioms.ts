#!/usr/bin/env node
// Axiom-audit heartbeat — PROVE the "no Mathlib, kernel-only" claim instead of asserting it. `sorry-free` says no hole
// was left; this says no TRUST was borrowed. `#print axioms t` asks the Lean toolchain for t's exact axiom
// dependency; a `by decide` proof over a finite type reduces to `Eq.refl` and so depends on NOTHING. The audit runs
// that query over the whole ledger and DRAINS (exit 1) if any theorem depends on a single axiom — turning the
// discipline into a receipt that recomputes from the source, exactly like the decide-step heartbeat fold.
//
// What it catches, mechanically, that a grep cannot: a stray `sorry` (adds `sorryAx`), a `native_decide` (adds
// `Lean.ofReduceBool` — trusts the COMPILER`import Mathlib`-borne `Classical.choice`
// / `propext` / `Quot.sound`. The allowed set is EMPTY by design: the trust base is `leanprover/lean4`'s kernel and
// nothing beyond it. Requires the `lean` toolchain. Usage:
//   npm run axioms          → audit the whole ledger, write lean/axioms.json, drain on any dependency
//   npm run axioms --check   → audit only; do not rewrite the receipt (CI diff guard)
// Integrity — the record recomputes for anyone.
import { execFile } from 'node:child_process'
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { theorems } from '../index.js'
import { ROOT, MAXBUF } from './lean-gen.js'

// The trust base is the kernel alone — NO axiom is tolerated, not even propext/Quot.sound. Widen this set only by a
// conscious, documented decision; a `by decide` ledger should never need to.
import { handleOf } from '../handle.js'
import { toUuid } from '../address.js'
const LEDGER_SRC = join(ROOT, 'src', 'theorems', 'generated.ts')

const ALLOWED = new Set<string>()

const T = theorems()
const addrOf: Record<string, string> = Object.fromEntries(T.map((t) => [t.key, t.address]))

// One audit probe per SOURCE FILE: the real, already-verified file text (it compiled in lean-all) with a
// `#print axioms <key>` appended per theorem it defines. Files are flat (no `namespace`), so bare keys resolve and
// one `lean` run answers for every theorem in the file — ~40 runs for the whole ledger.
const byFile: Record<string, string[]> = {}
for (const t of T) (byFile[t.file] ||= []).push(t.key)

// ROBUSTNESS — build the NEXT state in one pass even across a DELETION. The ledger (the compiled generated.js this
// reads) can momentarily list a file a deletion already removed from disk (a domain folded into another, before a
// rebuild refreshes generated.js). Skip-and-warn instead of ENOENT, so a deletion reconciles in one pass the way an
// addition does — the stale reference is corrected at the next lean-ledger regen. An ADDITION was always one-pass
// (the stale ledger just lists fewer files); this closes the gap for the delete direction too.
for (const f of Object.keys(byFile))
  if (!existsSync(join(ROOT, 'lean', f))) {
    console.warn(`  ⚠ lean-axioms: ${byFile[f].length} theorem(s) still list ${f}, but it is not on disk — skipping (a stale ledger reference; the next regen corrects it).`)
    delete byFile[f]
  }

// Parse `#print axioms` stanzas from a run's output. Lean emits, per query, either
//   'name' does not depend on any axioms
//   'name' depends on axioms: [Classical.choice, propext, Quot.sound]
// Returns name → axiom list ([] = clean). Name equals the bare key (no namespace in these files).
function parse(out: string): Record<string, string[]> {
  const verdict: Record<string, string[]> = {}
  // Capture the name LAZILY up to the verdict phrase — a prime in a Lean name (`foo'`) prints as `'foo''`, which a
  // `'([^']+)'` class would truncate at the inner quote (dropping the theorem, then falsely draining as unseen).
  for (const m of out.matchAll(/'(.+?)' does not depend on any axioms/g)) verdict[m[1]] = []
  for (const m of out.matchAll(/'(.+?)' depends on axioms: \[([^\]]*)\]/g))
    verdict[m[1]] = m[2].split(',').map((s) => s.trim()).filter(Boolean)
  return verdict
}

// Run `lean probe` for the axiom report, hardened two ways:
//  • A real Lean ELABORATION error (`: error:` in the output) fails HARD, even if `#print axioms` stanzas were also
//    printed for the theorems that DID elaborate — so a file with one broken proof can never be silently read as
//    axiom-free (Lean keeps elaborating past an error, which would otherwise mask it).
//  • A failure with NO verdict and NO error is treated as a TRANSIENT spawn/exec hiccup (a flaky parallel `lean`) and
//    retried, so the audit does not drop a theorem to "unaudited" on a resource blip.
const RETRIES = 2
const runLean = (probe: string, attempt = 0): Promise<string> =>
  new Promise((resolve, reject) => {
    execFile('lean', [probe], { maxBuffer: MAXBUF }, (err, stdout, stderr) => {
      const msg = String(stdout || '') + String(stderr || '')
      if (/: error:/.test(msg)) return reject(new Error('lean elaboration error in ' + probe + ':\n' + msg.slice(0, 300)))
      const hasVerdict = /depends on axioms|does not depend on any axioms/.test(msg)
      if (err && !hasVerdict) {
        if (attempt < RETRIES) return resolve(runLean(probe, attempt + 1)) // transient — retry
        return reject(new Error('lean produced no axiom verdict after ' + (RETRIES + 1) + ' attempts on ' + probe + ':\n' + msg.slice(0, 200)))
      }
      resolve(msg)
    })
  })

// Compile one file + its axiom queries; resolve name → axiom-list for every theorem in the file. `async` so a failed
// read/write (a missing probe source) surfaces as a promise REJECTION the pool awaits.
const auditFile = async (file: string, keys: string[]): Promise<Record<string, string[]>> => {
  const src = readFileSync(join(ROOT, 'lean', file), 'utf8')
  const probe = join(tmpdir(), 'uuidna-ax-' + file)
  writeFileSync(probe, src + '\n' + keys.map((k) => `#print axioms ${k}`).join('\n') + '\n')
  return parse(await runLean(probe))
}

// Bounded-concurrency pool (parallel Lean processes), mirroring lean-heartbeats.
async function pool<X, R>(items: X[], concurrency: number, worker: (x: X) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let next = 0
  const run = async () => { while (next < items.length) { const i = next++; out[i] = await worker(items[i]) } }
  await Promise.all(Array.from({ length: concurrency }, run))
  return out
}

async function main() {
  const check = process.argv.includes('--check')
  const files = Object.keys(byFile).sort()

  // THE SAME HEXBIT GATE THE WINGS USE. This audit spawns Lean over every wing to ask `#print axioms` for all
  // 1440 theorems, and it re-asked on every run even when not one proof had moved — once the generators were
  // gated it became the whole cost of `npm run lean`. The answer depends on exactly two things: the Lean TEXT
  // being audited, and which theorems are being asked about. Fold both into one handle — every wing's bytes plus
  // the ledger's — and an unchanged pair means the previous verdict still stands, because the kernel would be
  // answering the identical question. A moved byte anywhere in either re-audits everything; --check and
  // UUIDNA_PROVE_ALL=1 always re-ask, so nothing hides behind the gate.
  const wingBytes = files.map((f) => readFileSync(join(ROOT, 'lean', f), 'utf8')).join('')
  const ledgerSrc = existsSync(LEDGER_SRC) ? readFileSync(LEDGER_SRC, 'utf8') : ''
  const askedKey = handleOf(toUuid(wingBytes + ledgerSrc))
  const cachePath = join(ROOT, 'lean', 'axioms.json')
  if (!check && !process.env.UUIDNA_PROVE_ALL && existsSync(cachePath)) {
    try {
      const prior = JSON.parse(readFileSync(cachePath, 'utf8')) as { audited?: number; axiomFree?: number; asked?: string }
      if (prior.asked === askedKey && prior.audited === T.length && prior.axiomFree === T.length) {
        console.log('✓ axiom audit — ' + T.length + '/' + T.length + ' kernel-only, verified by receipt (unchanged at ' + askedKey + '; UUIDNA_PROVE_ALL=1 re-asks)')
        return
      }
    } catch { /* an unreadable receipt is no receipt — fall through and re-audit */ }
  }

  const results = await pool(files, 8, (f) => auditFile(f, byFile[f]))

  // Fold: which theorems carry a DISALLOWED axiom, and did every theorem actually get a verdict (coverage)?
  const offenders: Record<string, string[]> = {} // address → the axioms it depends on
  let audited = 0
  const unseen: string[] = []
  for (let i = 0; i < files.length; i++) {
    const verdict = results[i]
    for (const key of byFile[files[i]]) {
      if (!(key in verdict)) { unseen.push(key); continue } // no stanza → not audited (missing/renamed)
      audited++
      const bad = verdict[key].filter((a) => !ALLOWED.has(a))
      if (bad.length) offenders[addrOf[key]] = bad
    }
  }

  const axiomFree = audited - Object.keys(offenders).length
  const receipt = { audited, axiomFree, offenders, asked: askedKey }
  if (!check) {
    writeFileSync(join(ROOT, 'lean', 'axioms.json'), JSON.stringify(receipt) + '\n')
    console.log('wrote lean/axioms.json — ' + audited + ' theorems audited, keyed by content-address')
  }

  console.log('\n=== axiom audit — the whole ledger ===')
  console.log('theorems audited :', audited + '/' + T.length + (unseen.length ? ` (${unseen.length} UNSEEN)` : ''))
  console.log('axiom-free       :', axiomFree)
  console.log('trust base       : leanprover/lean4 kernel — allowed axioms: ∅')

  // DRAIN: any dependency, or any theorem the audit could not see, fails the gate.
  const bad = Object.keys(offenders).length
  if (bad || unseen.length) {
    if (bad) {
      console.error('\n✗ ' + bad + ' theorem(s) depend on a DISALLOWED axiom:')
      const keyOf: Record<string, string> = Object.fromEntries(T.map((t) => [t.address, t.key]))
      for (const [addr, ax] of Object.entries(offenders)) console.error('   ' + keyOf[addr] + ' — [' + ax.join(', ') + ']')
    }
    if (unseen.length) console.error('\n✗ ' + unseen.length + ' theorem(s) produced no axiom verdict: ' + unseen.slice(0, 8).join(', ') + (unseen.length > 8 ? ' …' : ''))
    process.exitCode = 1
    return
  }
  console.log('\n✓ every theorem depends on NO axioms — the ledger recomputes from the kernel alone.')
}

main()
