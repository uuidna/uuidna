import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SCHOLASTICISM — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'scholasticism arithmetic (questionscount, articleorderings, objectioncombos, distinctionsubsets, syllogismcount, disputationstages, summaparts, consensusratio); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'scholasticism', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `scholasticism.${name}`, params })

export class ScholasticismFormulas {
  static questionscount(x: number, y: number): CrossFormula { return c('scholasticism-questionscount', 'questionscount(x, y) = x + y', x + y, nat(x, y), 'questionscount', [x, y]) }
  static articleorderings(x: number): CrossFormula { return c('scholasticism-articleorderings', 'articleorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'articleorderings', [x]) }
  static objectioncombos(x: number, y: number): CrossFormula { return c('scholasticism-objectioncombos', 'objectioncombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'objectioncombos', [x, y]) }
  static distinctionsubsets(x: number): CrossFormula { return c('scholasticism-distinctionsubsets', 'distinctionsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'distinctionsubsets', [x]) }
  static syllogismcount(x: number, y: number): CrossFormula { return c('scholasticism-syllogismcount', 'syllogismcount(x, y) = x · y', x * y, nat(x, y), 'syllogismcount', [x, y]) }
  static disputationstages(x: number, y: number): CrossFormula { return c('scholasticism-disputationstages', 'disputationstages(x, y) = x + y', x + y, nat(x, y), 'disputationstages', [x, y]) }
  static summaparts(x: number, y: number): CrossFormula { return c('scholasticism-summaparts', 'summaparts(x, y) = x + y', x + y, nat(x, y), 'summaparts', [x, y]) }
  static consensusratio(x: number, y: number): CrossFormula { return c('scholasticism-consensusratio', 'consensusratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'consensusratio', [x, y]) }
}

for (const name of ['articleorderings', 'consensusratio', 'disputationstages', 'distinctionsubsets', 'objectioncombos', 'questionscount', 'summaparts', 'syllogismcount'] as const)
  hexRegisterOf('scholasticism', name, (ScholasticismFormulas[name] as (...x: unknown[]) => unknown).bind(ScholasticismFormulas))
