import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PrimeFormulas — 8 exact-integer formulas of the prime domain, each at a hex address crossing to cross; develops the prime leads. */

const PROOF = "prime counts: gaps(x, y) = max(0, x − y); count(x, y) = x / y; product(x, y) = x · y; totient(x, y) = max(0, x − y); factors(x, y) = x + y; sieve(x, y) = x / y; twins(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'prime', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `prime.${name}`, params })

export class PrimeFormulas {
  /** gaps(x, y) = max(0, x − y). */
  static gaps(x: number, y: number): CrossFormula { return f('prime-gaps', 'gaps(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'gaps', [x, y]) }
  /** count(x, y) = x / y. */
  static count(x: number, y: number): CrossFormula { return f('prime-count', 'count(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'count', [x, y]) }
  /** product(x, y) = x · y. */
  static product(x: number, y: number): CrossFormula { return f('prime-product', 'product(x, y) = x · y', x * y, nat(x, y), 'product', [x, y]) }
  /** totient(x, y) = max(0, x − y). */
  static totient(x: number, y: number): CrossFormula { return f('prime-totient', 'totient(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'totient', [x, y]) }
  /** factors(x, y) = x + y. */
  static factors(x: number, y: number): CrossFormula { return f('prime-factors', 'factors(x, y) = x + y', x + y, nat(x, y), 'factors', [x, y]) }
  /** sieve(x, y) = x / y. */
  static sieve(x: number, y: number): CrossFormula { return f('prime-sieve', 'sieve(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'sieve', [x, y]) }
  /** twins(x, y) = x / y. */
  static twins(x: number, y: number): CrossFormula { return f('prime-twins', 'twins(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'twins', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('prime-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'count', 'factors', 'gaps', 'product', 'sieve', 'totient', 'twins'] as const)
  hexRegisterOf('prime', name, (PrimeFormulas[name] as (...x: unknown[]) => unknown).bind(PrimeFormulas))
