import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RAY — A HEX-PROGRAM UUID SEEN AS PROGRAMMABLE RAYS AND STREAMS. An RFC 9562 v8 UUID is 32 hex nibbles / 128 bits; a
 *  RAY is one nibble emanating from the centre at its own angle, carrying a magnitude 0..15; a STREAM is a composition of
 *  rays — a walk through the program. The 32 rays divide the turn into equal sectors, each ray has the one across the
 *  centre (its opposite), and a ray's double-opposite returns to it, so every stream closes. These are deterministic
 *  integer identities over positions and nibble values — no randomness, nothing fabricated. Crosses to `merkaba`, the
 *  trinity and flow family: 32 rays fold onto 16 and the fold is trinity-friendly. */

const NIBBLES = 32 // hex digits (rays) in a UUID
const BITS = 128 // bits in a UUID
const FREE = 122 // v8 free bits (128 − 4 version − 2 variant)
const TURN = 360 // degrees in one full sweep
const PROOF = 'a v8 UUID is 32 hex nibbles / 128 bits; each nibble is a ray emanating from the centre at angle (i·360/32)|0 carrying magnitude 0..15; ray i has opposite (i+16)%32 so the double-opposite returns and every stream closes; deterministic integer identities over positions and nibble values'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const y = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ray', dst: 'merkaba', formula, value, proof: PROOF, ...extra }, holds, { name: `ray.${name}`, params })

export class RayFormulas {
  /** The rays in a UUID: 32 hex nibbles emanating from the centre. */
  static nibbles(): CrossFormula { return y('ray-nibbles', 'nibbles() = 32 hex rays in a UUID', NIBBLES, true, 'nibbles', []) }
  /** The bits in a UUID: 128. */
  static bits(): CrossFormula { return y('ray-bits', 'bits() = 128', BITS, true, 'bits', []) }
  /** The free bits of a v8 UUID: 128 − 4 version − 2 variant = 122, the programmable rays' capacity. */
  static free(): CrossFormula { return y('ray-free', 'free() = 122 (v8 free bits)', FREE, true, 'free', []) }
  /** The angle of the i-th ray: (i·360/32)|0 degrees (360/32 = 11.25 ≈ 11 per ray after integer rounding). */
  static angle(i: number): CrossFormula { return y('ray-angle', 'angle(i) = (i·360/32)|0 ≈ i·11 degrees', (i * TURN / NIBBLES) | 0, nat(i) && i < NIBBLES, 'angle', [i]) }
  /** The magnitude the i-th ray carries: the nibble value v, 0..15. */
  static ray(i: number, v: number): CrossFormula { return y('ray-ray', 'ray(i, v) = v, the value carried by the i-th ray', v, nat(i, v) && i < NIBBLES && v < 16, 'ray', [i, v]) }
  /** A nibble's magnitude, 0..15 — the length of one ray. */
  static magnitude(v: number): CrossFormula { return y('ray-magnitude', 'magnitude(v) = v (0..15)', v, nat(v) && v < 16, 'magnitude', [v]) }
  /** The ray across the centre from the i-th: (i + 16) % 32. */
  static opposite(i: number): CrossFormula { return y('ray-opposite', 'opposite(i) = (i + 16) % 32', (i + 16) % NIBBLES, nat(i) && i < NIBBLES, 'opposite', [i]) }
  /** A 3-ray stream's composition length: the distinct rays among [a, b, c]. */
  static stream(a: number, b: number, c: number): CrossFormula { return y('ray-stream', 'stream(a, b, c) = |distinct rays among [a, b, c]|', new Set([a, b, c]).size, nat(a, b, c) && a < NIBBLES && b < NIBBLES && c < NIBBLES, 'stream', [a, b, c]) }
  /** The stream closes: a ray's double-opposite returns to it, so the value is 1 for every ray. */
  static closes(i: number): CrossFormula { return y('ray-closes', 'closes(i) = [opposite(opposite(i)) = i]', ((((i + 16) % NIBBLES) + 16) % NIBBLES) === i ? 1 : 0, nat(i) && i < NIBBLES, 'closes', [i]) }
  /** The total angle swept by n rays: (n·360/32)|0 degrees. */
  static sweep(n: number): CrossFormula { return y('ray-sweep', 'sweep(n) = (n·360/32)|0 degrees', (n * TURN / NIBBLES) | 0, nat(n) && n <= NIBBLES, 'sweep', [n]) }
  /** The sectors n rays fill: min(n, 32), since the turn holds 32 sectors. */
  static sectors(n: number): CrossFormula { return y('ray-sectors', 'sectors(n) = min(n, 32)', Math.min(n, NIBBLES), nat(n), 'sectors', [n]) }
  /** A ray's parity: the nibble's low bit v & 1. */
  static parity(v: number): CrossFormula { return y('ray-parity', 'parity(v) = v & 1', v & 1, nat(v) && v < 16, 'parity', [v]) }
  /** Fold the 32 rays onto 16: i < 16 ? i : 31 − i, a trinity-friendly count that mirrors the far half onto the near. */
  static foldpair(i: number): CrossFormula { return y('ray-foldpair', 'foldpair(i) = i < 16 ? i : 31 − i', i < 16 ? i : 31 - i, nat(i) && i < NIBBLES, 'foldpair', [i]) }
  /** A stream's program length, in steps. */
  static programlen(steps: number): CrossFormula { return y('ray-programlen', 'programlen(steps) = steps', steps, nat(steps), 'programlen', [steps]) }
  /** Two nibbles into one byte of the address: hi·16 + lo. */
  static address(hi: number, lo: number): CrossFormula { return y('ray-address', 'address(hi, lo) = hi·16 + lo', hi * 16 + lo, nat(hi, lo) && hi < 16 && lo < 16, 'address', [hi, lo]) }
}

for (const name of ['address', 'angle', 'bits', 'closes', 'foldpair', 'free', 'magnitude', 'nibbles', 'opposite', 'parity', 'programlen', 'ray', 'sectors', 'stream', 'sweep'] as const)
  hexRegisterOf('ray', name, (RayFormulas[name] as (...x: unknown[]) => unknown).bind(RayFormulas))
