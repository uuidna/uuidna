import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** METEOROLOGY — THE WEATHER, AS ARITHMETIC (chosen by the public-API registry, not by hand). Reading the sky is numbers:
 *  relative humidity, the dew point, a heat-index proxy, wind chill, pressure at altitude, the lapse of temperature with
 *  height, precipitation over an area, and visibility through particles. Crosses to `climate` — the weather is what climate
 *  aggregates. A measure. */

const PROOF = 'meteorology arithmetic (humidity, dewpoint, heatindex, windchill, pressure, lapse, precipitation, visibility); a weather measure crossed to climate'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'meteorology', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name: `meteorology.${name}`, params })

export class MeteorologyFormulas {
  /** RELATIVE HUMIDITY as a percentage. value ⌊actual · 100 / saturation⌋. */
  static humidity(actual: number, saturation: number): CrossFormula { return c('meteorology-humidity', 'humidity(actual, saturation) = ⌊actual · 100 / saturation⌋', saturation > 0 ? Math.floor((actual * 100) / saturation) : 0, nat(actual, saturation) && saturation > 0 && actual <= saturation, 'humidity', [actual, saturation]) }
  /** DEW POINT: temperature less the dew-point spread. value max(0, temp − spread). */
  static dewpoint(temp: number, spread: number): CrossFormula { return c('meteorology-dewpoint', 'dewpoint(temp, spread) = max(0, temp − spread)', Math.max(0, temp - spread), nat(temp, spread), 'dewpoint', [temp, spread]) }
  /** HEAT INDEX: a proxy, temperature plus humidity. value temp + humidity. */
  static heatindex(temp: number, humidity_: number): CrossFormula { return c('meteorology-heatindex', 'heatindex(temp, humidity) = temp + humidity', temp + humidity_, nat(temp, humidity_), 'heatindex', [temp, humidity_]) }
  /** WIND CHILL: temperature less the wind's bite. value max(0, temp − wind). */
  static windchill(temp: number, wind: number): CrossFormula { return c('meteorology-windchill', 'windchill(temp, wind) = max(0, temp − wind)', Math.max(0, temp - wind), nat(temp, wind), 'windchill', [temp, wind]) }
  /** PRESSURE at altitude: sea-level pressure less the climb. value max(0, sealevel − altitude). */
  static pressure(sealevel: number, altitude: number): CrossFormula { return c('meteorology-pressure', 'pressure(sealevel, altitude) = max(0, sealevel − altitude)', Math.max(0, sealevel - altitude), nat(sealevel, altitude), 'pressure', [sealevel, altitude]) }
  /** LAPSE: surface temperature less the fall with height. value max(0, surface − height). */
  static lapse(surface: number, height: number): CrossFormula { return c('meteorology-lapse', 'lapse(surface, height) = max(0, surface − height)', Math.max(0, surface - height), nat(surface, height), 'lapse', [surface, height]) }
  /** PRECIPITATION: volume spread over an area. value ⌊volume / area⌋. */
  static precipitation(volume: number, area: number): CrossFormula { return c('meteorology-precipitation', 'precipitation(volume, area) = ⌊volume / area⌋', area > 0 ? Math.floor(volume / area) : 0, nat(volume, area) && area > 0, 'precipitation', [volume, area]) }
  /** VISIBILITY through particles. value ⌊clarity · 100 / particles⌋. */
  static visibility(clarity: number, particles: number): CrossFormula { return c('meteorology-visibility', 'visibility(clarity, particles) = ⌊clarity · 100 / particles⌋', particles > 0 ? Math.floor((clarity * 100) / particles) : 0, nat(clarity, particles) && particles > 0, 'visibility', [clarity, particles]) }
}

for (const name of ['dewpoint', 'heatindex', 'humidity', 'lapse', 'precipitation', 'pressure', 'visibility', 'windchill'] as const)
  hexRegisterOf('meteorology', name, (MeteorologyFormulas[name] as (...x: unknown[]) => unknown).bind(MeteorologyFormulas))
