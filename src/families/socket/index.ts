import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SocketFormulas — 8 exact-integer formulas of the socket domain, each at a hex address crossing to cross; develops the socket leads. */

const PROOF = "socket counts: ports(x) = 2^x; backlog(x, y) = x + y; connections(x, y) = x · y; timeout(x, y) = x / y; buffers(x, y) = x · y; states(x, y) = x + y; handshake(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'socket', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `socket.${name}`, params })

export class SocketFormulas {
  /** ports(x) = 2^x. */
  static ports(x: number): CrossFormula { return f('socket-ports', 'ports(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'ports', [x]) }
  /** backlog(x, y) = x + y. */
  static backlog(x: number, y: number): CrossFormula { return f('socket-backlog', 'backlog(x, y) = x + y', x + y, nat(x, y), 'backlog', [x, y]) }
  /** connections(x, y) = x · y. */
  static connections(x: number, y: number): CrossFormula { return f('socket-connections', 'connections(x, y) = x · y', x * y, nat(x, y), 'connections', [x, y]) }
  /** timeout(x, y) = x / y. */
  static timeout(x: number, y: number): CrossFormula { return f('socket-timeout', 'timeout(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'timeout', [x, y]) }
  /** buffers(x, y) = x · y. */
  static buffers(x: number, y: number): CrossFormula { return f('socket-buffers', 'buffers(x, y) = x · y', x * y, nat(x, y), 'buffers', [x, y]) }
  /** states(x, y) = x + y. */
  static states(x: number, y: number): CrossFormula { return f('socket-states', 'states(x, y) = x + y', x + y, nat(x, y), 'states', [x, y]) }
  /** handshake(x, y) = x + y. */
  static handshake(x: number, y: number): CrossFormula { return f('socket-handshake', 'handshake(x, y) = x + y', x + y, nat(x, y), 'handshake', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('socket-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['backlog', 'buffers', 'combos', 'connections', 'handshake', 'ports', 'states', 'timeout'] as const)
  hexRegisterOf('socket', name, (SocketFormulas[name] as (...x: unknown[]) => unknown).bind(SocketFormulas))
