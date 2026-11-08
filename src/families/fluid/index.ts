import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FluidFormulas — 8 exact-integer formulas of the fluid domain, each at a hex address crossing to cross; develops the fluid leads. */

const PROOF = "fluid counts: flow(x, y) = x · y; volume(x, y, z) = x · y · z; head(x, y) = max(0, x − y); pipearea(x, y) = x · y; throughput(x, y) = x / y; litres(x, y) = x · y; pressuredrop(x, y) = max(0, x − y); valves(x, y) = x + y"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'fluid', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `fluid.${name}`, params })

export class FluidFormulas {
  /** flow(x, y) = x · y. */
  static flow(x: number, y: number): CrossFormula { return f('fluid-flow', 'flow(x, y) = x · y', x * y, nat(x, y), 'flow', [x, y]) }
  /** volume(x, y, z) = x · y · z. */
  static volume(x: number, y: number, z: number): CrossFormula { return f('fluid-volume', 'volume(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'volume', [x, y, z]) }
  /** head(x, y) = max(0, x − y). */
  static head(x: number, y: number): CrossFormula { return f('fluid-head', 'head(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'head', [x, y]) }
  /** pipearea(x, y) = x · y. */
  static pipearea(x: number, y: number): CrossFormula { return f('fluid-pipearea', 'pipearea(x, y) = x · y', x * y, nat(x, y), 'pipearea', [x, y]) }
  /** throughput(x, y) = x / y. */
  static throughput(x: number, y: number): CrossFormula { return f('fluid-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'throughput', [x, y]) }
  /** litres(x, y) = x · y. */
  static litres(x: number, y: number): CrossFormula { return f('fluid-litres', 'litres(x, y) = x · y', x * y, nat(x, y), 'litres', [x, y]) }
  /** pressuredrop(x, y) = max(0, x − y). */
  static pressuredrop(x: number, y: number): CrossFormula { return f('fluid-pressuredrop', 'pressuredrop(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'pressuredrop', [x, y]) }
  /** valves(x, y) = x + y. */
  static valves(x: number, y: number): CrossFormula { return f('fluid-valves', 'valves(x, y) = x + y', x + y, nat(x, y), 'valves', [x, y]) }
}

for (const name of ['flow', 'head', 'litres', 'pipearea', 'pressuredrop', 'throughput', 'valves', 'volume'] as const)
  hexRegisterOf('fluid', name, (FluidFormulas[name] as (...x: unknown[]) => unknown).bind(FluidFormulas))
