import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FLUIDDYNAMICS — MOVING FLUID AS ARITHMETIC. Flow is numbers: the Reynolds number that sorts laminar from turbulent,
 *  the volumetric flow through an area, the pressure a pipe drops, the velocity a flow carries, the total pressure Bernoulli
 *  conserves, the viscosity a shear reveals, the Froude number of a free surface, and the Mach number against the speed of
 *  sound. Crosses to `aerodynamics` — fluid in motion is what a wing works. A measure. */

const PROOF = 'fluiddynamics arithmetic (Reynolds, flow rate, pressure drop, velocity, Bernoulli total, viscosity, Froude, Mach); moving fluid as integers; a measure crossed to aerodynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fluiddynamics', dst: 'aerodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `fluiddynamics.${name}`, params })

export class FluiddynamicsFormulas {
  /** REYNOLDS NUMBER: inertia over viscosity, Re = v·L / ν. value ⌊velocity · length / viscosity⌋. */
  static reynolds(velocity: number, length: number, viscosity: number): CrossFormula { return c('fluiddynamics-reynolds', 'reynolds(velocity, length, viscosity) = ⌊velocity · length / viscosity⌋', viscosity > 0 ? Math.floor((velocity * length) / viscosity) : 0, nat(velocity, length, viscosity) && viscosity > 0, 'reynolds', [velocity, length, viscosity]) }
  /** FLOW RATE: volume through an area, Q = A·v. value area · velocity. */
  static flowrate(area: number, velocity: number): CrossFormula { return c('fluiddynamics-flowrate', 'flowrate(area, velocity) = area · velocity', area * velocity, nat(area, velocity), 'flowrate', [area, velocity]) }
  /** PRESSURE DROP along a run carrying a rate through a bore. value ⌊length · rate / diameter⌋. */
  static pressuredrop(length: number, rate: number, diameter: number): CrossFormula { return c('fluiddynamics-pressuredrop', 'pressuredrop(length, rate, diameter) = ⌊length · rate / diameter⌋', diameter > 0 ? Math.floor((length * rate) / diameter) : 0, nat(length, rate, diameter) && diameter > 0, 'pressuredrop', [length, rate, diameter]) }
  /** VELOCITY: a flow through an area, v = Q / A. value ⌊flow / area⌋. */
  static velocity(flow: number, area: number): CrossFormula { return c('fluiddynamics-velocity', 'velocity(flow, area) = ⌊flow / area⌋', area > 0 ? Math.floor(flow / area) : 0, nat(flow, area) && area > 0, 'velocity', [flow, area]) }
  /** BERNOULLI: total pressure, static plus dynamic, p + ½ρv². value pressure + ⌊density · velocity · velocity / 2⌋. */
  static bernoulli(pressure: number, density: number, velocity: number): CrossFormula { return c('fluiddynamics-bernoulli', 'bernoulli(pressure, density, velocity) = pressure + ⌊density · velocity · velocity / 2⌋', pressure + Math.floor((density * velocity * velocity) / 2), nat(pressure, density, velocity), 'bernoulli', [pressure, density, velocity]) }
  /** VISCOSITY: shear stress over shear rate, μ = τ / γ̇. value ⌊stress / rate⌋. */
  static viscosity(stress: number, rate: number): CrossFormula { return c('fluiddynamics-viscosity', 'viscosity(stress, rate) = ⌊stress / rate⌋', rate > 0 ? Math.floor(stress / rate) : 0, nat(stress, rate) && rate > 0, 'viscosity', [stress, rate]) }
  /** FROUDE NUMBER (squared): inertia over gravity on a free surface, Fr² = v² / (g·L). value ⌊velocity · velocity / (gravity · length)⌋. */
  static froude(velocity: number, gravity: number, length: number): CrossFormula { return c('fluiddynamics-froude', 'froude(velocity, gravity, length) = ⌊velocity · velocity / (gravity · length)⌋', gravity * length > 0 ? Math.floor((velocity * velocity) / (gravity * length)) : 0, nat(velocity, gravity, length) && gravity > 0 && length > 0, 'froude', [velocity, gravity, length]) }
  /** MACH NUMBER (×100): speed against the speed of sound, M = v / a. value ⌊speed · 100 / soundspeed⌋. */
  static machnumber(speed: number, soundspeed: number): CrossFormula { return c('fluiddynamics-machnumber', 'machnumber(speed, soundspeed) = ⌊speed · 100 / soundspeed⌋', soundspeed > 0 ? Math.floor((speed * 100) / soundspeed) : 0, nat(speed, soundspeed) && soundspeed > 0, 'machnumber', [speed, soundspeed]) }
}

for (const name of ['bernoulli', 'flowrate', 'froude', 'machnumber', 'pressuredrop', 'reynolds', 'velocity', 'viscosity'] as const)
  hexRegisterOf('fluiddynamics', name, (FluiddynamicsFormulas[name] as (...x: unknown[]) => unknown).bind(FluiddynamicsFormulas))
