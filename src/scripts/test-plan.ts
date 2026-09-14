#!/usr/bin/env node
// @non-harmonic: spawns the test runner as subprocesses and reads the host's free memory — NAMED boundary (like land / release-cut).
//
// test-plan — RUN WHAT THE RECEIPT SAYS MOVED, AND NOTHING ELSE (verify_beats_recompute_by_magnitudes). The
// receipt's per-file manifest plus the import-and-reads graph (test-graph.ts) name the tests that can observe a
// change; this runs exactly those with the suite's own flags (the ledger loaded once per runner, the receipt reporter)
// and exits non-zero if any runner fails. skip is an O(1) verdict, delta is the subset, full is the whole suite — and
// the mode is printed first, so a receipt minted after this run can name what was verified.
//
// ACROSS THE IDLE CORES (the captain, 2026-09-14: "why not split as advised?"). One runner held one core at 100% while
// nine sat idle. The files are split into shards balanced by each file's measured seconds, and memory-pool starts a
// shard only while the memory measured free holds the peak the last run measured — so the lane count is the host's
// answer, never a typed share. With no reading yet it runs one shard, as before, and records the reading. The readings
// live in git's common directory, shared by every checkout of this repository on this host — the landing's clean
// worktree of HEAD included. The receipt root is the fold of the file receipts, so the merged root is the one a single
// runner prints.
//
//   node dist/scripts/test-plan.js            → plan, run, exit with the runners' status
//   node dist/scripts/test-plan.js --plan     → print the plan only
import { spawn, execFileSync } from 'node:child_process'
import { cpus } from 'node:os'
import { readFileSync, writeFileSync } from 'node:fs'
import { isAbsolute, join } from 'node:path'
import { ROOT } from './api.js'
import { planTestRun } from '../gate-receipt-index.js'
import { listTestSources, testDistForSource } from '../test-paths.js'
import { memoryPool } from '../memory-pool.js'
import { shardsOf, parseShardOutput, isMergedLine, type Leaf, type ShardOutput } from '../test-shards.js'
import { totalOf } from './test-receipt.js'
import { freeMemoryBytes } from './device-readings.js'

const FLAGS = ['--max-old-space-size=8192', '--test', '--test-isolation=none', '--test-reporter=./dist/scripts/test-receipt.js']
interface Readings { peakBytes: number; secondsByFile: Record<string, number> }

const readingsPath = ((): string => {
  const common = execFileSync('git', ['rev-parse', '--git-common-dir'], { cwd: ROOT, encoding: 'utf8' }).trim()
  return join(isAbsolute(common) ? common : join(ROOT, common), 'uuidna-test-readings.json')
})()
const readings = ((): Readings | null => {
  try { const r = JSON.parse(readFileSync(readingsPath, 'utf8')) as Readings; return r.peakBytes > 0 ? r : null } catch { return null }
})()

const plan = planTestRun()
const files = plan.mode === 'delta' ? plan.files : plan.mode === 'full' ? listTestSources(ROOT).map(testDistForSource).filter((f): f is string => !!f && f.endsWith('.test.js')) : []
const free = freeMemoryBytes()
const cores = cpus().length
// how many shards: what the memory measured free now holds at the measured peak, never more than the cores
const lanes = readings && free !== null ? Number(BigInt(free) / BigInt(readings.peakBytes)) : 1
const shards = shardsOf(files, readings?.secondsByFile ?? {}, lanes < 1 ? 1 : lanes > cores ? cores : lanes)
console.log(`· test-plan — ${plan.mode}: ${plan.why}` + (plan.mode === 'delta' ? `\n  ${plan.files.join('\n  ')}` : ''))
console.log(`· test-plan — ${shards.length} shard(s) over ${cores} cores · ` + (readings
  ? `last measured peak ${(readings.peakBytes / 1073741824).toFixed(1)} GiB per runner · ${free === null ? 'free memory UNMEASURED' : `${(free / 1073741824).toFixed(1)} GiB measured free`}`
  : 'no peak measured on this host yet — one runner, and this run records the reading'))
if (process.argv.includes('--plan')) process.exit(0)
if (plan.mode === 'skip' || files.length === 0) process.exit(0)

type Ran = ShardOutput & { status: number }
const runShard = (shard: string[]): Promise<Ran> => new Promise((done) => {
  const child = spawn(process.execPath, [...FLAGS, ...shard], { cwd: ROOT, stdio: ['ignore', 'pipe', 'inherit'], env: { ...process.env, UUIDNA_TEST_SHARD: '1' } })
  let text = '', partial = ''
  child.stdout.on('data', (chunk: Buffer) => {
    const s = partial + chunk.toString('utf8')
    const lines = s.split('\n'); partial = lines.pop() ?? ''
    for (const line of lines) { text += line + '\n'; if (!isMergedLine(line)) process.stdout.write(line + '\n') }   // failures reach the reader live
  })
  child.on('close', (code) => { if (partial) text += partial; done({ ...parseShardOutput(text), status: code ?? 1 }) })
})

const ran = await memoryPool(shards, () => readings?.peakBytes ?? 0, () => readings !== null, freeMemoryBytes, cores, runShard)
const leaves: Leaf[] = ran.flatMap((r) => r.leaves).sort(([a], [b]) => a.localeCompare(b))
for (const [file, r, n, secs] of leaves) console.log(`· ${r}  ${String(n).padStart(4)}  ${`${secs.toFixed(1)}s`.padStart(8)}  ${file}`)
const slowest = [...leaves].sort((a, b) => b[3] - a[3] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)).slice(0, 5)
if (slowest.length) console.log(`⏱ slowest superpositions: ${slowest.map(([f, , , s]) => `${f} ${s.toFixed(1)}s`).join(' · ')}`)
const passed = ran.reduce((s, r) => s + r.passed, 0), failed = ran.reduce((s, r) => s + r.failed, 0)
const root = totalOf(leaves.map(([f, r, n]) => [f, r, n]))
const peaks = ran.map((r) => r.peakBytes).filter((p): p is number => p !== null)
const peak = peaks.reduce((m, p) => (p > m ? p : m), 0)
console.log(`⚖ ${ran.length} runner(s), the heaviest ${(peak / 1073741824).toFixed(1)} GiB`)
console.log(failed === 0 && ran.every((r) => r.status === 0)
  ? `✓ tests — ${passed}/${passed} pass in ${leaves.length} superpositions, receipt ${root} (root = fold of the ${leaves.length} file receipts above)`
  : `✗ tests — ${failed} of ${passed + failed} FAILED, ${passed} pass, receipt ${root}`)

// the readings the next run is sized by: the heaviest runner's peak, and every file's seconds as measured now
if (peak > 0) {
  const seconds = { ...(readings?.secondsByFile ?? {}), ...Object.fromEntries(leaves.map(([f, , , s]) => [`dist/${f}`, s])) }
  writeFileSync(readingsPath, JSON.stringify({ peakBytes: peak, secondsByFile: seconds }, null, 1) + '\n')
}
process.exit(ran.every((r) => r.status === 0) && failed === 0 ? 0 : 1)
