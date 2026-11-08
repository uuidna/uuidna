import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CALCULUS — THE CONTINUOUS MADE DISCRETE, AS ARITHMETIC. Change is numbers: the power rule on a monomial, an integral
 *  by the reverse power rule, a secant slope, a Riemann rectangle, a quotient limit, an average rate, a partial sum, and
 *  a tangent line read off a slope. Crosses to `code` — calculus is what code computes. A measure over the naturals. */

const PROOF = 'calculus arithmetic (derivative, integral, slope, area, limit, rate, series, tangent); the continuous made discrete over the naturals; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'calculus', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `calculus.${name}`, params })

export class CalculusFormulas {
  /** DERIVATIVE: the power rule on a monomial. value coefficient · exponent. */
  static derivative(coefficient: number, exponent: number): CrossFormula { return c('calculus-derivative', 'derivative(coefficient, exponent) = coefficient · exponent', coefficient * exponent, nat(coefficient, exponent), 'derivative', [coefficient, exponent]) }
  /** INTEGRAL: the reverse power rule on a monomial. value ⌊coefficient / (exponent + 1)⌋. */
  static integral(coefficient: number, exponent: number): CrossFormula { return c('calculus-integral', 'integral(coefficient, exponent) = ⌊coefficient / (exponent + 1)⌋', (exponent + 1) > 0 ? Math.floor(coefficient / (exponent + 1)) : 0, nat(coefficient, exponent) && (exponent + 1) > 0, 'integral', [coefficient, exponent]) }
  /** SLOPE: a secant over two points. value ⌊deltay / deltax⌋. */
  static slope(deltay: number, deltax: number): CrossFormula { return c('calculus-slope', 'slope(deltay, deltax) = ⌊deltay / deltax⌋', deltax > 0 ? Math.floor(deltay / deltax) : 0, nat(deltay, deltax) && deltax > 0, 'slope', [deltay, deltax]) }
  /** AREA: a Riemann rectangle. value width · height. */
  static area(width: number, height: number): CrossFormula { return c('calculus-area', 'area(width, height) = width · height', width * height, nat(width, height), 'area', [width, height]) }
  /** LIMIT: a quotient approached. value ⌊numerator / denominator⌋. */
  static limit(numerator: number, denominator: number): CrossFormula { return c('calculus-limit', 'limit(numerator, denominator) = ⌊numerator / denominator⌋', denominator > 0 ? Math.floor(numerator / denominator) : 0, nat(numerator, denominator) && denominator > 0, 'limit', [numerator, denominator]) }
  /** RATE: average change over time. value ⌊change / time⌋. */
  static rate(change: number, time: number): CrossFormula { return c('calculus-rate', 'rate(change, time) = ⌊change / time⌋', time > 0 ? Math.floor(change / time) : 0, nat(change, time) && time > 0, 'rate', [change, time]) }
  /** SERIES: a partial sum proxy. value terms · ratio. */
  static series(terms: number, ratio: number): CrossFormula { return c('calculus-series', 'series(terms, ratio) = terms · ratio', terms * ratio, nat(terms, ratio), 'series', [terms, ratio]) }
  /** TANGENT: a tangent line read off a slope. value slope · point. */
  static tangent(slope_: number, point: number): CrossFormula { return c('calculus-tangent', 'tangent(slope, point) = slope · point', slope_ * point, nat(slope_, point), 'tangent', [slope_, point]) }
}

for (const name of ['area', 'derivative', 'integral', 'limit', 'rate', 'series', 'slope', 'tangent'] as const)
  hexRegisterOf('calculus', name, (CalculusFormulas[name] as (...x: unknown[]) => unknown).bind(CalculusFormulas))
