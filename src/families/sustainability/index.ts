import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SUSTAINABILITY — KEEPING WITHIN THE EARTH'S MEANS, AS ARITHMETIC. The carbon footprint of a consumption against its
 *  capacity, the renewable share of energy, how circular the material flow is, resource efficiency, carbon offset, the
 *  lifecycle of a reused thing, impact intensity per unit, and ecosystem regeneration. Crosses to `ecology` — sustainability
 *  is ecology measured. A measure. */

const PROOF = 'sustainability arithmetic (footprint, renewable share, circularity, efficiency, offset, lifecycle, intensity, regeneration); a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sustainability', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `sustainability.${name}`, params })

export class SustainabilityFormulas {
  /** CIRCULARITY: the recycled share of what was produced, as a percentage. value ⌊recycled · 100 / produced⌋. */
  static circularity(recycled: number, produced: number): CrossFormula { return c('sustainability-circularity', 'circularity(recycled, produced) = ⌊recycled · 100 / produced⌋', produced > 0 ? Math.floor((recycled * 100) / produced) : 0, nat(recycled, produced) && produced > 0 && recycled <= produced, 'circularity', [recycled, produced]) }
  /** EFFICIENCY: output per unit of resource. value ⌊output / resource⌋. */
  static efficiency(output: number, resource: number): CrossFormula { return c('sustainability-efficiency', 'efficiency(output, resource) = ⌊output / resource⌋', resource > 0 ? Math.floor(output / resource) : 0, nat(output, resource) && resource > 0, 'efficiency', [output, resource]) }
  /** FOOTPRINT: consumption against the carrying capacity, as a percentage. value ⌊consumption · 100 / capacity⌋. */
  static footprint(consumption: number, capacity: number): CrossFormula { return c('sustainability-footprint', 'footprint(consumption, capacity) = ⌊consumption · 100 / capacity⌋', capacity > 0 ? Math.floor((consumption * 100) / capacity) : 0, nat(consumption, capacity) && capacity > 0, 'footprint', [consumption, capacity]) }
  /** INTENSITY: impact per unit of activity. value ⌊impact / unit⌋. */
  static intensity(impact: number, unit: number): CrossFormula { return c('sustainability-intensity', 'intensity(impact, unit) = ⌊impact / unit⌋', unit > 0 ? Math.floor(impact / unit) : 0, nat(impact, unit) && unit > 0, 'intensity', [impact, unit]) }
  /** LIFECYCLE: a reused thing over its cycles. value reused · cycles. */
  static lifecycle(reused: number, cycles: number): CrossFormula { return c('sustainability-lifecycle', 'lifecycle(reused, cycles) = reused · cycles', reused * cycles, nat(reused, cycles), 'lifecycle', [reused, cycles]) }
  /** OFFSET: carbon absorbed against carbon emitted, as a percentage. value ⌊absorbed · 100 / emitted⌋. */
  static offset(absorbed: number, emitted: number): CrossFormula { return c('sustainability-offset', 'offset(absorbed, emitted) = ⌊absorbed · 100 / emitted⌋', emitted > 0 ? Math.floor((absorbed * 100) / emitted) : 0, nat(absorbed, emitted) && emitted > 0, 'offset', [absorbed, emitted]) }
  /** REGENERATION: restored land against degraded land, as a percentage. value ⌊restored · 100 / degraded⌋. */
  static regeneration(restored: number, degraded: number): CrossFormula { return c('sustainability-regeneration', 'regeneration(restored, degraded) = ⌊restored · 100 / degraded⌋', degraded > 0 ? Math.floor((restored * 100) / degraded) : 0, nat(restored, degraded) && degraded > 0, 'regeneration', [restored, degraded]) }
  /** RENEWABLE: the clean share of total energy, as a percentage. value ⌊clean · 100 / total⌋. */
  static renewable(clean: number, total: number): CrossFormula { return c('sustainability-renewable', 'renewable(clean, total) = ⌊clean · 100 / total⌋', total > 0 ? Math.floor((clean * 100) / total) : 0, nat(clean, total) && total > 0 && clean <= total, 'renewable', [clean, total]) }
}

for (const name of ['circularity', 'efficiency', 'footprint', 'intensity', 'lifecycle', 'offset', 'regeneration', 'renewable'] as const)
  hexRegisterOf('sustainability', name, (SustainabilityFormulas[name] as (...x: unknown[]) => unknown).bind(SustainabilityFormulas))
