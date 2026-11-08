import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DnsFormulas — 8 exact-integer formulas of the dns domain, each at a hex address crossing to cross; develops the dns leads. */

const PROOF = "dns counts: ttl(x, y) = x · y; records(x, y) = x + y; labels(x, y) = x + y; cachehit(x, y) = x · 100 / y; queries(x, y) = x · y; zones(x, y) = x · y; nameservers(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'dns', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `dns.${name}`, params })

export class DnsFormulas {
  /** ttl(x, y) = x · y. */
  static ttl(x: number, y: number): CrossFormula { return f('dns-ttl', 'ttl(x, y) = x · y', x * y, nat(x, y), 'ttl', [x, y]) }
  /** records(x, y) = x + y. */
  static records(x: number, y: number): CrossFormula { return f('dns-records', 'records(x, y) = x + y', x + y, nat(x, y), 'records', [x, y]) }
  /** labels(x, y) = x + y. */
  static labels(x: number, y: number): CrossFormula { return f('dns-labels', 'labels(x, y) = x + y', x + y, nat(x, y), 'labels', [x, y]) }
  /** cachehit(x, y) = x · 100 / y. */
  static cachehit(x: number, y: number): CrossFormula { return f('dns-cachehit', 'cachehit(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'cachehit', [x, y]) }
  /** queries(x, y) = x · y. */
  static queries(x: number, y: number): CrossFormula { return f('dns-queries', 'queries(x, y) = x · y', x * y, nat(x, y), 'queries', [x, y]) }
  /** zones(x, y) = x · y. */
  static zones(x: number, y: number): CrossFormula { return f('dns-zones', 'zones(x, y) = x · y', x * y, nat(x, y), 'zones', [x, y]) }
  /** nameservers(x, y) = x + y. */
  static nameservers(x: number, y: number): CrossFormula { return f('dns-nameservers', 'nameservers(x, y) = x + y', x + y, nat(x, y), 'nameservers', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('dns-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['cachehit', 'combos', 'labels', 'nameservers', 'queries', 'records', 'ttl', 'zones'] as const)
  hexRegisterOf('dns', name, (DnsFormulas[name] as (...x: unknown[]) => unknown).bind(DnsFormulas))
