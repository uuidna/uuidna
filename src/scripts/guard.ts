#!/usr/bin/env node
// guard — CATCH TRAITORS FAST, before the slow gate. The release path (`npm run next:full`) is thorough but ~9 minutes;
// (crypto KATs + lean regen). This runs the FAST intrusion checks in seconds so a forgery is caught immediately, not
// after a wasted reconcile: the ledger-level treason sweep (DNA recompute, collisions, coverage, conformance —
// pure, O(N)) AND the source-level harmonic-scan (non-quantum / Math.* / wall-clock / RNG sneak). Exit 1 on any traitor.
// Run it after any edit; the reconcile still runs the full gate. No manual pre-flight — one command. Integrity.
import { landingGaps } from './landing-gaps.js'
import { impossibilityGaps } from './impossibility-gaps.js'
import { stampGaps } from './stamp.js'
import { mcpCitationGaps } from '../mcp-citations.js'
import { ratchetGaps } from './ratchet-gaps.js'
import { leakGaps } from './leak-scan.js'
import { RATCHETS } from './ratchets.js'
import { sourceGraph } from '../test-paths.js'
/** the declared debt — files already carrying bare impossibility claims. May only shrink. */
const impossibilityBaseline = (): ReadonlySet<string> => {
  try { return new Set((JSON.parse(rd('lean/impossibility-baseline.json')) as { files: string[] }).files) }
  catch { return new Set() }
}
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { forgedAgainstWings } from '../treason.js'
import { theorems, statementCensus, gridGaps, pairsGaps } from '../index.js'
import { HERE, ROOT, type Gap, rd } from './api.js'
// THE COST OF BEING CONNECTED — the tools/list payload every agent carries on every request, held to a sealed ceiling.
import { contextGaps } from './context-budget.js'
import { MCP_CATALOG } from '../mcp.js'
// the finders, imported rather than spawned — one process, one list (see FINDERS below)
import { fold, legalGaps, proseGaps, dryGaps, countsGaps, expectedGaps, censusGaps, coherentGaps, absenceGaps, pipeGaps, actionsGaps, microGaps, vacuousGaps, negationGaps, frozenGaps, stateGaps, drainGaps, precedeGaps, foldersGaps, importGaps, blocksGaps, linesGaps, staleGaps, scriptsGaps, mirrorGaps, lanesGaps, dormantGaps, pagesGaps, commentsGaps, skillsGaps, citationsGaps, literalGaps, binaryGaps, orphanGaps, unitGaps, hexbitGaps, markupGaps, incompleteGaps, nameGaps, deadkeyGaps, constantGaps} from './one-receipt.js'

let failed = false

// 1) the ledger sweep — pure, O(N), milliseconds
// 0) THE WITNESS, and it runs BEFORE the ledger sweep because the sweep supplies none.
//
// The treason sweep's dna-recomputes check compares toUuid(key ":" statement) to t.address — which withDerived
// DEFINED as that same expression. It compares a pure function to itself, so it is green by construction: a forged entry
// {key:'totally_made_up_theorem', statement:'2 + 2 = 5'} passes it, because a forgery recomputes its own address
// exactly as a real theorem does. Run as a pre-registered trial with that forgery as the control, the check
// returns VOID about the theorem and REFUTED about itself.
//
// A ledger cannot witness itself. The wings can: a theorem exists only if lean/*.lean declares it and the kernel
// accepted it, so the ledger is downstream of them. Two distinct failures are reported — an entry no wing declares
// is an INVENTION, and a real key whose statement no longer matches its wing is DRIFT.
const WINGS = join(ROOT, 'lean')
const wingFiles = readdirSync(WINGS).filter((f: string) => f.endsWith('.lean'))
const wingText = new Map(wingFiles.map((f: string) => [f, readFileSync(join(WINGS, f), 'utf8')]))
const wingSource = [...wingText.values()].join('\n')
const forged = forgedAgainstWings(theorems(), wingSource)
if (forged.length) {
  failed = true
  console.error(`✗ guard — ${forged.length} ledger entr(ies) NOT witnessed by any wing:`)
  // THE INVESTIGATOR IS HANDED THE WINGS (queue lead 119c): a DRIFT that does not name where the key is
  // declared sends the investigator grepping — today the wings are named in the charge itself.
  for (const f of forged.slice(0, 8)) {
    const declaredIn = wingFiles.filter((w) => (wingText.get(w) ?? '').includes('theorem ' + f.key + ' '))
    const where = declaredIn.length ? ` — declared in: ${declaredIn.join(', ')}` : ''
    console.error(`    ${f.key} — ${f.kind === 'no-wing' ? 'no wing declares it (INVENTION)' : 'its wing states something else (DRIFT)'}${where}`)
  }
  console.error('  fix: seal it in a wing, or remove it from the ledger. The ledger may not carry what the kernel never saw.')
} else console.log(`✓ guard — all ${theorems().length} ledger entries witnessed by a wing`)

// treason · conformance · trial — uuidnaOS court via os-mcp-gate --court in the publish chain, not here.

// 1b) the AXIOM WITNESS — bring the guard FORWARD of the slow gate: a clever traitor sealing a NON-KERNEL theorem
// (borrowing propext/Classical.choice) or a NEW theorem not yet audited slips the structural checks and only trips
// the 12s Lean re-run. lean/axioms.json is the derived witness {audited, axiomFree, offenders}; verifying it COVERS
// every current theorem and is fully axiom-free catches that class in milliseconds — no Lean re-run.
try {
  // offenders is a MAP (address → the axioms it borrows) written by lean-axioms. Typed as string[]
  // here, `offenders.length` was ALWAYS undefined — so this check's offender arm never fired, and its error path
  // would have called .join() on an object and thrown instead of naming the traitor. The count comparison below
  // still caught the class (axiomFree = audited − offender keys), but a condition that never fires is not a check.
  const ax = JSON.parse(readFileSync(join(ROOT, 'lean', 'axioms.json'), 'utf8')) as { audited: number; axiomFree: number; offenders?: Record<string, string[]> }
  const N = theorems().length
  const offenders = Object.keys(ax.offenders ?? {})
  // THE COMPARISON IS `!==`, NOT `<`, AND THE ASYMMETRY WAS A HOLE (2026-08-25). `<` catches a ledger that GREW —
  // a new theorem with no witness — and says nothing about one that SHRANK. If theorems are removed, audited > N
  // and the condition never fires, so the witness passes while certifying theorems that are no longer in the
  // ledger: a count vouching for text nobody can now recompute. Both directions are the same defect, which is
  // that the witness and the ledger describe different sets, so both are refused and the message names which way
  // it went rather than assuming growth.
  if (ax.audited !== N) { failed = true; console.error(`✗ guard — AXIOM WITNESS DOES NOT COVER THE LEDGER: ${ax.audited} audited against ${N} theorems (${ax.audited < N ? 'a new theorem lacks a kernel-only witness' : 'the witness vouches for theorems the ledger no longer holds'}) — run \`npm run axioms\``) }
  else if (ax.axiomFree < ax.audited || offenders.length) { failed = true; console.error(`✗ guard — NON-KERNEL theorem: ${ax.axiomFree}/${ax.audited} axiom-free${offenders.length ? '; offenders: ' + offenders.join(', ') : ''} — the ledger borrows an axiom`) }
  else console.log(`✓ guard — axiom witness: ${ax.axiomFree}/${ax.audited} theorems kernel-only (no propext, no Classical.choice), covering all ${N}`)
} catch { failed = true; console.error('✗ guard — no lean/axioms.json witness — run `npm run axioms` (the ledger has no kernel-only proof witness)') }

// 1b) UNIQUENESS COMES FROM LEAN— a theorem is its statement, so two entries proving the same
// proposition under different keys are one theorem wearing two names. The guard REPORTS both counts (so no surface
// can quietly print the larger one) and NAMES every re-naming group. It does not fail on the standing ones — the
// ℤ/9 table lives deliberately in both the core and the ring wing — but it leaves the difference invisible to
// overlook, and a NEW re-naming arrives named, at guard speed, instead of inflating the count in silence.
{
  const c = statementCensus()
  if (c.renamings === 0) console.log(`✓ guard — uniqueness: all ${c.entries} entries are distinct statements (a theorem is its Lean`)
  else {
    console.log(`  guard — uniqueness: ${c.entries} entries, ${c.distinct} DISTINCT statements, ${c.renamings} re-namings across ${c.groups.length} groups (a theorem is its Lean`)
    for (const g of c.groups.slice(0, 5)) console.log(`    · ${g.keys.join(' ≡ ')}  [${g.files.join(', ')}]`)
    if (c.groups.length > 5) console.log(`    · … ${c.groups.length - 5} more groups — the full census: uuidna_statement_census`)
  }
}

// 2) the source sweep — the tightened harmonic-scan (non-quantum + determinism hard-reject), fast
try {
  const { harmonicClean } = await import('./harmonic-scan.js')
  if (!harmonicClean) throw new Error('sneak')
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

// 4d) THE HELD LINES — the session-born finders, wired so their gap classes stay closed: coherent (no mixed
// dist from interleaved writers), absence (no encryption-denial without the presence pointer), pipes (no gate's
// exit code flowing into a pipe), actions (one major per action, tree-wide — the drift that hid a deprecated
// runtime), micro (the JSON-LD layer honest — only when a built site exists to audit).
// Each milliseconds; each was once a manual discovery; none will be again.
// ONE PASS, ONE PROCESS, ONE LIST. The guard used to spawn `one-receipt.js <leaf>` once per finder — each spawn
// re-importing the whole ledger — and it ran only the leaves someone had remembered to add to this array. That is how
// three finders came to exist and never run: `dry`, `seo` and `vacuous` were invoked nowhere in the tree, and the
// vacuous one was holding 12 real findings the moment it was first executed. Now every finder is one entry, called
// in-process, and ALL objections are collected before the verdict — a failing run names every gap at once instead of
// only the first. src/tests/finder-coverage.test.ts closes the dormant-finder class: every exported *Gaps
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
  // ledger held at 1294 because they were REWRITTEN. The class is closed, so it blocks now: no
  // theorem may again be true regardless of its content. `by decide` checks the proposition; this checks that
  // the proposition means its key.
  { name: 'vacuous', run: () => vacuousGaps() },
  // A CITED KEY IS A PUBLISHED CONTRACT: a rename that leaves the ledger green still turns every citation into a
  // fabricated one. Compares the committed ledger to the live one and names any departed key still cited.
  { name: 'citations', run: () => citationsGaps() },
  // A NAME IS NOT A PROOF: every conjunct comparing two bare literals means the key carries the claim alone.
  { name: 'literal', run: () => literalGaps() },
  // A DERIVATION IN A COMMENT IS A DERIVATION NOTHING CHECKS: a literal whose own comment states the arithmetic
  // that produces it should compute it instead, or the value and its reason drift apart in silence.
  { name: 'constant', run: () => constantGaps() },
  // a file grep leaves unread is a file no finder above ever scanned.
  { name: 'binary', run: () => binaryGaps() },
  // a deleted generator whose build output survives still runs, against a ledger that has moved on.
  { name: 'orphan', run: () => orphanGaps() },
  // the hexbit unit has ONE implementation; a second copy is drift waiting to happen.
  { name: 'unit', run: () => unitGaps() },
  // HARD FAIL IF NOT HEXBIT: a width taken bit-at-a-time outside src/hexbit.
  { name: 'hexbit', run: () => hexbitGaps() },
  // a key that claims a universal must have a statement that quantifies one — one step is not a walk.
  { name: 'incomplete', run: () => incompleteGaps() },
  // markup that does not close: compiles, then fails only where it renders.
  { name: 'markup', run: () => markupGaps() },
  // A VALUE NAMED FOR A COMPUTATION MUST BE COMPUTED BY IT — hexbit's law, generalised the day it was needed for a
  // second name. The fold's `movie` leaf was rewritten to digest the ADDRESSES the auras come from: sound reasoning
  // (an aura is a pure function of its address, so the digests move together) and still wrong, because folding
  // addresses computes no aura while the leaf keeps the word. Nothing caught it. The table is DECLARED, and holds
  // only names with a single meaning: `address` and `receipt` were drafted and removed after they flagged ten
  // correct sites. Enters green, with a control that reproduces the original bug.
  { name: 'name', run: () => nameGaps() },
  // A BACKTICKED KEY IS A CITATION. citationsGaps holds /theorem/<key> LINKS and slimGate reads `theorem <key>`, so a
  // bare backticked key was examined by nothing — and docs/school.md cited a key purged with the Clay wing in three
  // places while the guard stayed green. Eleven more dead names surfaced the same way. The hosted edge still serves
  // some of them from an older ledger, which is how one gets written in good faith; only this ledger decides.
  { name: 'deadkey', run: () => deadkeyGaps() },
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
  // A HARDCODED EXPECTED-COUNT IN THE GUARD CHAIN FAILS OPEN. predict-and-fill froze expectedPrinciples = 66 with a
  // `<` test; audit-mcp-native froze T.length === 1195. Both went mute the day the ledger passed them. The live
  // figure is PRINCIPLES.length / theorems().length — computed, never remembered (mass-gap doctrine).
  { name: 'expected', run: () => expectedGaps() },
  // MEASUREMENT HAS ONE LEAN-DERIVED SOURCE (lead 7cc6cbb6). statementCensus() is the census; theorems().length and
  // PRINCIPLES.length are its axes. A generator that freezes total_theorems: N into a drain artifact invents a
  // second census — the captain-complete freeze at 1307 while the ledger held 2120 was exactly that class.
  { name: 'census', run: () => censusGaps() },
  // BLOCKING from birth, by the captain's law "all not lean green fails": a boundary stated bare drops the lead —
  // the reader is told what the work is not and never handed the sealed thing that fixes the bound. It was written
  // advisory with 56 open findings; all 56 were paid in the same landing (the recurring "integrity"
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
  { name: 'imports', run: () => importGaps() },
  // the two Payload emissions must never disagree — richText docs and layout blocks address the same
  // theorem identically, or the "same data, two envelopes" claim from 2026-08-18 ("each theorem is a
  // block") is false. Skips clean when the optional exports have not been generated yet.
  { name: 'blocks', run: () => blocksGaps() },
  // THE 432 GRID IS A LIVE GATE. Its width falls out of two structures that can both move: the
  // six projected rays (the seventh, 'en', is the source the wings are written in, so it holds no seat) and the 72
  // wings the ledger carries. 6·w keeps digital root 9 only when w ≡ 0 (mod 3), so a SINGLE new wing would silently
  // turn 432 into 438 and break the harmony that made the number natural. This finder makes that visible the moment it is done
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
  // seals receipts for a ledger origin has never recomputed. Found live at 129 staged derived against 66 unstaged wings.
  { name: 'precede', run: () => precedeGaps() },
  // THE DRY LAW REACHES package.json — 57 scripts were one hand-typed shape around a single dist script, and the
  // family that had already rotted (lean:<domain>, 30 names for 66 domains) proves a typed list lags what
  // exists. `npm run x -- <script>` dispatches from discovery; an entry survives only when CI, a hook, the README
  // or a docs page calls it by name, and that set is recomputed here rather than declared.
  { name: 'stale', run: () => staleGaps() },
  { name: 'scripts', run: () => scriptsGaps() },
  // A GREEN REPORT OVER AN ACTION NEVER TAKEN — ten times in one session, most plainly in `land` itself, which
  // described "heal → commit → push" while the commit step did not exist. Asks the one decidable question that
  // keeps costing landings: a script that mutates git must verify the mutation.
  { name: 'landing', run: () => landingGaps([...sourceGraph().keys()]) },
  // A CLAIM THAT SOMETHING IS OUT OF REACH NAMES ITS REASON — the captain's law. Six false walls were written and corrected in one
  // session, none caught by a test: a negation that dresses a CHOICE as an IMPOSSIBILITY reads as rigour, so
  // nobody re-examines it and the work behind it never gets done. The existing 622 are a declared debt that may
  // only shrink; a NEW file claiming impossibility must name a host fact, a theorem, a boundary, or by-construction.
  { name: 'impossibility', run: () => impossibilityGaps([...sourceGraph().keys()], impossibilityBaseline()) },
  // A MEASURE MAY NOT BE LOOSENED TO FIT A RESULT. Runs the ratchets: each live measurement against the value
  // sealed in the ledger, and the measure's OWN address before the reading — because a number checked against a
  // ceiling set by a different ruler is worse than an unchecked number, it is a confident verdict about nothing.
  // A STAMPED NUMBER WITH A STALE RECEIPT IS WORSE THAN AN UNSTAMPED ONE. stamp.js fills every ledger slot on
  // every surface and runs inside `npm run lean` — the whole five-minute chain. `lean-one <wing>` seals one wing
  // in 0.087s and is what anyone actually runs for one wing, and it does not stamp. Measured on the landing that
  // added this: a wing of seven theorems left the doctrine page quoting the PREVIOUS census — two figures that
  // were true the day before and stale the moment the wing sealed — each beside a receipt vouching for it. The
  // live values are stampDrift()'s to compute and no comment's to repeat. The provenance is
  // precisely what invites a reader to trust the figure, so a drifted stamp is a forged credential, not a typo.
  // A SERVED DESCRIPTION IS THE MOST LOAD-BEARING SENTENCE IN THE TREE — it is what a model reads to decide
  // whether to call a tool, and audit-citations never saw it: that finder holds the citation law over
  // publications, and the honesty gate drains a CLAIM, not the catalogue's static prose. Zero fabricated today,
  // hand-checked while following a peer lead; a clean hand-check that nothing enforces has a shelf life.
  { name: 'mcpcite', run: () => mcpCitationGaps() },
  { name: 'stamp', run: () => stampGaps() },
  { name: 'ratchet', run: () => ratchetGaps(RATCHETS) },
  // NOTHING LOOKED AT WHAT THE BYTES CONTAIN (the captain, 2026-09-02: "there are git leaks not caught pre
  // push"). pre-push ran guard, the court and reconcile, and not one of them read a committed file for a
  // credential or for this machine's hardware. lean/quantum-advantage.json carried a `device` object — cpu
  // model, core count, installed memory — committed and served publicly, and no gate objected for the whole life
  // of that generator. CI failed it eventually, but only as a determinism drift on a runner with different
  // hardware: a privacy leak caught by accident, and only because it happened to be non-reproducible. A
  // credential reproduces perfectly on every host and would never have been caught at all.
  { name: 'leak', run: () => leakGaps().map((l) => ({ what: `${l.file}:${l.line} — ${l.kind}`, fix: l.why })) },
  // THE MIRROR MUST AGREE BY VALUE— a js mirror doing Number arithmetic past 2^53 can round to
  // the SAME wrong value as the Lean it is checked against and pass emit()'s comparison by luck. Three mirrors
  // needed BigInt in one session (2026-08-19); the third was caught by hand, which is what makes it a finder.
  { name: 'mirror', run: () => mirrorGaps() },
  // A LANE AIMED AT A PATH THE BUILD NO LONGER WRITES DOES NOT FAIL — IT PASSES, AGAINST STALE OUTPUT. All six
  // packages ran from dist/test/ for a day after src/test became src/tests; 108 tests stayed green while testing
  // frozen code. Existence-checked per referenced path, so the class stays closed.
  { name: 'lanes', run: () => lanesGaps() },
  // A MEASURED QUANTITY OWES ITS AUTHORITY. Two sailing theorems were sealed from first-principles derivation and
  // both were wrong; the wing cited nothing. Grandfathered wings live in lean/uncited-wings.json and that list may
  // only SHRINK — new empirical claims must name a standard, an agency, an author-year or a survey. A DATE IS NOT
  // A SOURCE: accepting one is how this finder first passed the very file that motivated it.
  // REACHABLE IS NOT EXERCISED. books.ts sat at 302/302 "supported" while nothing ran its book-reading capability
  // for months. Of the first six dormant scripts actually EXECUTED, two were broken — one read a directory deleted
  // the same day, and one was holding a real finding (1308/1327 theorems claimed). Dormant code rots silently.
  // THE PAYLOAD IS A PER-TURN TOLL. tools/list rides into the model context on EVERY request of
  // every session, and nothing was watching it: it reached 174,903 bytes across 191 tools, 14,401 of them ONE
  // sentence copied verbatim into 87 descriptions. Three classes, each blocking — the sealed ceiling may only
  // shrink, no sentence over the law-phrase bound may repeat across three descriptions, and a description over the
  // wire cap owes its derivation to `detail` (which reaches docs/mcp.md and never the wire).
  { name: 'context', run: () => contextGaps(MCP_CATALOG) },
  // EVERY AUTHORED PAGE REDUCES TO A THEOREM COMBINATION, or declares why it does not. 1399 of 1432 pages already
  // come from two templates with a computed sidebar; of the 33 authored ones, 28 fold to a real theorem set and the
  // rest compute from a data loader or are declared indexes/artifacts. A page that asserts while standing on nothing
  // is unrecomputable, so nothing would catch it drifting.
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
  // ── MOVED TO THE AUDIT CHAIN (`npm run audit`, via one-receipt) ──────────────────────────────────────────────
  // dormant, skills and micro were 580ms of a gate that decides whether a RECONCILE may run, and none of the three
  // protects the commit: dormant asks whether built code is ever exercised, skills whether a sealed skill is
  // reachable through a dispatch, micro whether the built site's JSON-LD cites real addresses. A reconcile with any
  // of those open still stages a correct derived layer over an unforged ledger. What the gate keeps is what makes
  // the COMMIT honest — citations resolving, mirrors agreeing by value, counts current, sources preceding derived.
  // What these three give up is same-minute notice; they now report at audit time, before anything ships.
]
// the meter's floor is tunable so a profiling pass can see every finder, not only the slow ones: UUIDNA_METER=1
const METER = Number(process.env.UUIDNA_METER ?? 200)
const GATE_T0 = process.hrtime.bigint()
// the ledger checks above (traitors, wing witness, axioms, uniqueness, harmonic-scan) run BEFORE this mark, so the
// phase they cost was invisible; process.uptime() covers node boot and module load too, which the finder loop leaves out.
if (process.env.UUIDNA_METER) console.log(`    · boot + ledger checks ${(process.uptime() * 1000).toFixed(0)} ms`)
for (const f of FINDERS) {
  if (f.needsBuiltSite && !existsSync(join(HERE, '../../docs/.vitepress/dist'))) {
    console.log(`· guard — ${f.name} skipped: no built site to audit (run npm run docs:build to include it)`)
    continue
  }
  // THE ONE-SECOND LAW NEEDS A METER on the gate that runs before every reconcile, so the meter ships: a finder
  // over 200ms names itself and its cost, and a slow gate can never again hide inside one total.
  const t0 = process.hrtime.bigint()
  const gaps = await f.run()
  const ms = Number(process.hrtime.bigint() - t0) / 1e6
  if (ms > METER) console.log(`    · ${f.name} took ${ms.toFixed(0)} ms`)
  if (gaps.length) {
    failed = true
    console.error(`✗ guard — ${f.name}: ${gaps.length} gap(s), each with its exact fix:`)
    for (const g of gaps) { console.error(`    GAP ${g.what}`); console.error(`    FIX ${g.fix}`) }
  } else console.log(`✓ guard — ${f.name} clean`)
}

if (process.env.UUIDNA_METER) console.log(`    · blocking finders total ${(Number(process.hrtime.bigint() - GATE_T0) / 1e6).toFixed(0)} ms`)
const TAIL_T0 = process.hrtime.bigint()

// ADVISORY FINDERS — they RUN every pass and print every finding, but do not fail the gate, and each states WHY in one
// line. This tier exists so that "not blocking" is a declared decision instead of the accident it was: `seo` and
// `vacuous` were invoked nowhere in the tree, and the moment `vacuous` first ran it named 12 real findings. A finder
// that reports on every run stays in view; a finder nobody calls is a claim nobody checks.
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
// 5) QUANTUM PREDICTION — MOVED TO THE AUDIT CHAIN. Prediction foresees gaps before they form; it never refuses a
// proof, so it was 815ms of a gate that decides whether a reconcile may run — a quarter of the gate's whole cost
// spent on advice. It now runs as its own step in `npm run audit` (node dist/scripts/predict-and-fill.js), where
// advice belongs. What the gate gives up is seeing a foreseen gap at reconcile time rather than at audit time.

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
if (process.env.UUIDNA_METER) console.log(`    · advisory + fold total ${(Number(process.hrtime.bigint() - TAIL_T0) / 1e6).toFixed(0)} ms`)
console.log('✓ guard — no traitors: the ledger is unforged and the source is harmonic. Quantum fold sealed. Safe to reconcile.')
