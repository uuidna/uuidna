import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DOSAGE — PRESCRIBING AS ARITHMETIC (chosen by the clinical registry, not by hand). A dose is numbers: amount by body
 *  weight, amount by body surface area, the daily total, the divided dose, the capped maximum, the pediatric scale-down,
 *  the maintenance fraction, and the cumulative exposure. Crosses to `pharmacology` — dosage is what pharmacology
 *  prescribes. A measure. */

const PROOF = 'dosage arithmetic (per-weight, per-BSA, daily total, divided dose, maximum cap, pediatric scale, maintenance fraction, cumulative exposure); a clinical measure crossed to pharmacology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dosage', dst: 'pharmacology', formula, value, proof: PROOF, ...extra }, holds, { name: `dosage.${name}`, params })

export class DosageFormulas {
  /** PER-WEIGHT DOSE: milligrams per kilogram over body weight. value weight · perkg. */
  static perweight(weight: number, perkg: number): CrossFormula { return c('dosage-perweight', 'perweight(weight, perkg) = weight · perkg', weight * perkg, nat(weight, perkg), 'perweight', [weight, perkg]) }
  /** PER-BSA DOSE: milligrams per square metre over body surface area. value bsa · perm2. */
  static perbsa(bsa: number, perm2: number): CrossFormula { return c('dosage-perbsa', 'perbsa(bsa, perm2) = bsa · perm2', bsa * perm2, nat(bsa, perm2), 'perbsa', [bsa, perm2]) }
  /** DAILY TOTAL: a single dose taken a number of times. value dose · times. */
  static daily(dose: number, times: number): CrossFormula { return c('dosage-daily', 'daily(dose, times) = dose · times', dose * times, nat(dose, times), 'daily', [dose, times]) }
  /** DIVIDED DOSE: a daily total split across administrations. value ⌊daily / times⌋. */
  static divided(daily: number, times: number): CrossFormula { return c('dosage-divided', 'divided(daily, times) = ⌊daily / times⌋', times > 0 ? Math.floor(daily / times) : 0, nat(daily, times) && times > 0, 'divided', [daily, times]) }
  /** MAXIMUM: a dose capped at a ceiling. value min(dose, cap). */
  static maximum(dose: number, cap: number): CrossFormula { return c('dosage-maximum', 'maximum(dose, cap) = min(dose, cap)', Math.min(dose, cap), nat(dose, cap), 'maximum', [dose, cap]) }
  /** PEDIATRIC (Clark's rule): the adult dose scaled by weight against a 70 kg adult. value ⌊adult · weight / 70⌋. */
  static pediatric(adult: number, weight: number): CrossFormula { return c('dosage-pediatric', 'pediatric(adult, weight) = ⌊adult · weight / 70⌋', Math.floor((adult * weight) / 70), nat(adult, weight), 'pediatric', [adult, weight]) }
  /** MAINTENANCE: a percentage fraction of the loading dose. value ⌊loading · fraction / 100⌋. */
  static maintenance(loading: number, fraction: number): CrossFormula { return c('dosage-maintenance', 'maintenance(loading, fraction) = ⌊loading · fraction / 100⌋', Math.floor((loading * fraction) / 100), nat(loading, fraction) && fraction <= 100, 'maintenance', [loading, fraction]) }
  /** CUMULATIVE EXPOSURE: a daily dose over a course of days. value dose · days. */
  static cumulative(dose: number, days: number): CrossFormula { return c('dosage-cumulative', 'cumulative(dose, days) = dose · days', dose * days, nat(dose, days), 'cumulative', [dose, days]) }
}

for (const name of ['cumulative', 'daily', 'divided', 'maintenance', 'maximum', 'pediatric', 'perbsa', 'perweight'] as const)
  hexRegisterOf('dosage', name, (DosageFormulas[name] as (...x: unknown[]) => unknown).bind(DosageFormulas))
