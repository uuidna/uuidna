import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHYSIOLOGY — THE LIVING BODY, AS ARITHMETIC. The numbers a clinic reads: basal metabolic rate, oxygen uptake per
 *  kilogram, drug clearance, glomerular filtration rate, plasma osmolality, an acid/base ratio, the tidal minute volume,
 *  and oxygen saturation. Crosses to `med` — physiology is what medicine measures. A measure. */

const PROOF = 'physiology arithmetic (basal metabolic rate, oxygen uptake, clearance, glomerular filtration, osmolality, acid/base, tidal volume, saturation); the living body as a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'physiology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `physiology.${name}`, params })

export class PhysiologyFormulas {
  /** BASAL METABOLIC RATE proxy: weight at a per-kilogram factor. value weight · factor. */
  static bmr(weight: number, factor: number): CrossFormula { return c('physiology-bmr', 'bmr(weight, factor) = weight · factor', weight * factor, nat(weight, factor), 'bmr', [weight, factor]) }
  /** OXYGEN UPTAKE per kilogram: volume over weight. value ⌊volume / weight⌋. */
  static vo2(volume: number, weight: number): CrossFormula { return c('physiology-vo2', 'vo2(volume, weight) = ⌊volume / weight⌋', weight > 0 ? Math.floor(volume / weight) : 0, nat(volume, weight) && weight > 0, 'vo2', [volume, weight]) }
  /** CLEARANCE: concentration at a flow. value concentration · flow. */
  static clearance(concentration: number, flow: number): CrossFormula { return c('physiology-clearance', 'clearance(concentration, flow) = concentration · flow', concentration * flow, nat(concentration, flow), 'clearance', [concentration, flow]) }
  /** GLOMERULAR FILTRATION RATE: filtrate over time. value ⌊filtrate / time⌋. */
  static gfr(filtrate: number, time: number): CrossFormula { return c('physiology-gfr', 'gfr(filtrate, time) = ⌊filtrate / time⌋', time > 0 ? Math.floor(filtrate / time) : 0, nat(filtrate, time) && time > 0, 'gfr', [filtrate, time]) }
  /** OSMOLALITY: solutes per kilogram of water (milli-units). value ⌊solutes · 1000 / water⌋. */
  static osmolality(solutes: number, water: number): CrossFormula { return c('physiology-osmolality', 'osmolality(solutes, water) = ⌊solutes · 1000 / water⌋', water > 0 ? Math.floor((solutes * 1000) / water) : 0, nat(solutes, water) && water > 0, 'osmolality', [solutes, water]) }
  /** ACID/BASE ratio as a percentage. value ⌊acid · 100 / base⌋. */
  static ph(acid: number, base: number): CrossFormula { return c('physiology-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) }
  /** TIDAL minute volume: breaths at a volume each. value breaths · volume. */
  static tidal(breaths: number, volume: number): CrossFormula { return c('physiology-tidal', 'tidal(breaths, volume) = breaths · volume', breaths * volume, nat(breaths, volume), 'tidal', [breaths, volume]) }
  /** OXYGEN SATURATION as a percentage. value ⌊bound · 100 / total⌋. */
  static saturation(bound: number, total: number): CrossFormula { return c('physiology-saturation', 'saturation(bound, total) = ⌊bound · 100 / total⌋', total > 0 ? Math.floor((bound * 100) / total) : 0, nat(bound, total) && total > 0 && bound <= total, 'saturation', [bound, total]) }
}

for (const name of ['bmr', 'clearance', 'gfr', 'osmolality', 'ph', 'saturation', 'tidal', 'vo2'] as const)
  hexRegisterOf('physiology', name, (PhysiologyFormulas[name] as (...x: unknown[]) => unknown).bind(PhysiologyFormulas))
