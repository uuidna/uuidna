// formula — SEALED STATEMENTS IN STANDARD MATHEMATICAL NOTATION, for reading on screen and for printing a paper.
//
// A statement is sealed as Lean source: `(1 * 7) % 9 = 7`. That is exact and unreadable as mathematics — a
// reader wants 1·7 ≡ 7, a fraction set as a fraction, an exponent set as an exponent. This module derives that
// typesetting; it never authors it, so a statement sealed tomorrow typesets the same day.
//
// THE HONEST SPLIT. Roughly half the sealed statements ARE formulas — numerals, arithmetic, relations and
// conjunction — and `formulaCensus` reports the exact share, because a count written here would be wrong on the
// next landing. The rest are Lean PROGRAMS (`fun`, `List.range`, `foldl`, `let`), and a fold over a list has no
// standard formula form. Typesetting one as mathematics would dress a computation up as an equation, so
// `classify` calls it `program` and the page sets it as code. A statement is either typeset exactly or left
// alone and named; nothing is approximated in between.
//
// WHY A PARSER AND NOT A SUBSTITUTION TABLE: `a / b` must become a built-up fraction and `a ^ b` a superscript,
// which needs the operand boundaries — and the output must carry parentheses only where precedence demands them,
// because redundant brackets are exactly what makes machine-set mathematics look machine-set. Both renderers
// walk one tree: MathML for the browser and the printed page (native in every current engine, no library, no
// webfont), TeX for the author who is pasting the line into a manuscript.

export type Node =
  | { kind: 'num'; text: string }
  | { kind: 'bin'; op: BinOp; left: Node; right: Node }
  | { kind: 'neg'; of: Node }
  | { kind: 'not'; of: Node }

export type BinOp = '∧' | '=' | '≠' | '≤' | '≥' | '<' | '>' | '+' | '-' | '*' | '/' | '%' | '^'

/** the closed operator set the sealed formula-shaped statements actually use — a census, not a guess. */
export const FORMULA_CHARS = /^[0-9\s()+\-*\/%^=<>!¬∧≠≤≥]+$/

export type Classification = 'formula' | 'program'

/**
 * A LEAN TYPE ASCRIPTION IS NOT PART OF THE ARITHMETIC.
 *
 * `(2:Nat)^3 = 8` is `2^3 = 8` with the elaborator told which 2 to use. The
 * type is how Lean is asked; it is not what is asserted, and it has no reading
 * in a typeset formula — nobody writes the ℕ inline when they write 2³ = 8.
 *
 * Ninety-four sealed statements were classified as PROGRAMS for this reason
 * alone, and every one of them typesets cleanly once the ascription is taken
 * off: blood_types_eight, codons_sixty_four, seats_pigeonhole — three of the
 * most-cited theorems in the ledger — had no LaTeX and no MathML because of a
 * `:Nat`. A formula layer that cannot read `(2:Nat)^3 = 8` is not a formula
 * layer, it is one that happens to work on statements written without types.
 *
 * ONLY `Nat`, AND THAT LIMIT WAS PAID FOR. The first version stripped every
 * ascription, which admitted thirty-two statements carrying `: Int` — and three
 * of them then parsed FALSE against a kernel that sealed them TRUE. `: Int` is
 * not decoration the way `: Nat` is: Nat is the default a bare numeral already
 * has, so removing it changes nothing, while `: Int` is there precisely BECAUSE
 * the arithmetic would be different without it — `(3 - 7 : Int)` is −4 where
 * ℕ subtraction truncates to 0. An ascription that changes the meaning is part
 * of the statement, and a reader that drops it is reading a different one.
 *
 * So sixty-two statements gain a reading and thirty-two keep none, which is the
 * honest split rather than the larger number.
 *
 * REMOVED, NOT RELOCATED. The evaluator's `stripAscriptions` turns `(x : Int)`
 * into `Int(x)` on purpose — it deletes `Int` as a named operator in a second
 * pass — and reusing it here left `Int(` behind and classified the statement a
 * program again. Two readers, two jobs.
 */
const withoutAscriptions = (statement: string): string =>
  statement.replace(/\s*:\s*Nat\b/g, '')

/** classify(statement) → whether the statement is a formula that typesets exactly, or a program that must not. */
export function classify(statement: string): Classification {
  const bare = withoutAscriptions(statement)
  return FORMULA_CHARS.test(bare) && /[0-9]/.test(bare) ? 'formula' : 'program'
}

/**
 * The statement as a formula reader should see it — ascriptions gone.
 *
 * Exported because `typeset` and the census must read the SAME string
 * `classify` judged: a classifier that admits a statement its typesetter then
 * refuses is two opinions about one input, which is the shape this tree keeps
 * finding in itself.
 */
export const formulaSource = (statement: string): string => withoutAscriptions(statement)

/**
 * Every numeral a statement is ABOUT, whatever its SHAPE: unique, ascending by value, 0 and 1 excluded.
 *
 * `parseFormula` refuses a program, and rightly — `((List.range 16).filter …).length = 4` is not a formula and
 * pretending otherwise would put a fiction in the ledger. But refusing the shape does not make 16 and 4 stop being the
 * quantities that statement counts, and for 97.9% of this corpus the shape is a program. This reader is the only route
 * to their arithmetic.
 *
 * 0 AND 1 ARE STRUCTURE. `x * 1 = x` says nothing about x, and an integer shared with another wing is evidence of a
 * junction only if it is not shared with nearly every wing. The same exclusion is made from the other side in
 * padding-conjunct, for the same reason.
 */
export function characteristicNumerals(statement: string): string[] {
  const seen = new Set<string>()
  for (const d of withoutAscriptions(statement).match(/\b\d+\b/g) ?? []) {
    if (Number(d) >= 2) seen.add(String(BigInt(d)))
  }
  return [...seen].sort((a, b) => (BigInt(a) < BigInt(b) ? -1 : BigInt(a) > BigInt(b) ? 1 : 0))
}

// ---- tokens ----
type Tok = { t: 'num' | 'op' | '(' | ')'; v: string }

export function tokenise(src: string): { ok: true; toks: Tok[] } | { ok: false; at: number; found: string } {
  const toks: Tok[] = []
  let i = 0
  while (i < src.length) {
    const c = src[i]!
    if (c === ' ' || c === '\n' || c === '\t') { i++; continue }
    if (c >= '0' && c <= '9') {
      let j = i
      while (j < src.length && src[j]! >= '0' && src[j]! <= '9') j++
      toks.push({ t: 'num', v: src.slice(i, j) })
      i = j
      continue
    }
    if (c === '(' || c === ')') { toks.push({ t: c, v: c }); i++; continue }
    const two = src.slice(i, i + 2)
    if (two === '<=' || two === '>=' || two === '!=') {
      toks.push({ t: 'op', v: two === '<=' ? '≤' : two === '>=' ? '≥' : '≠' })
      i += 2
      continue
    }
    if ('+-*/%^=<>∧≠≤≥¬'.includes(c)) { toks.push({ t: 'op', v: c }); i++; continue }
    return { ok: false, at: i, found: c }
  }
  return { ok: true, toks }
}

// ---- parse ----
// precedence, low to high. Relations do not CHAIN — `a = b = c` is not a sealed shape, and folding it
// left-associatively would compare a truth value with a number — so that level takes at most one operator and a
// second one falls out as trailing. The arithmetic levels chain left-associatively, as they do in Lean.
// `%` BINDS WITH `*` AND `/`, as it does in Lean (all three infixl 70, above `+` at 65). It sat on its own level BELOW
// `+`, so `27 % 9 + 1` was read `27 % (9 + 1)` = 7 where the kernel reads `(27 % 9) + 1` = 1, and a sealed-TRUE
// Glagolitic statement parsed FALSE (2026-09-14).
const LEVELS: BinOp[][] = [['∧'], ['=', '≠', '≤', '≥', '<', '>'], ['+', '-'], ['*', '/', '%']]
const CHAINS: readonly boolean[] = [true, false, true, true]

export type Parsed = { ok: true; node: Node } | { ok: false; why: string }

export function parseFormula(src: string): Parsed {
  const lex = tokenise(src)
  if (!lex.ok) return { ok: false, why: `unmapped character ${JSON.stringify(lex.found)} at ${lex.at}` }
  const toks = lex.toks
  let p = 0
  const peek = (): Tok | undefined => toks[p]

  const parseAt = (level: number): Parsed => {
    if (level >= LEVELS.length) return parsePow()
    let left = parseAt(level + 1)
    if (!left.ok) return left
    for (;;) {
      const t = peek()
      if (!t || t.t !== 'op' || !LEVELS[level]!.includes(t.v as BinOp)) return left
      p++
      const right = parseAt(level + 1)
      if (!right.ok) return right
      left = { ok: true, node: { kind: 'bin', op: t.v as BinOp, left: left.node, right: right.node } }
      if (!CHAINS[level]) return left
    }
  }

  // '^' is right-associative, as it is in both Lean and print.
  const parsePow = (): Parsed => {
    const base = parseUnary()
    if (!base.ok) return base
    const t = peek()
    if (t && t.t === 'op' && t.v === '^') {
      p++
      const exp = parsePow()
      if (!exp.ok) return exp
      return { ok: true, node: { kind: 'bin', op: '^', left: base.node, right: exp.node } }
    }
    return base
  }

  const parseUnary = (): Parsed => {
    const t = peek()
    if (t && t.t === 'op' && (t.v === '-' || t.v === '¬')) {
      p++
      const of = parseUnary()
      if (!of.ok) return of
      return { ok: true, node: t.v === '-' ? { kind: 'neg', of: of.node } : { kind: 'not', of: of.node } }
    }
    return parseAtom()
  }

  const parseAtom = (): Parsed => {
    const t = peek()
    if (!t) return { ok: false, why: 'statement ends where a number was due' }
    if (t.t === 'num') { p++; return { ok: true, node: { kind: 'num', text: t.v } } }
    if (t.t === '(') {
      p++
      const inner = parseAt(0)
      if (!inner.ok) return inner
      const close = peek()
      if (!close || close.t !== ')') return { ok: false, why: 'unclosed (' }
      p++
      return inner
    }
    return { ok: false, why: `${JSON.stringify(t.v)} where a number was due` }
  }

  const out = parseAt(0)
  if (!out.ok) return out
  if (p !== toks.length) return { ok: false, why: `trailing ${JSON.stringify(toks[p]!.v)}` }
  return out
}

// ---- is a division EXACT? ----
//
// LEAN'S `/` ON Nat TRUNCATES, AND `\frac` CLAIMS IT DOES NOT. This layer rendered `85179 / 36 = 2366` as
// \frac{85179}{36} = 2366 — true in Lean, where the division floors, and FALSE in print, where 85179/36 is
// 2366.08. Found by typesetting a theorem I had just sealed: the seal was honest and its rendering was not, which
// is the worse direction because the reader trusts the set mathematics over the source beside it.
//
// So exactness is DECIDED, not assumed: both operands of a `/` are closed numeral arithmetic in every sealed
// statement, so evaluating them settles whether the quotient is exact. Exact divisions keep the built-up
// fraction; truncating ones are set inside floor brackets, which is what Nat division actually means.
function evalNode(n: Node): bigint | null {
  if (n.kind === 'num') return BigInt(n.text)
  if (n.kind === 'neg') { const v = evalNode(n.of); return v === null ? null : -v }
  if (n.kind === 'not') return null
  const a = evalNode(n.left)
  const b = evalNode(n.right)
  if (a === null || b === null) return null
  switch (n.op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return b === 0n ? null : a / b
    case '%': return b === 0n ? null : a % b
    case '^': return b < 0n ? null : a ** b
    default: return null // a relation or a conjunction is not a value
  }
}

/** exactDivision(node) → whether `a / b` divides without remainder. Unknown operands are treated as INEXACT, so
 *  an unevaluable division is floored rather than presented as an exact fraction: the safe direction. */
function exactDivision(left: Node, right: Node): boolean {
  const a = evalNode(left)
  const b = evalNode(right)
  return a !== null && b !== null && b !== 0n && a % b === 0n
}

// ---- precedence, for bracketing only where print demands it ----
const PREC: Record<BinOp, number> = { '∧': 1, '=': 2, '≠': 2, '≤': 2, '≥': 2, '<': 2, '>': 2, '+': 4, '-': 4, '*': 5, '/': 5, '%': 5, '^': 6 }

function precOf(n: Node): number {
  return n.kind === 'bin' ? PREC[n.op] : n.kind === 'num' ? 9 : 5
}

/** whether a child needs brackets under its parent: lower precedence, or equal on the right of a left-associative
 *  operator (so `a - (b - c)` keeps its brackets and `(a - b) - c` drops them). */
function needsBrackets(child: Node, parentOp: BinOp, side: 'left' | 'right'): boolean {
  const pc = precOf(child)
  const pp = PREC[parentOp]
  if (pc < pp) return true
  if (pc > pp) return false
  if (parentOp === '^') return side === 'left' // right-associative
  return side === 'right' && (parentOp === '-' || parentOp === '/' || parentOp === '%')
}

/** `a mod n` reads unambiguously in print only when a compound `a` is bracketed, whatever precedence permits. */
function modNeedsBrackets(child: Node): boolean {
  return child.kind === 'bin' || child.kind === 'neg'
}

// ---- TeX ----
const TEX: Record<BinOp, string> = {
  '∧': '\\land', '=': '=', '≠': '\\ne', '≤': '\\le', '≥': '\\ge', '<': '<', '>': '>',
  '+': '+', '-': '-', '*': '\\cdot', '/': '', '%': '\\bmod', '^': '',
}

/** formulaTex(node) → the line an author pastes into a manuscript. */
export function formulaTex(n: Node): string {
  if (n.kind === 'num') return n.text
  if (n.kind === 'neg') return '-' + formulaTex(n.of)
  if (n.kind === 'not') return '\\lnot ' + formulaTex(n.of)
  if (n.op === '/') {
    const frac = `\\frac{${formulaTex(n.left)}}{${formulaTex(n.right)}}`
    return exactDivision(n.left, n.right) ? frac : `\\left\\lfloor ${frac} \\right\\rfloor`
  }
  if (n.op === '%') {
    const a = modNeedsBrackets(n.left) ? `\\left(${formulaTex(n.left)}\\right)` : formulaTex(n.left)
    return `${a} \\bmod ${formulaTex(n.right)}`
  }
  if (n.op === '∧') return `${formulaTex(n.left)} \\quad\\land\\quad ${formulaTex(n.right)}`
  if (n.op === '^') {
    const base = needsBrackets(n.left, '^', 'left') ? `\\left(${formulaTex(n.left)}\\right)` : formulaTex(n.left)
    return `${base}^{${formulaTex(n.right)}}`
  }
  const wrap = (c: Node, side: 'left' | 'right'): string =>
    needsBrackets(c, n.op, side) ? `\\left(${formulaTex(c)}\\right)` : formulaTex(c)
  return `${wrap(n.left, 'left')} ${TEX[n.op]} ${wrap(n.right, 'right')}`
}

/**
 * THE WAY BACK, so the Lean and the LaTeX prove each other instead of one
 * projecting onto the other.
 *
 * `formulaTex` renders a parsed statement as mathematics and nothing returns.
 * A projection cannot be wrong in any way its reader can see: drop a ¬, turn
 * a ≤ into a <, lose a bracket around a modulus, and the page still typesets
 * beautifully and says something else. The document check in latex.ts is
 * explicit that it tests STRUCTURE and not meaning, so nothing in this tree
 * compared the two readings of a theorem.
 *
 * This renders the SAME node back to Lean. The pair then decides the question
 * for each other: if the parse lost or invented anything, the returned Lean
 * decides differently from the statement the kernel sealed — and the TeX,
 * rendered from that same node, is condemned with it. One node, two
 * renderings, and a third party that can tell them apart.
 *
 * Fully bracketed on purpose. The point is not to reproduce the original
 * spelling — precedence would make that a second parser to get wrong — but to
 * produce a form whose MEANING is unambiguous, which is exactly what an
 * evaluator needs and what a rendering must preserve.
 */
const LEAN: Record<BinOp, string> = {
  '∧': '∧', '=': '=', '≠': '≠', '≤': '≤', '≥': '≥', '<': '<', '>': '>',
  '+': '+', '-': '-', '*': '*', '/': '/', '%': '%', '^': '^',
}

export function formulaLean(n: Node): string {
  if (n.kind === 'num') return n.text
  if (n.kind === 'neg') return `(-${formulaLean(n.of)})`
  if (n.kind === 'not') return `¬(${formulaLean(n.of)})`
  return `(${formulaLean(n.left)} ${LEAN[n.op]} ${formulaLean(n.right)})`
}

/**
 * Does a statement survive the round trip with its meaning intact?
 *
 * Lean in, node out, Lean back. `agrees` is whether the returned form parses
 * to the SAME node — structural identity, not string identity, since the
 * return is fully bracketed and the original need not be.
 */
export function roundTrip(statement: string): {
  agrees: boolean
  back: null | string
  tex: null | string
  why?: string
} {
  const first = parseFormula(statement)
  if (!first.ok) return { agrees: false, back: null, tex: null, why: first.why }

  const back = formulaLean(first.node)
  const second = parseFormula(back)
  if (!second.ok) return { agrees: false, back, tex: formulaTex(first.node), why: second.why }

  return {
    agrees: JSON.stringify(first.node) === JSON.stringify(second.node),
    back,
    tex: formulaTex(first.node),
  }
}

// ---- MathML ----
const ML: Record<BinOp, string> = {
  '∧': '∧', '=': '=', '≠': '≠', '≤': '≤', '≥': '≥', '<': '&lt;', '>': '&gt;',
  '+': '+', '-': '−', '*': '⋅', '/': '', '%': 'mod', '^': '',
}

function ml(n: Node): string {
  if (n.kind === 'num') return `<mn>${n.text}</mn>`
  if (n.kind === 'neg') return `<mrow><mo form="prefix">−</mo>${ml(n.of)}</mrow>`
  if (n.kind === 'not') return `<mrow><mo form="prefix">¬</mo>${ml(n.of)}</mrow>`
  if (n.op === '/') {
    const frac = `<mfrac><mrow>${ml(n.left)}</mrow><mrow>${ml(n.right)}</mrow></mfrac>`
    return exactDivision(n.left, n.right)
      ? frac
      : `<mrow><mo stretchy="true">&#x230A;</mo>${frac}<mo stretchy="true">&#x230B;</mo></mrow>`
  }
  if (n.op === '%') {
    const a = modNeedsBrackets(n.left) ? bracket(n.left) : ml(n.left)
    return `<mrow>${a}<mo lspace="0.28em" rspace="0.28em">mod</mo>${ml(n.right)}</mrow>`
  }
  if (n.op === '∧') return `<mrow>${ml(n.left)}<mspace width="1em"/><mo>∧</mo><mspace width="1em"/>${ml(n.right)}</mrow>`
  if (n.op === '^') {
    const base = needsBrackets(n.left, '^', 'left') ? bracket(n.left) : ml(n.left)
    return `<msup><mrow>${base}</mrow><mrow>${ml(n.right)}</mrow></msup>`
  }
  const side = (c: Node, s: 'left' | 'right'): string => (needsBrackets(c, n.op, s) ? bracket(c) : ml(c))
  return `<mrow>${side(n.left, 'left')}<mo>${ML[n.op]}</mo>${side(n.right, 'right')}</mrow>`
}

function bracket(n: Node): string {
  return `<mrow><mo stretchy="true">(</mo>${ml(n)}<mo stretchy="true">)</mo></mrow>`
}

/** formulaMathml(node, display) → standard MathML. Native in every current engine: no library, no webfont, and
 *  it is what a print stylesheet can set as real mathematics rather than as a picture of it. */
export function formulaMathml(n: Node, display: 'block' | 'inline' = 'block'): string {
  return `<math xmlns="http://www.w3.org/1998/Math/MathML" display="${display}">${ml(n)}</math>`
}

/** congruenceOf(node) → the (x, r, n) of a statement whose shape IS a congruence, else null. `x % n = r` and
 *  `r = x % n` both qualify; anything else is left as written. */
export function congruenceOf(n: Node): { x: Node; r: Node; n: Node } | null {
  if (n.kind !== 'bin' || n.op !== '=') return null
  const { left, right } = n
  if (left.kind === 'bin' && left.op === '%') return { x: left.left, r: right, n: left.right }
  if (right.kind === 'bin' && right.op === '%') return { x: right.left, r: left, n: right.right }
  return null
}

function congruenceMl(c: { x: Node; r: Node; n: Node }): string {
  return `<mrow>${ml(c.x)}<mo>≡</mo>${ml(c.r)}<mspace width="0.6em"/><mo stretchy="false">(</mo><mo lspace="0" rspace="0.28em">mod</mo>${ml(c.n)}<mo stretchy="false">)</mo></mrow>`
}

export interface TypesetStatement {
  classification: Classification
  /** MathML, or null for a program-shaped statement (which the page sets as code instead) */
  mathml: string | null
  /** TeX for a manuscript, or null as above */
  tex: string | null
  /** why a formula-shaped statement did not typeset — always named, never silent */
  refused: string | null
}

/** typeset(statement) → the publication rendering, or a named refusal. Pure and total. */
export function typeset(statement: string, display: 'block' | 'inline' = 'block'): TypesetStatement {
  const classification = classify(statement)
  if (classification === 'program') return { classification, mathml: null, tex: null, refused: null }
  // THE SAME STRING classify JUDGED. Parsing the raw statement while
  // classifying the bare one is two opinions about one input: a statement
  // admitted as a formula and then refused by the parser reports a refusal that
  // is an artefact of reading it twice, differently.
  const parsed = parseFormula(formulaSource(statement))
  if (!parsed.ok) return { classification, mathml: null, tex: null, refused: parsed.why }
  const cong = congruenceOf(parsed.node)
  if (cong) return {
    classification,
    mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="${display}">${congruenceMl(cong)}</math>`,
    tex: `${formulaTex(cong.x)} \\equiv ${formulaTex(cong.r)} \\pmod{${formulaTex(cong.n)}}`,
    refused: null,
  }
  return { classification, mathml: formulaMathml(parsed.node, display), tex: formulaTex(parsed.node), refused: null }
}

export interface FormulaCensus {
  total: number
  formula: number
  program: number
  /** formula-shaped statements that would not parse — must be 0; a non-empty list is a typesetting gap */
  refused: { statement: string; why: string }[]
}

/** formulaCensus(statements) → how much of a ledger typesets exactly. Derived, so the figure on the page is
 *  never a number somebody typed and then forgot to update. */
export function formulaCensus(statements: readonly string[]): FormulaCensus {
  let formula = 0
  let program = 0
  const refused: { statement: string; why: string }[] = []
  for (const s of statements) {
    if (classify(s) === 'program') { program++; continue }
    formula++
    const r = typeset(s)
    if (r.refused) refused.push({ statement: s, why: r.refused })
  }
  return { total: statements.length, formula, program, refused }
}
