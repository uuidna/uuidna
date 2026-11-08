import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ProtocolFormulas — 8 exact-integer formulas of the protocol domain, each at a hex address crossing to cross; develops the protocol leads. */

const PROOF = "protocol counts: layers(x, y) = x + y; states(x, y) = x · y; headers(x, y) = x · y; versions(x, y) = x + y; messages(x, y) = x · y; handshakes(x, y) = x + y; opcodes(x) = 2^x; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'protocol', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `protocol.${name}`, params })

export class ProtocolFormulas {
  /** layers(x, y) = x + y. */
  static layers(x: number, y: number): CrossFormula { return f('protocol-layers', 'layers(x, y) = x + y', x + y, nat(x, y), 'layers', [x, y]) }
  /** states(x, y) = x · y. */
  static states(x: number, y: number): CrossFormula { return f('protocol-states', 'states(x, y) = x · y', x * y, nat(x, y), 'states', [x, y]) }
  /** headers(x, y) = x · y. */
  static headers(x: number, y: number): CrossFormula { return f('protocol-headers', 'headers(x, y) = x · y', x * y, nat(x, y), 'headers', [x, y]) }
  /** versions(x, y) = x + y. */
  static versions(x: number, y: number): CrossFormula { return f('protocol-versions', 'versions(x, y) = x + y', x + y, nat(x, y), 'versions', [x, y]) }
  /** messages(x, y) = x · y. */
  static messages(x: number, y: number): CrossFormula { return f('protocol-messages', 'messages(x, y) = x · y', x * y, nat(x, y), 'messages', [x, y]) }
  /** handshakes(x, y) = x + y. */
  static handshakes(x: number, y: number): CrossFormula { return f('protocol-handshakes', 'handshakes(x, y) = x + y', x + y, nat(x, y), 'handshakes', [x, y]) }
  /** opcodes(x) = 2^x. */
  static opcodes(x: number): CrossFormula { return f('protocol-opcodes', 'opcodes(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'opcodes', [x]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('protocol-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'handshakes', 'headers', 'layers', 'messages', 'opcodes', 'states', 'versions'] as const)
  hexRegisterOf('protocol', name, (ProtocolFormulas[name] as (...x: unknown[]) => unknown).bind(ProtocolFormulas))
