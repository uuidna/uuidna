import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SCIENCE — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'science arithmetic (hypotheses, experimentpairs, replications, confidence, variableorderings, effectsize, peerreviews, reproducibility); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'science', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `science.${name}`, params })

export class ScienceFormulas {
  static hypotheses(x: number, y: number): CrossFormula { return c('science-hypotheses', 'hypotheses(x, y) = x + y', x + y, nat(x, y), 'hypotheses', [x, y]) }
  static experimentpairs(x: number, y: number): CrossFormula { return c('science-experimentpairs', 'experimentpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'experimentpairs', [x, y]) }
  static replications(x: number, y: number): CrossFormula { return c('science-replications', 'replications(x, y) = x · y', x * y, nat(x, y), 'replications', [x, y]) }
  static confidence(x: number, y: number): CrossFormula { return c('science-confidence', 'confidence(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'confidence', [x, y]) }
  static variableorderings(x: number): CrossFormula { return c('science-variableorderings', 'variableorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'variableorderings', [x]) }
  static effectsize(x: number, y: number): CrossFormula { return c('science-effectsize', 'effectsize(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'effectsize', [x, y]) }
  static peerreviews(x: number, y: number): CrossFormula { return c('science-peerreviews', 'peerreviews(x, y) = x + y', x + y, nat(x, y), 'peerreviews', [x, y]) }
  static reproducibility(x: number, y: number): CrossFormula { return c('science-reproducibility', 'reproducibility(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'reproducibility', [x, y]) }
}

for (const name of ['confidence', 'effectsize', 'experimentpairs', 'hypotheses', 'peerreviews', 'replications', 'reproducibility', 'variableorderings'] as const)
  hexRegisterOf('science', name, (ScienceFormulas[name] as (...x: unknown[]) => unknown).bind(ScienceFormulas))
