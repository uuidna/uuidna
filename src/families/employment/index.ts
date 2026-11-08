import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EMPLOYMENT — WORK AND ITS ENTITLEMENTS AS ARITHMETIC. Pay and the end of a job are numbers the jurisdiction's code
 *  sets: gross pay, overtime above the standard week, severance and redundancy by years of service, statutory notice,
 *  accrued holiday, and net after deductions. Exact and jurisdiction-agnostic; crosses to `law`, where the contract and
 *  the statute govern. A measure, not advice. */

const PROOF = 'employment arithmetic (gross, overtime hours and pay, severance and redundancy by service, statutory notice, accrued holiday, net of deductions); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const e = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'employment', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `employment.${name}`, params })

export class EmploymentFormulas {
  /** GROSS PAY: hours at an hourly rate. value hours · rate. */
  static gross(hours: number, rate: number): CrossFormula { return e('employment-gross', 'gross(hours, rate) = hours · rate', hours * rate, nat(hours, rate), 'gross', [hours, rate]) }
  /** OVERTIME HOURS: the hours worked above the standard week. value max(0, worked − standard). */
  static overtimehours(worked: number, standard: number): CrossFormula { return e('employment-overtimehours', 'overtimehours(worked, standard) = max(0, worked − standard)', Math.max(0, worked - standard), nat(worked, standard), 'overtimehours', [worked, standard]) }
  /** OVERTIME PAY: overtime `hours` at `rate` and a `multiplier` percent (150 = time-and-a-half). value ⌊hours · rate · multiplier / 100⌋. */
  static overtime(hours: number, rate: number, multiplier: number): CrossFormula { return e('employment-overtime', 'overtime(hours, rate, multiplier) = ⌊hours · rate · multiplier / 100⌋', Math.floor((hours * rate * multiplier) / 100), nat(hours, rate, multiplier) && multiplier >= 100, 'overtime', [hours, rate, multiplier]) }
  /** SEVERANCE: one `weekly` wage per year of service. value years · weekly. */
  static severance(years: number, weekly: number): CrossFormula { return e('employment-severance', 'severance(years, weekly) = years · weekly', years * weekly, nat(years, weekly), 'severance', [years, weekly]) }
  /** STATUTORY NOTICE in weeks: one per year of service, capped at `cap`. value min(years, cap). */
  static notice(years: number, cap: number): CrossFormula { return e('employment-notice', 'notice(years, cap) = min(years, cap)', Math.min(years, cap), nat(years, cap), 'notice', [years, cap]) }
  /** REDUNDANCY PAY: capped years of service at a `weekly` wage. value min(years, cap) · weekly. */
  static redundancy(years: number, weekly: number, cap: number): CrossFormula { return e('employment-redundancy', 'redundancy(years, weekly, cap) = min(years, cap) · weekly', Math.min(years, cap) * weekly, nat(years, weekly, cap), 'redundancy', [years, weekly, cap]) }
  /** ACCRUED HOLIDAY: the annual entitlement pro-rated by days worked. value ⌊entitlement · worked / 365⌋. */
  static holiday(entitlement: number, worked: number): CrossFormula { return e('employment-holiday', 'holiday(entitlement, worked) = ⌊entitlement · worked / 365⌋', Math.floor((entitlement * worked) / 365), nat(entitlement, worked) && worked <= 365, 'holiday', [entitlement, worked]) }
  /** NET PAY: gross less deductions. value max(0, gross − deductions). */
  static net(gross: number, deductions: number): CrossFormula { return e('employment-net', 'net(gross, deductions) = max(0, gross − deductions)', Math.max(0, gross - deductions), nat(gross, deductions), 'net', [gross, deductions]) }
}

for (const name of ['gross', 'holiday', 'net', 'notice', 'overtime', 'overtimehours', 'redundancy', 'severance'] as const)
  hexRegisterOf('employment', name, (EmploymentFormulas[name] as (...x: unknown[]) => unknown).bind(EmploymentFormulas))
