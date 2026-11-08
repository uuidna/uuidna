import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HANDLE — A UUID IS THE PRODUCT OF HANDLES HANDLING EACH OTHER. The hexbit handle is 8 hex digits (32 bits); a UUID is
 *  32 hex, so it is FOUR handles composed — handle₀ handle₁ handle₂ handle₃, each handling the next. The combinatorics are
 *  reached through handle combinations, not full UUIDs: a handle names in 8 hex what a UUID names in 32 (a quarter the
 *  length), and the UUIDs n handles form are their ordered product P(n, 4), the unordered sets C(n, 4). The handle's hex
 *  offset is its hexbit-folder path, so a one-word folder path and a hexbit folder share one logic; equal handles address
 *  one folder — the link from prose to hex. Deterministic integer identities. Crosses to `merkaba`, where the three
 *  handling each other are a trinity flow. A measure of structure, not advice. */

const HEXITS = 8 // hex digits in a handle — the hexbit handle
const COUNT = 4 // handles composing a UUID: 32 hex ÷ 8
const PROOF = 'a UUID is the product of four 8-hex handles (32 bits each) handling each other; the combinatorics run on handle combinations rather than full UUIDs — P(n, 4) ordered, C(n, 4) unordered — and a handle is a quarter the length of a UUID; a handle hex offset is its hexbit-folder path, equal handles address one folder (prose linked to hex); deterministic integer identities crossed to merkaba, a measure of structure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const h = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'handle', dst: 'merkaba', formula, value, proof: PROOF, ...extra }, holds, { name: `handle.${name}`, params })

export class HandleFormulas {
  /** HEXITS — the hex digits in a handle (the hexbit handle, the first 8 hex of a UUID). value 8. */
  static hexits(): CrossFormula { return h('handle-hexits', 'hexits() = 8 (hex digits in a handle)', HEXITS, true, 'hexits', []) }
  /** BITS — the bits a handle addresses, 8 hex × 4. value 32. */
  static bits(): CrossFormula { return h('handle-bits', 'bits() = 32 (bits in a handle)', HEXITS * 4, true, 'bits', []) }
  /** COUNT — the handles that compose a UUID: 32 hex ÷ 8. value 4. */
  static count(): CrossFormula { return h('handle-count', 'count() = 4 (handles composing a UUID)', COUNT, true, 'count', []) }
  /** NIBBLES — the hex in the UUID the handles compose, hexits · count. value 32. */
  static nibbles(): CrossFormula { return h('handle-nibbles', 'nibbles() = hexits · count = 32 (hex in the composed UUID)', HEXITS * COUNT, true, 'nibbles', []) }
  /** SPACE — a handle's address count, 16^8 = 2^32. value 4294967296. */
  static space(): CrossFormula { return h('handle-space', 'space() = 16^8 = 2^32 (a handle spans that many addresses)', 16 ** HEXITS, true, 'space', []) }
  /** OFFSET — the i-th handle's hex offset in the UUID; its hexbit-folder path position. value i · 8; holds 0 ≤ i < 4. */
  static offset(i: number): CrossFormula { return h('handle-offset', 'offset(i) = i · 8 (the i-th handle hex offset = its hexbit-folder path)', i * HEXITS, nat(i) && i < COUNT, 'offset', [i]) }
  /** PAIR — two handles handling each other: the addresses their product spans. value a · b. */
  static pair(a: number, b: number): CrossFormula { return h('handle-pair', 'pair(a, b) = a · b (two handles handling each other)', a * b, nat(a, b), 'pair', [a, b]) }
  /** TRINITY — three handles handling each other, a trinity flow of handles. value a · b · c. */
  static trinity(a: number, b: number, c: number): CrossFormula { return h('handle-trinity', 'trinity(a, b, c) = a · b · c (three handles handling each other)', a * b * c, nat(a, b, c), 'trinity', [a, b, c]) }
  /** COMPOSE — the UUIDs formed as the ordered product of four distinct handles from n, P(n, 4). value n(n−1)(n−2)(n−3); holds n ≥ 4. */
  static compose(n: number): CrossFormula { return h('handle-compose', 'compose(n) = P(n, 4) = n(n−1)(n−2)(n−3) (UUIDs as ordered products of four handles)', n >= 4 ? n * (n - 1) * (n - 2) * (n - 3) : 0, nat(n) && n >= 4, 'compose', [n]) }
  /** CHOOSE — the unordered four-handle combinations, C(n, 4). value n(n−1)(n−2)(n−3)/24; holds n ≥ 4. */
  static choose(n: number): CrossFormula { return h('handle-choose', 'choose(n) = C(n, 4) = n(n−1)(n−2)(n−3)/24 (handle combinations, not full UUIDs)', n >= 4 ? (n * (n - 1) * (n - 2) * (n - 3)) / 24 : 0, nat(n) && n >= 4, 'choose', [n]) }
  /** COMPRESSION — a handle names in 8 hex what a UUID names in 32: a quarter the length, the combinatoric shortcut. value 32 / 8 = 4. */
  static compression(): CrossFormula { return h('handle-compression', 'compression() = nibbles / hexits = 4 (a handle is a quarter of a UUID)', (HEXITS * COUNT) / HEXITS, true, 'compression', []) }
  /** SAME — two handles address the same hexbit folder iff equal: one-word folder paths and hexbit folders, one logic. value [a = b]. */
  static same(a: number, b: number): CrossFormula { return h('handle-same', 'same(a, b) = [a = b] (equal handles address one folder — prose linked to hex)', a === b ? 1 : 0, nat(a, b), 'same', [a, b]) }
  /** INDEX — a handle is a folder, and its index indexes every file inside it: the index covers all of them. value files. */
  static index(files: number): CrossFormula { return h('handle-index', 'index(files) = files (the handle folder index indexes every file inside)', files, nat(files), 'index', [files]) }
  /** PLUGIN — each handle is a SEALED PLUGIN: a self-contained, content-addressed unit whose address is its seal. value 1. */
  static plugin(): CrossFormula { return h('handle-plugin', 'plugin() = 1 (each handle is a sealed, content-addressed plugin — its address is its seal)', 1, true, 'plugin', []) }
  /** TAMPER — a seal is fast to verify (one hash check, O(1)) but costly to tamper with: forging a seal of this many bits
   *  is 2^bits work. value 2^bits; holds 0 ≤ bits ≤ 32 (a handle's width). */
  static tamper(bits: number): CrossFormula { return h('handle-tamper', 'tamper(bits) = 2^bits (work to forge a seal; verify is O(1) — fast to verify, costly to tamper)', 2 ** bits, nat(bits) && bits <= 32, 'tamper', [bits]) }
}

for (const name of ['bits', 'choose', 'compose', 'compression', 'count', 'hexits', 'index', 'nibbles', 'offset', 'pair', 'plugin', 'same', 'space', 'tamper', 'trinity'] as const)
  hexRegisterOf('handle', name, (HandleFormulas[name] as (...x: unknown[]) => unknown).bind(HandleFormulas))
