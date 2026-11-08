import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INEQUALITY — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'inequality arithmetic (giniscaled, quintileratio, palmaratio, lorenzgap, percentilepairs, topshare, deciles, theilindex); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'inequality', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `inequality.${name}`, params })

export class InequalityFormulas {
  static giniscaled(x: number, y: number): CrossFormula { return c('inequality-giniscaled', 'giniscaled(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'giniscaled', [x, y]) }
  static quintileratio(x: number, y: number): CrossFormula { return c('inequality-quintileratio', 'quintileratio(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'quintileratio', [x, y]) }
  static palmaratio(x: number, y: number): CrossFormula { return c('inequality-palmaratio', 'palmaratio(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'palmaratio', [x, y]) }
  static lorenzgap(x: number, y: number): CrossFormula { return c('inequality-lorenzgap', 'lorenzgap(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'lorenzgap', [x, y]) }
  static percentilepairs(x: number, y: number): CrossFormula { return c('inequality-percentilepairs', 'percentilepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'percentilepairs', [x, y]) }
  static topshare(x: number, y: number): CrossFormula { return c('inequality-topshare', 'topshare(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'topshare', [x, y]) }
  static deciles(x: number, y: number): CrossFormula { return c('inequality-deciles', 'deciles(x, y) = x + y', x + y, nat(x, y), 'deciles', [x, y]) }
  static theilindex(x: number, y: number): CrossFormula { return c('inequality-theilindex', 'theilindex(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'theilindex', [x, y]) }
}

for (const name of ['deciles', 'giniscaled', 'lorenzgap', 'palmaratio', 'percentilepairs', 'quintileratio', 'theilindex', 'topshare'] as const)
  hexRegisterOf('inequality', name, (InequalityFormulas[name] as (...x: unknown[]) => unknown).bind(InequalityFormulas))
