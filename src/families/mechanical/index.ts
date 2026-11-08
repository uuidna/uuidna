import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MECHANICAL — MECHANICAL ENGINEERING AS ARITHMETIC (chosen by the registry, not by hand). A machine is numbers: the
 *  torque a force makes at a radius, the power a shaft turns at, the stress a load lays on an area, the strain it draws,
 *  a gear ratio, an efficiency, a thermal drop, a spring rate. Crosses to `materials` — mechanics is what materials bear.
 *  A measure. */

const PROOF = 'mechanical arithmetic (torque, shaft power, stress, strain, gear ratio, efficiency, thermal drop, spring rate); a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mechanical', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `mechanical.${name}`, params })

export class MechanicalFormulas {
  /** TORQUE: a force at a radius. value force · radius. */
  static torque(force: number, radius: number): CrossFormula { return c('mechanical-torque', 'torque(force, radius) = force · radius', force * radius, nat(force, radius), 'torque', [force, radius]) }
  /** SHAFT POWER (kW proxy): torque turned at rpm. value ⌊torque · rpm / 9549⌋. */
  static power(torque: number, rpm: number): CrossFormula { return c('mechanical-power', 'power(torque, rpm) = ⌊torque · rpm / 9549⌋', Math.floor((torque * rpm) / 9549), nat(torque, rpm), 'power', [torque, rpm]) }
  /** STRESS: a force over an area. value ⌊force / area⌋. */
  static stress(force: number, area: number): CrossFormula { return c('mechanical-stress', 'stress(force, area) = ⌊force / area⌋', area > 0 ? Math.floor(force / area) : 0, nat(force, area) && area > 0, 'stress', [force, area]) }
  /** STRAIN (per mille): deformation over a length. value ⌊deformation · 1000 / length⌋. */
  static strain(deformation: number, length: number): CrossFormula { return c('mechanical-strain', 'strain(deformation, length) = ⌊deformation · 1000 / length⌋', length > 0 ? Math.floor((deformation * 1000) / length) : 0, nat(deformation, length) && length > 0, 'strain', [deformation, length]) }
  /** GEAR RATIO (percent): driven over driver. value ⌊driven · 100 / driver⌋. */
  static gear(driven: number, driver: number): CrossFormula { return c('mechanical-gear', 'gear(driven, driver) = ⌊driven · 100 / driver⌋', driver > 0 ? Math.floor((driven * 100) / driver) : 0, nat(driven, driver) && driver > 0, 'gear', [driven, driver]) }
  /** EFFICIENCY (percent): output over input. value ⌊output · 100 / input⌋. */
  static efficiency(output: number, input: number): CrossFormula { return c('mechanical-efficiency', 'efficiency(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0 && output <= input, 'efficiency', [output, input]) }
  /** THERMAL DROP: heat over a resistance. value ⌊heat / resistance⌋. */
  static thermal(heat: number, resistance: number): CrossFormula { return c('mechanical-thermal', 'thermal(heat, resistance) = ⌊heat / resistance⌋', resistance > 0 ? Math.floor(heat / resistance) : 0, nat(heat, resistance) && resistance > 0, 'thermal', [heat, resistance]) }
  /** SPRING RATE: a force over a displacement. value ⌊force / displacement⌋. */
  static spring(force: number, displacement: number): CrossFormula { return c('mechanical-spring', 'spring(force, displacement) = ⌊force / displacement⌋', displacement > 0 ? Math.floor(force / displacement) : 0, nat(force, displacement) && displacement > 0, 'spring', [force, displacement]) }
}

for (const name of ['efficiency', 'gear', 'power', 'spring', 'strain', 'stress', 'thermal', 'torque'] as const)
  hexRegisterOf('mechanical', name, (MechanicalFormulas[name] as (...x: unknown[]) => unknown).bind(MechanicalFormulas))
