// prose-completeness — DOES A SEALED THEOREM'S PROSE DO ANYTHING, OR IS IT A LABEL?
//
// WHY THIS EXISTS, AND WHY IT IS NOT A WORD COUNT. A length census was run first and it gave the wrong answer:
// the wings sealed on 2026-09-06 averaged 593 characters against the ledger's 265, which reads as bloat until
// you ask what the sentences DO. They do four things the short ones do not — 62% state a reason against 7%,
// 71% demarcate against 25%, 100% carry their own numbers against 38%, 44% credit a person against 5%. The
// 265-character average was never a norm to match; it is the mean of a ledger where most entries explain
// nothing. Acting on the length reading would have deleted the best-documented prose to match the worst.
//
// So the measure is CAPABILITY, not size, and every axis is detectable without judging style:
//   REASON     — says why, not only what
//   DEMARCATE  — says what is NOT claimed, which is this ledger's whole discipline
//   SPECIFIC   — carries a number that appears in the theorem's own key, so it cannot be a template
//   CREDIT     — names whose result it is, or carries a DOI
//
// A theorem scoring zero on all four has a label, not prose. That is a finding about the LEDGER, not about a
// person: `ring` carries 234 theorems at 15 characters each, and the reasons behind them demonstrably exist —
// the laws wing recovered the closed forms behind 334 Wave counts that had been sealed as bare numbers for
// months. This is the instrument that says where to look next.
import { theorems, type Theorem } from './theorems/index.js'

// round1(x) - round-half-up, written out. The library rounding call is hard-rejected tree-wide: a call that
// settles no theorem has no place here, and rounding a percentage is arithmetic this file can show.
const round1 = (x: number): number => { const f = x % 1; return x - f + (f >= 0.5 ? 1 : 0) }

const REASON = /\b(because|since|so that|the reason|which is why|follows from|hence|therefore|that is why|comes from)\b/i
const DEMARC = /\b(not claimed|does not|is not|never|refus|only|boundary|nothing (here|beyond)|claims? no|outside)\b/i
const CREDIT = /(\b10\.\d{4,9}\/)|\b(Euler|Fermat|Germain|Wiles|Ramanujan|Carmichael|Mazur|Ribet|Serre|Taylor|Watson|Crick|Nirenberg|Landsteiner|Pythagor|Lagrange|Gauss|Chinese Remainder|CRT)\b/

export interface ProseScore {
  key: string
  file: string
  chars: number
  reason: boolean
  demarcates: boolean
  specific: boolean
  credits: boolean
  /** how many of the four axes the prose carries — 0 means a label, not prose */
  score: number
}

/** scoreOne(t) — what this theorem's prose does. Pure; no judgement of style, only of capability. */
export function scoreOne(t: Theorem): ProseScore {
  const text = String(t.name ?? '')
  const nums = String(t.key).match(/\d+/g) ?? []
  const reason = REASON.test(text)
  const demarcates = DEMARC.test(text)
  const specific = nums.length > 0 && nums.some((n) => text.includes(n))
  const credits = CREDIT.test(text)
  return { key: t.key, file: t.file, chars: text.length, reason, demarcates, specific, credits,
    score: (reason ? 1 : 0) + (demarcates ? 1 : 0) + (specific ? 1 : 0) + (credits ? 1 : 0) }
}

export interface WingProse {
  file: string
  theorems: number
  avgChars: number
  reasonPct: number
  demarcatePct: number
  specificPct: number
  creditPct: number
  /** theorems whose prose does none of the four — a label rather than a sentence */
  labels: number
}

/** proseByWing() → the census, one row per wing, sorted worst-first by reason coverage. */
export function proseByWing(): WingProse[] {
  const all = theorems() as readonly Theorem[]
  const byFile = new Map<string, ProseScore[]>()
  for (const t of all) {
    const s = scoreOne(t)
    const list = byFile.get(s.file)
    if (list) list.push(s); else byFile.set(s.file, [s])
  }
  const pct = (rows: ProseScore[], k: keyof ProseScore) =>
    round1((100 * rows.filter((r) => r[k] === true).length) / rows.length)
  return [...byFile.entries()].map(([file, rows]) => ({
    file,
    theorems: rows.length,
    avgChars: round1(rows.reduce((s, r) => s + r.chars, 0) / rows.length),
    reasonPct: pct(rows, 'reason'),
    demarcatePct: pct(rows, 'demarcates'),
    specificPct: pct(rows, 'specific'),
    creditPct: pct(rows, 'credits'),
    labels: rows.filter((r) => r.score === 0).length,
  })).sort((a, b) => a.reasonPct - b.reasonPct || b.theorems - a.theorems)
}

export interface ProseCensus {
  theorems: number
  reasonPct: number
  demarcatePct: number
  specificPct: number
  creditPct: number
  labels: number
  wings: WingProse[]
}

/** proseCensus() → the whole-ledger reading, plus the per-wing rows. Recomputable by anyone, from the ledger. */
export function proseCensus(): ProseCensus {
  const all = theorems() as readonly Theorem[]
  const rows = all.map(scoreOne)
  const pct = (k: keyof ProseScore) => round1((100 * rows.filter((r) => r[k] === true).length) / rows.length)
  return {
    theorems: rows.length,
    reasonPct: pct('reason'),
    demarcatePct: pct('demarcates'),
    specificPct: pct('specific'),
    creditPct: pct('credits'),
    labels: rows.filter((r) => r.score === 0).length,
    wings: proseByWing(),
  }
}
