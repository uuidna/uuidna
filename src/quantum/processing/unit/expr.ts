/**
 * ONE INTERPRETER, SO A FAMILY IS DATA AND NOT CODE.
 *
 * Every formula of every domain — however deep or complex the domain — is a small arithmetic expression over its named
 * parameters: a survey of the whole corpus finds only `+ - * / % **` and the functions floor, ceil, round, trunc, abs,
 * sqrt, log, sin, cos, pow, min, max. So a formula need not be a hand-written TypeScript body; it is `{ name, params,
 * expr }` — data that lives in a nested document (a FuseFormulas row), carrying its own programmable combinatorics. This
 * module compiles such an expression ONCE into the `(…args) => value` that `hexRegisterOf` takes, so the unit's one
 * hex engine (`hexRunOf`, an accumulator fold with no per-formula code) runs, holds-checks and receipts every family
 * the same way. Store the data, register through here, and qpu verifies all it computes on its own.
 *
 * HOLDS IS THE ORIGINAL'S HOLDS, DERIVED NOT DECLARED. The hand bodies guarded the natural domain and the zero divisor
 * (`y > 0 ? ⌊x / y⌋ : 0`, holds `&& y > 0`). Here the same truth is read off the evaluation: a parameter that is not a
 * natural, a division or modulo by zero, or a non-finite result makes the value fall back to 0 and `holds` false —
 * exactly the branch the hand body took — without a separate guard stored beside the expression.
 *
 * SAFE BY CONSTRUCTION: a recursive-descent parser over a fixed grammar and a fixed function table. No `eval`, no `new
 * Function`, no identifier that is not a declared parameter or a listed function. An unknown name or a malformed
 * expression is a parse error at compile time, never a runtime surprise.
 */

/** The function table: exactly the vocabulary the corpus uses, each the JS Math it already stood for, so a compiled
 *  expression reproduces its hand body to the integer. `pow`, `min`, `max` are n-ary as their Math namesakes are. */
const FN: Record<string, (...a: number[]) => number> = {
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  trunc: Math.trunc,
  abs: Math.abs,
  sqrt: Math.sqrt,
  log: Math.log,
  sin: Math.sin,
  cos: Math.cos,
  pow: (a, b) => Math.pow(a, b),
  min: (...a) => Math.min(...a),
  max: (...a) => Math.max(...a),
}

type Node =
  | { k: 'num'; v: number }
  | { k: 'var'; i: number }
  | { k: 'bin'; op: '+' | '-' | '*' | '/' | '%' | '**'; l: Node; r: Node }
  | { k: 'neg'; x: Node }
  | { k: 'call'; fn: string; args: Node[] }

/** A division or modulo by zero sets this during an evaluation; it is the holds the hand body carried as `&& y > 0`. */
type Ctx = { dividedByZero: boolean }

const tokenize = (src: string): string[] => {
  const out: string[] = []
  const re = /\s*([A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?|\*\*|[()+\-*/%,])/y
  let at = 0
  while (at < src.length) {
    re.lastIndex = at
    const m = re.exec(src)
    if (!m || m.index !== at) throw new Error(`expr: unexpected character at ${at} in ${JSON.stringify(src)}`)
    out.push(m[1]!)
    at = re.lastIndex
  }
  return out
}

/** Parse an expression over the given parameter names into an AST. Precedence: + - < * / % < ** (right) < unary - < call. */
const parse = (src: string, params: readonly string[]): Node => {
  const toks = tokenize(src)
  let i = 0
  const peek = () => toks[i]
  const next = () => toks[i++]
  const eat = (t: string) => {
    if (toks[i] !== t) throw new Error(`expr: expected ${t} but found ${toks[i] ?? 'end'} in ${JSON.stringify(src)}`)
    i++
  }
  const index = (name: string) => {
    const at = params.indexOf(name)
    if (at < 0) throw new Error(`expr: ${JSON.stringify(name)} is not a parameter (${params.join(', ') || 'none'}) or a function`)
    return at
  }

  const primary = (): Node => {
    const t = peek()
    if (t === undefined) throw new Error(`expr: unexpected end of ${JSON.stringify(src)}`)
    if (t === '(') { next(); const e = addsub(); eat(')'); return e }
    if (t === '-') { next(); return { k: 'neg', x: primary() } }
    if (/^\d/.test(t)) { next(); return { k: 'num', v: Number(t) } }
    if (/^[A-Za-z_]/.test(t)) {
      next()
      if (peek() === '(') {
        next()
        const args: Node[] = []
        if (peek() !== ')') { args.push(addsub()); while (peek() === ',') { next(); args.push(addsub()) } }
        eat(')')
        if (!(t in FN)) throw new Error(`expr: unknown function ${JSON.stringify(t)}`)
        return { k: 'call', fn: t, args }
      }
      return { k: 'var', i: index(t) }
    }
    throw new Error(`expr: unexpected token ${JSON.stringify(t)} in ${JSON.stringify(src)}`)
  }
  // ** is right-associative and binds tighter than * / %
  const power = (): Node => {
    const base = primary()
    if (peek() === '**') { next(); return { k: 'bin', op: '**', l: base, r: power() } }
    return base
  }
  const muldiv = (): Node => {
    let l = power()
    while (peek() === '*' || peek() === '/' || peek() === '%') { const op = next() as '*' | '/' | '%'; l = { k: 'bin', op, l, r: power() } }
    return l
  }
  const addsub = (): Node => {
    let l = muldiv()
    while (peek() === '+' || peek() === '-') { const op = next() as '+' | '-'; l = { k: 'bin', op, l, r: muldiv() } }
    return l
  }

  const root = addsub()
  if (i !== toks.length) throw new Error(`expr: trailing ${JSON.stringify(toks.slice(i).join(' '))} in ${JSON.stringify(src)}`)
  return root
}

const evalNode = (node: Node, vars: readonly number[], ctx: Ctx): number => {
  switch (node.k) {
    case 'num': return node.v
    case 'var': return vars[node.i] ?? 0
    case 'neg': return -evalNode(node.x, vars, ctx)
    case 'call': return FN[node.fn]!(...node.args.map((a) => evalNode(a, vars, ctx)))
    case 'bin': {
      const l = evalNode(node.l, vars, ctx)
      const r = evalNode(node.r, vars, ctx)
      switch (node.op) {
        case '+': return l + r
        case '-': return l - r
        case '*': return l * r
        case '**': return l ** r
        case '/': if (r === 0) { ctx.dividedByZero = true; return 0 } return l / r
        case '%': if (r === 0) { ctx.dividedByZero = true; return 0 } return l % r
      }
    }
  }
}

/** A formula as data — the row a nested document holds, addressable at 8-4-4-4-4-12:
 *  - `name`, `params`, `expr`: the formula body (handle + program + params segments of the address).
 *  - `dst`: the domain it crosses to — its place in the open graph (the domain segment of the handle).
 *  - `sources`: the live APIs and datasets this formula/domain fuses — the address's SOURCE segment. Named here, they
 *    are read all at once when the formula runs (the `data` fan-out), so a family's address uses the full quantum
 *    capacity: `[]` fuses none, `['*']` (or every bit set in the 4-hex source segment) fuses all the family names.
 *  - `proof`: the sentence the receipt carries. */
export type FormulaSpec = { name: string; params: readonly string[]; expr: string; dst?: string; sources?: readonly string[]; proof?: string }

/** What one compiled formula returns: the value and whether it holds (natural inputs, no zero divisor, finite result) —
 *  the shape `hexRunOf` already reads (`{ value, holds }`). */
export type FormulaResult = { value: number; holds: boolean }

/**
 * Compile a formula spec into the `(…args) => { value, holds }` that `hexRegisterOf` takes. The expression is parsed
 * once; each call binds the arguments to the named parameters, evaluates, and derives holds the way the hand body did.
 * The returned function's `length` equals the parameter count, so the registry reads the arity straight from it.
 */
export const exprFormulaOf = (spec: FormulaSpec): ((...args: number[]) => FormulaResult) => {
  const ast = parse(spec.expr, spec.params)
  const arity = spec.params.length
  // a function whose own `length` is the arity (hexFamiliesOf reads fn.length): build it with that many named slots
  const run = (...args: number[]): FormulaResult => {
    const nat = args.length >= arity && args.slice(0, arity).every((x) => Number.isSafeInteger(x) && x >= 0)
    const ctx: Ctx = { dividedByZero: false }
    const raw = evalNode(ast, args, ctx)
    const holds = nat && !ctx.dividedByZero && Number.isFinite(raw)
    return { value: holds ? raw : 0, holds }
  }
  Object.defineProperty(run, 'length', { value: arity })
  return run
}

/** Evaluate an expression directly (parse + run) — for a one-off check or a test; registration uses exprFormulaOf. */
export const exprValueOf = (expr: string, params: readonly string[], args: readonly number[]): FormulaResult =>
  exprFormulaOf({ name: 'expr', params, expr })(...args)
