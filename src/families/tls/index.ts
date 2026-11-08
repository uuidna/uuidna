import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TlsFormulas — 8 exact-integer formulas of the tls domain, each at a hex address crossing to cross; develops the tls leads. */

const PROOF = "tls counts: keybits(x) = 2^x; handshake(x, y) = x + y; suites(x, y) = x · y; sessions(x, y) = x · y; certchain(x, y) = x + y; ticketlife(x, y) = x / y; resumption(x, y) = x · 100 / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'tls', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `tls.${name}`, params })

export class TlsFormulas {
  /** keybits(x) = 2^x. */
  static keybits(x: number): CrossFormula { return f('tls-keybits', 'keybits(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'keybits', [x]) }
  /** handshake(x, y) = x + y. */
  static handshake(x: number, y: number): CrossFormula { return f('tls-handshake', 'handshake(x, y) = x + y', x + y, nat(x, y), 'handshake', [x, y]) }
  /** suites(x, y) = x · y. */
  static suites(x: number, y: number): CrossFormula { return f('tls-suites', 'suites(x, y) = x · y', x * y, nat(x, y), 'suites', [x, y]) }
  /** sessions(x, y) = x · y. */
  static sessions(x: number, y: number): CrossFormula { return f('tls-sessions', 'sessions(x, y) = x · y', x * y, nat(x, y), 'sessions', [x, y]) }
  /** certchain(x, y) = x + y. */
  static certchain(x: number, y: number): CrossFormula { return f('tls-certchain', 'certchain(x, y) = x + y', x + y, nat(x, y), 'certchain', [x, y]) }
  /** ticketlife(x, y) = x / y. */
  static ticketlife(x: number, y: number): CrossFormula { return f('tls-ticketlife', 'ticketlife(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ticketlife', [x, y]) }
  /** resumption(x, y) = x · 100 / y. */
  static resumption(x: number, y: number): CrossFormula { return f('tls-resumption', 'resumption(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'resumption', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('tls-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['certchain', 'combos', 'handshake', 'keybits', 'resumption', 'sessions', 'suites', 'ticketlife'] as const)
  hexRegisterOf('tls', name, (TlsFormulas[name] as (...x: unknown[]) => unknown).bind(TlsFormulas))
