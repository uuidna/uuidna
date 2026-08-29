#!/usr/bin/env node
// fill-gaps — AUTOMATE EVERY DESK-GAP THE TREE CAN CLOSE WITHOUT INVENTING A SEAL.
//
// Surveys lean/leads.json, the wave conveyor, table-leads, open-questions springs, and lonely theorems;
// runs the taught closers in leverage order (develop → connect-lonely → books → wave → derive surfaces → develop).
// Kernel-only gaps cite sealed theorems only (src/boundary-law.ts) — no scope prose outside lean/*.lean.
//
//   npm run x -- fill-gaps           → survey, run every automatable phase, survey again
//   npm run x -- fill-gaps -- --dry  → survey and print the plan only
//   npm run x -- fill-gaps -- --survey → JSON census only (read-only)
import { merkleGravity } from '../index.js'
import { toUuid } from '../address.js'
import { gapSurvey } from '../gap-survey.js'
import { gatherLeads } from './leads-gate.js'
import { ROOT, teeStep } from './api.js'

const DRY = process.argv.includes('--dry')
const SURVEY_ONLY = process.argv.includes('--survey')

interface Phase { name: string; cmd: string; note: string; when: (s: ReturnType<typeof gapSurvey>) => boolean }

/** THE MANIFEST — same leverage order as next.ts, folded into one arc the desk can run unattended. */
const PHASES: readonly Phase[] = [
  {
    name: 'develop',
    cmd: 'node dist/scripts/develop.js',
    note: 'heal every taught guard signature before proposing new work',
    when: () => true,
  },
  {
    name: 'connect-lonely',
    cmd: 'node dist/scripts/connect-lonely.js --write',
    note: 'mechanical ring neighbours for arithmetic-only lonely theorems',
    when: (s) => s.lonely > 0,
  },
  {
    name: 'books',
    cmd: 'node dist/scripts/books-run.js',
    note: 'deposit search-feed harvest and book candidates onto the wave conveyor',
    when: (s) => s.harvest > 0,
  },
  {
    name: 'wave',
    cmd: 'node dist/scripts/wave-run.js',
    note: 'kernel-probe pending candidates, guard, reconcile',
    when: (s) => s.wavePending > 0 || s.harvest > 0,
  },
  {
    name: 'derive-surfaces',
    cmd: 'node dist/scripts/derive-prose-trials.js && node dist/scripts/gen-search-feed.js && node dist/scripts/gen-open-questions.js && node dist/scripts/gen-school.js',
    note: 'regrow prose trials, search feed, open questions, and school from the records',
    when: (s) => s.openDoors > 0,
  },
  {
    name: 'develop-final',
    cmd: 'node dist/scripts/develop.js',
    note: 'converge after derived surfaces moved',
    when: () => true,
  },
]

function printSurvey(label: string, s: ReturnType<typeof gapSurvey>): void {
  console.log(`\n${label}`)
  console.log(`  release ready     : ${s.releaseReady ? 'yes' : 'no'} (${s.releaseOpen} open across gate sources)`)
  console.log(`  trial gaps        : ${s.trialGaps}`)
  console.log(`  open doors        : ${s.openDoors}`)
  console.log(`  table short       : ${s.tableShort}`)
  console.log(`  lonely theorems   : ${s.lonely}`)
  console.log(`  harvest waiting   : ${s.harvest}`)
  console.log(`  wave pending      : ${s.wavePending} (${s.waveInFlight} in flight)`)
  if (s.kernelOnly.length) {
    console.log('  kernel-only (named, not faked):')
    for (const b of s.kernelOnly) console.log(`    · ${b.kind} (${b.count}) — ${b.act}`)
  }
  if (s.automatable.length) {
    console.log('  desk-automatable:')
    for (const b of s.automatable) console.log(`    · ${b.kind} (${b.count}) — ${b.act}`)
  }
}

if (process.argv[1]?.endsWith('fill-gaps.js')) {
  const readings = gatherLeads()
  const before = gapSurvey(ROOT, readings)
  if (SURVEY_ONLY) {
    console.log(JSON.stringify({ ...before, receipt: merkleGravity(before.buckets.map((b) => toUuid(`${b.kind}|${b.count}|${b.automatable}`))) }, null, 1))
    process.exit(0)
  }

  console.log('fill-gaps — automate every desk gap; name every kernel gap.')
  printSurvey('BEFORE', before)

  const plan = PHASES.filter((p) => p.when(before))
  if (DRY) {
    console.log('\nPLAN (dry — nothing run):')
    for (const p of plan) console.log(`  · ${p.name} — ${p.note}\n    ${p.cmd}`)
    process.exit(0)
  }

  const leaves: string[] = []
  for (const p of plan) {
    console.log(`\n══ fill-gaps · ${p.name} — ${p.note}`)
    const r = teeStep(`fill-gaps · ${p.name}`, p.cmd)
    leaves.push(toUuid(`phase|${p.name}|${r.ok ? 'ok' : 'fail'}`))
    if (!r.ok) {
      console.error(`\n✗ fill-gaps — stopped at ${p.name}; partial receipt ${merkleGravity(leaves)}`)
      process.exit(1)
    }
  }

  const after = gapSurvey(ROOT, gatherLeads())
  printSurvey('AFTER', after)
  const receipt = merkleGravity(leaves)
  console.log(`\n✓ fill-gaps — ${plan.length} phase(s) ran; arc receipt ${receipt}`)
  if (after.kernelOnly.length) {
    console.log(`  ${after.kernelOnly.length} kernel gap class(es) remain — see theorem keys on each bucket; settlement stays with the captain.`)
    process.exit(0)
  }
  process.exit(0)
}
