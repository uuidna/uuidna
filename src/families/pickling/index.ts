import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PICKLING — scaffolded integer measures crossed to microbiology. Every output an exact finite nonnegative integer. */

const PROOF = 'pickling arithmetic (acidity, brineratio, phlevel, fermentdays, saltpercent, lacticacid, shelflife, crunchretention); scaffolded from the integer-op palette; a measure crossed to microbiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pickling', dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `pickling.${name}`, params })

export class PicklingFormulas {
  static acidity(x: number, y: number): CrossFormula { return c('pickling-acidity', 'acidity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'acidity', [x, y]) }
  static brineratio(x: number, y: number): CrossFormula { return c('pickling-brineratio', 'brineratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'brineratio', [x, y]) }
  static phlevel(x: number, y: number): CrossFormula { return c('pickling-phlevel', 'phlevel(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'phlevel', [x, y]) }
  static fermentdays(x: number, y: number): CrossFormula { return c('pickling-fermentdays', 'fermentdays(x, y) = x · y', x * y, nat(x, y), 'fermentdays', [x, y]) }
  static saltpercent(x: number, y: number): CrossFormula { return c('pickling-saltpercent', 'saltpercent(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'saltpercent', [x, y]) }
  static lacticacid(x: number, y: number): CrossFormula { return c('pickling-lacticacid', 'lacticacid(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'lacticacid', [x, y]) }
  static shelflife(x: number, y: number): CrossFormula { return c('pickling-shelflife', 'shelflife(x, y) = x · y', x * y, nat(x, y), 'shelflife', [x, y]) }
  static crunchretention(x: number, y: number): CrossFormula { return c('pickling-crunchretention', 'crunchretention(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'crunchretention', [x, y]) }
}

for (const name of ['acidity', 'brineratio', 'crunchretention', 'fermentdays', 'lacticacid', 'phlevel', 'saltpercent', 'shelflife'] as const)
  hexRegisterOf('pickling', name, (PicklingFormulas[name] as (...x: unknown[]) => unknown).bind(PicklingFormulas))
