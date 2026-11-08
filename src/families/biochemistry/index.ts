import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIOCHEMISTRY — THE CHEMISTRY OF LIFE, AS ARITHMETIC (chosen by the public-API registry, not by hand). Reactions are
 *  numbers: enzyme rate by Michaelis–Menten, turnover per enzyme, reaction efficiency, concentration, pH, the bonds in a
 *  chain, molarity from mass, and the equilibrium ratio. Crosses to `chemistry` — biochemistry is chemistry inside the
 *  cell. A measure. */

const PROOF = 'biochemistry arithmetic (enzyme kinetics, turnover, efficiency, concentration, pH, chain bonds, molarity, equilibrium); a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'biochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `biochemistry.${name}`, params })

export class BiochemistryFormulas {
  /** CHAIN BONDS: the bonds joining a chain of atoms. value atoms − 1. */
  static bonds(atoms: number): CrossFormula { return c('biochemistry-bonds', 'bonds(atoms) = atoms − 1', atoms > 0 ? atoms - 1 : 0, nat(atoms), 'bonds', [atoms]) }
  /** CONCENTRATION: moles over a volume. value ⌊moles / volume⌋. */
  static concentration(moles: number, volume: number): CrossFormula { return c('biochemistry-concentration', 'concentration(moles, volume) = ⌊moles / volume⌋', volume > 0 ? Math.floor(moles / volume) : 0, nat(moles, volume) && volume > 0, 'concentration', [moles, volume]) }
  /** EFFICIENCY: actual yield as a percentage of the theoretical. value ⌊actual · 100 / theoretical⌋. */
  static efficiency(actual: number, theoretical: number): CrossFormula { return c('biochemistry-efficiency', 'efficiency(actual, theoretical) = ⌊actual · 100 / theoretical⌋', theoretical > 0 ? Math.floor((actual * 100) / theoretical) : 0, nat(actual, theoretical) && theoretical > 0 && actual <= theoretical, 'efficiency', [actual, theoretical]) }
  /** EQUILIBRIUM: the products-to-reactants ratio as a percentage. value ⌊products · 100 / reactants⌋. */
  static equilibrium(products: number, reactants: number): CrossFormula { return c('biochemistry-equilibrium', 'equilibrium(products, reactants) = ⌊products · 100 / reactants⌋', reactants > 0 ? Math.floor((products * 100) / reactants) : 0, nat(products, reactants) && reactants > 0, 'equilibrium', [products, reactants]) }
  /** MICHAELIS–MENTEN: enzyme rate at a substrate level. value ⌊vmax · substrate / (substrate + km)⌋. */
  static michaelis(vmax: number, substrate: number, km: number): CrossFormula { return c('biochemistry-michaelis', 'michaelis(vmax, substrate, km) = ⌊vmax · substrate / (substrate + km)⌋', (substrate + km) > 0 ? Math.floor((vmax * substrate) / (substrate + km)) : 0, nat(vmax, substrate, km) && (substrate + km) > 0, 'michaelis', [vmax, substrate, km]) }
  /** MOLARITY: mass over molecular weight. value ⌊mass / weight⌋. */
  static molarity(mass: number, weight: number): CrossFormula { return c('biochemistry-molarity', 'molarity(mass, weight) = ⌊mass / weight⌋', weight > 0 ? Math.floor(mass / weight) : 0, nat(mass, weight) && weight > 0, 'molarity', [mass, weight]) }
  /** pH: hydrogen reading over the scale. value ⌊hydrogen / scale⌋. */
  static ph(hydrogen: number, scale: number): CrossFormula { return c('biochemistry-ph', 'ph(hydrogen, scale) = ⌊hydrogen / scale⌋', scale > 0 ? Math.floor(hydrogen / scale) : 0, nat(hydrogen, scale) && scale > 0, 'ph', [hydrogen, scale]) }
  /** TURNOVER: product made per enzyme (kcat proxy). value ⌊product / enzyme⌋. */
  static turnover(product: number, enzyme: number): CrossFormula { return c('biochemistry-turnover', 'turnover(product, enzyme) = ⌊product / enzyme⌋', enzyme > 0 ? Math.floor(product / enzyme) : 0, nat(product, enzyme) && enzyme > 0, 'turnover', [product, enzyme]) }
}

for (const name of ['bonds', 'concentration', 'efficiency', 'equilibrium', 'michaelis', 'molarity', 'ph', 'turnover'] as const)
  hexRegisterOf('biochemistry', name, (BiochemistryFormulas[name] as (...x: unknown[]) => unknown).bind(BiochemistryFormulas))
