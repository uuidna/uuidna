import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GRAVIMETRY — scaffolded integer measures crossed to geology. Every output an exact finite nonnegative integer. */

const PROOF = 'gravimetry arithmetic (anomaly, freeaircorrection, bouguercorrection, densitycontrast, gradient, stationspacing, terraincorrection, surveypoints); scaffolded from the integer-op palette; a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gravimetry', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `gravimetry.${name}`, params })

export class GravimetryFormulas {
  static anomaly(x: number, y: number): CrossFormula { return c('gravimetry-anomaly', 'anomaly(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'anomaly', [x, y]) }
  static freeaircorrection(x: number, y: number): CrossFormula { return c('gravimetry-freeaircorrection', 'freeaircorrection(x, y) = x · y', x * y, nat(x, y), 'freeaircorrection', [x, y]) }
  static bouguercorrection(x: number, y: number): CrossFormula { return c('gravimetry-bouguercorrection', 'bouguercorrection(x, y) = x · y', x * y, nat(x, y), 'bouguercorrection', [x, y]) }
  static densitycontrast(x: number, y: number): CrossFormula { return c('gravimetry-densitycontrast', 'densitycontrast(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'densitycontrast', [x, y]) }
  static gradient(x: number, y: number): CrossFormula { return c('gravimetry-gradient', 'gradient(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'gradient', [x, y]) }
  static stationspacing(x: number, y: number): CrossFormula { return c('gravimetry-stationspacing', 'stationspacing(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'stationspacing', [x, y]) }
  static terraincorrection(x: number, y: number): CrossFormula { return c('gravimetry-terraincorrection', 'terraincorrection(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'terraincorrection', [x, y]) }
  static surveypoints(x: number, y: number): CrossFormula { return c('gravimetry-surveypoints', 'surveypoints(x, y) = x · y', x * y, nat(x, y), 'surveypoints', [x, y]) }
}

for (const name of ['anomaly', 'bouguercorrection', 'densitycontrast', 'freeaircorrection', 'gradient', 'stationspacing', 'surveypoints', 'terraincorrection'] as const)
  hexRegisterOf('gravimetry', name, (GravimetryFormulas[name] as (...x: unknown[]) => unknown).bind(GravimetryFormulas))
