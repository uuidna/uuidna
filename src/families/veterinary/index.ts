import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VETERINARY — ANIMAL MEDICINE AS ARITHMETIC (weight-based dosing and the vitals that frame it). A patient is numbers:
 *  the drug dose for its weight, the calories it needs, its body condition against the ideal, the fluid bags a day takes,
 *  heart rate, the hours between doses, weight gained, and whether gestation has reached term. Crosses to `physiology` —
 *  veterinary is physiology under treatment. A measure. */

const PROOF = 'veterinary arithmetic (weight-based dose, caloric requirement, body condition, fluid bags, heart rate, dosing interval, weight gain, gestation term); animal medicine as integers; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'veterinary', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `veterinary.${name}`, params })

export class VeterinaryFormulas {
  /** WEIGHT-BASED DOSE: the drug a patient gets at a per-kilogram rate. value weight · perkg. */
  static dose(weight: number, perkg: number): CrossFormula { return c('veterinary-dose', 'dose(weight, perkg) = weight · perkg', weight * perkg, nat(weight, perkg), 'dose', [weight, perkg]) }
  /** CALORIC REQUIREMENT: daily energy at a per-kilogram factor. value weight · factor. */
  static caloricrequirement(weight: number, factor: number): CrossFormula { return c('veterinary-caloricrequirement', 'caloricrequirement(weight, factor) = weight · factor', weight * factor, nat(weight, factor), 'caloricrequirement', [weight, factor]) }
  /** BODY CONDITION: measured weight against the ideal, as a percentage. value ⌊actual · 100 / ideal⌋. */
  static bcs(actual: number, ideal: number): CrossFormula { return c('veterinary-bcs', 'bcs(actual, ideal) = ⌊actual · 100 / ideal⌋', ideal > 0 ? Math.floor((actual * 100) / ideal) : 0, nat(actual, ideal) && ideal > 0, 'bcs', [actual, ideal]) }
  /** FLUID THERAPY: the bags a day's volume needs at a per-bag size. value ⌈daily / bagsize⌉. */
  static fluidtherapy(daily: number, bagsize: number): CrossFormula { return c('veterinary-fluidtherapy', 'fluidtherapy(daily, bagsize) = ⌈daily / bagsize⌉', bagsize > 0 ? Math.ceil(daily / bagsize) : 0, nat(daily, bagsize) && bagsize > 0, 'fluidtherapy', [daily, bagsize]) }
  /** HEART RATE: beats over the minutes counted. value ⌊beats / minutes⌋. */
  static heartrate(beats: number, minutes: number): CrossFormula { return c('veterinary-heartrate', 'heartrate(beats, minutes) = ⌊beats / minutes⌋', minutes > 0 ? Math.floor(beats / minutes) : 0, nat(beats, minutes) && minutes > 0, 'heartrate', [beats, minutes]) }
  /** DOSING INTERVAL: the hours between doses over a day. value ⌊hours / doses⌋. */
  static medicationinterval(hours: number, doses: number): CrossFormula { return c('veterinary-medicationinterval', 'medicationinterval(hours, doses) = ⌊hours / doses⌋', doses > 0 ? Math.floor(hours / doses) : 0, nat(hours, doses) && doses > 0, 'medicationinterval', [hours, doses]) }
  /** WEIGHT GAIN: the weight put on between two weighings. value max(0, end − start). */
  static bodyweightgain(start: number, end: number): CrossFormula { return c('veterinary-bodyweightgain', 'bodyweightgain(start, end) = max(0, end − start)', Math.max(0, end - start), nat(start, end), 'bodyweightgain', [start, end]) }
  /** GESTATION: 1 when the day carried reaches full term. value [day ≥ term]. */
  static gestation(day: number, term: number): CrossFormula { return c('veterinary-gestation', 'gestation(day, term) = [day ≥ term]', day >= term ? 1 : 0, nat(day, term), 'gestation', [day, term]) }
}

for (const name of ['bcs', 'bodyweightgain', 'caloricrequirement', 'dose', 'fluidtherapy', 'gestation', 'heartrate', 'medicationinterval'] as const)
  hexRegisterOf('veterinary', name, (VeterinaryFormulas[name] as (...x: unknown[]) => unknown).bind(VeterinaryFormulas))
