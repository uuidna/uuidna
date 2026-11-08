import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DRAG — AERODYNAMIC RESISTANCE, AS ARITHMETIC. Moving through air is numbers: the drag force on a body, its drag
 *  coefficient, the induced drag of lift, the parasitic drag of shape and skin, the dynamic pressure of the stream,
 *  terminal velocity at balance, frontal area, and the Reynolds number of the flow. Crosses to `aerodynamics` — drag is
 *  what aerodynamics resolves. A measure. */

const PROOF = 'drag arithmetic (drag force, drag coefficient, induced drag, parasitic drag, dynamic pressure, terminal velocity, frontal area, Reynolds number); aerodynamic resistance as integers; a measure crossed to aerodynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'drag', dst: 'aerodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `drag.${name}`, params })

export class DragFormulas {
  /** DRAG FORCE: dynamic pressure times drag coefficient times frontal area, scaled. value ⌊q · cd · area / 1000⌋. */
  static force(q: number, cd: number, area: number): CrossFormula { return c('drag-force', 'force(q, cd, area) = ⌊q · cd · area / 1000⌋', Math.floor((q * cd * area) / 1000), nat(q, cd, area), 'force', [q, cd, area]) }
  /** DRAG COEFFICIENT: drag force over dynamic pressure, scaled by a thousand. value ⌊force · 1000 / dyn⌋. */
  static coefficient(force: number, dyn: number): CrossFormula { return c('drag-coefficient', 'coefficient(force, dyn) = ⌊force · 1000 / dyn⌋', dyn > 0 ? Math.floor((force * 1000) / dyn) : 0, nat(force, dyn) && dyn > 0, 'coefficient', [force, dyn]) }
  /** INDUCED DRAG: lift coefficient squared over aspect ratio. value ⌊cl · cl / ar⌋. */
  static induced(cl: number, ar: number): CrossFormula { return c('drag-induced', 'induced(cl, ar) = ⌊cl · cl / ar⌋', ar > 0 ? Math.floor((cl * cl) / ar) : 0, nat(cl, ar) && ar > 0, 'induced', [cl, ar]) }
  /** PARASITIC DRAG: form drag plus skin-friction drag. value form + skin. */
  static parasitic(form: number, skin: number): CrossFormula { return c('drag-parasitic', 'parasitic(form, skin) = form + skin', form + skin, nat(form, skin), 'parasitic', [form, skin]) }
  /** DYNAMIC PRESSURE: half the density times velocity squared. value ⌊rho · v · v / 2⌋. */
  static dynamicpressure(rho: number, v: number): CrossFormula { return c('drag-dynamicpressure', 'dynamicpressure(rho, v) = ⌊rho · v · v / 2⌋', Math.floor((rho * v * v) / 2), nat(rho, v), 'dynamicpressure', [rho, v]) }
  /** TERMINAL VELOCITY: weight balanced by the drag factor. value ⌊weight / dragfactor⌋. */
  static terminalvelocity(weight: number, dragfactor: number): CrossFormula { return c('drag-terminalvelocity', 'terminalvelocity(weight, dragfactor) = ⌊weight / dragfactor⌋', dragfactor > 0 ? Math.floor(weight / dragfactor) : 0, nat(weight, dragfactor) && dragfactor > 0, 'terminalvelocity', [weight, dragfactor]) }
  /** FRONTAL AREA: width times height of the body. value width · height. */
  static frontalarea(width: number, height: number): CrossFormula { return c('drag-frontalarea', 'frontalarea(width, height) = width · height', width * height, nat(width, height), 'frontalarea', [width, height]) }
  /** REYNOLDS NUMBER: speed times length over viscosity. value ⌊speed · length / visc⌋. */
  static reynolds(speed: number, length: number, visc: number): CrossFormula { return c('drag-reynolds', 'reynolds(speed, length, visc) = ⌊speed · length / visc⌋', visc > 0 ? Math.floor((speed * length) / visc) : 0, nat(speed, length, visc) && visc > 0, 'reynolds', [speed, length, visc]) }
}

for (const name of ['coefficient', 'dynamicpressure', 'force', 'frontalarea', 'induced', 'parasitic', 'reynolds', 'terminalvelocity'] as const)
  hexRegisterOf('drag', name, (DragFormulas[name] as (...x: unknown[]) => unknown).bind(DragFormulas))
