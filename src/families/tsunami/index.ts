import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TSUNAMI — scaffolded integer measures crossed to oceanography. Every output an exact finite nonnegative integer. */

const PROOF = 'tsunami arithmetic (wavespeed, wavelength, runup, traveltime, amplitude, inundationdistance, energyindex, warningtime); scaffolded from the integer-op palette; a measure crossed to oceanography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tsunami', dst: 'oceanography', formula, value, proof: PROOF, ...extra }, holds, { name: `tsunami.${name}`, params })

export class TsunamiFormulas {
  static wavespeed(x: number, y: number): CrossFormula { return c('tsunami-wavespeed', 'wavespeed(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'wavespeed', [x, y]) }
  static wavelength(x: number, y: number): CrossFormula { return c('tsunami-wavelength', 'wavelength(x, y) = x · y', x * y, nat(x, y), 'wavelength', [x, y]) }
  static runup(x: number, y: number): CrossFormula { return c('tsunami-runup', 'runup(x, y) = x · y', x * y, nat(x, y), 'runup', [x, y]) }
  static traveltime(x: number, y: number): CrossFormula { return c('tsunami-traveltime', 'traveltime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'traveltime', [x, y]) }
  static amplitude(x: number, y: number): CrossFormula { return c('tsunami-amplitude', 'amplitude(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'amplitude', [x, y]) }
  static inundationdistance(x: number, y: number): CrossFormula { return c('tsunami-inundationdistance', 'inundationdistance(x, y) = x · y', x * y, nat(x, y), 'inundationdistance', [x, y]) }
  static energyindex(x: number, y: number): CrossFormula { return c('tsunami-energyindex', 'energyindex(x, y) = x · y', x * y, nat(x, y), 'energyindex', [x, y]) }
  static warningtime(x: number, y: number): CrossFormula { return c('tsunami-warningtime', 'warningtime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'warningtime', [x, y]) }
}

for (const name of ['amplitude', 'energyindex', 'inundationdistance', 'runup', 'traveltime', 'warningtime', 'wavelength', 'wavespeed'] as const)
  hexRegisterOf('tsunami', name, (TsunamiFormulas[name] as (...x: unknown[]) => unknown).bind(TsunamiFormulas))
