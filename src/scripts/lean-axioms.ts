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
import { ALLOWED_AXIOMS, parseAxiomReport, wingAskedKey, reusableWings, type WingReceipt } from '../axiom-report.js'
const LEDGER_SRC = join(ROOT, 'src', 'theorems', 'generated.ts')

// THE TRUST BASE IS DECLARED ONCE, in src/axiom-report.ts, because the conveyor's deposit door now enforces it
// too (queue-wave's probe carries `#print axioms`). Two copies of an allowed-axiom set is two trust bases.
const ALLOWED = ALLOWED_AXIOMS

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
const parse = parseAxiomReport

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
        return reject(new Error('lean produced no axiom verdict after ' + (RETRIES + 1) + ' attempts on ' + probe + (msg.trim() ? ':\n' + msg.slice(0, 200) : ' — the spawn itself failed: is the lean kernel installed on this host? (an absent instrument voids, it does not verdict)')))
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

  // THE WITNESS REFUSES A DENOMINATOR IT CANNOT VERIFY (2026-08-25). Every number this audit reports is counted
  // against `T.length`, and T comes from `theorems()` — the COMPILED ledger in dist/. The ledger it is auditing is
  // src/theorems/generated.ts, which a generator rewrites. Between that rewrite and the next `npm run build` the
  // two disagree, and this audit will confidently report on a ledger that no longer exists.
  //
  // That is not hypothetical. lean-all was importing this file as a generator (it matched the `lean-*.js`
  // discovery pattern), so the audit ran BEFORE the ledger was regenerated: one run printed "theorems audited :
  // 1699/1699" and "every theorem depends on NO axioms" four lines after the same run wrote "2101 Lean theorems".
  // 402 theorems were never asked about and the receipt was written with the stale total. That ROUTE is closed —
  // lean-all now skips this file — but closing a route is not the same as fixing the harm: the audit can still be
  // run by hand, from a script, or from the next mechanism nobody has written yet, and it would be just as wrong.
  //
  // So the check moves to where the harm is. Both ledgers are already in hand a line above — `ledgerSrc` was read
  // to fold into askedKey but never counted. Counting it costs one regex and makes the audit structurally
  // incapable of certifying a ledger it never saw, whatever the caller did. `^  { key:` is the structural anchor
  // the tree already relies on for this file, chosen over a looser `key:` because prose inside a `name` can say
  // "key:" and a line-anchored form cannot be faked by a mention (scanner_cannot_tell_use_from_mention).
  //
  // IT REFUSES RATHER THAN REPAIRING. Re-reading the source ledger here would let the audit paper over a stale
  // dist and leave every OTHER reader of `theorems()` — the guard, the gate, the account — still holding the old
  // number. A stop names the real fault once; a silent repair hides it from everyone downstream.
  const srcCount = (ledgerSrc.match(/^ {2}\{ key:/gm) ?? []).length
  if (ledgerSrc && srcCount !== T.length) {
    console.error(`✗ axiom audit — REFUSED: the compiled ledger holds ${T.length} theorems, the source ledger holds ${srcCount}.`)
    console.error(`  dist/ is stale, so every count this audit could print would be taken against the wrong ledger — including a green one.`)
    console.error(`  Run \`npm run build\` first, or \`npm run axioms\`, which builds and then audits the ledger that now exists.`)
    process.exit(1)
  }

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

  // PER-WING (lead 228): a wing whose text and asked keys are unchanged since its last receipt is not re-probed —
  // its verdict is read back. Only the wings that moved reach the kernel. --check and UUIDNA_PROVE_ALL=1 re-ask all.
  const asks: Record<string, string> = Object.fromEntries(files.map((f) => [f, wingAskedKey(readFileSync(join(ROOT, 'lean', f), 'utf8'), byFile[f])]))
  let priorWings: Record<string, WingReceipt> | undefined
  if (!check && !process.env.UUIDNA_PROVE_ALL && existsSync(cachePath)) {
    try { priorWings = (JSON.parse(readFileSync(cachePath, 'utf8')) as { wings?: Record<string, WingReceipt> }).wings } catch { priorWings = undefined }
  }
  // BOOTSTRAP FROM THE LAST COMMITTED COMPLETE RECEIPT (lead 228's second half). A receipt written before this
  // fold carries no per-wing map, so the first run after it would re-ask every wing — the crack, once more, on
  // the very landing that folded it. But git holds the exact wing TEXTS that receipt certified: a wing whose text
  // is byte-identical to its text at that commit, whose keys were all in that commit's ledger, and whose receipt
  // said no theorem depended on any axiom, has its verdict already — the kernel answered this identical question
  // and a commit sealed the answer. Anything else (a moved wing, a new key, an incomplete or offending receipt,
  // any git failure) goes to the kernel: the bootstrap only ever READS BACK, never assumes.
  if (!check && !process.env.UUIDNA_PROVE_ALL) {
    try {
      const { execSync } = await import('node:child_process')
      const git = (args: string): string => execSync('git ' + args, { cwd: ROOT, encoding: 'utf8', maxBuffer: MAXBUF, stdio: ['ignore', 'pipe', 'ignore'] })
      const commit = git('log -1 --format=%H -- lean/axioms.json').trim()
      if (commit) {
        const sealed = JSON.parse(git(`show ${commit}:lean/axioms.json`)) as { audited?: number; total?: number; offenders?: Record<string, unknown>; wings?: Record<string, WingReceipt> }
        const complete = sealed.audited !== undefined && sealed.audited === sealed.total && Object.keys(sealed.offenders ?? {}).length === 0
        if (complete) {
          const sealedKeys = new Set([...git(`show ${commit}:src/theorems/generated.ts`).matchAll(/^ {2}\{ key: "([^"]+)"/gm)].map((m) => m[1]!))
          const derived: Record<string, WingReceipt> = { ...(sealed.wings ?? {}), ...(priorWings ?? {}) }
          let fromGit = 0
          for (const f of files) {
            if (derived[f]?.asked === asks[f]) continue
            let then: string
            try { then = git(`show ${commit}:lean/${f}`) } catch { continue }   // a wing born after the receipt
            if (then !== readFileSync(join(ROOT, 'lean', f), 'utf8')) continue
            if (!byFile[f].every((k) => sealedKeys.has(k))) continue
            derived[f] = { asked: asks[f], verdict: Object.fromEntries(byFile[f].map((k) => [k, [] as string[]])) }
            fromGit++
          }
          if (fromGit) console.log(`· axiom audit — ${fromGit} wing(s) byte-identical to the text the committed receipt ${commit.slice(0, 9)} certified, read back from that seal`)
          priorWings = derived
        }
      }
    } catch { /* no git, no history, no bootstrap — every wing goes to the kernel */ }
  }
  const { reuse, probe: toProbe } = reusableWings(priorWings, asks)
  if (reuse.length) console.log(`· axiom audit — ${reuse.length} wing(s) unchanged since their receipt, read back; ${toProbe.length} wing(s) moved and go to the kernel`)
  const probed = await pool(toProbe, 8, (f) => auditFile(f, byFile[f]))
  const verdictOf: Record<string, Record<string, string[]>> = {}
  toProbe.forEach((f, i) => { verdictOf[f] = probed[i] })
  for (const f of reuse) verdictOf[f] = priorWings![f]!.verdict
  const results = files.map((f) => verdictOf[f]!)
  const wings: Record<string, WingReceipt> = Object.fromEntries(files.map((f) => [f, { asked: asks[f], verdict: verdictOf[f]! }]))

  // Fold: which theorems carry a DISALLOWED axiom, and did every theorem actually get a verdict (coverage)?
  const offenders: Record<string, string[]> = {} // address → the axioms it depends on
  // THE DEPENDENCY SETS THEMSELVES, censused — because a record of counts and offenders cannot tell
  // pass-by-absence from pass-by-evidence (a peer's finding, zeropoint-node-8a 2026-09-04: "verdict right, reason
  // absent, so the two looked identical"). `offenders: {}` says nothing was found; this says what WAS found —
  // every audited theorem's actual axiom set, folded to distinct sets with their counts. On this tree that is
  // one entry, the empty set, times the whole ledger; the day a theorem inherits propext through a lemma the
  // census names the set even before the offender list does, and a partial audit cannot look like a clean one.
  const dependencySets: Record<string, number> = {}
  let audited = 0
  const unseen: string[] = []
  for (let i = 0; i < files.length; i++) {
    const verdict = results[i]
    for (const key of byFile[files[i]]) {
      if (!(key in verdict)) { unseen.push(key); continue } // no stanza → not audited (missing/renamed)
      audited++
      const set = verdict[key].length ? [...verdict[key]].sort().join(',') : '(none)'
      dependencySets[set] = (dependencySets[set] ?? 0) + 1
      const bad = verdict[key].filter((a) => !ALLOWED.has(a))
      if (bad.length) offenders[addrOf[key]] = bad
    }
  }

  // THE WITNESS NAMES ITS DENOMINATOR, AND IS NOT WRITTEN BY A RUN THAT KNEW IT FAILED (2026-08-25).
  //
  // The receipt was `{ audited, axiomFree, offenders, asked }` — and `axiomFree = audited − offenders`, so on a
  // clean sweep the two agree WHATEVER `audited` happens to be. A full audit writes "1691 audited, 1691
  // axiom-free"; an audit that could not see five theorems writes "1686 audited, 1686 axiom-free", and the file
  // reads exactly as complete. Nothing in it said what it was measuring against, so it had no way to express
  // "I could not cover my subject" — the file's range held one value where the question has three (covered,
  // short, offending). That is no_instrument_narrower_than_its_question, in the one artifact whose entire job is
  // certifying the trust base.
  //
  // AND IT WAS WRITTEN BEFORE THE VERDICT. The drain below already refuses on `unseen`, and the console already
  // printed `audited/total`; but the write happened first, so a failing run still left a complete-looking
  // axioms.json on disk. The console knew and the artifact did not, and the artifact is what everything
  // downstream reads. Observed live by a peer: `npm run lean` regenerated the ledger to 1691 and left a witness
  // saying 1690/1690 — true, complete-looking, and short by exactly the theorem it was supposed to certify.
  //
  // Two changes, and neither alone is enough: `total` gives the file the vocabulary, and moving the write past
  // the drain means a run that has already decided it failed does not get to leave a receipt. A stale witness is
  // then the worst case, and a stale one is at least a statement somebody made about a tree that existed.
  const axiomFree = audited - Object.keys(offenders).length
  const receipt = { audited, total: T.length, axiomFree, offenders, dependencySets, asked: askedKey, wings }

  console.log('\n=== axiom audit — the whole ledger ===')
  console.log('theorems audited :', audited + '/' + T.length + (unseen.length ? ` (${unseen.length} UNSEEN)` : ''))
  console.log('axiom-free       :', axiomFree)
  console.log('trust base       : leanprover/lean4 kernel — allowed axioms: ∅')
  // the EVIDENCE, not just the absence of a finding: what every audited theorem actually depends on
  for (const [set, n] of Object.entries(dependencySets).sort((a, b) => b[1] - a[1]))
    console.log('depends on       :', set, '×', n)

  // DRAIN: any dependency, or any theorem the audit could not see, fails the gate.
  const bad = Object.keys(offenders).length
  if (bad || unseen.length) {
    if (bad) {
      console.error('\n✗ ' + bad + ' theorem(s) depend on a DISALLOWED axiom:')
      const keyOf: Record<string, string> = Object.fromEntries(T.map((t) => [t.address, t.key]))
      for (const [addr, ax] of Object.entries(offenders)) console.error('   ' + keyOf[addr] + ' — [' + ax.join(', ') + ']')
    }
    if (unseen.length) console.error('\n✗ ' + unseen.length + ' theorem(s) produced no axiom verdict: ' + unseen.slice(0, 8).join(', ') + (unseen.length > 8 ? ' …' : ''))
    console.error('\n  lean/axioms.json was NOT written: this run could not cover the ledger, so it has nothing')
    console.error('  to certify. Whatever witness is on disk is the previous one — stale, and honestly stale.')
    process.exitCode = 1
    return
  }
  // PAST THE DRAIN, so this receipt is only ever written by a run that covered its whole subject
  if (!check) {
    writeFileSync(join(ROOT, 'lean', 'axioms.json'), JSON.stringify(receipt) + '\n')
    console.log('wrote lean/axioms.json — ' + audited + '/' + T.length + ' theorems audited, keyed by content-address')
  }
  console.log('\n✓ every theorem depends on NO axioms — the ledger recomputes from the kernel alone.')
}

main()
