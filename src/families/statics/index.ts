import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STATICS — RIGID BODIES AT REST, AS ARITHMETIC (forces that cancel, no motion yet). A body holds still when every
 *  moment and force sums to zero: the moment of a force, the support reaction that balances a load, the centroid two
 *  masses share, the equilibrium check, the internal shear, the normal force, the friction it permits, and whether a
 *  truss is determinate. Crosses to `kinematics` — statics is what motion starts from once the balance breaks. A measure. */

const PROOF = 'statics arithmetic (moment, support reaction, centroid, equilibrium, shear, normal force, friction, truss determinacy); forces at rest summing to zero; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'statics', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `statics.${name}`, params })

export class StaticsFormulas {
  /** THE CENTROID of two masses along a line, as a distance from the first. value ⌊w2 · d / (w1 + w2)⌋. */
  static centroid(w1: number, w2: number, d: number): CrossFormula { return c('statics-centroid', 'centroid(w1, w2, d) = ⌊w2 · d / (w1 + w2)⌋', (w1 + w2) > 0 ? Math.floor((w2 * d) / (w1 + w2)) : 0, nat(w1, w2, d) && (w1 + w2) > 0, 'centroid', [w1, w2, d]) }
  /** EQUILIBRIUM: 1 when upward force balances downward force. value [up = down]. */
  static equilibrium(up: number, down: number): CrossFormula { return c('statics-equilibrium', 'equilibrium(up, down) = [up = down]', up === down ? 1 : 0, nat(up, down), 'equilibrium', [up, down]) }
  /** FRICTION force available at a normal force and a coefficient in percent. value ⌊normal · muPct / 100⌋. */
  static friction(normal: number, muPct: number): CrossFormula { return c('statics-friction', 'friction(normal, muPct) = ⌊normal · muPct / 100⌋', Math.floor((normal * muPct) / 100), nat(normal, muPct), 'friction', [normal, muPct]) }
  /** THE MOMENT of a force about a point. value force · distance. */
  static moment(force: number, distance: number): CrossFormula { return c('statics-moment', 'moment(force, distance) = force · distance', force * distance, nat(force, distance), 'moment', [force, distance]) }
  /** NORMAL FORCE as weight times gravity. value mass · gravity. */
  static normalforce(mass: number, gravity: number): CrossFormula { return c('statics-normalforce', 'normalforce(mass, gravity) = mass · gravity', mass * gravity, nat(mass, gravity), 'normalforce', [mass, gravity]) }
  /** SUPPORT REACTION under a point load on a span. value ⌊load · dist / span⌋. */
  static reaction(load: number, dist: number, span: number): CrossFormula { return c('statics-reaction', 'reaction(load, dist, span) = ⌊load · dist / span⌋', span > 0 ? Math.floor((load * dist) / span) : 0, nat(load, dist, span) && span > 0, 'reaction', [load, dist, span]) }
  /** INTERNAL SHEAR: the net of the loads on one side of a section. value max(0, load − opposing). */
  static shear(load: number, opposing: number): CrossFormula { return c('statics-shear', 'shear(load, opposing) = max(0, load − opposing)', Math.max(0, load - opposing), nat(load, opposing), 'shear', [load, opposing]) }
  /** TRUSS DETERMINACY: the members a simple planar truss of j joints needs. value max(0, 2 · joints − 3). */
  static truss(joints: number): CrossFormula { return c('statics-truss', 'truss(joints) = max(0, 2 · joints − 3)', Math.max(0, 2 * joints - 3), nat(joints), 'truss', [joints]) }
}

for (const name of ['centroid', 'equilibrium', 'friction', 'moment', 'normalforce', 'reaction', 'shear', 'truss'] as const)
  hexRegisterOf('statics', name, (StaticsFormulas[name] as (...x: unknown[]) => unknown).bind(StaticsFormulas))
