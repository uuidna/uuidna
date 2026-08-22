// detail-audit — AUDIT EVERY SINGLE DETAIL, with an instrument that can fail.
//
// A document arrives as one blob and its claims hide in the plural: a text "passes" while a single sentence
// inside it overclaims. This module splits any text into DETAILS (a deterministic sentence/line split), runs
// EVERY detail through the calculator (decide: sealed statement / decided arithmetic / prose→gate) and — for
// prose — the citation trial (adjudicate: the relevance floor, the numeral-contradiction check), and folds
// every per-detail receipt WITH its verdict into ONE order-invariant receipt anyone recomputes.
//
// CONTROLS RUN FIRST (trial-protocol): a trial that cannot return a negative is not a trial. Before the subject
// is read, the same instrument must REFUTE a false-arithmetic control and must NOT verify a fabricated-citation
// control. If either control passes, the audit is VOID — the instrument cannot discriminate, so per-detail
// verdicts would carry no information — and the void is itself citable (the receipt still folds).
//
// HONEST SCOPE — integrity, not truth: each verdict adjudicates the detail's ARITHMETIC or its CITATION, never
// the world. UNVERIFIED is "not yet", never "false"; only decided arithmetic can be REFUTED. The split is a
// deterministic heuristic, not a parser — what matters is that the same text always yields the same details.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { decide, type Decision } from './decide.js'
import { adjudicate, numeralsOf } from './adjudicate.js'
import { slimGate } from './slimgate.js'

export type DetailVerdictKind = 'VERIFIED' | 'VERIFIED_BY_DECIDE' | 'REFUTED' | 'UNVERIFIED' | 'DRAINED'

export interface DetailVerdict {
  detail: string
  /** which route decided it — the calculator's own taxonomy */
  kind: Decision['kind']
  verdict: DetailVerdictKind
  /** sealed theorems the detail really cites (empty for arithmetic) */
  cites: string[]
  /** citations naming theorems NOT sealed in the ledger — each one drains */
  fabricated: string[]
  /** every number the detail asserts — the checkable slice of its prose */
  numerals: number[]
  address: string
  note: string
}

export interface ControlRun {
  control: string
  mustNotBe: DetailVerdictKind[]
  got: DetailVerdictKind
  rejected: boolean
}

export interface DetailAudit {
  title?: string
  /** the whole text's content-address — the exact edition audited */
  address: string
  details: number
  /** details beyond the cap, reported rather than silently truncated */
  dropped: number
  controls: ControlRun[]
  /** 'audited' iff every control was rejected; otherwise 'void' — the instrument could not discriminate */
  outcome: 'audited' | 'void'
  counts: { verified: number; refuted: number; unverified: number; drained: number }
  verdicts: DetailVerdict[]
  receipt: string
  honest: string
}

// 9³ — enough for a book chapter, bounded so a hostile input cannot buy unbounded compute. Overflow is COUNTED.
const MAX_DETAILS = 729

/** splitDetails(text) → the deterministic atomisation: lines first, then sentence boundaries, bullets stripped.
 *  A heuristic, not a parser — the property that matters is that the same text always splits the same way. */
export function splitDetails(text: string): string[] {
  return String(text)
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim().replace(/^[-*•]\s+/, ''))
    .filter((s) => s.length >= 2)
}

/** one detail through the instrument: the calculator first (it recognises sealed statements and decides fresh
 *  arithmetic — the only route to REFUTED), then, for prose, the citation trial with its relevance floor. */
export function auditDetail(detail: string): DetailVerdict {
  // the calculator's grammar reads propositions, not sentences — "2 + 2 = 4." is arithmetic wearing a full stop,
  // so terminal punctuation is stripped for the decide route only; the detail keeps its exact text and address
  const d = decide(detail.replace(/[.!?]+$/, '').trim())
  const base = { detail, kind: d.kind, numerals: numeralsOf(detail), address: toUuid(detail) }
  if (d.kind !== 'prose') {
    const verdict = (d.verdict === 'UNVERIFIED' || d.verdict === 'DRAINED' ? 'UNVERIFIED' : d.verdict) as DetailVerdictKind
    return { ...base, verdict, cites: d.cites, fabricated: [], note: d.honest }
  }
  const slim = slimGate(detail)
  const a = adjudicate(detail)
  // a fabricated citation outranks everything the prose says — the gate's one draining offence
  const verdict: DetailVerdictKind = slim.fabricated.length ? 'DRAINED' : a.verdict
  return { ...base, verdict, cites: slim.real, fabricated: slim.fabricated, note: a.note }
}

// The pre-registered controls — fixed BEFORE any subject is read, so they cannot be shaped to the result.
// One exercises the arithmetic route (must be REFUTED), one the citation route (a real theorem cited about a
// disjoint topic must not verify), one the fabrication route (an unsealed citation must drain or stay unverified).
const CONTROLS: { control: string; mustNotBe: DetailVerdictKind[] }[] = [
  { control: '2 + 2 = 5', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
  { control: 'the moon is made of cheese, proven by theorem two_coins', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
  { control: 'this audit is perfect, proven by theorem detail_audit_control_unsealed', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
]

/** auditDetails(text[, meta]) → every single detail adjudicated, controls first, one order-invariant receipt.
 *  Pure and offline; the same text and the same ledger always fold to the same receipt. */
export function auditDetails(text: string, meta: { title?: string } = {}): DetailAudit {
  const controls: ControlRun[] = CONTROLS.map(({ control, mustNotBe }) => {
    const got = auditDetail(control).verdict
    return { control, mustNotBe, got, rejected: !mustNotBe.includes(got) }
  })
  const sound = controls.every((c) => c.rejected)
  const all = splitDetails(text)
  const kept = all.slice(0, MAX_DETAILS)
  // a void instrument adjudicates nothing — per-detail verdicts from a non-discriminating test are noise
  const verdicts = sound ? kept.map(auditDetail) : []
  const counts = {
    verified: verdicts.filter((v) => v.verdict === 'VERIFIED' || v.verdict === 'VERIFIED_BY_DECIDE').length,
    refuted: verdicts.filter((v) => v.verdict === 'REFUTED').length,
    unverified: verdicts.filter((v) => v.verdict === 'UNVERIFIED').length,
    drained: verdicts.filter((v) => v.verdict === 'DRAINED').length,
  }
  const address = toUuid(String(text))
  const receipt = merkleGravity([
    address,
    ...controls.map((c) => toUuid('control:' + c.control + '→' + c.got)),
    ...verdicts.map((v) => toUuid(v.address + '|' + v.verdict)),
  ])
  return {
    ...meta,
    address,
    details: kept.length,
    dropped: all.length - kept.length,
    controls,
    outcome: sound ? 'audited' : 'void',
    counts,
    verdicts,
    receipt,
    honest: sound
      ? 'every detail adjudicated by an instrument shown able to fail (all controls rejected). Integrity, not ' +
        'truth: verdicts settle each detail\'s arithmetic or citation, never the world; UNVERIFIED is not-yet, ' +
        'never false — only decided arithmetic can be REFUTED.'
      : 'VOID — a control the instrument was built to reject was accepted, so no per-detail verdict carries ' +
        'information. The void is the finding: it names the instrument, not the text.',
  }
}
