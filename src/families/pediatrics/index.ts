import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PEDIATRICS — CARE OF THE CHILD, AS ARITHMETIC (chosen by the clinical registry, not by hand). A child is numbers:
 *  the weight-based drug dose, body-surface area, where a measurement sits against the median, the APGAR score at birth,
 *  body-mass index, the day's fluid requirement, heart rate from a counted pulse, and the daily caloric need. Crosses to
 *  `physiology` — pediatrics is physiology scaled to the growing body. A measure. */

const PROOF = 'pediatrics arithmetic (weight-based dose, body-surface area, growth percentile, APGAR, BMI, fluid requirement, heart rate, caloric need); a clinical domain; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pediatrics', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `pediatrics.${name}`, params })

export class PediatricsFormulas {
  /** WEIGHT-BASED DOSE: milligrams at a per-kilogram rate. value weight · perKg. */
  static dose(weight: number, perKg: number): CrossFormula { return c('pediatrics-dose', 'dose(weight, perKg) = weight · perKg', weight * perKg, nat(weight, perKg), 'dose', [weight, perKg]) }
  /** BODY-SURFACE AREA (Mosteller, scaled): weight and height over 3600. value ⌊weight · height / 3600⌋. */
  static bsa(weight: number, height: number): CrossFormula { return c('pediatrics-bsa', 'bsa(weight, height) = ⌊weight · height / 3600⌋', Math.floor((weight * height) / 3600), nat(weight, height), 'bsa', [weight, height]) }
  /** GROWTH PERCENTILE: a measurement against the median. value ⌊value · 100 / median⌋. */
  static growthpercentile(value: number, median: number): CrossFormula { return c('pediatrics-growthpercentile', 'growthpercentile(value, median) = ⌊value · 100 / median⌋', median > 0 ? Math.floor((value * 100) / median) : 0, nat(value, median) && median > 0, 'growthpercentile', [value, median]) }
  /** APGAR: three birth signs, each scored 0–2. value a + p + g. */
  static apgar(a: number, p: number, g: number): CrossFormula { return c('pediatrics-apgar', 'apgar(a, p, g) = a + p + g', a + p + g, nat(a, p, g), 'apgar', [a, p, g]) }
  /** BODY-MASS INDEX: weight over height (cm) squared. value ⌊weight · 10000 / height²⌋. */
  static bmi(weight: number, height: number): CrossFormula { return c('pediatrics-bmi', 'bmi(weight, height) = ⌊weight · 10000 / height²⌋', height > 0 ? Math.floor((weight * 10000) / (height * height)) : 0, nat(weight, height) && height > 0, 'bmi', [weight, height]) }
  /** FLUID REQUIREMENT: milliliters per day at a per-kilogram rate. value weight · perKg. */
  static fluidrequirement(weight: number, perKg: number): CrossFormula { return c('pediatrics-fluidrequirement', 'fluidrequirement(weight, perKg) = weight · perKg', weight * perKg, nat(weight, perKg), 'fluidrequirement', [weight, perKg]) }
  /** HEART RATE: beats counted over seconds, to the minute. value ⌊beats · 60 / seconds⌋. */
  static heartrate(beats: number, seconds: number): CrossFormula { return c('pediatrics-heartrate', 'heartrate(beats, seconds) = ⌊beats · 60 / seconds⌋', seconds > 0 ? Math.floor((beats * 60) / seconds) : 0, nat(beats, seconds) && seconds > 0, 'heartrate', [beats, seconds]) }
  /** CALORIC NEED: kilocalories per day at a per-kilogram rate. value weight · perKg. */
  static caloricneed(weight: number, perKg: number): CrossFormula { return c('pediatrics-caloricneed', 'caloricneed(weight, perKg) = weight · perKg', weight * perKg, nat(weight, perKg), 'caloricneed', [weight, perKg]) }
}

for (const name of ['apgar', 'bmi', 'bsa', 'caloricneed', 'dose', 'fluidrequirement', 'growthpercentile', 'heartrate'] as const)
  hexRegisterOf('pediatrics', name, (PediatricsFormulas[name] as (...x: unknown[]) => unknown).bind(PediatricsFormulas))
