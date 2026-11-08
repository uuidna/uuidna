import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HYDRAULICS — MOVING FLUID AS ARITHMETIC (pressure, continuity, Pascal's law, head, power, a Reynolds proxy, the
 *  mechanical advantage of a press). Pressure is force over area; flow is area times velocity; a press multiplies the
 *  input by its ratio. Crosses to `hydrology` — hydraulics is the engineered side of water that hydrology measures in
 *  the wild. A measure. */

const PROOF = 'hydraulics arithmetic (pressure, continuity flow, Pascal force, velocity, head, power, Reynolds proxy, press multiplier); the engineered fluid domain; a measure crossed to hydrology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hydraulics', dst: 'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `hydraulics.${name}`, params })

export class HydraulicsFormulas {
  /** PRESSURE: force over area. value ⌊force / area⌋. */
  static pressure(force: number, area: number): CrossFormula { return c('hydraulics-pressure', 'pressure(force, area) = ⌊force / area⌋', area > 0 ? Math.floor(force / area) : 0, nat(force, area) && area > 0, 'pressure', [force, area]) }
  /** CONTINUITY FLOW: Q = A · v. value area · velocity. */
  static flow(area: number, velocity: number): CrossFormula { return c('hydraulics-flow', 'flow(area, velocity) = area · velocity', area * velocity, nat(area, velocity), 'flow', [area, velocity]) }
  /** PASCAL'S LAW: force = pressure · area. value pressure · area. */
  static force(pressure: number, area: number): CrossFormula { return c('hydraulics-force', 'force(pressure, area) = pressure · area', pressure * area, nat(pressure, area), 'force', [pressure, area]) }
  /** VELOCITY: flow over area. value ⌊flow / area⌋. */
  static velocity(flow: number, area: number): CrossFormula { return c('hydraulics-velocity', 'velocity(flow, area) = ⌊flow / area⌋', area > 0 ? Math.floor(flow / area) : 0, nat(flow, area) && area > 0, 'velocity', [flow, area]) }
  /** HEAD: pressure over density. value ⌊pressure / density⌋. */
  static head(pressure: number, density: number): CrossFormula { return c('hydraulics-head', 'head(pressure, density) = ⌊pressure / density⌋', density > 0 ? Math.floor(pressure / density) : 0, nat(pressure, density) && density > 0, 'head', [pressure, density]) }
  /** HYDRAULIC POWER: flow · head. value flow · head. */
  static power(flow: number, head: number): CrossFormula { return c('hydraulics-power', 'power(flow, head) = flow · head', flow * head, nat(flow, head), 'power', [flow, head]) }
  /** REYNOLDS PROXY: velocity · diameter. value velocity · diameter. */
  static reynolds(velocity: number, diameter: number): CrossFormula { return c('hydraulics-reynolds', 'reynolds(velocity, diameter) = velocity · diameter', velocity * diameter, nat(velocity, diameter), 'reynolds', [velocity, diameter]) }
  /** PRESS MULTIPLIER: the mechanical advantage of a hydraulic press. value input · ratio. */
  static lift(input: number, ratio: number): CrossFormula { return c('hydraulics-lift', 'lift(input, ratio) = input · ratio', input * ratio, nat(input, ratio), 'lift', [input, ratio]) }
}

for (const name of ['flow', 'force', 'head', 'lift', 'power', 'pressure', 'reynolds', 'velocity'] as const)
  hexRegisterOf('hydraulics', name, (HydraulicsFormulas[name] as (...x: unknown[]) => unknown).bind(HydraulicsFormulas))
