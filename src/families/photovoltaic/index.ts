import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHOTOVOLTAIC — SOLAR GENERATION AS ARITHMETIC (sunlight into electricity, by the numbers). A panel's DC power from its
 *  voltage and current, the cell's conversion efficiency, the irradiance landing on a surface, the daily energy yield,
 *  the array's rated output, the I–V fill factor, the derated real-world output, and the payback in years. Crosses to
 *  `energy` — photovoltaic is where energy is made. A measure. */

const PROOF = 'photovoltaic arithmetic (DC power, conversion efficiency, irradiance, daily yield, array rating, fill factor, derate, payback); solar generation as integers; a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'photovoltaic', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `photovoltaic.${name}`, params })

export class PhotovoltaicFormulas {
  /** DC POWER: panel voltage times current. value voltage · current. */
  static power(voltage: number, current: number): CrossFormula { return c('pv-power', 'power(voltage, current) = voltage · current', voltage * current, nat(voltage, current), 'power', [voltage, current]) }
  /** CONVERSION EFFICIENCY as a percentage. value ⌊output · 100 / input⌋. */
  static efficiency(output: number, input: number): CrossFormula { return c('pv-efficiency', 'efficiency(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0 && output <= input, 'efficiency', [output, input]) }
  /** IRRADIANCE: power landing over an area (W/m²). value ⌊power / area⌋. */
  static irradiance(power: number, area: number): CrossFormula { return c('pv-irradiance', 'irradiance(power, area) = ⌊power / area⌋', area > 0 ? Math.floor(power / area) : 0, nat(power, area) && area > 0, 'irradiance', [power, area]) }
  /** DAILY YIELD: panel power over the sun-hours. value power · hours. */
  static yield(power: number, hours: number): CrossFormula { return c('pv-yield', 'yield(power, hours) = power · hours', power * hours, nat(power, hours), 'yield', [power, hours]) }
  /** ARRAY RATING: panels at a per-panel wattage. value panels · watts. */
  static array(panels: number, watts: number): CrossFormula { return c('pv-array', 'array(panels, watts) = panels · watts', panels * watts, nat(panels, watts), 'array', [panels, watts]) }
  /** FILL FACTOR as a percentage of the Voc·Isc product. value ⌊pmax · 100 / vocIsc⌋. */
  static fillfactor(pmax: number, vocIsc: number): CrossFormula { return c('pv-fillfactor', 'fillfactor(pmax, vocIsc) = ⌊pmax · 100 / vocIsc⌋', vocIsc > 0 ? Math.floor((pmax * 100) / vocIsc) : 0, nat(pmax, vocIsc) && vocIsc > 0 && pmax <= vocIsc, 'fillfactor', [pmax, vocIsc]) }
  /** DERATE: rated output after a percentage loss. value ⌊rated · max(0, 100 − loss) / 100⌋. */
  static derate(rated: number, loss: number): CrossFormula { return c('pv-derate', 'derate(rated, loss) = ⌊rated · max(0, 100 − loss) / 100⌋', Math.floor((rated * Math.max(0, 100 - loss)) / 100), nat(rated, loss), 'derate', [rated, loss]) }
  /** PAYBACK: the years to recover a cost at an annual saving. value ⌈cost / annual⌉. */
  static payback(cost: number, annual: number): CrossFormula { return c('pv-payback', 'payback(cost, annual) = ⌈cost / annual⌉', annual > 0 ? Math.ceil(cost / annual) : 0, nat(cost, annual) && annual > 0, 'payback', [cost, annual]) }
}

for (const name of ['array', 'derate', 'efficiency', 'fillfactor', 'irradiance', 'payback', 'power', 'yield'] as const)
  hexRegisterOf('photovoltaic', name, (PhotovoltaicFormulas[name] as (...x: unknown[]) => unknown).bind(PhotovoltaicFormulas))
