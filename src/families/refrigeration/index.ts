import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REFRIGERATION — MOVING HEAT, AS ARITHMETIC. The vapour-compression cycle is numbers: the coefficient of performance,
 *  the heat load a space puts out, the capacity a machine delivers, the cooling effect of the refrigerant, the superheat at
 *  the suction line, the subcooling at the liquid line, the pull-down to temperature, and the defrost cycles in a window.
 *  Crosses to `cuisine` — refrigeration is what keeps the kitchen's food cold. A measure. */

const PROOF = 'refrigeration arithmetic (coefficient of performance, heat load, capacity, cooling effect, superheat, subcooling, pull-down, defrost); the vapour-compression cycle as integers; a measure crossed to cuisine'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'refrigeration', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `refrigeration.${name}`, params })

export class RefrigerationFormulas {
  /** CAPACITY: tons of refrigeration at a rate per ton. value tons · rate. */
  static capacity(tons: number, rate: number): CrossFormula { return c('refrigeration-capacity', 'capacity(tons, rate) = tons · rate', tons * rate, nat(tons, rate), 'capacity', [tons, rate]) }
  /** COOLING EFFECT: mass of refrigerant across an enthalpy drop. value mass · max(0, hIn − hOut). */
  static cooling(mass: number, hIn: number, hOut: number): CrossFormula { return c('refrigeration-cooling', 'cooling(mass, hIn, hOut) = mass · max(0, hIn − hOut)', mass * Math.max(0, hIn - hOut), nat(mass, hIn, hOut), 'cooling', [mass, hIn, hOut]) }
  /** COEFFICIENT OF PERFORMANCE: cooling delivered over work spent. value ⌊cool / work⌋. */
  static cop(cool: number, work: number): CrossFormula { return c('refrigeration-cop', 'cop(cool, work) = ⌊cool / work⌋', work > 0 ? Math.floor(cool / work) : 0, nat(cool, work) && work > 0, 'cop', [cool, work]) }
  /** DEFROST: cycles that fit in a window at a fixed interval. value ⌊window / interval⌋. */
  static defrost(window: number, interval: number): CrossFormula { return c('refrigeration-defrost', 'defrost(window, interval) = ⌊window / interval⌋', interval > 0 ? Math.floor(window / interval) : 0, nat(window, interval) && interval > 0, 'defrost', [window, interval]) }
  /** HEAT LOAD: mass through a specific heat across a temperature difference. value mass · spec · delta. */
  static load(mass: number, spec: number, delta: number): CrossFormula { return c('refrigeration-load', 'load(mass, spec, delta) = mass · spec · delta', mass * spec * delta, nat(mass, spec, delta), 'load', [mass, spec, delta]) }
  /** PULL-DOWN: the cycles a capacity needs to shed a heat load. value ⌈heat / capacity⌉. */
  static pulldown(heat: number, capacity: number): CrossFormula { return c('refrigeration-pulldown', 'pulldown(heat, capacity) = ⌈heat / capacity⌉', capacity > 0 ? Math.ceil(heat / capacity) : 0, nat(heat, capacity) && capacity > 0, 'pulldown', [heat, capacity]) }
  /** SUBCOOLING: how far below saturation the liquid line runs. value max(0, sat − liquid). */
  static subcool(sat: number, liquid: number): CrossFormula { return c('refrigeration-subcool', 'subcool(sat, liquid) = max(0, sat − liquid)', Math.max(0, sat - liquid), nat(sat, liquid), 'subcool', [sat, liquid]) }
  /** SUPERHEAT: how far above saturation the suction line runs. value max(0, suction − sat). */
  static superheat(suction: number, sat: number): CrossFormula { return c('refrigeration-superheat', 'superheat(suction, sat) = max(0, suction − sat)', Math.max(0, suction - sat), nat(suction, sat), 'superheat', [suction, sat]) }
}

for (const name of ['capacity', 'cooling', 'cop', 'defrost', 'load', 'pulldown', 'subcool', 'superheat'] as const)
  hexRegisterOf('refrigeration', name, (RefrigerationFormulas[name] as (...x: unknown[]) => unknown).bind(RefrigerationFormulas))
