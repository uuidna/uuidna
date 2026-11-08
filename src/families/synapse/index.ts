import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SynapseFormulas — 8 exact-integer formulas of the synapse domain, each at a hex address crossing to cross; develops the synapse leads. */

const PROOF = "synapse counts: vesicles(x, y) = x · y; cleft(x, y) = x / y; receptors(x, y) = x · y; delay(x, y) = x / y; strength(x, y) = x · 100 / y; plasticity(x, y) = max(0, x − y); transmitters(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'synapse', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `synapse.${name}`, params })

export class SynapseFormulas {
  /** vesicles(x, y) = x · y. */
  static vesicles(x: number, y: number): CrossFormula { return f('synapse-vesicles', 'vesicles(x, y) = x · y', x * y, nat(x, y), 'vesicles', [x, y]) }
  /** cleft(x, y) = x / y. */
  static cleft(x: number, y: number): CrossFormula { return f('synapse-cleft', 'cleft(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'cleft', [x, y]) }
  /** receptors(x, y) = x · y. */
  static receptors(x: number, y: number): CrossFormula { return f('synapse-receptors', 'receptors(x, y) = x · y', x * y, nat(x, y), 'receptors', [x, y]) }
  /** delay(x, y) = x / y. */
  static delay(x: number, y: number): CrossFormula { return f('synapse-delay', 'delay(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'delay', [x, y]) }
  /** strength(x, y) = x · 100 / y. */
  static strength(x: number, y: number): CrossFormula { return f('synapse-strength', 'strength(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'strength', [x, y]) }
  /** plasticity(x, y) = max(0, x − y). */
  static plasticity(x: number, y: number): CrossFormula { return f('synapse-plasticity', 'plasticity(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'plasticity', [x, y]) }
  /** transmitters(x, y) = x + y. */
  static transmitters(x: number, y: number): CrossFormula { return f('synapse-transmitters', 'transmitters(x, y) = x + y', x + y, nat(x, y), 'transmitters', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('synapse-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['cleft', 'combos', 'delay', 'plasticity', 'receptors', 'strength', 'transmitters', 'vesicles'] as const)
  hexRegisterOf('synapse', name, (SynapseFormulas[name] as (...x: unknown[]) => unknown).bind(SynapseFormulas))
