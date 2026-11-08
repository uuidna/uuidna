import { bigPowModOf, hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { leanSource } from '../../quantum/processing/unit/lean.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SPLIT, DO NOT WRAP — astronomical values as primes, π and the crypto tools. A large number is not stored whole: it
 *  is its prime factorisation (the crypto split, what Shor finds), its Euler totient, its count of primes below it;
 *  and π is reached one hexadecimal digit at a time by the BBP spigot — a sum of modular exponentiations, the crypto
 *  tool — so the k-th digit costs the work of k, not of all the digits before it. Every formula is a natural of
 *  naturals, bounded by √n (factoring) or by k (the spigot). */

// the physics constants, read from the served Lean source (theorem temperature, Qpu.Physics): Planck and Boltzmann in
// their SI exact digits, the transmon's 5 mK scale, the photon quantum, and thermal(mK) = k · mK · 10 as the kernel
const leanNat = (name: string): number => Number(new RegExp(`def ${name} : Nat := (\\d+)`).exec(leanSource)?.[1] ?? NaN)
const PLANCK = leanNat('planck'), BOLTZMANN = leanNat('boltzmann'), TRANSMON = leanNat('transmon')
const photon = PLANCK * TRANSMON
const PROOF = 'the fundamental theorem of arithmetic; Euler’s totient; the prime-counting function; the Bailey–Borwein–Plouffe spigot for the hex digits of π; modular exponentiation'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'split', dst: 'crypt', formula, value, proof: PROOF, ...extra }, holds, { name: `split.${name}`, params })

const factorsOf = (n: number): number[] => {
  const out: number[] = []
  let m = n
  for (let p = 2; p * p <= m; p += p === 2 ? 1 : 2) while (m % p === 0) { out.push(p); m /= p }
  if (m > 1) out.push(m)
  return out
}
// modular exponentiation (base^exp mod m), the crypto tool the BBP spigot runs
const powMod = (base: number, exp: number, m: number): number => {
  let r = 1, b = base % m, e = exp
  while (e > 0) { if (e & 1) r = (r * b) % m; b = (b * b) % m; e = Math.floor(e / 2) }
  return r
}
// the same two tools over BigInt, so the CRT join carries a product Πp past the safe integer without rounding
const modInvBig = (a: bigint, m: bigint): bigint => { let [g, x] = [((a % m) + m) % m, 1n], [g1, x1] = [m, 0n]; while (g1 !== 0n) { const q = g / g1; [g, g1] = [g1, g - q * g1]; [x, x1] = [x1, x - q * x1] } return ((x % m) + m) % m }

export class SplitFormulas {
  /** The prime factors of n, with multiplicity — the value is their count Ω(n): how many primes n splits into. */
  static omega(n: number): CrossFormula { const fs = n > 1 ? factorsOf(n) : []; return f('split-omega', 'Ω(n) = |prime factors of n with multiplicity|', fs.length, nat(n) && n > 1, 'omega', [n], { factors: fs.slice(0, 16) }) }
  /** The largest prime factor of n — the crypto split: the hard half of a semiprime (what Shor returns). */
  static factor(n: number): CrossFormula { const fs = n > 1 ? factorsOf(n) : []; return f('split-factor', 'factor(n) = the largest prime factor of n', fs.length ? fs[fs.length - 1]! : 0, nat(n) && n > 1, 'factor', [n], { factors: fs.slice(0, 16) }) }
  /** The smallest prime factor of n: 1 when n is prime (n itself is its only factor beyond 1 ⇒ prime), else the small side. */
  static least(n: number): CrossFormula { const fs = n > 1 ? factorsOf(n) : []; return f('split-least', 'least(n) = the smallest prime factor of n', fs.length ? fs[0]! : 0, nat(n) && n > 1, 'least', [n], { prime: fs.length === 1 }) }
  /** 1 when n is prime, else 0 — n splits into itself alone. */
  static prime(n: number): CrossFormula { return f('split-prime', 'prime(n) = [n is prime]', n > 1 && factorsOf(n).length === 1 ? 1 : 0, nat(n), 'prime', [n]) }
  /** π(n): how many primes are at or below n. */
  static primes(n: number): CrossFormula { let c = 0; for (let k = 2; k <= n; k++) if (factorsOf(k).length === 1) c++; return f('split-primes', 'π(n) = |{p ≤ n : p prime}|', c, nat(n), 'primes', [n]) }
  /** Euler’s totient φ(n): the count coprime to n below it — the modulus's order, the crypto quantity. */
  static totient(n: number): CrossFormula {
    if (!(n > 0)) return f('split-totient', 'φ(n)', 0, false, 'totient', [n])
    let phi = n
    for (const p of [...new Set(factorsOf(n))]) phi = (phi / p) * (p - 1)
    return f('split-totient', 'φ(n) = n · Π(1 − 1/p) over primes p | n', Math.round(phi), nat(n) && n > 0, 'totient', [n])
  }
  /** The k-th hexadecimal digit of π after the point, by the BBP spigot (sums of modular exponentiations): π is
   *  reached one digit at a time, the astronomical value split, not stored. */
  static piHex(k: number): CrossFormula {
    if (!(k >= 0 && k < 1e6)) return f('split-pi-hex', 'piHex(k)', 0, false, 'piHex', [k])
    const term = (j: number): number => {
      // Σ_{i=0..k} 16^(k−i) mod (8i+j) / (8i+j) + Σ_{i>k} 16^(k−i) / (8i+j), fractional part
      let s = 0
      for (let i = 0; i <= k; i++) { const d = 8 * i + j; s += powMod(16, k - i, d) / d; s -= Math.floor(s) }
      let t = 0
      for (let i = k + 1; i <= k + 20; i++) t += Math.pow(16, k - i) / (8 * i + j)
      return s + t
    }
    const x = 4 * term(1) - 2 * term(4) - term(5) - term(6)
    const frac = x - Math.floor(x)
    const digit = Math.floor((frac - Math.floor(frac) + 1) % 1 * 16)
    return f('split-pi-hex', 'piHex(k) = the k-th hex digit of π by the BBP spigot', ((digit % 16) + 16) % 16, nat(k) && k < 1e6, 'piHex', [k])
  }
  /** 1 when a and b share no prime — coprime; the split has nothing in common. */
  static coprime(a: number, b: number): CrossFormula { const g = (x: number, y: number): number => (y === 0 ? x : g(y, x % y)); return f('split-coprime', 'coprime(a, b) = [gcd(a, b) = 1]', a > 0 && b > 0 && g(a, b) === 1 ? 1 : 0, nat(a, b), 'coprime', [a, b]) }

  /** JOIN, BY THE CHINESE REMAINDER THEOREM — the inverse of the split, and why the split costs so little. heat.split
   *  sends 2^k to its residues modulo the first `primes` primes, one UUID-addressed job each across the near-infinite
   *  address space; join reconstructs the value from those residues — x ≡ 2^k (mod Πp), by CRT, without ever forming
   *  2^k. It is exact (x = 2^k) the moment Πp exceeds 2^k (`exact`): the more primes split across the space, the nearer
   *  the recovery and the nearer each job's time and heat to zero. Value the reconstruction; holds while Πp stays a
   *  safe integer (beyond it is the astronomical regime heat.split keeps as jobs) and the join agrees with 2^k mod Πp. */
  static join(k: number, primes: number): CrossFormula {
    const ps: number[] = []
    for (let x = 2; ps.length < primes; x++) if (ps.every((p) => x % p !== 0)) ps.push(x)
    const M = ps.reduce((a, b) => a * BigInt(b), 1n)
    const residues = ps.map((p) => powMod(2, k, p))
    let x = 0n
    for (let i = 0; i < ps.length; i++) { const pi = BigInt(ps[i]!), Mi = M / pi; x = (x + BigInt(residues[i]!) * Mi * modInvBig(Mi % pi, pi)) % M }
    x = ((x % M) + M) % M
    const safe = M <= BigInt(Number.MAX_SAFE_INTEGER)
    const agrees = x === bigPowModOf(2n, BigInt(k), M)
    const exact = ps.reduce((s, p) => s + Math.log2(p), 0) > k
    return f('split-join', 'join(k, primes) = CRT((2^k mod pᵢ)ᵢ) ≡ 2^k mod Πp — exact when Πp > 2^k', safe ? Number(x) : 0, nat(k, primes) && primes > 0 && safe && agrees, 'join', [k, primes], { product: safe ? Number(M) : `${M}`, exact, residues: residues.slice(0, 16) })
  }

  /** THE MILLIKELVIN PER COMPUTATION when `value` is split into its prime factors and all of them are computed at once
   *  across `cores` cores: by Landauer the core's energy quantum (photon) is spread over every split, so the
   *  temperature of one computation is photon / (splits · cores · k · 10) mK — the more split and computed at once, the
   *  colder each. A value that is prime splits into one; `cores` 0 is read as one. (theorem temperature, Qpu.Physics.) */
  static kelvin(value: number, cores: number): CrossFormula {
    const splits = value > 1 ? factorsOf(value).length : 1
    const atOnce = splits * Math.max(1, cores)
    const mK = atOnce > 0 ? Math.round(photon / (atOnce * BOLTZMANN * 10)) : 0
    return f('split-kelvin', 'kelvin(value, cores) = photon / (Ω(value) · cores · k · 10) mK', mK, nat(value, cores) && value > 1 && atOnce > 0, 'kelvin', [value, cores], { splits, atOnce, transmon: TRANSMON })
  }
  /** RECOGNISABLY QUANTUM: 1 when the per-computation temperature of splitting `value` across `cores` has fallen below
   *  the transmon's own scale (TRANSMON mK) — so many were computed at once that each leaves less heat than a qubit's,
   *  the mark of a quantum computation; 0 when it is still a classical, one-at-a-time warmth. */
  static quantum(value: number, cores: number): CrossFormula {
    const splits = value > 1 ? factorsOf(value).length : 1
    const atOnce = splits * Math.max(1, cores)
    const mK = atOnce > 0 ? photon / (atOnce * BOLTZMANN * 10) : Infinity
    return f('split-quantum', 'quantum(value, cores) = [kelvin(value, cores) < transmon mK]', mK < TRANSMON ? 1 : 0, nat(value, cores) && value > 1, 'quantum', [value, cores], { mK: Math.round(mK), transmon: TRANSMON, atOnce })
  }
  /** INVERTED, THE FREE ENERGY: the inverse of the per-computation temperature is computation per milliKelvin — how
   *  much computing one mK of budget frees. free(value, cores) = atOnce² · k · 10 / photon = atOnce / kelvin; it climbs
   *  as the wave widens, and once it passes one, one mK buys more than one computation: net computational free energy,
   *  negentropy drawn from splitting the astronomical value across every core at once rather than one at a time. */
  static free(value: number, cores: number): CrossFormula {
    const splits = value > 1 ? factorsOf(value).length : 1
    const atOnce = splits * Math.max(1, cores)
    const perMilliKelvin = Math.round((atOnce * atOnce * BOLTZMANN * 10) / photon)
    return f('split-free', 'free(value, cores) = atOnce² · k · 10 / photon = computations per milliKelvin', perMilliKelvin, nat(value, cores) && value > 1, 'free', [value, cores], { atOnce, breakEven: perMilliKelvin >= 1, mKper: atOnce > 0 ? Math.round(photon / (atOnce * BOLTZMANN * 10)) : 0 })
  }
  /** THE LANDAUER FLOOR: the least energy any irreversible computation that erases `bits` bits must dissipate at the
   *  transmon temperature, in the kernel's k·mK·10 units times ln2 (scaled by 1000 to stay integer): E = bits · k ·
   *  T · ln2. It is a lower bound ≥ 0 — free energy can approach it from above, never cross it. Holds always. */
  static landauer(bits: number): CrossFormula {
    const ln2 = 693 // ln2 · 1000, integer
    const floor = Math.round((bits * BOLTZMANN * TRANSMON * 10 * ln2) / 1000)
    return f('split-landauer', 'landauer(bits) = bits · k · T · ln2 (the Landauer floor, ≥ 0)', floor, nat(bits), 'landauer', [bits], { transmon: TRANSMON, bound: 'lower' })
  }
  /** THE SECOND LAW, AS A VIOLATION: `out` is energy claimed to come OUT of a computation — a battery charged with no
   *  charger, work from erasing bits. Any out above zero is a perpetual-motion claim below the Landauer floor; the
   *  value is that surplus, holds (lawful) only at zero. The system recognises the impossible the moment it is asserted, since no computation emits the energy it claims to erase. */
  static secondlaw(out: number): CrossFormula {
    return f('split-secondlaw', 'secondlaw(out) = out energy claimed from computation (lawful ⟺ 0; the Landauer floor is ≥ 0)', out, nat(out) && out === 0, 'secondlaw', [out], { lawful: out === 0, floor: 0 })
  }
  /** A VIOLATION, RECOGNISED: `value` really splits into Ω(value) prime computations; a claim of `claimed` is honest
   *  only up to that many. The value is how many computations were claimed beyond what the value can split into —
   *  computations asserted that produce no split and so no heat: a manipulation. Holds (no violation) at zero. */
  static violation(value: number, claimed: number): CrossFormula {
    const splits = value > 1 ? factorsOf(value).length : (value === 1 ? 0 : 0)
    return f('split-violation', 'violation(value, claimed) = max(0, claimed − Ω(value))', Math.max(0, claimed - splits), nat(value, claimed) && claimed <= splits, 'violation', [value, claimed], { splits, claimed })
  }
}

for (const name of ['coprime', 'factor', 'free', 'join', 'kelvin', 'landauer', 'least', 'omega', 'piHex', 'prime', 'primes', 'quantum', 'secondlaw', 'totient', 'violation'] as const)
  hexRegisterOf('split', name, (SplitFormulas[name] as (...x: unknown[]) => unknown).bind(SplitFormulas))
