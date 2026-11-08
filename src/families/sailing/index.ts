import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** SAILING — THE POINTS OF A BOAT, AS ARITHMETIC. A hull's speed proxy, velocity made good, heel under force against
 *  righting moment, the distance of a tack across legs, a sail's triangle area, drift over time, a compass bearing
 *  normalised, and ballast ratio. Crosses to `oceanography` — the sea the boat sails. A measure. */

const PROOF = 'sailing arithmetic (hull speed, velocity made good, heel, tack, sail area, drift, bearing, ballast); a measure crossed to oceanography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sailing', dst: 'oceanography', formula, value, proof: PROOF, ...extra }, holds, { name: `sailing.${name}`, params })

export class SailingFormulas {
  /** BALLAST RATIO: keel against displacement, as a percentage. value ⌊keel · 100 / displacement⌋. */
  static ballast(keel: number, displacement: number): CrossFormula { return c('sailing-ballast', 'ballast(keel, displacement) = ⌊keel · 100 / displacement⌋', displacement > 0 ? Math.floor((keel * 100) / displacement) : 0, nat(keel, displacement) && displacement > 0 && keel <= displacement, 'ballast', [keel, displacement]) }
  /** BEARING: a compass heading normalised to 0..359. value ((degrees mod 360) + 360) mod 360. */
  static bearing(degrees: number): CrossFormula { return c('sailing-bearing', 'bearing(degrees) = ((degrees mod 360) + 360) mod 360', ((degrees % fullTurn) + fullTurn) % fullTurn, Number.isSafeInteger(degrees), 'bearing', [degrees]) }
  /** DRIFT: current carried over time. value current · time. */
  static drift(current: number, time: number): CrossFormula { return c('sailing-drift', 'drift(current, time) = current · time', current * time, nat(current, time), 'drift', [current, time]) }
  /** HEEL: force against the righting moment, as a percentage. value ⌊force · 100 / righting⌋. */
  static heel(force: number, righting: number): CrossFormula { return c('sailing-heel', 'heel(force, righting) = ⌊force · 100 / righting⌋', righting > 0 ? Math.floor((force * 100) / righting) : 0, nat(force, righting) && righting > 0, 'heel', [force, righting]) }
  /** HULL SPEED: a waterline proxy at a factor. value waterline · factor. */
  static hullspeed(waterline: number, factor: number): CrossFormula { return c('sailing-hullspeed', 'hullspeed(waterline, factor) = waterline · factor', waterline * factor, nat(waterline, factor), 'hullspeed', [waterline, factor]) }
  /** SAIL AREA: a triangle of luff and foot. value ⌊luff · foot / 2⌋. */
  static sailarea(luff: number, foot: number): CrossFormula { return c('sailing-sailarea', 'sailarea(luff, foot) = ⌊luff · foot / 2⌋', Math.floor((luff * foot) / 2), nat(luff, foot), 'sailarea', [luff, foot]) }
  /** TACK: distance spread across legs. value ⌊distance / legs⌋. */
  static tack(distance: number, legs: number): CrossFormula { return c('sailing-tack', 'tack(distance, legs) = ⌊distance / legs⌋', legs > 0 ? Math.floor(distance / legs) : 0, nat(distance, legs) && legs > 0, 'tack', [distance, legs]) }
  /** VELOCITY MADE GOOD: speed at an angle off the mark (0..90). value ⌊speed · angle / 90⌋. */
  static vmg(speed: number, angle: number): CrossFormula { return c('sailing-vmg', 'vmg(speed, angle) = ⌊speed · angle / 90⌋', Math.floor((speed * angle) / 90), nat(speed, angle) && angle <= 90, 'vmg', [speed, angle]) }
}

for (const name of ['ballast', 'bearing', 'drift', 'heel', 'hullspeed', 'sailarea', 'tack', 'vmg'] as const)
  hexRegisterOf('sailing', name, (SailingFormulas[name] as (...x: unknown[]) => unknown).bind(SailingFormulas))
