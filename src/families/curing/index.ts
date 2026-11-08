import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CURING — scaffolded integer measures crossed to microbiology. Every output an exact finite nonnegative integer. */

const PROOF = 'curing arithmetic (saltconcentration, wateractivity, curetime, nitritelevel, phlevel, weightloss, microbialreduction, brinestrength); scaffolded from the integer-op palette; a measure crossed to microbiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'curing', dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `curing.${name}`, params })

export class CuringFormulas {
  static saltconcentration(x: number, y: number): CrossFormula { return c('curing-saltconcentration', 'saltconcentration(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'saltconcentration', [x, y]) }
  static wateractivity(x: number, y: number): CrossFormula { return c('curing-wateractivity', 'wateractivity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'wateractivity', [x, y]) }
  static curetime(x: number, y: number): CrossFormula { return c('curing-curetime', 'curetime(x, y) = x · y', x * y, nat(x, y), 'curetime', [x, y]) }
  static nitritelevel(x: number, y: number): CrossFormula { return c('curing-nitritelevel', 'nitritelevel(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'nitritelevel', [x, y]) }
  static phlevel(x: number, y: number): CrossFormula { return c('curing-phlevel', 'phlevel(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'phlevel', [x, y]) }
  static weightloss(x: number, y: number): CrossFormula { return c('curing-weightloss', 'weightloss(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'weightloss', [x, y]) }
  static microbialreduction(x: number, y: number): CrossFormula { return c('curing-microbialreduction', 'microbialreduction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'microbialreduction', [x, y]) }
  static brinestrength(x: number, y: number): CrossFormula { return c('curing-brinestrength', 'brinestrength(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'brinestrength', [x, y]) }
}

for (const name of ['brinestrength', 'curetime', 'microbialreduction', 'nitritelevel', 'phlevel', 'saltconcentration', 'wateractivity', 'weightloss'] as const)
  hexRegisterOf('curing', name, (CuringFormulas[name] as (...x: unknown[]) => unknown).bind(CuringFormulas))
