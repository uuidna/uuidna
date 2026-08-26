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
/** Strip `: List …` (incl. `List (Int × Int)`). Trailing `\b` must not follow `)` — it would refuse the
 *  parenthesised List form and leave `(Int × Int)` as junk. `: Nat` / `: Int` are REWRITTEN to `Nat(…)` /
 *  `Int(…)` so the evaluator keeps Lean's ring (Nat saturating − vs Int true − / emod), not deleted. */
const ASCRIPTION_LIST = /\s*:\s*List(?:\s*\([^)]*\)|\s+[A-Za-z_][A-Za-z0-9_]*)?/g
export const stripAscriptions = (s: string): string => {
  let out = s.replace(ASCRIPTION_LIST, '')
  // Innermost `(expr : Nat|Int)` — expr may hold nested parens (`(40 - (-70) : Int)`).
  for (;;) {
    const re = /:\s*(Int|Nat)\s*\)/g
    let found: RegExpExecArray | null = null
    let m: RegExpExecArray | null
    while ((m = re.exec(out))) found = m
    if (!found) break
    const ty = found[1]!
    const close = found.index + found[0].length - 1
    let depth = 1
    let i = found.index - 1
    while (i >= 0 && depth > 0) {
      const ch = out[i]!
      if (ch === ')') depth++
      else if (ch === '(') depth--
      i--
    }
    if (depth !== 0) break
    const open = i + 1
    const expr = out.slice(open + 1, found.index).trim()
    // Fun binders `(a b c : Nat)` / `(x : Nat)` — drop the type only; do not wrap as `Nat(a b c)`.
    if (/^[A-Za-z_][A-Za-z0-9_]*(?:\s+[A-Za-z_][A-Za-z0-9_]*)*$/.test(expr)) {
      out = out.slice(0, found.index).replace(/\s*$/, '') + out.slice(close)
      continue
    }
    out = out.slice(0, open) + `${ty}(${expr})` + out.slice(close + 1)
  }
  return out
}
/** Numerals, arithmetic, named ledger ops, Prod `.1`/`.2`, and a BOUNDED List slice: literals `[…]` (Nat and
 *  String), `++`, `.reverse` / `.length` / `.contains` / `.sum` / `.take` / `.eraseDups` / `.Nodup`, `nth`,
 *  `List.sum` / `List.reverse` / `List.range` / `List.range'`, `rowsOf`, `preOf` (named `dz`/`dbl` only),
 *  `true`/`false`, `&&`/`||`, `if/then/else`, `.foldl` (dot / fun / Nat.min·max), `.flatMap`/`.zipWith`/`.flatten`,
 *  and bounded `fun` (multi-binder) with `.all`/`.map`/`.filter`/`.any`. Sealed Legal/Audit/Command/Editor mirrors
 *  (`lp`/`flag`/`accept`/`dfold`/…) stay name-gated. Admitted names are stripped before the character gate. */
const NAMED_OP = /\b(?:Nat\.gcd|Nat\.min|Nat\.max|Nat\.ble|Int\.ofNat|lxor|pop|wt|commission|unverified|verified|dzMin|dz|dbl|res|List\.sum|List\.reverse|List\.range'|List\.range|List|rowsOf|preOf|reverse|length|contains|sum|take|drop|eraseDups|Nodup|nth|foldl|flatMap|zipWith|flatten|scanl|headD|all|map|filter|any|zip|getLast|find|fun|true|false|if|then|else|decide|Int|Nat|let|some|divZero|ap|tour|units9|units|carries9|polar|saltConv|saltSeq|invB|sig|tau|kap|caps|agl|words|av|bv|comp|fibCycle|lp|lr|lnp|lrem|flag|accept|dfold|max|min|ble|ofNat|∀)\b/g
/** Drop Lean line comments so sealed theorems with `-- …` stay reachable. */
const stripComments = (s: string): string => s.replace(/--[^\n]*/g, ' ')
/** Drop string literal bodies so Unicode readings (bg/zh/…) do not fail the character gate. */
const stripStrings = (s: string): string => s.replace(/"(?:[^"]*)"/g, '""')
/** Strip `fun … =>` / `let r :=` binders (and their uses) so the character gate stays letter-free. */
const stripFunBinders = (s: string): string => {
  const binders: string[] = []
  const TYPEISH = new Set(['Nat', 'Int', 'List', 'Bool', 'Prod', 'Option', 'String', 'Unit'])
  let out = s.replace(/\bfun\b([\s\S]*?)=>/g, (_full, mid: string) => {
    const ids = mid.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) || []
    for (const id of ids) if (!TYPEISH.has(id)) binders.push(id)
    return ' '
  })
  out = out.replace(/\blet\s+([A-Za-z_][A-Za-z0-9_]*)\s*:=/g, (_, id: string) => {
    binders.push(id)
    return ' '
  })
  out = out.replace(/∀\s+([A-Za-z_][A-Za-z0-9_]*)/g, (_, id: string) => {
    binders.push(id)
    return ' '
  })
  binders.sort((a, b) => b.length - a.length)
  for (const b of binders) out = out.replace(new RegExp('\\b' + b + '\\b', 'g'), ' ')
  return out.replace(/=>/g, ' ').replace(/:=/g, ' ').replace(/==/g, ' ').replace(/!=/g, ' ').replace(/\|\|/g, ' ')
    .replace(/;/g, ' ').replace(/×/g, ' ').replace(/\b_\b/g, ' ')
}
export const evaluable = (statement: string): boolean =>
  /^[\s0-9()+*%/^=∧<>≤≥≠¬,.\[\]"\\&'|·?!;:→∈-]+$/.test(
    stripFunBinders(stripStrings(stripAscriptions(stripComments(statement)))).replace(NAMED_OP, '').replace(/\+\+/g, '').replace(/\?/g, ''),
  )


// A REAL EVALUATOR, NOT `eval`. Recursive descent over numerals, arithmetic, comparisons, ∧, ¬, named ledger
// ops, Prod, and the List slice above — short, total, same answer on every host.
//
// Precedence, lowest first: ∧ · ¬ · comparison · + − · * % / · ^ · ++ · postfix (.reverse/.length/…) · atoms.
type Env = Map<string, Val>
type Ring = 'Nat' | 'Int'
type Cursor = { s: string; i: number; env: Env; ring: Ring; expectBool?: boolean }
/** Tagged values: numerals, booleans, strings, right-associated Prods, finite lists, unary funs, and pending powers. */
type Pair = { readonly t: 'p'; readonly a: Val; readonly b: Val }
type Lst = { readonly t: 'l'; readonly xs: Val[] }
type Fun = { readonly t: 'f'; readonly run: (x: Val) => Val }
type Pow = { readonly t: 'pow'; readonly b: number; readonly e: number }
type Opt = { readonly t: 'o'; readonly v: Val | null }
type Val = number | bigint | boolean | string | Pair | Lst | Fun | Pow | Opt

const pair = (a: Val, b: Val): Pair => ({ t: 'p', a, b })
const lst = (xs: Val[]): Lst => ({ t: 'l', xs })
const fun = (run: (x: Val) => Val): Fun => ({ t: 'f', run })
const pow = (b: number, e: number): Pow => ({ t: 'pow', b, e })
const opt = (v: Val | null): Opt => ({ t: 'o', v })
const isPair = (v: Val): v is Pair => typeof v === 'object' && v !== null && (v as Pair).t === 'p'
const isLst = (v: Val): v is Lst => typeof v === 'object' && v !== null && (v as Lst).t === 'l'
const isFun = (v: Val): v is Fun => typeof v === 'object' && v !== null && (v as Fun).t === 'f'
const isPow = (v: Val): v is Pow => typeof v === 'object' && v !== null && (v as Pow).t === 'pow'
const isOpt = (v: Val): v is Opt => typeof v === 'object' && v !== null && (v as Opt).t === 'o'

const ws = (c: Cursor): void => { while (c.i < c.s.length && c.s[c.i] === ' ') c.i++ }
const eat = (c: Cursor, tok: string): boolean => { ws(c); if (c.s.startsWith(tok, c.i)) { c.i += tok.length; return true } return false }

const deepEq = (a: Val, b: Val): boolean => {
  if (isPow(a)) a = forceScalar(a)
  if (isPow(b)) b = forceScalar(b)
  if (typeof a === 'bigint' || typeof b === 'bigint') {
    const aa = typeof a === 'bigint' ? a : typeof a === 'number' ? BigInt(a) : null
    const bb = typeof b === 'bigint' ? b : typeof b === 'number' ? BigInt(b) : null
    return aa !== null && bb !== null && aa === bb
  }
  if (typeof a === 'number' || typeof a === 'boolean' || typeof a === 'string') return a === b
  if (typeof b === 'number' || typeof b === 'boolean' || typeof b === 'string') return false
  if (isFun(a) || isFun(b)) return false
  if (isOpt(a) && isOpt(b)) {
    if (a.v === null || b.v === null) return a.v === null && b.v === null
    return deepEq(a.v, b.v)
  }
  if (isPair(a) && isPair(b)) return deepEq(a.a, b.a) && deepEq(a.b, b.b)
  if (isLst(a) && isLst(b)) {
    if (a.xs.length !== b.xs.length) return false
    for (let i = 0; i < a.xs.length; i++) if (!deepEq(a.xs[i]!, b.xs[i]!)) return false
    return true
  }
  return false
}

/** Deterministic trunc/abs/min — no Math.* (harmonic-scan). */
/** Toward-zero trunc without Math.* and without `| 0` (which is Int32 and zeros 2^32). */
const trunc = (n: number): number => {
  if (n !== n || n === Infinity || n === -Infinity) throw new Error('trunc')
  const sign = n < 0 ? -1 : 1
  const [w] = (sign < 0 ? -n : n).toString().split('.')
  return sign * Number(w || '0')
}
const abs = (n: number): number => (n < 0 ? -n : n)
const min2 = (a: number, b: number): number => (a < b ? a : b)

/** Lean `a ^ e` on Nat/Int — BigInt so sealed mod-power filters do not float-corrupt. */
const evalPow = (b: number, e: number): number | bigint => {
  if (e < 0) throw new Error('pow')
  if (e === 0) return 1
  const r = BigInt(trunc(b)) ** BigInt(trunc(e))
  if (r <= BigInt(Number.MAX_SAFE_INTEGER) && r >= BigInt(Number.MIN_SAFE_INTEGER)) return Number(r)
  return r
}
/** `(a ^ e) % m` fused — the sealed nilpotent / fixed-point filters. */
const modPow = (base: number, exp: number, mod: number, ring: Ring): number => {
  if (mod === 0) return ring === 'Nat' ? base : 0
  let m = BigInt(trunc(mod))
  if (m < 0n) m = -m
  if (m === 0n) return base
  let b = BigInt(trunc(base)) % m
  if (b < 0n) b += m
  let e = BigInt(trunc(exp))
  if (e < 0n) throw new Error('pow')
  let r = 1n
  while (e > 0n) {
    if (e & 1n) r = (r * b) % m
    b = (b * b) % m
    e >>= 1n
  }
  return Number(r)
}
/** Lean Nat.mod / Int.emod — Euclidean remainder in `[0, |m|)`; `n % 0 = n` on Nat. */
const emod = (a: number, b: number, ring: Ring): number => {
  if (b === 0) return a
  if (ring === 'Nat' && a >= 0 && b > 0) return a % b
  const m = abs(b)
  return ((a % m) + m) % m
}
/** Lean Nat.sub saturates at 0; Int.sub is true minus. Default ring is Nat. */
const ringSub = (a: number, b: number, ring: Ring): number => {
  if (ring === 'Int') return a - b
  if (a < 0 || b < 0) return a - b
  return a < b ? 0 : a - b
}
const forceScalar = (v: Val): number | bigint => {
  if (typeof v === 'number' || typeof v === 'bigint') return v
  if (isPow(v)) return evalPow(v.b, v.e)
  throw new Error('expected numeral')
}
const asNum = (v: Val): number => {
  const x = forceScalar(v)
  if (typeof x === 'bigint') throw new Error('overflow')
  return x
}
const asLst = (v: Val): Val[] => {
  if (!isLst(v)) throw new Error('expected list')
  return v.xs
}
const asFun = (v: Val): Fun => {
  if (!isFun(v)) throw new Error('expected fun')
  return v
}
const asBool = (v: Val): boolean => {
  if (typeof v !== 'boolean') throw new Error('expected bool')
  return v
}
const readIdent = (c: Cursor): string => {
  ws(c)
  const start = c.i
  if (c.i < c.s.length && /[A-Za-z_]/.test(c.s[c.i]!)) {
    c.i++
    while (c.i < c.s.length && /[A-Za-z0-9_]/.test(c.s[c.i]!)) c.i++
  }
  if (c.i === start) throw new Error('ident')
  return c.s.slice(start, c.i)
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
/** Sealed Lean mirrors — Sequence / Discover / Uuidna defs only (not invented). */
const TOUR: Val[] = [1, 2, 4, 8, 7, 5, 3, 6, 0]
const UNITS9: Val[] = [1, 2, 4, 5, 7, 8]
const divZeroFn = (x: number): number => (x === 0 ? 0 : 10 - x)
const apFn = (a: number, b: number, x: number): number => (a * x + b) % 9
const polarFn = (x: number): number => (9 - x) % 9
const saltConvFn = (c: number, _s: number): number => c % 9
const saltSeqFn = (_c: number, s: number): number => s % 9
const invBFn = (a: number): boolean => {
  for (let e = 0; e < 9; e++) if ((a * e) % 9 === 1) return true
  return false
}
const carries9Fn = (d: number, nx: number): boolean => {
  if (UNITS9.some((u) => u === d)) return nx === (2 * d) % 9
  if (d === 3 || d === 6) return nx === (d + 3) % 9
  return false
}
const asPair = (v: Val): Pair => {
  if (!isPair(v)) throw new Error('expected pair')
  return v
}
const sigFn = (p: Pair): Pair => pair(2 - asNum(p.a), -asNum(p.b))
const tauFn = (p: Pair): Pair => pair(2 - asNum(p.a), asNum(p.b))
const kapFn = (p: Pair): Pair => pair(asNum(p.a), -asNum(p.b))
const CAPS: Val[] = [2, 4, 2, 6, 2, 4, 8, 4, 6, 2, 10, 8, 6, 4, 2, 12, 10, 8, 6, 4, 2, 14]
const AGL: Val[] = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]
const WORDS: Val[] = [0,75,42,97,25,82,51,120,7,76,45,102,30,85,52,127]
const avFn = (e: number): number => (e - (e % 9)) / 9
const bvFn = (e: number): number => e % 9
const compFn = (f: number, g: number): number => ((avFn(f) * avFn(g)) % 9) * 9 + ((avFn(f) * bvFn(g) + bvFn(f)) % 9)
const fibCycleFn = (m: number, f: Val[], len: number): boolean => {
  if (f.length !== len) return false
  if (f.length < 2 || asNum(f[0]!) !== 0 || asNum(f[1]!) !== 1) return false
  const ext = f.concat(f.slice(0, 2))
  for (let i = 0; i + 2 < ext.length; i++) {
    if ((asNum(ext[i]!) + asNum(ext[i + 1]!)) % m !== asNum(ext[i + 2]!)) return false
  }
  return true
}
/** Sealed Legal / Audit / Command / Editor / Subgroups mirrors — Lean defs only. */
const lpFn = (t: number, h: number, c: number): number => t * h + c - t * h * c
const lrFn = (t: number, h: number, c: number): number => t * (1 - h) * (1 - c)
const lremFn = (t: number, h: number, c: number): number => 1 - lpFn(t, h, c)
const lnpFn = (t: number, h: number, c: number): number => (1 - lpFn(t, h, c)) * (1 - lrFn(t, h, c))
const flagFn = (h: number, d: number, b: number): number => h * (1 - d) * (1 - b)
const acceptFn = (signed: number, verifies: number): number => signed * verifies
const dfoldFn = (xs: Val[]): number => {
  if (!xs.length) return 0
  return asNum(xs[0]!) + 8 * dfoldFn(xs.slice(1))
}
const UNITS: Val[] = [1, 2, 4, 5, 7, 8]
const natMin = (a: number, b: number): number => (a < b ? a : b)
const natMax = (a: number, b: number): number => (a > b ? a : b)

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
const bitOf = (m: number, i: number): number => (m >> i) & 1
const rowsOf = (m: number): Val[] => [0, 1, 2, 3].map((i) => bitOf(m, i))
const listRange = (n: number): Val[] => {
  const xs: Val[] = []
  for (let i = 0; i < n; i++) xs.push(i)
  return xs
}
const listRangeFrom = (start: number, count: number): Val[] => {
  const xs: Val[] = []
  for (let i = 0; i < count; i++) xs.push(start + i)
  return xs
}
/** Lean `preOf f t` — count of digits in `List.range 10` that `f` sends to `t`. Only named sealed unaries. */
const preOf = (f: (n: number) => number, t: number): number =>
  listRange(10).filter((d) => f(asNum(d)) === t).length
const listFoldlAdd = (xs: Val[], init: number): number => {
  let s = init
  for (const x of xs) s += asNum(x)
  return s
}
const listFoldlMul = (xs: Val[], init: number): number => {
  let s = init
  for (const x of xs) s *= asNum(x)
  return s
}
const applyFold = (f: Fun, acc: Val, x: Val): Val => {
  const r = f.run(acc)
  return isFun(r) ? asFun(r).run(x) : r
}

const readBinderName = (c: Cursor): string => {
  ws(c)
  if (eat(c, '_')) return '_'
  return readIdent(c)
}
/** Lean `fun a b =>` / `fun (a b c : Nat) =>` / `fun (t : List Nat) (c : Nat × Nat) =>`. */
const parseFunBinders = (c: Cursor): string[] => {
  const names: string[] = []
  for (;;) {
    ws(c)
    if (c.s.startsWith('=>', c.i)) break
    if (eat(c, '(')) {
      for (;;) {
        ws(c)
        if (eat(c, ')')) break
        if (eat(c, ':')) {
          let d = 1
          while (c.i < c.s.length && d > 0) {
            const ch = c.s[c.i]!
            if (ch === '(' || ch === '[') d++
            else if (ch === ')') {
              d--
              if (d === 0) break
            } else if (ch === ']') d--
            c.i++
          }
          if (!eat(c, ')')) throw new Error('binder)')
          break
        }
        names.push(readBinderName(c))
      }
      continue
    }
    if (c.i < c.s.length && (/[A-Za-z_]/.test(c.s[c.i]!) || c.s[c.i] === '_')) {
      names.push(readBinderName(c))
      continue
    }
    break
  }
  if (!names.length) throw new Error('fun binders')
  return names
}
const mkFun = (names: string[], body: string, parentEnv: Env, ring: Ring, bodyKind: 'bool' | 'val'): Fun => {
  const build = (idx: number, env: Env): Fun => fun((x) => {
    const e: Env = new Map(env)
    if (names[idx] !== '_') e.set(names[idx]!, x)
    if (idx + 1 < names.length) return build(idx + 1, e)
    const inner: Cursor = { s: body, i: 0, env: e, ring }
    const v = bodyKind === 'bool' ? boolProp(inner) : junction(inner)
    ws(inner)
    if (inner.i !== body.length) throw new Error('fun trailing')
    return v
  })
  return build(0, parentEnv)
}

/** Parse `(fun x => body)` / multi-binder / a Fun atom — bodyKind selects Bool vs value evaluation. */
const parseFunArg = (c: Cursor, bodyKind: 'bool' | 'val'): Fun => {
  ws(c)
  if (c.s[c.i] === '(') {
    const open = c.i
    c.i++
    ws(c)
    if (eat(c, 'fun')) {
      const names = parseFunBinders(c)
      if (!eat(c, '=>')) throw new Error('fun =>')
      const bodyStart = c.i
      let depth = 1
      let i = c.i
      while (i < c.s.length && depth > 0) {
        const ch = c.s[i]!
        if (ch === '"') {
          i++
          while (i < c.s.length && c.s[i] !== '"') i++
          i++
          continue
        }
        if (ch === '(' || ch === '[') depth++
        else if (ch === ')' || ch === ']') depth--
        if (depth === 0) break
        i++
      }
      if (depth !== 0) throw new Error('fun paren')
      const body = c.s.slice(bodyStart, i)
      c.i = i + 1
      return mkFun(names, body, c.env, c.ring, bodyKind)
    }
    c.i = open
  }
  return asFun(atom(c))
}

/** Postfix: Prod `.1`/`.2` and List methods. `.contains` / `.take` / fun methods take an argument. */
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
    // Lean `(xs).foldl (· + ·) init` / `(· * ·)` / `Nat.max` / `(fun s n => …)`.
    if (eat(c, '.foldl')) {
      ws(c)
      if (eat(c, '(· + ·)')) {
        v = listFoldlAdd(asLst(v), asNum(atom(c)))
        continue
      }
      if (eat(c, '(· * ·)')) {
        v = listFoldlMul(asLst(v), asNum(atom(c)))
        continue
      }
      if (eat(c, 'Nat.max') || eat(c, 'max')) {
        let acc = asNum(atom(c))
        for (const x of asLst(v)) acc = natMax(acc, asNum(x))
        v = acc
        continue
      }
      if (eat(c, 'Nat.min') || eat(c, 'min')) {
        let acc = asNum(atom(c))
        for (const x of asLst(v)) acc = natMin(acc, asNum(x))
        v = acc
        continue
      }
      const f = parseFunArg(c, 'val')
      let acc: Val = atom(c)
      for (const x of asLst(v)) acc = applyFold(f, acc, x)
      v = acc
      continue
    }
    if (eat(c, '.flatMap')) {
      const f = parseFunArg(c, 'val')
      const out: Val[] = []
      for (const x of asLst(v)) out.push(...asLst(f.run(x)))
      v = lst(out)
      continue
    }
    if (eat(c, '.zipWith')) {
      const f = parseFunArg(c, 'val')
      const other = asLst(atom(c))
      const xs = asLst(v)
      const n = min2(xs.length, other.length)
      const out: Val[] = []
      for (let i = 0; i < n; i++) out.push(applyFold(f, xs[i]!, other[i]!))
      v = lst(out)
      continue
    }
    if (eat(c, '.flatten')) {
      const out: Val[] = []
      for (const x of asLst(v)) out.push(...asLst(x))
      v = lst(out)
      continue
    }
    if (eat(c, '.scanl')) {
      const f = parseFunArg(c, 'val')
      let acc: Val = atom(c)
      const out: Val[] = [acc]
      for (const x of asLst(v)) {
        acc = applyFold(f, acc, x)
        out.push(acc)
      }
      v = lst(out)
      continue
    }
    if (eat(c, '.headD')) {
      const d = atom(c)
      const xs = asLst(v)
      v = xs.length ? xs[0]! : d
      continue
    }
    if (eat(c, '.all')) {
      const f = parseFunArg(c, 'bool')
      v = asLst(v).every((x) => asBool(f.run(x)))
      continue
    }
    if (eat(c, '.any')) {
      const f = parseFunArg(c, 'bool')
      v = asLst(v).some((x) => asBool(f.run(x)))
      continue
    }
    if (eat(c, '.find?')) {
      const f = parseFunArg(c, 'bool')
      const hit = asLst(v).find((x) => asBool(f.run(x)))
      v = opt(hit === undefined ? null : hit)
      continue
    }
    if (eat(c, '.filter')) {
      const f = parseFunArg(c, 'bool')
      v = lst(asLst(v).filter((x) => asBool(f.run(x))))
      continue
    }
    if (eat(c, '.map')) {
      ws(c)
      if (eat(c, 'dz')) { v = lst(asLst(v).map((x) => dz(asNum(x)))); continue }
      if (eat(c, 'dbl')) { v = lst(asLst(v).map((x) => dbl(asNum(x)))); continue }
      if (eat(c, 'polar')) { v = lst(asLst(v).map((x) => polarFn(asNum(x)))); continue }
      if (eat(c, 'divZero')) { v = lst(asLst(v).map((x) => divZeroFn(asNum(x)))); continue }
      const f = parseFunArg(c, 'val')
      v = lst(asLst(v).map((x) => f.run(x)))
      continue
    }
    if (eat(c, '.zip')) {
      const other = asLst(atom(c))
      const xs = asLst(v)
      const n = min2(xs.length, other.length)
      const out: Val[] = []
      for (let i = 0; i < n; i++) out.push(pair(xs[i]!, other[i]!))
      v = lst(out)
      continue
    }
    if (eat(c, '.drop')) { v = lst(asLst(v).slice(asNum(atom(c)))); continue }
    if (eat(c, '.getLast?')) {
      const xs = asLst(v)
      v = opt(xs.length ? xs[xs.length - 1]! : null)
      continue
    }
    return v
  }
}

const atom = (c: Cursor): Val => {
  ws(c)
  // string literal
  if (c.s[c.i] === '"') {
    c.i++
    let out = ''
    while (c.i < c.s.length && c.s[c.i] !== '"') out += c.s[c.i++]
    if (c.s[c.i] !== '"') throw new Error('unclosed string')
    c.i++
    return postfix(c, out)
  }
  // list literal
  if (eat(c, '[')) {
    const xs: Val[] = []
    ws(c)
    if (!eat(c, ']')) {
      for (;;) {
        xs.push(junction(c))
        ws(c)
        if (eat(c, ']')) break
        if (!eat(c, ',')) throw new Error('list comma')
      }
    }
    return postfix(c, lst(xs))
  }
  if (eat(c, '(')) {
    const saveParen = c.i
    const a = junction(c)
    ws(c)
    if (eat(c, ',')) {
      const b = junction(c)
      ws(c)
      if (eat(c, ',')) {
        const d = junction(c)
        if (!eat(c, ')')) throw new Error('unclosed')
        return postfix(c, pair(a, pair(b, d)))
      }
      if (!eat(c, ')')) throw new Error('unclosed')
      return postfix(c, pair(a, b))
    }
    // `(Nat.gcd a 9 == 1)` — junction stops before `==`; reparse as a bool proposition.
    if (c.s.startsWith('==', c.i) || c.s.startsWith('!=', c.i) || c.s.startsWith('<=', c.i) || c.s.startsWith('>=', c.i)
      || c.s.startsWith('≠', c.i) || c.s.startsWith('≤', c.i) || c.s.startsWith('≥', c.i)
      || c.s.startsWith('<', c.i) || c.s.startsWith('>', c.i) || c.s.startsWith('=', c.i)) {
      c.i = saveParen
      const bv = boolProp(c)
      if (!eat(c, ')')) throw new Error('unclosed')
      return postfix(c, bv)
    }
    if (!eat(c, ')')) throw new Error('unclosed')
    return postfix(c, a)
  }
  if (eat(c, '-')) return postfix(c, -asNum(atom(c)))
  // Bool negation as a value — sealed `!(p && q)` inside fun bodies / junctions.
  if (eat(c, '¬') || eat(c, '!')) return postfix(c, !asBool(atom(c)))
  if (eat(c, 'true')) return postfix(c, true)
  if (eat(c, 'false')) return postfix(c, false)
  if (eat(c, 'if')) {
    const cond = boolProp(c)
    if (!eat(c, 'then')) throw new Error('if then')
    if (c.expectBool) {
      const t = boolProp(c)
      if (!eat(c, 'else')) throw new Error('if else')
      const e = boolProp(c)
      return postfix(c, cond ? t : e)
    }
    const t = junction(c)
    if (!eat(c, 'else')) throw new Error('if else')
    const e = junction(c)
    return postfix(c, cond ? t : e)
  }
  // Named apps — longer tokens before prefixes.
  if (eat(c, 'Nat.gcd')) return postfix(c, natGcd(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'Nat.min') || eat(c, 'min')) {
    let v: Val = fun((a) => fun((b) => natMin(asNum(a), asNum(b))))
    while (isFun(v)) {
      ws(c)
      const argSave = c.i
      try { v = asFun(v).run(atom(c)) } catch { c.i = argSave; break }
    }
    return postfix(c, v)
  }
  if (eat(c, 'Nat.max') || eat(c, 'max')) {
    let v: Val = fun((a) => fun((b) => natMax(asNum(a), asNum(b))))
    while (isFun(v)) {
      ws(c)
      const argSave = c.i
      try { v = asFun(v).run(atom(c)) } catch { c.i = argSave; break }
    }
    return postfix(c, v)
  }
  if (eat(c, 'Nat.ble')) return postfix(c, asNum(atom(c)) <= asNum(atom(c)))
  if (eat(c, 'Int.ofNat')) return postfix(c, asNum(atom(c)))
  if (eat(c, 'Nat')) {
    if (!eat(c, '(')) throw new Error('Nat')
    const save = c.ring
    c.ring = 'Nat'
    const v = junction(c)
    c.ring = save
    if (!eat(c, ')')) throw new Error('Nat)')
    return postfix(c, v)
  }
  if (eat(c, 'Int')) {
    if (!eat(c, '(')) throw new Error('Int')
    const save = c.ring
    c.ring = 'Int'
    const v = junction(c)
    c.ring = save
    if (!eat(c, ')')) throw new Error('Int)')
    return postfix(c, v)
  }
  if (eat(c, 'decide')) {
    if (!eat(c, '(')) throw new Error('decide')
    const v = boolExpr(c)
    if (!eat(c, ')')) throw new Error('decide)')
    return postfix(c, v)
  }
  if (eat(c, "List.range'")) return postfix(c, lst(listRangeFrom(asNum(atom(c)), asNum(atom(c)))))
  if (eat(c, 'List.range')) return postfix(c, lst(listRange(asNum(atom(c)))))
  if (eat(c, 'List.sum')) return postfix(c, listSum(asLst(atom(c))))
  if (eat(c, 'List.reverse')) return postfix(c, lst(listReverse(asLst(atom(c)))))
  if (eat(c, 'lxor')) return postfix(c, lxor(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'pop')) return postfix(c, pop(asNum(atom(c))))
  if (eat(c, 'wt')) return postfix(c, pop(asNum(atom(c))))
  if (eat(c, 'rowsOf')) return postfix(c, lst(rowsOf(asNum(atom(c)))))
  if (eat(c, 'preOf')) {
    ws(c)
    let f: ((n: number) => number) | null = null
    if (eat(c, 'dz')) f = dz
    else if (eat(c, 'dbl')) f = dbl
    else throw new Error('preOf')
    const save = c.i
    try {
      return postfix(c, preOf(f, asNum(atom(c))))
    } catch {
      c.i = save
      // Partial `preOf dz` — sealed as `.map (preOf dz)`.
      return postfix(c, fun((x) => preOf(f!, asNum(x))))
    }
  }
  if (eat(c, 'commission')) return postfix(c, commission(asNum(atom(c))))
  if (eat(c, 'unverified')) return postfix(c, unverifiedFn(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'verified')) return postfix(c, verifiedFn(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'dzMin')) return postfix(c, dzMin(asNum(atom(c))))
  if (eat(c, 'dz')) {
    const save = c.i
    try { return postfix(c, dz(asNum(atom(c)))) } catch { c.i = save; return postfix(c, fun((x) => dz(asNum(x)))) }
  }
  if (eat(c, 'dbl')) {
    const save = c.i
    try { return postfix(c, dbl(asNum(atom(c)))) } catch { c.i = save; return postfix(c, fun((x) => dbl(asNum(x)))) }
  }
  if (eat(c, 'divZero')) {
    const save = c.i
    try { return postfix(c, divZeroFn(asNum(atom(c)))) } catch { c.i = save; return postfix(c, fun((x) => divZeroFn(asNum(x)))) }
  }
  if (eat(c, 'polar')) {
    const save = c.i
    try { return postfix(c, polarFn(asNum(atom(c)))) } catch { c.i = save; return postfix(c, fun((x) => polarFn(asNum(x)))) }
  }
  if (eat(c, 'ap')) return postfix(c, apFn(asNum(atom(c)), asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'carries9')) return postfix(c, carries9Fn(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'saltConv')) return postfix(c, saltConvFn(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'saltSeq')) return postfix(c, saltSeqFn(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'invB')) return postfix(c, invBFn(asNum(atom(c))))
  if (eat(c, 'sig')) return postfix(c, sigFn(asPair(atom(c))))
  if (eat(c, 'tau')) return postfix(c, tauFn(asPair(atom(c))))
  if (eat(c, 'kap')) return postfix(c, kapFn(asPair(atom(c))))
  if (eat(c, 'tour')) return postfix(c, lst(TOUR.slice()))
  if (eat(c, 'caps')) return postfix(c, lst(CAPS.slice()))
  if (eat(c, 'agl')) return postfix(c, lst(AGL.slice()))
  if (eat(c, 'words')) return postfix(c, lst(WORDS.slice()))
  if (eat(c, 'av')) return postfix(c, avFn(asNum(atom(c))))
  if (eat(c, 'bv')) return postfix(c, bvFn(asNum(atom(c))))
  if (eat(c, 'comp')) return postfix(c, compFn(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'fibCycle')) return postfix(c, fibCycleFn(asNum(atom(c)), asLst(atom(c)), asNum(atom(c))))
  if (eat(c, 'units9')) return postfix(c, lst(UNITS9.slice()))
  if (eat(c, 'units')) return postfix(c, lst(UNITS.slice()))
  if (eat(c, 'lp')) return postfix(c, lpFn(asNum(atom(c)), asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'lr')) return postfix(c, lrFn(asNum(atom(c)), asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'lnp')) return postfix(c, lnpFn(asNum(atom(c)), asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'lrem')) return postfix(c, lremFn(asNum(atom(c)), asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'flag')) return postfix(c, flagFn(asNum(atom(c)), asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'accept')) return postfix(c, acceptFn(asNum(atom(c)), asNum(atom(c))))
  if (eat(c, 'dfold')) return postfix(c, dfoldFn(asLst(atom(c))))
  if (eat(c, 'some')) return postfix(c, opt(atom(c)))
  if (eat(c, 'res')) return postfix(c, resFn(asNum(atom(c))))
  if (eat(c, 'nth')) return postfix(c, listNth(asLst(atom(c)), asNum(atom(c))))
  // Bare `fun binders => body` — sealed `let fold3 := fun (a b c : Nat) => …`.
  if (eat(c, 'fun')) {
    const names = parseFunBinders(c)
    if (!eat(c, '=>')) throw new Error('fun =>')
    const bodyStart = c.i
    const probeEnv: Env = new Map(c.env)
    for (const n of names) if (n !== '_') probeEnv.set(n, 0)
    const probe: Cursor = { s: c.s, i: bodyStart, env: probeEnv, ring: c.ring }
    junction(probe)
    const body = c.s.slice(bodyStart, probe.i)
    c.i = probe.i
    return mkFun(names, body, c.env, c.ring, 'val')
  }
  // Bound variable — apply curried funs by juxtaposition (`fold3 1 2 3`).
  if (c.i < c.s.length && /[A-Za-z_]/.test(c.s[c.i]!)) {
    const save = c.i
    const id = readIdent(c)
    if (c.env.has(id)) {
      let v: Val = c.env.get(id)!
      while (isFun(v)) {
        ws(c)
        const argSave = c.i
        try {
          const arg = atom(c)
          v = asFun(v).run(arg)
        } catch {
          c.i = argSave
          break
        }
      }
      return postfix(c, v)
    }
    c.i = save
  }
  const start = c.i
  while (c.i < c.s.length && c.s[c.i]! >= '0' && c.s[c.i]! <= '9') c.i++
  if (c.i === start) throw new Error('expected a numeral')
  return postfix(c, Number(c.s.slice(start, c.i)))
}

/** `++` appends lists; `::` cons — sealed Wave census / Editor forms. */
const append = (c: Cursor): Val => {
  let v = atom(c)
  for (;;) {
    ws(c)
    if (eat(c, '++')) { v = lst(asLst(v).concat(asLst(atom(c)))); continue }
    if (eat(c, '::')) { v = lst([v, ...asLst(atom(c))]); continue }
    return v
  }
}

const power = (c: Cursor): Val => {
  const base = append(c)
  if (!eat(c, '^')) return base
  const exp = asNum(power(c))
  const b = forceScalar(base)
  if (typeof b === 'bigint') {
    const r = b ** BigInt(trunc(exp))
    return (r <= BigInt(Number.MAX_SAFE_INTEGER) && r >= BigInt(Number.MIN_SAFE_INTEGER)) ? Number(r) : r
  }
  return pow(b, exp)
}
const product = (c: Cursor): Val => {
  let v = power(c)
  for (;;) {
    ws(c)
    if (eat(c, '*')) v = asNum(v) * asNum(power(c))
    else if (eat(c, '%')) {
      const d = asNum(power(c))
      v = isPow(v) ? modPow(v.b, v.e, d, c.ring) : emod(asNum(v), d, c.ring)
    } else if (eat(c, '/')) {
      const d = asNum(power(c))
      v = d === 0 ? 0 : (asNum(v) - emod(asNum(v), d, c.ring)) / d
    } else return isPow(v) ? forceScalar(v) : v
  }
}
function sum(c: Cursor): Val {
  let v = product(c)
  for (;;) {
    ws(c)
    if (eat(c, '+')) v = asNum(v) + asNum(product(c))
    else if (c.s.startsWith('-', c.i)) { c.i++; v = ringSub(asNum(v), asNum(product(c)), c.ring) }
    else return v
  }
}

/** `&&` is Lean Bool and — sealed publish_gate_is_conjunction. */
function junction(c: Cursor): Val {
  ws(c)
  if (eat(c, 'let')) {
    const name = readIdent(c)
    if (!eat(c, ':=')) throw new Error('let :=')
    const saveBool = c.expectBool
    c.expectBool = false
    let val: Val
    try { val = junction(c) } finally { c.expectBool = saveBool }
    if (!eat(c, ';')) throw new Error('let ;')
    c.env.set(name, val)
    return junction(c)
  }
  let v = sum(c)
  for (;;) {
    ws(c)
    // Only fold Bool `&&` when the left value is already Bool — otherwise `10 && …` is propositional.
    if (typeof v === 'boolean' && eat(c, '&&')) {
      const r = sum(c)
      if (typeof r !== 'boolean') throw new Error('&&')
      v = v && r
      continue
    }
    return v
  }
}

const compare = (c: Cursor): boolean => {
  const l = junction(c); ws(c)
  // TWO-CHARACTER OPS BEFORE THEIR PREFIXES — `<=` must win over `<`; `==`/`!=` are Lean Bool eq.
  if (eat(c, '<=')) return asNum(l) <= asNum(junction(c))
  if (eat(c, '>=')) return asNum(l) >= asNum(junction(c))
  if (eat(c, '≤')) return asNum(l) <= asNum(junction(c))
  if (eat(c, '≥')) return asNum(l) >= asNum(junction(c))
  if (eat(c, '≠')) return !deepEq(l, junction(c))
  if (eat(c, '!=')) return !deepEq(l, junction(c))
  if (eat(c, '==')) return deepEq(l, junction(c))
  if (eat(c, '<')) return asNum(l) < asNum(junction(c))
  if (eat(c, '>')) return asNum(l) > asNum(junction(c))
  if (eat(c, '=')) return deepEq(l, junction(c))
  // bare boolean proposition — `.Nodup`, `.contains`, `.all`, `true`, `if`
  if (typeof l === 'boolean') return l
  throw new Error('expected a comparison')
}

/** Bool `||` over comparisons — sealed Fermat / filter predicates. Always parse both sides. */
function boolExpr(c: Cursor): boolean {
  let v = compare(c)
  for (;;) {
    ws(c)
    if (!eat(c, '||')) return v
    const r = compare(c)
    v = v || r
  }
}

/** Fun-body propositions: `let`, `¬`/`!`, `∧`/`&&`/`||`, and parenthesised chains. */
const cmpContinues = (c: Cursor): boolean => {
  ws(c)
  return c.s.startsWith('==', c.i) || c.s.startsWith('!=', c.i) || c.s.startsWith('<=', c.i) || c.s.startsWith('>=', c.i)
    || c.s.startsWith('≠', c.i) || c.s.startsWith('≤', c.i) || c.s.startsWith('≥', c.i)
    || c.s.startsWith('<', c.i) || c.s.startsWith('>', c.i)
    || (c.s.startsWith('=', c.i) && !c.s.startsWith('=>', c.i))
}
function boolAtom(c: Cursor): boolean {
  ws(c)
  if (eat(c, '¬') || eat(c, '!')) return !boolAtom(c)
  const save = c.i
  if (eat(c, '(')) {
    try {
      const v = boolProp(c)
      if (eat(c, ')')) {
        if (cmpContinues(c)) c.i = save
        else return v
      }
    } catch { /* fall through */ }
    c.i = save
  }
  return compare(c)
}
function boolProp(c: Cursor): boolean {
  const prev = c.expectBool
  c.expectBool = true
  try {
    ws(c)
    if (eat(c, 'let')) {
      const name = readIdent(c)
      if (!eat(c, ':=')) throw new Error('let :=')
      // Value binding — clear expectBool so `let r := if … then 9 else …` stays Nat.
      const saveBool = c.expectBool
      c.expectBool = false
      let val: Val
      try { val = junction(c) } finally { c.expectBool = saveBool }
      if (!eat(c, ';')) throw new Error('let ;')
      c.env.set(name, val)
      return boolProp(c)
    }
    let v = boolAtom(c)
    for (;;) {
      ws(c)
      if (eat(c, '∧') || eat(c, '&&')) { v = boolAtom(c) && v; continue }
      if (eat(c, '||')) { v = boolAtom(c) || v; continue }
      return v
    }
  } finally {
    c.expectBool = prev
  }
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
  if (eat(c, '∀')) {
    const name = readIdent(c)
    ws(c)
    if (eat(c, ':')) { readIdent(c); ws(c) }
    if (!eat(c, ',')) throw new Error('∀ ,')
    ws(c)
    if (c.s.startsWith(name, c.i)) c.i += name.length
    ws(c)
    if (!eat(c, '∈')) throw new Error('∀ ∈')
    const xs = asLst(atom(c))
    if (!eat(c, '→')) throw new Error('∀ →')
    const bodyStart = c.i
    // Parse body once to find its end, then evaluate per element from a saved slice.
    {
      const env: Env = new Map(c.env)
      env.set(name, xs[0] ?? 0)
      const probe: Cursor = { s: c.s, i: bodyStart, env, ring: c.ring }
      boolProp(probe)
      const body = c.s.slice(bodyStart, probe.i)
      c.i = probe.i
      return xs.every((x) => {
        const env2: Env = new Map(c.env)
        env2.set(name, x)
        const inner: Cursor = { s: body, i: 0, env: env2, ring: c.ring }
        const v = boolProp(inner)
        ws(inner)
        if (inner.i !== body.length) throw new Error('∀ trailing')
        return v
      })
    }
  }
  const save = c.i
  if (eat(c, '(')) {
    // a parenthesis may hold a whole conjunction — `((a = b) ∧ (c = d)) ∧ (e = f)` — so recurse, not just compare.
    // But `(invB 1) == true` is a VALUE in parens, not a finished proposition — backtrack if a comparison continues.
    try {
      const v = conjunction(c)
      if (eat(c, ')')) {
        ws(c)
        if (c.s.startsWith('==', c.i) || c.s.startsWith('!=', c.i) || c.s.startsWith('<=', c.i) || c.s.startsWith('>=', c.i)
          || c.s.startsWith('≠', c.i) || c.s.startsWith('≤', c.i) || c.s.startsWith('≥', c.i)
          || c.s.startsWith('<', c.i) || c.s.startsWith('>', c.i) || (c.s.startsWith('=', c.i) && !c.s.startsWith('=>', c.i))) {
          c.i = save
        } else return v
      }
    } catch { /* not a parenthesised boolean */ }
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
  const cleaned = stripComments(statement)
  if (!evaluable(cleaned)) return null
  const src = stripAscriptions(cleaned)
  // Lean elaborates the whole chain as Int once any `: Int` ascription appears (expected type); Nat otherwise.
  const ring: Ring = /\bInt\b/.test(statement) ? 'Int' : 'Nat'
  try {
    const c: Cursor = { s: src, i: 0, env: new Map(), ring }
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
