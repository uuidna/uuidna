import { classify, formulaSource, formulaTex, parseFormula, type BinOp, type Node } from './formula.js'
import { theorems } from './theorems/index.js'

/**
 * THE FORMULAS, AS A COLLECTION — the same shape of question the ledger answers about theorems, asked about
 * the ones that are mathematics rather than computation.
 *
 * formula.ts TYPESETS one statement; it has no opinion about the corpus. theorems() serves the corpus but says
 * nothing about notation. So the question a reader actually has — "show me the sealed formulas about primes,
 * with a modulus in them" — had no door: it needed a walk over 71k statements and a parser call per row, which
 * is exactly the kind of thing that gets written once per caller and drifts. This is that walk, once.
 *
 * THE SPLIT IS THE LEDGER'S OWN, not a new judgement. `classify` already divides a sealed statement into
 * `formula` (numerals, arithmetic, relations, conjunction — a thing with standard notation) and `program`
 * (`fun`, `List.range`, `foldl` — a computation with no formula form). Typesetting a fold as an equation would
 * dress a computation up as mathematics, so a program is counted, never approximated.
 *
 * WHAT A GAP IS HERE, and it is the sharper half. A `program` is not a gap: a fold has no formula and never
 * will. A GAP is a statement that IS formula-shaped and still would not parse — the parser refusing something
 * it should have read. Those are typesetting defects and `formulaGaps` names each with the token it stopped
 * on, so the number is a work list rather than a score.
 *
 * `byWing` is the per-domain census: which wings are mathematics, which are computation, and which carry
 * refusals. A wing at 0% formula is not failing — Sequence walks lists and has no equations — so the column a
 * reader should act on is `refused`, never `share`.
 */

export interface FormulaRow {
  key: string
  /** the Lean wing it is sealed in */
  wing: string
  principle: string
  skill: string
  /** the sealed statement, with semantics-free ascriptions removed — what the parser reads */
  source: string
  /** standard mathematical notation */
  tex: string
  /** the operators this formula actually uses, deduplicated — a filter axis, not a guess */
  ops: readonly BinOp[]
}

export interface FormulaGap {
  key: string
  wing: string
  source: string
  /** the token the parser stopped on — a work list, not a score */
  why: string
}

export interface WingFormulaCensus {
  wing: string
  total: number
  formula: number
  program: number
  /** formula-shaped and still refused — the only column that is a defect */
  refused: number
}

export interface FormulaFilter {
  wing?: string
  skill?: string
  principle?: string
  /** keep only formulas that use this operator */
  op?: BinOp
  /** substring of the key, case-insensitive */
  key?: string
}

/** Every operator the parsed formula uses, in first-seen order. */
export function opsOf(node: Node): BinOp[] {
  const seen: BinOp[] = []
  const walk = (n: Node): void => {
    if (n.kind === 'bin') {
      if (!seen.includes(n.op)) seen.push(n.op)
      walk(n.left)
      walk(n.right)
    } else if (n.kind === 'neg' || n.kind === 'not') walk(n.of)
  }
  walk(node)
  return seen
}

const matches = (row: { wing: string; skill: string; principle: string; key: string; ops?: readonly BinOp[] }, f: FormulaFilter): boolean =>
  (f.wing === undefined || row.wing === f.wing)
  && (f.skill === undefined || row.skill === f.skill)
  && (f.principle === undefined || row.principle === f.principle)
  && (f.key === undefined || row.key.toLowerCase().includes(f.key.toLowerCase()))
  && (f.op === undefined || (row.ops ?? []).includes(f.op))

/** Every sealed statement that is a formula, typeset, filterable. An omitted field filters nothing. */
export function formulas(filter: FormulaFilter = {}): FormulaRow[] {
  const out: FormulaRow[] = []
  for (const t of theorems()) {
    if (classify(t.statement) === 'program') continue
    const source = formulaSource(t.statement)
    const parsed = parseFormula(source)
    if (!parsed.ok) continue
    const row: FormulaRow = {
      key: t.key,
      wing: t.file,
      principle: t.principle,
      skill: t.skill,
      source,
      tex: formulaTex(parsed.node),
      ops: opsOf(parsed.node),
    }
    if (matches(row, filter)) out.push(row)
  }
  return out
}

/**
 * Formula-shaped statements the parser would not read.
 *
 * NOT the programs — a fold has no formula form and counting it as missing would make the number a complaint
 * about mathematics rather than about this parser. A gap is a statement that passed `classify` as a formula and
 * still failed to parse, which can only be the parser's grammar falling short of what is sealed.
 */
export function formulaGaps(filter: FormulaFilter = {}): FormulaGap[] {
  const out: FormulaGap[] = []
  for (const t of theorems()) {
    if (classify(t.statement) === 'program') continue
    const source = formulaSource(t.statement)
    const parsed = parseFormula(source)
    if (parsed.ok) continue
    const row = { key: t.key, wing: t.file, principle: t.principle, skill: t.skill, source, why: parsed.why }
    if (matches(row, filter)) out.push({ key: row.key, wing: row.wing, source: row.source, why: row.why })
  }
  return out
}

/** Per-wing census: mathematics, computation, and the refusals that are actually defects. */
export function byWing(): WingFormulaCensus[] {
  const wings = new Map<string, WingFormulaCensus>()
  for (const t of theorems()) {
    const w = wings.get(t.file) ?? { wing: t.file, total: 0, formula: 0, program: 0, refused: 0 }
    w.total++
    if (classify(t.statement) === 'program') w.program++
    else if (parseFormula(formulaSource(t.statement)).ok) w.formula++
    else { w.formula++; w.refused++ }
    wings.set(t.file, w)
  }
  return [...wings.values()].sort((a, b) => b.refused - a.refused || b.formula - a.formula || (a.wing < b.wing ? -1 : 1))
}

/** The axes a reader may filter on, computed from the corpus so the door never offers a value it cannot serve. */
export function formulaAxes(): { wings: string[]; skills: string[]; principles: string[]; ops: BinOp[] } {
  const rows = formulas()
  const uniq = (xs: string[]): string[] => [...new Set(xs)].sort()
  return {
    wings: uniq(rows.map((r) => r.wing)),
    skills: uniq(rows.map((r) => r.skill)),
    principles: uniq(rows.map((r) => r.principle)),
    ops: [...new Set(rows.flatMap((r) => r.ops))].sort() as BinOp[],
  }
}
