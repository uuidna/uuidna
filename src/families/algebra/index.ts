import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ALGEBRA — THE SCHOOL FORMULAS AS INTEGER ARITHMETIC. A line, a parabola, a discriminant, a slope, a factorial, the
 *  greatest common divisor, a power, and the roots' discriminant from sum and product. Every value an integer; every
 *  division guarded; the discriminant and the roots may be negative. Crosses to `code` — algebra is what code runs. */

const PROOF = 'algebra arithmetic (linear, quadratic, discriminant, slope, factorial, gcd, power, roots); integer values, guarded division; crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'algebra', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `algebra.${name}`, params })

export class AlgebraFormulas {
  /** LINEAR: a line through the origin. value slope · x. */
  static linear(slope: number, x: number): CrossFormula { return c('algebra-linear', 'linear(slope, x) = slope · x', slope * x, nat(slope, x), 'linear', [slope, x]) }
  /** QUADRATIC: a parabola through the origin. value a · x². */
  static quadratic(a: number, x: number): CrossFormula { return c('algebra-quadratic', 'quadratic(a, x) = a · x²', a * x * x, nat(a, x), 'quadratic', [a, x]) }
  /** DISCRIMINANT: b² − 4ac (may be negative). value b² − 4 · ac. */
  static discriminant(b: number, ac: number): CrossFormula { return c('algebra-discriminant', 'discriminant(b, ac) = b² − 4 · ac', b * b - 4 * ac, nat(b, ac), 'discriminant', [b, ac]) }
  /** SLOPE: rise over run, scaled by 100 (guard run > 0). value ⌊rise · 100 / run⌋. */
  static slope(rise: number, run: number): CrossFormula { return c('algebra-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) }
  /** FACTORIAL: n! by iteration for small n (guard n ≥ 0, cap n ≤ 12). value n!. */
  static factorial(n: number): CrossFormula { let f = 0; if (n >= 0 && n <= 12) { f = 1; for (let i = 2; i <= n; i++) f = f * i } return c('algebra-factorial', 'factorial(n) = n! (0 ≤ n ≤ 12)', f, nat(n) && n <= 12, 'factorial', [n]) }
  /** GCD: the greatest common divisor by Euclid's algorithm. value gcd(a, b). */
  static gcd(a: number, b: number): CrossFormula { let p = a; let q = b; while (q > 0) { const r = p % q; p = q; q = r } return c('algebra-gcd', 'gcd(a, b) via Euclid', p, nat(a, b), 'gcd', [a, b]) }
  /** POWER: base raised to exp (keep exp small). value baseᵉˣᵖ. */
  static power(base: number, exp: number): CrossFormula { return c('algebra-power', 'power(base, exp) = baseᵉˣᵖ', base ** exp, nat(base, exp), 'power', [base, exp]) }
  /** ROOTS: the discriminant from a monic sum and product, s² − 4p (may be negative). value sum² − 4 · product. */
  static roots(sum: number, product: number): CrossFormula { return c('algebra-roots', 'roots(sum, product) = sum² − 4 · product', sum * sum - 4 * product, nat(sum, product), 'roots', [sum, product]) }
}

for (const name of ['discriminant', 'factorial', 'gcd', 'linear', 'power', 'quadratic', 'roots', 'slope'] as const)
  hexRegisterOf('algebra', name, (AlgebraFormulas[name] as (...x: unknown[]) => unknown).bind(AlgebraFormulas))
