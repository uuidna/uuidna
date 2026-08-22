#!/usr/bin/env node
// @non-harmonic: reads the host's load, memory and process table (os module + ps) — NAMED boundary; the
// harmonic core (balanceMachine, pure) never carries these reads.
//
// machine — THE LOCAL GATHERER for the resource balancer (`npm run x -- machine`): measure the development
// machine ONCE at this honest boundary — cores, 1-minute load (×100, integer), memory (MB), and the heavy
// writers from the process table — convert everything to the integers the pure law takes, and print the
// verdict balanceMachine computes: the same 13/32 spare law that judges the uuid and the context window,
// judging the metal. Over MCP the same pure function serves self-reports (uuidna_machine); this script is
// what a local hand (or land's rounds, or the school's janitor) runs before starting a heavy walk — the
// night's lesson made a meter: a walker judged by eye was at full burn; permille answers, impressions don't.
import { cpus, loadavg, totalmem, freemem } from 'node:os'
import { execSync } from 'node:child_process'
import { balanceMachine, type MachineWriter } from '../quantum/machine/index.js'

const centi = (x: number): number => (x * 100) - ((x * 100) % 1)   // ×100, floored to integer — no Math.*
const mb = (b: number): number => (b - (b % 1048576)) / 1048576

// the heavy writers: any process over ~half a core, named — ps at the boundary, the response is data
const writers: MachineWriter[] = []
try {
  for (const line of execSync('ps -Ao pcpu=,comm= -r', { encoding: 'utf8' }).split('\n').slice(0, 12)) {
    const m = /^\s*(\d+[.,]?\d*)\s+(.+)$/.exec(line)
    if (!m) continue
    const cc = centi(Number(m[1]!.replace(',', '.')))
    if (cc >= 50) writers.push({ name: m[2]!.split('/').pop()!.slice(0, 40), centiCpu: cc })
  }
} catch { /* a bare report still balances — the writers list is best-effort */ }

const b = balanceMachine({
  cores: cpus().length,
  centiLoad1: centi(loadavg()[0]!),
  memTotalMb: mb(totalmem()),
  memFreeMb: mb(freemem()),
  writers,
})

console.log(`machine — ${b.cores} cores · load ${b.loadPermille}‰ · mem free ${b.memFreePermille}‰ · floor ${b.safeFloorPermille}‰`)
for (const w of b.writers.slice(0, 6)) console.log(`  ${String(w.sharePermille).padStart(4)}‰  ${w.name}`)
console.log((b.balanced ? '✓ ' : '✗ ') + b.verdict)
console.log(`  receipt ${b.receipt}`)
if (!b.balanced) process.exit(1)
