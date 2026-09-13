#!/usr/bin/env node
// @non-harmonic: spawns the test runner as a subprocess — NAMED boundary (like land / release-cut).
//
// test-plan — RUN WHAT THE RECEIPT SAYS MOVED, AND NOTHING ELSE (verify_beats_recompute_by_magnitudes). The
// receipt's per-file manifest plus the import-and-reads graph (test-graph.ts) name the tests that can observe a
// change; this runs exactly those with the suite's own flags (one process, ledger loaded once, the receipt reporter)
// and exits with the runner's status. skip is an O(1) verdict, delta is the subset, full is the whole suite — and
// the mode is printed first, so a receipt minted after this run can name what was verified.
//
//   node dist/scripts/test-plan.js            → plan, run, exit with the runner's status
//   node dist/scripts/test-plan.js --plan     → print the plan only
import { spawnSync } from 'node:child_process'
import { ROOT } from './api.js'
import { planTestRun } from '../gate-receipt-index.js'
import { testRunGlobs } from '../test-paths.js'

const FLAGS = ['--max-old-space-size=8192', '--test', '--test-isolation=none', '--test-reporter=./dist/scripts/test-receipt.js']
const plan = planTestRun()
const files = plan.mode === 'delta' ? plan.files : plan.mode === 'full' ? testRunGlobs() : []
console.log(`· test-plan — ${plan.mode}: ${plan.why}` + (plan.mode === 'delta' ? `\n  ${plan.files.join('\n  ')}` : ''))
if (process.argv.includes('--plan')) process.exit(0)
if (plan.mode === 'skip') process.exit(0)
const r = spawnSync(process.execPath, [...FLAGS, ...files], { cwd: ROOT, stdio: 'inherit' })
process.exit(r.status ?? 1)
