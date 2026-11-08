import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AVIATION — AIR LAW AND OPERATIONS, AS ARITHMETIC. Flight is numbers: carrier liability per kilogram, a delay, passenger
 *  compensation by distance band, range from fuel, useful payload, flight-duty within the limit, separation minima, and
 *  noise over a limit. Crosses to `law`, where the convention and the regulator govern. A measure, not advice. */

const PROOF = 'aviation arithmetic (carrier liability per kg, delay, distance-band compensation, range, payload, duty limit, separation minima, noise exceedance); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const a = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'aviation', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `aviation.${name}`, params })

export class AviationFormulas {
  /** CARRIER LIABILITY for cargo: weight in kg at the convention's unit of account per kg. value weight · perKg. */
  static liability(weight: number, perKg: number): CrossFormula { return a('aviation-liability', 'liability(weight, perKg) = weight · perKg', weight * perKg, nat(weight, perKg), 'liability', [weight, perKg]) }
  /** DELAY: actual over scheduled. value max(0, actual − scheduled). */
  static delay(scheduled: number, actual: number): CrossFormula { return a('aviation-delay', 'delay(scheduled, actual) = max(0, actual − scheduled)', Math.max(0, actual - scheduled), nat(scheduled, actual), 'delay', [scheduled, actual]) }
  /** PASSENGER COMPENSATION by distance band (the EU261 shape): 250 up to 1500 km, 400 up to 3500 km, else 600. */
  static compensation(km: number): CrossFormula { return a('aviation-compensation', 'compensation(km) = 250 (≤1500), 400 (≤3500), else 600', km <= 1500 ? 250 : km <= 3500 ? 400 : 600, nat(km), 'compensation', [km]) }
  /** RANGE: fuel over the burn rate. value ⌊fuel / burn⌋. */
  static range(fuel: number, burn: number): CrossFormula { return a('aviation-range', 'range(fuel, burn) = ⌊fuel / burn⌋', burn > 0 ? Math.floor(fuel / burn) : 0, nat(fuel, burn) && burn > 0, 'range', [fuel, burn]) }
  /** USEFUL PAYLOAD: maximum take-off weight less the empty weight. value max(0, mtow − empty). */
  static payload(mtow: number, empty: number): CrossFormula { return a('aviation-payload', 'payload(mtow, empty) = max(0, mtow − empty)', Math.max(0, mtow - empty), nat(mtow, empty), 'payload', [mtow, empty]) }
  /** FLIGHT DUTY: 1 when duty hours are within the regulatory limit. value [hours ≤ limit]. */
  static duty(hours: number, limit: number): CrossFormula { return a('aviation-duty', 'duty(hours, limit) = [hours ≤ limit]', hours <= limit ? 1 : 0, nat(hours, limit), 'duty', [hours, limit]) }
  /** SEPARATION: 1 when the gap meets the minimum separation. value [gap ≥ minimum]. */
  static separation(gap: number, minimum: number): CrossFormula { return a('aviation-separation', 'separation(gap, minimum) = [gap ≥ minimum]', gap >= minimum ? 1 : 0, nat(gap, minimum), 'separation', [gap, minimum]) }
  /** NOISE over the certificated limit. value max(0, level − limit). */
  static noise(level: number, limit: number): CrossFormula { return a('aviation-noise', 'noise(level, limit) = max(0, level − limit)', Math.max(0, level - limit), nat(level, limit), 'noise', [level, limit]) }
}

for (const name of ['compensation', 'delay', 'duty', 'liability', 'noise', 'payload', 'range', 'separation'] as const)
  hexRegisterOf('aviation', name, (AviationFormulas[name] as (...x: unknown[]) => unknown).bind(AviationFormulas))
