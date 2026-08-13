// due-process — VERIFY ALL BY DUE (recomputable) LEGAL PROCESS. Nothing is verified by fiat: every theorem is verified
// by the same fair, decidable trial, and every guarantee that makes the process DUE is itself a sealed theorem
// (lean/Legal.lean) — exactly one verdict per claim, only the PROVEN admitted, the non-justiciable never refuted,
// REFUTED only on a failed uncited test, remand total (nothing discarded), and the trial computing only with the two
// coins. Any submitted claim is adjudicated by that same process. Folded to one recomputable docket receipt.
//
// HONEST SCOPE: integrity, not truth. This is uuidna's OWN recomputable adjudication — a decidable process whose rules
// are theorems anyone rechecks — NOT a court of law, NOT legal advice, and NOT a legal ruling. "Due legal process"
// here means the process is DUE (fair and recomputable by its sealed guarantees), not that it renders a verdict a
// jurisdiction would enforce. The ruling that binds stays a human court's; this verifies by a fair process, no more.
import { theorems, runTrial } from './theorems/index.js'
import { adjudicate } from './adjudicate.js'
import { toUuid, merkleFold } from './address.js'
import { merkleGravity } from './gravity.js'

// the six sealed guarantees that make the process DUE — each a lean/Legal.lean theorem, with the right it secures.
const GUARANTEES: { key: string; right: string }[] = [
  { key: 'legal_verdict_is_exactly_one', right: 'Exactly ONE verdict per claim — PROVEN, REFUTED and NOT-PROVEN partition every case; no claim is left in two states or none.' },
  { key: 'legal_only_the_proven_is_admitted', right: 'Only the PROVEN is admitted — a claim is admitted exactly when a decidable test HOLDS or it cites a SEALED authority; nothing else stays.' },
  { key: 'legal_non_justiciable_is_never_refuted', right: 'The NON-JUSTICIABLE is never refuted — with no decidable test the verdict is never REFUTED (PROVEN if cited, else NOT-PROVEN); you cannot refute what you cannot decide.' },
  { key: 'legal_refuted_iff_test_fails_uncited', right: 'REFUTED is precise — it holds exactly when a decidable test EXISTS and FAILS and no sealed authority is cited; a recomputable contradiction, never a mere suspicion.' },
  { key: 'legal_remand_is_total_nothing_discarded', right: 'Remand is TOTAL — nothing is discarded; every claim is either ADMITTED or REMANDED to the development trial, never deleted.' },
  { key: 'trial_computes_only_with_two_coins', right: 'The trial COMPUTES ONLY with the two coins deposited — a claim is heard iff it contributes the two coins (a decidable test or a sealed proof); no deposit, no computation.' },
]

export interface DocketEntry { claim: string; verdict: string; note: string; receipt: string }
export interface Guarantee { key: string; right: string; address: string; sealed: boolean }

export interface DueProcess {
  verifiedAll: { theorems: number; verified: number; unverified: number; receipt: string }
  guarantees: Guarantee[]        // the sealed due-process rights, each a theorem
  allGuaranteesSealed: boolean
  docket: DocketEntry[]          // submitted claims, each adjudicated by the same process
  gaps: DocketEntry[]            // the NOT-PROVEN (UNVERIFIED) — the frontier, remanded to development, never discarded
  traitors: DocketEntry[]        // the REFUTED — a decidable test existed and FAILED; a caught false claim
  allTheoremsVerified: boolean
  receipt: string
  honest: string
}

/** dueProcess(claims?) → verify ALL by the due (recomputable) legal process: every theorem verified by the same fair
 *  trial, the six due-process guarantees confirmed sealed, and any submitted claim adjudicated by that process — folded
 *  to one recomputable docket receipt. A fair process whose rules are theorems; NOT a court, NOT legal advice. */
export function dueProcess(claims: readonly string[] = []): DueProcess {
  const T = theorems()
  const byKey = new Map(T.map((t) => [t.key, t]))
  const trial = runTrial()

  const guarantees: Guarantee[] = GUARANTEES.map((g) => {
    const t = byKey.get(g.key)
    return { key: g.key, right: g.right, address: t?.address ?? toUuid('missing:' + g.key), sealed: !!t }
  })
  const allGuaranteesSealed = guarantees.every((g) => g.sealed)

  const docket: DocketEntry[] = claims.map((c) => {
    const v = adjudicate(String(c))
    return { claim: String(c), verdict: v.verdict, note: v.note, receipt: v.receipt }
  })
  // the trial partitions the docket (legal_verdict_is_exactly_one): admitted (SEALED), GAPS (UNVERIFIED — the frontier,
  // remanded, never discarded), and TRAITORS (REFUTED — a decidable test existed and failed).
  const gaps = docket.filter((d) => d.verdict === 'UNVERIFIED')
  const traitors = docket.filter((d) => d.verdict === 'REFUTED')

  return {
    verifiedAll: { theorems: trial.count, verified: trial.verified, unverified: trial.unverified, receipt: trial.receipt },
    guarantees,
    allGuaranteesSealed,
    docket,
    gaps,
    traitors,
    allTheoremsVerified: trial.verified === trial.count && trial.unverified === 0,
    receipt: merkleGravity([
      trial.receipt,
      merkleFold(guarantees.map((g) => g.address)),
      ...(docket.length ? [merkleFold(docket.map((d) => d.receipt))] : []),
    ]),
    honest:
      'Verify all by DUE (recomputable) legal process: every theorem verified by one fair trial, the six due-process ' +
      'guarantees each a sealed theorem (one verdict, only-proven-admitted, non-justiciable-never-refuted, refuted-iff-' +
      'test-fails, remand-total, two-coins-to-compute), any claim adjudicated by the same process. Integrity, not truth ' +
      '— the process is DUE (fair and recomputable), NOT a court of law, legal advice, or an enforceable ruling. A fair ' +
      'process whose rules are theorems; the binding ruling stays a human court\'s.',
  }
}
