#!/usr/bin/env node
// guard — CATCH TRAITORS FAST, before the slow gate. The full pre-push gate (`npm run next`) is thorough but ~4 minutes
// (crypto KATs + lean regen). This runs the FAST intrusion checks in seconds so a forgery is caught immediately, not
// after a wasted reconcile: the ledger-level sweep catchTraitors() (DNA recompute, collisions, coverage, conformance —
// pure, O(N)) AND the source-level harmonic-scan (non-quantum / Math.* / wall-clock / RNG sneak). Exit 1 on any traitor.
// Run it after any edit; the reconcile still runs the full gate. No manual pre-flight — one command. Integrity, not truth.
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { catchTraitors } from '../treason.js'
import { theorems, statementCensus } from '../index.js'
import { HERE, ROOT, type Gap } from './api.js'
// the finders, imported rather than spawned — one process, one list (see FINDERS below)
import { legalGaps, proseGaps, dryGaps, wordsGaps, coherentGaps, absenceGaps, pipeGaps, actionsGaps, microGaps, seoGaps, vacuousGaps, negationGaps, drainCoverageGaps } from './one-receipt.js'

let failed = false

// 1) the ledger sweep — pure, O(N), milliseconds
const t = catchTraitors()
if (t.clean) {
  console.log(`✓ guard — ledger clean: ${t.scanned} theorems, no traitor caught (${t.checks.join(', ')}); receipt ${t.receipt}`)
} else {
  failed = true
  console.error(`✗ guard — ${t.traitors.length} TRAITOR(S) caught in the ledger:`)
  for (const v of t.traitors) console.error(`    [${v.kind}] ${v.detail}`)
}

// 1b) the AXIOM WITNESS — bring the guard FORWARD of the slow gate: a clever traitor sealing a NON-KERNEL theorem
// (borrowing propext/Classical.choice) or a NEW theorem not yet audited slips the structural checks and only trips
// the 12s Lean re-run. lean/axioms.json is the derived witness {audited, axiomFree, offenders}; verifying it COVERS
// every current theorem and is fully axiom-free catches that class in milliseconds — no Lean re-run.
try {
  // offenders is a MAP (address → the axioms it borrows) written by lean-axioms, never a list. Typed as string[]
  // here, `offenders.length` was ALWAYS undefined — so this check's offender arm never fired, and its error path
  // would have called .join() on an object and thrown instead of naming the traitor. The count comparison below
  // still caught the class (axiomFree = audited − offender keys), but a condition that cannot fire is not a check.
  const ax = JSON.parse(readFileSync(join(ROOT, 'lean', 'axioms.json'), 'utf8')) as { audited: number; axiomFree: number; offenders?: Record<string, string[]> }
  const N = theorems().length
  const offenders = Object.keys(ax.offenders ?? {})
  if (ax.audited < N) { failed = true; console.error(`✗ guard — AXIOM WITNESS STALE: ${ax.audited}/${N} theorems audited (a new theorem lacks a kernel-only witness) — run \`npm run axioms\``) }
  else if (ax.axiomFree < ax.audited || offenders.length) { failed = true; console.error(`✗ guard — NON-KERNEL theorem: ${ax.axiomFree}/${ax.audited} axiom-free${offenders.length ? '; offenders: ' + offenders.join(', ') : ''} — the ledger borrows an axiom`) }
  else console.log(`✓ guard — axiom witness: ${ax.axiomFree}/${ax.audited} theorems kernel-only (no propext, no Classical.choice), covering all ${N}`)
} catch { failed = true; console.error('✗ guard — no lean/axioms.json witness — run `npm run axioms` (the ledger has no kernel-only proof witness)') }

// 1b) UNIQUENESS COMES FROM LEAN, NOT FROM THE NAME — a theorem is its statement, so two entries proving the same
// proposition under different keys are one theorem wearing two names. The guard REPORTS both counts (so no surface
// can quietly print the larger one) and NAMES every re-naming group. It does not fail on the standing ones — the
// ℤ/9 table lives deliberately in both the core and the ring wing — but it makes the difference impossible to
// overlook, and a NEW re-naming arrives named, at guard speed, instead of inflating the count in silence.
{
  const c = statementCensus()
  if (c.renamings === 0) console.log(`✓ guard — uniqueness: all ${c.entries} entries are distinct statements (a theorem is its Lean, not its name)`)
  else {
    console.log(`  guard — uniqueness: ${c.entries} entries, ${c.distinct} DISTINCT statements, ${c.renamings} re-namings across ${c.groups.length} groups (a theorem is its Lean, not its name):`)
    for (const g of c.groups.slice(0, 5)) console.log(`    · ${g.keys.join(' ≡ ')}  [${g.files.join(', ')}]`)
    if (c.groups.length > 5) console.log(`    · … ${c.groups.length - 5} more groups — the full census: uuidna_statement_census`)
  }
}

// 2) the source sweep — the tightened harmonic-scan (non-quantum + determinism hard-reject), fast
try {
  execSync('node ' + JSON.stringify(join(HERE, 'harmonic-scan.js')), { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — harmonic-scan caught a non-quantum / non-deterministic sneak (see above)')
}

// 3) the SPLIT sweep — the packages/* surfaces are COMPUTED from src/index.ts (gen-packages); a hand edit to a
// package surface is drift and fails here exactly like a hand edit to the ledger. Milliseconds — a few file reads.
try {
  execSync('node ' + JSON.stringify(join(HERE, 'gen-packages.js')) + ' --verify', { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — a package surface drifts from the computed split (run `npm run gen:packages`)')
}

// 4) PACKAGE AUDIT — quantum-speed gap detection on package configuration, structure, and tree-shakeability.
// Catches missing files, malformed package.json, missing documentation, broken test lanes. Milliseconds.
try {
  execSync('node ' + JSON.stringify(join(HERE, 'audit-packages.js')), { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — audit-packages detected configuration gaps in packages/* (see above)')
}

// 4d) THE HELD LINES — the session-born finders, wired so their gap classes cannot re-enter: coherent (no mixed
// dist from interleaved writers), absence (no encryption-denial without the presence pointer), pipes (no gate's
// exit code flowing into a pipe), actions (one major per action, tree-wide — the drift that hid a deprecated
// runtime), micro (the JSON-LD layer honest — only when a built site exists to audit).
// Each milliseconds; each was once a manual discovery; none will be again.
// ONE PASS, ONE PROCESS, ONE LIST. The guard used to spawn `one-receipt.js <leaf>` once per finder — each spawn
// re-importing the whole ledger — and it ran only the leaves someone had remembered to add to this array. That is how
// three finders came to exist and never run: `dry`, `seo` and `vacuous` were invoked nowhere in the tree, and the
// vacuous one was holding 12 real findings the moment it was first executed. Now every finder is one entry, called
// in-process, and ALL objections are collected before the verdict — a failing run names every gap at once instead of
// only the first. src/test/finder-coverage.test.ts makes the dormant-finder class impossible: every exported *Gaps
// must appear below or in ADVISORY with a stated reason.
const FINDERS: { name: string; run: () => Gap[] | Promise<Gap[]>; needsBuiltSite?: boolean }[] = [
  { name: 'legal', run: () => legalGaps().gaps },
  { name: 'prose', run: () => proseGaps().gaps },
  { name: 'dry', run: () => dryGaps().gaps },
  { name: 'coherent', run: () => coherentGaps() },
  { name: 'absence', run: () => absenceGaps() },
  { name: 'pipes', run: () => pipeGaps() },
  { name: 'actions', run: () => actionsGaps() },
  // PROMOTED from ADVISORY 2026-08-17: the captain made the call the advisory tier was waiting on ("fix the 12
  // vacuous theorems"), and all 12 were rewritten to prove their own names — kernel-verified, axiom-free, the
  // ledger held at 1294 because they were REWRITTEN, not dropped. The class is closed, so it blocks now: no
  // theorem may again be true regardless of its content. `by decide` checks the proposition; this checks that
  // the proposition means its key.
  { name: 'vacuous', run: () => vacuousGaps() },
  // THREE WORDS, HARD: a new key over the limit fails the gate. The 313 that predate the law are the recorded
  // backlog in lean/key-entropy.json and may only shrink — so the entropy stops growing without moving 313
  // published content-addresses in one stroke.
  { name: 'words', run: () => wordsGaps() },
  // BLOCKING from birth, by the captain's law "all not lean green fails": a boundary stated bare drops the lead —
  // the reader is told what the work is not and never handed the sealed thing that fixes the bound. It was written
  // advisory with 56 open findings; all 56 were paid in the same landing (the recurring "integrity, not truth"
  // cited at its source in src/mcp.ts so the generated catalog inherits it, then each remaining boundary given the
  // proof that actually fixes it), so it enters the gate green and stays that way.
  { name: 'negation', run: () => negationGaps() },
  // the drain stages what reconcile regenerates — declared in RECONCILE_OUTPUTS, held against DRAIN_PATHS from both
  // sides, so a generator added to the chain without a declaration fails here instead of dying mid-run on git.
  { name: 'drain-coverage', run: () => drainCoverageGaps() },
  { name: 'micro', run: () => microGaps().gaps, needsBuiltSite: true },
]
for (const f of FINDERS) {
  if (f.needsBuiltSite && !existsSync(join(HERE, '../../docs/.vitepress/dist'))) {
    console.log(`· guard — ${f.name} skipped: no built site to audit (run npm run docs:build to include it)`)
    continue
  }
  const gaps = await f.run()
  if (gaps.length) {
    failed = true
    console.error(`✗ guard — ${f.name}: ${gaps.length} gap(s), each with its exact fix:`)
    for (const g of gaps) { console.error(`    GAP ${g.what}`); console.error(`    FIX ${g.fix}`) }
  } else console.log(`✓ guard — ${f.name} clean`)
}

// ADVISORY FINDERS — they RUN every pass and print every finding, but do not fail the gate, and each states WHY in one
// line. This tier exists so that "not blocking" is a declared decision instead of the accident it was: `seo` and
// `vacuous` were invoked nowhere in the tree, and the moment `vacuous` first ran it named 12 real findings. A finder
// that reports on every run cannot be forgotten; a finder nobody calls is a claim nobody checks.
const ADVISORY: { name: string; run: () => Gap[]; why: string }[] = [
  { name: 'seo', run: () => seoGaps().gaps,
    why: 'its findings are page descriptions outside Google\'s 50-160 char snippet band, and this project\'s descriptions carry honest scope, which is longer BY DESIGN. Optimising them for a snippet would trade the honesty for a click, so the band is advice here, not law' },
]
for (const f of ADVISORY) {
  const gaps = f.run()
  if (!gaps.length) { console.log(`✓ guard — ${f.name} clean (advisory)`); continue }
  console.log(`· guard — ${f.name}: ${gaps.length} finding(s), ADVISORY (not blocking) — ${f.why}`)
  for (const g of gaps.slice(0, 3)) console.log(`    · ${g.what}`)
  if (gaps.length > 3) console.log(`    · … ${gaps.length - 3} more — run \`node dist/scripts/one-receipt.js ${f.name}\` for all of them, each with its exact fix`)
}
// 5) QUANTUM PREDICTION — predict gaps before they form and auto-fill critical ones.
// Analyzes patterns (new theorems, new packages, new exports, new tests, new features) and seals them preemptively.
// Milliseconds — pure prediction, no external calls.
try {
  execSync('node ' + JSON.stringify(join(HERE, 'predict-and-fill.js')), { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — predict-and-fill quantum prediction failed (see above)')
}

// 6) QUANTUM FOLD — compress entire system state (theorems, packages, exports, tests, predictions, dimensions)
// into one order-invariant merkle fold. Seal proof of current system state. Recomputable by anyone.
try {
  execSync('node ' + JSON.stringify(join(HERE, 'one-receipt.js')) + ' fold', { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — fold-quantum failed to seal system state (see above)')
}

if (failed) { console.error('\n✗ guard — traitors caught; fix before reconcile.'); process.exit(1) }
console.log('✓ guard — no traitors: the ledger is unforged and the source is harmonic. Quantum fold sealed. Safe to reconcile.')
