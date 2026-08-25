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
import { loadMeasurable } from '../os/host/index.js'

const centi = (x: number): number => (x * 100) - ((x * 100) % 1)   // ×100, floored to integer by remainder, no float builtins
const mb = (b: number): number => (b - (b % 1048576)) / 1048576

// the heavy writers: any process over ~half a core, named — ps at the boundary, the response is data
// AND THE WRITERS PROBE IS CHECKED THE SAME WAY (2026-08-25) — this file already states the law thirty lines
// below and did not apply it here. `ps -Ao pcpu=,comm= -r` is POSIX ps; the ps in Git for Windows answers
// `unknown option -- A` and THROWS, the catch swallowed it, and `writers` stayed empty. So this report said NO
// HEAVY WRITERS on every Windows host, always — the absence and the all-clear returning the same value, which
// is the exact shape the loadavg paragraph below refuses. one-writer.ts:76 recorded this for `-o` and the
// lesson never reached here.
//
// It matters more than a missing line, because the load verdict already voids on this host and the closing
// advice REDIRECTS the reader to the writers list as the instrument to read instead. Both were void and only
// one said so.
const writers: MachineWriter[] = []
let writersMeasured = true
try {
  for (const line of execSync('ps -Ao pcpu=,comm= -r', { encoding: 'utf8' }).split('\n').slice(0, 12)) {
    const m = /^\s*(\d+[.,]?\d*)\s+(.+)$/.exec(line)
    if (!m) continue
    const cc = centi(Number(m[1]!.replace(',', '.')))
    if (cc >= 50) writers.push({ name: m[2]!.split('/').pop()!.slice(0, 40), centiCpu: cc })
  }
} catch { writersMeasured = false }   // NOT best-effort: an unmeasured list is not an empty one, and says so below

const b = balanceMachine({
  cores: cpus().length,
  centiLoad1: centi(loadavg()[0]!),
  memTotalMb: mb(totalmem()),
  memFreeMb: mb(freemem()),
  writers,
})

// THE INSTRUMENT IS CHECKED BEFORE ITS READING IS BELIEVED (os/host). Where the host keeps no load average, the
// zero Node hands back is an ABSENCE wearing a measurement's clothes — and a spare-floor test fed a permanent zero
// is a test that passes forever, including while every core burns. The memory arm is measured on every host and
// still stands; only the CPU verdict is withheld, and it is withheld OUT LOUD.
const measured = loadMeasurable()
console.log(`machine — ${b.cores} cores · load ${measured ? b.loadPermille + '‰' : 'NOT MEASURABLE on this host'} · mem free ${b.memFreePermille}‰ · floor ${b.safeFloorPermille}‰`)
if (!writersMeasured) console.log('  writers NOT MEASURABLE on this host — the per-process probe could not run, so this is an')
if (!writersMeasured) console.log('  absence of a reading and NOT a quiet machine. Do not read the empty list as an all-clear.')
for (const w of b.writers.slice(0, 6)) console.log(`  ${String(w.sharePermille).padStart(4)}‰  ${w.name}`)
if (measured) console.log((b.balanced ? '✓ ' : '· ') + b.verdict)
else {
  console.log(`· CPU verdict WITHHELD — this host publishes no load average, so the reading would be a permanent zero and the spare-floor test could never say no. Memory: ${b.memBalanced ? 'balanced' : 'under the floor'} (${b.memFreePermille}‰ free against a ${b.safeFloorPermille}‰ floor).`)
  console.log(writersMeasured
    ? '  to judge CPU here, read a per-process share instead (the writers above) — an absent instrument voids, it does not verdict.'
    : '  and the per-process probe is void here TOO, so this host currently has NO CPU instrument at all — that is the')
  if (!writersMeasured) console.log('  finding, and it is worth more than either reading would have been.')
}
console.log(`  receipt ${b.receipt}`)
// a resource reading is a DIAGNOSTIC, never a build failure: FOLD means "pause a writer before a heavy run",
// which is advice to a human/land, not a broken tree — so it always exits 0 (exercise-dormant runs it clean).
