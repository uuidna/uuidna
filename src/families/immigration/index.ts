import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** IMMIGRATION — STATUS AS ARITHMETIC. Who may enter and stay is numbers the system sets: a points-based score, the
 *  residence requirement, continuous residence within an absence allowance, visas granted under a quota, a sponsor's
 *  income test, overstay days, the naturalization period, and the dependents on an application. Crosses to `law`, where
 *  status is granted and appealed. A measure, not advice. */

const PROOF = 'immigration arithmetic (points score, residence requirement, continuous residence, quota, sponsorship income test, overstay, naturalization period, dependents); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const g = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'immigration', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `immigration.${name}`, params })

export class ImmigrationFormulas {
  /** THE POINTS SCORE: education plus experience plus language points. value education + experience + language. */
  static points(education: number, experience: number, language: number): CrossFormula { return g('immigration-points', 'points(education, experience, language) = education + experience + language', education + experience + language, nat(education, experience, language), 'points', [education, experience, language]) }
  /** THE RESIDENCE REQUIREMENT: 1 when days present meet those required. value [days ≥ required]. */
  static residence(days: number, required: number): CrossFormula { return g('immigration-residence', 'residence(days, required) = [days ≥ required]', days >= required ? 1 : 0, nat(days, required), 'residence', [days, required]) }
  /** CONTINUOUS RESIDENCE: 1 when absences stay within the allowance. value [absences ≤ allowed]. */
  static continuous(absences: number, allowed: number): CrossFormula { return g('immigration-continuous', 'continuous(absences, allowed) = [absences ≤ allowed]', absences <= allowed ? 1 : 0, nat(absences, allowed), 'continuous', [absences, allowed]) }
  /** VISAS GRANTED under a quota: applications up to the cap. value min(applications, cap). */
  static quota(applications: number, cap: number): CrossFormula { return g('immigration-quota', 'quota(applications, cap) = min(applications, cap)', Math.min(applications, cap), nat(applications, cap), 'quota', [applications, cap]) }
  /** THE SPONSOR'S INCOME TEST: 1 when income meets the threshold. value [income ≥ threshold]. */
  static sponsorship(income: number, threshold: number): CrossFormula { return g('immigration-sponsorship', 'sponsorship(income, threshold) = [income ≥ threshold]', income >= threshold ? 1 : 0, nat(income, threshold), 'sponsorship', [income, threshold]) }
  /** OVERSTAY: days present beyond the visa's validity. value max(0, days − visa). */
  static overstay(days: number, visa: number): CrossFormula { return g('immigration-overstay', 'overstay(days, visa) = max(0, days − visa)', Math.max(0, days - visa), nat(days, visa), 'overstay', [days, visa]) }
  /** NATURALIZATION: 1 when years of residence meet those required to naturalize. value [years ≥ required]. */
  static naturalization(years: number, required: number): CrossFormula { return g('immigration-naturalization', 'naturalization(years, required) = [years ≥ required]', years >= required ? 1 : 0, nat(years, required), 'naturalization', [years, required]) }
  /** DEPENDENTS on the application: adults plus children. value adults + children. */
  static dependents(adults: number, children: number): CrossFormula { return g('immigration-dependents', 'dependents(adults, children) = adults + children', adults + children, nat(adults, children), 'dependents', [adults, children]) }
}

for (const name of ['continuous', 'dependents', 'naturalization', 'overstay', 'points', 'quota', 'residence', 'sponsorship'] as const)
  hexRegisterOf('immigration', name, (ImmigrationFormulas[name] as (...x: unknown[]) => unknown).bind(ImmigrationFormulas))
