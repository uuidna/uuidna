import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AERODYNAMICS — FLIGHT AS ARITHMETIC. The forces a wing meets are numbers: lift and drag from a coefficient over an
 *  area, their ratio, the Reynolds number of the flow, the Mach number against the speed of sound, the thrust an engine
 *  makes, the pressure a force spreads over an area, and the wing loading that sets the stall. Crosses to `transport` —
 *  aerodynamics is what moves the vehicle. A measure. */

const PROOF = 'aerodynamics arithmetic (lift, drag, lift-to-drag ratio, Reynolds, Mach, thrust, pressure, stall wing-loading); flight as integer force; a measure crossed to transport'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'aerodynamics', dst: 'transport', formula, value, proof: PROOF, ...extra }, holds, { name: `aerodynamics.${name}`, params })

export class AerodynamicsFormulas {
  /** LIFT: a coefficient over an area (proxy). value coefficient · area. */
  static lift(coefficient: number, area: number): CrossFormula { return c('aerodynamics-lift', 'lift(coefficient, area) = coefficient · area', coefficient * area, nat(coefficient, area), 'lift', [coefficient, area]) }
  /** DRAG: a coefficient over an area. value coefficient · area. */
  static drag(coefficient: number, area: number): CrossFormula { return c('aerodynamics-drag', 'drag(coefficient, area) = coefficient · area', coefficient * area, nat(coefficient, area), 'drag', [coefficient, area]) }
  /** LIFT-TO-DRAG RATIO ×100. value ⌊lift · 100 / drag⌋. */
  static ratio(lift_: number, drag_: number): CrossFormula { return c('aerodynamics-ratio', 'ratio(lift_, drag_) = ⌊lift_ · 100 / drag_⌋', drag_ > 0 ? Math.floor((lift_ * 100) / drag_) : 0, nat(lift_, drag_) && drag_ > 0, 'ratio', [lift_, drag_]) }
  /** REYNOLDS NUMBER: velocity over a length (proxy). value velocity · length. */
  static reynolds(velocity: number, length: number): CrossFormula { return c('aerodynamics-reynolds', 'reynolds(velocity, length) = velocity · length', velocity * length, nat(velocity, length), 'reynolds', [velocity, length]) }
  /** MACH NUMBER ×100 against the speed of sound. value ⌊velocity · 100 / sound⌋. */
  static mach(velocity: number, sound: number): CrossFormula { return c('aerodynamics-mach', 'mach(velocity, sound) = ⌊velocity · 100 / sound⌋', sound > 0 ? Math.floor((velocity * 100) / sound) : 0, nat(velocity, sound) && sound > 0, 'mach', [velocity, sound]) }
  /** THRUST: mass under acceleration. value mass · acceleration. */
  static thrust(mass: number, acceleration: number): CrossFormula { return c('aerodynamics-thrust', 'thrust(mass, acceleration) = mass · acceleration', mass * acceleration, nat(mass, acceleration), 'thrust', [mass, acceleration]) }
  /** PRESSURE: a force spread over an area. value ⌊force / area⌋. */
  static pressure(force: number, area: number): CrossFormula { return c('aerodynamics-pressure', 'pressure(force, area) = ⌊force / area⌋', area > 0 ? Math.floor(force / area) : 0, nat(force, area) && area > 0, 'pressure', [force, area]) }
  /** STALL: wing loading, weight over the lifting area. value ⌊weight / liftarea⌋. */
  static stall(weight: number, liftarea: number): CrossFormula { return c('aerodynamics-stall', 'stall(weight, liftarea) = ⌊weight / liftarea⌋', liftarea > 0 ? Math.floor(weight / liftarea) : 0, nat(weight, liftarea) && liftarea > 0, 'stall', [weight, liftarea]) }
}

for (const name of ['drag', 'lift', 'mach', 'pressure', 'ratio', 'reynolds', 'stall', 'thrust'] as const)
  hexRegisterOf('aerodynamics', name, (AerodynamicsFormulas[name] as (...x: unknown[]) => unknown).bind(AerodynamicsFormulas))
