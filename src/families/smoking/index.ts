import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SMOKING — scaffolded integer measures crossed to microbiology. Every output an exact finite nonnegative integer. */

const PROOF = 'smoking arithmetic (smoketime, temperaturezone, phenoldeposition, moisturereduction, penetrationdepth, preservationindex, woodratio, surfacecolor); scaffolded from the integer-op palette; a measure crossed to microbiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'smoking', dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `smoking.${name}`, params })

export class SmokingFormulas {
  static smoketime(x: number, y: number): CrossFormula { return c('smoking-smoketime', 'smoketime(x, y) = x · y', x * y, nat(x, y), 'smoketime', [x, y]) }
  static temperaturezone(x: number, y: number): CrossFormula { return c('smoking-temperaturezone', 'temperaturezone(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'temperaturezone', [x, y]) }
  static phenoldeposition(x: number, y: number): CrossFormula { return c('smoking-phenoldeposition', 'phenoldeposition(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'phenoldeposition', [x, y]) }
  static moisturereduction(x: number, y: number): CrossFormula { return c('smoking-moisturereduction', 'moisturereduction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'moisturereduction', [x, y]) }
  static penetrationdepth(x: number, y: number): CrossFormula { return c('smoking-penetrationdepth', 'penetrationdepth(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'penetrationdepth', [x, y]) }
  static preservationindex(x: number, y: number): CrossFormula { return c('smoking-preservationindex', 'preservationindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'preservationindex', [x, y]) }
  static woodratio(x: number, y: number): CrossFormula { return c('smoking-woodratio', 'woodratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'woodratio', [x, y]) }
  static surfacecolor(x: number, y: number): CrossFormula { return c('smoking-surfacecolor', 'surfacecolor(x, y) = x · y', x * y, nat(x, y), 'surfacecolor', [x, y]) }
}

for (const name of ['moisturereduction', 'penetrationdepth', 'phenoldeposition', 'preservationindex', 'smoketime', 'surfacecolor', 'temperaturezone', 'woodratio'] as const)
  hexRegisterOf('smoking', name, (SmokingFormulas[name] as (...x: unknown[]) => unknown).bind(SmokingFormulas))
