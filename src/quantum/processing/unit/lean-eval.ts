/**
 * EVERY THEOREM OF index.lean, RECOMPUTED AND TYPESET FROM THE FILE ITSELF.
 *
 * The statements are Nat algebra over the file's own defs, so they can be decided here exactly: a BigInt evaluator
 * that reads the defs out of the Lean source (the pattern-matched ones — mintOf, chooseOf, powModAux, periodAux,
 * gcdAux — are transcribed rule for rule, with Lean's Nat semantics: truncated -, x / 0 = 0, x % 0 = x) and walks
 * each statement. A binder (k : Nat) or ∀ x : Nat ranges over 0..bits, or 0..vertices when a statement binds three
 * or more; a hypothesis (h : a < b) restricts the range. So a quantified row says over what it was checked.
 *
 * The same parse is typeset: identifiers upright, single-letter variables italic, · for *, \bmod, \oplus for ^^^,
 * powers as superscripts, parentheses only where precedence needs them.
 */

type Tok = { t: 'num' | 'id' | 'op' | 'lp' | 'rp' | 'comma' | 'colon'; v: string }
type Ast =
  | { k: 'num'; v: bigint }
  | { k: 'id'; v: string }
  | { k: 'app'; f: string; args: Ast[] }
  | { k: 'bin'; op: string; l: Ast; r: Ast }

const OPS = ['^^^', '≠', '≤', '≥', '∧', '+', '-', '*', '/', '%', '^', '=', '<', '>']
const PREC: Record<string, number> = { '∧': 35, '=': 50, '≠': 50, '<': 50, '≤': 50, '>': 50, '≥': 50, '^^^': 58, '+': 65, '-': 65, '*': 70, '/': 70, '%': 70, '^': 75 }
const RIGHT = new Set(['∧', '^'])

const lex = (s: string): Tok[] => {
  const out: Tok[] = []
  let i = 0
  while (i < s.length) {
    const c = s[i]!
    if (/\s/.test(c)) { i++; continue }
    if (/[0-9]/.test(c)) { let j = i; while (j < s.length && /[0-9]/.test(s[j]!)) j++; out.push({ t: 'num', v: s.slice(i, j) }); i = j; continue }
    if (/[A-Za-z_]/.test(c)) { let j = i; while (j < s.length && /[A-Za-z0-9_']/.test(s[j]!)) j++; out.push({ t: 'id', v: s.slice(i, j) }); i = j; continue }
    if (c === '(' || c === '{' || c === '[') { out.push({ t: 'lp', v: c }); i++; continue }
    if (c === ')' || c === '}' || c === ']') { out.push({ t: 'rp', v: c }); i++; continue }
    if (c === ',') { out.push({ t: 'comma', v: c }); i++; continue }
    if (c === ':') { out.push({ t: 'colon', v: c }); i++; continue }
    const op = OPS.find((o) => s.startsWith(o, i))
    if (!op) throw new Error(`lean-eval: unexpected ${c} in ${s}`)
    out.push({ t: 'op', v: op }); i += op.length
  }
  return out
}

/** Pratt parser; a function name takes as many atoms as its arity. */
const parseWith = (toks: Tok[], arity: (f: string) => number): Ast => {
  let p = 0
  const atom = (): Ast => {
    const t = toks[p++]
    if (!t) throw new Error('lean-eval: unexpected end')
    if (t.t === 'num') return { k: 'num', v: BigInt(t.v) }
    if (t.t === 'lp') { const e = expr(0); p++; return e }
    if (t.t === 'id') {
      const n = arity(t.v)
      if (n === 0) return { k: 'id', v: t.v }
      const args: Ast[] = []
      for (let i = 0; i < n; i++) args.push(atom())
      return { k: 'app', f: t.v, args }
    }
    throw new Error(`lean-eval: unexpected ${t.v}`)
  }
  const expr = (min: number): Ast => {
    let l = atom()
    for (;;) {
      const t = toks[p]
      if (!t || t.t !== 'op') return l
      const prec = PREC[t.v]!
      if (prec < min) return l
      p++
      const r = expr(RIGHT.has(t.v) ? prec : prec + 1)
      l = { k: 'bin', op: t.v, l, r }
    }
  }
  const e = expr(0)
  if (p !== toks.length) throw new Error('lean-eval: trailing tokens')
  return e
}

// ---- Lean Nat semantics -------------------------------------------------------------------------------------------
const ZERO = BigInt(0)
const ONE = BigInt(1)
const sub = (a: bigint, b: bigint): bigint => (a > b ? a - b : ZERO)
const div = (a: bigint, b: bigint): bigint => (b === ZERO ? ZERO : a / b)
const mod = (a: bigint, b: bigint): bigint => (b === ZERO ? a : a % b)
// Lean's powModAux takes k steps of acc ← acc·a % m; its cross formula acc·aᵏ % m, by squaring, takes log₂ k and
// reaches the same value (% 0 is the identity, k = 0 leaves acc unreduced)
const powModAux = (k: bigint, a: bigint, m: bigint, acc: bigint): bigint => {
  if (k === ZERO) return acc
  let r = ONE, b = mod(a, m)
  for (let e = k; ; ) {
    if (e & ONE) r = mod(r * b, m)
    e >>= ONE
    if (e === ZERO) break
    b = mod(b * b, m)
  }
  return mod(acc * r, m)
}
const gcd = (a: bigint, b: bigint): bigint => { while (b !== ZERO) [a, b] = [b, a % b]; return a }
const BUILTIN: Record<string, (...x: bigint[]) => bigint> = {
  mintOf: (k) => ONE << k,
  chooseOf: (n, k) => {
    if (k > n) return ZERO
    // its cross formula C(n, k) = C(n, n − k): the shorter side is the same value
    if (n - k < k) k = n - k
    let c = ONE
    for (let i = ZERO; i < k; i++) c = (c * (n - i)) / (i + ONE)
    return c
  },
  powModAux,
  powMod: (a, e, m) => powModAux(e, a, m, mod(ONE, m)),
  periodAux: (fuel, a, m, r) => {
    if (fuel === ZERO || m === ONE) return ZERO
    // aʳ ≡ 1 needs a unit: when a shares a factor with m (or m = 0 and a ≠ 1) no r ≥ 1 reaches 1 and the fuel runs out
    if (r > ZERO && (m === ZERO ? a !== ONE : gcd(a, m) !== ONE)) return ZERO
    // a^(r+1) = aʳ · a: the power carried, not recomputed
    for (let f = fuel, p = powModAux(r, a, m, mod(ONE, m)); f > ZERO; f--, r++, p = mod(p * a, m)) if (p === ONE) return r
    return ZERO
  },
  gcdAux: (fuel, a, b) => {
    for (let f = fuel; f > ZERO; f--) {
      if (b === ZERO) return a
      ;[a, b] = [b, mod(a, b)]
    }
    return a
  },
}
BUILTIN.periodOf = (a, m) => BUILTIN.periodAux!(m, a, m, ONE)
BUILTIN.gcdOf = (a, b) => BUILTIN.gcdAux!(a + b, a, b)
// the quantum-application families' recursive defs, mirroring their Lean (Qpu/Stabilizer, Clifford, Galois, Anyon) so the
// served value equals the kernel-proved one: a product over a range, or the Fibonacci fold.
BUILTIN.stabProd = (k) => { let acc = ONE; for (let i = ONE; i <= k; i++) acc *= (ONE << i) + ONE; return acc }
BUILTIN.sympProd = (j) => { let acc = ONE; for (let x = ONE; x <= j; x++) acc *= (ONE << (x << ONE)) - ONE; return acc }
BUILTIN.glProd = (nn, i) => { let acc = ONE; for (let x = ZERO; x < i; x++) acc *= (ONE << nn) - (ONE << x); return acc }
BUILTIN.fibAux = (k, a, b) => { for (let f = k; f > ZERO; f--) [a, b] = [b, a + b]; return a }
// Qpu.Combinatorics: the match-defs the evaluator does not parse from the bundle — by construction it reads only simple defs — hand-implemented so it can recompute them.
BUILTIN.factorial = (n) => { let acc = ONE; for (let i = ONE; i <= n; i++) acc *= i; return acc }
BUILTIN.choose = (n, k) => BUILTIN.chooseOf!(n, k)
BUILTIN.triangular = (n) => (n * (n + ONE)) / (ONE + ONE)
BUILTIN.ramsey22 = (n) => n

type Def = { params: string[]; body: Ast }
export type LeanModel = { defs: Map<string, Def>; constant: (name: string) => bigint; arity: (f: string) => number; order: string[] }

/**
 * The defs of the Lean source: `def x : Nat := e` and `def f (p q : Nat) : Nat := e`.
 * @wing proof
 * @kind builder
 */
export const leanModelOf = (source: string): LeanModel => {
  const raw = new Map<string, { params: string[]; text: string }>()
  for (const m of source.matchAll(/^def (\w+)((?:\s*\([^)]*: Nat\))*)\s*:\s*Nat\s*:=\s*(.+)$/gm)) {
    const params = [...m[2]!.matchAll(/\(([^:)]*):/g)].flatMap((g) => g[1]!.trim().split(/\s+/))
    raw.set(m[1]!, { params, text: m[3]!.trim() })
  }
  const arity = (f: string): number => (raw.get(f)?.params.length ?? BUILTIN[f]?.length ?? 0)
  const defs = new Map<string, Def>()
  for (const [name, { params, text }] of raw) {
    if (BUILTIN[name]) continue
    const list = /^\[(.*)\]\.length$/.exec(text)
    const body: Ast = list ? { k: 'num', v: BigInt(list[1]!.split(',').length) } : parseWith(lex(text), arity)
    defs.set(name, { params, body })
  }
  const cache = new Map<string, bigint>()
  const model: LeanModel = {
    defs,
    arity,
    order: [...raw.keys(), ...[...source.matchAll(/^def (\w+) : Nat → /gm)].map((m) => m[1]!)].filter((k, i, a) => a.indexOf(k) === i).sort((a, b) => source.indexOf(`def ${a} `) - source.indexOf(`def ${b} `)),
    constant: (name) => {
      const hit = cache.get(name)
      if (hit !== undefined) return hit
      const d = defs.get(name)
      if (!d || d.params.length > 0) throw new Error(`lean-eval: no constant ${name}`)
      const v = evalNat(d.body, model, new Map())
      cache.set(name, v)
      return v
    },
  }
  return model
}

const evalNat = (e: Ast, m: LeanModel, env: Map<string, bigint>): bigint => {
  const v = evalAny(e, m, env)
  if (typeof v !== 'bigint') throw new Error('lean-eval: proposition where a Nat was expected')
  return v
}
const evalAny = (e: Ast, m: LeanModel, env: Map<string, bigint>): bigint | boolean => {
  if (e.k === 'num') return e.v
  if (e.k === 'id') return env.has(e.v) ? env.get(e.v)! : m.constant(e.v)
  if (e.k === 'app') {
    const args = e.args.map((a) => evalNat(a, m, env))
    const b = BUILTIN[e.f]
    if (b) return b(...args)
    const d = m.defs.get(e.f)!
    return evalNat(d.body, m, new Map(d.params.map((p, i) => [p, args[i]!])))
  }
  if (e.op === '∧') return evalAny(e.l, m, env) === true && evalAny(e.r, m, env) === true
  const l = evalNat(e.l, m, env)
  const r = evalNat(e.r, m, env)
  switch (e.op) {
    case '+': return l + r
    case '-': return sub(l, r)
    case '*': return l * r
    case '/': return div(l, r)
    case '%': return mod(l, r)
    case '^': return l ** r
    case '^^^': return l ^ r
    case '=': return l === r
    case '≠': return l !== r
    case '<': return l < r
    case '≤': return l <= r
    case '>': return l > r
    case '≥': return l >= r
  }
  throw new Error(`lean-eval: operator ${e.op}`)
}

// ---- statements -----------------------------------------------------------------------------------------------------
type Statement = { vars: string[]; hyps: Ast[]; body: Ast[]; inner: string[][] }

/** Split `theorem name binders : type :=` into its Nat binders, hypotheses and conjuncts (each with its own ∀). */
const statementOf = (theorem: string, m: LeanModel): Statement => {
  const head = theorem.split(':=')[0]!.replace(/^theorem\s+\w+/, '')
  let depth = 0
  let cut = -1
  for (let i = 0; i < head.length; i++) {
    const c = head[i]!
    if ('({[⟨'.includes(c)) depth++
    else if (')}]⟩'.includes(c)) depth--
    else if (depth === 0 && c === ':') { cut = i; break }
  }
  const binders = head.slice(0, cut)
  const type = head.slice(cut + 1).trim()
  const vars: string[] = []
  const hyps: Ast[] = []
  for (const g of binders.matchAll(/[({]([^:)}]*):([^)}]*)[)}]/g)) {
    const names = g[1]!.trim().split(/\s+/)
    const t = g[2]!.trim()
    if (t === 'Nat') vars.push(...names)
    else hyps.push(parseWith(lex(t), m.arity))
  }
  const body: Ast[] = []
  const inner: string[][] = []
  const all = /^∀\s+([^,:]*):\s*Nat\s*,\s*(.*)$/.exec(type)
  const parts = all ? [type] : topLevelSplit(type, '∧')
  // strip an ENCLOSING pair of parens only — the leading '(' must balance to the trailing ')'. `(a) = (b)` starts '('
  // and ends ')' but they are two groups, not one enclosure, so it must not become `a) = (b` (Wave XIII, latent).
  const enclosed = (s: string): boolean => {
    if (!s.startsWith('(') || !s.endsWith(')')) return false
    let depth = 0
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') depth++
      else if (s[i] === ')') { depth--; if (depth === 0 && i < s.length - 1) return false }
    }
    return depth === 0
  }
  for (let part of parts) {
    part = part.trim()
    while (enclosed(part)) part = part.slice(1, -1).trim()
    const q = /^∀\s+([^,:]*):\s*Nat\s*,\s*(.*)$/.exec(part)
    inner.push(q ? q[1]!.trim().split(/\s+/) : [])
    body.push(parseWith(lex(q ? q[2]! : part), m.arity))
  }
  return { vars, hyps, body, inner }
}

/** Split on a separator only where it stands outside every bracket. */
const topLevelSplit = (text: string, sep: string): string[] => {
  const out: string[] = []
  let depth = 0
  let from = 0
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!
    if ('({[⟨'.includes(c)) depth++
    else if (')}]⟩'.includes(c)) depth--
    else if (depth === 0 && text.startsWith(sep, i)) { out.push(text.slice(from, i)); from = i + sep.length }
  }
  out.push(text.slice(from))
  return out
}
const assignmentsOf = (names: string[], hi: bigint): Map<string, bigint>[] => {
  let out: Map<string, bigint>[] = [new Map()]
  for (const name of names) {
    const next: Map<string, bigint>[] = []
    for (const env of out) for (let v = ZERO; v <= hi; v++) next.push(new Map(env).set(name, v))
    out = next
  }
  return out
}

export type LeanRecomputed = { holds: boolean; over?: string; formula: string }

/**
 * Decide one theorem statement exactly, over the stated range when it binds variables, and typeset it.
 * @wing proof
 * @kind builder
 */
export const leanRecomputeOf = (theorem: string, m: LeanModel): LeanRecomputed => {
  const s = statementOf(theorem, m)
  const bound = [...s.vars, ...s.inner.flat()]
  const hi = bound.length >= 3 ? m.constant('vertices') : m.constant('bits')
  const holds = s.body.every((conj, i) =>
    assignmentsOf([...s.vars, ...s.inner[i]!], hi).every((env) => !s.hyps.every((h) => evalAny(h, m, env) === true) || evalAny(conj, m, env) === true),
  )
  const unique = [...new Set(bound)]
  return { holds, ...(unique.length > 0 ? { over: `${unique.join(', ')} ∈ [0, ${hi}]` } : {}), formula: latexOf(s) }
}

// ---- LaTeX ----------------------------------------------------------------------------------------------------------
const TEX_OP: Record<string, string> = { '*': '\\cdot ', '%': '\\bmod ', '^^^': '\\oplus ', '∧': '\\land ', '≠': '\\neq ', '≤': '\\le ', '≥': '\\ge ', '/': '/' }
/** Upright for the file's names, italic for bound variables; a multi-letter bound name is \\mathit so it reads as one. */
const name = (v: string, bound: ReadonlySet<string> = new Set()): string =>
  bound.has(v) ? (v.length === 1 ? v : `\\mathit{${v}}`) : `\\mathrm{${v.replace(/_/g, '\\_')}}`
const texOf = (e: Ast, bound: ReadonlySet<string>, parent = 0, right = false): string => {
  if (e.k === 'num') return e.v.toString()
  if (e.k === 'id') return name(e.v, bound)
  if (e.k === 'app') return `${name(e.f)}(${e.args.map((a) => texOf(a, bound)).join(',')})`
  const prec = PREC[e.op]!
  const body =
    e.op === '^'
      ? `${texOf(e.l, bound, prec + 1)}^{${texOf(e.r, bound)}}`
      : `${texOf(e.l, bound, prec, false)}${TEX_OP[e.op] ?? e.op}${texOf(e.r, bound, prec, true)}`
  const wrap = prec < parent || (prec === parent && (right ? !RIGHT.has(e.op) : RIGHT.has(e.op)))
  return (wrap ? `(${body})` : body).replace(/ (?=[(){}\\])/g, '').replace(/ $/, '')
}
const latexOf = (s: Statement): string => {
  const all = new Set([...s.vars, ...s.inner.flat()])
  const list = (vs: string[]) => vs.map((v) => name(v, all)).join(',')
  const conj = s.body.map((b, i) => (s.inner[i]!.length ? `\\forall ${list(s.inner[i]!)}\\in\\mathbb{N}:\\ ${texOf(b, all)}` : texOf(b, all))).join('\\land ')
  const hyp = s.hyps.length ? `${s.hyps.map((h) => texOf(h, all)).join('\\land ')}\\Rightarrow ` : ''
  const head = s.vars.length ? `\\forall ${list(s.vars)}\\in\\mathbb{N}:\\ ` : ''
  return `${head}${hyp}${conj}`.trim()
}

/**
 * Every theorem of the source as [name, text]: the `theorem` line and its continuation lines, whitespace folded.
 * @wing proof
 * @kind builder
 */
export const leanTheoremBlocksOf = (source: string): Array<[string, string]> => {
  const lines = source.split('\n')
  const out: Array<[string, string]> = []
  for (let i = 0; i < lines.length; i++) {
    const head = /^theorem (\w+)/.exec(lines[i]!)
    if (!head) continue
    let j = i + 1
    while (j < lines.length && lines[j]!.trim() !== '' && !/^(theorem|def|lemma|abbrev|--|\/-)/.test(lines[j]!)) j++
    out.push([head[1]!, lines.slice(i, j).join(' ').replace(/\s+/g, ' ').trim()])
  }
  return out
}

/**
 * Call one definition of the Lean source by name with natural-number arguments, under Lean's Nat semantics.
 * @wing proof
 * @kind function
 */
export const leanCallOf = (m: LeanModel, name: string, args: readonly bigint[]): bigint => {
  const b = BUILTIN[name]
  if (b) return b(...args)
  const d = m.defs.get(name)
  if (!d) throw new Error(`lean-eval: no definition ${name}`)
  if (d.params.length === 0) return m.constant(name)
  return evalNat(d.body, m, new Map(d.params.map((p, i) => [p, args[i] ?? ZERO])))
}
/** The arity of a definition: its parameter count (pattern-matched builtins by their transcription). */
export const leanArityOf = (m: LeanModel, name: string): number => (BUILTIN[name] ? BUILTIN[name]!.length : m.defs.get(name)?.params.length ?? 0)

/**
 * The formulas discover each other: every declaration's statement and proof are read for the other declarations they
 * name. A definition used by another is a dependency; two definitions named in one theorem are related by it; a family
 * (the module the declaration came from, marked `/-! # Qpu.<Family>` in the bundle) links to every family it uses.
 * @wing proof
 * @kind function
 */
export const leanLinksOf = (source: string) => {
  const lines = source.split('\n')
  const decls: { name: string; kind: 'def' | 'theorem'; family: string; text: string }[] = []
  let family = 'Qpu'
  for (let i = 0; i < lines.length; i++) {
    const f = /^\/-! # Qpu\.(\w+)/.exec(lines[i]!)
    if (f) { family = f[1]!; continue }
    const m = /^(def|theorem) (\w+)/.exec(lines[i]!)
    if (!m) continue
    let j = i + 1
    while (j < lines.length && lines[j]!.trim() !== '' && !/^(def|theorem|--|\/-)/.test(lines[j]!)) j++
    decls.push({ name: m[2]!, kind: m[1] as 'def' | 'theorem', family, text: lines.slice(i, j).join(' ').replace(/^(def|theorem) \w+/, '') })
    i = j - 1
  }
  const names = new Set(decls.map((d) => d.name))
  const familyOf = new Map(decls.map((d) => [d.name, d.family]))
  // a declaration's own bound names (parameters, ∀, fun, match patterns) are not references to declarations
  const boundOf = (t: string): Set<string> =>
    new Set([
      ...[...t.matchAll(/[({]([\w\s']+):/g)].flatMap((m) => m[1]!.trim().split(/\s+/)),
      ...[...t.matchAll(/(?:∀|fun)\s+([\w\s']+?)\s*(?::|=>|,)/g)].flatMap((m) => m[1]!.trim().split(/\s+/)),
      ...[...t.matchAll(/\|([^|]*?)=>/g)].flatMap((m) => [...m[1]!.matchAll(/\b[A-Za-z_]\w*\b/g)].map((x) => x[0])),
    ])
  const uses = decls.map((d) => {
    const bound = boundOf(d.text)
    return { name: d.name, kind: d.kind, family: d.family, uses: [...new Set([...d.text.matchAll(/\b[A-Za-z_][A-Za-z0-9_']*\b/g)].map((x) => x[0]))].filter((x) => names.has(x) && x !== d.name && !bound.has(x)).sort() }
  })
  const defs = new Set(decls.filter((d) => d.kind === 'def').map((d) => d.name))
  const related = new Map<string, Set<string>>()
  for (const u of uses.filter((x) => x.kind === 'theorem')) {
    const fs = u.uses.filter((x) => defs.has(x))
    for (const a of fs) for (const b of fs) if (a < b) (related.get(`${a}~${b}`) ?? related.set(`${a}~${b}`, new Set()).get(`${a}~${b}`)!).add(u.name)
  }
  const families = [...new Set(decls.map((d) => d.family))]
  const familyLinks = families.flatMap((from) => {
    const to = new Map<string, number>()
    for (const u of uses.filter((x) => x.family === from)) for (const v of u.uses) { const g = familyOf.get(v)!; if (g !== from) to.set(g, (to.get(g) ?? 0) + 1) }
    return [...to].map(([t, count]) => ({ from, to: t, count }))
  })
  return {
    kind: 'lean-links' as const,
    declarations: uses,
    related: [...related].map(([k, by]) => ({ pair: k.split('~') as [string, string], by: [...by].sort() })).sort((a, b) => b.by.length - a.by.length || a.pair.join().localeCompare(b.pair.join())),
    families: families.map((f) => ({ family: f, definitions: uses.filter((u) => u.family === f && u.kind === 'def').map((u) => u.name), theorems: uses.filter((u) => u.family === f && u.kind === 'theorem').length })),
    familyLinks,
  }
}
