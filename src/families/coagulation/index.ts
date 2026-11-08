import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COAGULATION — THE CLOT AS ARITHMETIC. The coagulation panel is numbers: the INR ratio, prothrombin and partial
 *  thromboplastin times, the platelet count, fibrinogen, bleeding time, clot retraction, and the thrombin-time ratio.
 *  Crosses to `hematology` — coagulation is one panel of the blood the lab reads. A measure. */

const PROOF = 'coagulation arithmetic (INR ratio, prothrombin time, aPTT ratio, platelet count, fibrinogen, bleeding time, clot retraction, thrombin ratio); a measure crossed to hematology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'coagulation', dst: 'hematology', formula, value, proof: PROOF, ...extra }, holds, { name: `coagulation.${name}`, params })

export class CoagulationFormulas {
  /** INR: the patient prothrombin time over the control, as a percent ratio. value ⌊patientPT · 100 / controlPT⌋. */
  static inr(patientPT: number, controlPT: number): CrossFormula { return c('coagulation-inr', 'inr(patientPT, controlPT) = ⌊patientPT · 100 / controlPT⌋', controlPT > 0 ? Math.floor((patientPT * 100) / controlPT) : 0, nat(patientPT, controlPT) && controlPT > 0, 'inr', [patientPT, controlPT]) }
  /** PROTHROMBIN TIME: the seconds a patient clots beyond the control. value max(0, patient − control). */
  static prothrombintime(patient: number, control: number): CrossFormula { return c('coagulation-prothrombintime', 'prothrombintime(patient, control) = max(0, patient − control)', Math.max(0, patient - control), nat(patient, control), 'prothrombintime', [patient, control]) }
  /** aPTT: the activated partial thromboplastin time over the control, as a percent ratio. value ⌊patient · 100 / control⌋. */
  static aptt(patient: number, control: number): CrossFormula { return c('coagulation-aptt', 'aptt(patient, control) = ⌊patient · 100 / control⌋', control > 0 ? Math.floor((patient * 100) / control) : 0, nat(patient, control) && control > 0, 'aptt', [patient, control]) }
  /** PLATELET COUNT: platelets per field scaled to the lab factor. value perField · factor. */
  static plateletcount(perField: number, factor: number): CrossFormula { return c('coagulation-plateletcount', 'plateletcount(perField, factor) = perField · factor', perField * factor, nat(perField, factor), 'plateletcount', [perField, factor]) }
  /** FIBRINOGEN: the clottable mass over the plasma volume. value ⌊mass / volume⌋. */
  static fibrinogen(mass: number, volume: number): CrossFormula { return c('coagulation-fibrinogen', 'fibrinogen(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'fibrinogen', [mass, volume]) }
  /** BLEEDING TIME: the minutes from puncture to a stopped bleed. value max(0, stop − start). */
  static bleedingtime(start: number, stop: number): CrossFormula { return c('coagulation-bleedingtime', 'bleedingtime(start, stop) = max(0, stop − start)', Math.max(0, stop - start), nat(start, stop), 'bleedingtime', [start, stop]) }
  /** CLOT RETRACTION: the serum expressed from the clot, as a percent of whole blood. value ⌊serum · 100 / blood⌋. */
  static clotretraction(serum: number, blood: number): CrossFormula { return c('coagulation-clotretraction', 'clotretraction(serum, blood) = ⌊serum · 100 / blood⌋', blood > 0 ? Math.floor((serum * 100) / blood) : 0, nat(serum, blood) && blood > 0 && serum <= blood, 'clotretraction', [serum, blood]) }
  /** THROMBIN RATIO: the patient thrombin time over the control, as a percent ratio. value ⌊patient · 100 / control⌋. */
  static thrombinratio(patient: number, control: number): CrossFormula { return c('coagulation-thrombinratio', 'thrombinratio(patient, control) = ⌊patient · 100 / control⌋', control > 0 ? Math.floor((patient * 100) / control) : 0, nat(patient, control) && control > 0, 'thrombinratio', [patient, control]) }
}

for (const name of ['aptt', 'bleedingtime', 'clotretraction', 'fibrinogen', 'inr', 'plateletcount', 'prothrombintime', 'thrombinratio'] as const)
  hexRegisterOf('coagulation', name, (CoagulationFormulas[name] as (...x: unknown[]) => unknown).bind(CoagulationFormulas))
