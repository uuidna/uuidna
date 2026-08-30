// fill-gaps-run — THE SHARED ARC: survey, plan, run desk-automatable phases in leverage order.
// Imported by fill-gaps.ts (explicit `npm run x -- fill-gaps`) and next.ts (auto before the trial).
import { toUuid } from '../address.js'
import { hexbitReceipt, hexbitReceiptLanes } from '../hexbit/index.js'
import { gapSurvey, type GapSurvey } from '../gap-survey.js'
import type { SourceReading } from '../leads.js'
import { ROOT, teeStep } from './api.js'
import { dryGaps } from './dry-gaps.js'
import {
  FILL_GAPS_CORE_PHASES,
  hasDeskAutomatableWork,
  gapSurveyReceipt,
  type FillGapsPhase,
} from './fill-gaps-plan.js'

export type { FillGapsPhase } from './fill-gaps-plan.js'
export { hasDeskAutomatableWork, gapSurveyReceipt } from './fill-gaps-plan.js'

/** THE MANIFEST — host arc includes dry-clean; edge census uses FILL_GAPS_CORE_PHASES only. */
export const FILL_GAPS_PHASES: readonly FillGapsPhase[] = [
  {
    name: 'dry-clean',
    cmd: 'node dist/scripts/one-receipt.js dry-clean',
    note: 'migrate script boilerplate onto api.js, rebuild, re-run dry finder',
    when: () => dryGaps().gaps.length > 0,
  },
  ...FILL_GAPS_CORE_PHASES,
]

/** fillGapsPlan(survey) → phases that would run for this census (includes dry-clean on host). */
export function fillGapsPlan(survey: GapSurvey): FillGapsPhase[] {
  return FILL_GAPS_PHASES.filter((p) => p.when(survey))
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
  console.log(`  book untried      : ${s.bookTrialsUntried}`)
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
