#!/usr/bin/env node
// state — ONE CALL INSTEAD OF SEVEN. Measured on the 2026-08-17 session: 78.2M weighted tokens across 1433 API
// calls, of which 93% was context re-read — so the unit of cost is the TURN. The turns went to
// questions the tree could answer in one breath and did not: is my work on origin, what is the gate objecting to,
// what is the ledger at, what do I run next. Seven git commands to learn "already pushed"; a grep loop to learn
// "the heartbeats are stale". Each answer was cheap and each ASKING cost a full re-read of the conversation.
//
// So this folds the whole question into one receipted answer: the ledger, the sync, the working tree, the fast
// finders, and THE NEXT EXACT COMMAND. Deterministic (no clock, no randomness) and read-only — it changes nothing,
// so it is safe to ask before anything. `npm run state`.
import { linearGaps, memoGaps } from './dry-gaps.js'
import { landingGaps } from './landing-gaps.js'
import { leadsGuardGaps } from './leads-conserved.js'
import { impossibilityGaps } from './impossibility-gaps.js'
import { attestationGaps } from './attestation-gaps.js'
import { accountingGaps } from './accounting-gaps.js'
import { proseProvenanceGaps } from '../prose-provenance.js'
import { stampGaps } from './stamp.js'
import { mcpCitationGaps } from '../mcp-citations.js'
import { ratchetGaps } from './ratchet-gaps.js'
import { API_LEAD_READERS } from '../api-leads.js'
import { docketOf, kernelCheckOf, treeFiles, settlementOf } from './trial-refusals.js'
import { leakGaps } from './leak-scan.js'
import { underreachGaps, claimBalanceGaps } from '../underreach.js'
import { ledgerDrainGaps } from './audit-ledger-drain.js'
import { axiomReachGaps } from '../axiom-reach.js'
import { depositGaps } from '../deposit-records.js'
import { geometryGaps } from '../three-geometry.js'
import { involutionGaps } from '../mirror.js'
import { RATCHETS } from './ratchets.js'
import { rd } from './api.js'
/** the declared impossibility debt — files already carrying bare claims. May only shrink. */
const impossibilityBaseline = (): ReadonlySet<string> => {
  try { return new Set((JSON.parse(rd('lean/impossibility-baseline.json')) as { files: string[] }).files) }
  catch { return new Set() }
}
import { sourceGraph } from '../test-paths.js'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { theorems, statementCensus, editorialState, publicationStatus, pairsGaps, odometerNext, runSequence } from '../index.js'
import { MCP_CATALOG, MCP_LISTED } from '../mcp.js'
import { ROOT, foldOf } from './api.js'
import { contextGaps } from './context-budget.js'   // the per-request toll of being connected — reported here, blocked in the guard
import { legalGaps, lonelyGaps, incompleteGaps, proseGaps, tautologyGaps, dryGaps, coherentGaps, absenceGaps, pipeGaps, actionsGaps, vacuousGaps, negationGaps, leanNegationGaps, drainGaps, precedeGaps, frozenGaps, foldersGaps, importGaps, blocksGaps, countsGaps, expectedGaps, censusGaps, linesGaps, scriptsGaps, mirrorGaps, lanesGaps, pagesGaps, commentsGaps, citationsGaps, literalGaps, binaryGaps, orphanGaps, unitGaps, hexbitGaps, markupGaps, nameGaps, deadkeyGaps, staleGaps, constantGaps, thresholdGaps, lfsGaps} from './one-receipt.js'

const git = (cmd: string): string => { try { return execSync(`git ${cmd}`, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() } catch { return '' } }

git('fetch origin --quiet')
const [ahead, behind] = (git('rev-list --left-right --count main...origin/main') || '0\t0').split(/\s+/).map(Number)
const dirty = git('status --porcelain').split('\n').filter(Boolean)
const ax = JSON.parse(readFileSync(join(ROOT, 'lean', 'axioms.json'), 'utf8')) as { audited: number; axiomFree: number; offenders?: Record<string, string[]> }
const t = theorems()
const census = statementCensus()

// the fast finders — the same ones the guard blocks on, run here to REPORT rather than to gate
const finders: [string, number][] = [
  ['legal', legalGaps().gaps.length], ['prose', proseGaps().gaps.length],
  ['dry', dryGaps().gaps.length], ['linear', linearGaps().length], ['memo', memoGaps().length], ['coherent', (await coherentGaps()).length], ['absence', absenceGaps().length],
  ['pipes', pipeGaps().length], ['actions', actionsGaps().length], ['vacuous', vacuousGaps().length], ['tautology', tautologyGaps().length], ['lfs', lfsGaps().length], ['citations', citationsGaps().length], ['literal', literalGaps().length], ['binary', binaryGaps().length], ['orphan', orphanGaps().length], ['unit', unitGaps().length], ['hexbit', hexbitGaps().length], ['incomplete', incompleteGaps().length], ['markup', markupGaps().length], ['name', nameGaps().length], ['deadkey', deadkeyGaps().length], ['constant', constantGaps().length],
  ['negation', negationGaps().length], ['lean-negation', leanNegationGaps().length], ['drain', drainGaps().length], ['precede', precedeGaps().length], ['frozen', frozenGaps().length], ['stale', staleGaps().length],
  ['leak', leakGaps().length], ['underreach', underreachGaps().length], ['claim-balance', claimBalanceGaps().length], ['ledger-drain', ledgerDrainGaps().length], ['axiom-reach', axiomReachGaps().length], ['deposit-grade', depositGaps().length], ['geometry-exact', geometryGaps().length],
  ['folders', foldersGaps().length], ['imports', importGaps().length], ['blocks', blocksGaps().length], ['scripts', scriptsGaps().length], ['landing', landingGaps([...sourceGraph().keys()]).length], ['leads', leadsGuardGaps().length],['impossibility', impossibilityGaps([...sourceGraph().keys()], impossibilityBaseline()).length], ['stamp', stampGaps().length], ['attestation', attestationGaps([...sourceGraph().keys()]).length], ['accounting', accountingGaps().length], ['prose-provenance', proseProvenanceGaps().length], ['mcpcite', mcpCitationGaps().length], ['ratchet', ratchetGaps(RATCHETS).length], ['mirror', mirrorGaps().length], ['involution', involutionGaps().length], ['threshold', thresholdGaps().length], ['lanes', lanesGaps().length], ['pages', pagesGaps().length], ['comments', commentsGaps().length],
  ['counts', countsGaps().length], ['expected', expectedGaps().length], ['census', censusGaps().length], ['lines', linesGaps().length],
  ['pairs', pairsGaps().length],
  ['context', contextGaps(MCP_CATALOG, MCP_LISTED).length],
]
const dirtyFinders = finders.filter(([, n]) => n > 0)
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string }
const patch = Number(String(pkg.version).split('.')[2])
const seq = runSequence(Number.isInteger(patch) ? patch : 0)
const originNext =
  seq.fixed
    ? `in-tree origin ${pkg.version} — runSequence(${seq.seed}).fixed; odometerNext → ${odometerNext(pkg.version)} (no tag/npm/Zenodo)`
    : seq.seed % 2 === 1
      ? `npm run search:trial:all   # invert seat runSequence(${seq.seed}).reflection=${seq.reflection}`
      : `npm run develop   # double seat runSequence(${seq.seed}).reflection=${seq.reflection}`

// ── THE TWO QUEUES `next` COULD NOT SEE ──────────────────────────────────────────────────────────────────────────
// The captain, 2026-09-26: "why next is not fused yet to autonomous coverage of all leads and news?" Because every
// term in the waterfall below was a GATE, and leads and news are QUEUES. A waterfall names a queue only if something
// puts the queue in it, and nothing did: the court's settlement orders reached the Stop hook alone, and the API
// readings reached `npm run outward` alone, which no term named. So a tree could be green, clean, pushed and fully
// reconciled while 53 orders and every unread API disagreement sat untouched — and `next` would answer with the
// release seat, which is the one thing that must not happen over an open lead.
//
// BOTH COUNTS WERE ALREADY COMPUTABLE, which is what makes this a fuse and not a feature: settlementOf already
// decides whether an order stands, and API_LEAD_READERS already turns each saved API reading into open leads. They
// are read here rather than re-derived, and a reading that is absent counts as UNREAD rather than as zero — an
// absent measurement is not a clean one, which is the same distinction release-live draws about the network.
const openOrders = ((): number => {
  try {
    const ok = kernelCheckOf().ok
    const files = treeFiles()
    // the same file trial-refusals reads, read the same way — an absent seal file is {} there and is {} here, so
    // the two surfaces cannot disagree about whether a verdict is signed
    let seals: Record<string, never[]> = {}
    try { seals = JSON.parse(readFileSync(join(ROOT, 'lean', 'witness-seals.json'), 'utf8')) } catch { seals = {} }
    return docketOf().filter((d) => {
      const st = settlementOf(d, ok, files, t, seals)
      return st !== null && !st.stands
    }).length
  } catch { return -1 }              // -1 is UNREAD, never 0 — the court could not be asked
})()

const news = ((): { open: number; unread: number } => {
  let open = 0, unread = 0
  for (const r of API_LEAD_READERS) {
    let json: unknown | null = null
    try { json = JSON.parse(readFileSync(join(ROOT, r.path), 'utf8')) } catch { json = null }
    const reading = r.of(json)
    // SourceReading's field is `reached`, not `read`. src/leads.ts chose that word deliberately — its comment says
    // `reached: false` "is a fact about the reader, never about the tree" — and the distinction is the whole point
    // of counting unread separately from open.
    if (reading.reached === false) unread += 1
    open += reading.open.length
  }
  return { open, unread }
})()

// THE NEXT COMMAND — the one thing to run, decided by the same order the gate applies, so nobody has to guess
const next =
  dirtyFinders.length ? `npm run guard   # ${dirtyFinders.map(([n, c]) => `${n}:${c}`).join(' ')} — each finding carries its exact fix`
  // `!==` rather than `<`: a ledger that SHRANK leaves audited > length, and a witness vouching for theorems the
  // ledger no longer holds is exactly as stale as one missing a new theorem. And the command named is `npm run
  // axioms`, which BUILDS first — the bare `node dist/scripts/lean-axioms.js` audits whatever dist happens to
  // hold, which is the stale-denominator trap; it now refuses rather than answering, so naming it here would be
  // handing the operator a command that stops.
  : ax.audited !== t.length ? 'npm run axioms   # the axiom witness does not cover the ledger'
  : dirty.length ? 'npm run reconcile   # the tree is dirty; the drain regenerates and stages what it owns'
  : behind > 0 && ahead > 0 ? 'git pull --no-rebase   # diverged; the derived layer merges by recomputation (merge=derived)'
  : behind > 0 ? 'git pull --rebase'
  : ahead > 0 ? 'git push origin main'
  // ── AND ONLY THEN THE QUEUES. A red gate blocks everything, so the gate terms come first; an unpushed commit is
  // cheap to clear, so sync comes next. What follows is the work itself, and it precedes the release seat because
  // release-cut's own first gate is "NO RELEASE OVER AN OPEN LEAD" — naming the seat while an order stands would
  // hand the operator a command that refuses.
  : openOrders > 0 ? `npm run x -- trial-refusals --orders   # ${openOrders} settlement(s) no wave has investigated — claim, then send the 2x7`
  : openOrders < 0 ? 'npm run x -- trial-refusals   # the court could not be asked — its record does not recompute'
  : news.unread > 0 ? `npm run outward   # ${news.unread} of ${API_LEAD_READERS.length} API readings are UNREAD — an absent measurement is not a clean one`
  : news.open > 0 ? `npm run x -- api-leads   # ${news.open} open lead(s) from the public APIs — the world disagrees with a sealed claim`
  : originNext

// the LAWS the desk used to hand-query in a CI shell with `node -e` — folded here so the same answer serves the
// operator asking "where am I" and the workflow asking "may this publish", instead of two hand-written copies.
const ed = editorialState()
const pub = publicationStatus()
const broken = [
  ed.drained > 0 ? `editorial: ${ed.drained} drained` : '',
  pub.licenseLawHolds ? '' : 'publication: license law broken',
  pub.conforms ? '' : 'publication: conformance broken',
  ax.audited !== t.length ? `axiom witness does not cover the ledger: ${ax.audited}/${t.length}` : '',
  Object.keys(ax.offenders ?? {}).length ? 'ledger borrows an axiom' : '',
  ...dirtyFinders.map(([n, c]) => `${n}: ${c} finding(s)`),
].filter(Boolean)

const state = {
  laws: { drained: ed.drained, usable: ed.usable, licenseLawHolds: pub.licenseLawHolds, conforms: pub.conforms, version: pub.version, broken },
  ledger: { theorems: t.length, axiomFree: ax.axiomFree, offenders: Object.keys(ax.offenders ?? {}).length, principles: new Set(t.map((x) => x.principle)).size, tools: MCP_CATALOG.length, distinct: census.distinct, renamings: census.renamings },
  sync: { ahead, behind, dirty: dirty.length },
  // ONLY THE GAPS ARE NEWS, and this file's own header says why: the unit of cost is the TURN, and 93% of it is
  // context re-read. Reporting all 56 finders by name cost 990 of state's 1491 bytes — two thirds of the most-
  // called status surface in this tree spent on sixty lines each saying zero. A clean finder is not information;
  // the COUNT of clean finders is, because it proves the battery ran and how wide it was. So: how many were
  // asked, how many are clean, and the name-and-number of every one that is not. Nothing is hidden — a gap is
  // named exactly as before, and a reader who wants the roster has `npm run guard`.
  finders: { asked: finders.length, clean: finders.length - dirtyFinders.length, gaps: Object.fromEntries(dirtyFinders) },
  court: { openOrders, docket: docketOf().length },
  news: { open: news.open, unread: news.unread, sources: API_LEAD_READERS.length },
  next,
}
// --assert makes it a GATE as well as an answer: CI asks the same question the operator does, and a broken law
// exits non-zero with its own name rather than a shell one-liner's opaque message.
if (process.argv.includes('--assert') && broken.length) {
  console.error('✗ state — ' + broken.length + ' law(s) broken: ' + broken.join('; '))
  process.exit(1)
}
console.log(JSON.stringify({ ...state, receipt: foldOf({ ledger: JSON.stringify(state.ledger), sync: JSON.stringify(state.sync), finders: JSON.stringify(state.finders) }) }, null, 1))
