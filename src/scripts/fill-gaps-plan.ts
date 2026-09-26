// fill-gaps-plan — pure phase manifest for desk + edge (no one-receipt / node:crypto). Host-only dry-clean lives in
// fill-gaps-run.ts so the Workers bundle stays clean (verify_beats_recompute_by_magnitudes at the edge door).
import { toUuid } from '../address.js'
import { hexbitReceipt } from '../hexbit/index.js'
import { DERIVE_SURFACES_CMD } from '../derive-surfaces-cmd.js'
import { type GapSurvey } from '../gap-survey.js'

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
    name: 'alpine-discovery',
    cmd: 'node dist/scripts/alpine-discovery.js --deposit',
    note: 'Alpine port census harvest → wave conveyor (28k catalogue ore, never auto-seal)',
    // GATED, because `() => true` made hasDeskAutomatableWork a CONSTANT: every non-core phase is what that
    // predicate reads, so a phase that always runs means the desk can never answer "nothing to automate" — and
    // the test that says so was failing correctly. Unconditional was also untrue on its own terms: the Alpine
    // mirror is committed and static, so a re-walk of an unchanged catalogue re-proposes the same candidates,
    // and the deposit's own record shows 0 deposited against 79 refused, every one a bare-literal tautology the
    // gap law turns away.
    //
    // THE DEBT NAMED HERE IS PAID (held leads 2 and 4, closed 2026-09-01). The stand-in read `harvest`, which
    // counts SEARCH-FEED leads — a queue this phase neither fills nor drains — because the honest signal had been
    // measured at 644 ms and that is too slow for a gate. It was never that expensive: every Alpine claim embeds
    // the catalogue count in its own NAME, so the keys the catalogue implies are derivable without walking any
    // census, and alpinePending counts the ones neither sealed nor already on the conveyor. 0.27 ms warm, and
    // exact — the catalogue moving and a new domain pattern both change the answer, while the 57 already-queued
    // claims stop reading as work. Today it says 1: alpine_binding_origins_overcount_28635, genuinely new.
    when: (s) => s.alpinePending > 0,
  },
  {
    name: 'domains-deposit',
    cmd: 'node dist/scripts/domains-deposit.js',
    note: 'Alpine domain census claims → wave conveyor (idempotent: a sealed claim refuses as a duplicate)',
    // ASKS ITS OWN QUEUE NOW (held lead 2, closed 2026-09-01). This first shipped gated on `s.harvest`, copied
    // from the neighbour below — and `harvest` counts SEARCH-FEED leads, so both phases were reading a queue
    // neither of them fills. alpinePending counts the Alpine claims the current catalogue implies that are
    // neither sealed nor already on the conveyor: exact, and cheaper than the stand-in was wrong.
    when: (s) => s.alpinePending > 0,
  },
  {
    name: 'cross-formulate',
    cmd: 'node dist/scripts/cross-formulate.js --deposit',
    note: 'rank the unstated crosses the corpus own integers generate and deposit the domain-crossing head (never seals)',
    // GATED ON THE QUEUE IT DRAINS, which is the whole lesson of lead 55161239: a phase whose `when` reads a queue it
    // neither fills nor drains is a stand-in, and a COPIED stand-in is what the law calls a convention. crossingPending
    // counts exactly what this phase would propose — domain-crossing crosses the closure implies, minus what is sealed,
    // minus what already waits — so the phase stops proposing the moment there is nothing new, and the count and the
    // proposal are computed from one derivation (crossKeyOf) rather than two.
    when: (s) => s.crossingPending > 0,
  },
  {
    name: 'witness-wave',
    cmd: 'node dist/scripts/witness-wave.js',
    note: 'name the verdicts awaiting their fourteen faces and brief the 2x7 wave that must sign them (signs nothing)',
    // GATED ON witnessPending, which rosettaSeals already decides per row. This phase is the one that CANNOT drain
    // its own queue, and that is the design: a face is a witness's own recompile and its own faithfulness judgment,
    // so a process signing fourteen for itself is the fraud the faces exist to refuse. It makes the work visible and
    // asks; seven witnesses answer, any of them may dissent, and the loop stops asking when the count reaches zero.
    when: (s) => s.witnessPending > 0,
  },
  {
    name: 'trial-refusals',
    cmd: 'node dist/scripts/trial-refusals.js',
    note: 'try every lead by the sealed theorems its own text names, against fresh kernel receipts — verified or open; nothing is purged',
    // no trial record is unmeasured, not zero: it schedules the trial too
    when: (s) => s.refusalOpen === null || s.refusalOpen > 0,
  },
  {
    name: 'trial-book-leads',
    cmd: 'node dist/scripts/trial-book-leads.js',
    note: 'testClaim every book-leads candidate — remand open doors to school',
    when: (s) => s.bookTrialsUntried > 0,
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
