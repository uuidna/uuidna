// fill-gaps-run — THE SHARED ARC: survey, plan, run desk-automatable phases in leverage order.
// Imported by fill-gaps.ts (explicit `npm run x -- fill-gaps`) and next.ts (auto before the trial).
import { merkleGravity } from '../index.js'
import { toUuid } from '../address.js'
import { hexbitReceipt, hexbitReceiptLanes } from '../hexbit/index.js'
import { gapSurvey, type GapSurvey } from '../gap-survey.js'
import type { SourceReading } from '../leads.js'
import { ROOT, teeStep } from './api.js'

export interface FillGapsPhase {
  name: string
  cmd: string
  note: string
  when: (s: GapSurvey) => boolean
}

import { DERIVE_SURFACES_CMD } from '../derive-surfaces.js'

/** THE MANIFEST — same leverage order as next.ts, folded into one arc the desk can run unattended. */
export const FILL_GAPS_PHASES: readonly FillGapsPhase[] = [
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
    name: 'trial-refusals',
    cmd: 'node dist/scripts/trial-refusals.js --books',
    note: 'collide each refused boundary against peers and cited theorems — verified, purged, or open',
    when: (s) => s.refusalOpen > 0,
  },
  {
    name: 'wave',
    cmd: 'node dist/scripts/wave-run.js',
    note: 'kernel-probe pending candidates, guard, reconcile',
    when: (s) => s.wavePending > 0 || s.harvest > 0,
  },
  {
    name: 'derive-surfaces',
    cmd: DERIVE_SURFACES_CMD,
    note: 'regrow prose trials, search feed, open questions, and school from the records',
    when: (s) => s.openLeads > 0,
  },
  {
    name: 'develop-final',
    cmd: 'node dist/scripts/develop.js',
    note: 'converge after derived surfaces moved',
    when: () => true,
  },
]

const CORE_ONLY = new Set(['develop', 'develop-final'])

/** fillGapsPlan(survey) → phases that would run for this census. */
export function fillGapsPlan(survey: GapSurvey): FillGapsPhase[] {
  return FILL_GAPS_PHASES.filter((p) => p.when(survey))
}

/** hasDeskAutomatableWork(survey) → true when the arc would do more than develop bookends alone. */
export function hasDeskAutomatableWork(survey: GapSurvey): boolean {
  return fillGapsPlan(survey).some((p) => !CORE_ONLY.has(p.name))
}

export function printFillGapsSurvey(label: string, s: GapSurvey): void {
  console.log(`\n${label}`)
  console.log(`  release ready     : ${s.releaseReady ? 'yes' : 'no'} (${s.releaseOpen} open across gate sources)`)
  console.log(`  trial gaps        : ${s.trialGaps}`)
  console.log(`  open leads        : ${s.openLeads}`)
  console.log(`  table short       : ${s.tableShort}`)
  console.log(`  lonely theorems   : ${s.lonely}`)
  console.log(`  harvest waiting   : ${s.harvest}`)
  console.log(`  wave pending      : ${s.wavePending} (${s.waveInFlight} in flight)`)
  console.log(`  refusal open      : ${s.refusalOpen}`)
  if (s.kernelOnly.length) {
    console.log('  kernel-only (named, not faked):')
    for (const b of s.kernelOnly) console.log(`    · ${b.kind} (${b.count}) — ${b.act}`)
  }
  if (s.automatable.length) {
    console.log('  desk-automatable:')
    for (const b of s.automatable) console.log(`    · ${b.kind} (${b.count}) — ${b.act}`)
  }
}

export interface FillGapsRunResult {
  ok: boolean
  before: GapSurvey
  after: GapSurvey
  plan: FillGapsPhase[]
  receipt: string
  failedPhase?: string
}

export interface FillGapsRunOptions {
  root?: string
  readings: readonly SourceReading[]
  /** prefix for teeStep labels — `fill-gaps` vs `next · fill-gaps` */
  labelPrefix?: string
  /** re-survey after a successful arc (default true) */
  resurvey?: boolean
  /** fresh gate readings for the after census (default: reuse `readings`) */
  resurveyReadings?: () => readonly SourceReading[]
}

/** runFillGapsArc(options) → run every planned phase; never calls process.exit. */
export function runFillGapsArc(options: FillGapsRunOptions): FillGapsRunResult {
  const root = options.root ?? ROOT
  const prefix = options.labelPrefix ?? 'fill-gaps'
  const before = gapSurvey(root, options.readings)
  const plan = fillGapsPlan(before)
  const leaves: string[] = []
  for (const p of plan) {
    console.log(`\n══ ${prefix} · ${p.name} — ${p.note}`)
    const r = teeStep(`${prefix} · ${p.name}`, p.cmd, root)
    leaves.push(toUuid(`phase|${p.name}|${r.ok ? 'ok' : 'fail'}`))
    if (!r.ok) {
      return {
        ok: false,
        before,
        after: before,
        plan,
        receipt: hexbitReceipt(leaves).receipt,
        failedPhase: p.name,
      }
    }
  }
  const afterReadings = options.resurveyReadings?.() ?? options.readings
  const after = options.resurvey === false ? before : gapSurvey(root, afterReadings)
  return { ok: true, before, after, plan, receipt: hexbitReceiptLanes(leaves).receipt }
}

/** gapSurveyReceipt(survey) → stable fingerprint for JSON survey output. */
export function gapSurveyReceipt(survey: GapSurvey): string {
  return hexbitReceipt(survey.buckets.map((b) => toUuid(`${b.kind}|${b.count}|${b.automatable}`))).receipt
}
