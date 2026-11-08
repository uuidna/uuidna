import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ELECTROSTATICS — CHARGES AT REST, AS ARITHMETIC. Coulomb's force between two charges, the field and potential a charge
 *  raises around it, the capacitance that stores it, the energy held, the flux through a surface, a dipole's moment, and the
 *  charge a capacitor carries. Crosses to `electrical` — statics is the ground current flow stands on. A measure. */

const PROOF = 'electrostatics arithmetic (coulomb force, field, potential, capacitance, energy, flux, dipole, charge); charges at rest reduced to integers; a measure crossed to electrical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'electrostatics', dst: 'electrical', formula, value, proof: PROOF, ...extra }, holds, { name: `electrostatics.${name}`, params })

export class ElectrostaticsFormulas {
  /** COULOMB FORCE between two charges a distance apart (constant folded to 1). value ⌊q1 · q2 / r²⌋. */
  static coulomb(q1: number, q2: number, r: number): CrossFormula { return c('electrostatics-coulomb', 'coulomb(q1, q2, r) = ⌊q1 · q2 / r²⌋', r > 0 ? Math.floor((q1 * q2) / (r * r)) : 0, nat(q1, q2, r) && r > 0, 'coulomb', [q1, q2, r]) }
  /** ELECTRIC FIELD a charge raises at a distance. value ⌊q / r²⌋. */
  static field(q: number, r: number): CrossFormula { return c('electrostatics-field', 'field(q, r) = ⌊q / r²⌋', r > 0 ? Math.floor(q / (r * r)) : 0, nat(q, r) && r > 0, 'field', [q, r]) }
  /** ELECTRIC POTENTIAL a charge raises at a distance. value ⌊q / r⌋. */
  static potential(q: number, r: number): CrossFormula { return c('electrostatics-potential', 'potential(q, r) = ⌊q / r⌋', r > 0 ? Math.floor(q / r) : 0, nat(q, r) && r > 0, 'potential', [q, r]) }
  /** CAPACITANCE: the charge stored per volt. value ⌊charge / voltage⌋. */
  static capacitance(charge: number, voltage: number): CrossFormula { return c('electrostatics-capacitance', 'capacitance(charge, voltage) = ⌊charge / voltage⌋', voltage > 0 ? Math.floor(charge / voltage) : 0, nat(charge, voltage) && voltage > 0, 'capacitance', [charge, voltage]) }
  /** ENERGY held moving a charge through a potential. value ⌊charge · voltage / 2⌋. */
  static energy(charge: number, voltage: number): CrossFormula { return c('electrostatics-energy', 'energy(charge, voltage) = ⌊charge · voltage / 2⌋', Math.floor((charge * voltage) / 2), nat(charge, voltage), 'energy', [charge, voltage]) }
  /** FLUX through a closed surface by Gauss's law (permittivity folded in). value ⌊charge / eps⌋. */
  static flux(charge: number, eps: number): CrossFormula { return c('electrostatics-flux', 'flux(charge, eps) = ⌊charge / eps⌋', eps > 0 ? Math.floor(charge / eps) : 0, nat(charge, eps) && eps > 0, 'flux', [charge, eps]) }
  /** DIPOLE MOMENT: charge times its separation. value charge · distance. */
  static dipole(charge: number, distance: number): CrossFormula { return c('electrostatics-dipole', 'dipole(charge, distance) = charge · distance', charge * distance, nat(charge, distance), 'dipole', [charge, distance]) }
  /** CHARGE a capacitor carries at a voltage. value capacitance · voltage. */
  static charge(capacitance: number, voltage: number): CrossFormula { return c('electrostatics-charge', 'charge(capacitance, voltage) = capacitance · voltage', capacitance * voltage, nat(capacitance, voltage), 'charge', [capacitance, voltage]) }
}

for (const name of ['capacitance', 'charge', 'coulomb', 'dipole', 'energy', 'field', 'flux', 'potential'] as const)
  hexRegisterOf('electrostatics', name, (ElectrostaticsFormulas[name] as (...x: unknown[]) => unknown).bind(ElectrostaticsFormulas))
