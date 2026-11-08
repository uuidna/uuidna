import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PRECIPITATION — RAINFALL AND SNOW AS ARITHMETIC (chosen by the public-API registry, not by hand). Falling water is
 *  numbers: how hard it falls, how much runs off, how much piles up, how rare a storm is, how much snow a melt makes, what
 *  a catchment yields, the depth over an area, and what soaks in. Crosses to `hydrology` — precipitation is where the water
 *  cycle begins. A measure. */

const PROOF = 'precipitation arithmetic (intensity, runoff, accumulation, return period, snow ratio, catchment yield, rain depth, infiltration); a public-API registry domain; a measure crossed to hydrology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'precipitation', dst: 'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `precipitation.${name}`, params })

export class PrecipitationFormulas {
  /** INTENSITY: rain depth over the hours it fell. value ⌊depth / hours⌋. */
  static intensity(depth: number, hours: number): CrossFormula { return c('precipitation-intensity', 'intensity(depth, hours) = ⌊depth / hours⌋', hours > 0 ? Math.floor(depth / hours) : 0, nat(depth, hours) && hours > 0, 'intensity', [depth, hours]) }
  /** RUNOFF (the rational method): rainfall at a runoff coefficient (percent). value ⌊rain · coeff / 100⌋. */
  static runoff(rain: number, coeff: number): CrossFormula { return c('precipitation-runoff', 'runoff(rain, coeff) = ⌊rain · coeff / 100⌋', Math.floor((rain * coeff) / 100), nat(rain, coeff), 'runoff', [rain, coeff]) }
  /** ACCUMULATION: a steady rate over the hours. value rate · hours. */
  static accumulation(rate: number, hours: number): CrossFormula { return c('precipitation-accumulation', 'accumulation(rate, hours) = rate · hours', rate * hours, nat(rate, hours), 'accumulation', [rate, hours]) }
  /** RETURN PERIOD: years of record over the events seen. value ⌊years / events⌋. */
  static returnperiod(years: number, events: number): CrossFormula { return c('precipitation-returnperiod', 'returnperiod(years, events) = ⌊years / events⌋', events > 0 ? Math.floor(years / events) : 0, nat(years, events) && events > 0, 'returnperiod', [years, events]) }
  /** SNOW RATIO: snow depth to its melted liquid. value ⌊snow / rain⌋. */
  static snowratio(snow: number, rain: number): CrossFormula { return c('precipitation-snowratio', 'snowratio(snow, rain) = ⌊snow / rain⌋', rain > 0 ? Math.floor(snow / rain) : 0, nat(snow, rain) && rain > 0, 'snowratio', [snow, rain]) }
  /** CATCHMENT YIELD: area times the depth over it. value area · depth. */
  static catchmentyield(area: number, depth: number): CrossFormula { return c('precipitation-catchmentyield', 'catchmentyield(area, depth) = area · depth', area * depth, nat(area, depth), 'catchmentyield', [area, depth]) }
  /** RAIN DEPTH: a collected volume spread over an area. value ⌊volume / area⌋. */
  static raindepth(volume: number, area: number): CrossFormula { return c('precipitation-raindepth', 'raindepth(volume, area) = ⌊volume / area⌋', area > 0 ? Math.floor(volume / area) : 0, nat(volume, area) && area > 0, 'raindepth', [volume, area]) }
  /** INFILTRATION: the rain that did not run off soaks in. value max(0, rain − runoff). */
  static infiltration(rain: number, runoff: number): CrossFormula { return c('precipitation-infiltration', 'infiltration(rain, runoff) = max(0, rain − runoff)', Math.max(0, rain - runoff), nat(rain, runoff), 'infiltration', [rain, runoff]) }
}

for (const name of ['accumulation', 'catchmentyield', 'infiltration', 'intensity', 'raindepth', 'returnperiod', 'runoff', 'snowratio'] as const)
  hexRegisterOf('precipitation', name, (PrecipitationFormulas[name] as (...x: unknown[]) => unknown).bind(PrecipitationFormulas))
