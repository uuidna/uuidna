import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EngineFormulas — 8 exact-integer formulas of the engine domain, each at a hex address crossing to cross; develops the engine leads. */

const PROOF = "engine counts: displacement(x, y) = x · y; power(x, y) = x · y; torque(x, y) = x · y; cylinders(x, y) = x + y; compression(x, y) = x / y; rpm(x, y) = x / y; firingorders(x) = x!; valves(x, y) = x · y"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'engine', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `engine.${name}`, params })

export class EngineFormulas {
  /** displacement(x, y) = x · y. */
  static displacement(x: number, y: number): CrossFormula { return f('engine-displacement', 'displacement(x, y) = x · y', x * y, nat(x, y), 'displacement', [x, y]) }
  /** power(x, y) = x · y. */
  static power(x: number, y: number): CrossFormula { return f('engine-power', 'power(x, y) = x · y', x * y, nat(x, y), 'power', [x, y]) }
  /** torque(x, y) = x · y. */
  static torque(x: number, y: number): CrossFormula { return f('engine-torque', 'torque(x, y) = x · y', x * y, nat(x, y), 'torque', [x, y]) }
  /** cylinders(x, y) = x + y. */
  static cylinders(x: number, y: number): CrossFormula { return f('engine-cylinders', 'cylinders(x, y) = x + y', x + y, nat(x, y), 'cylinders', [x, y]) }
  /** compression(x, y) = x / y. */
  static compression(x: number, y: number): CrossFormula { return f('engine-compression', 'compression(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'compression', [x, y]) }
  /** rpm(x, y) = x / y. */
  static rpm(x: number, y: number): CrossFormula { return f('engine-rpm', 'rpm(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rpm', [x, y]) }
  /** firingorders(x) = x!. */
  static firingorders(x: number): CrossFormula { return f('engine-firingorders', 'firingorders(x) = x!', x <= 12 ? factOf(x) : 0, nat(x) && x <= 12, 'firingorders', [x]) }
  /** valves(x, y) = x · y. */
  static valves(x: number, y: number): CrossFormula { return f('engine-valves', 'valves(x, y) = x · y', x * y, nat(x, y), 'valves', [x, y]) }
}

for (const name of ['compression', 'cylinders', 'displacement', 'firingorders', 'power', 'rpm', 'torque', 'valves'] as const)
  hexRegisterOf('engine', name, (EngineFormulas[name] as (...x: unknown[]) => unknown).bind(EngineFormulas))
