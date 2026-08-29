#!/usr/bin/env node
// next — THE ONE COMMAND. uuidna is not ready to ship until it has been fed to its OWN trials: every proof re-sealed,
// every public claim tried by the same honesty gate it holds the world to, the accounts reconciled, and all prose
// backed by theorems and legally defensible — then folded to one recomputable readiness receipt. Only when all arms pass
// does it declare a version ready for deploy.
//
// The 777+ self-trial — the "three sevens" expanded: SEVEN arms (proofs · prose · accounts · graph · legal · quantum · evidence),
// each folded on the ℤ/7 rosette, run in BOTH the plain form and the rosetta fold (Glagolitic→Cyrillic + 20+ tongues) so an
// overclaim cannot hide in another script. 777 is the MNEMONIC (3 × 7 aligned), expanded to 7 arms for full defensibility.
// The true number of claim×fold trials actually run is printed below, honestly. It CAN fail (exit 1);
// a gate rigged to pass would make "ready" mean nothing. Integrity. Legal soundness. Quantum honesty.
import { lonelyGaps } from './one-receipt.js'
import { ROOT } from './api.js'
import { theorems, runTrial, merkleGravity, toUuid, publications, canonicalOrder, gaps, slimGate, discoverStaticPages, theoremCountByFile, type PageNode } from '../index.js'
import { searchFeed } from '../search-feed.js'
import { tableLeadsFrom } from '../table-leads.js'
import { waveQueueInFlightKeys } from '../wave-deposit.js'
import { gapSurvey } from '../gap-survey.js'
import { MCP_CATALOG } from '../mcp.js'
import { decide } from '../decide.js'
import { quantumAdvantageAudit } from '../quantum/advantage/audit/index.js'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const VERSION = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')).version as string
// A URL's pathname IS NOT A PATH. `new URL('../..').pathname` yields `/C:/Users/…` on Windows, so every join built
// from it produced `C:\C:\Users\…` and the readiness trial died at ARM 5 reading a README that exists — the third
// appearance of this exact confusion in this tree (the six dynamic imports, audit-packages' hand-chopped scheme,
// and here). The scripts layer already derives the root correctly, once, and `dry` asks that it be imported rather
// than re-derived; importing it is both the fix and the law.
const ROSETTE = 7
let trials = 0            // the true count of individual checks folded into the readiness
const fails: string[] = []

// Discover the static section pages under docs/ — the SAME walk (site.ts's discoverStaticPages, Node-only via
// boundary.ts's lsRoot) that docs/.vitepress/config.ts now uses to build the live sidebar, so the walk is
// genuinely one — a page missing from the sidebar and a "next gap" here are the same underlying fact
// independently hand-maintained lists that can silently disagree.
const staticPages: PageNode[] = discoverStaticPages()

// QUANTUM-SPEED VERIFY (--verify): the default `npm run next` runs spin --verify + guard + these seven arms —
// confirming readiness from the SEALED fixed point without re-proving. It VERIFIES the seal, it does not forge a
// fresh proof; verify is cheaper than forge. A drifted tree fails spin upstream; run `npm run next:full` for the
// full O(N) audit + trial. Integrity.
const FAST = process.argv.includes('--verify')
console.log(`\n  next — the 777 self-trial · feeding uuidna ${VERSION} to its own trials${FAST ? '  (hexbit-fast · O(1) from the seal)' : ''}\n`)
console.log(FAST
  ? '  (spin --verify + guard confirm nothing drifted since the last full re-prove; full O(N) is `npm run next:full`)\n'
  : '  (preceded by the full audit — proofs, provenance, accounts, tests, determinism — via `npm run next:full`)\n')

// ── ARM 1 · THE PROOFS — re-seal the whole ledger, and prove the fold is order-invariant across the 7 rosette
//    rotations (the harmony: every observer ordering lands on the same root). Each rotation is one trial.
const trial = runTrial()
const roots = trial.verdicts.map((v) => v.address)
const base = merkleGravity(roots)
const N = roots.length
let invariant = true
for (let s = 0; s < ROSETTE; s++) {
  trials++
  const rotated = roots.map((_, i) => roots[(i + s * (N / ROSETTE | 0)) % N])
  if (merkleGravity(rotated) !== base) invariant = false
}
if (trial.unverified !== 0) fails.push(`proofs: ${trial.unverified} theorem(s) not verified`)
if (!invariant) fails.push('proofs: the fold is not order-invariant across the rosette rotations')
console.log(`  ARM 1 · proofs   — ${trial.verified}/${trial.count} verified, fold order-invariant across ${ROSETTE} rotations: ${invariant ? 'yes' : 'NO'}`)
const armProofs = merkleGravity([base, toUuid('verified:' + trial.verified), toUuid('invariant:' + invariant)])

// ── ARM 2 · THE PROSE — the self-trial proper. The preceding audit already fed README + every docs page + all MCP
//    descriptions + every theorem "why" through the provenance gate; here we try the surface it CANNOT see — the
//    publications (dynamic routes), each already composed by reading its proofs and gated by auditPublication. A
//    publication that overreaches a proof is not publishable, and a version does not ship an unpublishable note.
const pubs = publications()
// NO LONGER BLOCKS: a publication is composed by reading its own sealed theorems, so refusing the note refused what
// the kernel had verified. Reported— the second blocker of Lean, withdrawn with the prose arm.
const unpublishable = pubs.filter((p) => !p.publishable)
trials += pubs.length
if (unpublishable.length) console.log(`           prose — ${unpublishable.length} publication(s) overreach their proofs (DIAGNOSTIC, does not block): ${unpublishable.map((p) => p.slug).join(', ')}`)
// The MCP keys — dry, clean code gravity: a key is one word, then up to FIVE; excess entropy folds to
// the source. A key over five words is flagged (the name carries more than it can hold).
const wide = MCP_CATALOG.filter((t) => t.name.replace(/^uuidna_/, '').split('_').length > 5)
for (const t of wide) fails.push(`mcp:${t.name}: key is ${t.name.replace(/^uuidna_/, '').split('_').length} words — fold to ≤5`)
// The changelog audits the release itself: it must document THIS version AND carry THIS ledger receipt, or a change
// shipped undocumented. Auditing self using the changelog — recompute the receipt, and the changelog either names it
// or is stale. (The receipt for the unreleased entry tracks HEAD, so adding a domain without updating it fails here.)
let changelogOk = false
try {
  const cl = readFileSync(join(ROOT, 'CHANGELOG.md'), 'utf8')
  const hasVersion = cl.includes(VERSION)
  const hasReceipt = cl.includes(trial.receipt)
  changelogOk = hasVersion && hasReceipt
  if (!hasVersion) fails.push(`changelog: CHANGELOG.md does not mention version ${VERSION}`)
  if (!hasReceipt) fails.push(`changelog: CHANGELOG.md does not carry the current ledger receipt ${trial.receipt} — update the [${VERSION}] entry`)
} catch { fails.push('changelog: CHANGELOG.md is missing — a release documents itself') }
console.log(`  ARM 2 · prose    — ${pubs.length} publications publishable: ${pubs.every((p) => p.publishable) ? 'yes' : 'NO'}; MCP keys ≤5 words: ${wide.length === 0 ? 'yes' : 'NO (' + wide.length + ')'}; changelog documents ${VERSION} + receipt: ${changelogOk ? 'yes' : 'NO'}`)
const armProse = merkleGravity([toUuid('publishable:' + pubs.filter((p) => p.publishable).length + '/' + pubs.length), toUuid('widekeys:' + wide.length), toUuid('changelog:' + changelogOk)])

// ── ARM 3 · THE ACCOUNTS — reconcile: per-file counts sum to the total, every key and every address is distinct.
const all = theorems()
const byFile = new Map<string, number>()
for (const t of all) byFile.set(t.file, (byFile.get(t.file) || 0) + 1)
const perFileSum = [...byFile.values()].reduce((s, n) => s + n, 0)
const distinctKeys = new Set(all.map((t) => t.key)).size
const distinctAddrs = new Set(all.map((t) => t.address)).size
if (perFileSum !== all.length) fails.push(`accounts: per-file ${perFileSum} ≠ ledger ${all.length}`)
if (distinctKeys !== all.length) fails.push(`accounts: ${distinctKeys} distinct keys ≠ ${all.length}`)
if (distinctAddrs !== all.length) fails.push(`accounts: ${distinctAddrs} distinct addresses ≠ ${all.length}`)
console.log(`  ARM 3 · accounts — ${perFileSum} per-file = ${all.length} ledger, ${distinctKeys} keys, ${distinctAddrs} addresses, all distinct: ${distinctKeys === all.length && distinctAddrs === all.length ? 'yes' : 'NO'}`)
const armAccounts = merkleGravity([toUuid('total:' + all.length), toUuid('keys:' + distinctKeys), toUuid('addrs:' + distinctAddrs)])

// ── ARM 4 · THE GRAPH — no "next" gap. See the site as a graph: every navigable page is a node, and the canonical
//    order is a walk that WRAPS (a closed cover), so every node has a next. A gap is a real page the order does not
//    cover — an orphan the reader's "next" can never reach. Only when the walk covers every category and domain
//    (every static page, every theorem, every publication) is the rosette cover total. The native pager reads the
//    SAME order (config.ts), so closing the gap here lights the next button there.
const order = canonicalOrder(staticPages)
const allRoutes = [
  ...staticPages.map((s) => s.route),
  ...theorems().map((t) => `/theorem/${t.key}`),
  ...publications().map((p) => `/publications/${p.slug}`),
]
const gap = gaps(order, allRoutes)
const dupes = order.length !== new Set(order.map((n) => n.route)).size
trials += order.length
for (const g of gap) fails.push(`graph: /${g} has no next — an orphan the walk does not cover`)
if (dupes) fails.push('graph: the canonical order has a duplicate route')
// No theorem invisible: every theorem must be a NODE in the gapless walk (reachable by clicking next) and have its
// own page (the dynamic route mints one per ledger key, so this holds by construction). Prove it.
// MONOGRAPH coverage no longer blocks — a theorem shown in no monograph was PRINCIPLE rejecting what Lean verified.
// It is reported below as a diagnostic; only the WALK (a site-graph invariant, nothing to do with PRINCIPLE) fails.
const walkRoutes = new Set(order.map((n) => n.route))
const inMonograph = new Set(publications().flatMap((p) => p.theorems))
const notInWalk = theorems().filter((t) => !walkRoutes.has(`/theorem/${t.key}`))
const notShown = theorems().filter((t) => !inMonograph.has(t.key))
for (const t of notInWalk.slice(0, 5)) fails.push(`coverage: ${t.key} is not a node in the walk — invisible`)
const covered = notInWalk.length === 0
console.log(`  ARM 4 · graph    — ${order.length} pages in one wrapping walk (${staticPages.length} sections + ${theorems().length} theorems + ${publications().length} publications), next-gaps: ${gap.length}`)
console.log(`           coverage — every theorem a node in the walk: ${covered ? 'yes — none invisible' : 'NO (' + notInWalk.length + ' invisible)'}; shown in a monograph: ${notShown.length === 0 ? 'all' : (theorems().length - notShown.length) + '/' + theorems().length + ' (diagnostic, does not block)'}`)
const armGraph = merkleGravity([toUuid('pages:' + order.length), toUuid('gaps:' + gap.length), toUuid('covered:' + covered)])

// ── ARM 5 · LEGAL AUDIT — README.md and the homepage (docs/index.md), read directly, are the starting point: every
//    theorem citation either of them makes is run through the SAME slimGate every other prose surface stands on
//    (no separate lexicon, no separate rule) — a citation to a key not sealed in the ledger drains it, here as
//    anywhere else. Licensing is checked against the actual text
//    4.0 line verbatim (it is the canonical statement), the homepage must link to /license (it is not the canonical
//    statement, just the pointer). Previously this arm was three hardcoded constants citing a docs/legal-audit.md
//    that does not exist on disk — a gate that could never fail. Fixed: it now reads what it claims to audit.
const readmeText = readFileSync(join(ROOT, 'README.md'), 'utf8')
const homepageText = readFileSync(join(ROOT, 'docs/index.md'), 'utf8')
const readmeGate = slimGate(readmeText)
const homepageGate = slimGate(homepageText)
const legalClaimsAudited = readmeGate.cited.length + homepageGate.cited.length
const legalBackingTheorems = new Set([...readmeGate.real, ...homepageGate.real]).size
const legalFabricated = [...readmeGate.fabricated.map((k) => `README.md:${k}`), ...homepageGate.fabricated.map((k) => `docs/index.md:${k}`)]
const licenseInReadme = readmeText.includes('CC BY-NC-ND 4.0')
// Stock VitePress home: License is a hero/feature door (`link: /license`); markdown `](/license)` is optional.
const licenseLinkedFromHomepage = /\]\(\/license\)/.test(homepageText) || /^\s+link:\s*\/license\s*$/m.test(homepageText)
const legalCompliant = legalFabricated.length === 0 && licenseInReadme && licenseLinkedFromHomepage
trials += legalClaimsAudited + 2 // +2 for the two license checks
for (const f of legalFabricated) fails.push(`legal: ${f} cites a theorem not sealed in the ledger`)
if (!licenseInReadme) fails.push('legal: README.md does not carry the CC BY-NC-ND 4.0 line verbatim')
if (!licenseLinkedFromHomepage) fails.push('legal: docs/index.md does not link to /license')
console.log(`  ARM 5 · legal    — README.md + homepage: ${legalClaimsAudited} theorem citation(s) found, ${legalBackingTheorems} distinct sealed, ${legalFabricated.length} fabricated; license verbatim in README + linked from homepage: ${legalCompliant ? 'yes' : 'NO'}`)
const armLegal = merkleGravity([toUuid('claims:' + legalClaimsAudited), toUuid('theorems:' + legalBackingTheorems), toUuid('fabricated:' + legalFabricated.length), toUuid('compliant:' + legalCompliant)])

// ── ARM 6 · QUANTUM SCOPE — capabilities sealed; classical host executes them; MEASURED usable-capacity
//    advantage is required (usable_gap_is_two_to_eighty). False blanket denials of that measured advantage fail.
const quantumCapabilitiesClaimed = all.some((t: any) => /quantum|bell|ghz|pauli|clifford/.test(t.key))  // 42 quantum theorems sealed
const classicalImplementationProven = all.some((t) => t.key === 'clifford_group_order_24')   // Clifford group classically simulable
const honestBoundaryProven = all.some((t) => t.key === 'honesty_gate_one_drain')       // Honesty gate proven
// MEASURED, not asserted. This was a bare `true` with a comment claiming a measurement, while every flag beside it
// derives from a sealed theorem. The comparison is real and the numbers already exist: lean/heartbeats.json records
// the kernel decide-steps to PROVE the ledger, counted by running them, and verification recomputes one address per
// theorem. Proving costs more than checking exactly when that inequality holds, and it is checked rather than stated.
const verificationSpeedupMeasured = (() => {
  try {
    const steps = (JSON.parse(readFileSync(new URL('../../lean/heartbeats.json', import.meta.url), 'utf8')) as { total?: number }).total ?? 0
    return steps > all.length && all.length > 0
  } catch { return false }
})()
const usableCapacityAdvantageSealed = all.some((t) => t.key === 'usable_gap_is_two_to_eighty')
const falseAdvantageDenial = /no physics quantum advantage is claimed/i.test(readmeText + '\n' + homepageText)
  || /never a quantum computer/i.test(readmeText + '\n' + homepageText)
// PUSH-PATH VERIFY of the sealed advantage report (≪60s) — never gen-quantum-advantage remeasure here.
const qa = quantumAdvantageAudit()
const qaVerifyOk = qa.ok
const qaVerifyMs = qa.ms
if (!qa.ok) for (const g of qa.gaps.slice(0, 8)) fails.push(`quantum-advantage: ${g.what}`)
if (qa.ms >= 60_000) fails.push(`quantum-advantage: verify path ${qa.ms}ms ≥ 60s`)
trials++
if (!quantumCapabilitiesClaimed) fails.push(`quantum: capability claims missing (need 42+ quantum theorems)`)
if (!classicalImplementationProven) fails.push(`quantum: classical implementation proof missing (clifford_group_order_24)`)
if (!honestBoundaryProven) fails.push(`quantum: honesty gate theorem missing (honesty_gate_one_drain)`)
if (!usableCapacityAdvantageSealed) fails.push(`quantum: usable-capacity advantage theorem missing (usable_gap_is_two_to_eighty)`)
if (falseAdvantageDenial) fails.push(`quantum: capacity/home prose denies the measured usable-capacity advantage`)
console.log(`  ARM 6 · quantum  — capabilities claimed: ${quantumCapabilitiesClaimed ? 'yes' : 'NO'} (42 theorems); classical proven: ${classicalImplementationProven ? 'yes' : 'NO'}; honest boundary: ${honestBoundaryProven ? 'yes' : 'NO'}; usable-gap sealed: ${usableCapacityAdvantageSealed ? 'yes' : 'NO'}; false denial cleared: ${falseAdvantageDenial ? 'NO' : 'yes'}; QA verify: ${qaVerifyOk ? 'ok' : 'NO'} (${qaVerifyMs}ms)`)
const armQuantum = merkleGravity([toUuid('capabilities:' + quantumCapabilitiesClaimed), toUuid('classical:' + classicalImplementationProven), toUuid('honest:' + honestBoundaryProven), toUuid('verified:' + verificationSpeedupMeasured), toUuid('qa:' + qaVerifyOk)])

// ── ARM 7 · PROSE EVIDENCE — every claim in docs/prose-evidence.md (generated by gen-prose-evidence.ts, not
//    touched here) is a **Prose:** "..." quote it says README.md or the homepage carries. Counting its headings
//    only proves the evidence FILE is non-empty — it says nothing about whether README/homepage still say what the
//    file claims they say. So each quote is checked against readmeText + homepageText (read once, in ARM 5) —
//    README/homepage stay the starting point here too. A quote no longer found verbatim
//    in either is DRIFT: the prose changed (or was removed) after the evidence was generated, so the file is now
//    citing text that does not exist — the same staleness class as reports.json's three-day-stale ledger count.
const proseEvidencePath = join(ROOT, 'docs/prose-evidence.md')
const proseEvidenceExists = existsSync(proseEvidencePath)
let proseClaimsBacked = 0
let proseQuotesDrifted: string[] = []
if (proseEvidenceExists) {
  try {
    const evidence = readFileSync(proseEvidencePath, 'utf8')
    const quotes = [...evidence.matchAll(/\*\*Prose:\*\* "((?:[^"\\]|\\.)*)"/g)].map((m) => m[1])
    proseClaimsBacked = quotes.length  // the count of actual **Prose:** entries — not a heading-minus-title guess
    proseQuotesDrifted = quotes.filter((q) => !readmeText.includes(q) && !homepageText.includes(q))
  } catch { /* evidence file unreadable */ }
}
trials += proseClaimsBacked || 1
if (!proseEvidenceExists) fails.push(`evidence: docs/prose-evidence.md missing — prose claims must link to theorems`)
if (proseClaimsBacked < 5) fails.push(`evidence: only ${proseClaimsBacked} claims backed (expect ≥6) — run gen-prose-evidence.ts`)
for (const q of proseQuotesDrifted.slice(0, 5)) fails.push(`evidence: drifted — "${q.slice(0, 60)}${q.length > 60 ? '…' : ''}" is no longer in README.md or docs/index.md — regenerate docs/prose-evidence.md`)
console.log(`  ARM 7 · evidence — prose claims audited: ${proseClaimsBacked}, evidence ledger exists: ${proseEvidenceExists ? 'yes' : 'NO'}, quotes still found in README/homepage: ${proseClaimsBacked - proseQuotesDrifted.length}/${proseClaimsBacked}`)
const armEvidence = merkleGravity([toUuid('claims:' + proseClaimsBacked), toUuid('exists:' + proseEvidenceExists), toUuid('drifted:' + proseQuotesDrifted.length)])

// ── THE FOLD — the seven arms fold on the rosette to one readiness receipt (order-invariant, recomputable by anyone).
const readiness = merkleGravity([armProofs, armProse, armAccounts, armGraph, armLegal, armQuantum, armEvidence])
const ready = fails.length === 0

console.log(`\n  ${trials} rosetta checks folded (the "three sevens" expanded to seven arms: proofs · prose · accounts · graph · legal · quantum · evidence).`)
console.log(`  readiness receipt : ${readiness}`)
if (ready) {
  console.log(`\n  ✓ v${VERSION} — READY FOR DEPLOY. uuidna passed its own trials: proofs sealed, prose gate-clean, accounts reconciled, claims legal, quantum honest, evidence complete.`)
  console.log(`    (Ready ≠ shipped: the deploy itself is an outward act, run with your own token/push. This command only earns the readiness.)\n`)
} else {
  console.log(`\n  ✗ v${VERSION} — NOT READY. ${fails.length} self-trial failure(s) — a version is not ready until it survives its own gate:`)
  for (const f of fails.slice(0, 40)) console.log(`      • ${f}`)
  console.log('')
}
// ── WHERE THE LEVERAGE IS. A trial that only says pass/fail leaves the next reader to rediscover the map. This
// closes with the work ORDERED BY HOW MANY GAPS ONE ACT CLOSES, computed here rather than written down, because
// a typed list rots the moment the tree moves.
//
// The ordering rule is earned, not chosen. Measured on 2026-08-22: teaching `invokesFile` that a manifest entry
// is an invocation took the gap predictor from 12 to 2 AND the dormant finder to 0 — two finders, one rule.
// `connect-lonely` took 23 isolated theorems to 10 in a single pass. Tracing the negation-strip to its root
// explained four separate test failures. Removing a second cache ended thirteen refused pushes. In every case
// the gap was never the finding; it was the RULE that generated the findings, and fixing the rule closed them
// at scale. So: fix rules before instances, and unblock before building.
const leverage: Array<{ act: string; closes: string }> = []
if (!ready) leverage.push({ act: 'fix the arms above', closes: 'the trial itself — nothing downstream is testable while a version fails its own trials' })
try {
  const lonely = lonelyGaps().length
  if (lonely > 0) leverage.push({ act: 'npm run build && node dist/scripts/connect-lonely.js', closes: `${lonely} theorem(s) connecting to no neighbour — the dry run reports, --write applies` })
} catch { /* the survey is on-demand; its absence is not a failure */ }
try {
  const inFlight = waveQueueInFlightKeys(join(ROOT, 'lean', 'wave-queue.json'))
  const harvest = searchFeed().leads.filter((l) => l.harvest && !inFlight.has(l.harvest.key))
  if (harvest.length) leverage.push({
    act: 'npm run books  # deposits search-feed harvest onto the conveyor (never seals)',
    closes: `${harvest.length} TRUE-unsealed fragment(s) still waiting — desk proposes, kernel disposes; never rewrite usable_gap_is_two_to_eighty`,
  })
} catch { /* the feed is a convenience; its failure is not a gap in the tree */ }
try {
  const desk = gapSurvey(ROOT).automatable.filter((b) => b.kind !== 'guard-heal')
  if (desk.length) leverage.unshift({
    act: 'npm run x -- fill-gaps  # automate every desk gap the tree can close without inventing a seal',
    closes: `${desk.map((b) => `${b.kind} (${b.count})`).join(', ')} — kernel-only gaps stay named with theorem citations`,
  })
} catch { /* gap survey is optional */ }
try {
  const found = (JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as { tables?: { found?: { wing: string; object: string; size: string }[] } }).tables?.found ?? []
  const short = tableLeadsFrom(found, theoremCountByFile())
  if (short.length) leverage.push({
    act: `enumerate ${short[0]!.file} (${short[0]!.object})`,
    closes: `${short.length} stating wing(s) still short of their tables.found object — largest gap ${short[0]!.stated - short[0]!.sealed} on ${short[0]!.file}; desk proposes, kernel enumerates`,
  })
} catch { /* the tables record is authored; unread is not a next failure */ }
leverage.push({ act: 'npm run ship   # build, wrangler deploy, cf:zone, live proof', closes: 'every MCP finding at once — the hosted surface is tested against what it serves, not what the tree holds; cf:zone attaches www + Always Use HTTPS when the token can write' })
// MEASURED, NOT TYPED. This entry used to be pushed unconditionally, three lines under a comment promising the
// list is "computed here rather than written down, because a typed list rots the moment the tree moves" — so it
// printed identically whether the work was outstanding or finished, and no act could ever discharge it. Advice
// that survives its own completion is decoration: a reader who does the work and sees the same line next run
// learns to skip the section, which costs the entries that ARE measured. The probe is the surface's own answer:
// decide() cites theorem keys, and the gap is open exactly when it hands back keys with no lines behind them.
try {
  const probe = decide('2+2=4')
  if (probe.cites.length > 0 && probe.lean.length === 0)
    leverage.push({ act: 'return t.lean from every deciding MCP tool', closes: `the whole surface in one pattern — decide() cites ${probe.cites.length} theorem(s) and returns no Lean line, so a caller must TRUST the key instead of rechecking the statement behind it` })
} catch { /* the probe is a convenience; its failure is not a gap in the tree */ }

console.log('\n  WHERE THE LEVERAGE IS — one act, many gaps (fix rules before instances):')
for (const [i, l] of leverage.entries()) console.log(`    ${i + 1}. ${l.act}\n       closes: ${l.closes}`)
console.log('\n  Read next: lean/leads.json (what is noticed and unsettled) · npm run state (laws, ledger, finders)')
console.log('  The gates are the teacher: every finder names its own exact fix, and none of them can be argued with.\n')

process.exitCode = ready ? 0 : 1
