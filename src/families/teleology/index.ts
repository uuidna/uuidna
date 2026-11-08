import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TELEOLOGY — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'teleology arithmetic (endscount, meanschains, goalpairs, causallevels, finalcauses, purposesubsets, orderingpaths, directednessratio); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'teleology', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `teleology.${name}`, params })

export class TeleologyFormulas {
  static endscount(x: number, y: number): CrossFormula { return c('teleology-endscount', 'endscount(x, y) = x + y', x + y, nat(x, y), 'endscount', [x, y]) }
  static meanschains(x: number): CrossFormula { return c('teleology-meanschains', 'meanschains(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'meanschains', [x]) }
  static goalpairs(x: number, y: number): CrossFormula { return c('teleology-goalpairs', 'goalpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'goalpairs', [x, y]) }
  static causallevels(x: number, y: number): CrossFormula { return c('teleology-causallevels', 'causallevels(x, y) = x + y', x + y, nat(x, y), 'causallevels', [x, y]) }
  static finalcauses(x: number, y: number): CrossFormula { return c('teleology-finalcauses', 'finalcauses(x, y) = x · y', x * y, nat(x, y), 'finalcauses', [x, y]) }
  static purposesubsets(x: number): CrossFormula { return c('teleology-purposesubsets', 'purposesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'purposesubsets', [x]) }
  static orderingpaths(x: number, y: number): CrossFormula { return c('teleology-orderingpaths', 'orderingpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'orderingpaths', [x, y]) }
  static directednessratio(x: number, y: number): CrossFormula { return c('teleology-directednessratio', 'directednessratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'directednessratio', [x, y]) }
}

for (const name of ['causallevels', 'directednessratio', 'endscount', 'finalcauses', 'goalpairs', 'meanschains', 'orderingpaths', 'purposesubsets'] as const)
  hexRegisterOf('teleology', name, (TeleologyFormulas[name] as (...x: unknown[]) => unknown).bind(TeleologyFormulas))
