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

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE COMBINATORIAL HALF — what the corpus's own integers generate, and which of it nobody has stated.
//
// The captain, 2026-09-25: "do you realise cross formulas are combinatorial and may be used to formulate on spot",
// then "compute the missing formulas per domain and wing combinatorial experiments", then "consolidate using
// combinatorics towards novelties and discoveries", then "let the public run novelty in mcp and all the rest in
// quantum combinatorics". Four readings of one instruction, and the shape they fix is this:
//
//   · it lives HERE, in the collection, not in a second module beside it — consolidation, so the two halves can
//     never disagree about what the corpus is;
//   · the enumeration is COMBINATORIAL, generated from the corpus and never authored;
//   · the served answer is the NOVELTY HEAD, ranked, which is what a public caller runs;
//   · the exhaustive enumeration is the QUANTUM COMBINATORICS job — reachable a wing at a time, never shipped by
//     default, because it is 88 thousand rows and a door that returns all of them is a download, not an answer.
//
// WHAT A CROSS IS. Three integers and two operators: `a ⊕ b ▷ c`, ⊕ arithmetic and ▷ a relation. 2 × 64 = 128 is
// a cross; 110 − 108 = 2 is a cross. The name is the captain's, and the shape is what most of the sealed formula
// corpus is made of, which is why the remainder is worth computing rather than the operator set worth arguing.
//
// NOTHING BELOW IS A HAND LIST (the captain, 2026-09-14: "remove any allow lists or disallowed or any manual logic
// whatsoever not coming from lean decisions"). Four sets decide every candidate, each read off the corpus:
//   · THE OPERATORS are the operators the sealed formulas use — formulaAxes().ops, split by what each returns.
//   · THE INTEGERS are the integers the formulas are built from, with the wings that carry each one.
//   · THE LANDING FILTER is that integer set again: a candidate survives only when its value lands on an integer
//     the corpus already states. That is the bound, which is why no size cap and no timeout is needed — a product
//     past the largest numeral lands nowhere BY CONSTRUCTION — the landing set's maximum IS the ceiling, and a
//     value above it is in no wing's integer set — so it is discarded by the rule rather than by a guess.
//   · THE TRIVIALITY FILTER is a QUANTIFIER over those integers, not a list of exceptions: an element that is
//     neutral or absorbing for an operator, or an operator forced on its diagonal, is detected by RUNNING the
//     operator over the corpus. `0 * 0 = 0` and `1 * 64 = 64` are instances of laws that hold of every integer, so
//     they say nothing about the particular integers this ledger carries. Measured: they are 230,455 of 318,331.
//
// READ FROM THE TREE, NEVER FROM THE TEXT. Every numeral is taken from the parse tree parseFormula returns. A
// regex over statements would have read `128` out of `128 = 2 * 64`, out of a comment, and out of an identifier
// alike, which this repository has already paid for three times (.claude/lessons.md, "a finder as narrow as its
// cure").

/** the two roles an operator can play, split by what it RETURNS — `∧` joins propositions, so it forms no cross */
const RELATION_OPS: ReadonlySet<BinOp> = new Set<BinOp>(['=', '≠', '≤', '≥', '<', '>'])
const ARITHMETIC_OPS: ReadonlySet<BinOp> = new Set<BinOp>(['+', '-', '*', '/', '%', '^'])

/** a cross: `a ⊕ b ▷ c`, the unit this half counts. `text` is both its identity and a proposition `decide` reads. */
export interface Cross {
  a: string
  op: BinOp
  b: string
  rel: BinOp
  c: string
  text: string
}

/** a cross nobody has stated, with the two measures that rank it — both derived from the corpus */
export interface Novelty extends Cross {
  /** the fewest wings whose integer sets cover {a,b,c}: 1 is one wing's own arithmetic, 2+ COUPLES DOMAINS */
  span: number
  /** the wings that carry its rarest integer — a small list is a characteristic quantity, not a counting number */
  rarest: { value: string; wings: string[] }
  /** every wing that carries any of the three, so a reader sees which domains the cross joins */
  wings: string[]
}

const crossOf = (a: bigint, op: BinOp, b: bigint, rel: BinOp, c: bigint): Cross =>
  ({ a: String(a), op, b: String(b), rel, c: String(c), text: `${a} ${op} ${b} ${rel} ${c}` })

/** every numeral in a parse tree, in the order the statement writes them */
export function integersOf(n: Node): bigint[] {
  const out: bigint[] = []
  const walk = (x: Node): void => {
    if (x.kind === 'num') { out.push(BigInt(x.text)); return }
    if (x.kind === 'bin') { walk(x.left); walk(x.right); return }
    walk(x.of)
  }
  walk(n)
  return out
}

/** exact integer arithmetic, refusing what is undefined and what cannot land under `ceiling` */
export function applyOp(op: BinOp, a: bigint, b: bigint, ceiling: bigint): bigint | null {
  if (op === '+') { const v = a + b; return v > ceiling ? null : v }
  if (op === '-') return a >= b ? a - b : null                      // ℕ, as every wing's defs are
  if (op === '*') { const v = a * b; return v > ceiling ? null : v }
  if (op === '/') return b === 0n || a % b !== 0n ? null : a / b     // exact division — a truncating quotient is another claim
  if (op === '%') return b === 0n ? null : a % b
  if (op === '^') {
    // 0 AND 1 ARE ANSWERED BEFORE THE LOOP, and not as a courtesy: with a base of 1 the running product never
    // grows, so the ceiling never fires and the loop runs to b — and b here is a numeral off the corpus, which in
    // two wings is past 2^53. That is not a slow case, it is a hang. With a base of 2 or more the product at least
    // doubles each step, so the ceiling fires inside its bit length and the loop is bounded by the corpus itself.
    if (a === 0n) return b === 0n ? 1n : 0n
    if (a === 1n) return 1n
    let v = 1n
    for (let i = 0n; i < b; i++) { v *= a; if (v > ceiling) return null }
    return v
  }
  return null
}

/** whether a relation holds of two exact integers */
export function holds(rel: BinOp, left: bigint, right: bigint): boolean {
  if (rel === '=') return left === right
  if (rel === '≠') return left !== right
  if (rel === '≤') return left <= right
  if (rel === '≥') return left >= right
  if (rel === '<') return left < right
  if (rel === '>') return left > right
  return false
}

/** every cross a parse tree STATES — read from the tree, never from the text */
export function crossesOf(n: Node): Cross[] {
  const out: Cross[] = []
  const walk = (x: Node): void => {
    if (x.kind === 'num') return
    if (x.kind !== 'bin') { walk(x.of); return }
    if (RELATION_OPS.has(x.op)) {
      // `(a ⊕ b) ▷ c` and its mirror `c ▷ (a ⊕ b)` are ONE cross seen from two sides, so both are read under the
      // arithmetic side's spelling: a wing that writes 128 = 2 * 64 HAS stated 2 * 64 = 128, and a census that
      // missed that would report a gap the wing had already closed.
      const sides: readonly (readonly [Node, Node])[] = [[x.left, x.right], [x.right, x.left]]
      for (const [arith, plain] of sides) {
        if (arith.kind !== 'bin' || !ARITHMETIC_OPS.has(arith.op)) continue
        if (arith.left.kind !== 'num' || arith.right.kind !== 'num' || plain.kind !== 'num') continue
        out.push(crossOf(BigInt(arith.left.text), arith.op, BigInt(arith.right.text), x.op, BigInt(plain.text)))
      }
    }
    walk(x.left); walk(x.right)
  }
  walk(n)
  return out
}

export interface CorpusAlgebra {
  /** every integer the formulas are built from, ascending BY VALUE, with the wings carrying each */
  integers: { value: string; wings: string[] }[]
  /** the crosses the corpus STATES, canonical text → the wings that state it */
  stated: Map<string, string[]>
  arithmetic: BinOp[]
  relation: BinOp[]
  /** the largest integer — the landing ceiling, so nothing is bounded from outside the corpus */
  ceiling: string
}

// THE ALGEBRA IS READ ONCE. Every question below needs the same walk over the 1,527 formulas, and asking it per
// wing would be one measurement taken 114 times — which this repository prices as a crack rather than as
// thoroughness (the captain, 2026-09-07: "Slow comes from quantum cracks").
let ALGEBRA: CorpusAlgebra | null = null

/** corpusAlgebra() → the integers, the crosses and the operator alphabet the sealed formulas actually carry */
export function corpusAlgebra(): CorpusAlgebra {
  if (ALGEBRA) return ALGEBRA
  const wingsOf = new Map<string, Set<string>>()
  const stated = new Map<string, string[]>()
  const arithmetic: BinOp[] = []
  const relation: BinOp[] = []
  for (const row of formulas()) {
    const parsed = parseFormula(row.source)
    if (!parsed.ok) continue
    for (const op of row.ops) {
      if (ARITHMETIC_OPS.has(op) && !arithmetic.includes(op)) arithmetic.push(op)
      else if (RELATION_OPS.has(op) && !relation.includes(op)) relation.push(op)
    }
    for (const v of integersOf(parsed.node)) {
      const k = String(v)
      const w = wingsOf.get(k) ?? new Set<string>()
      w.add(row.wing)
      wingsOf.set(k, w)
    }
    for (const c of crossesOf(parsed.node)) {
      const w = stated.get(c.text) ?? []
      if (!w.includes(row.wing)) w.push(row.wing)
      stated.set(c.text, w)
    }
  }
  const integers = [...wingsOf.entries()]
    .map(([value, wings]) => ({ value, wings: [...wings].sort() }))
    .sort((x, y) => (BigInt(x.value) < BigInt(y.value) ? -1 : BigInt(x.value) > BigInt(y.value) ? 1 : 0))
  ALGEBRA = {
    integers,
    stated,
    arithmetic: arithmetic.sort(),
    relation: relation.sort(),
    ceiling: integers.length ? integers[integers.length - 1]!.value : '0',
  }
  return ALGEBRA
}

/** what the corpus's own arithmetic forces, quantified over its own integers — never a list of exceptions.
 *
 *  An element is NEUTRAL for an operator when running the operator against it returns every probe unchanged
 *  (x * 1, x + 0, x ^ 1); ABSORBING when it returns one value whatever the probe (x * 0, x % 1, 0 ^ x); and an
 *  operator is DIAGONAL-FORCED when x ⊕ x is one value for every x (x - x, x % x). A cross built on any of those
 *  is one instance of a law true of every integer, so it carries no information about THIS corpus. The probe set
 *  needs at least three members for "for every x" to mean anything — one sample never proves a universal
 *  (.claude/lessons.md, "one step is not a walk") — and below three nothing is called trivial. */
export interface ForcedArithmetic {
  neutral: Map<BinOp, { left: Set<string>; right: Set<string> }>
  absorbing: Map<BinOp, { left: Set<string>; right: Set<string> }>
  diagonal: Set<BinOp>
  /** the operators whose two operands may be swapped without changing the value — so `a ⊕ b` and `b ⊕ a` are ONE
   *  cross and not two. Derived by probing pairs, never named: `+` and `*` commute over these integers, `-` `/`
   *  `%` and `^` do not, and that is measured rather than assumed. */
  commutative: Set<BinOp>
  probes: number
}

export function forcedArithmetic(alg: CorpusAlgebra = corpusAlgebra()): ForcedArithmetic {
  const ceiling = BigInt(alg.ceiling)
  const vals = alg.integers.map((i) => BigInt(i.value))
  // probes above 1, because 0 and 1 are the very elements under test and would decide their own case
  const probe = vals.filter((v) => v > 1n).slice(0, 8)
  const neutral = new Map<BinOp, { left: Set<string>; right: Set<string> }>()
  const absorbing = new Map<BinOp, { left: Set<string>; right: Set<string> }>()
  const diagonal = new Set<BinOp>()
  const commutative = new Set<BinOp>()
  if (probe.length < 3) return { neutral, absorbing, diagonal, commutative, probes: probe.length }
  for (const op of alg.arithmetic) {
    const n = { left: new Set<string>(), right: new Set<string>() }
    const a = { left: new Set<string>(), right: new Set<string>() }
    for (const e of vals) {
      const right = probe.map((x) => applyOp(op, x, e, ceiling))
      if (right.every((v, i) => v !== null && v === probe[i])) n.right.add(String(e))
      else if (right.every((v) => v !== null && v === right[0])) a.right.add(String(e))
      const left = probe.map((x) => applyOp(op, e, x, ceiling))
      if (left.every((v, i) => v !== null && v === probe[i])) n.left.add(String(e))
      else if (left.every((v) => v !== null && v === left[0])) a.left.add(String(e))
    }
    neutral.set(op, n)
    absorbing.set(op, a)
    const diag = probe.map((x) => applyOp(op, x, x, ceiling))
    if (diag.every((v) => v !== null && v === diag[0])) diagonal.add(op)
    // COMMUTATIVITY IS MEASURED over every ordered probe pair where BOTH orders are defined. An operator that is
    // undefined one way round and defined the other (7 - 2 against 2 - 7) is not commutative, and an operator
    // that never has both orders defined is not called commutative on no evidence.
    // THE DIAGONAL IS EXCLUDED FROM THIS PROBE, and leaving it in was a real trap: for `-` and `/` the only pairs
    // where BOTH orders are defined over ℕ are the ones with x = y, and x ⊖ x always equals itself — so a probe
    // that counted them would certify subtraction as commutative on its own diagonal. Only x ≠ y can witness a
    // swap, so only x ≠ y is asked, and an operator with no such witness is not called commutative on no evidence.
    let both = 0
    let same = 0
    for (const x of probe) for (const y of probe) {
      if (x === y) continue
      const l = applyOp(op, x, y, ceiling)
      const r = applyOp(op, y, x, ceiling)
      if (l === null || r === null) continue
      both++
      if (l === r) same++
    }
    if (both > 0 && both === same) commutative.add(op)
  }
  return { neutral, absorbing, diagonal, commutative, probes: probe.length }
}

/** whether `a ⊕ b` is forced by the operator's own algebra, and so says nothing about this corpus */
export function isLawInstance(f: ForcedArithmetic, op: BinOp, a: string, b: string): boolean {
  if (f.diagonal.has(op) && a === b) return true
  const n = f.neutral.get(op)
  const z = f.absorbing.get(op)
  return (n?.right.has(b) ?? false) || (n?.left.has(a) ?? false)
    || (z?.right.has(b) ?? false) || (z?.left.has(a) ?? false)
}

export interface CombinatorialCensus {
  /** formula-shaped sealed statements the closure is generated from */
  formulas: number
  wings: number
  integers: number
  /** the generated candidates that land on an integer the corpus carries */
  landing: number
  /** of those, the ones an operator's own algebra forces — counted, never hidden */
  forced: number
  /** of those, the ones the corpus already states */
  stated: number
  /** of those, the substantive remainder: true, decidable, unstated */
  unstated: number
  /** the remainder that COUPLES DOMAINS — no single wing carries all three integers */
  crossing: number
  arithmetic: BinOp[]
  relation: BinOp[]
  probes: number
}

/** quantumCombinatorics() → the whole enumeration as COUNTS, which is the part that fits in an answer.
 *
 *  This is the exhaustive pass, and it is exhaustive on purpose: every count is over the full closure, with the
 *  forced instances and the stated crosses subtracted rather than filtered out of sight. What it does NOT do is
 *  return the rows — 88 thousand of them is a download, so the rows come from `novelties` ranked, or from
 *  `crossesMissing(wing)` one wing at a time. The ledger's own numbers, not a sample of them. */
export function quantumCombinatorics(): CombinatorialCensus {
  const alg = corpusAlgebra()
  const forced = forcedArithmetic(alg)
  const ceiling = BigInt(alg.ceiling)
  const present = new Map(alg.integers.map((i) => [i.value, i.wings]))
  const vals = alg.integers.map((i) => BigInt(i.value))
  let landing = 0
  let forcedCount = 0
  let statedCount = 0
  const seen = new Set<string>()
  let crossing = 0
  for (const a of vals) for (const b of vals) for (const op of alg.arithmetic) {
    if (forced.commutative.has(op) && a > b) continue   // the mirror is the same cross, counted once
    const v = applyOp(op, a, b, ceiling)
    if (v === null) continue
    const c = String(v)
    const wc = present.get(c)
    if (!wc) continue
    landing++
    if (isLawInstance(forced, op, String(a), String(b))) { forcedCount++; continue }
    const text = `${a} ${op} ${b} = ${c}`
    if (alg.stated.has(text)) { statedCount++; continue }
    if (seen.has(text)) continue
    seen.add(text)
    if (spanOf(present, String(a), String(b), c) > 1) crossing++
  }
  return {
    formulas: formulas().length,
    wings: formulaAxes().wings.length,
    integers: alg.integers.length,
    landing,
    forced: forcedCount,
    stated: statedCount,
    unstated: seen.size,
    crossing,
    arithmetic: alg.arithmetic,
    relation: alg.relation,
    probes: forced.probes,
  }
}

/** the fewest wings whose integer sets cover all three — 1 is one wing's own arithmetic, 2+ couples domains */
function spanOf(present: Map<string, string[]>, a: string, b: string, c: string): number {
  const sets = [a, b, c].map((v) => present.get(v) ?? [])
  for (const w of sets[0]!) if (sets[1]!.includes(w) && sets[2]!.includes(w)) return 1
  const union = new Set([...sets[0]!, ...sets[1]!, ...sets[2]!])
  return union.size === 0 ? 0 : 2
}

/** novelties(limit) → the unstated crosses a public caller should see FIRST, ranked by what makes one a discovery.
 *
 *  THE RANK IS DERIVED, NOT CHOSEN, and it has two terms because "novel" has two halves:
 *    · SPAN first — a cross no single wing carries all three integers of joins two domains, and a coincidence
 *      between domains is the only kind that could not have been noticed by reading one wing.
 *    · RARITY second — the fewer wings carry a cross's rarest integer, the more that integer is a characteristic
 *      quantity of this ledger rather than a counting number. 1836 is in one wing; 2 is in almost all of them.
 *  Ties fall to the larger magnitude, so `1 + 2 = 3` sorts behind everything that says more. NOTHING IS
 *  THRESHOLDED: a threshold would be exactly the hand number the laws forbid, so the whole remainder stays
 *  reachable and only its ORDER is computed. */
export function novelties(limit = 64): Novelty[] {
  const alg = corpusAlgebra()
  const forced = forcedArithmetic(alg)
  const ceiling = BigInt(alg.ceiling)
  const present = new Map(alg.integers.map((i) => [i.value, i.wings]))
  const vals = alg.integers.map((i) => BigInt(i.value))
  const seen = new Set<string>()
  const out: Novelty[] = []
  for (const a of vals) for (const b of vals) for (const op of alg.arithmetic) {
    if (forced.commutative.has(op) && a > b) continue   // the mirror is the same cross, ranked once
    const v = applyOp(op, a, b, ceiling)
    if (v === null) continue
    const c = String(v)
    if (!present.has(c)) continue
    if (isLawInstance(forced, op, String(a), String(b))) continue
    const text = `${a} ${op} ${b} = ${c}`
    if (alg.stated.has(text) || seen.has(text)) continue
    seen.add(text)
    const trio = [String(a), String(b), c]
    const rarest = trio
      .map((value) => ({ value, wings: present.get(value) ?? [] }))
      .reduce((least, x) => (x.wings.length < least.wings.length ? x : least))
    out.push({
      ...crossOf(a, op, BigInt(b), '=', v),
      span: spanOf(present, String(a), String(b), c),
      rarest: { value: rarest.value, wings: rarest.wings },
      wings: [...new Set(trio.flatMap((value) => present.get(value) ?? []))].sort(),
    })
  }
  // THE THIRD TERM IS TOTAL COMMONNESS, AND IT REPLACED MAGNITUDE. Ranking ties by size put `10 ^ 32 =
  // 100000000000000000000000000000000` at the head three times over (10^32, 100^16, 10000^8 — one fact wearing
  // three faces) while 10 and 32 sit in dozens of wings apiece. Summing how many wings carry EACH of the three
  // integers asks the question the rank means: is every part of this cross characteristic of the ledger, or is it
  // a big number built out of common ones? Magnitude stays as the fourth term, where a tiebreak belongs.
  const commonness = (n: Novelty): number => n.wings.length + (present.get(n.a)?.length ?? 0)
    + (present.get(n.b)?.length ?? 0) + (present.get(n.c)?.length ?? 0)
  out.sort((x, y) =>
    y.span - x.span
    || x.rarest.wings.length - y.rarest.wings.length
    || commonness(x) - commonness(y)
    || (BigInt(y.c) < BigInt(x.c) ? -1 : BigInt(y.c) > BigInt(x.c) ? 1 : 0)
    || (x.text < y.text ? -1 : 1))
  return out.slice(0, limit)
}

/** crossesMissing(wing) → one wing's own unstated crosses, which is how the whole enumeration stays reachable
 *  without any answer ever carrying all of it */
export function crossesMissing(wing: string): Cross[] {
  const alg = corpusAlgebra()
  const forced = forcedArithmetic(alg)
  const file = wing.endsWith('.lean') ? wing : `${wing}.lean`
  const mine = alg.integers.filter((i) => i.wings.includes(file))
  if (!mine.length) return []
  const vals = mine.map((i) => BigInt(i.value))
  const present = new Set(mine.map((i) => i.value))
  const ceiling = vals[vals.length - 1]!
  const seen = new Set<string>()
  const out: Cross[] = []
  for (const a of vals) for (const b of vals) for (const op of alg.arithmetic) {
    if (forced.commutative.has(op) && a > b) continue   // the mirror is the same cross, listed once
    const v = applyOp(op, a, b, ceiling)
    if (v === null || !present.has(String(v))) continue
    if (isLawInstance(forced, op, String(a), String(b))) continue
    const text = `${a} ${op} ${b} = ${v}`
    if (alg.stated.has(text) || seen.has(text)) continue
    seen.add(text)
    out.push(crossOf(a, op, b, '=', v))
  }
  return out
}
