import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FRONTOGENESIS — scaffolded integer measures crossed to meteorology. Every output an exact finite nonnegative integer. */

const PROOF = 'frontogenesis arithmetic (temperaturegradient, frontspeed, fronttypes, convergencerate, baroclinicity, pressuretrough, liftingindex, intensification); scaffolded from the integer-op palette; a measure crossed to meteorology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'frontogenesis', dst: 'meteorology', formula, value, proof: PROOF, ...extra }, holds, { name: `frontogenesis.${name}`, params })

export class FrontogenesisFormulas {
  static temperaturegradient(x: number, y: number): CrossFormula { return c('frontogenesis-temperaturegradient', 'temperaturegradient(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'temperaturegradient', [x, y]) }
  static frontspeed(x: number, y: number): CrossFormula { return c('frontogenesis-frontspeed', 'frontspeed(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'frontspeed', [x, y]) }
  static fronttypes(x: number, y: number): CrossFormula { return c('frontogenesis-fronttypes', 'fronttypes(x, y) = x + y', x + y, nat(x, y), 'fronttypes', [x, y]) }
  static convergencerate(x: number, y: number): CrossFormula { return c('frontogenesis-convergencerate', 'convergencerate(x, y) = x · y', x * y, nat(x, y), 'convergencerate', [x, y]) }
  static baroclinicity(x: number, y: number): CrossFormula { return c('frontogenesis-baroclinicity', 'baroclinicity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'baroclinicity', [x, y]) }
  static pressuretrough(x: number, y: number): CrossFormula { return c('frontogenesis-pressuretrough', 'pressuretrough(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'pressuretrough', [x, y]) }
  static liftingindex(x: number, y: number): CrossFormula { return c('frontogenesis-liftingindex', 'liftingindex(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'liftingindex', [x, y]) }
  static intensification(x: number, y: number): CrossFormula { return c('frontogenesis-intensification', 'intensification(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'intensification', [x, y]) }
}

for (const name of ['baroclinicity', 'convergencerate', 'frontspeed', 'fronttypes', 'intensification', 'liftingindex', 'pressuretrough', 'temperaturegradient'] as const)
  hexRegisterOf('frontogenesis', name, (FrontogenesisFormulas[name] as (...x: unknown[]) => unknown).bind(FrontogenesisFormulas))
