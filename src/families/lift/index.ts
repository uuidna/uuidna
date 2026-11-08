import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LIFT — HOW A WING HOLDS THE AIR UP, AS ARITHMETIC (the forces a finite wing trades for altitude). Flying is numbers:
 *  the lift force a wing makes, its lift coefficient, its aspect ratio, the effective angle of attack, the lift-to-drag
 *  ratio, the bound circulation, the margin before stall, and the wing loading. Crosses to `aerodynamics` — lift is the
 *  one force aerodynamics is spent to earn. A measure. */

const PROOF = 'lift arithmetic (lift force, lift coefficient, aspect ratio, effective angle of attack, lift/drag, circulation, stall margin, wing loading); a measure crossed to aerodynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lift', dst: 'aerodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `lift.${name}`, params })

export class LiftFormulas {
  /** LIFT FORCE: dynamic pressure over the wing area. value pressure · area. */
  static force(pressure: number, area: number): CrossFormula { return c('lift-force', 'force(pressure, area) = pressure · area', pressure * area, nat(pressure, area), 'force', [pressure, area]) }
  /** LIFT COEFFICIENT (×100): the lift a wing makes per unit of dynamic-pressure-area. value ⌊lift · 100 / qs⌋. */
  static coefficient(lift: number, qs: number): CrossFormula { return c('lift-coefficient', 'coefficient(lift, qs) = ⌊lift · 100 / qs⌋', qs > 0 ? Math.floor((lift * 100) / qs) : 0, nat(lift, qs) && qs > 0, 'coefficient', [lift, qs]) }
  /** ASPECT RATIO: span squared over the planform area. value ⌊span · span / area⌋. */
  static aspectratio(span: number, area: number): CrossFormula { return c('lift-aspectratio', 'aspectratio(span, area) = ⌊span · span / area⌋', area > 0 ? Math.floor((span * span) / area) : 0, nat(span, area) && area > 0, 'aspectratio', [span, area]) }
  /** EFFECTIVE ANGLE OF ATTACK: the geometric angle less the induced angle. value max(0, geometric − induced). */
  static angleofattack(geometric: number, induced: number): CrossFormula { return c('lift-angleofattack', 'angleofattack(geometric, induced) = max(0, geometric − induced)', Math.max(0, geometric - induced), nat(geometric, induced), 'angleofattack', [geometric, induced]) }
  /** LIFT-TO-DRAG RATIO: the glide number. value ⌊lift / drag⌋. */
  static liftdragratio(lift: number, drag: number): CrossFormula { return c('lift-liftdragratio', 'liftdragratio(lift, drag) = ⌊lift / drag⌋', drag > 0 ? Math.floor(lift / drag) : 0, nat(lift, drag) && drag > 0, 'liftdragratio', [lift, drag]) }
  /** BOUND CIRCULATION: lift over the density-speed product (Kutta–Joukowski). value ⌊lift / rhov⌋. */
  static circulation(lift: number, rhov: number): CrossFormula { return c('lift-circulation', 'circulation(lift, rhov) = ⌊lift / rhov⌋', rhov > 0 ? Math.floor(lift / rhov) : 0, nat(lift, rhov) && rhov > 0, 'circulation', [lift, rhov]) }
  /** STALL MARGIN: the angle left before the stall angle. value max(0, stall − current). */
  static stallmargin(stall: number, current: number): CrossFormula { return c('lift-stallmargin', 'stallmargin(stall, current) = max(0, stall − current)', Math.max(0, stall - current), nat(stall, current), 'stallmargin', [stall, current]) }
  /** WING LOADING: weight carried per unit of wing area. value ⌊weight / area⌋. */
  static loading(weight: number, area: number): CrossFormula { return c('lift-loading', 'loading(weight, area) = ⌊weight / area⌋', area > 0 ? Math.floor(weight / area) : 0, nat(weight, area) && area > 0, 'loading', [weight, area]) }
}

for (const name of ['angleofattack', 'aspectratio', 'circulation', 'coefficient', 'force', 'liftdragratio', 'loading', 'stallmargin'] as const)
  hexRegisterOf('lift', name, (LiftFormulas[name] as (...x: unknown[]) => unknown).bind(LiftFormulas))
