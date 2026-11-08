import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOGICGATES — DIGITAL LOGIC AS ARITHMETIC (chosen by the gate-level registry, not by hand). A gate is numbers: the
 *  boolean functions on 0/1 bits (and, or, xor, nand, nor), the 2:1 selector that picks one of two bits, the inputs a
 *  gate drives (fanout), and the delay a signal accrues down a chain (propagation). Crosses to `electronics` — a gate
 *  is what the circuit realises. A measure. */

const PROOF = 'logicgates arithmetic (and, or, xor, nand, nor on 0/1 bits; mux 2:1 selector; fanout driven inputs; propagation chain delay); the gate-level domain the registry surfaced; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'logicgates', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `logicgates.${name}`, params })

export class LogicgatesFormulas {
  /** AND: both bits set. value a ∧ b. */
  static and(a: number, b: number): CrossFormula { return c('logicgates-and', 'and(a, b) = a ∧ b', a & b, nat(a, b) && a <= 1 && b <= 1, 'and', [a, b]) }
  /** OR: either bit set. value a ∨ b. */
  static or(a: number, b: number): CrossFormula { return c('logicgates-or', 'or(a, b) = a ∨ b', a | b, nat(a, b) && a <= 1 && b <= 1, 'or', [a, b]) }
  /** XOR: the bits differ. value a ⊕ b. */
  static xor(a: number, b: number): CrossFormula { return c('logicgates-xor', 'xor(a, b) = a ⊕ b', a ^ b, nat(a, b) && a <= 1 && b <= 1, 'xor', [a, b]) }
  /** NAND: not both set. value 1 − (a ∧ b). */
  static nand(a: number, b: number): CrossFormula { return c('logicgates-nand', 'nand(a, b) = 1 − (a ∧ b)', Math.max(0, 1 - (a & b)), nat(a, b) && a <= 1 && b <= 1, 'nand', [a, b]) }
  /** NOR: neither set. value 1 − (a ∨ b). */
  static nor(a: number, b: number): CrossFormula { return c('logicgates-nor', 'nor(a, b) = 1 − (a ∨ b)', Math.max(0, 1 - (a | b)), nat(a, b) && a <= 1 && b <= 1, 'nor', [a, b]) }
  /** MUX: a 2:1 selector; sel picks b, else a. value sel ? b : a. */
  static mux(sel: number, a: number, b: number): CrossFormula { return c('logicgates-mux', 'mux(sel, a, b) = sel ? b : a', sel === 1 ? b : a, nat(sel, a, b) && sel <= 1 && a <= 1 && b <= 1, 'mux', [sel, a, b]) }
  /** FANOUT: inputs driven = gates each driving loads. value gates · loads. */
  static fanout(gates: number, loads: number): CrossFormula { return c('logicgates-fanout', 'fanout(gates, loads) = gates · loads', gates * loads, nat(gates, loads), 'fanout', [gates, loads]) }
  /** PROPAGATION: delay down a chain of gates. value gates · delay. */
  static propagation(gates: number, delay: number): CrossFormula { return c('logicgates-propagation', 'propagation(gates, delay) = gates · delay', gates * delay, nat(gates, delay), 'propagation', [gates, delay]) }
}

for (const name of ['and', 'fanout', 'mux', 'nand', 'nor', 'or', 'propagation', 'xor'] as const)
  hexRegisterOf('logicgates', name, (LogicgatesFormulas[name] as (...x: unknown[]) => unknown).bind(LogicgatesFormulas))
