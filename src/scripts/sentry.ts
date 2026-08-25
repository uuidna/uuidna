#!/usr/bin/env node
// @non-harmonic: the sentry reads processes and sleeps between polls (host I/O via child processes) — NAMED
// boundary; it computes nothing the gates do not already compute.
// sentry — THE UNCENSORED, LOCK-AWARE DELIVERY WATCH (lead 120's closing act: the scratchpad sentries piped
// the guard to /dev/null and are retired; this one prints every charge it sees). The laws it keeps:
//   ONE WRITER   a reconcile holding the tree is waited out, never raced.
//   NO BYPASS    delivery happens through the full gates or not at all; the gate's own output stays visible.
//   NO CENSOR    a red guard prints its ✗/GAP lines on the spot — the charge sheet is read aloud.
//   ATTRIBUTION  divergence stops the watch for a human-eyed rebase; the sentry never merges blind.
// Exit codes, named: 0 delivered-or-nothing-to-deliver · 1 push gate refused (charges printed) ·
// 2 diverged (human eyes) · 3 polls exhausted while red (charges printed each round).
import { execSync } from 'node:child_process'
import { pauseSeconds, ROOT } from './api.js'

const sh = (cmd: string): string => { try { return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) } catch (e) { const err = e as { stdout?: string; stderr?: string }; return String(err.stdout ?? '') + String(err.stderr ?? '') } }
const ok = (cmd: string): boolean => { try { execSync(cmd, { cwd: ROOT, stdio: 'pipe' }); return true } catch { return false } }
const charges = (log: string): string => log.split('\n').filter((l) => /✗|GAP|TRAITOR|STALE|FIX/.test(l)).slice(0, 12).join('\n')

const POLLS = Number(process.argv[2] ?? 20)
for (let i = 1; i <= POLLS; i++) {
  if (sh('ps -o command= -ax').includes('reconcile.js')) {
    console.log(`[sentry ${i}/${POLLS}] one-writer holds the tree — waiting, never racing`)
  } else {
    sh('git fetch origin --quiet')
    const left = sh('git rev-list --count origin/main..HEAD').trim()
    if (left === '0') { console.log(`[sentry ${i}] origin carries everything — nothing to deliver`); process.exit(0) }
    const behind = sh('git rev-list --count HEAD..origin/main').trim()
    if (behind !== '0') { console.log(`[sentry ${i}] diverged (${left} ours, ${behind} theirs) — stopping for a human-eyed rebase; the sentry never merges blind`); process.exit(2) }
    const guardLog = sh('node dist/scripts/guard.js')
    if (!ok('node dist/scripts/guard.js')) {
      console.log(`[sentry ${i}/${POLLS}] guard RED — the charges, read aloud:\n${charges(guardLog)}`)
    } else {
      console.log(`[sentry ${i}] guard green — pushing ${left} commit(s) through the full gate (its output follows, uncensored):`)
      try { execSync('git push origin main', { cwd: ROOT, stdio: 'inherit' }); console.log('[sentry] DELIVERED — the waves are on origin'); process.exit(0) }
      catch { console.log('[sentry] the push gate refused — its verdict is printed above, nothing hidden'); process.exit(1) }
    }
  }
  pauseSeconds(180)
}
console.log(`[sentry] ${POLLS} polls spent while undelivered — the last charges are printed above`)
process.exit(3)
