#!/usr/bin/env node
// fill-gaps — AUTOMATE EVERY DESK-GAP THE TREE CAN CLOSE WITHOUT INVENTING A SEAL.
//
// Surveys lean/leads.json, the wave conveyor, table-leads, open-questions springs, and lonely theorems;
// runs the taught closers in leverage order (develop → connect-lonely → books → wave → derive surfaces → develop).
// Kernel-only gaps cite sealed theorems only (gap-survey boundary-law section) — no scope prose outside lean/*.lean.
//
//   npm run x -- fill-gaps           → survey, run every automatable phase, survey again
//   npm run x -- fill-gaps -- --dry  → survey and print the plan only
//   npm run x -- fill-gaps -- --survey → JSON census only (read-only)
import { gapSurvey } from '../gap-survey.js'
import { gatherLeads } from './leads-gate.js'
import { ROOT } from './api.js'
import {
  fillGapsPlan,
  gapSurveyReceipt,
  printFillGapsSurvey,
  runFillGapsArc,
} from './fill-gaps-run.js'

const DRY = process.argv.includes('--dry')
const SURVEY_ONLY = process.argv.includes('--survey')

if (process.argv[1]?.endsWith('fill-gaps.js')) {
  const readings = gatherLeads()
  const before = gapSurvey(ROOT, readings)
  if (SURVEY_ONLY) {
    console.log(JSON.stringify({ ...before, receipt: gapSurveyReceipt(before) }, null, 1))
    process.exit(0)
  }

  console.log('fill-gaps — automate every desk gap; name every kernel gap.')
  printFillGapsSurvey('BEFORE', before)

  const plan = fillGapsPlan(before)
  if (DRY) {
    console.log('\nPLAN (dry — nothing run):')
    for (const p of plan) console.log(`  · ${p.name} — ${p.note}\n    ${p.cmd}`)
    process.exit(0)
  }

  const result = runFillGapsArc({ readings, resurveyReadings: () => gatherLeads(), labelPrefix: 'fill-gaps' })
  if (!result.ok) {
    console.error(`\n✗ fill-gaps — stopped at ${result.failedPhase}; partial receipt ${result.receipt}`)
    process.exit(1)
  }

  printFillGapsSurvey('AFTER', result.after)
  console.log(`\n✓ fill-gaps — ${result.plan.length} phase(s) ran; arc receipt ${result.receipt}`)
  if (result.after.kernelOnly.length) {
    console.log(`  ${result.after.kernelOnly.length} kernel gap class(es) remain — see theorem keys on each bucket; settlement stays with the captain.`)
  }
  process.exit(0)
}
