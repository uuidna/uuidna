import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MED — THE CLINICAL AND FORENSIC-MEDICAL ARITHMETIC THAT BECOMES EVIDENCE. What a clinician or a medical examiner
 *  computes is arithmetic over the patient's numbers: body-mass index, a weight-based dose, the Glasgow Coma Scale, the
 *  mean arterial pressure, pack-years, a whole-person impairment rating, the relative risk that grounds causation, a
 *  dosing frequency. Each crosses to `evidence` — a medical finding is read into the record — extending the chain
 *  med → evidence → law. Exact; a measure, not a diagnosis or medical advice. */

const PROOF = 'clinical and forensic-medical arithmetic (BMI, weight-based dose, Glasgow Coma Scale, mean arterial pressure, pack-years, whole-person impairment, relative risk for causation, dosing frequency) read into evidence: med → evidence → law. A measure, not a diagnosis'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const m = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'med', dst: 'evidence', formula, value, proof: PROOF, ...extra }, holds, { name: `med.${name}`, params })

export class MedFormulas {
  /** BODY-MASS INDEX (×1, rounded down): weight in kg over height in metres squared, from height in cm. value ⌊w·10000/h²⌋. */
  static bmi(weightKg: number, heightCm: number): CrossFormula { return m('med-bmi', 'bmi(weightKg, heightCm) = ⌊weightKg · 10000 / heightCm²⌋', heightCm > 0 ? Math.floor((weightKg * 10000) / (heightCm * heightCm)) : 0, nat(weightKg, heightCm) && heightCm > 0, 'bmi', [weightKg, heightCm]) }
  /** A WEIGHT-BASED DOSE: milligrams per kilogram times the patient's weight. value weightKg · perKg. */
  static dose(weightKg: number, perKg: number): CrossFormula { return m('med-dose', 'dose(weightKg, perKg) = weightKg · perKg', weightKg * perKg, nat(weightKg, perKg), 'dose', [weightKg, perKg]) }
  /** THE GLASGOW COMA SCALE: eye (1–4) plus verbal (1–5) plus motor (1–6), from 3 to 15. value eye + verbal + motor. */
  static gcs(eye: number, verbal: number, motor: number): CrossFormula { return m('med-gcs', 'gcs(eye, verbal, motor) = eye + verbal + motor', eye + verbal + motor, nat(eye, verbal, motor) && eye >= 1 && eye <= 4 && verbal >= 1 && verbal <= 5 && motor >= 1 && motor <= 6, 'gcs', [eye, verbal, motor]) }
  /** MEAN ARTERIAL PRESSURE: systolic plus twice diastolic, over three. value ⌊(systolic + 2·diastolic) / 3⌋. */
  static map(systolic: number, diastolic: number): CrossFormula { return m('med-map', 'map(systolic, diastolic) = ⌊(systolic + 2·diastolic) / 3⌋', Math.floor((systolic + 2 * diastolic) / 3), nat(systolic, diastolic) && systolic >= diastolic, 'map', [systolic, diastolic]) }
  /** PACK-YEARS: cigarettes per day times years, over twenty to the pack. value ⌊perDay · years / 20⌋. */
  static packyears(perDay: number, years: number): CrossFormula { return m('med-packyears', 'packyears(perDay, years) = ⌊perDay · years / 20⌋', Math.floor((perDay * years) / 20), nat(perDay, years), 'packyears', [perDay, years]) }
  /** A WHOLE-PERSON IMPAIRMENT RATING as a percentage: the impaired `part` of the `whole`. value ⌊part · 100 / whole⌋. */
  static impairment(part: number, whole: number): CrossFormula { return m('med-impairment', 'impairment(part, whole) = ⌊part · 100 / whole⌋', whole > 0 ? Math.floor((part * 100) / whole) : 0, nat(part, whole) && whole > 0 && part <= whole, 'impairment', [part, whole]) }
  /** RELATIVE RISK (×100) — the ratio that grounds medical causation (≈ 200 doubles the risk). value ⌊exposed · 100 / baseline⌋. */
  static causation(exposed: number, baseline: number): CrossFormula { return m('med-causation', 'causation(exposed, baseline) = ⌊exposed · 100 / baseline⌋', baseline > 0 ? Math.floor((exposed * 100) / baseline) : 0, nat(exposed, baseline) && baseline > 0, 'causation', [exposed, baseline]) }
  /** DOSING FREQUENCY: doses in a day at an interval of `hours`. value ⌊24 / hours⌋. */
  static frequency(hours: number): CrossFormula { return m('med-frequency', 'frequency(hours) = ⌊24 / hours⌋', hours > 0 ? Math.floor(24 / hours) : 0, nat(hours) && hours > 0, 'frequency', [hours]) }
}

for (const name of ['bmi', 'causation', 'dose', 'frequency', 'gcs', 'impairment', 'map', 'packyears'] as const)
  hexRegisterOf('med', name, (MedFormulas[name] as (...x: unknown[]) => unknown).bind(MedFormulas))
