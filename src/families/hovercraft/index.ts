import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HOVERCRAFT — scaffolded integer measures crossed to physics. Every output an exact finite nonnegative integer. */

const PROOF = 'hovercraft arithmetic (liftpressure, skirtarea, payload, speed, fanpower, clearance, cushionforce, efficiency); scaffolded from the integer-op palette; a measure crossed to physics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hovercraft', dst: 'physics', formula, value, proof: PROOF, ...extra }, holds, { name: `hovercraft.${name}`, params })

export class HovercraftFormulas {
  static liftpressure(x: number, y: number): CrossFormula { return c('hovercraft-liftpressure', 'liftpressure(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'liftpressure', [x, y]) }
  static skirtarea(x: number, y: number): CrossFormula { return c('hovercraft-skirtarea', 'skirtarea(x, y) = x · y', x * y, nat(x, y), 'skirtarea', [x, y]) }
  static payload(x: number, y: number): CrossFormula { return c('hovercraft-payload', 'payload(x, y) = x · y', x * y, nat(x, y), 'payload', [x, y]) }
  static speed(x: number, y: number): CrossFormula { return c('hovercraft-speed', 'speed(x, y) = x · y', x * y, nat(x, y), 'speed', [x, y]) }
  static fanpower(x: number, y: number): CrossFormula { return c('hovercraft-fanpower', 'fanpower(x, y) = x · y', x * y, nat(x, y), 'fanpower', [x, y]) }
  static clearance(x: number, y: number): CrossFormula { return c('hovercraft-clearance', 'clearance(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'clearance', [x, y]) }
  static cushionforce(x: number, y: number): CrossFormula { return c('hovercraft-cushionforce', 'cushionforce(x, y) = x · y', x * y, nat(x, y), 'cushionforce', [x, y]) }
  static efficiency(x: number, y: number): CrossFormula { return c('hovercraft-efficiency', 'efficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
}

for (const name of ['clearance', 'cushionforce', 'efficiency', 'fanpower', 'liftpressure', 'payload', 'skirtarea', 'speed'] as const)
  hexRegisterOf('hovercraft', name, (HovercraftFormulas[name] as (...x: unknown[]) => unknown).bind(HovercraftFormulas))
