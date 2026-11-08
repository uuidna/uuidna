import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DEWPOINT — THE TEMPERATURE THE AIR MUST COOL TO FOR WATER TO CONDENSE, AS ARITHMETIC. Moist air is numbers: the
 *  dewpoint from temperature and humidity, the spread to the air temperature, the frostpoint, Espy's condensation
 *  level, a comfort band, the wet-bulb depression, the humidity read back from the dewpoint, and the lifting
 *  condensation level height. Crosses to `climatology` — dewpoint is what climatology measures over time. A measure. */

const PROOF = 'dewpoint arithmetic (approximation, spread, frostpoint, condensation level, comfort band, wet-bulb depression, humidity from dew, LCL height); a measure crossed to climatology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dewpoint', dst: 'climatology', formula, value, proof: PROOF, ...extra }, holds, { name: `dewpoint.${name}`, params })

export class DewpointFormulas {
  /** APPROXIMATION: the dewpoint from temperature and relative humidity. value max(0, temp − ⌊(100 − rh) / 5⌋). */
  static approximation(temp: number, rh: number): CrossFormula { return c('dewpoint-approximation', 'approximation(temp, rh) = max(0, temp − ⌊(100 − rh) / 5⌋)', Math.max(0, temp - Math.floor((100 - rh) / 5)), nat(temp, rh) && rh <= 100, 'approximation', [temp, rh]) }
  /** COMFORT BAND: 1 when the dewpoint sits within a comfortable range. value [low ≤ dew ≤ high]. */
  static comfortband(dew: number, low: number, high: number): CrossFormula { return c('dewpoint-comfortband', 'comfortband(dew, low, high) = [low ≤ dew ≤ high]', dew >= low && dew <= high ? 1 : 0, nat(dew, low, high) && low <= high, 'comfortband', [dew, low, high]) }
  /** CONDENSATION LEVEL: Espy's cloud-base estimate in metres. value max(0, temp − dew) · 125. */
  static condensationlevel(temp: number, dew: number): CrossFormula { return c('dewpoint-condensationlevel', 'condensationlevel(temp, dew) = max(0, temp − dew) · 125', Math.max(0, temp - dew) * 125, nat(temp, dew), 'condensationlevel', [temp, dew]) }
  /** DEPRESSION: the wet-bulb depression. value max(0, temp − wet). */
  static depression(temp: number, wet: number): CrossFormula { return c('dewpoint-depression', 'depression(temp, wet) = max(0, temp − wet)', Math.max(0, temp - wet), nat(temp, wet), 'depression', [temp, wet]) }
  /** FROSTPOINT: the dewpoint dropped by a freezing offset. value max(0, dew − offset). */
  static frostpoint(dew: number, offset: number): CrossFormula { return c('dewpoint-frostpoint', 'frostpoint(dew, offset) = max(0, dew − offset)', Math.max(0, dew - offset), nat(dew, offset), 'frostpoint', [dew, offset]) }
  /** HUMIDITY FROM DEW: the relative humidity read back from the spread. value max(0, 100 − max(0, temp − dew) · 5). */
  static humidityfromdew(temp: number, dew: number): CrossFormula { return c('dewpoint-humidityfromdew', 'humidityfromdew(temp, dew) = max(0, 100 − max(0, temp − dew) · 5)', Math.max(0, 100 - Math.max(0, temp - dew) * 5), nat(temp, dew), 'humidityfromdew', [temp, dew]) }
  /** LCL HEIGHT: the lifting condensation level in feet. value max(0, temp − dew) · 228. */
  static lclheight(temp: number, dew: number): CrossFormula { return c('dewpoint-lclheight', 'lclheight(temp, dew) = max(0, temp − dew) · 228', Math.max(0, temp - dew) * 228, nat(temp, dew), 'lclheight', [temp, dew]) }
  /** SPREAD: the dewpoint depression, air temperature over the dewpoint. value max(0, temp − dew). */
  static spread(temp: number, dew: number): CrossFormula { return c('dewpoint-spread', 'spread(temp, dew) = max(0, temp − dew)', Math.max(0, temp - dew), nat(temp, dew), 'spread', [temp, dew]) }
}

for (const name of ['approximation', 'comfortband', 'condensationlevel', 'depression', 'frostpoint', 'humidityfromdew', 'lclheight', 'spread'] as const)
  hexRegisterOf('dewpoint', name, (DewpointFormulas[name] as (...x: unknown[]) => unknown).bind(DewpointFormulas))
