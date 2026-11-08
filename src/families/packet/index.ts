import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PacketFormulas — 8 exact-integer formulas of the packet domain, each at a hex address crossing to cross; develops the packet leads. */

const PROOF = "packet counts: mtu(x, y) = x + y; payload(x, y) = max(0, x − y); fragments(x, y) = ceil(x / y); headerbits(x, y) = x · y; throughput(x, y) = x / y; checksum(x, y) = x mod y; flags(x) = 2^x; pairs(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'packet', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `packet.${name}`, params })

export class PacketFormulas {
  /** mtu(x, y) = x + y. */
  static mtu(x: number, y: number): CrossFormula { return f('packet-mtu', 'mtu(x, y) = x + y', x + y, nat(x, y), 'mtu', [x, y]) }
  /** payload(x, y) = max(0, x − y). */
  static payload(x: number, y: number): CrossFormula { return f('packet-payload', 'payload(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'payload', [x, y]) }
  /** fragments(x, y) = ceil(x / y). */
  static fragments(x: number, y: number): CrossFormula { return f('packet-fragments', 'fragments(x, y) = ceil(x / y)', y > 0 ? Math.floor((x + y - 1) / y) : 0, nat(x, y) && y > 0, 'fragments', [x, y]) }
  /** headerbits(x, y) = x · y. */
  static headerbits(x: number, y: number): CrossFormula { return f('packet-headerbits', 'headerbits(x, y) = x · y', x * y, nat(x, y), 'headerbits', [x, y]) }
  /** throughput(x, y) = x / y. */
  static throughput(x: number, y: number): CrossFormula { return f('packet-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'throughput', [x, y]) }
  /** checksum(x, y) = x mod y. */
  static checksum(x: number, y: number): CrossFormula { return f('packet-checksum', 'checksum(x, y) = x mod y', y > 0 ? x % y : 0, nat(x, y) && y > 0, 'checksum', [x, y]) }
  /** flags(x) = 2^x. */
  static flags(x: number): CrossFormula { return f('packet-flags', 'flags(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'flags', [x]) }
  /** pairs(x, y) = C(x, y). */
  static pairs(x: number, y: number): CrossFormula { return f('packet-pairs', 'pairs(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'pairs', [x, y]) }
}

for (const name of ['checksum', 'flags', 'fragments', 'headerbits', 'mtu', 'pairs', 'payload', 'throughput'] as const)
  hexRegisterOf('packet', name, (PacketFormulas[name] as (...x: unknown[]) => unknown).bind(PacketFormulas))
