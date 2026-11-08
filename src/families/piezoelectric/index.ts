import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PIEZOELECTRIC — THE DIRECT AND CONVERSE EFFECTS, AS ARITHMETIC. A stressed crystal makes charge, a charged crystal
 *  moves: the charge a force frees, the voltage across the stored charge, the charge constant, the resonant frequency of a
 *  plate, the electromechanical coupling, the plate capacitance, the displacement a drive produces, and the energy a cycle
 *  harvests. Crosses to `electrical` — piezoelectricity is where mechanics becomes current. A measure. */

const PROOF = 'piezoelectric arithmetic (charge, voltage, charge constant, resonant frequency, coupling factor, capacitance, displacement, harvested energy); the direct and converse effects as numbers; a measure crossed to electrical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'piezoelectric', dst: 'electrical', formula, value, proof: PROOF, ...extra }, holds, { name: `piezoelectric.${name}`, params })

export class PiezoelectricFormulas {
  /** CHARGE: the charge a force frees at the charge constant. value d · force. */
  static charge(force: number, d: number): CrossFormula { return c('piezoelectric-charge', 'charge(force, d) = d · force', force * d, nat(force, d), 'charge', [force, d]) }
  /** VOLTAGE across the stored charge on a capacitance. value ⌊charge / capacitance⌋. */
  static voltage(charge: number, capacitance: number): CrossFormula { return c('piezoelectric-voltage', 'voltage(charge, capacitance) = ⌊charge / capacitance⌋', capacitance > 0 ? Math.floor(charge / capacitance) : 0, nat(charge, capacitance) && capacitance > 0, 'voltage', [charge, capacitance]) }
  /** THE CHARGE CONSTANT: charge freed per unit of applied stress. value ⌊charge / stress⌋. */
  static chargeconstant(charge: number, stress: number): CrossFormula { return c('piezoelectric-chargeconstant', 'chargeconstant(charge, stress) = ⌊charge / stress⌋', stress > 0 ? Math.floor(charge / stress) : 0, nat(charge, stress) && stress > 0, 'chargeconstant', [charge, stress]) }
  /** RESONANT FREQUENCY of a plate: half the sound speed over its thickness. value ⌊velocity / (2 · thickness)⌋. */
  static resonantfrequency(velocity: number, thickness: number): CrossFormula { return c('piezoelectric-resonantfrequency', 'resonantfrequency(velocity, thickness) = ⌊velocity / (2 · thickness)⌋', thickness > 0 ? Math.floor(velocity / (2 * thickness)) : 0, nat(velocity, thickness) && thickness > 0, 'resonantfrequency', [velocity, thickness]) }
  /** COUPLING FACTOR: the share of input energy converted, as a percentage. value ⌊converted · 100 / input⌋. */
  static couplingfactor(converted: number, input: number): CrossFormula { return c('piezoelectric-couplingfactor', 'couplingfactor(converted, input) = ⌊converted · 100 / input⌋', input > 0 ? Math.floor((converted * 100) / input) : 0, nat(converted, input) && input > 0 && converted <= input, 'couplingfactor', [converted, input]) }
  /** CAPACITANCE of the plate: permittivity times area over thickness. value ⌊permittivity · area / thickness⌋. */
  static capacitance(permittivity: number, area: number, thickness: number): CrossFormula { return c('piezoelectric-capacitance', 'capacitance(permittivity, area, thickness) = ⌊permittivity · area / thickness⌋', thickness > 0 ? Math.floor((permittivity * area) / thickness) : 0, nat(permittivity, area, thickness) && thickness > 0, 'capacitance', [permittivity, area, thickness]) }
  /** DISPLACEMENT the converse effect produces: the charge constant times the drive voltage. value d · voltage. */
  static displacement(voltage: number, d: number): CrossFormula { return c('piezoelectric-displacement', 'displacement(voltage, d) = d · voltage', voltage * d, nat(voltage, d), 'displacement', [voltage, d]) }
  /** ENERGY HARVESTED per cycle: half the charge times the voltage. value ⌊charge · voltage / 2⌋. */
  static energyharvest(charge: number, voltage: number): CrossFormula { return c('piezoelectric-energyharvest', 'energyharvest(charge, voltage) = ⌊charge · voltage / 2⌋', Math.floor((charge * voltage) / 2), nat(charge, voltage), 'energyharvest', [charge, voltage]) }
}

for (const name of ['capacitance', 'charge', 'chargeconstant', 'couplingfactor', 'displacement', 'energyharvest', 'resonantfrequency', 'voltage'] as const)
  hexRegisterOf('piezoelectric', name, (PiezoelectricFormulas[name] as (...x: unknown[]) => unknown).bind(PiezoelectricFormulas))
