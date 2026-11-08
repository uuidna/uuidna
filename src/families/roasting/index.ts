import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ROASTING — COFFEE ROASTING AS ARITHMETIC (a craft the registry can measure, not run by hand). A roast is numbers:
 *  weight lost from green to roasted, the development-time ratio after first crack, the rate of rise, charge temperature,
 *  moisture driven off, bean density, the Agtron colour score, and how a batch fills the drum. Crosses to `cuisine` —
 *  roasting is what the kitchen tastes. A measure. */

const PROOF = 'roasting arithmetic (weight loss, development-time ratio, rate of rise, charge, moisture, density, Agtron colour, batch fill); a craft the registry measures; a measure crossed to cuisine'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'roasting', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `roasting.${name}`, params })

export class RoastingFormulas {
  /** WEIGHT LOSS: percentage shed from green to roasted. value ⌊(green − roasted) · 100 / green⌋. */
  static weightloss(green: number, roasted: number): CrossFormula { return c('roasting-weightloss', 'weightloss(green, roasted) = ⌊(green − roasted) · 100 / green⌋', green > 0 ? Math.floor(((green - roasted) * 100) / green) : 0, nat(green, roasted) && green > 0 && roasted <= green, 'weightloss', [green, roasted]) }
  /** DEVELOPMENT-TIME RATIO: the share of the roast spent after first crack. value ⌊(total − firstcrack) · 100 / total⌋. */
  static developmenttime(total: number, firstcrack: number): CrossFormula { return c('roasting-developmenttime', 'developmenttime(total, firstcrack) = ⌊(total − firstcrack) · 100 / total⌋', total > 0 ? Math.floor(((total - firstcrack) * 100) / total) : 0, nat(total, firstcrack) && total > 0 && firstcrack <= total, 'developmenttime', [total, firstcrack]) }
  /** RATE OF RISE proxy: degrees climbed per minute. value ⌊temperature / minutes⌋. */
  static rampspeed(temperature: number, minutes: number): CrossFormula { return c('roasting-rampspeed', 'rampspeed(temperature, minutes) = ⌊temperature / minutes⌋', minutes > 0 ? Math.floor(temperature / minutes) : 0, nat(temperature, minutes) && minutes > 0, 'rampspeed', [temperature, minutes]) }
  /** CHARGE: the drum temperature at drop. value temperature (holds nat). */
  static charge(temperature: number): CrossFormula { return c('roasting-charge', 'charge(temperature) = temperature', temperature, nat(temperature), 'charge', [temperature]) }
  /** MOISTURE: percentage driven off. value ⌊(before − after) · 100 / before⌋. */
  static moisture(before: number, after: number): CrossFormula { return c('roasting-moisture', 'moisture(before, after) = ⌊(before − after) · 100 / before⌋', before > 0 ? Math.floor(((before - after) * 100) / before) : 0, nat(before, after) && before > 0 && after <= before, 'moisture', [before, after]) }
  /** DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('roasting-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** AGTRON: the roast colour score. value score (holds nat). */
  static agtron(score: number): CrossFormula { return c('roasting-agtron', 'agtron(score) = score', score, nat(score), 'agtron', [score]) }
  /** BATCH SIZE: how the charge fills the drum, as a percentage. value ⌊grams · 100 / capacity⌋. */
  static batchsize(grams: number, capacity: number): CrossFormula { return c('roasting-batchsize', 'batchsize(grams, capacity) = ⌊grams · 100 / capacity⌋', capacity > 0 ? Math.floor((grams * 100) / capacity) : 0, nat(grams, capacity) && capacity > 0 && grams <= capacity, 'batchsize', [grams, capacity]) }
}

for (const name of ['agtron', 'batchsize', 'charge', 'density', 'developmenttime', 'moisture', 'rampspeed', 'weightloss'] as const)
  hexRegisterOf('roasting', name, (RoastingFormulas[name] as (...x: unknown[]) => unknown).bind(RoastingFormulas))
