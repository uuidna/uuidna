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

// ── a formula's right-hand side, read as Nat arithmetic (anything else is refused, never guessed) ──
type Node = { k: 'n'; v: bigint } | { k: 'v'; name: string } | { k: string; a: Node; b: Node }
const tokens = (s: string): string[] => s.replace(/⌊/g, '(').replace(/⌋/g, ')').replace(/[·×]/g, '*').replace(/−/g, '-').match(/\d+|[A-Za-z_][A-Za-z0-9_]*|[-+*/%^(),]|\S/g) ?? []
function parse(ts: string[]): Node {
  let i = 0
  const peek = (): string | undefined => ts[i]
  const next = (): string | undefined => ts[i++]
  const want = (t: string): void => { if (next() !== t) throw new Error(`expected ${t}`) }
  const prim = (): Node => {
    const t = next()
    if (t === undefined) throw new Error('ends early')
    if (/^\d+$/.test(t)) return { k: 'n', v: BigInt(t) }
    if (t === '(') { const e = sum(); want(')'); return e }
    if ((t === 'max' || t === 'min') && peek() === '(') { next(); const a = sum(); want(','); const b = sum(); want(')'); return { k: t, a, b } }
    if (/^[A-Za-z_]/.test(t)) return { k: 'v', name: t }
    throw new Error(`not Nat arithmetic: ${t}`)
  }
  const pow = (): Node => { let a = prim(); while (peek() === '^') { next(); a = { k: '^', a, b: prim() } } return a }
  const mul = (): Node => { let a = pow(); while (peek() === '*' || peek() === '/' || peek() === '%') { const o = next()!; a = { k: o, a, b: pow() } } return a }
  const sum = (): Node => { let a = mul(); while (peek() === '+' || peek() === '-') { const o = next()!; a = { k: o, a, b: mul() } } return a }
  const e = sum()
  if (i !== ts.length) throw new Error(`trailing ${ts.slice(i).join('')}`)
  return e
}
const natOf = (e: Node, env: Record<string, bigint>): bigint => {
  if (e.k === 'n') return (e as { v: bigint }).v
  if (e.k === 'v') { const n = (e as { name: string }).name; if (!(n in env)) throw new Error(`unbound ${n}`); return env[n]! }
  const { a, b } = e as { a: Node; b: Node }
  const x = natOf(a, env), y = natOf(b, env)
  switch (e.k) {
    case '+': return x + y
    case '-': return x > y ? x - y : 0n
    case '*': return x * y
    case '/': return y === 0n ? 0n : x / y
    case '%': return y === 0n ? x : x % y
    case '^': if (y > 64n) throw new Error('exponent past 64'); return x ** y
    case 'max': return x < y ? y : x
    default: return x < y ? x : y
  }
}
const leanOf = (e: Node, env: Record<string, bigint>): string => {
  if (e.k === 'n') return String((e as { v: bigint }).v)
  if (e.k === 'v') return String(env[(e as { name: string }).name])
  const { a, b } = e as { a: Node; b: Node }
  if (e.k === 'max' || e.k === 'min') return `(f${e.k} ${leanOf(a, env)} ${leanOf(b, env)})`
  return `(${leanOf(a, env)} ${e.k} ${leanOf(b, env)})`
}
const usesOf = (e: Node, k: string): boolean => e.k === k || ('a' in e && (usesOf(e.a, k) || usesOf(e.b, k)))

// ── each family: its formulas and docs from its source, its witnesses from its test ──
const keyPart = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
const docText = (s: string): string => s.replace(/^\s*\*\s?/gm, '').replace(/\s+/g, ' ').replace(/-\//g, '- /').trim()
const gaps: Record<string, number> = {}
const gap = (why: string): void => { gaps[why] = (gaps[why] ?? 0) + 1 }
const byLetter = new Map<string, Fact[]>()
let families = 0

for (const d of readdirSync(FAM).sort()) {
  const src = join(FAM, d, 'index.ts'), tst = join(FAM, d, 'index.test.ts')
  if (!existsSync(src) || !existsSync(tst)) continue
  const s = readFileSync(src, 'utf8'), t = readFileSync(tst, 'utf8')
  const forms = new Map<string, { formula: string; doc: string }>()
  for (const m of s.matchAll(/(?:\/\*\*([\s\S]*?)\*\/\s*)?static (\w+)\(([^)]*)\)[^{]*\{\s*return c\('[^']*',\s*'([^']*)'/g)) forms.set(m[2]!, { formula: m[4]!, doc: docText(m[1] ?? '') })
  const witnesses = [...t.matchAll(/(\w+Formulas)\.(\w+)\(([^)]*)\)\.value,\s*(\d+)\b/g)]
  if (!witnesses.length) continue
  const mod = await import(pathToFileURL(join(DIST_FAM, d, 'index.js')).href) as Record<string, Record<string, (...x: number[]) => { value: unknown }>>
  families++
  const seen = new Map<string, number>()
  for (const [, cls, name, argText, exp] of witnesses) {
    const form = forms.get(name!)
    if (!form) { gap('method shape not read'); continue }
    const [lhs, rhs] = form.formula.split(/\s=\s/)
    if (!rhs) { gap('formula states no equation'); continue }
    const params = (lhs!.match(/\(([^)]*)\)/)?.[1] ?? '').split(',').map((x) => x.trim()).filter(Boolean)
    const args = argText!.split(',').map((x) => x.trim()).filter(Boolean)
    if (args.length !== params.length || !args.every((a) => /^\d+$/.test(a) && BigInt(a) < SAFE) || BigInt(exp!) >= SAFE) { gap('arguments not Nat literals'); continue }
    const env = Object.fromEntries(params.map((p, i) => [p, BigInt(args[i]!)]))
    let e: Node
    try { e = parse(tokens(rhs)) } catch { gap('formula not Nat arithmetic'); continue }
    let v: bigint
    try { v = natOf(e, env) } catch { gap('formula not Nat arithmetic'); continue }
    if (v !== BigInt(exp!)) { gap('test value disagrees with its formula'); continue }
    const fn = mod[cls!]?.[name!]
    if (typeof fn !== 'function') { gap('method not exported'); continue }
    const n = (seen.get(name!) ?? 0) + 1
    seen.set(name!, n)
    const key = `fam_${keyPart(d)}_${keyPart(name!)}_${n}`
    const call = `${name}(${args.join(', ')})`
    const nums = args.map(Number), want = Number(exp)
    const letter = d[0]!.toUpperCase()
    const facts = byLetter.get(letter) ?? []
    facts.push({
      key,
      name: `${d}: ${call} = ${exp}${form.doc ? ` — ${form.doc}` : ''}`,
      js: () => fn.apply(mod[cls!], nums).value === want,
      lean: `theorem ${key} : ${leanOf(e, env)} = ${exp} := by decide`,
      defs: [usesOf(e, 'max') ? 'max' : '', usesOf(e, 'min') ? 'min' : ''].filter(Boolean).join(','),
    })
    byLetter.set(letter, facts)
  }
}

const FMAX = 'def fmax (a b : Nat) : Nat := if a ≤ b then b else a'
const FMIN = 'def fmin (a b : Nat) : Nat := if a ≤ b then a else b'
let sealed = 0
for (const [letter, facts] of [...byLetter].sort()) {
  const needs = new Set(facts.flatMap((f) => (f.defs ?? '').split(',').filter(Boolean)))
  const defs = [needs.has('max') ? FMAX : '', needs.has('min') ? FMIN : ''].filter(Boolean).join('\n')
  sealed += emit({
    file: `Families${letter}.lean`, skill: 'families', defs,
    header: `THE FAMILIES, ${letter} — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns.`,
    facts: facts.map(({ defs: _d, ...f }) => f),
  })
}
const open = Object.values(gaps).reduce((a, b) => a + b, 0)
console.log(`✓ lean-families — ${sealed} witnesses sealed across ${families} families; ${open} still open (${Object.entries(gaps).map(([k, v]) => `${v} ${k}`).join(', ') || 'none'})`)
