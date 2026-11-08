import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BAYESIAN — INFERENCE AS ARITHMETIC (probabilities as per-mille integers, never floats). Belief is numbers: the posterior
 *  from prior · likelihood over evidence, a likelihood and a prior as counts, the evidence by total probability, odds, the
 *  Bayes factor, the odds update, and the marginal over hypotheses. Crosses to `probability` — Bayesian inference is its
 *  calculus. A measure. */

const PROOF = 'bayesian arithmetic (posterior, likelihood, prior, evidence, odds ratio, Bayes factor, odds update, marginal); probabilities as per-mille integers; a measure crossed to probability'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bayesian', dst: 'probability', formula, value, proof: PROOF, ...extra }, holds, { name: `bayesian.${name}`, params })

export class BayesianFormulas {
  /** POSTERIOR: prior · likelihood over evidence (all per-mille). value ⌊prior · likelihood / evidence⌋. */
  static posterior(prior: number, likelihood: number, evidence: number): CrossFormula { return c('bayesian-posterior', 'posterior(prior, likelihood, evidence) = ⌊prior · likelihood / evidence⌋', evidence > 0 ? Math.floor((prior * likelihood) / evidence) : 0, nat(prior, likelihood, evidence) && evidence > 0, 'posterior', [prior, likelihood, evidence]) }
  /** LIKELIHOOD P(E|H): hits over trials, in per-mille. value ⌊hits · 1000 / trials⌋. */
  static likelihood(hits: number, trials: number): CrossFormula { return c('bayesian-likelihood', 'likelihood(hits, trials) = ⌊hits · 1000 / trials⌋', trials > 0 ? Math.floor((hits * 1000) / trials) : 0, nat(hits, trials) && trials > 0 && hits <= trials, 'likelihood', [hits, trials]) }
  /** PRIOR P(H): favorable over total, in per-mille. value ⌊favorable · 1000 / total⌋. */
  static prior(favorable: number, total: number): CrossFormula { return c('bayesian-prior', 'prior(favorable, total) = ⌊favorable · 1000 / total⌋', total > 0 ? Math.floor((favorable * 1000) / total) : 0, nat(favorable, total) && total > 0 && favorable <= total, 'prior', [favorable, total]) }
  /** EVIDENCE P(E): total probability over two hypotheses. value jointA + jointB. */
  static evidence(jointA: number, jointB: number): CrossFormula { return c('bayesian-evidence', 'evidence(jointA, jointB) = jointA + jointB', jointA + jointB, nat(jointA, jointB), 'evidence', [jointA, jointB]) }
  /** ODDS RATIO: a per-mille probability as odds. value ⌊prob · 1000 / (1000 − prob)⌋. */
  static oddsratio(prob: number): CrossFormula { const d = Math.max(0, 1000 - prob); return c('bayesian-oddsratio', 'oddsratio(prob) = ⌊prob · 1000 / (1000 − prob)⌋', d > 0 ? Math.floor((prob * 1000) / d) : 0, nat(prob) && prob > 0 && prob < 1000, 'oddsratio', [prob]) }
  /** BAYES FACTOR: likelihood under H over likelihood under ¬H, in per-mille. value ⌊likeH · 1000 / likeN⌋. */
  static bayesfactor(likeH: number, likeN: number): CrossFormula { return c('bayesian-bayesfactor', 'bayesfactor(likeH, likeN) = ⌊likeH · 1000 / likeN⌋', likeN > 0 ? Math.floor((likeH * 1000) / likeN) : 0, nat(likeH, likeN) && likeN > 0, 'bayesfactor', [likeH, likeN]) }
  /** ODDS UPDATE: posterior odds from prior odds times the Bayes factor. value ⌊priorOdds · factor / 1000⌋. */
  static update(priorOdds: number, factor: number): CrossFormula { return c('bayesian-update', 'update(priorOdds, factor) = ⌊priorOdds · factor / 1000⌋', Math.floor((priorOdds * factor) / 1000), nat(priorOdds, factor), 'update', [priorOdds, factor]) }
  /** MARGINAL P(E): total probability over three hypotheses. value jointA + jointB + jointCc. */
  static marginal(jointA: number, jointB: number, jointCc: number): CrossFormula { return c('bayesian-marginal', 'marginal(jointA, jointB, jointCc) = jointA + jointB + jointCc', jointA + jointB + jointCc, nat(jointA, jointB, jointCc), 'marginal', [jointA, jointB, jointCc]) }
}

for (const name of ['bayesfactor', 'evidence', 'likelihood', 'marginal', 'oddsratio', 'posterior', 'prior', 'update'] as const)
  hexRegisterOf('bayesian', name, (BayesianFormulas[name] as (...x: unknown[]) => unknown).bind(BayesianFormulas))
