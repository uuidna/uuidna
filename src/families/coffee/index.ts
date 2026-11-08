import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COFFEE — BREWING AS ARITHMETIC. A cup is numbers: the water-to-coffee ratio, the extraction yield, dissolved solids,
 *  the yield a dose pulls, the grind setting, the brew temperature, the bloom water, and whether the strength is met.
 *  Crosses to `cuisine` — coffee is one dish the kitchen measures. A measure. */

const PROOF = 'coffee arithmetic (brew ratio, extraction yield, TDS, dose yield, grind setting, water temp, bloom water, strength); brewing reduced to integers; a measure crossed to cuisine'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'coffee', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `coffee.${name}`, params })

export class CoffeeFormulas {
  /** BREW RATIO: grams of water per gram of coffee. value ⌊water / coffee⌋. */
  static brewratio(water: number, coffee: number): CrossFormula { return c('coffee-brewratio', 'brewratio(water, coffee) = ⌊water / coffee⌋', coffee > 0 ? Math.floor(water / coffee) : 0, nat(water, coffee) && coffee > 0, 'brewratio', [water, coffee]) }
  /** EXTRACTION YIELD: dissolved grams as a percentage of the dose. value ⌊dissolved · 100 / dose⌋. */
  static extraction(dissolved: number, dose: number): CrossFormula { return c('coffee-extraction', 'extraction(dissolved, dose) = ⌊dissolved · 100 / dose⌋', dose > 0 ? Math.floor((dissolved * 100) / dose) : 0, nat(dissolved, dose) && dose > 0 && dissolved <= dose, 'extraction', [dissolved, dose]) }
  /** TOTAL DISSOLVED SOLIDS: dissolved grams per litre of beverage, in permille. value ⌊dissolved · 1000 / beverage⌋. */
  static tds(dissolved: number, beverage: number): CrossFormula { return c('coffee-tds', 'tds(dissolved, beverage) = ⌊dissolved · 1000 / beverage⌋', beverage > 0 ? Math.floor((dissolved * 1000) / beverage) : 0, nat(dissolved, beverage) && beverage > 0, 'tds', [dissolved, beverage]) }
  /** DOSE YIELD: the beverage a dose pulls at a target ratio. value dose · ratio. */
  static doseyield(dose: number, ratio: number): CrossFormula { return c('coffee-doseyield', 'doseyield(dose, ratio) = dose · ratio', dose * ratio, nat(dose, ratio), 'doseyield', [dose, ratio]) }
  /** GRIND SETTING: burr microns in step units. value ⌊microns / step⌋. */
  static grindsetting(microns: number, step: number): CrossFormula { return c('coffee-grindsetting', 'grindsetting(microns, step) = ⌊microns / step⌋', step > 0 ? Math.floor(microns / step) : 0, nat(microns, step) && step > 0, 'grindsetting', [microns, step]) }
  /** WATER TEMP: boiling point less the cooling drop, in Celsius. value max(0, boil − drop). */
  static watertemp(boil: number, drop: number): CrossFormula { return c('coffee-watertemp', 'watertemp(boil, drop) = max(0, boil − drop)', Math.max(0, boil - drop), nat(boil, drop), 'watertemp', [boil, drop]) }
  /** BLOOM WATER: the dose wetted at a bloom factor. value dose · factor. */
  static bloomwater(dose: number, factor: number): CrossFormula { return c('coffee-bloomwater', 'bloomwater(dose, factor) = dose · factor', dose * factor, nat(dose, factor), 'bloomwater', [dose, factor]) }
  /** STRENGTH: 1 when measured TDS meets the target. value [tds ≥ target]. */
  static strength(tds: number, target: number): CrossFormula { return c('coffee-strength', 'strength(tds, target) = [tds ≥ target]', tds >= target ? 1 : 0, nat(tds, target), 'strength', [tds, target]) }
}

for (const name of ['bloomwater', 'brewratio', 'doseyield', 'extraction', 'grindsetting', 'strength', 'tds', 'watertemp'] as const)
  hexRegisterOf('coffee', name, (CoffeeFormulas[name] as (...x: unknown[]) => unknown).bind(CoffeeFormulas))
