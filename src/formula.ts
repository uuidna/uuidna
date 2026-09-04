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

/** classify(statement) → whether the statement is a formula that typesets exactly, or a program that must not. */
export function classify(statement: string): Classification {
  return FORMULA_CHARS.test(statement) && /[0-9]/.test(statement) ? 'formula' : 'program'
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
const LEVELS: BinOp[][] = [['∧'], ['=', '≠', '≤', '≥', '<', '>'], ['%'], ['+', '-'], ['*', '/']]
const CHAINS: readonly boolean[] = [true, false, true, true, true]

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
const PREC: Record<BinOp, number> = { '∧': 1, '=': 2, '≠': 2, '≤': 2, '≥': 2, '<': 2, '>': 2, '%': 3, '+': 4, '-': 4, '*': 5, '/': 5, '^': 6 }

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
  const parsed = parseFormula(statement)
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
