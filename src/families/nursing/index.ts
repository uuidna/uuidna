import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NURSING — BEDSIDE CARE AS ARITHMETIC (chosen by the clinical registry, not by hand). Caring for patients is numbers:
 *  a weight-based dose, the drop rate of an infusion, the patients each nurse holds, an acuity score, hand-hygiene
 *  compliance, fluid balance, medications given on time, and the tasks packed into an hour. Crosses to `med` — nursing is
 *  what medicine delivers at the bedside. A measure. */

const PROOF = 'nursing arithmetic (dosage, drop rate, patient ratio, acuity, hand hygiene, fluid balance, medication timeliness, workload); the clinical registry\'s bedside domain; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'nursing', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `nursing.${name}`, params })

export class NursingFormulas {
  /** DOSAGE: a weight-based dose at a per-kilogram amount. value weight · perkg. */
  static dosage(weight: number, perkg: number): CrossFormula { return c('nursing-dosage', 'dosage(weight, perkg) = weight · perkg', weight * perkg, nat(weight, perkg), 'dosage', [weight, perkg]) }
  /** DROP RATE: an infusion volume over the minutes it runs. value ⌊volume / minutes⌋. */
  static droprate(volume: number, minutes: number): CrossFormula { return c('nursing-droprate', 'droprate(volume, minutes) = ⌊volume / minutes⌋', minutes > 0 ? Math.floor(volume / minutes) : 0, nat(volume, minutes) && minutes > 0, 'droprate', [volume, minutes]) }
  /** RATIO: the patients each nurse holds. value ⌊patients / nurses⌋. */
  static ratio(patients: number, nurses: number): CrossFormula { return c('nursing-ratio', 'ratio(patients, nurses) = ⌊patients / nurses⌋', nurses > 0 ? Math.floor(patients / nurses) : 0, nat(patients, nurses) && nurses > 0, 'ratio', [patients, nurses]) }
  /** ACUITY: a patient's acuity score. value score. */
  static acuity(score: number): CrossFormula { return c('nursing-acuity', 'acuity(score) = score', score, nat(score), 'acuity', [score]) }
  /** HAND HYGIENE: compliant moments as a percentage of opportunities. value ⌊compliant · 100 / opportunities⌋. */
  static handwash(compliant: number, opportunities: number): CrossFormula { return c('nursing-handwash', 'handwash(compliant, opportunities) = ⌊compliant · 100 / opportunities⌋', opportunities > 0 ? Math.floor((compliant * 100) / opportunities) : 0, nat(compliant, opportunities) && opportunities > 0 && compliant <= opportunities, 'handwash', [compliant, opportunities]) }
  /** FLUID BALANCE: intake over output, never negative. value max(0, intake − output). */
  static fluid(intake: number, output: number): CrossFormula { return c('nursing-fluid', 'fluid(intake, output) = max(0, intake − output)', Math.max(0, intake - output), nat(intake, output), 'fluid', [intake, output]) }
  /** MEDICATION TIMELINESS: doses administered as a percentage of those due. value ⌊administered · 100 / due⌋. */
  static medication(administered: number, due: number): CrossFormula { return c('nursing-medication', 'medication(administered, due) = ⌊administered · 100 / due⌋', due > 0 ? Math.floor((administered * 100) / due) : 0, nat(administered, due) && due > 0 && administered <= due, 'medication', [administered, due]) }
  /** WORKLOAD: tasks packed into the hours worked. value ⌊tasks / hours⌋. */
  static workload(tasks: number, hours: number): CrossFormula { return c('nursing-workload', 'workload(tasks, hours) = ⌊tasks / hours⌋', hours > 0 ? Math.floor(tasks / hours) : 0, nat(tasks, hours) && hours > 0, 'workload', [tasks, hours]) }
}

for (const name of ['acuity', 'dosage', 'droprate', 'fluid', 'handwash', 'medication', 'ratio', 'workload'] as const)
  hexRegisterOf('nursing', name, (NursingFormulas[name] as (...x: unknown[]) => unknown).bind(NursingFormulas))
