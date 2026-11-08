import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SUSPENSION — A CAR'S SUSPENSION, AS ARITHMETIC (a mechanical domain, not chosen by hand). Holding a wheel is numbers:
 *  spring rate from force and travel, damping force, ride height after sag, total wheel travel, roll resistance, chassis
 *  stiffness, sprung-mass frequency, and the load each corner carries. Crosses to `automotive` — suspension is one of the
 *  systems a vehicle is built from. A measure. */

const PROOF = 'suspension arithmetic (spring rate, damping, ride height, travel, roll, stiffness, frequency, corner load); a mechanical domain; a measure crossed to automotive'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'suspension', dst: 'automotive', formula, value, proof: PROOF, ...extra }, holds, { name: `suspension.${name}`, params })

export class SuspensionFormulas {
  /** SPRING RATE: force over the travel it produces. value ⌊force / travel⌋. */
  static springrate(force: number, travel: number): CrossFormula { return c('suspension-springrate', 'springrate(force, travel) = ⌊force / travel⌋', travel > 0 ? Math.floor(force / travel) : 0, nat(force, travel) && travel > 0, 'springrate', [force, travel]) }
  /** DAMPING FORCE: a damper's coefficient times shaft velocity. value coeff · velocity. */
  static damping(coeff: number, velocity: number): CrossFormula { return c('suspension-damping', 'damping(coeff, velocity) = coeff · velocity', coeff * velocity, nat(coeff, velocity), 'damping', [coeff, velocity]) }
  /** RIDE HEIGHT: free length less the static sag. value max(0, free − sag). */
  static ride(free: number, sag: number): CrossFormula { return c('suspension-ride', 'ride(free, sag) = max(0, free − sag)', Math.max(0, free - sag), nat(free, sag), 'ride', [free, sag]) }
  /** WHEEL TRAVEL: bump plus droop. value bump + droop. */
  static travel(bump: number, droop: number): CrossFormula { return c('suspension-travel', 'travel(bump, droop) = bump + droop', bump + droop, nat(bump, droop), 'travel', [bump, droop]) }
  /** ROLL RESISTANCE: bar stiffness over the roll angle, scaled. value ⌊stiffness · angle / 100⌋. */
  static roll(stiffness: number, angle: number): CrossFormula { return c('suspension-roll', 'roll(stiffness, angle) = ⌊stiffness · angle / 100⌋', Math.floor((stiffness * angle) / 100), nat(stiffness, angle), 'roll', [stiffness, angle]) }
  /** CHASSIS STIFFNESS: force over deflection, in N/m from mm. value ⌊force · 1000 / deflection⌋. */
  static stiffness(force: number, deflection: number): CrossFormula { return c('suspension-stiffness', 'stiffness(force, deflection) = ⌊force · 1000 / deflection⌋', deflection > 0 ? Math.floor((force * 1000) / deflection) : 0, nat(force, deflection) && deflection > 0, 'stiffness', [force, deflection]) }
  /** SPRUNG-MASS FREQUENCY: rate over mass. value ⌊rate / mass⌋. */
  static frequency(rate: number, mass: number): CrossFormula { return c('suspension-frequency', 'frequency(rate, mass) = ⌊rate / mass⌋', mass > 0 ? Math.floor(rate / mass) : 0, nat(rate, mass) && mass > 0, 'frequency', [rate, mass]) }
  /** CORNER LOAD: total weight shared over the corners. value ⌊total / corners⌋. */
  static load(total: number, corners: number): CrossFormula { return c('suspension-load', 'load(total, corners) = ⌊total / corners⌋', corners > 0 ? Math.floor(total / corners) : 0, nat(total, corners) && corners > 0, 'load', [total, corners]) }
}

for (const name of ['damping', 'frequency', 'load', 'ride', 'roll', 'springrate', 'stiffness', 'travel'] as const)
  hexRegisterOf('suspension', name, (SuspensionFormulas[name] as (...x: unknown[]) => unknown).bind(SuspensionFormulas))
