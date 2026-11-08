import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BALLISTICS — THE FLIGHT OF A PROJECTILE, AS EVIDENCE. A shot is physics over mass, velocity and distance: kinetic
 *  energy, momentum, the velocity from distance and time, the drop under gravity, penetration against an area, recoil,
 *  the group spread from minutes of angle, and time of flight. Exact; a forensic measure crossing to `evidence`, read
 *  into the record — not a conclusion. */

const PROOF = 'exterior and terminal ballistics (kinetic energy ½mv², momentum, velocity, gravity drop, penetration, recoil, MOA spread, time of flight); a forensic measure crossed to evidence'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const b = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ballistics', dst: 'evidence', formula, value, proof: PROOF, ...extra }, holds, { name: `ballistics.${name}`, params })

export class BallisticsFormulas {
  /** KINETIC ENERGY in joules (mass in grams, velocity in m/s): ½mv², grams to kg by 1000. value ⌊mass · v² / 2000⌋. */
  static energy(mass: number, velocity: number): CrossFormula { return b('ballistics-energy', 'energy(mass, velocity) = ⌊mass · velocity² / 2000⌋', Math.floor((mass * velocity * velocity) / 2000), nat(mass, velocity), 'energy', [mass, velocity]) }
  /** MOMENTUM: mass times velocity. value mass · velocity. */
  static momentum(mass: number, velocity: number): CrossFormula { return b('ballistics-momentum', 'momentum(mass, velocity) = mass · velocity', mass * velocity, nat(mass, velocity), 'momentum', [mass, velocity]) }
  /** VELOCITY from distance over time. value ⌊distance / time⌋. */
  static velocity(distance: number, time: number): CrossFormula { return b('ballistics-velocity', 'velocity(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'velocity', [distance, time]) }
  /** GRAVITY DROP in centimetres over `distance` metres at `velocity` m/s: ½g·(d/v)², g ≈ 9.8. value ⌊490 · distance² / velocity²⌋. */
  static drop(distance: number, velocity: number): CrossFormula { return b('ballistics-drop', 'drop(distance, velocity) = ⌊490 · distance² / velocity²⌋', velocity > 0 ? Math.floor((490 * distance * distance) / (velocity * velocity)) : 0, nat(distance, velocity) && velocity > 0, 'drop', [distance, velocity]) }
  /** PENETRATION depth proxy: energy over the cross-sectional area. value ⌊energy / area⌋. */
  static penetration(energy: number, area: number): CrossFormula { return b('ballistics-penetration', 'penetration(energy, area) = ⌊energy / area⌋', area > 0 ? Math.floor(energy / area) : 0, nat(energy, area) && area > 0, 'penetration', [energy, area]) }
  /** RECOIL velocity of the firearm by conservation: bullet momentum over the gun's mass. value ⌊bullet · muzzle / gun⌋. */
  static recoil(bullet: number, muzzle: number, gun: number): CrossFormula { return b('ballistics-recoil', 'recoil(bullet, muzzle, gun) = ⌊bullet · muzzle / gun⌋', gun > 0 ? Math.floor((bullet * muzzle) / gun) : 0, nat(bullet, muzzle, gun) && gun > 0, 'recoil', [bullet, muzzle, gun]) }
  /** GROUP SPREAD in inches: minutes of angle over the range in yards (1 MOA ≈ 1 inch at 100 yd). value ⌊moa · yards / 100⌋. */
  static spread(moa: number, yards: number): CrossFormula { return b('ballistics-spread', 'spread(moa, yards) = ⌊moa · yards / 100⌋', Math.floor((moa * yards) / 100), nat(moa, yards), 'spread', [moa, yards]) }
  /** TIME OF FLIGHT: distance over velocity. value ⌊distance / velocity⌋. */
  static time(distance: number, velocity: number): CrossFormula { return b('ballistics-time', 'time(distance, velocity) = ⌊distance / velocity⌋', velocity > 0 ? Math.floor(distance / velocity) : 0, nat(distance, velocity) && velocity > 0, 'time', [distance, velocity]) }
}

for (const name of ['drop', 'energy', 'momentum', 'penetration', 'recoil', 'spread', 'time', 'velocity'] as const)
  hexRegisterOf('ballistics', name, (BallisticsFormulas[name] as (...x: unknown[]) => unknown).bind(BallisticsFormulas))
