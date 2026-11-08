import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** IRRIGATION — WATERING A FIELD, AS ARITHMETIC (chosen by the agronomy registry, not by hand). Watering is numbers: the
 *  water a field needs, how much of it reaches the roots, how long the valves run, the depth applied, the crop's demand,
 *  how evenly it lands, the total flow of the emitters, and the net need after rain. Crosses to `agriculture` — irrigation
 *  is what agriculture spends water on. A measure. */

const PROOF = 'irrigation arithmetic (water requirement, efficiency, valve runtime, applied depth, evapotranspiration, uniformity, flow, schedule); the agronomy registry\'s uncovered domain; a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'irrigation', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `irrigation.${name}`, params })

export class IrrigationFormulas {
  /** WATER REQUIREMENT: area at a depth each. value area · depth. */
  static requirement(area: number, depth: number): CrossFormula { return c('irrigation-requirement', 'requirement(area, depth) = area · depth', area * depth, nat(area, depth), 'requirement', [area, depth]) }
  /** EFFICIENCY as a percentage: water delivered to the roots over water applied. value ⌊delivered · 100 / applied⌋. */
  static efficiency(delivered: number, applied: number): CrossFormula { return c('irrigation-efficiency', 'efficiency(delivered, applied) = ⌊delivered · 100 / applied⌋', applied > 0 ? Math.floor((delivered * 100) / applied) : 0, nat(delivered, applied) && applied > 0 && delivered <= applied, 'efficiency', [delivered, applied]) }
  /** VALVE RUNTIME: the volume to apply at an emitter flow rate. value ⌊volume / rate⌋. */
  static runtime(volume: number, rate: number): CrossFormula { return c('irrigation-runtime', 'runtime(volume, rate) = ⌊volume / rate⌋', rate > 0 ? Math.floor(volume / rate) : 0, nat(volume, rate) && rate > 0, 'runtime', [volume, rate]) }
  /** APPLIED DEPTH: volume spread over an area. value ⌊volume / area⌋. */
  static application(volume: number, area: number): CrossFormula { return c('irrigation-application', 'application(volume, area) = ⌊volume / area⌋', area > 0 ? Math.floor(volume / area) : 0, nat(volume, area) && area > 0, 'application', [volume, area]) }
  /** EVAPOTRANSPIRATION: reference ET scaled by a crop coefficient (percent). value ⌊et0 · coefficient / 100⌋. */
  static evapotranspiration(et0: number, coefficient: number): CrossFormula { return c('irrigation-evapotranspiration', 'evapotranspiration(et0, coefficient) = ⌊et0 · coefficient / 100⌋', Math.floor((et0 * coefficient) / 100), nat(et0, coefficient), 'evapotranspiration', [et0, coefficient]) }
  /** DISTRIBUTION UNIFORMITY as a percentage: the lowest quarter over the mean. value ⌊min · 100 / mean⌋. */
  static uniformity(min: number, mean: number): CrossFormula { return c('irrigation-uniformity', 'uniformity(min, mean) = ⌊min · 100 / mean⌋', mean > 0 ? Math.floor((min * 100) / mean) : 0, nat(min, mean) && mean > 0 && min <= mean, 'uniformity', [min, mean]) }
  /** FLOW: emitters at a per-emitter flow. value emitters · perEmitter. */
  static flowrate(emitters: number, perEmitter: number): CrossFormula { return c('irrigation-flowrate', 'flowrate(emitters, perEmitter) = emitters · perEmitter', emitters * perEmitter, nat(emitters, perEmitter), 'flowrate', [emitters, perEmitter]) }
  /** SCHEDULE: the net irrigation need after effective rainfall. value max(0, requirement − rainfall). */
  static schedule(requirement: number, rainfall: number): CrossFormula { return c('irrigation-schedule', 'schedule(requirement, rainfall) = max(0, requirement − rainfall)', Math.max(0, requirement - rainfall), nat(requirement, rainfall), 'schedule', [requirement, rainfall]) }
}

for (const name of ['application', 'efficiency', 'evapotranspiration', 'flowrate', 'requirement', 'runtime', 'schedule', 'uniformity'] as const)
  hexRegisterOf('irrigation', name, (IrrigationFormulas[name] as (...x: unknown[]) => unknown).bind(IrrigationFormulas))
