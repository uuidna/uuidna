import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ALTIMETRY — HEIGHT AS ARITHMETIC (chosen by the elevation registry, not by hand). Measuring the vertical is numbers:
 *  pressure altitude from a setting, density altitude from the temperature, the gain over a climb, the slope and grade of
 *  a run, the interval between contours, the vertical speed of an ascent, and the hypsometric thickness of a layer.
 *  Crosses to `cartography` — altimetry is the height the map draws. A measure. */

const PROOF = 'altimetry arithmetic (pressure altitude, density altitude, elevation gain, slope, contour interval, vertical speed, hypsometric thickness, grade); the elevation registry\'s uncovered domain; a measure crossed to cartography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'altimetry', dst: 'cartography', formula, value, proof: PROOF, ...extra }, holds, { name: `altimetry.${name}`, params })

export class AltimetryFormulas {
  /** PRESSURE ALTITUDE: field elevation corrected off standard pressure. value elevation + max(0, 1013 − pressure) · 27. */
  static pressurealtitude(elevation: number, pressure: number): CrossFormula { return c('altimetry-pressurealtitude', 'pressurealtitude(elevation, pressure) = elevation + max(0, 1013 − pressure) · 27', elevation + Math.max(0, 1013 - pressure) * 27, nat(elevation, pressure), 'pressurealtitude', [elevation, pressure]) }
  /** DENSITY ALTITUDE: pressure altitude corrected off standard temperature. value pressureAlt + 120 · max(0, temp − 15). */
  static densityaltitude(pressureAlt: number, temp: number): CrossFormula { return c('altimetry-densityaltitude', 'densityaltitude(pressureAlt, temp) = pressureAlt + 120 · max(0, temp − 15)', pressureAlt + 120 * Math.max(0, temp - 15), nat(pressureAlt, temp), 'densityaltitude', [pressureAlt, temp]) }
  /** ELEVATION GAIN over a climb. value max(0, end − start). */
  static elevationgain(start: number, end: number): CrossFormula { return c('altimetry-elevationgain', 'elevationgain(start, end) = max(0, end − start)', Math.max(0, end - start), nat(start, end), 'elevationgain', [start, end]) }
  /** SLOPE as a percent grade. value ⌊rise · 100 / run⌋. */
  static slope(rise: number, run: number): CrossFormula { return c('altimetry-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) }
  /** CONTOUR INTERVAL: the span split into equal lines. value ⌊max(0, high − low) / count⌋. */
  static contourinterval(high: number, low: number, count: number): CrossFormula { return c('altimetry-contourinterval', 'contourinterval(high, low, count) = ⌊max(0, high − low) / count⌋', count > 0 ? Math.floor(Math.max(0, high - low) / count) : 0, nat(high, low, count) && count > 0, 'contourinterval', [high, low, count]) }
  /** VERTICAL SPEED: altitude change over the minutes taken. value ⌊altChange / minutes⌋. */
  static verticalspeed(altChange: number, minutes: number): CrossFormula { return c('altimetry-verticalspeed', 'verticalspeed(altChange, minutes) = ⌊altChange / minutes⌋', minutes > 0 ? Math.floor(altChange / minutes) : 0, nat(altChange, minutes) && minutes > 0, 'verticalspeed', [altChange, minutes]) }
  /** HYPSOMETRIC THICKNESS of a layer by mean temperature. value 29 · temp · factor. */
  static hypsometric(temp: number, factor: number): CrossFormula { return c('altimetry-hypsometric', 'hypsometric(temp, factor) = 29 · temp · factor', 29 * temp * factor, nat(temp, factor), 'hypsometric', [temp, factor]) }
  /** GRADE as a per-mille slope. value ⌊rise · 1000 / run⌋. */
  static grade(rise: number, run: number): CrossFormula { return c('altimetry-grade', 'grade(rise, run) = ⌊rise · 1000 / run⌋', run > 0 ? Math.floor((rise * 1000) / run) : 0, nat(rise, run) && run > 0, 'grade', [rise, run]) }
}

for (const name of ['contourinterval', 'densityaltitude', 'elevationgain', 'grade', 'hypsometric', 'pressurealtitude', 'slope', 'verticalspeed'] as const)
  hexRegisterOf('altimetry', name, (AltimetryFormulas[name] as (...x: unknown[]) => unknown).bind(AltimetryFormulas))
