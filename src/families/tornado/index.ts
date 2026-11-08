import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TORNADO — scaffolded integer measures crossed to meteorology. Every output an exact finite nonnegative integer. */

const PROOF = 'tornado arithmetic (efscale, windspeed, pathlength, width, durationmin, damageindex, pressuredeficit, vorticity); scaffolded from the integer-op palette; a measure crossed to meteorology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tornado', dst: 'meteorology', formula, value, proof: PROOF, ...extra }, holds, { name: `tornado.${name}`, params })

export class TornadoFormulas {
  static efscale(x: number, y: number): CrossFormula { return c('tornado-efscale', 'efscale(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'efscale', [x, y]) }
  static windspeed(x: number, y: number): CrossFormula { return c('tornado-windspeed', 'windspeed(x, y) = x · y', x * y, nat(x, y), 'windspeed', [x, y]) }
  static pathlength(x: number, y: number): CrossFormula { return c('tornado-pathlength', 'pathlength(x, y) = x · y', x * y, nat(x, y), 'pathlength', [x, y]) }
  static width(x: number, y: number): CrossFormula { return c('tornado-width', 'width(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'width', [x, y]) }
  static durationmin(x: number, y: number): CrossFormula { return c('tornado-durationmin', 'durationmin(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'durationmin', [x, y]) }
  static damageindex(x: number, y: number): CrossFormula { return c('tornado-damageindex', 'damageindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'damageindex', [x, y]) }
  static pressuredeficit(x: number, y: number): CrossFormula { return c('tornado-pressuredeficit', 'pressuredeficit(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'pressuredeficit', [x, y]) }
  static vorticity(x: number, y: number): CrossFormula { return c('tornado-vorticity', 'vorticity(x, y) = x · y', x * y, nat(x, y), 'vorticity', [x, y]) }
}

for (const name of ['damageindex', 'durationmin', 'efscale', 'pathlength', 'pressuredeficit', 'vorticity', 'width', 'windspeed'] as const)
  hexRegisterOf('tornado', name, (TornadoFormulas[name] as (...x: unknown[]) => unknown).bind(TornadoFormulas))
