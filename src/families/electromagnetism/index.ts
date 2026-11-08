import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ELECTROMAGNETISM — FIELDS AND CHARGES, AS ARITHMETIC (chosen by the public-API registry, not by hand). Charge,
 *  field, flux, induction, waves, impedance, power flux and capacitance are numbers: a force proxy from charges, the field
 *  at a distance, flux through an area, Faraday induction, a wave's speed proxy, Ohm impedance, Poynting flux and stored
 *  charge per volt. Crosses to `magnetism` — electromagnetism is the field magnetism lives in. A measure. */

const PROOF = 'electromagnetism arithmetic (coulomb force, field, flux, Faraday induction, wave speed, impedance, Poynting flux, capacitance); fields and charges as numbers; a measure crossed to magnetism'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'electromagnetism', dst: 'magnetism', formula, value, proof: PROOF, ...extra }, holds, { name: `electromagnetism.${name}`, params })

export class ElectromagnetismFormulas {
  /** COULOMB: a force proxy from two charges. value q1 · q2. */
  static coulomb(q1: number, q2: number): CrossFormula { return c('electromagnetism-coulomb', 'coulomb(q1, q2) = q1 · q2', q1 * q2, nat(q1, q2), 'coulomb', [q1, q2]) }
  /** FIELD: a charge's field at a distance. value ⌊charge / distance²⌋. */
  static field(charge: number, distance: number): CrossFormula { return c('electromagnetism-field', 'field(charge, distance) = ⌊charge / distance²⌋', distance > 0 ? Math.floor(charge / (distance * distance)) : 0, nat(charge, distance) && distance > 0, 'field', [charge, distance]) }
  /** FLUX: field through an area. value field · area. */
  static flux(field: number, area: number): CrossFormula { return c('electromagnetism-flux', 'flux(field, area) = field · area', field * area, nat(field, area), 'flux', [field, area]) }
  /** INDUCTION: Faraday — flux change over time. value ⌊flux / time⌋. */
  static induction(flux: number, time: number): CrossFormula { return c('electromagnetism-induction', 'induction(flux, time) = ⌊flux / time⌋', time > 0 ? Math.floor(flux / time) : 0, nat(flux, time) && time > 0, 'induction', [flux, time]) }
  /** WAVE: a speed proxy — frequency times wavelength. value frequency · wavelength. */
  static wave(frequency: number, wavelength: number): CrossFormula { return c('electromagnetism-wave', 'wave(frequency, wavelength) = frequency · wavelength', frequency * wavelength, nat(frequency, wavelength), 'wave', [frequency, wavelength]) }
  /** IMPEDANCE: Ohm — voltage over current. value ⌊voltage / current⌋. */
  static impedance(voltage: number, current: number): CrossFormula { return c('electromagnetism-impedance', 'impedance(voltage, current) = ⌊voltage / current⌋', current > 0 ? Math.floor(voltage / current) : 0, nat(voltage, current) && current > 0, 'impedance', [voltage, current]) }
  /** POYNTING: an energy-flux proxy from the fields. value electric · magnetic. */
  static poynting(electric: number, magnetic: number): CrossFormula { return c('electromagnetism-poynting', 'poynting(electric, magnetic) = electric · magnetic', electric * magnetic, nat(electric, magnetic), 'poynting', [electric, magnetic]) }
  /** CAPACITANCE: charge stored per volt. value ⌊charge / voltage⌋. */
  static capacitance(charge: number, voltage: number): CrossFormula { return c('electromagnetism-capacitance', 'capacitance(charge, voltage) = ⌊charge / voltage⌋', voltage > 0 ? Math.floor(charge / voltage) : 0, nat(charge, voltage) && voltage > 0, 'capacitance', [charge, voltage]) }
}

for (const name of ['capacitance', 'coulomb', 'field', 'flux', 'impedance', 'induction', 'poynting', 'wave'] as const)
  hexRegisterOf('electromagnetism', name, (ElectromagnetismFormulas[name] as (...x: unknown[]) => unknown).bind(ElectromagnetismFormulas))
