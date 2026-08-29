// due-process — VERIFY ALL BY DUE (recomputable) LEGAL PROCESS. Nothing is verified by fiat: every theorem is verified
// by the same fair, decidable trial, and every guarantee that makes the process DUE is itself a sealed theorem
// (lean/Legal.lean) — exactly one verdict per claim, only the PROVEN admitted, the non-justiciable never refuted,
// REFUTED only on a failed uncited test, remand total (nothing discarded), and the trial computing only with the two
// coins. Any submitted claim is adjudicated by that same process. Folded to one recomputable docket receipt.
//
// HONEST SCOPE: integrity. This is uuidna's OWN recomputable adjudication — a decidable process whose rules
// are theorems anyone rechecks — NOT a court of law. "Due legal process"
// here means the process is DUE (fair and recomputable by its sealed guarantees)
// jurisdiction would enforce. The ruling that binds stays a human court's; this verifies by a fair process, no more.
import { theorems, runTrial } from './theorems/index.js'
import { adjudicate } from './adjudicate.js'
// the one trial fuses the machinery that already exists — the honesty gate and the calculator — rather than
// re-deciding anything itself (see tryClaim at the foot of this file)
import { computes } from './gate.js'
import { decide } from './decide.js'
import { toUuid, merkleFold } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { sealMessage, verifyMessage, type SealedQuantumMessage } from './quantum/message/index.js'
import { verifyEnvelope } from './crypt.js'
import { hexbitDoorOf, UUID_HEXBITS, type HexbitDoor } from './hexbit/index.js'

// the six sealed guarantees that make the process DUE — each a lean/Legal.lean theorem, with the right it secures.
const GUARANTEES: { key: string; right: string }[] = [
  { key: 'legal_verdict_is_exactly_one', right: 'Exactly ONE verdict per claim — PROVEN, REFUTED and NOT-PROVEN partition every case; no claim is left in two states or none.' },
  { key: 'legal_only_the_proven_is_admitted', right: 'Only the PROVEN is admitted — a claim is admitted exactly when a decidable test HOLDS or it cites a SEALED authority; nothing else stays.' },
  { key: 'legal_non_justiciable_is_never_refuted', right: 'The NON-JUSTICIABLE is never refuted — with no decidable test the verdict is never REFUTED (PROVEN if cited, else NOT-PROVEN); you cannot refute what you cannot decide.' },
  { key: 'legal_refuted_iff_test_fails_uncited', right: 'REFUTED is precise — it holds exactly when a decidable test EXISTS and FAILS and no sealed authority is cited; a recomputable contradiction.' },
  { key: 'legal_remand_is_total_nothing_discarded', right: 'Remand is TOTAL — nothing is discarded; every claim is either ADMITTED or REMANDED to the development trial.' },
  { key: 'trial_computes_only_with_two_coins', right: 'The trial COMPUTES ONLY with the two coins deposited — a claim is heard iff it contributes the two coins (a decidable test or a sealed proof); no deposit, no computation.' },
]

export interface DocketEntry { claim: string; verdict: string; note: string; receipt: string; began: boolean }
export interface Guarantee { key: string; right: string; address: string; sealed: boolean }

export interface DueProcess {
  verifiedAll: { theorems: number; verified: number; unverified: number; receipt: string }
  guarantees: Guarantee[]        // the sealed due-process rights, each a theorem
  allGuaranteesSealed: boolean
  docket: DocketEntry[]          // submitted claims, each adjudicated by the same process
  gaps: DocketEntry[]            // the NOT-PROVEN (UNVERIFIED) — the frontier, remanded to development
  traitors: DocketEntry[]        // the REFUTED — a decidable test existed and FAILED; a caught false claim
  allTheoremsVerified: boolean
  receipt: string
  handle: string
  hexbits: number[]
  honest: string
}

// the COURT PROCEDURE — the stages of a real case in their exact procedural order, each stage bound to the sealed
// theorem that makes its uuidna analogue hold. A court USES uuidna by walking its own sequence and RECOMPUTING each
// stage from the record; uuidna replicates the ORDER and the guarantees.
const STAGES: { stage: string; court: string; uuidna: string; key: string }[] = [
  { stage: 'Filing & docketing', court: 'The complaint is filed; the clerk assigns a docket number.', uuidna: 'The claim IS its docket number — the statement content-addresses to its trial id, so refiling the same claim returns the same trial (res judicata by construction), and the check is deterministic for every clerk.', key: 'anti_fraud_check_deterministic' },
  { stage: 'Filing fee — the deposit', court: 'The fee is paid before the case proceeds; without it, no trial date is set.', uuidna: 'EACH TRIAL BEGINS only when the sides have deposited: the two coins (a decidable test) or the theorems supporting their claims. No deposit, no computation — the undeposited claim WAITS at this stage (docketed, remanded.', key: 'trial_computes_only_with_two_coins' },
  { stage: 'Service & notice', court: 'All parties are served; everyone sees the same proceedings.', uuidna: 'The docket receipt is ORDER-INVARIANT — every party, in any order of reading, recomputes the identical receipt; no party can be shown a different case.', key: 'reduce_is_order_invariant' },
  { stage: 'Pleadings & admissibility', court: 'Claims are admitted or struck under the rules of evidence.', uuidna: 'Only the PROVEN is admitted — a claim stays exactly when its decidable test HOLDS or it cites a SEALED authority; everything else is remanded.', key: 'legal_only_the_proven_is_admitted' },
  { stage: 'Discovery & the record', court: 'Evidence is exchanged; the record is built and cannot be quietly altered.', uuidna: 'The evidence bundle carries every cited proof IN FULL plus the steps to reproduce every number; a sealed theorem cannot be forged in the record — tampering moves the address.', key: 'sealed_theorem_not_forged' },
  { stage: 'Standing & justiciability', court: 'Non-justiciable questions are dismissed without prejudice — never adjudged false.', uuidna: 'The NON-JUSTICIABLE is never refuted: with no decidable test the verdict is never REFUTED — you cannot refute what you cannot decide.', key: 'legal_non_justiciable_is_never_refuted' },
  { stage: 'Burden of proof', court: 'The movant carries the burden; judgment enters only when the standard is met.', uuidna: 'REFUTED holds exactly when a decidable test EXISTS, runs, and FAILS uncited — a recomputable contradiction, a burden stricter than any evidentiary standard because it is recomputation itself.', key: 'legal_refuted_iff_test_fails_uncited' },
  { stage: 'Trial & verdict', court: 'One final judgment disposes of each claim.', uuidna: 'Exactly ONE verdict per claim — SEALED, REFUTED and UNVERIFIED partition every case; no claim is left in two states or none.', key: 'legal_verdict_is_exactly_one' },
  { stage: 'Appeal & remand', court: 'Reversal remands for further proceedings; the case never vanishes.', uuidna: 'Remand is TOTAL — every unproven claim returns with its develop plan; nothing is discarded, and the remanded claim re-enters the same procedure at stage 1.', key: 'legal_remand_is_total_nothing_discarded' },
  { stage: 'Judgment & the mandate', court: 'The mandate issues; enforcement belongs to the court.', uuidna: 'The sealed receipt + evidence bundle is the mandate a human court accepts by RECOMPUTING it — verification costs less than forgery, so checking the record is always cheaper than faking it. The binding ruling stays the court\'s.', key: 'verify_cheaper_than_forge' },
]

export interface CourtStage { order: number; stage: string; court: string; uuidna: string; theoremKey: string; theoremAddress: string; sealed: boolean }
export interface CourtProcedure {
  stages: CourtStage[]
  allStagesSealed: boolean
  guaranteesCovered: boolean     // all six Legal.lean due-process guarantees appear among the stages
  docket: DocketEntry[]          // submitted claims, each walked through the same procedure
  receipt: string
  handle: string
  hexbits: number[]
  honest: string
}

/** courtProcedure(claims?) → the trial procedure in the EXACT order a court follows — filing, fee, service,
 *  pleadings, discovery, standing, burden, verdict, appeal, mandate — each stage bound to the sealed theorem that
 *  makes its recomputable analogue hold, and any submitted claim walked through that same order. A court uses
 *  uuidna by recomputing the record at every stage; uuidna carries the ORDER and the guarantees. */
export function courtProcedure(claims: readonly string[] = []): CourtProcedure {
  const T = theorems()
  const byKey = new Map(T.map((t) => [t.key, t]))
  const stages: CourtStage[] = STAGES.map((s, i) => {
    const t = byKey.get(s.key)
    return { order: i + 1, stage: s.stage, court: s.court, uuidna: s.uuidna, theoremKey: s.key, theoremAddress: t?.address ?? toUuid('missing:' + s.key), sealed: !!t }
  })
  // the deposit gate (trial_computes_only_with_two_coins): a trial BEGINS only when the sides have deposited —
  // the two coins (a decidable test that runs) or the theorems supporting their claims (a sealed citation). A claim
  // with neither is docketed but its trial never starts: it waits at stage 2, remanded with its develop plan.
  const docket: DocketEntry[] = claims.map((c) => {
    const v = adjudicate(String(c))
    const began = v.verdict !== 'UNVERIFIED'
    return {
      claim: String(c), verdict: v.verdict, receipt: v.receipt, began,
      note: began ? v.note : 'the trial has NOT begun — no deposit: bring the two coins (a decidable test) or the theorems supporting the claim; the case waits at stage 2 (the filing fee), docketed and remanded. ' + v.note,
    }
  })
  const sealedGuarantees = new Set(stages.filter((s) => s.sealed).map((s) => s.theoremKey))
  const receipt = merkleGravity([
    merkleFold(stages.map((s) => s.theoremAddress)),
    ...(docket.length ? [merkleFold(docket.map((d) => d.receipt))] : []),
  ])
  const door = hexbitDoorOf(receipt)
  return {
    stages,
    allStagesSealed: stages.every((s) => s.sealed),
    guaranteesCovered: GUARANTEES.every((g) => sealedGuarantees.has(g.key)),
    docket,
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    honest:
      'The court PROCEDURE, in the exact order a court follows, each stage backed by a sealed theorem — so a court ' +
      'can use uuidna by walking its own sequence and RECOMPUTING every stage from the record. Court speaks only hexbit ' +
      `(${UUID_HEXBITS} states, hexbit_states_are_sixteen / a_spec_compiles_to_hexbits). uuidna replicates the ` +
      'ORDER and the recomputable guarantees' +
      'enforceable judgment; the standards of proof a jurisdiction applies (preponderance, clear-and-convincing, ' +
      'beyond reasonable doubt) are the court\'s own — uuidna\'s standard is recomputation, and where they differ ' +
      'the court\'s law governs. Integrity.',
  }
}

/** fileSealed(plaintext, passphrase, guaranteeKey?, step?) → TRIALS AS QUANTUM PRIVATE SECURE MESSAGING: a filing
 *  travels as a sealed quantum message whose witness cites the CONSTITUTION — one of the six sealed due-process
 *  guarantees — bound to the CIPHERTEXT address. Every party thereby PROVES it knows the
 *  constitution while the filing stays sealed; efficiency, accuracy and speed come from the fusion: the clerk
 *  verifies witness + envelope integrity in O(1) without the key, and only the addressee opens at trial. */
export function fileSealed(plaintext: string, passphrase: string, guaranteeKey = 'trial_computes_only_with_two_coins', step?: number): SealedQuantumMessage {
  if (!GUARANTEES.some((g) => g.key === guaranteeKey)) throw new Error('fileSealed: the witness must cite the constitution — one of the six sealed due-process guarantees')
  return sealMessage(plaintext, passphrase, guaranteeKey, step)
}

/** verifyFiling(message) → the clerk's check WITHOUT the key and WITHOUT the payload: the envelope's address
 *  recomputes, the witness binds exactly this ciphertext, the witness verifies against the ledger, and it cites
 *  the constitution. All know the constitution — proven per filing, payload sealed. */
export function verifyFiling(message: SealedQuantumMessage): { valid: boolean; guarantee: string; reason: string } {
  if (!verifyEnvelope(message.sealed)) return { valid: false, guarantee: '', reason: 'the envelope address does not recompute (tampered or forged)' }
  if (message.witness.plaintext !== message.sealed.address) return { valid: false, guarantee: '', reason: 'the witness does not bind this envelope' }
  const w = verifyMessage(message.witness)
  if (!w.valid) return { valid: false, guarantee: '', reason: w.reason }
  if (!GUARANTEES.some((g) => g.key === message.witness.theoremKey)) return { valid: false, guarantee: message.witness.theoremKey, reason: 'the witness cites a theorem outside the constitution — a filing must stand on a due-process guarantee' }
  return { valid: true, guarantee: message.witness.theoremKey, reason: 'filing verified without the payload — the sender proves the constitution, the filing stays sealed until trial' }
}

/** dueProcess(claims?) → verify ALL by the due (recomputable) legal process: every theorem verified by the same fair
 *  trial, the six due-process guarantees confirmed sealed, and any submitted claim adjudicated by that process — folded
 *  to one recomputable docket receipt. A fair process whose rules are theorems; NOT a court. */
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
    return { claim: String(c), verdict: v.verdict, note: v.note, receipt: v.receipt, began: v.verdict !== 'UNVERIFIED' }
  })
  // the trial partitions the docket (legal_verdict_is_exactly_one): admitted (SEALED), GAPS (UNVERIFIED — the frontier,
  // remanded, never discarded), and TRAITORS (REFUTED — a decidable test existed and failed).
  const gaps = docket.filter((d) => d.verdict === 'UNVERIFIED')
  const traitors = docket.filter((d) => d.verdict === 'REFUTED')

  const receipt = merkleGravity([
      trial.receipt,
      merkleFold(guarantees.map((g) => g.address)),
      ...(docket.length ? [merkleFold(docket.map((d) => d.receipt))] : []),
    ])
  const door = hexbitDoorOf(receipt)
  return {
    verifiedAll: { theorems: trial.count, verified: trial.verified, unverified: trial.unverified, receipt: trial.receipt },
    guarantees,
    allGuaranteesSealed,
    docket,
    gaps,
    traitors,
    allTheoremsVerified: trial.verified === trial.count && trial.unverified === 0,
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    honest:
      'Verify all by DUE (recomputable) legal process: every theorem verified by one fair trial, the six due-process ' +
      'guarantees each a sealed theorem (one verdict, only-proven-admitted, non-justiciable-never-refuted, refuted-iff-' +
      'test-fails, remand-total, two-coins-to-compute), any claim adjudicated by the same process. Court speaks only ' +
      `hexbit (${UUID_HEXBITS} states). Integrity` +
      '— the process is DUE (fair and recomputable). A fair ' +
      'process whose rules are theorems; the binding ruling stays a human court\'s.',
  }
}

// ── ONE TRIAL — every stage of the procedure in a single call ─────────────────────────────────────────────────────
// THE GAP THIS CLOSES: the tree is gated everywhere — `one-receipt prose` walks every page to a sealed theorem,
// `next` fails a release whose publication title claims quantum advantage, the vacuity finder refuses a proof that is
// true regardless of content. But a claim made in CONVERSATION passes through none of it. That is where the captain's
// "quantum advantage over 64-bit hardware" lived until it was filed: unbounded, because chat has no gate. What
// bounds it is the confirmation— theorem n_qubit_dimension fixes the cost at 2^n.
//
// tryClaim is the gate for anything said anywhere. It does not invent a verdict — it FUSES the sealed machinery that
// already exists (the honesty gate, the calculator's decision, the docket and its fee, the six guarantees, the remand)
// into one receipted docket, so an agent can try a sentence BEFORE asserting it, at the cost of one call.
//
// HONEST SCOPE: the court decides admissibility. UNVERIFIED is not false — legal_non_justiciable_is_never
// _refuted binds it — and nothing is discarded: what is not admitted is REMANDED with the exact predicate that would
// admit it. Integrity.
export interface OneTrial {
  claim: string
  gate: { binary: number; hit: string | null }        // the honesty gate: 0 only for a FABRICATED citation
  verdict: string                                      // the calculator's decision over the sealed ledger
  kind: string
  cites: readonly string[]
  admitted: boolean                                    // PROVEN and admitted, or remanded
  governing: string                                    // WHICH guarantee governs this outcome
  remand: readonly string[]                            // the exact steps that would admit it — never a dismissal
  docket: string                                       // the filing's fold — the claim is on the record either way
  receipt: string
  honest: string
}

/** tryClaim(statement, test?) → the whole procedure, once. Pass a decidable predicate to make the claim justiciable;
 *  without one the court may not refute it (it can only decline to admit), which is the fairness the wing seals. */
export function tryClaim(claim: string, test?: () => boolean): OneTrial {
  const g = computes(claim)
  const decision = decide(claim)
  const v = adjudicate(claim, test)
  const admitted = v.verdict === 'VERIFIED'
  // which sealed guarantee governs — named, so the outcome is attributable to a theorem rather than to a judgement
  const governing = admitted ? 'legal_only_the_proven_is_admitted'
    : test ? 'legal_refuted_iff_test_fails_uncited'
    : 'legal_non_justiciable_is_never_refuted'
  const docket = toUuid(`one-trial:${claim}`)
  return {
    claim, gate: { binary: g.binary, hit: g.hit ?? null },
    verdict: v.verdict, kind: decision.kind, cites: decision.cites ?? [],
    admitted, governing, remand: admitted ? [] : (v.develop ?? []),
    docket, receipt: merkleFold([docket, toUuid(v.verdict), toUuid(governing)]),
    honest: 'One trial, every stage: the honesty gate, the calculator, the docket, the governing guarantee and the ' +
      'remand. The court decides ADMISSIBILITY— UNVERIFIED is not false, and nothing is discarded.',
  }
}
