import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VET — VETERINARY MEDICINE, AS ARITHMETIC. Treating animals is numbers: a dose by body weight, age in dog years, the
 *  body-condition score, the share of a herd that is sick, a due date from a breeding date, a daily feed ration, the
 *  share of a flock vaccinated, and the fluids a patient needs. Crosses to `med` — veterinary medicine is medicine for
 *  animals. A measure. */

const PROOF = 'vet arithmetic (dose by weight, age in animal years, body-condition score, herd sickness, gestation due date, feed ration, vaccination coverage, fluids); medicine for animals; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'vet', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `vet.${name}`, params })

export class VetFormulas {
  /** DOSE: milligrams at a per-kilogram rate on body weight. value weight · perKg. */
  static dose(weight: number, perKg: number): CrossFormula { return c('vet-dose', 'dose(weight, perKg) = weight · perKg', weight * perKg, nat(weight, perKg), 'dose', [weight, perKg]) }
  /** AGE in animal years at a per-year factor (e.g. dog years). value years · factor. */
  static age(years: number, factor: number): CrossFormula { return c('vet-age', 'age(years, factor) = years · factor', years * factor, nat(years, factor), 'age', [years, factor]) }
  /** BODY-CONDITION SCORE on the 1..9 scale. value score. */
  static bodyscore(score: number): CrossFormula { return c('vet-bodyscore', 'bodyscore(score) = score', score, nat(score) && score >= 1 && score <= 9, 'bodyscore', [score]) }
  /** HERD SICKNESS as a percentage. value ⌊sick · 100 / total⌋. */
  static herd(sick: number, total: number): CrossFormula { return c('vet-herd', 'herd(sick, total) = ⌊sick · 100 / total⌋', total > 0 ? Math.floor((sick * 100) / total) : 0, nat(sick, total) && total > 0 && sick <= total, 'herd', [sick, total]) }
  /** GESTATION: the due date, a breeding date plus the gestation period. value bred + period. */
  static gestation(bred: number, period: number): CrossFormula { return c('vet-gestation', 'gestation(bred, period) = bred + period', bred + period, nat(bred, period), 'gestation', [bred, period]) }
  /** FEED: a daily ration, a percentage of body weight. value ⌊weight · pct / 100⌋. */
  static feed(weight: number, pct: number): CrossFormula { return c('vet-feed', 'feed(weight, pct) = ⌊weight · pct / 100⌋', Math.floor((weight * pct) / 100), nat(weight, pct), 'feed', [weight, pct]) }
  /** VACCINATION coverage as a percentage. value ⌊done · 100 / animals⌋. */
  static vaccination(done: number, animals: number): CrossFormula { return c('vet-vaccination', 'vaccination(done, animals) = ⌊done · 100 / animals⌋', animals > 0 ? Math.floor((done * 100) / animals) : 0, nat(done, animals) && animals > 0 && done <= animals, 'vaccination', [done, animals]) }
  /** FLUIDS: millilitres at a per-kilogram rate on body weight. value weight · mlPerKg. */
  static fluids(weight: number, mlPerKg: number): CrossFormula { return c('vet-fluids', 'fluids(weight, mlPerKg) = weight · mlPerKg', weight * mlPerKg, nat(weight, mlPerKg), 'fluids', [weight, mlPerKg]) }
}

for (const name of ['age', 'bodyscore', 'dose', 'feed', 'fluids', 'gestation', 'herd', 'vaccination'] as const)
  hexRegisterOf('vet', name, (VetFormulas[name] as (...x: unknown[]) => unknown).bind(VetFormulas))
