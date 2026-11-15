#!/usr/bin/env node
// lean-families — THE FAMILIES ARE THE GAPS TO FILL (the captain, 2026-11-15). Each of src/families/<name> states its
// formulas as Nat arithmetic in its own source (`gforce(accel, g) = ⌊accel / g⌋`) and their values at concrete
// arguments in its own test (`gforce(2000, 1000).value === 2`). Neither was sealed: the arithmetic ran classically on
// every test pass. This wing seals each such witness as a kernel fact, read from those two files and nothing else:
// the formula's right-hand side becomes a Nat term at the test's arguments, and the fact is emitted only when the
// family's own method, the test's stated value and the Nat reading of the formula agree. Lean's Nat division floors
// and its subtraction truncates at zero, which is exactly what the families compute, so ⌊a / b⌋ is `a / b` and
// max(0, a − b) is `a - b`. A witness that does not read as Nat arithmetic is not forced into one: it is counted as
// a gap still open, by reason, in the run's last line.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { emit, ROOT, type Fact } from './lean-gen.js'

const FAM = join(ROOT, 'src', 'families')
const DIST_FAM = join(ROOT, 'dist', 'families')
const SAFE = 2n ** 53n

// ── a formula's right-hand side, read as exact integer arithmetic (anything else is refused, never guessed) ──
// The families compute in integers: V − E + F at (8, 12, 6) is 2, not the 6 a truncating Nat subtraction gives, so the
// reading is Int, with Lean's own Int semantics mirrored here — floor division by a positive divisor (Lean's `/` is the
// Euclidean division, which is the floor there; a non-positive divisor is refused), the Euclidean remainder, and
// truncation only where the formula itself writes max(0, …). Comparisons and connectives read as 0 or 1, as the
// families' Iverson brackets [·] do; C(n, k) and n! read through the two axiom-free definitions below.
type Node = { k: string; v?: bigint; name?: string; a?: Node; b?: Node; c?: Node }
const SUP: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', 'ⁿ': 'n' }
const tokens = (s: string): string[] => s
  .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ]+/g, (m) => `^${m.length > 1 ? '(' : ''}${[...m].map((c) => SUP[c]).join('')}${m.length > 1 ? ')' : ''}`)
  .replace(/log₂/g, 'log2').replace(/log₁₀/g, 'log10').replace(/⌊/g, '(').replace(/⌋/g, ')').replace(/⌈/g, ' ⌈ ').replace(/⌉/g, ' ⌉ ')
  .replace(/[·×]/g, '*').replace(/−/g, '-').replace(/≥/g, '>=').replace(/≤/g, '<=').replace(/≠/g, '!=')
  .replace(/∧|\band\b/g, '&&').replace(/∨|\bor\b/g, '||').replace(/\bnot\b/g, '¬').replace(/\bmod\b/g, '%')
  .match(/\d+|[A-Za-z_][A-Za-z0-9_]*|>=|<=|!=|==|&&|\|\||[-+*/%^(),[\]<>=!?:¬⌈⌉√]|\S/g) ?? []
function parse(ts: string[]): Node {
  let i = 0
  const peek = (): string | undefined => ts[i]
  const next = (): string | undefined => ts[i++]
  const want = (t: string): void => { if (next() !== t) throw new Error(`expected ${t}`) }
  const prim = (): Node => {
    const t = next()
    if (t === undefined) throw new Error('ends early')
    let e: Node
    if (/^\d+$/.test(t)) e = { k: 'n', v: BigInt(t) }
    else if (t === '(') { e = ite(); want(')') }
    else if (t === '[') { e = { k: 'iv', a: ite() }; want(']') }
    else if (t === '⌈' || (t === 'ceil' && peek() === '(')) {
      const close = t === '⌈' ? '⌉' : ')'
      if (t === 'ceil') next()
      const d = ite(); want(close)
      e = d.k === '/' ? { k: 'ceil', a: d.a, b: d.b } : d.k === 'log' ? { k: 'clog', v: d.v, a: d.a } : d
    }
    else if (/^log(?:2|10)$/.test(t)) { const arg = peek() === '(' ? (next(), ((x: Node) => (want(')'), x))(ite())) : prim(); e = { k: 'log', v: t === 'log2' ? 2n : 10n, a: arg } }
    else if (t === '√') e = { k: 'sqrt', a: peek() === '(' ? (next(), ((x: Node) => (want(')'), x))(ite())) : prim() }
    else if (t === '¬') e = { k: 'not', a: prim() }
    else if (t === '-') e = { k: '-', a: { k: 'n', v: 0n }, b: prim() }
    else if ((t === 'max' || t === 'min' || t === 'C' || t === 'P' || t === 'gcd') && peek() === '(') { next(); const a = ite(); want(','); const b = ite(); want(')'); e = { k: t, a, b } }
    else if (/^[A-Za-z_]/.test(t) && peek() !== '(') e = { k: 'v', name: t }
    else throw new Error(`not integer arithmetic: ${t}`)
    while (peek() === '!') { next(); e = { k: 'fact', a: e } }
    return e
  }
  const pow = (): Node => { let a = prim(); while (peek() === '^') { next(); a = { k: '^', a, b: prim() } } return a }
  const mul = (): Node => { let a = pow(); while (peek() === '*' || peek() === '/' || peek() === '%') { const o = next()!; a = { k: o, a, b: pow() } } return a }
  const sum = (): Node => { let a = mul(); while (peek() === '+' || peek() === '-') { const o = next()!; a = { k: o, a, b: mul() } } return a }
  const cmp = (): Node => { const a = sum(); const o = peek(); if (o === '>=' || o === '<=' || o === '<' || o === '>' || o === '=' || o === '==' || o === '!=') { next(); return { k: o === '==' ? '=' : o, a, b: sum() } } return a }
  const and = (): Node => { let a = cmp(); while (peek() === '&&') { next(); a = { k: '&&', a, b: cmp() } } return a }
  const or = (): Node => { let a = and(); while (peek() === '||') { next(); a = { k: '||', a, b: and() } } return a }
  const ite = (): Node => { const c = or(); if (peek() !== '?') return c; next(); const a = ite(); want(':'); return { k: 'ite', c, a, b: ite() } }
  const e = ite()
  if (i !== ts.length) throw new Error(`trailing ${ts.slice(i).join('')}`)
  return e
}
const floorDiv = (x: bigint, y: bigint): bigint => { const q = x / y; return (x % y !== 0n && (x < 0n) !== (y < 0n)) ? q - 1n : q }
const one = (p: boolean): bigint => (p ? 1n : 0n)
const factOf = (n: bigint): bigint => { let f = 1n; for (let k = 2n; k <= n; k++) f *= k; return f }
const intOf = (e: Node, env: Record<string, bigint>): bigint => {
  switch (e.k) {
    case 'n': return e.v!
    case 'v': if (!(e.name! in env)) throw new Error(`unbound ${e.name}`); return env[e.name!]!
    case 'ite': return intOf(e.c!, env) !== 0n ? intOf(e.a!, env) : intOf(e.b!, env)
    case 'iv': return one(intOf(e.a!, env) !== 0n)
    case 'not': return one(intOf(e.a!, env) === 0n)
    case 'fact': { const n = intOf(e.a!, env); if (n < 0n || n > 64n) throw new Error('factorial outside 0..64'); return factOf(n) }
    case 'log': case 'clog': { const n = intOf(e.a!, env); if (n < 1n) throw new Error('log of a non-positive'); let f = 0n, x = n; while (x >= e.v!) { x /= e.v!; f++ } if (e.k === 'log') return f; let c = 0n, p = 1n; while (p < n) { p *= e.v!; c++ } return c }
    case 'sqrt': { const n = intOf(e.a!, env); if (n < 0n) throw new Error('root of a negative'); let lo = 0n, hi = n + 1n; while (hi > lo + 1n) { const m = (lo + hi) / 2n; if (m * m <= n) lo = m; else hi = m } return lo }
  }
  const x = intOf(e.a!, env), y = intOf(e.b!, env)
  switch (e.k) {
    case '+': return x + y
    case '-': return x - y
    case '*': return x * y
    case '/': if (y < 0n) throw new Error('negative divisor'); return y === 0n ? 0n : floorDiv(x, y)
    case 'ceil': if (y <= 0n) throw new Error('non-positive divisor'); return -floorDiv(-x, y)
    case '%': if (y === 0n) return x; { const m = y < 0n ? -y : y; return ((x % m) + m) % m }
    case '^': if (y < 0n || y > 256n) throw new Error('exponent outside 0..256'); return x ** y
    case 'max': return x < y ? y : x
    case 'min': return x < y ? x : y
    case 'C': if (x < 0n || y < 0n || y > 64n) throw new Error('binomial outside k ≤ 64'); return y > x ? 0n : factOf(x) / (factOf(y) * factOf(x - y))
    case 'P': { if (x < 0n || y < 0n || y > 64n) throw new Error('permutation outside k ≤ 64'); let r = 1n; for (let i = 0n; i < y; i++) r *= x - i > 0n ? x - i : 0n; return r }
    case 'gcd': { if (x < 0n || y < 0n) throw new Error('gcd of a negative'); let a = x, b = y; while (b !== 0n) [a, b] = [b, a % b]; return a }
    case '>=': return one(x >= y)
    case '<=': return one(x <= y)
    case '<': return one(x < y)
    case '>': return one(x > y)
    case '=': return one(x === y)
    case '!=': return one(x !== y)
    case '&&': return one(x !== 0n && y !== 0n)
    default: return one(x !== 0n || y !== 0n)
  }
}
const lit = (n: bigint): string => `(${n} : Int)`
const leanOf = (e: Node, env: Record<string, bigint>): string => {
  const L = (n: Node): string => leanOf(n, env)
  const IF = (p: string): string => `(if ${p} then (1 : Int) else 0)`
  switch (e.k) {
    case 'n': return lit(e.v!)
    case 'v': return lit(env[e.name!]!)
    case 'ite': return `(if ${L(e.c!)} ≠ 0 then ${L(e.a!)} else ${L(e.b!)})`
    case 'iv': return IF(`${L(e.a!)} ≠ 0`)
    case 'not': return IF(`${L(e.a!)} = 0`)
    case 'fact': return `(Int.ofNat (ffact (Int.toNat ${L(e.a!)})))`
    case 'ceil': return `(-((-${L(e.a!)}) / ${L(e.b!)}))`
    case 'max': return `(fmax ${L(e.a!)} ${L(e.b!)})`
    case 'min': return `(fmin ${L(e.a!)} ${L(e.b!)})`
    case 'C': return `(Int.ofNat (fchoose (Int.toNat ${L(e.a!)}) (Int.toNat ${L(e.b!)})))`
    case 'P': return `(Int.ofNat (fperm (Int.toNat ${L(e.a!)}) (Int.toNat ${L(e.b!)})))`
    case 'gcd': return `(Int.ofNat (fgcd 100 (Int.toNat ${L(e.a!)}) (Int.toNat ${L(e.b!)})))`
    case 'log': return `(Int.ofNat (flog ${e.v} 64 (Int.toNat ${L(e.a!)})))`
    case 'clog': return `(Int.ofNat (fclog ${e.v} (Int.toNat ${L(e.a!)})))`
    case 'sqrt': return `(Int.ofNat (fsqrt (Int.toNat ${L(e.a!)})))`
    case '^': return `(${L(e.a!)} ^ (${intOf(e.b!, env)} : Nat))`
    case '>=': case '<=': case '<': case '>': case '=': return IF(`${L(e.a!)} ${e.k === '=' ? '=' : e.k === '>=' ? '≥' : e.k === '<=' ? '≤' : e.k} ${L(e.b!)}`)
    case '!=': return IF(`${L(e.a!)} ≠ ${L(e.b!)}`)
    case '&&': return IF(`${L(e.a!)} ≠ 0 ∧ ${L(e.b!)} ≠ 0`)
    case '||': return IF(`${L(e.a!)} ≠ 0 ∨ ${L(e.b!)} ≠ 0`)
    default: return `(${L(e.a!)} ${e.k} ${L(e.b!)})`
  }
}
// THE FORMULA, WITHOUT ITS COMMENTARY. The families annotate their arithmetic in the same string: a parenthetical
// gloss ("n − 1 (maximum mutually orthogonal mates)"), a tail after a dash or semicolon, a unit ("n · 432 Hz"), and a
// chain of equal names ("P(n, k) = n!/(n−k)!"). The arithmetic is what remains once those are removed — the last
// member of a chain, cut at the gloss, with any parenthetical or trailing word that names no parameter and no known
// function dropped. What is left must still parse in full, so a gloss can never be mistaken for a term.
const FUNCS = new Set(['max', 'min', 'C', 'P', 'gcd', 'ceil', 'log2', 'log10', 'mod', 'and', 'or', 'not'])
const bareOf = (rhs: string, params: Set<string>): string => {
  let r = rhs.split(/\s=\s/).pop()!.split(/\s—\s|;\s|\s–\s/)[0]!.trim()
  const wordy = (x: string): boolean => (x.match(/[A-Za-z_][A-Za-z0-9_']*/g) ?? []).some((w) => !params.has(w) && !FUNCS.has(w) && w.length > 1)
  for (let changed = true; changed;) {
    changed = false
    const m = /\s*\(([^()]*)\)\s*$/.exec(r)
    if (m && wordy(m[1]!) && m.index > 0) { r = r.slice(0, m.index).trim(); changed = true }
    const w = /\s+([A-Za-zµ][A-Za-z0-9µ/]*)\s*$/.exec(r)
    if (w && !params.has(w[1]!) && !FUNCS.has(w[1]!)) { r = r.slice(0, w.index).trim(); changed = true }
  }
  return r
}
const usesOf = (e: Node, k: string): boolean => e.k === k || [e.a, e.b, e.c].some((n) => n !== undefined && usesOf(n, k))

// ── each family: its formulas and docs from its source, its witnesses from its test ──
const keyPart = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
// a family's doc may cite "theorem k"; written into a Lean doc comment, that phrase reads to the ledger's declaration
// parser as a second declaration of k, so the citation is joined with a non-breaking hyphen (theorem‑k)
const docText = (s: string): string => s.replace(/^\s*\*\s?/gm, '').replace(/\s+/g, ' ').replace(/-\//g, '- /').replace(/\btheorem\s+/g, 'theorem\u2011').trim()
const gaps: Record<string, number> = {}
const gap = (why: string): void => { gaps[why] = (gaps[why] ?? 0) + 1 }
const byLetter = new Map<string, Fact[]>()
let families = 0

for (const d of readdirSync(FAM).sort()) {
  const src = join(FAM, d, 'index.ts'), tst = join(FAM, d, 'index.test.ts')
  if (!existsSync(src) || !existsSync(tst)) continue
  const s = readFileSync(src, 'utf8'), t = readFileSync(tst, 'utf8')
  // a method's formula is the first `helper('id', 'formula'` its body calls, whatever the helper is named; its doc is
  // the block comment that ends right before it
  const formOf = (name: string): { formula: string; doc: string } | undefined => {
    const at = s.search(new RegExp(`static ${name}\\(`))
    if (at < 0) return undefined
    const m = /\b[A-Za-z_]\w*\(\s*'[^']*',\s*'([^']*)'/.exec(s.slice(at, at + 4000))
    if (!m) return undefined
    const doc = /\/\*\*([\s\S]*?)\*\/\s*$/.exec(s.slice(0, at))
    return { formula: m[1]!, doc: docText(doc?.[1] ?? '') }
  }
  const witnesses = [...t.matchAll(/(\w+Formulas)\.(\w+)\(([^)]*)\)\.value,\s*(-?\d+)\b/g)]
  if (!witnesses.length) continue
  const mod = await import(pathToFileURL(join(DIST_FAM, d, 'index.js')).href) as Record<string, Record<string, (...x: number[]) => { value: unknown }>>
  families++
  const seen = new Map<string, number>()
  for (const [, cls, name, argText, exp] of witnesses) {
    const form = formOf(name!)
    if (!form) { gap('method shape not read'); continue }
    const eq = form.formula.indexOf(' = ')
    if (eq < 0) { gap('formula states no equation'); continue }
    const lhs = form.formula.slice(0, eq), rhs = form.formula.slice(eq + 3)
    const params = (lhs.match(/\(([^)]*)\)/)?.[1] ?? '').split(',').map((x) => x.trim()).filter(Boolean)
    const args = argText!.split(',').map((x) => x.trim()).filter(Boolean)
    const small = (x: string): boolean => /^-?(?:\d+|0[bB][01]+|0[xX][0-9a-fA-F]+)$/.test(x) && (x.startsWith('-') ? -BigInt(x.slice(1)) : BigInt(x)) > -SAFE && (x.startsWith('-') ? -BigInt(x.slice(1)) : BigInt(x)) < SAFE
    if (args.length !== params.length || !args.every(small) || !small(exp!)) { gap('arguments not integer literals'); continue }
    const big = (x: string): bigint => (x.startsWith('-') ? -BigInt(x.slice(1)) : BigInt(x))
    const env = Object.fromEntries(params.map((p, i) => [p, big(args[i]!)]))
    let e: Node
    try { e = parse(tokens(bareOf(rhs, new Set(params)))) } catch { gap('formula not integer arithmetic'); continue }
    let v: bigint
    try { v = intOf(e, env) } catch { gap('formula not integer arithmetic'); continue }
    if (v !== big(exp!)) { gap('test value disagrees with its formula'); continue }
    const fn = mod[cls!]?.[name!]
    if (typeof fn !== 'function') { gap('method not exported'); continue }
    const n = (seen.get(name!) ?? 0) + 1
    seen.set(name!, n)
    const key = `fam_${keyPart(d)}_${keyPart(name!)}_${n}`
    const call = `${name}(${args.join(', ')})`
    const nums = args.map((a) => Number(big(a))), want = Number(big(exp!))
    const letter = d[0]!.toUpperCase()
    const facts = byLetter.get(letter) ?? []
    facts.push({
      key,
      name: `${d}: ${call} = ${exp}${form.doc ? ` — ${form.doc}` : ''}`,
      js: () => fn.apply(mod[cls!], nums).value === want,
      lean: `theorem ${key} : ${leanOf(e, env)} = ${lit(big(exp!))} := by decide`,
      defs: ['max', 'min', 'fact', 'C', 'P', 'gcd', 'log', 'clog', 'sqrt'].filter((k) => usesOf(e, k)).join(','),
    })
    byLetter.set(letter, facts)
  }
}

const FMAX = 'def fmax (a b : Int) : Int := if a ≤ b then b else a'
const FMIN = 'def fmin (a b : Int) : Int := if a ≤ b then a else b'
const FFACT = 'def ffact : Nat → Nat\n  | 0 => 1\n  | n + 1 => (n + 1) * ffact n'
// C(n, k+1) = C(n, k) · (n − k) / (k + 1), exact at every step: the recursion is k deep, never n deep, so no wing
// needs a raised recursion ceiling for a binomial of a large n
const FCHOOSE = 'def fchoose (n : Nat) : Nat → Nat\n  | 0 => 1\n  | k + 1 => fchoose n k * (n - k) / (k + 1)'
// the rest recurse on a fuel argument the generator passes as a literal larger than any step count a witness below 2^53
// needs (Euclid takes at most ~78 steps there, a binary root or a base-2 log at most 54), so each terminates
// structurally and the kernel's recursion stays shallow
const FPERM = 'def fperm (n : Nat) : Nat → Nat\n  | 0 => 1\n  | k + 1 => fperm n k * (n - k)'
const FGCD = 'def fgcd : Nat → Nat → Nat → Nat\n  | 0, a, _ => a\n  | fuel + 1, a, b => if b = 0 then a else fgcd fuel b (a % b)'
const FLOG = 'def flog (b : Nat) : Nat → Nat → Nat\n  | 0, _ => 0\n  | fuel + 1, n => if n < b then 0 else 1 + flog b fuel (n / b)'
const FCLOG = 'def fclog (b n : Nat) : Nat := if n ≤ 1 then 0 else flog b 64 (n - 1) + 1'
const FSQRT = 'def fsqrtGo (n : Nat) : Nat → Nat → Nat → Nat\n  | 0, lo, _ => lo\n  | fuel + 1, lo, hi => if hi ≤ lo + 1 then lo else if ((lo + hi) / 2) * ((lo + hi) / 2) ≤ n then fsqrtGo n fuel ((lo + hi) / 2) hi else fsqrtGo n fuel lo ((lo + hi) / 2)\ndef fsqrt (n : Nat) : Nat := fsqrtGo n 64 0 (n + 1)'
let sealed = 0
for (const [letter, facts] of [...byLetter].sort()) {
  const needs = new Set(facts.flatMap((f) => (f.defs ?? '').split(',').filter(Boolean)))
  const defs = [needs.has('max') ? FMAX : '', needs.has('min') ? FMIN : '', needs.has('fact') ? FFACT : '', needs.has('C') ? FCHOOSE : '',
    needs.has('P') ? FPERM : '', needs.has('gcd') ? FGCD : '', needs.has('log') || needs.has('clog') ? FLOG : '', needs.has('clog') ? FCLOG : '', needs.has('sqrt') ? FSQRT : ''].filter(Boolean).join('\n')
  sealed += emit({
    file: `Families${letter}.lean`, skill: 'families', defs,
    header: `THE FAMILIES, ${letter} — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns.`,
    facts: facts.map(({ defs: _d, ...f }) => f),
  })
}
const open = Object.values(gaps).reduce((a, b) => a + b, 0)
console.log(`✓ lean-families — ${sealed} witnesses sealed across ${families} families; ${open} still open (${Object.entries(gaps).map(([k, v]) => `${v} ${k}`).join(', ') || 'none'})`)
