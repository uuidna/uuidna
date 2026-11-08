import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MAGNETOMETRY — scaffolded integer measures crossed to geology. Every output an exact finite nonnegative integer. */

const PROOF = 'magnetometry arithmetic (fieldstrength, anomaly, declination, inclination, gradient, surveylines, susceptibility, reversalcount); scaffolded from the integer-op palette; a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'magnetometry', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `magnetometry.${name}`, params })

export class MagnetometryFormulas {
  static fieldstrength(x: number, y: number): CrossFormula { return c('magnetometry-fieldstrength', 'fieldstrength(x, y) = x · y', x * y, nat(x, y), 'fieldstrength', [x, y]) }
  static anomaly(x: number, y: number): CrossFormula { return c('magnetometry-anomaly', 'anomaly(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'anomaly', [x, y]) }
  static declination(x: number, y: number): CrossFormula { return c('magnetometry-declination', 'declination(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'declination', [x, y]) }
  static inclination(x: number, y: number): CrossFormula { return c('magnetometry-inclination', 'inclination(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'inclination', [x, y]) }
  static gradient(x: number, y: number): CrossFormula { return c('magnetometry-gradient', 'gradient(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'gradient', [x, y]) }
  static surveylines(x: number, y: number): CrossFormula { return c('magnetometry-surveylines', 'surveylines(x, y) = x · y', x * y, nat(x, y), 'surveylines', [x, y]) }
  static susceptibility(x: number, y: number): CrossFormula { return c('magnetometry-susceptibility', 'susceptibility(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'susceptibility', [x, y]) }
  static reversalcount(x: number, y: number): CrossFormula { return c('magnetometry-reversalcount', 'reversalcount(x, y) = x + y', x + y, nat(x, y), 'reversalcount', [x, y]) }
}

for (const name of ['anomaly', 'declination', 'fieldstrength', 'gradient', 'inclination', 'reversalcount', 'surveylines', 'susceptibility'] as const)
  hexRegisterOf('magnetometry', name, (MagnetometryFormulas[name] as (...x: unknown[]) => unknown).bind(MagnetometryFormulas))
