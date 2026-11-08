import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CIVIL — CIVIL ENGINEERING, AS ARITHMETIC. Structures and the ground they sit on are numbers: the load a beam carries per
 *  span, the pressure under a footing, how far a member deflects, the grade of a road, the runoff a storm sheds off an area,
 *  the traffic a lane passes per hour, the concrete a mix yields, and how far a foundation settles. Crosses to `construction`
 *  — civil is what construction builds. A measure. */

const PROOF = 'civil arithmetic (beam load, bearing pressure, deflection, slope, runoff, traffic flow, concrete mix, settlement); civil engineering as a measure crossed to construction'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'civil', dst: 'construction', formula, value, proof: PROOF, ...extra }, holds, { name: `civil.${name}`, params })

export class CivilFormulas {
  /** BEAM LOAD: a distributed load over the span it spans. value ⌊load / span⌋. */
  static beamload(load: number, span: number): CrossFormula { return c('civil-beamload', 'beamload(load, span) = ⌊load / span⌋', span > 0 ? Math.floor(load / span) : 0, nat(load, span) && span > 0, 'beamload', [load, span]) }
  /** BEARING PRESSURE: a load spread over the footing area. value ⌊load / area⌋. */
  static bearing(load: number, area: number): CrossFormula { return c('civil-bearing', 'bearing(load, area) = ⌊load / area⌋', area > 0 ? Math.floor(load / area) : 0, nat(load, area) && area > 0, 'bearing', [load, area]) }
  /** CONCRETE MIX: cement scaled by the mix ratio. value cement · ratio. */
  static concrete(cement: number, ratio: number): CrossFormula { return c('civil-concrete', 'concrete(cement, ratio) = cement · ratio', cement * ratio, nat(cement, ratio), 'concrete', [cement, ratio]) }
  /** DEFLECTION: a load against member stiffness. value ⌊load / stiffness⌋. */
  static deflection(load: number, stiffness: number): CrossFormula { return c('civil-deflection', 'deflection(load, stiffness) = ⌊load / stiffness⌋', stiffness > 0 ? Math.floor(load / stiffness) : 0, nat(load, stiffness) && stiffness > 0, 'deflection', [load, stiffness]) }
  /** RUNOFF: rainfall shed off an area. value rainfall · area. */
  static runoff(rainfall: number, area: number): CrossFormula { return c('civil-runoff', 'runoff(rainfall, area) = rainfall · area', rainfall * area, nat(rainfall, area), 'runoff', [rainfall, area]) }
  /** SETTLEMENT: a load against soil modulus. value ⌊load / modulus⌋. */
  static settlement(load: number, modulus: number): CrossFormula { return c('civil-settlement', 'settlement(load, modulus) = ⌊load / modulus⌋', modulus > 0 ? Math.floor(load / modulus) : 0, nat(load, modulus) && modulus > 0, 'settlement', [load, modulus]) }
  /** SLOPE: rise over run as a percent grade. value ⌊rise · 100 / run⌋. */
  static slope(rise: number, run: number): CrossFormula { return c('civil-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) }
  /** TRAFFIC FLOW: vehicles over the hours they pass in. value ⌊vehicles / hours⌋. */
  static trafficflow(vehicles: number, hours: number): CrossFormula { return c('civil-trafficflow', 'trafficflow(vehicles, hours) = ⌊vehicles / hours⌋', hours > 0 ? Math.floor(vehicles / hours) : 0, nat(vehicles, hours) && hours > 0, 'trafficflow', [vehicles, hours]) }
}

for (const name of ['beamload', 'bearing', 'concrete', 'deflection', 'runoff', 'settlement', 'slope', 'trafficflow'] as const)
  hexRegisterOf('civil', name, (CivilFormulas[name] as (...x: unknown[]) => unknown).bind(CivilFormulas))
