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
import { extractDecidable, type ExtractedFact } from './books.js'

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
  /** word-arithmetic claims heard inside prose ("two and two make four"), each independently decided */
  arithmetic: ExtractedFact[]
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

/** splitDetails(text[, delimiter]) → the deterministic atomisation: lines first, then sentence boundaries,
 *  bullets stripped. A heuristic, not a parser — the property that matters is that the same text always splits
 *  the same way. ASR/caption text carries NO punctuation (the Black Whole audit, lead 76), so the sentence law
 *  never fires on it — a caller who knows the real boundary passes it as `delimiter`, which then splits
 *  EXCLUSIVELY (no sentence heuristic on top of an explicit law). */
export function splitDetails(text: string, delimiter?: string): string[] {
  const parts = delimiter
    ? String(text).split(delimiter)
    : String(text).split(/\n+/).flatMap((line) => line.split(/(?<=[.!?])\s+/))
  return parts
    .map((s) => s.trim().replace(/^[-*•]\s+/, ''))
    .filter((s) => s.length >= 2)
}

/** one detail through the instrument: the calculator first (it recognises sealed statements and decides fresh
 *  arithmetic), then, for prose, the word-arithmetic extractor (a sentence saying "two and two make five" is
 *  REFUTED, not shrugged at — the deafness the Black Whole audit witnessed, lead 76/71), then the citation
 *  trial with its relevance floor. */
export function auditDetail(detail: string): DetailVerdict {
  // the calculator's grammar reads propositions, not sentences — "2 + 2 = 4." is arithmetic wearing a full stop,
  // so terminal punctuation is stripped for the decide route only; the detail keeps its exact text and address
  const d = decide(detail.replace(/[.!?]+$/, '').trim())
  const base = { detail, kind: d.kind, numerals: numeralsOf(detail), address: toUuid(detail) }
  if (d.kind !== 'prose') {
    const verdict = (d.verdict === 'UNVERIFIED' || d.verdict === 'DRAINED' ? 'UNVERIFIED' : d.verdict) as DetailVerdictKind
    return { ...base, verdict, cites: d.cites, fabricated: [], arithmetic: [], note: d.honest }
  }
  const slim = slimGate(detail)
  // a fabricated citation outranks everything the prose says — the gate's one draining offence
  if (slim.fabricated.length) {
    return { ...base, verdict: 'DRAINED', cites: slim.real, fabricated: slim.fabricated, arithmetic: extractDecidable(detail), note: adjudicate(detail).note }
  }
  // the word-arithmetic route: extractDecidable hears digit AND number-word operands with word operators, and
  // its compound guard refuses fragments of larger expressions rather than mis-verdict a sub-expression. A false
  // sum refutes the detail; all-true sums decide it — with the honest scope that ONLY the arithmetic slice is
  // adjudicated, never the prose around it.
  const arithmetic = extractDecidable(detail)
  if (arithmetic.length) {
    const refuted = arithmetic.filter((f) => f.verdict === 'REFUTED')
    if (refuted.length) return {
      ...base, kind: 'decided-arithmetic', verdict: 'REFUTED', cites: slim.real, fabricated: [], arithmetic,
      note: `asserts arithmetic its own numbers refute: ${refuted.map((f) => `"${f.claim}" recomputes to ${f.actual}`).join('; ')} — REFUTED (about the arithmetic only)`,
    }
    return {
      ...base, kind: 'decided-arithmetic', verdict: 'VERIFIED_BY_DECIDE', cites: slim.real, fabricated: [], arithmetic,
      note: `its decidable arithmetic recomputes true (${arithmetic.map((f) => f.claim).join('; ')}) — only the arithmetic slice is adjudicated, never the prose around it`,
    }
  }
  const a = adjudicate(detail)
  return { ...base, verdict: a.verdict, cites: slim.real, fabricated: [], arithmetic, note: a.note }
}

// The pre-registered controls — fixed BEFORE any subject is read, so they cannot be shaped to the result.
// One exercises the arithmetic route (must be REFUTED), one the citation route (a real theorem cited about a
// disjoint topic must not verify), one the fabrication route (an unsealed citation must drain or stay unverified).
const CONTROLS: { control: string; mustNotBe: DetailVerdictKind[] }[] = [
  { control: '2 + 2 = 5', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
  { control: 'two and two make five', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
  { control: 'the moon is made of cheese, proven by theorem two_coins', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
  { control: 'this audit is perfect, proven by theorem detail_audit_control_unsealed', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
]

/** auditDetails(text[, opts]) → every single detail adjudicated, controls first, one order-invariant receipt.
 *  Pure and offline; the same text, delimiter and ledger always fold to the same receipt. */
export function auditDetails(text: string, opts: { title?: string; delimiter?: string } = {}): DetailAudit {
  const { delimiter, ...meta } = opts
  const controls: ControlRun[] = CONTROLS.map(({ control, mustNotBe }) => {
    const got = auditDetail(control).verdict
    return { control, mustNotBe, got, rejected: !mustNotBe.includes(got) }
  })
  const sound = controls.every((c) => c.rejected)
  const all = splitDetails(text, delimiter)
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
