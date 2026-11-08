import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHEMISTRY — WET-LAB STOICHIOMETRY, AS ARITHMETIC (chosen by the registry, not by hand). Reactions are numbers: moles
 *  from mass, concentration in solution, acidity, reaction yield, mass from moles, dilution by conservation, mixing
 *  ratio, and the bonds a chain of atoms holds. Crosses to `cern` — chemistry is physics the detector counts. A measure. */

const PROOF = 'chemistry arithmetic (moles, concentration, pH, yield, mass, dilution, ratio, bonds); a wet-lab domain; a measure crossed to cern'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'chemistry', dst: 'cern', formula, value, proof: PROOF, ...extra }, holds, { name: `chemistry.${name}`, params })

export class ChemistryFormulas {
  /** MOLES: mass over molar mass. value ⌊mass / molar⌋. */
  static moles(mass: number, molar: number): CrossFormula { return c('chemistry-moles', 'moles(mass, molar) = ⌊mass / molar⌋', molar > 0 ? Math.floor(mass / molar) : 0, nat(mass, molar) && molar > 0, 'moles', [mass, molar]) }
  /** CONCENTRATION in mmol/L: moles in a volume. value ⌊moles · 1000 / litres⌋. */
  static concentration(moles: number, litres: number): CrossFormula { return c('chemistry-concentration', 'concentration(moles, litres) = ⌊moles · 1000 / litres⌋', litres > 0 ? Math.floor((moles * 1000) / litres) : 0, nat(moles, litres) && litres > 0, 'concentration', [moles, litres]) }
  /** pH: the acidity reading. value concentration, holds 0..14. */
  static ph(concentration: number): CrossFormula { return c('chemistry-ph', 'ph(concentration) = concentration', concentration, nat(concentration) && concentration <= 14, 'ph', [concentration]) }
  /** YIELD as a percentage. value ⌊actual · 100 / theoretical⌋. */
  static yield(actual: number, theoretical: number): CrossFormula { return c('chemistry-yield', 'yield(actual, theoretical) = ⌊actual · 100 / theoretical⌋', theoretical > 0 ? Math.floor((actual * 100) / theoretical) : 0, nat(actual, theoretical) && theoretical > 0 && actual <= theoretical, 'yield', [actual, theoretical]) }
  /** MASS: moles at a molar mass. value moles · molar. */
  static mass(moles: number, molar: number): CrossFormula { return c('chemistry-mass', 'mass(moles, molar) = moles · molar', moles * molar, nat(moles, molar), 'mass', [moles, molar]) }
  /** DILUTION: the conserved amount c1 · v1. value c1 · v1. */
  static dilution(c1: number, v1: number): CrossFormula { return c('chemistry-dilution', 'dilution(c1, v1) = c1 · v1', c1 * v1, nat(c1, v1), 'dilution', [c1, v1]) }
  /** RATIO as a percentage. value ⌊a · 100 / b⌋. */
  static ratio(a: number, b: number): CrossFormula { return c('chemistry-ratio', 'ratio(a, b) = ⌊a · 100 / b⌋', b > 0 ? Math.floor((a * 100) / b) : 0, nat(a, b) && b > 0, 'ratio', [a, b]) }
  /** BONDS: a chain of atoms holds one fewer bond. value max(0, atoms − 1). */
  static bonds(atoms: number): CrossFormula { return c('chemistry-bonds', 'bonds(atoms) = max(0, atoms − 1)', Math.max(0, atoms - 1), nat(atoms), 'bonds', [atoms]) }
}

for (const name of ['bonds', 'concentration', 'dilution', 'mass', 'moles', 'ph', 'ratio', 'yield'] as const)
  hexRegisterOf('chemistry', name, (ChemistryFormulas[name] as (...x: unknown[]) => unknown).bind(ChemistryFormulas))
