import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CLIMATOLOGY — THE LONG-RUN STATE OF THE ATMOSPHERE, AS ARITHMETIC. Climate is numbers: a temperature anomaly above a
 *  baseline, the radiative forcing of carbon, albedo and aridity as whole percents, the summer–winter seasonality range,
 *  a per-decade trend, heating/cooling degree-days above a base, and the carbon ratio against a sink. Crosses to `climate`
 *  — climatology is what measures the climate. A measure. */

const PROOF = 'climatology arithmetic (anomaly, radiative forcing, albedo, aridity, seasonality, per-decade trend, degree-days, carbon ratio); the long-run state of the atmosphere as whole numbers; a measure crossed to climate'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'climatology', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name: `climatology.${name}`, params })

export class ClimatologyFormulas {
  /** TEMPERATURE ANOMALY: how far an observed reading sits above the baseline. value max(0, observed − baseline). */
  static anomaly(observed: number, baseline: number): CrossFormula { return c('climatology-anomaly', 'anomaly(observed, baseline) = max(0, observed − baseline)', Math.max(0, observed - baseline), nat(observed, baseline), 'anomaly', [observed, baseline]) }
  /** RADIATIVE FORCING: carbon concentration scaled by climate sensitivity. value co2 · sensitivity. */
  static forcing(co2: number, sensitivity: number): CrossFormula { return c('climatology-forcing', 'forcing(co2, sensitivity) = co2 · sensitivity', co2 * sensitivity, nat(co2, sensitivity), 'forcing', [co2, sensitivity]) }
  /** ALBEDO as a percentage: reflected over incident radiation. value ⌊reflected · 100 / incident⌋. */
  static albedo(reflected: number, incident: number): CrossFormula { return c('climatology-albedo', 'albedo(reflected, incident) = ⌊reflected · 100 / incident⌋', incident > 0 ? Math.floor((reflected * 100) / incident) : 0, nat(reflected, incident) && incident > 0 && reflected <= incident, 'albedo', [reflected, incident]) }
  /** ARIDITY index as a percentage: precipitation over evaporation. value ⌊precipitation · 100 / evaporation⌋. */
  static aridity(precipitation: number, evaporation: number): CrossFormula { return c('climatology-aridity', 'aridity(precipitation, evaporation) = ⌊precipitation · 100 / evaporation⌋', evaporation > 0 ? Math.floor((precipitation * 100) / evaporation) : 0, nat(precipitation, evaporation) && evaporation > 0, 'aridity', [precipitation, evaporation]) }
  /** SEASONALITY: the summer-over-winter temperature range. value max(0, summer − winter). */
  static seasonality(summer: number, winter: number): CrossFormula { return c('climatology-seasonality', 'seasonality(summer, winter) = max(0, summer − winter)', Math.max(0, summer - winter), nat(summer, winter), 'seasonality', [summer, winter]) }
  /** TREND: the per-decade rate of a cumulative change. value ⌊current / decades⌋. */
  static trend(current: number, decades: number): CrossFormula { return c('climatology-trend', 'trend(current, decades) = ⌊current / decades⌋', decades > 0 ? Math.floor(current / decades) : 0, nat(current, decades) && decades > 0, 'trend', [current, decades]) }
  /** DEGREE-DAY: how far temperature sits above a base. value max(0, temperature − base). */
  static degreeday(temperature: number, base: number): CrossFormula { return c('climatology-degreeday', 'degreeday(temperature, base) = max(0, temperature − base)', Math.max(0, temperature - base), nat(temperature, base), 'degreeday', [temperature, base]) }
  /** CARBON ratio as a percentage: emitted over the sink that absorbs it. value ⌊emitted · 100 / sink⌋. */
  static carbon(emitted: number, sink: number): CrossFormula { return c('climatology-carbon', 'carbon(emitted, sink) = ⌊emitted · 100 / sink⌋', sink > 0 ? Math.floor((emitted * 100) / sink) : 0, nat(emitted, sink) && sink > 0, 'carbon', [emitted, sink]) }
}

for (const name of ['albedo', 'anomaly', 'aridity', 'carbon', 'degreeday', 'forcing', 'seasonality', 'trend'] as const)
  hexRegisterOf('climatology', name, (ClimatologyFormulas[name] as (...x: unknown[]) => unknown).bind(ClimatologyFormulas))
