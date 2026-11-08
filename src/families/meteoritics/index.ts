import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** METEORITICS — THE FALL OF ROCK, AS ARITHMETIC (chosen by the astronomy registry, not by hand). A meteor is numbers:
 *  the kinetic energy it carries, the crater it digs, the mass it sheds, the flux of falls over an area, the speed from a
 *  track, the metal fraction of its body, its brightness at a distance, and the mass that survives the air. Crosses to
 *  `astronomy` — meteoritics is what astronomy measures as it reaches the ground. A measure. */

const PROOF = 'meteoritics arithmetic (kinetic energy, crater, ablation, flux, velocity, composition, magnitude, survival); a measure crossed to astronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'meteoritics', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `meteoritics.${name}`, params })

export class MeteoriticsFormulas {
  /** KINETIC ENERGY: half the mass times the square of the speed. value ⌊mass · velocity² / 2⌋. */
  static energy(mass: number, velocity: number): CrossFormula { return c('meteoritics-energy', 'energy(mass, velocity) = ⌊mass · velocity² / 2⌋', Math.floor((mass * velocity * velocity) / 2), nat(mass, velocity), 'energy', [mass, velocity]) }
  /** CRATER: the impact energy spread over the ground's resistance. value ⌊energy / ground⌋. */
  static crater(energy: number, ground: number): CrossFormula { return c('meteoritics-crater', 'crater(energy, ground) = ⌊energy / ground⌋', ground > 0 ? Math.floor(energy / ground) : 0, nat(energy, ground) && ground > 0, 'crater', [energy, ground]) }
  /** ABLATION: the mass lost from initial to final, never below zero. value max(0, initial − final). */
  static ablation(initial: number, final: number): CrossFormula { return c('meteoritics-ablation', 'ablation(initial, final) = max(0, initial − final)', Math.max(0, initial - final), nat(initial, final), 'ablation', [initial, final]) }
  /** FLUX: the count of falls over the area watched. value ⌊count / area⌋. */
  static flux(count: number, area: number): CrossFormula { return c('meteoritics-flux', 'flux(count, area) = ⌊count / area⌋', area > 0 ? Math.floor(count / area) : 0, nat(count, area) && area > 0, 'flux', [count, area]) }
  /** VELOCITY: the distance along the track over the time taken. value ⌊distance / time⌋. */
  static velocity(distance: number, time: number): CrossFormula { return c('meteoritics-velocity', 'velocity(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'velocity', [distance, time]) }
  /** COMPOSITION: the metal fraction of the body as a percentage. value ⌊metal · 100 / total⌋. */
  static composition(metal: number, total: number): CrossFormula { return c('meteoritics-composition', 'composition(metal, total) = ⌊metal · 100 / total⌋', total > 0 ? Math.floor((metal * 100) / total) : 0, nat(metal, total) && total > 0 && metal <= total, 'composition', [metal, total]) }
  /** MAGNITUDE: brightness falling off with the square of the distance. value ⌊brightness / distance²⌋. */
  static magnitude(brightness: number, distance: number): CrossFormula { return c('meteoritics-magnitude', 'magnitude(brightness, distance) = ⌊brightness / distance²⌋', distance > 0 ? Math.floor(brightness / (distance * distance)) : 0, nat(brightness, distance) && distance > 0, 'magnitude', [brightness, distance]) }
  /** SURVIVAL: the mass that clears the atmosphere's toll, never below zero. value max(0, mass − atmosphere). */
  static survival(mass: number, atmosphere: number): CrossFormula { return c('meteoritics-survival', 'survival(mass, atmosphere) = max(0, mass − atmosphere)', Math.max(0, mass - atmosphere), nat(mass, atmosphere), 'survival', [mass, atmosphere]) }
}

for (const name of ['ablation', 'composition', 'crater', 'energy', 'flux', 'magnitude', 'survival', 'velocity'] as const)
  hexRegisterOf('meteoritics', name, (MeteoriticsFormulas[name] as (...x: unknown[]) => unknown).bind(MeteoriticsFormulas))
