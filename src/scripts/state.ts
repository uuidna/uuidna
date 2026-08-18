#!/usr/bin/env node
// state — ONE CALL INSTEAD OF SEVEN. Measured on the 2026-08-17 session: 78.2M weighted tokens across 1433 API
// calls, of which 93% was context re-read — so the unit of cost is the TURN, not the tool. The turns went to
// questions the tree could answer in one breath and did not: is my work on origin, what is the gate objecting to,
// what is the ledger at, what do I run next. Seven git commands to learn "already pushed"; a grep loop to learn
// "the heartbeats are stale". Each answer was cheap and each ASKING cost a full re-read of the conversation.
//
// So this folds the whole question into one receipted answer: the ledger, the sync, the working tree, the fast
// finders, and THE NEXT EXACT COMMAND. Deterministic (no clock, no randomness) and read-only — it changes nothing,
// so it is safe to ask before anything. `npm run state`.
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { theorems, statementCensus, editorialState, publicationStatus, gridGaps, pairsGaps } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'
import { ROOT, foldOf } from './api.js'
import { legalGaps, proseGaps, dryGaps, coherentGaps, absenceGaps, pipeGaps, actionsGaps, vacuousGaps, negationGaps, drainGaps, frozenGaps, foldersGaps, blocksGaps, wordsGaps, countsGaps } from './one-receipt.js'

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
  ['pipes', pipeGaps().length], ['actions', actionsGaps().length], ['vacuous', vacuousGaps().length],
  ['negation', negationGaps().length], ['drain', drainGaps().length], ['frozen', frozenGaps().length],
  ['folders', foldersGaps().length], ['blocks', blocksGaps().length],
  ['words', wordsGaps().length], ['counts', countsGaps().length],
  ['grid', gridGaps().length],
  ['pairs', pairsGaps().length],
]
const dirtyFinders = finders.filter(([, n]) => n > 0)

// THE NEXT COMMAND — the one thing to run, decided by the same order the gate applies, so nobody has to guess
const next =
  dirtyFinders.length ? `npm run guard   # ${dirtyFinders.map(([n, c]) => `${n}:${c}`).join(' ')} — each finding carries its exact fix`
  : ax.audited < t.length ? 'node dist/scripts/lean-axioms.js   # the axiom witness is stale'
  : dirty.length ? 'npm run reconcile   # the tree is dirty; the drain regenerates and stages what it owns'
  : behind > 0 && ahead > 0 ? 'git pull --no-rebase   # diverged; the derived layer merges by recomputation (merge=derived)'
  : behind > 0 ? 'git pull --rebase'
  : ahead > 0 ? 'git push origin main'
  : 'nothing — synced, clean, and green'

// the LAWS the desk used to hand-query in a CI shell with `node -e` — folded here so the same answer serves the
// operator asking "where am I" and the workflow asking "may this publish", instead of two hand-written copies.
const ed = editorialState()
const pub = publicationStatus()
const broken = [
  ed.drained > 0 ? `editorial: ${ed.drained} drained` : '',
  pub.licenseLawHolds ? '' : 'publication: license law broken',
  pub.conforms ? '' : 'publication: conformance broken',
  ax.audited < t.length ? `axiom witness stale: ${ax.audited}/${t.length}` : '',
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
