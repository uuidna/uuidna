import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TERATOLOGY — scaffolded integer measures crossed to physiology. Every output an exact finite nonnegative integer. */

const PROOF = 'teratology arithmetic (malformationrate, criticalwindows, doseresponse, exposurepairs, riskindex, stageorderings, thresholddose, incidence); scaffolded from the integer-op palette; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'teratology', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `teratology.${name}`, params })

export class TeratologyFormulas {
  static malformationrate(x: number, y: number): CrossFormula { return c('teratology-malformationrate', 'malformationrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'malformationrate', [x, y]) }
  static criticalwindows(x: number, y: number): CrossFormula { return c('teratology-criticalwindows', 'criticalwindows(x, y) = x + y', x + y, nat(x, y), 'criticalwindows', [x, y]) }
  static doseresponse(x: number, y: number): CrossFormula { return c('teratology-doseresponse', 'doseresponse(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'doseresponse', [x, y]) }
  static exposurepairs(x: number, y: number): CrossFormula { return c('teratology-exposurepairs', 'exposurepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'exposurepairs', [x, y]) }
  static riskindex(x: number, y: number): CrossFormula { return c('teratology-riskindex', 'riskindex(x, y) = x · y', x * y, nat(x, y), 'riskindex', [x, y]) }
  static stageorderings(x: number): CrossFormula { return c('teratology-stageorderings', 'stageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stageorderings', [x]) }
  static thresholddose(x: number, y: number): CrossFormula { return c('teratology-thresholddose', 'thresholddose(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'thresholddose', [x, y]) }
  static incidence(x: number, y: number): CrossFormula { return c('teratology-incidence', 'incidence(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'incidence', [x, y]) }
}

for (const name of ['criticalwindows', 'doseresponse', 'exposurepairs', 'incidence', 'malformationrate', 'riskindex', 'stageorderings', 'thresholddose'] as const)
  hexRegisterOf('teratology', name, (TeratologyFormulas[name] as (...x: unknown[]) => unknown).bind(TeratologyFormulas))
