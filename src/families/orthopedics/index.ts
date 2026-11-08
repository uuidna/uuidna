import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ORTHOPEDICS — THE MUSCULOSKELETAL CLINIC, AS ARITHMETIC. Bones and joints are numbers: the range a joint moves through,
 *  bone density against a young reference, the load a fracture bears, a leg-length discrepancy, the Cobb angle of a curve,
 *  gait cadence, limb alignment, and the implant size a canal needs. Crosses to `anatomy` — orthopedics is anatomy under
 *  load. A measure. */

const PROOF = 'orthopedics arithmetic (range of motion, bone density, fracture load, leg discrepancy, Cobb angle, gait cadence, alignment, implant size); the musculoskeletal clinic as integers; a measure crossed to anatomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'orthopedics', dst: 'anatomy', formula, value, proof: PROOF, ...extra }, holds, { name: `orthopedics.${name}`, params })

export class OrthopedicsFormulas {
  /** RANGE OF MOTION: active degrees as a percentage of passive. value ⌊active · 100 / passive⌋. */
  static rangeofmotion(active: number, passive: number): CrossFormula { return c('orthopedics-rangeofmotion', 'rangeofmotion(active, passive) = ⌊active · 100 / passive⌋', passive > 0 ? Math.floor((active * 100) / passive) : 0, nat(active, passive) && passive > 0 && active <= passive, 'rangeofmotion', [active, passive]) }
  /** BONE DENSITY: measured BMD as a percentage of the young-adult reference. value ⌊bmd · 100 / young⌋. */
  static bonedensity(bmd: number, young: number): CrossFormula { return c('orthopedics-bonedensity', 'bonedensity(bmd, young) = ⌊bmd · 100 / young⌋', young > 0 ? Math.floor((bmd * 100) / young) : 0, nat(bmd, young) && young > 0, 'bonedensity', [bmd, young]) }
  /** FRACTURE LOAD: cross-sectional area at a material strength. value area · strength. */
  static fractureload(area: number, strength: number): CrossFormula { return c('orthopedics-fractureload', 'fractureload(area, strength) = area · strength', area * strength, nat(area, strength), 'fractureload', [area, strength]) }
  /** LEG DISCREPANCY: how much the left leg exceeds the right, never below zero. value max(0, left − right). */
  static legdiscrepancy(left: number, right: number): CrossFormula { return c('orthopedics-legdiscrepancy', 'legdiscrepancy(left, right) = max(0, left − right)', Math.max(0, left - right), nat(left, right), 'legdiscrepancy', [left, right]) }
  /** COBB ANGLE: the curve as the sum of the upper and lower end-vertebra tilts. value upper + lower. */
  static cobbangle(upper: number, lower: number): CrossFormula { return c('orthopedics-cobbangle', 'cobbangle(upper, lower) = upper + lower', upper + lower, nat(upper, lower), 'cobbangle', [upper, lower]) }
  /** GAIT CADENCE: steps per minute from steps over seconds. value ⌊steps · 60 / seconds⌋. */
  static gait(steps: number, seconds: number): CrossFormula { return c('orthopedics-gait', 'gait(steps, seconds) = ⌊steps · 60 / seconds⌋', seconds > 0 ? Math.floor((steps * 60) / seconds) : 0, nat(steps, seconds) && seconds > 0, 'gait', [steps, seconds]) }
  /** ALIGNMENT: varus/valgus deviation of the femoral axis past the tibial axis. value max(0, femoral − tibial). */
  static alignment(femoral: number, tibial: number): CrossFormula { return c('orthopedics-alignment', 'alignment(femoral, tibial) = max(0, femoral − tibial)', Math.max(0, femoral - tibial), nat(femoral, tibial), 'alignment', [femoral, tibial]) }
  /** IMPLANT SIZE: the stem increments a canal needs at a per-increment step. value ⌈canal / step⌉. */
  static implantsize(canal: number, step: number): CrossFormula { return c('orthopedics-implantsize', 'implantsize(canal, step) = ⌈canal / step⌉', step > 0 ? Math.ceil(canal / step) : 0, nat(canal, step) && step > 0, 'implantsize', [canal, step]) }
}

for (const name of ['alignment', 'bonedensity', 'cobbangle', 'fractureload', 'gait', 'implantsize', 'legdiscrepancy', 'rangeofmotion'] as const)
  hexRegisterOf('orthopedics', name, (OrthopedicsFormulas[name] as (...x: unknown[]) => unknown).bind(OrthopedicsFormulas))
