import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FLIGHTDYNAMICS — THE AIRCRAFT IN MOTION, AS ARITHMETIC (an aircraft's flight envelope is numbers). Load factor,
 *  stall speed, turn rate, climb gradient, wing loading, thrust-to-weight, range, and the bank angle of a turn. Crosses
 *  to `dynamics` — flight dynamics is the dynamics of a body under lift, thrust, drag and weight. A measure. */

const PROOF = 'flightdynamics arithmetic (load factor, stall speed, turn rate, climb gradient, wing loading, thrust-to-weight, range, bank angle); an aircraft\'s flight envelope as integers; a measure crossed to dynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'flightdynamics', dst: 'dynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `flightdynamics.${name}`, params })

export class FlightdynamicsFormulas {
  /** LOAD FACTOR: lift over weight, as a percentage (100 = 1 g). value ⌊lift · 100 / weight⌋. */
  static loadfactor(lift: number, weight: number): CrossFormula { return c('flightdynamics-loadfactor', 'loadfactor(lift, weight) = ⌊lift · 100 / weight⌋', weight > 0 ? Math.floor((lift * 100) / weight) : 0, nat(lift, weight) && weight > 0, 'loadfactor', [lift, weight]) }
  /** STALL SPEED (dynamic-pressure proxy): wing loading over the max lift coefficient. value ⌊wingload / clmax⌋. */
  static stallspeed(wingload: number, clmax: number): CrossFormula { return c('flightdynamics-stallspeed', 'stallspeed(wingload, clmax) = ⌊wingload / clmax⌋', clmax > 0 ? Math.floor(wingload / clmax) : 0, nat(wingload, clmax) && clmax > 0, 'stallspeed', [wingload, clmax]) }
  /** TURN RATE: speed over turn radius. value ⌊speed / radius⌋. */
  static turnrate(speed: number, radius: number): CrossFormula { return c('flightdynamics-turnrate', 'turnrate(speed, radius) = ⌊speed / radius⌋', radius > 0 ? Math.floor(speed / radius) : 0, nat(speed, radius) && radius > 0, 'turnrate', [speed, radius]) }
  /** CLIMB GRADIENT: rise over run, as a percentage. value ⌊climb · 100 / forward⌋. */
  static climbgradient(climb: number, forward: number): CrossFormula { return c('flightdynamics-climbgradient', 'climbgradient(climb, forward) = ⌊climb · 100 / forward⌋', forward > 0 ? Math.floor((climb * 100) / forward) : 0, nat(climb, forward) && forward > 0, 'climbgradient', [climb, forward]) }
  /** WING LOADING: weight over wing area. value ⌊weight / area⌋. */
  static wingloading(weight: number, area: number): CrossFormula { return c('flightdynamics-wingloading', 'wingloading(weight, area) = ⌊weight / area⌋', area > 0 ? Math.floor(weight / area) : 0, nat(weight, area) && area > 0, 'wingloading', [weight, area]) }
  /** THRUST-TO-WEIGHT: thrust over weight, as a percentage. value ⌊thrust · 100 / weight⌋. */
  static thrusttoweight(thrust: number, weight: number): CrossFormula { return c('flightdynamics-thrusttoweight', 'thrusttoweight(thrust, weight) = ⌊thrust · 100 / weight⌋', weight > 0 ? Math.floor((thrust * 100) / weight) : 0, nat(thrust, weight) && weight > 0, 'thrusttoweight', [thrust, weight]) }
  /** RANGE: cruise speed over endurance hours. value speed · endurance. */
  static rangefactor(speed: number, endurance: number): CrossFormula { return c('flightdynamics-rangefactor', 'rangefactor(speed, endurance) = speed · endurance', speed * endurance, nat(speed, endurance), 'rangefactor', [speed, endurance]) }
  /** BANK ANGLE (tangent proxy): lateral over vertical component, as a percentage. value ⌊lateral · 100 / vertical⌋. */
  static bankangle(lateral: number, vertical: number): CrossFormula { return c('flightdynamics-bankangle', 'bankangle(lateral, vertical) = ⌊lateral · 100 / vertical⌋', vertical > 0 ? Math.floor((lateral * 100) / vertical) : 0, nat(lateral, vertical) && vertical > 0, 'bankangle', [lateral, vertical]) }
}

for (const name of ['bankangle', 'climbgradient', 'loadfactor', 'rangefactor', 'stallspeed', 'thrusttoweight', 'turnrate', 'wingloading'] as const)
  hexRegisterOf('flightdynamics', name, (FlightdynamicsFormulas[name] as (...x: unknown[]) => unknown).bind(FlightdynamicsFormulas))
