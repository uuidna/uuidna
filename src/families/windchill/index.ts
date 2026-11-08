import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WINDCHILL — HOW COLD THE AIR FEELS, AS ARITHMETIC. The wind steals heat: the chill index, the apparent temperature once
 *  humidity is counted, minutes to frostbite, the heat index for warm days, the wind's bite, the risk of exposure, the
 *  effective temperature, and the adjustment a gust forces. Crosses to `meteorology` — windchill is what the weather feels
 *  like. A measure. */

const PROOF = 'windchill arithmetic (chill index, apparent temperature, frostbite time, heat index, wind factor, exposure risk, effective temperature, gust adjustment); how cold the air feels; a measure crossed to meteorology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'windchill', dst: 'meteorology', formula, value, proof: PROOF, ...extra }, holds, { name: `windchill.${name}`, params })

export class WindchillFormulas {
  /** CHILL INDEX: the temperature less half the wind. value max(0, temp − ⌊wind / 2⌋). */
  static index(temp: number, wind: number): CrossFormula { return c('windchill-index', 'index(temp, wind) = max(0, temp − ⌊wind / 2⌋)', Math.max(0, temp - Math.floor(wind / 2)), nat(temp, wind), 'index', [temp, wind]) }
  /** APPARENT TEMPERATURE: the temperature raised by the humidity it carries. value temp + ⌊humidity / 10⌋. */
  static apparenttemp(temp: number, humidity: number): CrossFormula { return c('windchill-apparenttemp', 'apparenttemp(temp, humidity) = temp + ⌊humidity / 10⌋', temp + Math.floor(humidity / 10), nat(temp, humidity) && humidity <= 100, 'apparenttemp', [temp, humidity]) }
  /** FROSTBITE TIME: minutes of exposure the wind allows. value ⌊temp · 30 / wind⌋. */
  static frostbitetime(temp: number, wind: number): CrossFormula { return c('windchill-frostbitetime', 'frostbitetime(temp, wind) = ⌊temp · 30 / wind⌋', wind > 0 ? Math.floor((temp * 30) / wind) : 0, nat(temp, wind) && wind > 0, 'frostbitetime', [temp, wind]) }
  /** HEAT INDEX: the temperature plus the humidity's load. value temp + ⌊temp · humidity / 1000⌋. */
  static heatindex(temp: number, humidity: number): CrossFormula { return c('windchill-heatindex', 'heatindex(temp, humidity) = temp + ⌊temp · humidity / 1000⌋', temp + Math.floor((temp * humidity) / 1000), nat(temp, humidity) && humidity <= 100, 'heatindex', [temp, humidity]) }
  /** WIND FACTOR: the chill the wind alone adds. value ⌊wind · 3 / 2⌋. */
  static windfactor(wind: number): CrossFormula { return c('windchill-windfactor', 'windfactor(wind) = ⌊wind · 3 / 2⌋', Math.floor((wind * 3) / 2), nat(wind), 'windfactor', [wind]) }
  /** EXPOSURE RISK: 1 when the chill index sits at or below the threshold. value [index ≤ threshold]. */
  static exposurerisk(index: number, threshold: number): CrossFormula { return c('windchill-exposurerisk', 'exposurerisk(index, threshold) = [index ≤ threshold]', index <= threshold ? 1 : 0, nat(index, threshold), 'exposurerisk', [index, threshold]) }
  /** EFFECTIVE TEMPERATURE: the chill index with humidity restored. value max(0, temp − ⌊wind / 2⌋ + ⌊humidity / 20⌋). */
  static effectivetemp(temp: number, wind: number, humidity: number): CrossFormula { return c('windchill-effectivetemp', 'effectivetemp(temp, wind, humidity) = max(0, temp − ⌊wind / 2⌋ + ⌊humidity / 20⌋)', Math.max(0, temp - Math.floor(wind / 2) + Math.floor(humidity / 20)), nat(temp, wind, humidity) && humidity <= 100, 'effectivetemp', [temp, wind, humidity]) }
  /** GUST ADJUSTMENT: the mean of the steady wind and the gust. value ⌊(wind + gust) / 2⌋. */
  static gustadjust(wind: number, gust: number): CrossFormula { return c('windchill-gustadjust', 'gustadjust(wind, gust) = ⌊(wind + gust) / 2⌋', Math.floor((wind + gust) / 2), nat(wind, gust), 'gustadjust', [wind, gust]) }
}

for (const name of ['apparenttemp', 'effectivetemp', 'exposurerisk', 'frostbitetime', 'gustadjust', 'heatindex', 'index', 'windfactor'] as const)
  hexRegisterOf('windchill', name, (WindchillFormulas[name] as (...x: unknown[]) => unknown).bind(WindchillFormulas))
