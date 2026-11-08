import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SCREENING — DIAGNOSTIC TEST PERFORMANCE, AS ARITHMETIC (chosen by the public-health registry, not by hand). A screening
 *  test on a population is numbers: how many sick it catches (sensitivity), how many well it clears (specificity), what a
 *  positive or negative result is worth (ppv, npv), the false alarm rate, the disease prevalence it is read against, the
 *  single-number test quality (Youden), and how many must be screened to find one case. Crosses to `epidemiology` — screening
 *  is the instrument epidemiology applies to a population. A measure. */

const PROOF = 'screening arithmetic (sensitivity, specificity, ppv, npv, false-positive rate, prevalence, Youden index, number to screen); the registry\'s uncovered diagnostic domain; a measure crossed to epidemiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'screening', dst: 'epidemiology', formula, value, proof: PROOF, ...extra }, holds, { name: `screening.${name}`, params })

export class ScreeningFormulas {
  /** SENSITIVITY: the sick a test catches, as a percentage. value ⌊tp · 100 / (tp + fn)⌋. */
  static sensitivity(tp: number, fn: number): CrossFormula { return c('screening-sensitivity', 'sensitivity(tp, fn) = ⌊tp · 100 / (tp + fn)⌋', tp + fn > 0 ? Math.floor((tp * 100) / (tp + fn)) : 0, nat(tp, fn) && tp + fn > 0, 'sensitivity', [tp, fn]) }
  /** SPECIFICITY: the well a test clears, as a percentage. value ⌊tn · 100 / (tn + fp)⌋. */
  static specificity(tn: number, fp: number): CrossFormula { return c('screening-specificity', 'specificity(tn, fp) = ⌊tn · 100 / (tn + fp)⌋', tn + fp > 0 ? Math.floor((tn * 100) / (tn + fp)) : 0, nat(tn, fp) && tn + fp > 0, 'specificity', [tn, fp]) }
  /** POSITIVE PREDICTIVE VALUE: a positive result's worth, as a percentage. value ⌊tp · 100 / (tp + fp)⌋. */
  static ppv(tp: number, fp: number): CrossFormula { return c('screening-ppv', 'ppv(tp, fp) = ⌊tp · 100 / (tp + fp)⌋', tp + fp > 0 ? Math.floor((tp * 100) / (tp + fp)) : 0, nat(tp, fp) && tp + fp > 0, 'ppv', [tp, fp]) }
  /** NEGATIVE PREDICTIVE VALUE: a negative result's worth, as a percentage. value ⌊tn · 100 / (tn + fn)⌋. */
  static npv(tn: number, fn: number): CrossFormula { return c('screening-npv', 'npv(tn, fn) = ⌊tn · 100 / (tn + fn)⌋', tn + fn > 0 ? Math.floor((tn * 100) / (tn + fn)) : 0, nat(tn, fn) && tn + fn > 0, 'npv', [tn, fn]) }
  /** FALSE-POSITIVE RATE: the false alarms among the well, as a percentage. value ⌊fp · 100 / (fp + tn)⌋. */
  static falsepositiverate(fp: number, tn: number): CrossFormula { return c('screening-falsepositiverate', 'falsepositiverate(fp, tn) = ⌊fp · 100 / (fp + tn)⌋', fp + tn > 0 ? Math.floor((fp * 100) / (fp + tn)) : 0, nat(fp, tn) && fp + tn > 0, 'falsepositiverate', [fp, tn]) }
  /** PREVALENCE: cases in a population, per 100 000. value ⌊cases · 100000 / population⌋. */
  static prevalenceadjusted(cases: number, population: number): CrossFormula { return c('screening-prevalenceadjusted', 'prevalenceadjusted(cases, population) = ⌊cases · 100000 / population⌋', population > 0 ? Math.floor((cases * 100000) / population) : 0, nat(cases, population) && population > 0 && cases <= population, 'prevalenceadjusted', [cases, population]) }
  /** YOUDEN INDEX: a test's single-number quality, in percentage points. value max(0, sens + spec − 100). */
  static youdenindex(sens: number, spec: number): CrossFormula { return c('screening-youdenindex', 'youdenindex(sens, spec) = max(0, sens + spec − 100)', Math.max(0, sens + spec - 100), nat(sens, spec) && sens <= 100 && spec <= 100, 'youdenindex', [sens, spec]) }
  /** NUMBER TO SCREEN: how many must be screened to find one case. value ⌈population / cases⌉. */
  static numbertoscreen(population: number, cases: number): CrossFormula { return c('screening-numbertoscreen', 'numbertoscreen(population, cases) = ⌈population / cases⌉', cases > 0 ? Math.ceil(population / cases) : 0, nat(population, cases) && cases > 0 && cases <= population, 'numbertoscreen', [population, cases]) }
}

for (const name of ['falsepositiverate', 'npv', 'numbertoscreen', 'ppv', 'prevalenceadjusted', 'sensitivity', 'specificity', 'youdenindex'] as const)
  hexRegisterOf('screening', name, (ScreeningFormulas[name] as (...x: unknown[]) => unknown).bind(ScreeningFormulas))
