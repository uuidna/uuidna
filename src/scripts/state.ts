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
import { landingGaps } from './landing-gaps.js'
import { impossibilityGaps } from './impossibility-gaps.js'
import { attestationGaps } from './attestation-gaps.js'
import { accountingGaps } from './accounting-gaps.js'
import { proseProvenanceGaps } from '../prose-provenance.js'
import { stampGaps } from './stamp.js'
import { mcpCitationGaps } from '../mcp-citations.js'
import { ratchetGaps } from './ratchet-gaps.js'
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
import { MCP_CATALOG } from '../mcp.js'
import { ROOT, foldOf } from './api.js'
import { contextGaps } from './context-budget.js'   // the per-request toll of being connected — reported here, blocked in the guard
import { legalGaps, lonelyGaps, incompleteGaps, proseGaps, dryGaps, coherentGaps, absenceGaps, pipeGaps, actionsGaps, vacuousGaps, negationGaps, leanNegationGaps, drainGaps, precedeGaps, frozenGaps, foldersGaps, importGaps, blocksGaps, countsGaps, expectedGaps, censusGaps, linesGaps, scriptsGaps, mirrorGaps, lanesGaps, pagesGaps, commentsGaps, citationsGaps, literalGaps, binaryGaps, orphanGaps, unitGaps, hexbitGaps, markupGaps, nameGaps, deadkeyGaps, staleGaps, constantGaps} from './one-receipt.js'

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
  ['dry', dryGaps().gaps.length], ['coherent', (await coherentGaps()).length], ['absence', absenceGaps().length],
  ['pipes', pipeGaps().length], ['actions', actionsGaps().length], ['vacuous', vacuousGaps().length], ['citations', citationsGaps().length], ['literal', literalGaps().length], ['binary', binaryGaps().length], ['orphan', orphanGaps().length], ['unit', unitGaps().length], ['hexbit', hexbitGaps().length], ['incomplete', incompleteGaps().length], ['markup', markupGaps().length], ['name', nameGaps().length], ['deadkey', deadkeyGaps().length], ['constant', constantGaps().length],
  ['negation', negationGaps().length], ['lean-negation', leanNegationGaps().length], ['drain', drainGaps().length], ['precede', precedeGaps().length], ['frozen', frozenGaps().length], ['stale', staleGaps().length],
  ['leak', leakGaps().length], ['underreach', underreachGaps().length], ['claim-balance', claimBalanceGaps().length], ['ledger-drain', ledgerDrainGaps().length], ['axiom-reach', axiomReachGaps().length], ['deposit-grade', depositGaps().length], ['geometry-exact', geometryGaps().length],
  ['folders', foldersGaps().length], ['imports', importGaps().length], ['blocks', blocksGaps().length], ['scripts', scriptsGaps().length], ['landing', landingGaps([...sourceGraph().keys()]).length], ['impossibility', impossibilityGaps([...sourceGraph().keys()], impossibilityBaseline()).length], ['stamp', stampGaps().length], ['attestation', attestationGaps([...sourceGraph().keys()]).length], ['accounting', accountingGaps().length], ['prose-provenance', proseProvenanceGaps().length], ['mcpcite', mcpCitationGaps().length], ['ratchet', ratchetGaps(RATCHETS).length], ['mirror', mirrorGaps().length], ['involution', involutionGaps().length], ['lanes', lanesGaps().length], ['pages', pagesGaps().length], ['comments', commentsGaps().length],
  ['counts', countsGaps().length], ['expected', expectedGaps().length], ['census', censusGaps().length], ['lines', linesGaps().length],
  ['pairs', pairsGaps().length],
  ['context', contextGaps(MCP_CATALOG).length],
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
  finders: Object.fromEntries(finders),
  next,
}
// --assert makes it a GATE as well as an answer: CI asks the same question the operator does, and a broken law
// exits non-zero with its own name rather than a shell one-liner's opaque message.
if (process.argv.includes('--assert') && broken.length) {
  console.error('✗ state — ' + broken.length + ' law(s) broken: ' + broken.join('; '))
  process.exit(1)
}
console.log(JSON.stringify({ ...state, receipt: foldOf({ ledger: JSON.stringify(state.ledger), sync: JSON.stringify(state.sync), finders: JSON.stringify(state.finders) }) }, null, 1))
