import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ELECTROCHEMISTRY — CHARGE AS ARITHMETIC. Reactions are numbers: charge per electron (Faraday), cell potential across
 *  electrodes, current over time, moles deposited in electrolysis, conductivity, the Nernst shift, battery capacity, and
 *  coulombic efficiency. Crosses to `chemistry` — electrochemistry is chemistry driven by charge. A measure. */

const PROOF = 'electrochemistry arithmetic (faraday charge, cell potential, current, electrolysis moles, conductivity, nernst shift, capacity, efficiency); a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'electrochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `electrochemistry.${name}`, params })

export class ElectrochemistryFormulas {
  /** FARADAY: charge per electron transferred. value ⌊charge / electrons⌋. */
  static faraday(charge: number, electrons: number): CrossFormula { return c('electrochemistry-faraday', 'faraday(charge, electrons) = ⌊charge / electrons⌋', electrons > 0 ? Math.floor(charge / electrons) : 0, nat(charge, electrons) && electrons > 0, 'faraday', [charge, electrons]) }
  /** CELL POTENTIAL: cathode minus anode (may be negative). value cathode − anode. */
  static cellpotential(cathode: number, anode: number): CrossFormula { return c('electrochemistry-cellpotential', 'cellpotential(cathode, anode) = cathode − anode', cathode - anode, nat(cathode, anode), 'cellpotential', [cathode, anode]) }
  /** CURRENT: charge over time. value ⌊charge / time⌋. */
  static current(charge: number, time: number): CrossFormula { return c('electrochemistry-current', 'current(charge, time) = ⌊charge / time⌋', time > 0 ? Math.floor(charge / time) : 0, nat(charge, time) && time > 0, 'current', [charge, time]) }
  /** ELECTROLYSIS: moles deposited, charge over a faraday constant. value ⌊charge / faraday_⌋. */
  static electrolysis(charge: number, faraday_: number): CrossFormula { return c('electrochemistry-electrolysis', 'electrolysis(charge, faraday_) = ⌊charge / faraday_⌋', faraday_ > 0 ? Math.floor(charge / faraday_) : 0, nat(charge, faraday_) && faraday_ > 0, 'electrolysis', [charge, faraday_]) }
  /** CONDUCTIVITY: current over voltage. value ⌊current / voltage⌋. */
  static conductivity(current: number, voltage: number): CrossFormula { return c('electrochemistry-conductivity', 'conductivity(current, voltage) = ⌊current / voltage⌋', voltage > 0 ? Math.floor(current / voltage) : 0, nat(current, voltage) && voltage > 0, 'conductivity', [current, voltage]) }
  /** NERNST: standard potential minus the shift (may be negative). value standard − shift. */
  static nernst(standard: number, shift: number): CrossFormula { return c('electrochemistry-nernst', 'nernst(standard, shift) = standard − shift', standard - shift, nat(standard, shift), 'nernst', [standard, shift]) }
  /** CAPACITY: charge over mass. value ⌊charge / mass⌋. */
  static capacity(charge: number, mass: number): CrossFormula { return c('electrochemistry-capacity', 'capacity(charge, mass) = ⌊charge / mass⌋', mass > 0 ? Math.floor(charge / mass) : 0, nat(charge, mass) && mass > 0, 'capacity', [charge, mass]) }
  /** EFFICIENCY: actual over theoretical charge, as a percentage. value ⌊actual · 100 / theoretical⌋. */
  static efficiency(actual: number, theoretical: number): CrossFormula { return c('electrochemistry-efficiency', 'efficiency(actual, theoretical) = ⌊actual · 100 / theoretical⌋', theoretical > 0 ? Math.floor((actual * 100) / theoretical) : 0, nat(actual, theoretical) && theoretical > 0 && actual <= theoretical, 'efficiency', [actual, theoretical]) }
}

for (const name of ['capacity', 'cellpotential', 'conductivity', 'current', 'efficiency', 'electrolysis', 'faraday', 'nernst'] as const)
  hexRegisterOf('electrochemistry', name, (ElectrochemistryFormulas[name] as (...x: unknown[]) => unknown).bind(ElectrochemistryFormulas))
