import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PULMONOLOGY — THE LUNG AS ARITHMETIC (chosen by the clinical registry, not by hand). Breathing is numbers:
 *  the forced-expiratory ratio, minute ventilation, oxygen saturation, lung compliance, dead-space fraction, peak flow,
 *  airway resistance, and diffusion. Crosses to `med` — pulmonology is a branch of medicine. A measure. */

const PROOF = 'pulmonology arithmetic (fev1 ratio, tidal minute ventilation, saturation, compliance, dead-space, peak flow, resistance, diffusion); a clinical measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pulmonology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `pulmonology.${name}`, params })

export class PulmonologyFormulas {
  /** FEV1 RATIO: forced expiratory volume over forced vital capacity, as a percentage. value ⌊fev · 100 / fvc⌋. */
  static fev1(fev: number, fvc: number): CrossFormula { return c('pulmonology-fev1', 'fev1(fev, fvc) = ⌊fev · 100 / fvc⌋', fvc > 0 ? Math.floor((fev * 100) / fvc) : 0, nat(fev, fvc) && fvc > 0 && fev <= fvc, 'fev1', [fev, fvc]) }
  /** MINUTE VENTILATION: tidal volume at a breathing rate. value volume · rate. */
  static tidal(volume: number, rate: number): CrossFormula { return c('pulmonology-tidal', 'tidal(volume, rate) = volume · rate', volume * rate, nat(volume, rate), 'tidal', [volume, rate]) }
  /** OXYGEN SATURATION: bound oxygen over carrying capacity, as a percentage. value ⌊bound · 100 / capacity⌋. */
  static saturation(bound: number, capacity: number): CrossFormula { return c('pulmonology-saturation', 'saturation(bound, capacity) = ⌊bound · 100 / capacity⌋', capacity > 0 ? Math.floor((bound * 100) / capacity) : 0, nat(bound, capacity) && capacity > 0 && bound <= capacity, 'saturation', [bound, capacity]) }
  /** LUNG COMPLIANCE: volume change per unit pressure. value ⌊volume / pressure⌋. */
  static compliance(volume: number, pressure: number): CrossFormula { return c('pulmonology-compliance', 'compliance(volume, pressure) = ⌊volume / pressure⌋', pressure > 0 ? Math.floor(volume / pressure) : 0, nat(volume, pressure) && pressure > 0, 'compliance', [volume, pressure]) }
  /** DEAD-SPACE FRACTION: dead space over tidal volume, as a percentage. value ⌊dead · 100 / tidal⌋. */
  static deadspace(dead: number, tidal_: number): CrossFormula { return c('pulmonology-deadspace', 'deadspace(dead, tidal) = ⌊dead · 100 / tidal⌋', tidal_ > 0 ? Math.floor((dead * 100) / tidal_) : 0, nat(dead, tidal_) && tidal_ > 0 && dead <= tidal_, 'deadspace', [dead, tidal_]) }
  /** PEAK FLOW: the peak expiratory flow in litres. value litres. */
  static peakflow(litres: number): CrossFormula { return c('pulmonology-peakflow', 'peakflow(litres) = litres', litres, nat(litres), 'peakflow', [litres]) }
  /** AIRWAY RESISTANCE: driving pressure over flow. value ⌊pressure / flow⌋. */
  static resistance(pressure: number, flow: number): CrossFormula { return c('pulmonology-resistance', 'resistance(pressure, flow) = ⌊pressure / flow⌋', flow > 0 ? Math.floor(pressure / flow) : 0, nat(pressure, flow) && flow > 0, 'resistance', [pressure, flow]) }
  /** DIFFUSION: gas transferred over the pressure gradient. value ⌊transferred / gradient⌋. */
  static diffusion(transferred: number, gradient: number): CrossFormula { return c('pulmonology-diffusion', 'diffusion(transferred, gradient) = ⌊transferred / gradient⌋', gradient > 0 ? Math.floor(transferred / gradient) : 0, nat(transferred, gradient) && gradient > 0, 'diffusion', [transferred, gradient]) }
}

for (const name of ['compliance', 'deadspace', 'diffusion', 'fev1', 'peakflow', 'resistance', 'saturation', 'tidal'] as const)
  hexRegisterOf('pulmonology', name, (PulmonologyFormulas[name] as (...x: unknown[]) => unknown).bind(PulmonologyFormulas))
