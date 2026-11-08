import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CRYSTALLOGRAPHY — THE STRUCTURE OF SOLIDS, AS ARITHMETIC. Diffraction and lattices are numbers: the Bragg order,
 *  the d-spacing from an angle, atoms per cell, packing fraction, coordination number, the unit-cell area, the count of
 *  symmetry operations, and the Miller intercept. Crosses to `materials` — the structure is what a material is made of.
 *  A measure. */

const PROOF = 'crystallography arithmetic (Bragg order, d-spacing, density, packing, coordination, unit cell, symmetry, Miller); the lattice of a solid; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'crystallography', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `crystallography.${name}`, params })

export class CrystallographyFormulas {
  /** BRAGG: the order times the wavelength (nλ proxy). value order · wavelength. */
  static bragg(order: number, wavelength: number): CrossFormula { return c('crystallography-bragg', 'bragg(order, wavelength) = order · wavelength', order * wavelength, nat(order, wavelength), 'bragg', [order, wavelength]) }
  /** SPACING: the d-spacing from a wavelength over an angle. value ⌊wavelength · 1000 / angle⌋. */
  static spacing(wavelength: number, angle: number): CrossFormula { return c('crystallography-spacing', 'spacing(wavelength, angle) = ⌊wavelength · 1000 / angle⌋', angle > 0 ? Math.floor((wavelength * 1000) / angle) : 0, nat(wavelength, angle) && angle > 0, 'spacing', [wavelength, angle]) }
  /** DENSITY: atoms over the cell. value ⌊atoms / cell⌋. */
  static density(atoms: number, cell: number): CrossFormula { return c('crystallography-density', 'density(atoms, cell) = ⌊atoms / cell⌋', cell > 0 ? Math.floor(atoms / cell) : 0, nat(atoms, cell) && cell > 0, 'density', [atoms, cell]) }
  /** PACKING: the occupied fraction of the volume, as a percentage. value ⌊occupied · 100 / volume⌋. */
  static packing(occupied: number, volume: number): CrossFormula { return c('crystallography-packing', 'packing(occupied, volume) = ⌊occupied · 100 / volume⌋', volume > 0 ? Math.floor((occupied * 100) / volume) : 0, nat(occupied, volume) && volume > 0 && occupied <= volume, 'packing', [occupied, volume]) }
  /** COORDINATION: the neighbour count. value neighbors. */
  static coordination(neighbors: number): CrossFormula { return c('crystallography-coordination', 'coordination(neighbors) = neighbors', neighbors, nat(neighbors), 'coordination', [neighbors]) }
  /** UNIT CELL: the base area from two edges. value a · b. */
  static unitcell(a: number, b: number): CrossFormula { return c('crystallography-unitcell', 'unitcell(a, b) = a · b', a * b, nat(a, b), 'unitcell', [a, b]) }
  /** SYMMETRY: the count of symmetry operations. value operations. */
  static symmetry(operations: number): CrossFormula { return c('crystallography-symmetry', 'symmetry(operations) = operations', operations, nat(operations), 'symmetry', [operations]) }
  /** MILLER: the intercept over the plane index. value ⌊intercept / plane⌋. */
  static miller(intercept: number, plane: number): CrossFormula { return c('crystallography-miller', 'miller(intercept, plane) = ⌊intercept / plane⌋', plane > 0 ? Math.floor(intercept / plane) : 0, nat(intercept, plane) && plane > 0, 'miller', [intercept, plane]) }
}

for (const name of ['bragg', 'coordination', 'density', 'miller', 'packing', 'spacing', 'symmetry', 'unitcell'] as const)
  hexRegisterOf('crystallography', name, (CrystallographyFormulas[name] as (...x: unknown[]) => unknown).bind(CrystallographyFormulas))
