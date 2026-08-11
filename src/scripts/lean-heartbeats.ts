#!/usr/bin/env node
// Extract the DETERMINISTIC decide-step cost of theorems from the Lean toolchain — the minimum `maxHeartbeats` at
// which `by decide` still verifies, found by binary search. Heartbeats are Lean's machine-INDEPENDENT work measure
// (a too-low cap yields a "(deterministic) timeout"), so this cost recomputes to the SAME number on any machine —
// unlike wall-clock time, and unlike a self-reported token count. It reflects the DECISION work (the domain the
// decide ranges over), which text-size cannot: a 64-case decide costs far more than a one-line arithmetic fact.
//
// Requires the `lean` toolchain and one Lean run per probe, so it is an on-demand CLI measure, not a whole-ledger
// auto-fold. Usage: `npm run heartbeats [key ...]` (defaults to a small sample). Integrity, not truth.
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { theorems } from '../index.js'

const T = theorems()
const TMP = join(tmpdir(), 'uuidna-heartbeat-probe.lean')
const half = (n: number): number => (n - (n % 2)) / 2 // floor(n/2), no Math.*

// Does `by decide` still verify under a maxHeartbeats cap of N? Deterministic — heartbeats are machine-independent.
const fits = (lean: string, N: number): boolean => {
  writeFileSync(TMP, `set_option maxHeartbeats ${N} in\n${lean}\n`)
  try { execSync('lean ' + JSON.stringify(TMP), { stdio: 'pipe', maxBuffer: 32 * 1024 * 1024 }); return true }
  catch (e) {
    const msg = String((e as { stdout?: unknown }).stdout || '') + String((e as { stderr?: unknown }).stderr || '')
    if (/maximum number of heartbeats/.test(msg)) return false // capped out — N too low
    if (msg.trim() === '') return true
    throw new Error('unexpected lean error: ' + msg.slice(0, 160))
  }
}

// The decide-step cost = the minimum maxHeartbeats at which it still passes (binary search).
const costOf = (key: string): number | string => {
  const t = T.find((x) => x.key === key)
  if (!t) return 'not found'
  let hi = 1
  while (!fits(t.lean, hi)) { hi *= 2; if (hi > 4_000_000) return '>4e6' }
  let lo = half(hi) < 1 ? 1 : half(hi)
  while (lo < hi) { const mid = half(lo + hi); if (fits(t.lean, mid)) hi = mid; else lo = mid + 1 }
  return lo
}

const keys = process.argv.slice(2).length ? process.argv.slice(2) : ['ohms_law', 'queen_corner_twentyone', 'knight_leap_is_odd', 'chessboard_two_colours', 'z9add_0_0']
console.log('decide-step cost — minimum maxHeartbeats to verify `by decide` (deterministic, machine-independent, toolchain-extracted):')
for (const k of keys) console.log('  ' + k.padEnd(26) + String(costOf(k)).padStart(8) + ' heartbeats')
