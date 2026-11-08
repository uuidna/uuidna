import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROBABILITY — CHANCE AS ARITHMETIC (odds, conditional chance, expectation, Bayes, combinations, variance, entropy,
 *  independence). Every value an integer: a chance is a percentage ⌊·100/·⌋, an expectation a floor, a count a product.
 *  Crosses to `code` — probability is what programs reason under uncertainty. A measure. */

const PROOF = 'probability arithmetic (odds, conditional, expectation, Bayes, combinations, variance, entropy, independence) as integer percentages and floors; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'probability', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `probability.${name}`, params })

export class ProbabilityFormulas {
  /** ODDS: favorable outcomes over the total, as a percentage. value ⌊favorable · 100 / total⌋. */
  static odds(favorable: number, total: number): CrossFormula { return c('probability-odds', 'odds(favorable, total) = ⌊favorable · 100 / total⌋', total > 0 ? Math.floor((favorable * 100) / total) : 0, nat(favorable, total) && total > 0 && favorable <= total, 'odds', [favorable, total]) }
  /** CONDITIONAL: the joint chance over the given, as a percentage. value ⌊joint · 100 / given⌋. */
  static conditional(joint: number, given: number): CrossFormula { return c('probability-conditional', 'conditional(joint, given) = ⌊joint · 100 / given⌋', given > 0 ? Math.floor((joint * 100) / given) : 0, nat(joint, given) && given > 0, 'conditional', [joint, given]) }
  /** EXPECTED value: a value weighted by its percentage chance. value ⌊value · probability / 100⌋. */
  static expected(value: number, probability: number): CrossFormula { return c('probability-expected', 'expected(value, probability) = ⌊value · probability / 100⌋', Math.floor((value * probability) / 100), nat(value, probability), 'expected', [value, probability]) }
  /** BAYES: a prior scaled by a percentage likelihood. value ⌊prior · likelihood / 100⌋. */
  static bayes(prior: number, likelihood: number): CrossFormula { return c('probability-bayes', 'bayes(prior, likelihood) = ⌊prior · likelihood / 100⌋', Math.floor((prior * likelihood) / 100), nat(prior, likelihood), 'bayes', [prior, likelihood]) }
  /** COMBINATIONS: the ways to choose, a product proxy. value items · choose. */
  static combinations(items: number, choose: number): CrossFormula { return c('probability-combinations', 'combinations(items, choose) = items · choose', items * choose, nat(items, choose), 'combinations', [items, choose]) }
  /** VARIANCE: summed squared deviation over the trials. value ⌊squared / trials⌋. */
  static variance(squared: number, trials: number): CrossFormula { return c('probability-variance', 'variance(squared, trials) = ⌊squared / trials⌋', trials > 0 ? Math.floor(squared / trials) : 0, nat(squared, trials) && trials > 0, 'variance', [squared, trials]) }
  /** ENTROPY: the outcomes, a bits proxy. value outcomes. */
  static entropy(outcomes: number): CrossFormula { return c('probability-entropy', 'entropy(outcomes) = outcomes', outcomes, nat(outcomes), 'entropy', [outcomes]) }
  /** INDEPENDENCE: the joint over a marginal, as a percentage. value ⌊joint · 100 / marginal⌋. */
  static independence(joint: number, marginal: number): CrossFormula { return c('probability-independence', 'independence(joint, marginal) = ⌊joint · 100 / marginal⌋', marginal > 0 ? Math.floor((joint * 100) / marginal) : 0, nat(joint, marginal) && marginal > 0, 'independence', [joint, marginal]) }
}

for (const name of ['bayes', 'combinations', 'conditional', 'entropy', 'expected', 'independence', 'odds', 'variance'] as const)
  hexRegisterOf('probability', name, (ProbabilityFormulas[name] as (...x: unknown[]) => unknown).bind(ProbabilityFormulas))
