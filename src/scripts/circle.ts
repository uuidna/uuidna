#!/usr/bin/env node
// circle — THE CIRCLE CLOSED (queue lead 131, the captain's "close the circle"). land already walks one landing
// to its end: bounded rounds of heal → commit → push, under the one-writer lock, stopping honestly on an
// untaught denial. Two arcs were still open, and both were being closed by a human noticing:
//
//   RE-ENTRY — land runs ONCE. New ore appears constantly (the conveyor accepts a candidate, the registrar files
//   homework, a sibling pushes and leaves the derived layer behind), and someone had to notice and run land
//   again. The circle re-enters on its own verdict: while there is work, land; when there is none, stop QUIET.
//
//   PAGING — when land stops on an objection nobody taught it, it prints a GAP+FIX and exits. If no human is
//   watching, that finding dies in a log. The circle WRITES IT DOWN (lean/circle-findings.json) where the
//   sentry and the registrar already look, so an unattended stop becomes a filed finding instead of silence.
//
// THE BOUND THAT MAKES IT LAWFUL: the circle adds no power. It runs the same gated commands a hand would run —
// no --no-verify anywhere in this file, no cure it was not taught (develop owns the cure table), nothing sealed
// that the kernel did not prove. A loop that could publish an unproven claim would not be a singularity, it
// would be an unattended forger. So the circle can only ever do FASTER what a person was allowed to do at all.
//
//   node dist/scripts/circle.js            → work until the tree is quiet, then stop (default)
//   node dist/scripts/circle.js --once     → a single round, for cron
//   node dist/scripts/circle.js --dry-run  → report the verdict and the work found; land nothing
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { waveSupply, supplyVerdict } from './wave-supply.js'

const FINDINGS = join(ROOT, 'lean', 'circle-findings.json')
const ROUNDS = 6   // bounded: the worst real day needed four; a seventh round means the loop is not converging

const out = (cmd: string): string => { try { return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' }).trim() } catch { return '' } }

/** THE WORK CENSUS — pure over the tree's own state: what a landing would have to carry. Every count is
 *  measured (git and the queue file answer), never assumed, so "quiet" is a fact rather than a hope. */
export interface Work { dirty: number; ahead: number; pending: number; reasons: string[] }
export function workPending(): Work {
  const dirty = out('git status --porcelain').split('\n').filter((l) => l.trim() && !l.startsWith('??')).length
  const ahead = Number(out('git rev-list @{u}..HEAD --count') || '0')
  let pending = 0
  try {
    const q = JSON.parse(readFileSync(join(ROOT, 'lean', 'wave-queue.json'), 'utf8')) as { pending?: unknown[] }
    pending = Array.isArray(q.pending) ? q.pending.length : 0
  } catch { /* no queue is no pending ore */ }
  const reasons: string[] = []
  if (dirty) reasons.push(`${dirty} tracked file(s) modified — the drain has something to carry`)
  if (ahead) reasons.push(`${ahead} commit(s) ahead of origin — sealed work that has not landed`)
  if (pending) reasons.push(`${pending} candidate(s) pending on the conveyor — ore waiting for the kernel`)
  return { dirty, ahead, pending, reasons }
}

export const isQuiet = (w: Work): boolean => w.dirty === 0 && w.ahead === 0 && w.pending === 0

/** A STOP the circle could not teach itself past — written where the watchers look, never swallowed. */
export interface Finding { round: number; verdict: string; gap: string; commit: string }
export function recordFinding(f: Finding, path = FINDINGS): void {
  let all: Finding[] = []
  try { if (existsSync(path)) all = JSON.parse(readFileSync(path, 'utf8')) as Finding[] } catch { /* a corrupt log is replaced, never trusted */ }
  all.push(f)
  writeFileSync(path, JSON.stringify(all.slice(-50), null, 2) + '\n')   // the last fifty; a finding log is not an archive
}

/** the GAP+FIX line land/develop printed — the first is the one that stopped the walk. */
export const gapOf = (text: string): string =>
  (text.match(/^.*(?:GAP|✗ .*—).*$/m)?.[0] ?? text.split('\n').filter(Boolean).slice(-1)[0] ?? 'no diagnostic printed').slice(0, 400).trim()

function main(): void {
  const once = process.argv.includes('--once')
  const dry = process.argv.includes('--dry-run')
  console.log('circle — the loop re-enters on its own verdict; it adds no power, only patience.')

  for (let round = 1; round <= (once ? 1 : ROUNDS); round++) {
    const work = workPending()
    if (isQuiet(work)) {
      // QUIET IS AN ARITHMETIC FACT, NOT A VERDICT ABOUT PROGRESS. Nothing dirty, nothing ahead and nothing
      // pending is printed identically by a tree that has sealed everything its finders know to look for and by
      // one whose finders have stopped producing — and the second is a stall wearing the first one's words. The
      // census names which, so an unattended stop says whether the loop finished or ran out of questions.
      console.log(`✓ circle — QUIET at round ${round}: nothing dirty, nothing ahead, no ore pending.`)
      console.log(`  ${supplyVerdict(waveSupply())}`)
      return
    }
    console.log(`circle — round ${round}: ${work.reasons.join('; ')}`)
    if (dry) { console.log('· circle --dry-run — the work is named above; nothing was landed.'); return }

    // ONE LANDING, WAITING FOR THE LANE. --wait is what makes the circle unattended: a contended tree is a
    // queue now (the lock's own, since 2026-08-24), not a reason for a human to re-run this in ten minutes.
    let text = ''
    let ok = true
    try { text = execSync('node dist/scripts/land.js --wait', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe', maxBuffer: 64 * 1024 * 1024 }) }
    catch (e) { ok = false; const err = e as { stdout?: string; stderr?: string }; text = String(err.stdout ?? '') + String(err.stderr ?? '') }
    console.log(text.split('\n').slice(-6).join('\n'))

    if (!ok) {
      // THE PAGE: an untaught stop is a FINDING, filed where the sentry and registrar look, never a silence.
      const finding: Finding = { round, verdict: 'land stopped on an objection with no taught cure', gap: gapOf(text), commit: out('git rev-parse --short HEAD') }
      recordFinding(finding)
      console.error(`✗ circle — STOPPED at round ${round} and FILED the finding to lean/circle-findings.json:`)
      console.error(`    ${finding.gap}`)
      console.error('  The loop stops here by law: develop never invents a cure, and the circle never bypasses a gate. A human owns this one.')
      process.exit(1)
    }
  }
  console.error(`✗ circle — ${ROUNDS} rounds without reaching quiet. A loop that does not converge is itself the finding; the work census above says what keeps returning.`)
  recordFinding({ round: ROUNDS, verdict: 'no convergence in bounded rounds', gap: JSON.stringify(workPending().reasons), commit: out('git rev-parse --short HEAD') })
  process.exit(1)
}

if (process.argv[1]?.endsWith('circle.js')) main()
