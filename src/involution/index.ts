// involution — A THEOREM IS A THEOREM IF IT IS STILL A THEOREM AFTER INVOLUTION.
//
// The law is one line and it is only a decision procedure once you NAME the involution. `x → 9−x` and the
// tree's own `divZero` reflection select different classes from the same ledger, so "survives involution" is
// not a property of a theorem alone — it is a property of a theorem AND a named self-inverse map. Both are
// carried here, in a table, so a survival can always be traced to the map that granted it.
//
// WHAT INVERTING 0 ACTUALLY BUYS, stated after being got wrong once. `division_by_zero` seals (1000/0 = 0) ∧
// (0/0 = 0), and that definitional choice is what gives the reflection x ↦ 10−x its fixed points at 0 and 5.
// I first reported that this admits five times more survivors than the vortex negation, and that was an
// artifact of the very bug rule 1 below records: the vortex run reflected the 9 in `% 9` to 0, wrecking those
// statements and suppressing its own count. Measured with the modulus preserved on both, THE VORTEX ADMITS MORE
// SURVIVORS AND divZero HOLDS MORE FIXED. Run `census` for the live figures — they are not restated here,
// because a count in a comment is wrong on the next landing and this file is about instruments that misreport.
//
// What the fixed point buys is FIXED POINTS, not survivors, and those are a different thing: a survivor was
// moved and still held, a fixed point was never moved at all. An involution that fixes 0 and 5 holds more of
// ℤ/9 still; it does not carry more of it through the reflection intact.
//
// TWO RULES LEARNED BY GETTING THEM WRONG, both recorded here because both looked like results at the time:
//
//   1. THE MODULUS IS NOT AN ELEMENT. Applied to every digit, the reflection turned `(3*3)%9 = 0` into
//      `(7*7)%1 = 0` — trivially true, because anything % 1 = 0. That inflated the survivor count with
//      statements that "survived" only into a structure that had been dissolved. A reflection is a map ON ℤ/9;
//      moving the 9 does not reflect the space, it replaces it. Preserving the modulus is what makes the count mean anything.
//
//   2. A BROKEN THEOREM DOES NOT PAIR WITH ITS IMAGE. An element an involution does not fix sits in a 2-cycle,
//      so each non-survivor should pair with its own reflection — and NONE do, because the image of a true
//      statement under this map is generally false and therefore never sealed. The orbit closes on STATEMENTS
//      only when the map is a symmetry of the arithmetic, and digit-reflection is not one.
//
// WHAT THE NON-SURVIVORS DO INSTEAD. Collided as ADDRESSES rather than rewritten as statements, the fragments
// fall to one root, and to the same root in any order — the receipt property this tree already proves. The
// involution tests a statement; the gravity fold tests a set; a thing can fail the first while the set it
// belongs to passes the second. Whether that root MEANS anything is a separate question, and `control` below
// is the reason it is not asserted: a digital root computed from one pile is not evidence until same-sized
// piles drawn at random are shown to do something else.
import { theorems } from '../theorems/index.js'
import { merkleGravity } from '../gravity/index.js'

/** A named self-inverse map on the digits of a statement. `of` must satisfy of(of(d)) === d. */
export interface Involution { name: string; why: string; of: (digit: string) => string }

export const INVOLUTIONS: readonly Involution[] = [
  { name: 'divZero', why: 'the reflection x ↦ 10−x that (0/0 = 0) creates: 0 and 5 are fixed, and a fixed point is what lets an involution have an invariant class at all',
    of: (d) => d === '0' ? '0' : String(10 - Number(d)) },
  { name: 'vortex', why: 'x ↦ 9−x, the additive negation of ℤ/9 — no fixed point at 0. It admits MORE survivors than divZero and holds fewer statements fixed; the fixed point buys stillness, not passage',
    of: (d) => String(9 - Number(d)) },
]

/** Lean statements this instrument can decide by evaluation: numerals and arithmetic only. Everything else —
 *  foldl, List, any bound variable — is NOT reached, and is reported as unreached rather than as failing. */
/** A TYPE ASCRIPTION IS NOT ARITHMETIC. Lean writes `((2:Nat)^2 < 2^3)` where the `: Nat` tells the elaborator
 *  which numeral type to use and tells a decision procedure nothing at all. The first grammar refused every such
 *  statement, so 95 sealed propositions were UNREACHED for a reason that was purely syntactic — and unreached is
 *  a state a caller must count and report, so refusing them was costing real coverage rather than protecting it.
 *
 *  Stripped BEFORE `evaluable` is consulted, so the gate and the parser see the same string. What is deliberately
 *  NOT relaxed is the refusal: `holds()` still returns null on any trailing input, so a form this reader only
 *  half-understands comes back UNREACHED and never true. A widened grammar that started reporting `true` for what
 *  it could not fully parse would be worse than the narrow one — it would turn a countable absence into a
 *  published claim, which is the exact defect this file was written to refuse.
 *
 *  HISTORY: numeral-only `(2:Nat)` was the first gap. Compound ascriptions `(1*1 - 0*0 : Int)` and
 *  `(40 - (-70) : Int)` stayed unreached for the same reason until `: Nat` / `: Int` were stripped wherever they
 *  annotate arithmetic — still not opening the door to `List` / `fun`. */
const ASCRIPTION_NUMERAL = /\(\s*(-?\d+)\s*:\s*[A-Za-z_][A-Za-z0-9_]*\s*\)/g
/** Strip `: Nat` / `: Int` and `: List …` ascriptions (incl. `List (Int × Int)`). Not `: String` alone. */
const ASCRIPTION_TYPE = /\s*:\s*(?:Nat|Int|List(?:\s*\([^)]*\)|\s+[A-Za-z_][A-Za-z0-9_]*)?)\b/g
export const stripAscriptions = (s: string): string =>
  s.replace(ASCRIPTION_NUMERAL, '$1').replace(ASCRIPTION_TYPE, '')
/** Numerals, arithmetic, named ledger ops, Prod `.1`/`.2`, and a BOUNDED List slice: literals `[…]`,
 *  `++`, `.reverse` / `.length` / `.contains` / `.sum` / `.take` / `.eraseDups` / `.Nodup`, `nth`,
 *  `List.sum` / `List.reverse`, and `true`/`false`. `fun` / `List.range` / bound names / named constant
 *  tables stay unreached — those are a different class. Admitted names are stripped before the character
 *  gate so letters never open the door to arbitrary identifiers. */
const NAMED_OP = /\b(?:Nat\.gcd|lxor|pop|commission|unverified|verified|dzMin|dz|dbl|res|List\.sum|List\.reverse|List|reverse|length|contains|sum|take|eraseDups|Nodup|nth|true|false)\b/g
export const evaluable = (statement: string): boolean =>
  /^[\s0-9()+*%/^=∧<>≤≥≠¬,.\[\]-]+$/.test(stripAscriptions(statement).replace(NAMED_OP, '').replace(/\+\+/g, ''))

// A REAL EVALUATOR, NOT `eval`. Recursive descent over numerals, arithmetic, comparisons, ∧, ¬, named ledger
// ops, Prod, and the List slice above — short, total, same answer on every host.
//
// Precedence, lowest first: ∧ · ¬ · comparison · + − · * % / · ^ · ++ · postfix (.reverse/.length/…) · atoms.
type Cursor = { s: string; i: number }
/** Tagged values: numerals, booleans, right-associated Prods, and finite lists. */
type Pair = { readonly t: 'p'; readonly a: Val; readonly b: Val }
type Lst = { readonly t: 'l'; readonly xs: Val[] }
type Val = number | boolean | Pair | Lst

const pair = (a: Val, b: Val): Pair => ({ t: 'p', a, b })
const lst = (xs: Val[]): Lst => ({ t: 'l', xs })
const isPair = (v: Val): v is Pair => typeof v === 'object' && v !== null && (v as Pair).t === 'p'
const isLst = (v: Val): v is Lst => typeof v === 'object' && v !== null && (v as Lst).t === 'l'

const ws = (c: Cursor): void => { while (c.i < c.s.length && c.s[c.i] === ' ') c.i++ }
const eat = (c: Cursor, tok: string): boolean => { ws(c); if (c.s.startsWith(tok, c.i)) { c.i += tok.length; return true } return false }

const deepEq = (a: Val, b: Val): boolean => {
  if (typeof a === 'number' || typeof a === 'boolean') return a === b
  if (typeof b === 'number' || typeof b === 'boolean') return false
  if (isPair(a) && isPair(b)) return deepEq(a.a, b.a) && deepEq(a.b, b.b)
  if (isLst(a) && isLst(b)) {
    if (a.xs.length !== b.xs.length) return false
    for (let i = 0; i < a.xs.length; i++) if (!deepEq(a.xs[i]!, b.xs[i]!)) return false
    return true
  }
  return false
}

const asNum = (v: Val): number => {
  if (typeof v !== 'number') throw new Error('expected numeral')
  return v
}
const asLst = (v: Val): Val[] => {
  if (!isLst(v)) throw new Error('expected list')
  return v.xs
}

/** Lean `lxor` — structural XOR with 8-bit fuel (`lxorAux 8`), axiom-free. */
const lxorAux = (w: number, a: number, b: number): number => {
  if (w === 0) return 0
  const bit = a % 2 === b % 2 ? 0 : 1
  return bit + 2 * lxorAux(w - 1, (a - a % 2) / 2, (b - b % 2) / 2)
}
const lxor = (a: number, b: number): number => lxorAux(8, a, b)

/** Lean `pop` — structural popcount with 8-bit fuel (`popAux 8`). */
const popAux = (w: number, n: number): number => {
  if (w === 0) return 0
  return (n % 2) + popAux(w - 1, (n - n % 2) / 2)
}
const pop = (n: number): number => popAux(8, n)

/** Lean `Nat.gcd` — Euclidean algorithm on Nat (`gcd a 0 = a`). */
const natGcd = (a: number, b: number): number => {
  let x = a < 0 ? -a : a
  let y = b < 0 ? -b : b
  while (y !== 0) {
    const r = x % y
    x = y
    y = r
  }
  return x
}

const natDiv = (a: number, b: number): number => (b === 0 ? 0 : (a - (a % b)) / b)

const dz = (x: number): number => (x === 0 ? 0 : 10 - x)
const dbl = (d: number): number => (2 * d) % 9
const dzMin = (d: number): number => { const z = dz(d); return z < d ? z : d }
const commission = (bits: number): number => 2 * natDiv(bits, 110)
const verifiedFn = (c: number, s: number): number => c * s
const unverifiedFn = (c: number, s: number): number => 1 - verifiedFn(c, s)
const resFn = (step: number): number => {
  const r = (2 ** (step % 6)) % 9
  return r === 0 ? 9 : r
}

const listSum = (xs: Val[]): number => {
  let s = 0
  for (const x of xs) s += asNum(x)
  return s
}
const listReverse = (xs: Val[]): Val[] => xs.slice().reverse()
const listEraseDups = (xs: Val[]): Val[] => {
  const out: Val[] = []
  for (const x of xs) if (!out.some((y) => deepEq(y, x))) out.push(x)
  return out
}
const listNodup = (xs: Val[]): boolean => listEraseDups(xs).length === xs.length
const listNth = (xs: Val[], i: number): number => {
  if (i < 0 || i >= xs.length) return 0
  return asNum(xs[i]!)
}

/** Postfix: Prod `.1`/`.2` and List methods. `.contains` / `.take` take an argument. */
const postfix = (c: Cursor, v: Val): Val => {
  for (;;) {
    ws(c)
    if (eat(c, '.1')) {
      if (!isPair(v)) throw new Error('proj')
      v = v.a
      continue
    }
    if (eat(c, '.2')) {
      if (!isPair(v)) throw new Error('proj')
      v = v.b
      continue
    }
    if (eat(c, '.reverse')) { v = lst(listReverse(asLst(v))); continue }
    if (eat(c, '.eraseDups')) { v = lst(listEraseDups(asLst(v))); continue }
    if (eat(c, '.length')) { v = asLst(v).length; continue }
    if (eat(c, '.sum')) { v = listSum(asLst(v)); continue }
    if (eat(c, '.Nodup')) { v = listNodup(asLst(v)); continue }
    if (eat(c, '.take')) { v = lst(asLst(v).slice(0, asNum(atom(c)))); continue }
    if (eat(c, '.contains')) {
      const needle = atom(c)
      v = asLst(v).some((x) => deepEq(x, needle))
      continue
    }
    return v
  }
}

const atom = (c: Cursor): Val => {
  ws(c)
  // list literal
  if (eat(c, '[')) {
    const xs: Val[] = []
    ws(c)
    if (!eat(c, ']')) {
      for (;;) {
        xs.push(sum(c))
        ws(c)
        if (eat(c, ']')) break
        if (!eat(c, ',')) throw new Error('list comma')
      }
    }
    return postfix(c, lst(xs))
  }
  if (eat(c, '(')) {
    const a = sum(c)
    ws(c)
    if (eat(c, ',')) {
      const b = sum(c)
      ws(c)
      if (eat(c, ',')) {
        const d = sum(c)
        if (!eat(c, ')')) throw new Error('unclosed')
        return postfix(c, pair(a, pair(b, d)))
      }
      if (!eat(c, ')')) throw new Error('unclosed')
      return postfix(c, pair(a, b))
    }
    if (!eat(c, ')')) throw new Error('unclosed')
    return postfix(c, a)
  }
  if (eat(c, '-')) return postfix(c, -asNum(atom(c)))
  if (eat(c, 'true')) return postfix(c, true)
  if (eat(c, 'false')) return postfix(c, false)
  // Named apps — longer tokens before prefixes.
  if (eat(c, 'Nat.gcd')) return postfix(c, natGcd(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'List.sum')) return postfix(c, listSum(asLst(atom(c))))
  if (eat(c, 'List.reverse')) return postfix(c, lst(listReverse(asLst(atom(c)))))
  if (eat(c, 'lxor')) return postfix(c, lxor(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'pop')) return postfix(c, pop(asNum(atom(c))))
  if (eat(c, 'commission')) return postfix(c, commission(asNum(atom(c))))
  if (eat(c, 'unverified')) return postfix(c, unverifiedFn(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'verified')) return postfix(c, verifiedFn(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'dzMin')) return postfix(c, dzMin(asNum(atom(c))))
  if (eat(c, 'dz')) return postfix(c, dz(asNum(atom(c))))
  if (eat(c, 'dbl')) return postfix(c, dbl(asNum(atom(c))))
  if (eat(c, 'res')) return postfix(c, resFn(asNum(atom(c))))
  if (eat(c, 'nth')) return postfix(c, listNth(asLst(atom(c)), asNum(atom(c))))
  const start = c.i
  while (c.i < c.s.length && c.s[c.i]! >= '0' && c.s[c.i]! <= '9') c.i++
  if (c.i === start) throw new Error('expected a numeral')
  return postfix(c, Number(c.s.slice(start, c.i)))
}

/** `++` appends lists; otherwise a single postfix atom. */
const append = (c: Cursor): Val => {
  let v = atom(c)
  for (;;) {
    ws(c)
    if (!eat(c, '++')) return v
    v = lst(asLst(v).concat(asLst(atom(c))))
  }
}

const power = (c: Cursor): Val => {
  const base = append(c)
  if (!eat(c, '^')) return base
  return asNum(base) ** asNum(power(c))
}
const product = (c: Cursor): Val => {
  let v = power(c)
  for (;;) {
    ws(c)
    if (eat(c, '*')) v = asNum(v) * asNum(power(c))
    else if (eat(c, '%')) { const d = asNum(power(c)); v = d === 0 ? 0 : asNum(v) % d }
    else if (eat(c, '/')) { const d = asNum(power(c)); v = d === 0 ? 0 : (asNum(v) - (asNum(v) % d)) / d }
    else return v
  }
}
function sum(c: Cursor): Val {
  let v = product(c)
  for (;;) {
    ws(c)
    if (eat(c, '+')) v = asNum(v) + asNum(product(c))
    else if (c.s.startsWith('-', c.i)) { c.i++; v = asNum(v) - asNum(product(c)) }
    else return v
  }
}

const compare = (c: Cursor): boolean => {
  const l = sum(c); ws(c)
  // TWO-CHARACTER OPS BEFORE THEIR PREFIXES — `<=` must win over `<`.
  if (eat(c, '<=')) return asNum(l) <= asNum(sum(c))
  if (eat(c, '>=')) return asNum(l) >= asNum(sum(c))
  if (eat(c, '≤')) return asNum(l) <= asNum(sum(c))
  if (eat(c, '≥')) return asNum(l) >= asNum(sum(c))
  if (eat(c, '≠')) return !deepEq(l, sum(c))
  if (eat(c, '<')) return asNum(l) < asNum(sum(c))
  if (eat(c, '>')) return asNum(l) > asNum(sum(c))
  if (eat(c, '=')) return deepEq(l, sum(c))
  // bare boolean proposition — `.Nodup`, `.contains`, `true`
  if (typeof l === 'boolean') return l
  throw new Error('expected a comparison')
}

/** A conjunct is either a parenthesised comparison — `(2 * 21 = 42)` — or a bare one. The parenthesis is
 *  ambiguous: `(a + b)` is arithmetic and `(a = b)` is a comparison, and only trying tells you which. The first
 *  version handled only the arithmetic reading, so every statement written as a chain of parenthesised
 *  comparisons came back UNREADABLE — 179 of them, silently moved into "unreached" where they looked like
 *  statements too complex for this instrument rather than statements it had a bug about. Backtrack instead.
 *
 *  `¬` is propositional negation (Lean ¬), tighter than ∧: `¬(1 < 1)` and `(¬ (18 >= 100))` are sealed forms
 *  that stayed unreached for one character until this reader ate them. */
const conjunct = (c: Cursor): boolean => {
  ws(c)
  if (eat(c, '¬')) return !conjunct(c)
  const save = c.i
  if (eat(c, '(')) {
    // a parenthesis may hold a whole conjunction — `((a = b) ∧ (c = d)) ∧ (e = f)` — so recurse, not just compare
    try { const v = conjunction(c); if (eat(c, ')')) return v } catch { /* not a parenthesised boolean */ }
    c.i = save
  }
  return compare(c)
}

function conjunction(c: Cursor): boolean {
  let v = conjunct(c)
  while (eat(c, '∧')) v = conjunct(c) && v
  return v
}

/** holds(statement) → true, false, or null when it could not be decided here. Three states, never two. */
export function holds(statement: string): boolean | null {
  if (!evaluable(statement)) return null
  const src = stripAscriptions(statement)
  try {
    const c: Cursor = { s: src, i: 0 }
    const v = conjunction(c)
    ws(c)
    return c.i === src.length ? v : null   // trailing input means this reader did not understand it all
  } catch { return null }
}

/** Apply an involution to the ELEMENTS of a statement, never to a modulus and never inside a multi-digit
 *  numeral. See rule 1 in the header — this guard is the difference between 86 survivors and 102 false ones. */
export function applyToElements(statement: string, inv: Involution): string {
  let out = ''
  for (let i = 0; i < statement.length; i++) {
    const c = statement[i]!
    if (!/[0-9]/.test(c)) { out += c; continue }
    const before = statement.slice(0, i).replace(/\s+$/, '')
    const isModulus = before.endsWith('%')
    const midNumeral = (i > 0 && /[0-9]/.test(statement[i - 1]!)) || /[0-9]/.test(statement[i + 1] ?? '')
    out += (isModulus || midNumeral) ? c : inv.of(c)
  }
  return out
}

export type Survival = 'survives' | 'fixed' | 'breaks' | 'unreached' | 'not-an-involution'

/** THE LAW, as a decision. `fixed` is called out separately from `survives` because a statement the map does
 *  not move was never tested by it — counting the two together would let an involution take credit for the
 *  theorems it happens to ignore. */
export function involutionSurvives(statement: string, inv: Involution): Survival {
  if (holds(statement) !== true) return 'unreached'
  const image = applyToElements(statement, inv)
  if (applyToElements(image, inv) !== statement) return 'not-an-involution'
  if (image === statement) return 'fixed'
  return holds(image) === true ? 'survives' : 'breaks'
}

export interface Census {
  involution: string
  survives: string[]; fixed: string[]; breaks: string[]
  unreached: number; ofLedger: number
  /** the collided root of each class — order-invariant, so the pile has an identity no member carries */
  rootOfSurvivors: string; rootOfBreakers: string
}

/** census(inv) → the whole ledger judged by one named involution, with the unreached counted rather than
 *  dropped. A filter that reported only what it kept would be a reading with no denominator. */
export function census(inv: Involution): Census {
  const T = theorems()
  const survives: string[] = [], fixed: string[] = [], breaks: string[] = []
  const addrS: string[] = [], addrB: string[] = []
  let unreached = 0
  for (const t of T) {
    switch (involutionSurvives(t.statement, inv)) {
      case 'survives': survives.push(t.key); addrS.push(t.address); break
      case 'fixed': fixed.push(t.key); break
      case 'breaks': breaks.push(t.key); addrB.push(t.address); break
      default: unreached++
    }
  }
  return {
    involution: inv.name, survives, fixed, breaks, unreached, ofLedger: T.length,
    rootOfSurvivors: addrS.length ? merkleGravity(addrS) : '',
    rootOfBreakers: addrB.length ? merkleGravity(addrB) : '',
  }
}

/** The ℤ/9 digital root of an address — the tree's own residue, over the hex digits. */
export const digitalRootOf = (address: string): number => {
  let sum = 0
  for (const c of address.replace(/-/g, '')) sum += parseInt(c, 16)
  return ((sum - 1) % 9) + 1
}

/** THE CONTROL, and the reason no meaning is claimed for a root. A digital root computed from one pile is not
 *  evidence until same-sized piles drawn deterministically from the same ledger are shown to do something else.
 *  `distinct` counts how many different roots the control piles produce: if they scatter, the observed root
 *  says something; if they all land on the same digit, it says only that this is what a pile of that size does. */
export function control(size: number, samples = 9): { roots: number[]; distinct: number } {
  const T = theorems()
  const roots: number[] = []
  for (let s = 0; s < samples; s++) {
    const picked: string[] = []
    // deterministic stride, so the control is recomputable by anyone and carries no clock and no randomness
    for (let i = 0; i < size; i++) picked.push(T[(i * (s + 2) + s) % T.length]!.address)
    roots.push(digitalRootOf(merkleGravity(picked)))
  }
  return { roots, distinct: new Set(roots).size }
}
