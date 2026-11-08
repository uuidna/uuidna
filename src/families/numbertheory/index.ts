import { gcdOf, hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NUMBERTHEORY — THE ARITHMETIC OF THE WHOLE NUMBERS, AS EXACT INTEGERS. The oldest formulas: the greatest common divisor
 *  and the least common multiple, Euler's totient, how many divisors a number has, whether it is prime, a power taken under a
 *  modulus, the sum of a number's digits, and a factorial under a modulus. Crosses to `algebra` — number theory is the
 *  arithmetic algebra reasons over. Every value a finite integer; every division guarded; every input hex-addressable. */

const PROOF = 'number theory as exact integers (gcd by Euclid, lcm, Euler totient, divisor count, primality, modular exponentiation by squaring, digit sum, factorial mod); a measure crossed to algebra'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'numbertheory', dst: 'algebra', formula, value, proof: PROOF, ...extra }, holds, { name: `numbertheory.${name}`, params })


export class NumbertheoryFormulas {
  /** GREATEST COMMON DIVISOR by Euclid's algorithm. value gcd(a, b). */
  static gcd(a: number, b: number): CrossFormula { return c('numbertheory-gcd', 'gcd(a, b) = Euclid(a, b)', gcdOf(a, b), nat(a, b), 'gcd', [a, b]) }
  /** LEAST COMMON MULTIPLE: the product over the gcd. value a · b / gcd(a, b). */
  static lcm(a: number, b: number): CrossFormula { const g = gcdOf(a, b); return c('numbertheory-lcm', 'lcm(a, b) = a · b / gcd(a, b)', g > 0 ? (a / g) * b : 0, nat(a, b), 'lcm', [a, b]) }
  /** EULER'S TOTIENT: the count of k in [1, n] coprime to n. value φ(n). */
  static totient(n: number): CrossFormula { let count = 0; for (let k = 1; k <= n; k++) if (gcdOf(k, n) === 1) count++; return c('numbertheory-totient', 'totient(n) = #{ 1 ≤ k ≤ n : gcd(k, n) = 1 }', count, nat(n), 'totient', [n]) }
  /** DIVISOR COUNT: how many positive integers divide n. value τ(n). */
  static divisorcount(n: number): CrossFormula { let count = 0; for (let k = 1; k <= n; k++) if (n % k === 0) count++; return c('numbertheory-divisorcount', 'divisorcount(n) = #{ 1 ≤ k ≤ n : k | n }', count, nat(n), 'divisorcount', [n]) }
  /** PRIMALITY: 1 when n is prime, by trial division to √n. value [n is prime]. */
  static isprime(n: number): CrossFormula { let prime = n >= 2 ? 1 : 0; for (let k = 2; k * k <= n; k++) if (n % k === 0) { prime = 0; break } return c('numbertheory-isprime', 'isprime(n) = [n prime]', prime, nat(n), 'isprime', [n]) }
  /** MODULAR EXPONENTIATION by repeated squaring. value base^exp mod mod. */
  static modpow(base: number, exp: number, mod: number): CrossFormula {
    let result = mod > 0 ? 1 % mod : 0, b = mod > 0 ? base % mod : 0, e = exp
    if (mod > 0) while (e > 0) { if (e % 2 === 1) result = (result * b) % mod; e = Math.floor(e / 2); b = (b * b) % mod }
    return c('numbertheory-modpow', 'modpow(base, exp, mod) = base^exp mod mod (by squaring)', mod > 0 ? result : 0, nat(base, exp, mod) && mod > 0, 'modpow', [base, exp, mod])
  }
  /** DIGIT SUM: the sum of n's decimal digits. value Σ digits(n). */
  static digitsum(n: number): CrossFormula { let sum = 0, m = n; while (m > 0) { sum += m % 10; m = Math.floor(m / 10) } return c('numbertheory-digitsum', 'digitsum(n) = Σ digits₁₀(n)', sum, nat(n), 'digitsum', [n]) }
  /** FACTORIAL UNDER A MODULUS. value n! mod mod. */
  static factorialmod(n: number, mod: number): CrossFormula { let result = mod > 0 ? 1 % mod : 0; if (mod > 0) for (let k = 2; k <= n; k++) result = (result * k) % mod; return c('numbertheory-factorialmod', 'factorialmod(n, mod) = n! mod mod', mod > 0 ? result : 0, nat(n, mod) && mod > 0, 'factorialmod', [n, mod]) }
}

for (const name of ['digitsum', 'divisorcount', 'factorialmod', 'gcd', 'isprime', 'lcm', 'modpow', 'totient'] as const)
  hexRegisterOf('numbertheory', name, (NumbertheoryFormulas[name] as (...x: unknown[]) => unknown).bind(NumbertheoryFormulas))
