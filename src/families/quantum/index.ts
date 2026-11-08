import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** QUANTUM — scaffolded integer measures crossed to physics. Every output an exact finite nonnegative integer. */

const PROOF = 'quantum arithmetic (qubits, states, gatecount, entanglementpairs, superposition, circuitdepth, shots, fidelity); scaffolded from the integer-op palette; a measure crossed to physics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'quantum', dst: 'physics', formula, value, proof: PROOF, ...extra }, holds, { name: `quantum.${name}`, params })

export class QuantumFormulas {
  static qubits(x: number, y: number): CrossFormula { return c('quantum-qubits', 'qubits(x, y) = x + y', x + y, nat(x, y), 'qubits', [x, y]) }
  static states(x: number): CrossFormula { return c('quantum-states', 'states(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'states', [x]) }
  static gatecount(x: number, y: number): CrossFormula { return c('quantum-gatecount', 'gatecount(x, y) = x · y', x * y, nat(x, y), 'gatecount', [x, y]) }
  static entanglementpairs(x: number, y: number): CrossFormula { return c('quantum-entanglementpairs', 'entanglementpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'entanglementpairs', [x, y]) }
  static superposition(x: number): CrossFormula { return c('quantum-superposition', 'superposition(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'superposition', [x]) }
  static circuitdepth(x: number, y: number): CrossFormula { return c('quantum-circuitdepth', 'circuitdepth(x, y) = x + y', x + y, nat(x, y), 'circuitdepth', [x, y]) }
  static shots(x: number, y: number): CrossFormula { return c('quantum-shots', 'shots(x, y) = x · y', x * y, nat(x, y), 'shots', [x, y]) }
  static fidelity(x: number, y: number): CrossFormula { return c('quantum-fidelity', 'fidelity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'fidelity', [x, y]) }
}

for (const name of ['circuitdepth', 'entanglementpairs', 'fidelity', 'gatecount', 'qubits', 'shots', 'states', 'superposition'] as const)
  hexRegisterOf('quantum', name, (QuantumFormulas[name] as (...x: unknown[]) => unknown).bind(QuantumFormulas))
