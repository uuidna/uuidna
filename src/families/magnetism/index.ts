import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MAGNETISM — THE FIELD AS ARITHMETIC. The physics of fields and forces is numbers: a solenoid's field from its current and
 *  turns, the Lorentz force on a moving charge, magnetic flux through an area, the EMF induction gives over time, the torque on
 *  a moment, permeability, reluctance along a path, and a dipole's reach. Crosses to `energy` — magnetism is energy in motion.
 *  A measure. */

const PROOF = 'magnetism arithmetic (solenoid field, Lorentz force, flux, Faraday EMF, torque, permeability, reluctance, dipole); a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'magnetism', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `magnetism.${name}`, params })

export class MagnetismFormulas {
  /** SOLENOID FIELD: current through the turns (an ampere-turns proxy). value current · turns. */
  static field(current: number, turns: number): CrossFormula { return c('magnetism-field', 'field(current, turns) = current · turns', current * turns, nat(current, turns), 'field', [current, turns]) }
  /** LORENTZ FORCE on a moving charge. value charge · velocity. */
  static force(charge: number, velocity: number): CrossFormula { return c('magnetism-force', 'force(charge, velocity) = charge · velocity', charge * velocity, nat(charge, velocity), 'force', [charge, velocity]) }
  /** MAGNETIC FLUX through an area. value field · area. */
  static flux(field: number, area: number): CrossFormula { return c('magnetism-flux', 'flux(field, area) = field · area', field * area, nat(field, area), 'flux', [field, area]) }
  /** FARADAY EMF: the flux changing over time. value ⌊flux / time⌋. */
  static induction(flux: number, time: number): CrossFormula { return c('magnetism-induction', 'induction(flux, time) = ⌊flux / time⌋', time > 0 ? Math.floor(flux / time) : 0, nat(flux, time) && time > 0, 'induction', [flux, time]) }
  /** TORQUE on a magnetic moment in a field. value moment · field. */
  static torque(moment: number, field: number): CrossFormula { return c('magnetism-torque', 'torque(moment, field) = moment · field', moment * field, nat(moment, field), 'torque', [moment, field]) }
  /** PERMEABILITY: flux per unit current. value ⌊flux / current⌋. */
  static permeability(flux: number, current: number): CrossFormula { return c('magnetism-permeability', 'permeability(flux, current) = ⌊flux / current⌋', current > 0 ? Math.floor(flux / current) : 0, nat(flux, current) && current > 0, 'permeability', [flux, current]) }
  /** RELUCTANCE: path length over area, scaled by a thousand. value ⌊length · 1000 / area⌋. */
  static reluctance(length: number, area: number): CrossFormula { return c('magnetism-reluctance', 'reluctance(length, area) = ⌊length · 1000 / area⌋', area > 0 ? Math.floor((length * 1000) / area) : 0, nat(length, area) && area > 0, 'reluctance', [length, area]) }
  /** DIPOLE reach: pole strength over distance. value ⌊pole / distance⌋. */
  static dipole(pole: number, distance: number): CrossFormula { return c('magnetism-dipole', 'dipole(pole, distance) = ⌊pole / distance⌋', distance > 0 ? Math.floor(pole / distance) : 0, nat(pole, distance) && distance > 0, 'dipole', [pole, distance]) }
}

for (const name of ['dipole', 'field', 'flux', 'force', 'induction', 'permeability', 'reluctance', 'torque'] as const)
  hexRegisterOf('magnetism', name, (MagnetismFormulas[name] as (...x: unknown[]) => unknown).bind(MagnetismFormulas))
