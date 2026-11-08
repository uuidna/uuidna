import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** KARST — scaffolded integer measures crossed to geology. Every output an exact finite nonnegative integer. */

const PROOF = 'karst arithmetic (cavelength, dissolutionrate, sinkholedensity, conduitpairs, porosity, rechargerate, passageorderings, aquiferdepth); scaffolded from the integer-op palette; a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'karst', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `karst.${name}`, params })

export class KarstFormulas {
  static cavelength(x: number, y: number): CrossFormula { return c('karst-cavelength', 'cavelength(x, y) = x · y', x * y, nat(x, y), 'cavelength', [x, y]) }
  static dissolutionrate(x: number, y: number): CrossFormula { return c('karst-dissolutionrate', 'dissolutionrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dissolutionrate', [x, y]) }
  static sinkholedensity(x: number, y: number): CrossFormula { return c('karst-sinkholedensity', 'sinkholedensity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'sinkholedensity', [x, y]) }
  static conduitpairs(x: number, y: number): CrossFormula { return c('karst-conduitpairs', 'conduitpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'conduitpairs', [x, y]) }
  static porosity(x: number, y: number): CrossFormula { return c('karst-porosity', 'porosity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'porosity', [x, y]) }
  static rechargerate(x: number, y: number): CrossFormula { return c('karst-rechargerate', 'rechargerate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rechargerate', [x, y]) }
  static passageorderings(x: number): CrossFormula { return c('karst-passageorderings', 'passageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'passageorderings', [x]) }
  static aquiferdepth(x: number, y: number): CrossFormula { return c('karst-aquiferdepth', 'aquiferdepth(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'aquiferdepth', [x, y]) }
}

for (const name of ['aquiferdepth', 'cavelength', 'conduitpairs', 'dissolutionrate', 'passageorderings', 'porosity', 'rechargerate', 'sinkholedensity'] as const)
  hexRegisterOf('karst', name, (KarstFormulas[name] as (...x: unknown[]) => unknown).bind(KarstFormulas))
