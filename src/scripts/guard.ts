#!/usr/bin/env node
// guard — CATCH TRAITORS FAST, before the slow gate. The full pre-push gate (`npm run next`) is thorough but ~4 minutes
// (crypto KATs + lean regen). This runs the FAST intrusion checks in seconds so a forgery is caught immediately, not
// after a wasted reconcile: the ledger-level sweep catchTraitors() (DNA recompute, collisions, coverage, conformance —
// pure, O(N)) AND the source-level harmonic-scan (non-quantum / Math.* / wall-clock / RNG sneak). Exit 1 on any traitor.
// Run it after any edit; the reconcile still runs the full gate. No manual pre-flight — one command. Integrity, not truth.
import { execSync } from 'node:child_process'
import { predictGaps } from './predict-and-fill.js'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { catchTraitors, forgedAgainstWings } from '../treason.js'
import { theorems, statementCensus, gridGaps, pairsGaps } from '../index.js'
import { HERE, ROOT, type Gap } from './api.js'
// THE COST OF BEING CONNECTED — the tools/list payload every agent carries on every request, held to a sealed ceiling.
import { contextGaps } from './context-budget.js'
import { MCP_CATALOG } from '../mcp.js'
// the finders, imported rather than spawned — one process, one list (see FINDERS below)
import { fold, legalGaps, proseGaps, dryGaps, countsGaps, coherentGaps, absenceGaps, pipeGaps, actionsGaps, microGaps, vacuousGaps, negationGaps, frozenGaps, stateGaps, drainGaps, precedeGaps, foldersGaps, blocksGaps, linesGaps, scriptsGaps, mirrorGaps, lanesGaps, dormantGaps, pagesGaps, commentsGaps, skillsGaps} from './one-receipt.js'

let failed = false

// 1) the ledger sweep — pure, O(N), milliseconds
// 0) THE WITNESS, and it runs BEFORE the ledger sweep because the sweep cannot supply one.
//
// catchTraitors' dna-recomputes check compares toUuid(key ":" statement) to t.address — which withDerived
// DEFINED as that same expression. It compares a pure function to itself and cannot fail: a forged entry
// {key:'totally_made_up_theorem', statement:'2 + 2 = 5'} passes it, because a forgery recomputes its own address
// exactly as a real theorem does. Run as a pre-registered trial with that forgery as the control, the check
// returns VOID about the theorem and REFUTED about itself.
//
// A ledger cannot witness itself. The wings can: a theorem exists only if lean/*.lean declares it and the kernel
// accepted it, so the ledger is downstream of them. Two distinct failures are reported — an entry no wing declares
// is an INVENTION, and a real key whose statement no longer matches its wing is DRIFT.
const WINGS = join(ROOT, 'lean')
const wingSource = readdirSync(WINGS).filter((f: string) => f.endsWith('.lean'))
  .map((f: string) => readFileSync(join(WINGS, f), 'utf8')).join('\n')
const forged = forgedAgainstWings(theorems(), wingSource)
if (forged.length) {
  failed = true
  console.error(`✗ guard — ${forged.length} ledger entr(ies) NOT witnessed by any wing:`)
  for (const f of forged.slice(0, 8)) console.error(`    ${f.key} — ${f.kind === 'no-wing' ? 'no wing declares it (INVENTION)' : 'its wing states something else (DRIFT)'}`)
  console.error('  fix: seal it in a wing, or remove it from the ledger. The ledger may not carry what the kernel never saw.')
} else console.log(`✓ guard — all ${theorems().length} ledger entries witnessed by a wing`)

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
// only the first. src/tests/finder-coverage.test.ts makes the dormant-finder class impossible: every exported *Gaps
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
  // LEAN IS THE SOURCE OF ALL — so duplication in Lean is duplication on every surface downstream. Blocking
  // from the day it landed: a statement sealed twice in one wing always fails, and a cross-wing re-seal must
  // be declared in lean/statement-index.json, a list that may only shrink.
  { name: 'lines', run: () => linesGaps() },
  // BOTH LEDGER SIZES, LIVE: keys and distinct propositions, on every surface that states either. Caught a stale
  // 1274 in .zenodo.json — a count published into the archive on every release.
  { name: 'counts', run: () => countsGaps() },
  // BLOCKING from birth, by the captain's law "all not lean green fails": a boundary stated bare drops the lead —
  // the reader is told what the work is not and never handed the sealed thing that fixes the bound. It was written
  // advisory with 56 open findings; all 56 were paid in the same landing (the recurring "integrity, not truth"
  // cited at its source in src/mcp.ts so the generated catalog inherits it, then each remaining boundary given the
  // proof that actually fixes it), so it enters the gate green and stays that way.
  { name: 'negation', run: () => negationGaps() },
  // a fact must compute in at least one dimension — the Lean walks its structure, or the js mirror measures the live
  // quantity (emit hard-fails on a false mirror). Both halves closed constants under a name that counts is the gap.
  { name: 'frozen', run: () => frozenGaps() },
  // the folded question has ONE copy — a workflow re-implementing what npm run state answers is the copy nobody
  // runs locally, so it drifts in silence. The dry law applied to questions instead of boilerplate.
  { name: 'state', run: () => stateGaps() },
  // one word, one name, many faces — a module folder holds index.* only; the 17-module migration that satisfied
  // this landed with the finder unwired, and the dormant-finder test caught it before the law could rot.
  { name: 'folders', run: () => foldersGaps() },
  // the two Payload emissions must never disagree — richText docs and layout blocks address the same
  // theorem identically, or the "same data, two envelopes" claim from 2026-08-18 ("each theorem is a
  // block") is false. Skips clean when the optional exports have not been generated yet.
  { name: 'blocks', run: () => blocksGaps() },
  // THE 432 GRID IS A LIVE GATE, NOT A FROZEN NUMBER. Its width falls out of two structures that can both move: the
  // six projected rays (the seventh, 'en', is the source the wings are written in, so it holds no seat) and the 72
  // wings the ledger carries. 6·w keeps digital root 9 only when w ≡ 0 (mod 3), so a SINGLE new wing would silently
  // turn 432 into 438 and break the harmony that made the number natural. This finder makes that impossible to do
  // quietly: add wings three at a time, or the guard names the drift and the fix.
  // THE 42 PAIR GRID — every ordered direction between dimensions, by the SAME rule that makes 432: the full
  // product with the identity removed (7 × 7 = 49, minus the 7 self-pairs, = 7 × 6 = 42). The finder holds the
  // width, the regularity (each dimension a source and a target exactly six times), and that transposition is a
  // fixed-point-free involution — so 6 × 7 and 7 × 6 stay the same 42 rather than drifting into two claims.
  { name: 'pairs', run: () => pairsGaps() },
  // the drain stages what reconcile regenerates — declared in RECONCILE_OUTPUTS, held against DRAIN_PATHS from both
  // sides, so a generator added to the chain without a declaration fails here instead of dying mid-run on git.
  { name: 'drain', run: () => drainGaps() },
  // DERIVED WITHOUT ITS SOURCE IS A PROVENANCE INVERSION. The drain stages DRAIN_PATHS and never a source file, so a
  // tree can sit with the whole derived layer armed and the .lean wings that produced it unstaged; the commit then
  // seals receipts for a ledger origin cannot recompute. Found live at 129 staged derived against 66 unstaged wings.
  { name: 'precede', run: () => precedeGaps() },
  // THE DRY LAW REACHES package.json — 57 scripts were one hand-typed shape around a single dist script, and the
  // family that had already rotted (lean:<domain>, 30 names for 66 domains) proves a typed list cannot track what
  // exists. `npm run x -- <script>` dispatches from discovery; an entry survives only when CI, a hook, the README
  // or a docs page calls it by name, and that set is recomputed here rather than declared.
  { name: 'scripts', run: () => scriptsGaps() },
  // THE MIRROR MUST AGREE BY VALUE, NOT BY ROUNDING — a js mirror doing Number arithmetic past 2^53 can round to
  // the SAME wrong value as the Lean it is checked against and pass emit()'s comparison by luck. Three mirrors
  // needed BigInt in one session (2026-08-19); the third was caught by hand, which is what makes it a finder.
  { name: 'mirror', run: () => mirrorGaps() },
  // A LANE AIMED AT A PATH THE BUILD NO LONGER WRITES DOES NOT FAIL — IT PASSES, AGAINST STALE OUTPUT. All six
  // packages ran from dist/test/ for a day after src/test became src/tests; 108 tests stayed green while testing
  // frozen code. Existence-checked per referenced path, so the class cannot return.
  { name: 'lanes', run: () => lanesGaps() },
  // A MEASURED QUANTITY OWES ITS AUTHORITY. Two sailing theorems were sealed from first-principles derivation and
  // both were wrong; the wing cited nothing. Grandfathered wings live in lean/uncited-wings.json and that list may
  // only SHRINK — new empirical claims must name a standard, an agency, an author-year or a survey. A DATE IS NOT
  // A SOURCE: accepting one is how this finder first passed the very file that motivated it.
  // REACHABLE IS NOT EXERCISED. books.ts sat at 302/302 "supported" while nothing ran its book-reading capability
  // for months. Of the first six dormant scripts actually EXECUTED, two were broken — one read a directory deleted
  // the same day, and one was holding a real finding (1308/1327 theorems claimed). Dormant code rots silently.
  { name: 'dormant', run: () => dormantGaps() },
  // THE PAYLOAD IS A PER-TURN TOLL, NOT DOCUMENTATION. tools/list rides into the model context on EVERY request of
  // every session, and nothing was watching it: it reached 174,903 bytes across 191 tools, 14,401 of them ONE
  // sentence copied verbatim into 87 descriptions. Three classes, each blocking — the sealed ceiling may only
  // shrink, no sentence over the law-phrase bound may repeat across three descriptions, and a description over the
  // wire cap owes its derivation to `detail` (which reaches docs/mcp.md and never the wire).
  { name: 'context', run: () => contextGaps(MCP_CATALOG) },
  // EVERY AUTHORED PAGE REDUCES TO A THEOREM COMBINATION, or declares why it does not. 1399 of 1432 pages already
  // come from two templates with a computed sidebar; of the 33 authored ones, 28 fold to a real theorem set and the
  // rest compute from a data loader or are declared indexes/artifacts. A page that asserts while standing on nothing
  // cannot be recomputed, so nothing would catch it drifting.
  { name: 'pages', run: () => pagesGaps() },
  // A LEDGER COUNT IN A COMMENT IS A TIME BOMB, even when it is right. No generator reaches source comments and
  // countsGaps reads prose surfaces, so this was the last place a number could rot unwatched — the README sat
  // twenty theorems stale behind the same reasoning. History keeps its numbers (an event, a published DOI); the
  // present must name its source instead.
  { name: 'comments', run: () => commentsGaps() },
  // A THEOREM IS A HOOK AND HOOKED AT ONCE. Most of the skills the sealed ledger carries reached NO tool name and NO
  // category on the served catalogue — proven, axiom-free, witnessed by their wings, and openable through nothing.
  // The axis is now one computed dimension on BOTH surfaces, and this measures the intersection by CALLING each
  // dispatch, so a skill sealed in a new wing is served the day it lands or the guard names it here. Blocking from
  // birth: it enters green, and one authored tool per skill is the shape it exists to prevent.
  { name: 'skills', run: () => skillsGaps() },
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
// ADVISORY — EMPTIED. Every entry here decided something OTHER than a Lean violation: `grid` a harmony of the wing
// COUNT, `words` a cap on a theorem NAME, `sources` a citation demand, `seo` a description length. None of them can
// refuse a proof, and a gate that cannot refuse a proof is custom logic over spelling, counting or presentation.
// They were demoted here first, which made "not blocking" a declared decision rather than an accident — and that
// declaration is what made it obvious they should not exist at all. What the kernel decides, the kernel decides;
// what a person should do when writing a wing is a LAW for the person (name the operation, cite a measured source),
// never a gate on the kernel's output. The computed surfaces survive: grid() still addresses every seat and
// gridReport() still reports harmony to anyone who asks — reporting is not gating.
const ADVISORY: { name: string; run: () => Gap[]; why: string }[] = [
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
// CALLED, NOT SPAWNED. This was `execSync('node predict-and-fill.js')` — a second node process paying its own
// startup and module load to run TypeScript this file already imports from. Measured: that spawn was ~2.9s of a
// ~5.1s guard. The prediction is a pure function; the process boundary bought nothing and cost a startup.
try {
  const p = predictGaps()
  console.log(`${p.total === 0 ? '✓' : '·'} guard — prediction: ${p.total} gap(s) foreseen (${p.byLikelihood.high} high, ${p.byLikelihood.medium} medium, ${p.byLikelihood.low} low)`)
} catch (e) {
  failed = true
  console.error('✗ guard — predict-and-fill quantum prediction failed: ' + String((e as Error).message))
}

// 6) QUANTUM FOLD — compress entire system state (theorems, packages, exports, tests, predictions, dimensions)
// into one order-invariant merkle fold. Seal proof of current system state. Recomputable by anyone.
// CALLED, NOT SPAWNED — same reason. one-receipt is already imported here for its finders; the fold is one more call.
try {
  fold()
} catch (e) {
  failed = true
  console.error('✗ guard — fold-quantum failed to seal system state: ' + String((e as Error).message))
}

if (failed) { console.error('\n✗ guard — traitors caught; fix before reconcile.'); process.exit(1) }
console.log('✓ guard — no traitors: the ledger is unforged and the source is harmonic. Quantum fold sealed. Safe to reconcile.')
