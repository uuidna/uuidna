import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WEATHER — METEOROLOGY, AS ARITHMETIC (chosen by the public-API registry, not by hand). The sky is numbers: the heat you
 *  feel, the chill the wind takes off, the dew point, pressure at altitude, how fast it rains, relative humidity, visibility,
 *  and the UV reading. Crosses to `environment` — weather is the environment, measured. A measure. */

const PROOF = 'weather arithmetic (heat index, wind chill, dew point, pressure, precipitation, humidity, visibility, uv); meteorology as integers; a measure crossed to environment'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'weather', dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `weather.${name}`, params })

export class WeatherFormulas {
  /** HEAT INDEX: the temperature nudged up by the humidity. value ⌊temp + humidity / 10⌋. */
  static heatindex(temp: number, humidity: number): CrossFormula { return c('weather-heatindex', 'heatindex(temp, humidity) = ⌊temp + humidity / 10⌋', Math.floor(temp + humidity / 10), nat(temp, humidity), 'heatindex', [temp, humidity]) }
  /** WIND CHILL: the temperature the wind takes down, never below zero. value max(0, temp − ⌊wind / 10⌋). */
  static windchill(temp: number, wind: number): CrossFormula { return c('weather-windchill', 'windchill(temp, wind) = max(0, temp − ⌊wind / 10⌋)', Math.max(0, temp - Math.floor(wind / 10)), nat(temp, wind), 'windchill', [temp, wind]) }
  /** DEW POINT: the temperature dropped by the dryness. value ⌊temp − (100 − humidity) / 5⌋. */
  // TODO: no Lean definition is generated for this formula. Its floor is over a sum with a division, which the translator refuses
  // (theorems/translate-formulas.py). The formula string is correct; the TypeScript value is the only check.
  static dewpoint(temp: number, humidity: number): CrossFormula { return c('weather-dewpoint', 'dewpoint(temp, humidity) = ⌊temp − (100 − humidity) / 5⌋', Math.floor(temp - (100 - humidity) / 5), nat(temp, humidity) && humidity <= 100, 'dewpoint', [temp, humidity]) }
  /** PRESSURE: sea-level pressure falling off with altitude, never below zero. value max(0, sea − ⌊altitude / 8⌋). */
  static pressure(sea: number, altitude: number): CrossFormula { return c('weather-pressure', 'pressure(sea, altitude) = max(0, sea − ⌊altitude / 8⌋)', Math.max(0, sea - Math.floor(altitude / 8)), nat(sea, altitude), 'pressure', [sea, altitude]) }
  /** PRECIPITATION: millimetres over the hours they fell — a rate. value ⌊mm / hours⌋. */
  static precipitation(mm: number, hours: number): CrossFormula { return c('weather-precipitation', 'precipitation(mm, hours) = ⌊mm / hours⌋', hours > 0 ? Math.floor(mm / hours) : 0, nat(mm, hours) && hours > 0, 'precipitation', [mm, hours]) }
  /** RELATIVE HUMIDITY as a percentage. value ⌊vapor · 100 / max⌋. */
  static humidity(vapor: number, max: number): CrossFormula { return c('weather-humidity', 'humidity(vapor, max) = ⌊vapor · 100 / max⌋', max > 0 ? Math.floor((vapor * 100) / max) : 0, nat(vapor, max) && max > 0 && vapor <= max, 'humidity', [vapor, max]) }
  /** VISIBILITY: the kilometres you can see. value km. */
  static visibility(km: number): CrossFormula { return c('weather-visibility', 'visibility(km) = km', km, nat(km), 'visibility', [km]) }
  /** THE UV READING on the standard index. value index. */
  static uv(index: number): CrossFormula { return c('weather-uv', 'uv(index) = index', index, nat(index) && index <= 11, 'uv', [index]) }
}

for (const name of ['dewpoint', 'heatindex', 'humidity', 'precipitation', 'pressure', 'uv', 'visibility', 'windchill'] as const)
  hexRegisterOf('weather', name, (WeatherFormulas[name] as (...x: unknown[]) => unknown).bind(WeatherFormulas))
