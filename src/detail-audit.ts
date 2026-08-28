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
import { extractDecidable, wordsToNumber, type ExtractedFact } from './books.js'

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
  /** powers-of-ten heard inside prose ("10 to the 93 grams") — a magnitude is a VALUE, not a claim, so these
   *  are recorded, never verdicted; only an explicit equation or orders-of-magnitude relation decides */
  magnitudes: { base: number; exp: number; negative: boolean }[]
  address: string
  note: string
}

export interface ControlRun {
  control: string
  mustNotBe: DetailVerdictKind[]
  got: DetailVerdictKind
  rejected: boolean
}

/** a claim decided ACROSS details: the assertion lives in one detail, its operands in earlier ones — the
 *  provenance (which details supplied what) rides the fact, so the composition is auditable, not oracular */
export interface ComposedFact extends ExtractedFact { assertedAt: number; operandsAt: number[] }

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
  /** claims composed across details (orders-of-magnitude with distant operands), decided document-level */
  composed: ComposedFact[]
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

// ── THE POWERS-OF-TEN GRAMMAR (lead 79). The Black Whole re-audit found the film's dominant number shape —
// "10 to the 93 grams per centimeter cube", "10 to the minus 24" — entirely unhearable: not the binary a·op·b=c
// the extractor reads, and not a proposition the calculator parses. The honest split of that speech:
//   MAGNITUDE  a bare power names a VALUE, not a claim — recorded so the audit SHOWS what it heard, never verdicted.
//   EQUATION   "10 to the 3 is 1000" asserts a^b = c — decided exactly (BigInt, capped like the calculator).
//   ORDERS     two same-base powers plus "k orders of magnitude" asserts |e1 − e2| = k — Nat subtraction, decided.
// A negative exponent is not a Nat, so it is recorded and never decided — the refusal is the honesty.
const POWER_RE = /\b(\d{1,3})\s+to\s+the\s+(minus\s+)?(\d{1,4})(?:st|nd|rd|th)?\b/gi
const MAX_POWER_EXP = 4096n
const MAX_POWER_BITS = 4096
const powValue = (base: bigint, exp: bigint): bigint | null => {
  if (exp > MAX_POWER_EXP) return null
  let r = 1n
  for (let i = 0n; i < exp; i++) { r *= base; if (r >> BigInt(MAX_POWER_BITS)) return null }
  return r
}

/** hearPowers(text) → the powers-of-ten the detail speaks: every magnitude recorded, plus any DECIDABLE claim
 *  they form — an explicit equation ("10 to the 3 is 1000") or an orders-of-magnitude relation between two
 *  same-base powers ("10 to the 93 is 38 orders of magnitude larger than 10 to the 55"). */
export function hearPowers(text: string): { facts: ExtractedFact[]; magnitudes: { base: number; exp: number; negative: boolean }[] } {
  const magnitudes: { base: number; exp: number; negative: boolean }[] = []
  const facts: ExtractedFact[] = []
  const matches = [...String(text).matchAll(POWER_RE)]
  for (const m of matches) magnitudes.push({ base: Number(m[1]), exp: Number(m[3]), negative: !!m[2] })
  // EQUATION — a power directly asserted equal to a number: decide a^b = c exactly (never for negative exponents)
  const eqRe = /\b(\d{1,3})\s+to\s+the\s+(\d{1,4})(?:st|nd|rd|th)?\s*(?:=|is|equals|makes?)\s*(\d{1,15})\b/gi
  for (const m of String(text).matchAll(eqRe)) {
    const base = BigInt(m[1]), exp = BigInt(m[2]), asserted = BigInt(m[3])
    const actual = powValue(base, exp)
    // beyond the honest caps (exp, bits, or a value no number field carries exactly) — refuse, don't guess
    if (actual === null || actual > 9007199254740991n) continue
    const lean = `theorem power_fact : ${m[1]} ^ ${m[2]} = ${actual} := by decide`
    facts.push({ claim: m[0].replace(/\s+/g, ' ').trim(), asserted: Number(m[3]), actual: Number(actual), lean, verdict: actual === asserted ? 'VERIFIED' : 'REFUTED', address: toUuid(lean) })
  }
  // ORDERS — two same-base non-negative powers and an asserted gap: |e1 − e2| decides the claim
  const orders = String(text).match(/\b(\d{1,4})\s+orders?\s+of\s+magnitude\b/i)
  const positive = magnitudes.filter((p) => !p.negative)
  if (orders && positive.length >= 2 && positive[0].base === positive[1].base) {
    const [hi, lo] = positive[0].exp >= positive[1].exp ? [positive[0].exp, positive[1].exp] : [positive[1].exp, positive[0].exp]
    const gap = hi - lo
    const asserted = Number(orders[1])
    const lean = `theorem power_fact : ${hi} - ${lo} = ${gap} := by decide`
    facts.push({ claim: `${positive[0].base}^${positive[0].exp} vs ${positive[1].base}^${positive[1].exp}: ${orders[0]}`, asserted, actual: gap, lean, verdict: gap === asserted ? 'VERIFIED' : 'REFUTED', address: toUuid(lean) })
  }
  return { facts, magnitudes }
}

// ── THE CHAINED-SUM GRAMMAR (lead 79a, the last remainder). Speech runs totals: "20 plus 20 is 40 plus 24
// brought me to 64". The binary extractor's compound guard rightly refuses the fragment — so the chain is
// parsed WHOLE instead: NUM op NUM conn NUM, then each further "op NUM conn NUM" chains off the PREVIOUS
// ASSERTED value (40 + 24 = 64, not 20 + 24). Facts emit only when the chain holds AT LEAST TWO steps — a
// single step stays extractDecidable's case, so the two grammars never overlap and nothing is double-heard.
// Total Nat semantics throughout (a − b floors at 0, n / 0 = 0), matching the kernel exactly.
const CHAIN_OPS: Record<string, (a: number, b: number) => number> = {
  plus: (a, b) => a + b, minus: (a, b) => (a > b ? a - b : 0), times: (a, b) => a * b,
  over: (a, b) => (b === 0 ? 0 : (a - (a % b)) / b),
}
const CHAIN_OP_SYMBOL: Record<string, string> = { plus: '+', minus: '-', times: '*', over: '/' }

/** hearChain(text) → the running total decided step by step, or [] when no ≥2-step chain parses whole. */
export function hearChain(text: string): ExtractedFact[] {
  // normalise symbols to words, then tokenise; "divided by" folds to "over", assertion phrases fold to "is"
  const words = String(text).toLowerCase()
    .replace(/[×*]/g, ' times ').replace(/\+/g, ' plus ').replace(/[−]/g, ' minus ').replace(/=/g, ' is ')
    .replace(/\bdivided\s+by\b/g, ' over ').replace(/\b(?:brought|brings|bringing)\s+(?:me\s+|us\s+)?to\b/g, ' is ')
    .replace(/\b(?:equals|makes?|gives?|leaving)\b/g, ' is ')
    .split(/\s+/).filter(Boolean)
  const num = (w: string | undefined): number | null =>
    w === undefined ? null : /^\d{1,7}$/.test(w) ? Number(w) : wordsToNumber(w)
  for (let i = 0; i < words.length; i++) {
    const a0 = num(words[i])
    if (a0 === null) continue
    // parse as long a chain as the tokens carry: (op b is c)+ with the asserted c feeding the next step
    const steps: { a: number; op: string; b: number; asserted: number }[] = []
    let left = a0, j = i + 1
    while (j + 3 < words.length + 1 && CHAIN_OPS[words[j]] !== undefined) {
      const b = num(words[j + 1])
      if (b === null || words[j + 2] !== 'is') break
      const asserted = num(words[j + 3])
      if (asserted === null) break
      steps.push({ a: left, op: words[j], b, asserted })
      left = asserted
      j += 4
    }
    if (steps.length >= 2) return steps.map((s) => {
      const actual = CHAIN_OPS[s.op](s.a, s.b)
      const lean = `theorem chain_fact : ${s.a} ${CHAIN_OP_SYMBOL[s.op]} ${s.b} = ${actual} := by decide`
      return { claim: `${s.a} ${s.op} ${s.b} is ${s.asserted}`, asserted: s.asserted, actual, lean,
        verdict: actual === s.asserted ? 'VERIFIED' as const : 'REFUTED' as const, address: toUuid(lean) }
    })
    if (steps.length === 1) i = j - 1  // a single step is not a chain — skip past it, extractDecidable owns it
  }
  return []
}

/** one detail through the instrument: the calculator first (it recognises sealed statements and decides fresh
 *  arithmetic), then, for prose, the word-arithmetic extractor (a sentence saying "two and two make five" is
 *  REFUTED, not shrugged at — the deafness the Black Whole audit witnessed, lead 76/71), then the citation
 *  trial with its relevance floor. */
function stripTerminalPunct(s: string): string {
  let i = s.length
  while (i > 0 && (s[i - 1] === '.' || s[i - 1] === '!' || s[i - 1] === '?')) i--
  return s.slice(0, i)
}

export function auditDetail(detail: string): DetailVerdict {
  // the calculator's grammar reads propositions, not sentences — "2 + 2 = 4." is arithmetic wearing a full stop,
  // so terminal punctuation is stripped for the decide route only; the detail keeps its exact text and address
  const d = decide(stripTerminalPunct(detail).trim())
  const base = { detail, kind: d.kind, numerals: numeralsOf(detail), address: toUuid(detail) }
  if (d.kind !== 'prose') {
    const verdict = (d.verdict === 'UNVERIFIED' || d.verdict === 'DRAINED' ? 'UNVERIFIED' : d.verdict) as DetailVerdictKind
    return { ...base, verdict, cites: d.cites, fabricated: [], arithmetic: [], magnitudes: [], note: d.honest }
  }
  const slim = slimGate(detail)
  const powers = hearPowers(detail)
  // a fabricated citation outranks everything the prose says — the gate's one draining offence
  if (slim.fabricated.length) {
    return { ...base, verdict: 'DRAINED', cites: slim.real, fabricated: slim.fabricated, arithmetic: extractDecidable(detail), magnitudes: powers.magnitudes, note: adjudicate(detail).note }
  }
  // the decidable-slice route: extractDecidable hears digit AND number-word binary sums, hearPowers hears
  // powers-of-ten equations and orders-of-magnitude relations; both refuse fragments and out-of-cap values
  // rather than mis-verdict. A false claim refutes the detail; all-true claims decide it — with the honest
  // scope that ONLY the decidable slice is adjudicated, never the prose around it.
  const arithmetic = [...extractDecidable(detail), ...powers.facts, ...hearChain(detail)]
  const a = adjudicate(detail)
  // THE CAPTAIN'S BILATERAL LAW. A detail's dimensions are its decidable facts (arithmetic, powers, chains) and
  // its citations (the relevance-floored trial). VERIFIED must lean in ALL dimensions AT ONCE — true facts
  // beside a laundered citation do not verify. REFUTED must prove in ALL dimensions — a false step beside a
  // true one, or beside a citation that merely fails to verify, is PARTIAL, and partial is UNVERIFIED.
  // True and false are the BINARY — the two total poles — and UNVERIFIED is all the in-between, to be
  // DISCOVERED in involutions: each grammar this auditor grows (word sums, powers, chains, composition) is one
  // more self-inverse reading that pulls a detail out of the middle toward a pole it can actually earn.
  const citeDim = slim.real.length ? a.verdict : null
  if (arithmetic.length) {
    const refuted = arithmetic.filter((f) => f.verdict === 'REFUTED')
    if (refuted.length === 0 && (citeDim === null || citeDim === 'VERIFIED')) return {
      ...base, kind: 'decided-arithmetic', verdict: 'VERIFIED_BY_DECIDE', cites: slim.real, fabricated: [], arithmetic, magnitudes: powers.magnitudes,
      note: `every dimension leans at once: the decidable facts recompute true (${arithmetic.map((f) => f.claim).join('; ')})${citeDim ? ' and the citation verifies' : ''} — only the decidable slice is adjudicated, never the prose around it`,
    }
    if (refuted.length === arithmetic.length && citeDim === null) return {
      ...base, kind: 'decided-arithmetic', verdict: 'REFUTED', cites: slim.real, fabricated: [], arithmetic, magnitudes: powers.magnitudes,
      note: `every decidable dimension refutes: ${refuted.map((f) => `"${f.claim}" recomputes to ${f.actual}`).join('; ')} — REFUTED (about the arithmetic only)`,
    }
    const failing = refuted.length
      ? refuted.map((f) => `"${f.claim}" recomputes to ${f.actual}`).join('; ')
      : `the citation dimension does not verify (${a.note})`
    return {
      ...base, kind: 'decided-arithmetic', verdict: 'UNVERIFIED', cites: slim.real, fabricated: [], arithmetic, magnitudes: powers.magnitudes,
      note: `the dimensions disagree — ${failing}; VERIFIED must lean in all dimensions at once and REFUTED must prove in all, so this stays UNVERIFIED`,
    }
  }
  return { ...base, verdict: a.verdict, cites: slim.real, fabricated: [], arithmetic, magnitudes: powers.magnitudes, note: a.note }
}

// The pre-registered controls — fixed BEFORE any subject is read, so they cannot be shaped to the result.
// One exercises the arithmetic route (must be REFUTED), one the citation route (a real theorem cited about a
// disjoint topic must not verify), one the fabrication route (an unsealed citation must drain or stay unverified).
const CONTROLS: { control: string; mustNotBe: DetailVerdictKind[] }[] = [
  { control: '2 + 2 = 5', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
  { control: 'two and two make five', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
  { control: '10 to the 3 is 999', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
  { control: '10 plus 10 is 20 plus 5 brought me to 26', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
  { control: 'the moon is made of cheese, proven by theorem two_coins', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
  { control: 'this audit is perfect, proven by theorem detail_audit_control_unsealed', mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE'] },
]

// ── CROSS-DETAIL COMPOSITION (lead 79c). Speech separates a claim from its operands: the Black Whole film says
// "some 39 orders of magnitude smaller" captions away from the 10⁵⁵ and 10⁹³ it compares — and 93 − 55 = 38,
// a refutable claim no single-detail law can reach. The composition law: an "k orders of magnitude" assertion
// whose own detail could not decide it looks back through a BOUNDED window of details; if the window holds
// EXACTLY two distinct same-base positive exponents, the claim is unambiguous and |e1 − e2| = k decides it —
// any other operand count is ambiguity, and ambiguity is refused rather than mis-verdicted (the compound
// guard's discipline at document scale). Provenance rides every composed fact: which detail asserted, which
// details supplied the operands.
const COMPOSE_WINDOW = 16

function composeAcrossDetails(verdicts: DetailVerdict[]): ComposedFact[] {
  const out: ComposedFact[] = []
  verdicts.forEach((v, i) => {
    const orders = v.detail.match(/\b(\d{1,4})\s+orders?\s+of\s+magnitude\b/i)
    if (!orders) return
    // the in-detail law already decided it — composition only reaches for what single-detail hearing could not
    if (v.arithmetic.some((f) => f.lean.startsWith('theorem power_fact'))) return
    const window = verdicts.slice(i < COMPOSE_WINDOW ? 0 : i - COMPOSE_WINDOW, i + 1)
    const base10 = window.flatMap((w, j) => w.magnitudes.filter((m) => !m.negative && m.base === 10)
      .map((m) => ({ exp: m.exp, at: (i < COMPOSE_WINDOW ? 0 : i - COMPOSE_WINDOW) + j })))
    const distinct = [...new Set(base10.map((p) => p.exp))]
    if (distinct.length !== 2) return  // zero, one, or many candidate operands — ambiguous, refuse
    const [hi, lo] = distinct[0] >= distinct[1] ? [distinct[0], distinct[1]] : [distinct[1], distinct[0]]
    const gap = hi - lo
    const asserted = Number(orders[1])
    const lean = `theorem power_fact : ${hi} - ${lo} = ${gap} := by decide`
    const fact: ComposedFact = {
      claim: `10^${hi} vs 10^${lo}: ${orders[0]}`, asserted, actual: gap, lean,
      verdict: gap === asserted ? 'VERIFIED' : 'REFUTED', address: toUuid(lean),
      assertedAt: i, operandsAt: [...new Set(base10.map((p) => p.at))],
    }
    out.push(fact)
    // the asserting detail carries the composed verdict — unless it already drained (draining outranks), and
    // REFUTED only when the composition is the detail's SOLE decidable dimension (the captain's law: refutation
    // must prove in all dimensions; a composed refutation beside other holding facts is partial → UNVERIFIED)
    if (v.verdict === 'UNVERIFIED' && v.arithmetic.length === 0 && v.cites.length === 0) {
      v.verdict = fact.verdict === 'REFUTED' ? 'REFUTED' : 'VERIFIED_BY_DECIDE'
      v.note = `composed across details [${fact.operandsAt.join(', ')}]: ${fact.claim} — recomputes to ${gap}, ` +
        (fact.verdict === 'REFUTED' ? `asserted ${asserted}: REFUTED in its one decidable dimension (about the arithmetic only)` : `asserted ${asserted}: holds (only the arithmetic slice is adjudicated)`)
    }
  })
  return out
}

// the composition's own pre-registered control: operands two details apart, gap 4, asserted 5 — the instrument
// must REFUTE it, and ONLY refutation passes (a silent no-composition would otherwise slip through mustNotBe)
const COMPOSED_CONTROL = 'the first density is 10 to the 9 units\nthat is 5 orders of magnitude more than the second density of 10 to the 5'

/** auditDetails(text[, opts]) → every single detail adjudicated, controls first, one order-invariant receipt.
 *  Pure and offline; the same text, delimiter and ledger always fold to the same receipt. */
export function auditDetails(text: string, opts: { title?: string; delimiter?: string } = {}): DetailAudit {
  const { delimiter, ...meta } = opts
  const controls: ControlRun[] = CONTROLS.map(({ control, mustNotBe }) => {
    const got = auditDetail(control).verdict
    return { control, mustNotBe, got, rejected: !mustNotBe.includes(got) }
  })
  // the composition control: ONLY refutation passes — a silent no-composition must fail the control, so every
  // verdict except REFUTED is listed as unacceptable
  const controlDetails = splitDetails(COMPOSED_CONTROL).map(auditDetail)
  const composedControl = composeAcrossDetails(controlDetails)
  const composedGot: DetailVerdictKind = composedControl.length === 1 && composedControl[0].verdict === 'REFUTED'
    ? 'REFUTED' : (controlDetails[controlDetails.length - 1]?.verdict ?? 'UNVERIFIED')
  controls.push({ control: COMPOSED_CONTROL, mustNotBe: ['VERIFIED', 'VERIFIED_BY_DECIDE', 'UNVERIFIED', 'DRAINED'], got: composedGot, rejected: composedGot === 'REFUTED' })
  const sound = controls.every((c) => c.rejected)
  const all = splitDetails(text, delimiter)
  const kept = all.slice(0, MAX_DETAILS)
  // a void instrument adjudicates nothing — per-detail verdicts from a non-discriminating test are noise
  const verdicts = sound ? kept.map(auditDetail) : []
  const composed = sound ? composeAcrossDetails(verdicts) : []
  // counts AFTER composition — a cross-detail refutation moves its asserting detail's verdict
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
    ...composed.map((f) => toUuid(f.address + '|' + f.verdict + '|' + f.assertedAt)),
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
    composed,
    receipt,
    honest: sound
      ? 'every detail adjudicated by an instrument shown able to fail (all controls rejected). Integrity, not ' +
        'truth: verdicts settle each detail\'s arithmetic or citation, never the world; UNVERIFIED is not-yet, ' +
        'never false — only decided arithmetic can be REFUTED.'
      : 'VOID — a control the instrument was built to reject was accepted, so no per-detail verdict carries ' +
        'information. The void is the finding: it names the instrument, not the text.',
  }
}
