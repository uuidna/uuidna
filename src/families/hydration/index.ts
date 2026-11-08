import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HYDRATION — scaffolded integer measures crossed to physiology. Every output an exact finite nonnegative integer. */

const PROOF = 'hydration arithmetic (dailyneed, sweatloss, replacementrate, deficit, electrolyteneed, urineoutput, fluidbalance, concentration); scaffolded from the integer-op palette; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hydration', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `hydration.${name}`, params })

export class HydrationFormulas {
  static dailyneed(x: number, y: number): CrossFormula { return c('hydration-dailyneed', 'dailyneed(x, y) = x · y', x * y, nat(x, y), 'dailyneed', [x, y]) }
  static sweatloss(x: number, y: number): CrossFormula { return c('hydration-sweatloss', 'sweatloss(x, y) = x · y', x * y, nat(x, y), 'sweatloss', [x, y]) }
  static replacementrate(x: number, y: number): CrossFormula { return c('hydration-replacementrate', 'replacementrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'replacementrate', [x, y]) }
  static deficit(x: number, y: number): CrossFormula { return c('hydration-deficit', 'deficit(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'deficit', [x, y]) }
  static electrolyteneed(x: number, y: number): CrossFormula { return c('hydration-electrolyteneed', 'electrolyteneed(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'electrolyteneed', [x, y]) }
  static urineoutput(x: number, y: number): CrossFormula { return c('hydration-urineoutput', 'urineoutput(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'urineoutput', [x, y]) }
  static fluidbalance(x: number, y: number): CrossFormula { return c('hydration-fluidbalance', 'fluidbalance(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'fluidbalance', [x, y]) }
  static concentration(x: number, y: number): CrossFormula { return c('hydration-concentration', 'concentration(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'concentration', [x, y]) }
}

for (const name of ['concentration', 'dailyneed', 'deficit', 'electrolyteneed', 'fluidbalance', 'replacementrate', 'sweatloss', 'urineoutput'] as const)
  hexRegisterOf('hydration', name, (HydrationFormulas[name] as (...x: unknown[]) => unknown).bind(HydrationFormulas))
