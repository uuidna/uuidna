import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VENTILATION — MOVING AIR THROUGH THE LUNGS, AS ARITHMETIC. Breathing is numbers: the minute volume a tidal breath at a
 *  rate delivers, the alveolar share once dead space is spent, dead space itself by body weight, the rate a minute volume
 *  implies, lung compliance, airway resistance, the oxygen delivered, and how ventilation matches perfusion. Crosses to
 *  `pulmonology` — ventilation is what pulmonology measures. A measure. */

const PROOF = 'ventilation arithmetic (minute volume, alveolar ventilation, dead space, respiratory rate, compliance, airway resistance, oxygen delivery, ventilation-perfusion); a measure crossed to pulmonology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ventilation', dst: 'pulmonology', formula, value, proof: PROOF, ...extra }, holds, { name: `ventilation.${name}`, params })

export class VentilationFormulas {
  /** MINUTE VOLUME: a tidal breath at a respiratory rate. value tidal · rate. */
  static minutevolume(tidal: number, rate: number): CrossFormula { return c('ventilation-minutevolume', 'minutevolume(tidal, rate) = tidal · rate', tidal * rate, nat(tidal, rate), 'minutevolume', [tidal, rate]) }
  /** ALVEOLAR VENTILATION: the tidal breath past dead space, at a rate. value (tidal − dead) · rate. */
  static alveolarventilation(tidal: number, dead: number, rate: number): CrossFormula { return c('ventilation-alveolarventilation', 'alveolarventilation(tidal, dead, rate) = max(0, tidal − dead) · rate', Math.max(0, tidal - dead) * rate, nat(tidal, dead, rate), 'alveolarventilation', [tidal, dead, rate]) }
  /** DEAD SPACE: body weight at a volume per kilogram. value weight · perKg. */
  static deadspace(weight: number, perKg: number): CrossFormula { return c('ventilation-deadspace', 'deadspace(weight, perKg) = weight · perKg', weight * perKg, nat(weight, perKg), 'deadspace', [weight, perKg]) }
  /** RESPIRATORY RATE: the breaths a minute volume implies at a tidal size. value ⌊minute / tidal⌋. */
  static respiratoryrate(minute: number, tidal: number): CrossFormula { return c('ventilation-respiratoryrate', 'respiratoryrate(minute, tidal) = ⌊minute / tidal⌋', tidal > 0 ? Math.floor(minute / tidal) : 0, nat(minute, tidal) && tidal > 0, 'respiratoryrate', [minute, tidal]) }
  /** COMPLIANCE: volume gained per unit of pressure. value ⌊volume / pressure⌋. */
  static compliance(volume: number, pressure: number): CrossFormula { return c('ventilation-compliance', 'compliance(volume, pressure) = ⌊volume / pressure⌋', pressure > 0 ? Math.floor(volume / pressure) : 0, nat(volume, pressure) && pressure > 0, 'compliance', [volume, pressure]) }
  /** AIRWAY RESISTANCE: the pressure a flow costs. value ⌊pressure / flow⌋. */
  static airwayresistance(pressure: number, flow: number): CrossFormula { return c('ventilation-airwayresistance', 'airwayresistance(pressure, flow) = ⌊pressure / flow⌋', flow > 0 ? Math.floor(pressure / flow) : 0, nat(pressure, flow) && flow > 0, 'airwayresistance', [pressure, flow]) }
  /** OXYGEN DELIVERY: cardiac output carrying arterial oxygen content. value cardiac · content. */
  static oxygendelivery(cardiac: number, content: number): CrossFormula { return c('ventilation-oxygendelivery', 'oxygendelivery(cardiac, content) = cardiac · content', cardiac * content, nat(cardiac, content), 'oxygendelivery', [cardiac, content]) }
  /** VENTILATION-PERFUSION: the ratio of ventilation to perfusion, as a percentage. value ⌊ventilation · 100 / perfusion⌋. */
  static ventilationperfusion(ventilation: number, perfusion: number): CrossFormula { return c('ventilation-ventilationperfusion', 'ventilationperfusion(ventilation, perfusion) = ⌊ventilation · 100 / perfusion⌋', perfusion > 0 ? Math.floor((ventilation * 100) / perfusion) : 0, nat(ventilation, perfusion) && perfusion > 0, 'ventilationperfusion', [ventilation, perfusion]) }
}

for (const name of ['airwayresistance', 'alveolarventilation', 'compliance', 'deadspace', 'minutevolume', 'oxygendelivery', 'respiratoryrate', 'ventilationperfusion'] as const)
  hexRegisterOf('ventilation', name, (VentilationFormulas[name] as (...x: unknown[]) => unknown).bind(VentilationFormulas))
