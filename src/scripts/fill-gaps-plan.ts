// fill-gaps-plan — pure phase manifest for desk + edge (no one-receipt / node:crypto). Host-only dry-clean lives in
// fill-gaps-run.ts so the Workers bundle stays clean (verify_beats_recompute_by_magnitudes at the edge door).
import { toUuid } from '../address.js'
import { hexbitReceipt } from '../hexbit/index.js'
import { gapSurvey, type GapSurvey } from '../gap-survey.js'
import { DERIVE_SURFACES_CMD } from '../gap-survey.js'

export interface FillGapsPhase {
  name: string
  cmd: string
  note: string
  when: (s: GapSurvey) => boolean
}

const CORE_ONLY = new Set(['develop', 'develop-final'])

/** Phases safe on the edge census — dry-clean is host-only (fill-gaps-run prepends it). */
export const FILL_GAPS_CORE_PHASES: readonly FillGapsPhase[] = [
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

export function fillGapsPlan(survey: GapSurvey): FillGapsPhase[] {
  return FILL_GAPS_CORE_PHASES.filter((p) => p.when(survey))
}

export function hasDeskAutomatableWork(survey: GapSurvey): boolean {
  return fillGapsPlan(survey).some((p) => !CORE_ONLY.has(p.name))
}

export function gapSurveyReceipt(survey: GapSurvey): string {
  return hexbitReceipt(survey.buckets.map((b) => toUuid(`${b.kind}|${b.count}|${b.automatable}`))).receipt
}
