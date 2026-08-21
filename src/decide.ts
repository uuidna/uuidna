// decide — THE QUANTUM CALCULATOR, founded on division by zero. The compact core that folds ANY input to a
// lean-green response: {verdict, cites, receipt}. Its arithmetic is TOTAL because the ledger's own laws make it
// total — division by zero is the finite reflection
// DivByZero.lean: dz_zero_only_zero, dz_bounded — exactly Lean's own Nat semantics), subtraction truncates at
// the floor (Nat), and every operation is exact BigInt under honest caps. The route, in order: (1) the SEALED
// INDEX — input matching a sealed theorem's statement verbatim (normalized) is VERIFIED by the kernel's own
// prior decision, cited; (2) the GRAMMAR — a bounded recursive-descent parser (never eval) decides fresh
// arithmetic propositions: true → VERIFIED_BY_DECIDE, false → REFUTED — truth and falsehood at last wear
// different verdicts; a bare expression computes its exact value; (3) PROSE — everything else goes to the gate
// (reveal), language-blind, citations decided by the ledger. Deterministic: no wall-clock, no RNG, no host
// intrinsics; the same input always folds to the same receipt. Integrity— a decided proposition is
// decided ABOUT ITS ARITHMETIC.
import { theorems } from './theorems/index.js'
import { toUuid } from './address.js'
import { reveal } from './gate.js'

export interface Decision {
  input: string
  kind: 'sealed-theorem' | 'decided-arithmetic' | 'computed-value' | 'prose'
  verdict: 'VERIFIED' | 'VERIFIED_BY_DECIDE' | 'REFUTED' | 'UNVERIFIED' | 'DRAINED'
  value: string | null
  cites: string[]
  receipt: string
  honest: string
}

const MAX_INPUT = 2000
const MAX_EXP = 4096n
const MAX_BITS = 4096

// ── the total Nat semantics — the division-by-zero law as code, mirroring the kernel exactly ──
const natSub = (a: bigint, b: bigint): bigint => (a < b ? 0n : a - b)
const natDiv = (a: bigint, b: bigint): bigint => (b === 0n ? 0n : a / b)          // x / 0 = 0 — the reflection
const natMod = (a: bigint, b: bigint): bigint => (b === 0n ? a : a % b)           // x % 0 = x — Lean's own law
const natPow = (a: bigint, b: bigint): bigint => {
  if (b > MAX_EXP) throw new Error('exponent beyond the honest cap')
  let r = 1n
  for (let i = 0n; i < b; i++) { r *= a; if (r >> BigInt(MAX_BITS)) throw new Error('magnitude beyond the honest cap') }
  return r
}

// ── normalization — one spelling for the index and the grammar alike ──
const normalize = (s: string): string => s
  .replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/≠/g, '!=').replace(/∧/g, '&&').replace(/¬/g, '!')
  .replace(/·/g, '*').replace(/−/g, '-').replace(/\s+/g, '')

// the sealed statement index — built once, O(1) thereafter (immutable reads are cached, the law of the repo)
let INDEX: Map<string, string> | null = null
const sealedIndex = (): Map<string, string> => {
  if (!INDEX) {
    INDEX = new Map()
    for (const t of theorems()) INDEX.set(normalize(t.statement), t.key)
  }
  return INDEX
}

// ── the bounded grammar (recursive descent
// prop := cmpOrExpr ('&&' cmpOrExpr)* ; cmp := expr (op expr)? ; expr := term (± term)* ;
// term := pow (*,/,% pow)* ; pow := atom (^ pow)? ; atom := INT | '(' prop ')' | '!' atom
type Val = { b?: boolean; n?: bigint }
class Parser {
  private i = 0
  constructor(private readonly s: string) {}
  private peek(): string { return this.s[this.i] ?? '' }
  private eat(tok: string): boolean { if (this.s.startsWith(tok, this.i)) { this.i += tok.length; return true } return false }
  parse(): Val { const v = this.prop(); if (this.i !== this.s.length) throw new Error('unparsed tail'); return v }
  private prop(): Val {
    let left = this.cmp()
    while (this.eat('&&')) { const right = this.cmp(); left = { b: this.asB(left) && this.asB(right) } }
    return left
  }
  private cmp(): Val {
    const left = this.expr()
    for (const [tok, f] of [
      ['<=', (a: bigint, b: bigint) => a <= b], ['>=', (a: bigint, b: bigint) => a >= b],
      ['!=', (a: bigint, b: bigint) => a !== b], ['==', (a: bigint, b: bigint) => a === b],
      ['=', (a: bigint, b: bigint) => a === b], ['<', (a: bigint, b: bigint) => a < b], ['>', (a: bigint, b: bigint) => a > b],
    ] as const) {
      if (this.eat(tok)) return { b: f(this.asN(left), this.asN(this.expr())) }
    }
    return left
  }
  private expr(): Val {
    let a = this.term()
    for (;;) {
      if (this.eat('+')) a = { n: this.asN(a) + this.asN(this.term()) }
      else if (this.peek() === '-' && !this.s.startsWith('->', this.i)) { this.i++; a = { n: natSub(this.asN(a), this.asN(this.term())) } }
      else return a
    }
  }
  private term(): Val {
    let a = this.pow()
    for (;;) {
      if (this.eat('*')) a = { n: this.asN(a) * this.asN(this.pow()) }
      else if (this.eat('/')) a = { n: natDiv(this.asN(a), this.asN(this.pow())) }
      else if (this.eat('%')) a = { n: natMod(this.asN(a), this.asN(this.pow())) }
      else return a
    }
  }
  private pow(): Val {
    const a = this.atom()
    if (this.eat('^')) return { n: natPow(this.asN(a), this.asN(this.pow())) }
    return a
  }
  private atom(): Val {
    if (this.eat('!')) return { b: !this.asB(this.atom()) }
    if (this.eat('(')) { const v = this.prop(); if (!this.eat(')')) throw new Error('missing )'); return v }
    const m = /^\d+/.exec(this.s.slice(this.i))
    if (!m) throw new Error('expected a number at ' + this.i)
    this.i += m[0].length
    return { n: BigInt(m[0]) }
  }
  private asN(v: Val): bigint { if (v.n === undefined) throw new Error('expected a number'); return v.n }
  private asB(v: Val): boolean { if (v.b === undefined) throw new Error('expected a proposition'); return v.b }
}

/** THE QUANTUM CALCULATOR — any input, one lean-green shape out */
export function decide(input: string): Decision {
  const raw = String(input).slice(0, MAX_INPUT)
  const norm = normalize(raw)
  const seal = (d: Omit<Decision, 'receipt'>): Decision => ({ ...d, receipt: toUuid('decide:' + norm + ':' + d.verdict + ':' + (d.value ?? '')) })

  // (1) the sealed index — the kernel already decided this exact statement
  const hit = sealedIndex().get(norm)
  if (hit) return seal({
    input: raw, kind: 'sealed-theorem', verdict: 'VERIFIED', value: null, cites: [hit],
    honest: `this exact statement IS the sealed theorem ${hit} — the kernel decided it already; nothing recomputed, the citation is the proof`,
  })

  // (2) the grammar — fresh arithmetic, decided totally (division by zero is the reflection
  try {
    const v = new Parser(norm).parse()
    if (v.b !== undefined) return seal({
      input: raw, kind: 'decided-arithmetic', verdict: v.b ? 'VERIFIED_BY_DECIDE' : 'REFUTED', value: String(v.b),
      cites: ['dz_zero_only_zero', 'dz_bounded'],
      honest: v.b
        ? 'decided TRUE by exact total arithmetic (Nat semantics: x/0 = 0, truncated subtraction) — true of the ARITHMETIC, a fresh decision not yet a sealed theorem'
        : 'REFUTED by exact total arithmetic — decidably false, at last distinguishable from merely unbacked',
    })
    return seal({
      input: raw, kind: 'computed-value', verdict: 'VERIFIED_BY_DECIDE', value: String(v.n),
      cites: ['dz_zero_only_zero', 'dz_bounded'],
      honest: `computed exactly: ${raw.trim()} = ${v.n} under total Nat semantics — division by zero returns 0 (the finite reflection), subtraction floors at 0, every step exact`,
    })
  } catch { /* not arithmetic — fall through to prose */ }

  // (3) prose — the gate, language-blind, the ledger deciding the citations
  const r = reveal(raw)
  return seal({
    input: raw, kind: 'prose', verdict: r.verdict, value: null, cites: r.cites,
    honest: r.reveal,
  })
}
