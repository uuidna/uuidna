import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CARDIOLOGY — THE HEART, AS ARITHMETIC (chosen by the registry, not by hand). A beating heart is numbers: the fraction
 *  the ventricle ejects, cardiac output, mean arterial pressure, a corrected QT proxy, the target heart rate for an age,
 *  body-mass index, a risk fraction, and pulse from counted beats. Crosses to `med` — cardiology is a measure medicine
 *  reads. A measure. */

const PROOF = 'cardiology arithmetic (ejection fraction, cardiac output, mean arterial pressure, corrected QT, target heart rate, body-mass index, risk, pulse); a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cardiology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `cardiology.${name}`, params })

export class CardiologyFormulas {
  /** EJECTION FRACTION: the percentage of diastolic volume the stroke ejects. value ⌊stroke · 100 / diastolic⌋. */
  static ejection(stroke: number, diastolic: number): CrossFormula { return c('cardiology-ejection', 'ejection(stroke, diastolic) = ⌊stroke · 100 / diastolic⌋', diastolic > 0 ? Math.floor((stroke * 100) / diastolic) : 0, nat(stroke, diastolic) && diastolic > 0 && stroke <= diastolic, 'ejection', [stroke, diastolic]) }
  /** CARDIAC OUTPUT: stroke volume at a heart rate. value stroke · rate. */
  static output(stroke: number, rate: number): CrossFormula { return c('cardiology-output', 'output(stroke, rate) = stroke · rate', stroke * rate, nat(stroke, rate), 'output', [stroke, rate]) }
  /** MEAN ARTERIAL PRESSURE: diastolic weighted twice. value ⌊(systolic + 2 · diastolic) / 3⌋. */
  static map(systolic: number, diastolic: number): CrossFormula { return c('cardiology-map', 'map(systolic, diastolic) = ⌊(systolic + 2 · diastolic) / 3⌋', Math.floor((systolic + 2 * diastolic) / 3), nat(systolic, diastolic), 'map', [systolic, diastolic]) }
  /** CORRECTED QT: a proxy, QT over the RR interval. value ⌊qt · 100 / rr⌋. */
  static qtc(qt: number, rr: number): CrossFormula { return c('cardiology-qtc', 'qtc(qt, rr) = ⌊qt · 100 / rr⌋', rr > 0 ? Math.floor((qt * 100) / rr) : 0, nat(qt, rr) && rr > 0, 'qtc', [qt, rr]) }
  /** TARGET HEART RATE: the maximum for an age. value max(0, 220 − age). */
  static target(age: number): CrossFormula { return c('cardiology-target', 'target(age) = max(0, 220 − age)', Math.max(0, 220 - age), nat(age), 'target', [age]) }
  /** BODY-MASS INDEX: weight over height squared. value ⌊weight · 10000 / height²⌋. */
  static bmi(weight: number, heightcm: number): CrossFormula { return c('cardiology-bmi', 'bmi(weight, heightcm) = ⌊weight · 10000 / heightcm²⌋', heightcm > 0 ? Math.floor((weight * 10000) / (heightcm * heightcm)) : 0, nat(weight, heightcm) && heightcm > 0, 'bmi', [weight, heightcm]) }
  /** RISK: the fraction of factors present. value ⌊factors · 100 / total⌋. */
  static risk(factors: number, total: number): CrossFormula { return c('cardiology-risk', 'risk(factors, total) = ⌊factors · 100 / total⌋', total > 0 ? Math.floor((factors * 100) / total) : 0, nat(factors, total) && total > 0 && factors <= total, 'risk', [factors, total]) }
  /** PULSE: beats counted over seconds, to the minute. value ⌊beats · 60 / seconds⌋. */
  static pulse(beats: number, seconds: number): CrossFormula { return c('cardiology-pulse', 'pulse(beats, seconds) = ⌊beats · 60 / seconds⌋', seconds > 0 ? Math.floor((beats * 60) / seconds) : 0, nat(beats, seconds) && seconds > 0, 'pulse', [beats, seconds]) }
}

for (const name of ['bmi', 'ejection', 'map', 'output', 'pulse', 'qtc', 'risk', 'target'] as const)
  hexRegisterOf('cardiology', name, (CardiologyFormulas[name] as (...x: unknown[]) => unknown).bind(CardiologyFormulas))
