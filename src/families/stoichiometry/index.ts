import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STOICHIOMETRY — THE BOOKKEEPING OF A REACTION, AS ARITHMETIC. A reaction is numbers: moles from a mass, molar mass
 *  from atoms, the limiting reagent, percent yield, molarity, a dilution, percent by mass, and the empirical ratio.
 *  Crosses to `chemistry` — stoichiometry is the arithmetic chemistry runs on. A measure. */

const PROOF = 'stoichiometry arithmetic (moles, molar mass, limiting reagent, percent yield, molarity, dilution, percent mass, empirical ratio); a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'stoichiometry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `stoichiometry.${name}`, params })

export class StoichiometryFormulas {
  /** MOLES: a mass over its molar mass. value ⌊mass / molarmass⌋. */
  static moles(mass: number, molarmass: number): CrossFormula { return c('stoichiometry-moles', 'moles(mass, molarmass) = ⌊mass / molarmass⌋', molarmass > 0 ? Math.floor(mass / molarmass) : 0, nat(mass, molarmass) && molarmass > 0, 'moles', [mass, molarmass]) }
  /** MOLAR MASS: atom count at an atomic weight each. value count · weight. */
  static molarmass(count: number, weight: number): CrossFormula { return c('stoichiometry-molarmass', 'molarmass(count, weight) = count · weight', count * weight, nat(count, weight), 'molarmass', [count, weight]) }
  /** LIMITING REAGENT: the smaller of two available amounts. value min(a, b). */
  static limiting(a: number, b: number): CrossFormula { return c('stoichiometry-limiting', 'limiting(a, b) = min(a, b)', Math.min(a, b), nat(a, b), 'limiting', [a, b]) }
  /** PERCENT YIELD: actual over theoretical. value ⌊actual · 100 / theoretical⌋. */
  static yield(actual: number, theoretical: number): CrossFormula { return c('stoichiometry-yield', 'yield(actual, theoretical) = ⌊actual · 100 / theoretical⌋', theoretical > 0 ? Math.floor((actual * 100) / theoretical) : 0, nat(actual, theoretical) && theoretical > 0 && actual <= theoretical, 'yield', [actual, theoretical]) }
  /** MOLARITY: moles over litres of solution. value ⌊moles / liters⌋. */
  static molarity(moles: number, liters: number): CrossFormula { return c('stoichiometry-molarity', 'molarity(moles, liters) = ⌊moles / liters⌋', liters > 0 ? Math.floor(moles / liters) : 0, nat(moles, liters) && liters > 0, 'molarity', [moles, liters]) }
  /** DILUTION: C₁V₁ = C₂V₂ solved for the new concentration. value ⌊c1 · v1 / v2⌋. */
  static dilution(c1: number, v1: number, v2: number): CrossFormula { return c('stoichiometry-dilution', 'dilution(c1, v1, v2) = ⌊c1 · v1 / v2⌋', v2 > 0 ? Math.floor((c1 * v1) / v2) : 0, nat(c1, v1, v2) && v2 > 0, 'dilution', [c1, v1, v2]) }
  /** PERCENT BY MASS: a part of the whole. value ⌊part · 100 / whole⌋. */
  static percentmass(part: number, whole: number): CrossFormula { return c('stoichiometry-percentmass', 'percentmass(part, whole) = ⌊part · 100 / whole⌋', whole > 0 ? Math.floor((part * 100) / whole) : 0, nat(part, whole) && whole > 0 && part <= whole, 'percentmass', [part, whole]) }
  /** EMPIRICAL RATIO: hydrogen atoms per carbon atom. value ⌊hydrogen / carbon⌋. */
  static empirical(carbon: number, hydrogen: number): CrossFormula { return c('stoichiometry-empirical', 'empirical(carbon, hydrogen) = ⌊hydrogen / carbon⌋', carbon > 0 ? Math.floor(hydrogen / carbon) : 0, nat(carbon, hydrogen) && carbon > 0, 'empirical', [carbon, hydrogen]) }
}

for (const name of ['dilution', 'empirical', 'limiting', 'molarity', 'molarmass', 'moles', 'percentmass', 'yield'] as const)
  hexRegisterOf('stoichiometry', name, (StoichiometryFormulas[name] as (...x: unknown[]) => unknown).bind(StoichiometryFormulas))
