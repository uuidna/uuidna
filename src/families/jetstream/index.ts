import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** JETSTREAM — scaffolded integer measures crossed to meteorology. Every output an exact finite nonnegative integer. */

const PROOF = 'jetstream arithmetic (windspeed, altitude, latitude, meandercount, waveamplitude, rossbynumber, coresubsets, shearindex); scaffolded from the integer-op palette; a measure crossed to meteorology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'jetstream', dst: 'meteorology', formula, value, proof: PROOF, ...extra }, holds, { name: `jetstream.${name}`, params })

export class JetstreamFormulas {
  static windspeed(x: number, y: number): CrossFormula { return c('jetstream-windspeed', 'windspeed(x, y) = x · y', x * y, nat(x, y), 'windspeed', [x, y]) }
  static altitude(x: number, y: number): CrossFormula { return c('jetstream-altitude', 'altitude(x, y) = x · y', x * y, nat(x, y), 'altitude', [x, y]) }
  static latitude(x: number, y: number): CrossFormula { return c('jetstream-latitude', 'latitude(x, y) = x + y', x + y, nat(x, y), 'latitude', [x, y]) }
  static meandercount(x: number, y: number): CrossFormula { return c('jetstream-meandercount', 'meandercount(x, y) = x + y', x + y, nat(x, y), 'meandercount', [x, y]) }
  static waveamplitude(x: number, y: number): CrossFormula { return c('jetstream-waveamplitude', 'waveamplitude(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'waveamplitude', [x, y]) }
  static rossbynumber(x: number, y: number): CrossFormula { return c('jetstream-rossbynumber', 'rossbynumber(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rossbynumber', [x, y]) }
  static coresubsets(x: number): CrossFormula { return c('jetstream-coresubsets', 'coresubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'coresubsets', [x]) }
  static shearindex(x: number, y: number): CrossFormula { return c('jetstream-shearindex', 'shearindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'shearindex', [x, y]) }
}

for (const name of ['altitude', 'coresubsets', 'latitude', 'meandercount', 'rossbynumber', 'shearindex', 'waveamplitude', 'windspeed'] as const)
  hexRegisterOf('jetstream', name, (JetstreamFormulas[name] as (...x: unknown[]) => unknown).bind(JetstreamFormulas))
