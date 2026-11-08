import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EVAPOTRANSPIRATION — THE FIELD'S WATER BUDGET, AS ARITHMETIC. The water a crop and its soil return to the air is
 *  numbers: reference demand from heat and radiation, the crop coefficient, actual crop use, the deficit against supply,
 *  the irrigation a deficit needs at an efficiency, potential demand, water used over a season, and net irrigation to
 *  refill the soil. Crosses to `hydrology` — evapotranspiration is a term the water cycle must balance. A measure. */

const PROOF = 'evapotranspiration arithmetic (reference demand, crop coefficient, actual use, deficit, irrigation need, potential, seasonal use, net irrigation); the field\'s water budget; a measure crossed to hydrology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'evapotranspiration', dst: 'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `evapotranspiration.${name}`, params })

export class EvapotranspirationFormulas {
  /** REFERENCE ET0: heat and radiation set the baseline demand. value ⌊temp · radiation / 100⌋. */
  static reference(temp: number, radiation: number): CrossFormula { return c('evapotranspiration-reference', 'reference(temp, radiation) = ⌊temp · radiation / 100⌋', Math.floor((temp * radiation) / 100), nat(temp, radiation), 'reference', [temp, radiation]) }
  /** CROP COEFFICIENT Kc: crop use against the reference, as a percentage. value ⌊etc · 100 / et0⌋. */
  static cropcoefficient(etc: number, et0: number): CrossFormula { return c('evapotranspiration-cropcoefficient', 'cropcoefficient(etc, et0) = ⌊etc · 100 / et0⌋', et0 > 0 ? Math.floor((etc * 100) / et0) : 0, nat(etc, et0) && et0 > 0, 'cropcoefficient', [etc, et0]) }
  /** ACTUAL ETc: the reference scaled by the crop coefficient (percent). value ⌊reference · coefficient / 100⌋. */
  static actual(reference: number, coefficient: number): CrossFormula { return c('evapotranspiration-actual', 'actual(reference, coefficient) = ⌊reference · coefficient / 100⌋', Math.floor((reference * coefficient) / 100), nat(reference, coefficient), 'actual', [reference, coefficient]) }
  /** WATER DEFICIT: demand the supply cannot meet — demand exceeds the supply. value max(0, demand − supply). */
  static waterdeficit(demand: number, supply: number): CrossFormula { return c('evapotranspiration-waterdeficit', 'waterdeficit(demand, supply) = max(0, demand − supply)', Math.max(0, demand - supply), nat(demand, supply), 'waterdeficit', [demand, supply]) }
  /** IRRIGATION NEED: the gross water a deficit needs at an application efficiency (percent). value ⌈deficit · 100 / efficiency⌉. */
  static irrigationneed(deficit: number, efficiency: number): CrossFormula { return c('evapotranspiration-irrigationneed', 'irrigationneed(deficit, efficiency) = ⌈deficit · 100 / efficiency⌉', efficiency > 0 ? Math.ceil((deficit * 100) / efficiency) : 0, nat(deficit, efficiency) && efficiency > 0, 'irrigationneed', [deficit, efficiency]) }
  /** POTENTIAL ET: unlimited-water demand from heat over the daylight hours. value temp · daylight. */
  static potential(temp: number, daylight: number): CrossFormula { return c('evapotranspiration-potential', 'potential(temp, daylight) = temp · daylight', temp * daylight, nat(temp, daylight), 'potential', [temp, daylight]) }
  /** CROP WATER USE: the actual daily use summed over the days. value actual · days. */
  static cropwateruse(actual: number, days: number): CrossFormula { return c('evapotranspiration-cropwateruse', 'cropwateruse(actual, days) = actual · days', actual * days, nat(actual, days), 'cropwateruse', [actual, days]) }
  /** NET IRRIGATION: the water to refill the soil from its moisture to field capacity. value max(0, fieldcapacity − moisture). */
  static netirrigation(fieldcapacity: number, moisture: number): CrossFormula { return c('evapotranspiration-netirrigation', 'netirrigation(fieldcapacity, moisture) = max(0, fieldcapacity − moisture)', Math.max(0, fieldcapacity - moisture), nat(fieldcapacity, moisture), 'netirrigation', [fieldcapacity, moisture]) }
}

for (const name of ['actual', 'cropcoefficient', 'cropwateruse', 'irrigationneed', 'netirrigation', 'potential', 'reference', 'waterdeficit'] as const)
  hexRegisterOf('evapotranspiration', name, (EvapotranspirationFormulas[name] as (...x: unknown[]) => unknown).bind(EvapotranspirationFormulas))
