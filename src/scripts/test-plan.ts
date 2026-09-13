#!/usr/bin/env node
// @non-harmonic: spawns the test runner as a subprocess and deposits its evidence over the network — NAMED boundary.
//
// test-plan — RUN WHAT THE RECEIPT SAYS MOVED, AND NOTHING ELSE (verify_beats_recompute_by_magnitudes). The
// receipt's per-file manifest plus the import-and-reads graph (test-graph.ts) name the tests that can observe a
// change; this runs exactly those with the suite's own flags (one process, ledger loaded once, the receipt reporter)
// and exits with the runner's status. skip is an O(1) verdict, delta is the subset, full is the whole suite — and
// the mode is printed first, so a receipt minted after this run can name what was verified.
//
// A HARNESS IS A TERMINAL, THE EVIDENCE LIVES ON THE NETWORK (the captain, 2026-09-13). The run's output used to exist
// only where its launcher piped it, so the person and the agent watching the same run saw different things. It is now
// deposited to qpu.uuidna.com storage under one key — at each failure as it lands, then the receipt — and every
// terminal reads the same bytes with an open GET. The write needs QPU_WRITE_TOKEN; without it the run says UNSENT
// rather than pretending to share.
//
//   node dist/scripts/test-plan.js            → plan, run, deposit, exit with the runner's status
//   node dist/scripts/test-plan.js --plan     → print the plan only
//   curl https://qpu.uuidna.com/storage/uuidna-test-run   → read the evidence from any terminal
import { spawn, spawnSync } from 'node:child_process'
import { ROOT } from './api.js'
import { planTestRun } from '../gate-receipt-index.js'
import { testRunGlobs } from '../test-paths.js'

const FLAGS = ['--max-old-space-size=8192', '--test', '--test-isolation=none', '--test-reporter=./dist/scripts/test-receipt.js']
const EVIDENCE = 'https://qpu.uuidna.com/storage/uuidna-test-run'
const plan = planTestRun()
const files = plan.mode === 'delta' ? plan.files : plan.mode === 'full' ? testRunGlobs() : []
const header = `· test-plan — ${plan.mode}: ${plan.why}`
console.log(header + (plan.mode === 'delta' ? `\n  ${plan.files.join('\n  ')}` : ''))
if (process.argv.includes('--plan')) process.exit(0)
if (plan.mode === 'skip') process.exit(0)

const token = process.env.QPU_WRITE_TOKEN ?? ''
const head = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).stdout.trim()
const lines: string[] = [header]
// deposits run one after another, so the last one written is the last one sent
let chain: Promise<string> = Promise.resolve('')
const deposit = (state: 'running' | 'passed' | 'failed'): Promise<string> => (chain = chain.then(async () => {
  if (!token) return 'UNSENT'
  try {
    const r = await fetch(EVIDENCE, {
      method: 'PUT',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ head, state, mode: plan.mode, files: files.length, lines }),
    })
    return r.ok ? 'sent' : `refused ${r.status}`
  } catch (e) { return `unreachable: ${(e as Error).message}` }
}))
console.log(token
  ? `· evidence → ${EVIDENCE} (each failure as it lands, then the receipt)`
  : '· evidence UNSENT — QPU_WRITE_TOKEN is not set, so this run is visible only in this terminal')
void deposit('running')

const child = spawn(process.execPath, [...FLAGS, ...files], { cwd: ROOT, stdio: ['inherit', 'pipe', 'inherit'] })
let partial = ''
child.stdout.on('data', (chunk: Buffer) => {
  process.stdout.write(chunk)
  const parts = (partial + chunk.toString('utf8')).split('\n')
  partial = parts.pop() ?? ''
  for (const l of parts) {
    lines.push(l)
    if (l.startsWith('✗ ')) void deposit('running')
  }
})
const status = await new Promise<number>((resolve) => child.on('close', (code) => resolve(code ?? 1)))
if (partial) lines.push(partial)
const verdict = await deposit(status === 0 ? 'passed' : 'failed')
if (token) console.log(`· evidence ${verdict} → ${EVIDENCE}`)
process.exit(status)
