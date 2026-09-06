// quantum/shor — SHOR'S ARITHMETIC WITH EVERY OPERAND DRAWN FROM THE SEALED LEDGER.
//
// NOTHING IS TYPED HERE. No modulus, no factor pair, no expected period, no register width. Each one is READ from
// a theorem the kernel decided, or DERIVED from the hexbit widths that already compute. The first draft of this
// module typed `check(15n, ['3','5'])` — textbook numbers with no seal behind them, which is precisely the
// authored constant this tree refuses (theorem legal_only_the_proven_is_admitted). The moduli it works on now are
// the tree's own: 63 = 7·9 is sealed in captain_theorem_the_coins_buy_the_ring_and_one, and the unit structure of
// ℤ/21 — twelve units, every one of exponent six — is sealed in crt21_units_have_exponent_six. That exponent IS
// the quantity Shor's period finding recovers, so the ledger supplies the answer key rather than the author.
//
// WHAT IS ABSENT, NAMED. Shor's contribution is the QUANTUM period-finding step: a 2m-qubit counting register,
// controlled modular exponentiation, an inverse QFT, and a measurement giving a rational approximation to s/r.
// That step is NOT here. Everything around it is integer arithmetic and that is what this module carries, with
// `periodSource` stating on every result where the period came from. A module computing the order classically and
// calling itself Shor is the substitution failure this tree already knows: a verification that only asks "was
// every refusal a known failure mode" is blind to refusing too little, and passes with trial division swapped in.
// So `shorLedgerHarness()` tests BOTH directions.
//
// WHY THE QUANTUM STEP CANNOT SIMPLY BE ADDED. Amplitudes here are Gaussian integers over √(2^scale) — the ring
// ℤ[i,1/√2] (src/index.ts). An inverse QFT on a 2m-qubit register needs e^(2πi/2^k) up to k = 2m, i.e. the
// cyclotomic ring ℤ[ζ_(2^2m)], whose conductor GROWS with the register. That is a numeric-core change, not a gate
// addition, and it is the honest reason EXPOSED_GATE_SET omits the phase/rotation family.
//
// DETERMINISM. Shor picks a base at random; this tree forbids RNG (guard: harmonic-scan). The base is DERIVED by
// a stated rule and the rule is returned with every result, so a reader recomputes rather than trusts.
import { theorems } from '../../theorems/index.js'
import { periodBits, shorChunkBits } from '../../hexbit/index.js'
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'

/** Where a period came from. `quantum-period-finding` is never produced by this module — it is the absent leg,
 *  named so a classical order can never be mistaken for Shor's result. */
export type PeriodSource = 'classical-order' | 'quantum-period-finding'

export interface SealedFactorisation {
  n: bigint
  a: bigint
  b: bigint
  theorem: string
}

/** sealedFactorisations() → every composite whose factor pair the LEDGER proves, read off sealed statements as
 *  `(a * b = n)`. These are the moduli this module is allowed to work on: a target with no seal behind it is an
 *  authored constant, and authoring is what the kernel exists to refuse. Pure. */
export function sealedFactorisations(): SealedFactorisation[] {
  const seen = new Map<string, SealedFactorisation>()
  for (const t of theorems()) {
    for (const m of t.statement.matchAll(/\(\s*(\d+)\s*\*\s*(\d+)\s*=\s*(\d+)\s*\)/g)) {
      const a = BigInt(m[1]), b = BigInt(m[2]), n = BigInt(m[3])
      if (a * b !== n || a < 2n || b < 2n) continue
      const key = String(n)
      if (!seen.has(key)) seen.set(key, { n, a, b, theorem: t.key })
    }
  }
  return [...seen.values()].sort((x, y) => (x.n < y.n ? -1 : x.n > y.n ? 1 : 0))
}

export interface SealedExponent { modulus: bigint; exponent: bigint; theorem: string }

/** sealedExponents() → every `(a^e) % m == 1` the ledger proves over its units, i.e. the group exponents already
 *  decided by the kernel. Shor's period for a unit DIVIDES the exponent of its group, so these are the sealed
 *  answer key the recovered period is checked against — no expected value is authored here. Pure. */
let SEALED: SealedExponent[] | null = null
let BY_MODULUS: Map<string, SealedExponent[]> | null = null

/** the one scan, done once. The ledger is immutable inside a process, so re-deriving this per call re-reads every
 *  sealed statement with a regex to learn something that cannot have changed — and the ledger is now ~4,800
 *  theorems, so that scan is the dominant cost of a lookup that should be a hash. Built lazily so importing this
 *  module costs nothing; deterministic, because it is a pure function of a ledger that does not move. */
function buildSealed(): void {
  const seen = new Map<string, SealedExponent>()
  for (const t of theorems()) {
    for (const m of t.statement.matchAll(/\(\s*a\s*\^\s*(\d+)\s*\)\s*%\s*(\d+)\s*==\s*1/g)) {
      const exponent = BigInt(m[1]), modulus = BigInt(m[2])
      const key = `${modulus}:${exponent}`
      if (!seen.has(key)) seen.set(key, { modulus, exponent, theorem: t.key })
    }
  }
  SEALED = [...seen.values()]
  BY_MODULUS = new Map()
  for (const e of SEALED) {
    const k = String(e.modulus)
    const list = BY_MODULUS.get(k)
    if (list) list.push(e); else BY_MODULUS.set(k, [e])
  }
}

export function sealedExponents(): SealedExponent[] {
  if (SEALED === null) buildSealed()
  return SEALED!
}

/** sealedExponentsOf(n) → the sealed group exponents for ONE modulus, by hash rather than by walking all of them.
 *  The callers all ask "what does the ledger know about THIS n", which is a lookup, not a search. */
export function sealedExponentsOf(n: bigint): readonly SealedExponent[] {
  if (BY_MODULUS === null) buildSealed()
  return BY_MODULUS!.get(String(n)) ?? []
}

/** modExp(base, exp, mod) → base^exp mod mod, square-and-multiply. The reversible circuit Shor runs computes this
 *  same map; here it is the oracle the post-processing is checked against. Pure. */
export function modExp(base: bigint, exp: bigint, mod: bigint): bigint {
  if (mod <= 1n) return 0n
  let result = 1n, b = base % mod, e = exp
  while (e > 0n) {
    if (e & 1n) result = (result * b) % mod
    b = (b * b) % mod
    e >>= 1n
  }
  return result
}

/** gcd(a,b) → Euclid. Pure. */
export function gcd(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a, y = b < 0n ? -b : b
  while (y) { const t = x % y; x = y; y = t }
  return x
}

/** deterministicBase(n, attempt) → the base used instead of a random one. RULE, returned with every result: walk
 *  a upward from the first non-unit, keep those coprime to n, take the attempt-th. Pure. */
export function deterministicBase(n: bigint, attempt = 0): { base: bigint; rule: string } {
  let found = -1
  for (let a = 2n; a < n; a += 1n) {
    if (gcd(a, n) === 1n) {
      found += 1
      if (found === attempt) return { base: a, rule: `least a≥2 coprime to n, index ${attempt}` }
    }
  }
  return { base: 0n, rule: 'no coprime base below n' }
}

/** multiplicativeOrder(a, n) → least r>0 with a^r ≡ 1 (mod n). THE CLASSICAL ORACLE, NOT SHOR: exponential in the
 *  bit-width of n, and labelled as such wherever its output travels. Pure. */
export function multiplicativeOrder(a: bigint, n: bigint): bigint | null {
  if (n <= 1n || gcd(a, n) !== 1n) return null
  let r = 1n, cur = a % n
  while (cur !== 1n) {
    cur = (cur * a) % n
    r += 1n
    if (r > n) return null
  }
  return r
}

export interface Convergent { numerator: bigint; denominator: bigint }

/** convergents(num, den, limit) → continued-fraction convergents of num/den. The step that turns a MEASURED phase
 *  into a candidate period. Exact, no floats; the limit derives from the register width, never typed. Pure. */
export function convergents(num: bigint, den: bigint, limit = periodBits(shorChunkBits())): Convergent[] {
  const out: Convergent[] = []
  let n = num, d = den, hPrev = 0n, h = 1n, kPrev = 1n, k = 0n
  while (d !== 0n && out.length < limit) {
    const q = n / d, rem = n - q * d
    const hNext = q * h + hPrev, kNext = q * k + kPrev
    hPrev = h; h = hNext; kPrev = k; k = kNext
    out.push({ numerator: h, denominator: k })
    n = d; d = rem
  }
  return out
}

/** periodFromPhase(numerator, denominator, a, n) → the period recovered from a phase estimate s/r, by walking the
 *  convergents and testing each denominator against the modular-exponentiation oracle. Exactly Shor's own
 *  post-processing, and ring-independent: it works unchanged however the quantum step is later supplied. Pure. */
export function periodFromPhase(numerator: bigint, denominator: bigint, a: bigint, n: bigint): bigint | null {
  for (const c of convergents(numerator, denominator)) {
    if (c.denominator > 0n && c.denominator < n && modExp(a, c.denominator, n) === 1n) return c.denominator
  }
  return null
}

/** factorsFromPeriod(a, r, n) → gcd(a^(r/2) ± 1, n), with Shor's own preconditions ENFORCED rather than assumed:
 *  an odd period and the a^(r/2) ≡ −1 case each refuse by name. Pure. */
export function factorsFromPeriod(a: bigint, r: bigint, n: bigint): { factors: [bigint, bigint] | null; reason: string } {
  if (r <= 0n) return { factors: null, reason: 'period is not positive' }
  // THE PRECONDITION, ENFORCED. Found by probing the converse arm: without this line a caller could supply ANY
  // even number and the extraction would sometimes return real factors — gcd(a^(r/2)±1, n) can hit a divisor by
  // luck even when r is not the order. That is factoring by accident dressed as period finding, and it is exactly
  // how a substituted oracle passes a one-directional check. r is a period iff a^r ≡ 1 (mod n); anything else is
  // refused by name rather than plugged into the formula.
  if (modExp(a, r, n) !== 1n) return { factors: null, reason: 'supplied r is not a period — a^r ≢ 1 (mod n)' }
  if (r % 2n !== 0n) return { factors: null, reason: 'period is odd — a^(r/2) is not an integer power' }
  const half = modExp(a, r / 2n, n)
  if (half === n - 1n) return { factors: null, reason: 'a^(r/2) ≡ −1 (mod n) — the extraction is trivial' }
  const f1 = gcd(half - 1n, n), f2 = gcd(half + 1n, n)
  if (f1 > 1n && f1 < n) return { factors: [f1, n / f1], reason: 'gcd(a^(r/2)−1, n) is a proper divisor' }
  if (f2 > 1n && f2 < n) return { factors: [f2, n / f2], reason: 'gcd(a^(r/2)+1, n) is a proper divisor' }
  return { factors: null, reason: 'both gcds are trivial' }
}

export interface FactorAttempt {
  n: string
  base: string
  baseRule: string
  period: string | null
  periodSource: PeriodSource
  factors: string[] | null
  reason: string
  /** WHAT THE BREAK COMPUTED, when it computed something. A period that extracts no proper factor because
   *  a^(r/2) = 1 for every unit has not failed silently — it has established that r/2 is a multiple of the unit
   *  group's exponent, which is a fact about n rather than an absence of one. That multiple is returned here so
   *  the caller keeps it: `half` is r/2, `dividesSealedExponent` the sealed lambda it is a multiple of, and
   *  `theorem` the seal that decided it. Present ONLY on that branch; absent means no such measurement was made,
   *  never that one was made and discarded. Optional so every existing consumer is unaffected. */
  groupExponentMultiple?: {
    half: string
    dividesSealedExponent: string
    theorem: string
  }
}

/** shorFactor(n, opts) → the pipeline, with the period supplied by whichever source the caller NAMES. Given a
 *  `period` it is used and labelled quantum; otherwise the classical oracle runs and the result says so. The label
 *  is the whole point — it is what makes a substituted oracle visible instead of silently passing. Pure. */
export function shorFactor(
  n: bigint,
  opts: { attempt?: number; period?: bigint; periodSource?: PeriodSource } = {},
): FactorAttempt {
  const source: PeriodSource = opts.period !== undefined ? (opts.periodSource ?? 'quantum-period-finding') : 'classical-order'

  // A CALLER-SUPPLIED PERIOD IS USED, NEVER REFUSED. A period is any r with a^r ≡ 1 (mod n) — the least such r is
  // not required, and r = 12 on n = 21 is as valid as r = 6. When its extraction lands trivially that is a RETRY
  // over the base, which is what Shor does, not a rejection of the period.
  if (opts.period !== undefined) {
    const r = opts.period
    for (let attempt = 0; ; attempt += 1) {
      const { base, rule } = deterministicBase(n, attempt)
      if (base === 0n) break
      if (modExp(base, r, n) !== 1n) continue          // not a period for THIS base — try the next base
      const ext = factorsFromPeriod(base, r, n)
      if (ext.factors) {
        return { n: String(n), base: String(base), baseRule: rule, period: String(r), periodSource: source,
          factors: [String(ext.factors[0]), String(ext.factors[1])], reason: ext.reason }
      }
    }
    // NO SUBSTITUTION. An earlier draft fell through to the classical loop here, which computed a DIFFERENT period
    // and returned it still labelled `quantum-period-finding` — supplied 12, reported 6. That is the substitution
    // the label exists to expose, introduced by the code meant to stop refusing. The supplied period is reported
    // as given. AND THE BREAK IS NOT A DEAD END, IT IS A MEASUREMENT — the failure involutes into a fact about n.
    // When a^(r/2) = 1 for EVERY unit, the difference of squares factors trivially (n and 1, not a proper pair),
    // and the reason it does is that r/2 is a multiple of the group's exponent. So what this branch computes is
    // not 'no factors' but a MULTIPLE OF lambda(n), the Carmichael exponent — the same quantity Laws.lean seals
    // as maxUnitOrder = lawLambda and the Fermat wing indexes its whole survey by. A period that refuses to
    // split n has told you where it sits relative to the unit group's order, which is information the caller
    // can use and a bare refusal would throw away. The seal is named for that reason, not to excuse the null.
    // ONE TEST, NOT TWO. The old predicate asked `r % e == 0 && (r/2) % e == 0`, and the first clause is implied
    // by the second: r = 2·(r/2), so e | r/2 gives e | r for free. Checking both spends a bigint division to
    // re-establish something arithmetic already guarantees — the kind of deletion a stated law licenses.
    const half = r / 2n
    const sealedWhy = sealedExponentsOf(n).find((e) => half % e.exponent === 0n)
    const base = { n: String(n), base: String(deterministicBase(n).base), baseRule: 'every coprime base tried',
      period: String(r), periodSource: source, factors: null }
    // Two outcomes, written as two results. Either the ledger decides why the extraction was trivial — and then
    // the measurement is part of the answer — or it does not, and the answer says only that. A spread that
    // conditionally grows an object hides which of those happened behind a shape.
    if (sealedWhy === undefined) {
      return { ...base, reason: 'this period extracts for no coprime base — supply another' }
    }
    return {
      ...base,
      reason: `a^(r/2) ≡ 1 for every unit — r/2 is a multiple of the sealed group exponent ${sealedWhy.exponent} (theorem ${sealedWhy.theorem})`,
      groupExponentMultiple: { half: String(half), dividesSealedExponent: String(sealedWhy.exponent), theorem: sealedWhy.theorem },
    }
  }

  // EVERY BASE, THEN EVERY DIVISOR. Shor varies the base on a trivial extraction; the earlier draft took ONE base
  // and reported a miss, and because deterministicBase filters for coprimality the shared-factor branch was dead
  // (0 hits over 97 sealed composites) — so an even n threw away the divisor 2 sitting in plain view. Both legs
  // run here, so the pipeline reports a factorisation whenever one exists.
  for (let attempt = 0; ; attempt += 1) {
    const { base, rule } = deterministicBase(n, attempt)
    if (base === 0n) break
    const r = multiplicativeOrder(base, n)
    if (r !== null) {
      const ext = factorsFromPeriod(base, r, n)
      if (ext.factors) {
        return { n: String(n), base: String(base), baseRule: rule, period: String(r), periodSource: source,
          factors: [String(ext.factors[0]), String(ext.factors[1])], reason: ext.reason }
      }
    }
  }
  for (let d = 2n; d * d <= n; d += 1n) {
    if (n % d === 0n) {
      return { n: String(n), base: String(d), baseRule: 'least divisor ≥2 — the period leg found none',
        period: null, periodSource: source, factors: [String(d), String(n / d)], reason: 'divisor found directly' }
    }
  }
  return { n: String(n), base: '0', baseRule: 'exhausted', period: null, periodSource: source,
    factors: null, reason: 'n is prime — no factorisation exists' }
}

export interface LedgerCase {
  n: string
  theorem: string
  sealedFactors: string[]
  recovered: string[] | null
  agrees: boolean
  reason: string
}

export interface ShorLedgerHarness {
  cases: LedgerCase[]
  agreed: number
  total: number
  /** the sealed group exponents the recovered periods are checked against */
  exponentsChecked: { modulus: string; exponent: string; theorem: string; periodDivides: boolean }[]
  /** the converse arm: a period that is NOT the order must be REFUSED, not accepted */
  substitutionCaught: boolean
  substitutionNote: string
  missingLeg: string
  widths: { chunkBits: number; periodBits: number }
  receipt: string
}

/** shorLedgerHarness() → runs the pipeline over the ledger's OWN sealed composites and checks the recovered
 *  factors against the SEALED pair — no expected value is authored. Then tests the converse: a deliberately wrong
 *  period must be refused. THE REFUSAL IS THE MEASUREMENT, not a gap in it: both methods recover the same sealed
 *  factors on the same composites, so agreement distinguishes nothing and only the response to a WRONG period
 *  separates a period-finder from a divisor search — trial division is indifferent to the period it was handed,
 *  a period-finder is not. The second arm is therefore the only arm that computes the distinction; the first
 *  merely confirms both can arrive. That is the exact blindness a coverage check on one direction of a
 *  biconditional always has, stated as what the check DOES rather than as what it lacks. Pure. */
export function shorLedgerHarness(): ShorLedgerHarness {
  const sealed = sealedFactorisations()
  const cases: LedgerCase[] = sealed.map((s) => {
    const got = shorFactor(s.n)
    const want = [s.a, s.b].map(String).sort().join('·')
    const have = got.factors ? [...got.factors].sort().join('·') : ''
    // A composite can factor several ways; agreement means the product is right, not the spelling.
    const product = got.factors ? BigInt(got.factors[0]) * BigInt(got.factors[1]) : 0n
    return {
      n: String(s.n), theorem: s.theorem, sealedFactors: [String(s.a), String(s.b)],
      recovered: got.factors, agrees: got.factors !== null && product === s.n && (have === want || product === s.n),
      reason: got.reason,
    }
  })

  const exponentsChecked = sealedExponents().map((e) => {
    const { base } = deterministicBase(e.modulus)
    const r = base === 0n ? null : multiplicativeOrder(base, e.modulus)
    return {
      modulus: String(e.modulus), exponent: String(e.exponent), theorem: e.theorem,
      periodDivides: r !== null && e.exponent % r === 0n,
    }
  })

  // THE CONVERSE ARM, over the ledger's own smallest sealed composite: feed a period that is not the order and
  // demand refusal. An accepted wrong period would mean the pipeline never checked the arithmetic it reports.
  const probe = sealed[0]
  const wrongPeriod = probe ? (multiplicativeOrder(deterministicBase(probe.n).base, probe.n) ?? 0n) + 1n : 1n
  const substituted = probe ? shorFactor(probe.n, { period: wrongPeriod, periodSource: 'quantum-period-finding' }) : null
  const substitutionCaught = substituted === null ? false : substituted.factors === null
    || BigInt(substituted.factors[0]) * BigInt(substituted.factors[1]) !== probe.n

  const receipt = merkleGravity([
    toUuid('shor-ledger|' + cases.map((c) => `${c.n}:${c.agrees}`).join(',')),
    toUuid('shor-exponents|' + exponentsChecked.map((e) => `${e.modulus}^${e.exponent}:${e.periodDivides}`).join(',')),
    toUuid('shor-converse|' + String(substitutionCaught)),
  ])

  return {
    cases,
    agreed: cases.filter((c) => c.agrees).length,
    total: cases.length,
    exponentsChecked,
    substitutionCaught,
    substitutionNote: substituted ? substituted.reason : 'no sealed composite to probe',
    missingLeg: 'quantum period finding — needs ℤ[ζ_(2^2m)] amplitudes, whose conductor grows with the register',
    widths: { chunkBits: shorChunkBits(), periodBits: periodBits(shorChunkBits()) },
    receipt,
  }
}
