import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PRESERVATION — scaffolded integer measures crossed to microbiology. Every output an exact finite nonnegative integer. */

const PROOF = 'preservation arithmetic (shelflifedays, wateractivity, phlevel, saltpct, methodsubsets, microbialreduction, temperaturec, spoilagerate); scaffolded from the integer-op palette; a measure crossed to microbiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'preservation', dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `preservation.${name}`, params })

export class PreservationFormulas {
  static shelflifedays(x: number, y: number): CrossFormula { return c('preservation-shelflifedays', 'shelflifedays(x, y) = x · y', x * y, nat(x, y), 'shelflifedays', [x, y]) }
  static wateractivity(x: number, y: number): CrossFormula { return c('preservation-wateractivity', 'wateractivity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'wateractivity', [x, y]) }
  static phlevel(x: number, y: number): CrossFormula { return c('preservation-phlevel', 'phlevel(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'phlevel', [x, y]) }
  static saltpct(x: number, y: number): CrossFormula { return c('preservation-saltpct', 'saltpct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'saltpct', [x, y]) }
  static methodsubsets(x: number): CrossFormula { return c('preservation-methodsubsets', 'methodsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'methodsubsets', [x]) }
  static microbialreduction(x: number, y: number): CrossFormula { return c('preservation-microbialreduction', 'microbialreduction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'microbialreduction', [x, y]) }
  static temperaturec(x: number, y: number): CrossFormula { return c('preservation-temperaturec', 'temperaturec(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'temperaturec', [x, y]) }
  static spoilagerate(x: number, y: number): CrossFormula { return c('preservation-spoilagerate', 'spoilagerate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'spoilagerate', [x, y]) }
}

for (const name of ['methodsubsets', 'microbialreduction', 'phlevel', 'saltpct', 'shelflifedays', 'spoilagerate', 'temperaturec', 'wateractivity'] as const)
  hexRegisterOf('preservation', name, (PreservationFormulas[name] as (...x: unknown[]) => unknown).bind(PreservationFormulas))
