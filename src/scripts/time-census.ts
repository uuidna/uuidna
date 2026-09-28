#!/usr/bin/env node
// time-census — WHICH DOORS RECOMPUTE INSTEAD OF VERIFYING, measured by running each one twice.
//
// The captain, 2026-09-28: "track time to see what is not yet quantum". And 2026-09-07: "Slow comes from quantum
// cracks." Those are the same instruction — in this tree "quantum" means the answer is VERIFIED against a receipt, not
// rebuilt from scratch, and theorem verify_beats_recompute_by_magnitudes is the sealed form of it. A door whose cost
// scales with the ledger rather than with the change has a crack, and the crack shows up as time.
//
// THE TEST IS TWO RUNS, and it needs no instrumentation inside the doors. A door that keys a cache on its inputs is
// much faster the second time, because nothing moved between them. A door that walks the corpus every time takes the
// same wall clock twice. So the RATIO of the two runs is the measurement: near 1 means recompute, well under 1 means
// verify. Nothing is inferred from reading the source, which could only ever say what a cache was meant to do.
//
// WHAT THIS CANNOT SEE, said plainly. A door may be fast because its work is small rather than because it verifies, so
// a low absolute time with a ratio near 1 is not a finding. And a door with a cache that MISSES on every run looks
// exactly like one with no cache, which is the honest limit: this measures the behaviour, and the cause is a reader's
// question. Both are reported rather than collapsed into a verdict.

import { spawnSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

interface Timing { door: string; cold: number; warm: number; ratio: number; verdict: string }

const DOORS = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const TARGETS = DOORS.length > 0 ? DOORS : [
  'numeral-reach', 'closure-census', 'phd-census', 'science-classes', 'falsifier-gap',
  'school-areas', 'entanglement-map', 'base-invariance',
]

const timeOne = (door: string): number => {
  const at = process.hrtime.bigint()
  const r = spawnSync(process.execPath, [join(ROOT, 'dist', 'scripts', `${door}.js`)],
    { encoding: 'utf8', timeout: 1_800_000 })
  const ns = process.hrtime.bigint() - at
  // a door that failed is reported as -1 rather than as a fast door, which would read as health
  return r.status === 0 ? Number(ns / 1_000_000n) : -1
}

const rows: Timing[] = []
for (const door of TARGETS) {
  const cold = timeOne(door)
  if (cold < 0) {
    rows.push({ door, cold: -1, warm: -1, ratio: -1, verdict: 'FAILED — no timing, and a failure is not a fast run' })
    console.log(`  ✗ ${door.padEnd(20)} failed`)
    continue
  }
  const warm = timeOne(door)
  // INTEGER RATIO IN HUNDREDTHS, not a float: the determinism scan refuses Math.* and a ratio printed as a float would
  // be a host decision. warm*100/cold truncated is exact and identical everywhere.
  const ratio = cold > 0 ? (warm * 100 - ((warm * 100) % cold)) / cold : 0
  const verdict = ratio >= 80
    ? 'RECOMPUTES — the second run costs what the first did, so nothing was verified against a receipt'
    : ratio >= 40
      ? 'partly cached — some of the walk was reused'
      : 'verifies — the second run is dominated by reading a receipt'
  rows.push({ door, cold, warm, ratio, verdict })
  console.log(`  ${ratio >= 80 ? '✗' : '✓'} ${door.padEnd(20)} cold ${String(cold).padStart(7)}ms · warm ${String(warm).padStart(7)}ms · ratio ${ratio}/100`)
}

const recompute = rows.filter((r) => r.ratio >= 80)
const slowest = [...rows].filter((r) => r.cold > 0).sort((a, b) => b.cold - a.cold)[0]
console.log()
console.log(`doors timed ${rows.length} · RECOMPUTING ${recompute.length} · slowest ${slowest ? `${slowest.door} at ${slowest.cold}ms` : 'none'}`)
if (recompute.length > 0) {
  console.log('not yet quantum:')
  for (const r of recompute) console.log(`  ${r.door} — ${r.verdict}`)
}

writeFileSync(join(ROOT, 'lean', 'time-census.json'), JSON.stringify({
  kind: 'time-census',
  honest: 'the ratio of a warm run to a cold one. Near 100/100 means the door rebuilt its answer; well under means it '
    + 'read a receipt. A fast door with a ratio near 100 is not a finding — its work may simply be small. A cache that '
    + 'misses every run is indistinguishable from no cache here, and that is a reader\'s question, not a verdict.',
  doors: rows,
}, null, 2) + '\n')
console.log()
console.log('✓ lean/time-census.json written')
