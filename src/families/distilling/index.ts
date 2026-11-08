import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DISTILLING — scaffolded integer measures crossed to chemistry. Every output an exact finite nonnegative integer. */

const PROOF = 'distilling arithmetic (abv, cuts, boilingpoint, refluxratio, yieldliters, platecombos, distillationruns, puritypct); scaffolded from the integer-op palette; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'distilling', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `distilling.${name}`, params })

export class DistillingFormulas {
  static abv(x: number, y: number): CrossFormula { return c('distilling-abv', 'abv(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'abv', [x, y]) }
  static cuts(x: number, y: number): CrossFormula { return c('distilling-cuts', 'cuts(x, y) = x + y', x + y, nat(x, y), 'cuts', [x, y]) }
  static boilingpoint(x: number, y: number): CrossFormula { return c('distilling-boilingpoint', 'boilingpoint(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'boilingpoint', [x, y]) }
  static refluxratio(x: number, y: number): CrossFormula { return c('distilling-refluxratio', 'refluxratio(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'refluxratio', [x, y]) }
  static yieldliters(x: number, y: number): CrossFormula { return c('distilling-yieldliters', 'yieldliters(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'yieldliters', [x, y]) }
  static platecombos(x: number, y: number): CrossFormula { return c('distilling-platecombos', 'platecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'platecombos', [x, y]) }
  static distillationruns(x: number, y: number): CrossFormula { return c('distilling-distillationruns', 'distillationruns(x, y) = x · y', x * y, nat(x, y), 'distillationruns', [x, y]) }
  static puritypct(x: number, y: number): CrossFormula { return c('distilling-puritypct', 'puritypct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'puritypct', [x, y]) }
}

for (const name of ['abv', 'boilingpoint', 'cuts', 'distillationruns', 'platecombos', 'puritypct', 'refluxratio', 'yieldliters'] as const)
  hexRegisterOf('distilling', name, (DistillingFormulas[name] as (...x: unknown[]) => unknown).bind(DistillingFormulas))
