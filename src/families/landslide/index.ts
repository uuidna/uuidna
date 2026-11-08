import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LANDSLIDE — scaffolded integer measures crossed to geology. Every output an exact finite nonnegative integer. */

const PROOF = 'landslide arithmetic (slopeangle, factorofsafety, runoutdistance, volume, velocity, rainfallthreshold, susceptibility, debrisfraction); scaffolded from the integer-op palette; a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'landslide', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `landslide.${name}`, params })

export class LandslideFormulas {
  static slopeangle(x: number, y: number): CrossFormula { return c('landslide-slopeangle', 'slopeangle(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'slopeangle', [x, y]) }
  static factorofsafety(x: number, y: number): CrossFormula { return c('landslide-factorofsafety', 'factorofsafety(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'factorofsafety', [x, y]) }
  static runoutdistance(x: number, y: number): CrossFormula { return c('landslide-runoutdistance', 'runoutdistance(x, y) = x · y', x * y, nat(x, y), 'runoutdistance', [x, y]) }
  static volume(x: number, y: number, z: number): CrossFormula { return c('landslide-volume', 'volume(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'volume', [x, y, z]) }
  static velocity(x: number, y: number): CrossFormula { return c('landslide-velocity', 'velocity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'velocity', [x, y]) }
  static rainfallthreshold(x: number, y: number): CrossFormula { return c('landslide-rainfallthreshold', 'rainfallthreshold(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'rainfallthreshold', [x, y]) }
  static susceptibility(x: number, y: number): CrossFormula { return c('landslide-susceptibility', 'susceptibility(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'susceptibility', [x, y]) }
  static debrisfraction(x: number, y: number): CrossFormula { return c('landslide-debrisfraction', 'debrisfraction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'debrisfraction', [x, y]) }
}

for (const name of ['debrisfraction', 'factorofsafety', 'rainfallthreshold', 'runoutdistance', 'slopeangle', 'susceptibility', 'velocity', 'volume'] as const)
  hexRegisterOf('landslide', name, (LandslideFormulas[name] as (...x: unknown[]) => unknown).bind(LandslideFormulas))
