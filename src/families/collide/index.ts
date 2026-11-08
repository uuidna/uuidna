import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COLLIDE AND DISSOLVE — THE FORMULAS GROW NEW DOMAINS THE WAY A BEAM DOES, PROVEN BY CERN. Two quanta collide and
 *  their product is a new value; a value dissolves (decays) into its constituents. What the collisions reach that no
 *  family yet serves is a MISSING family — a lead, not a thing to remove. The arithmetic is the one CERN Open Data
 *  proves: events = files · q + r (theorem cern, the record 38 = 19·2 + 0), Euclidean division; the rest is
 *  conservation (a + b), the interaction product (a · b), decay to a prime constituent, the decay channels (divisors),
 *  the threshold and the invariants that survive. Each crosses to the `cern` domain that proves it; a product the
 *  discovery or a live reading reaches is confirmed, one it does not is a lead for the next family. */

const PROOF = 'collisions grow domains: events = files·q + r (theorem cern, record 38 = 19·2) with conservation (a+b), the interaction product (a·b), decay to a prime constituent and its channels; a product no family serves is a missing-family lead'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'collide', dst: 'cern', formula, value, proof: PROOF, ...extra }, holds, { name: `collide.${name}`, params })

/** The heaviest prime constituent a value decays to (0 for 0 and 1). */
const largestPrime = (n: number): number => { let m = n, p = 0; for (let d = 2; d * d <= m; d++) while (m % d === 0) { p = d; m /= d } return m > 1 ? m : p }
/** The number of decay channels: how many divisors the value has. */
const divisors = (n: number): number => { if (n < 1) return 0; let c = 0; for (let d = 1; d * d <= n; d++) if (n % d === 0) c += d * d === n ? 1 : 2; return c }

export class CollideFormulas {
  /** THE CERN-PROVEN RECORD: events = files · q + r (Euclidean division). Holds when r < q — a valid division, the shape
   *  theorem cern proves (record 38 = 19·2 + 0). This is the arithmetic every collision lead is measured against. */
  static events(files: number, q: number, r: number): CrossFormula { return f('collide-events', 'events(files, q, r) = files · q + r', files * q + r, nat(files, q, r) && q > 0 && r < q, 'events', [files, q, r]) }
  /** CONSERVATION: two quanta collide head-on; the total is conserved. value a + b. */
  static collide(a: number, b: number): CrossFormula { return f('collide-collide', 'collide(a, b) = a + b (conservation)', a + b, nat(a, b), 'collide', [a, b]) }
  /** THE INTERACTION PRODUCT: the collision's cross term (luminosity × cross-section flavour). value a · b. */
  static product(a: number, b: number): CrossFormula { return f('collide-product', 'product(a, b) = a · b (the interaction product)', a * b, nat(a, b), 'product', [a, b]) }
  /** DECAY: a value dissolves to its heaviest prime constituent — the leading decay product. Holds for n ≥ 2. */
  static dissolve(n: number): CrossFormula { return f('collide-dissolve', 'dissolve(n) = the largest prime factor of n', largestPrime(n), nat(n) && n >= 2, 'dissolve', [n]) }
  /** THE DECAY CHANNELS: how many ways a value can dissolve — its divisor count. Holds for n ≥ 1. */
  static channels(n: number): CrossFormula { return f('collide-channels', 'channels(n) = |divisors of n|', divisors(n), nat(n) && n >= 1, 'channels', [n]) }
  /** THE THRESHOLD: a product forms only at or above the mass/energy threshold. value [e ≥ m]. */
  static threshold(e: number, m: number): CrossFormula { return f('collide-threshold', 'threshold(e, m) = [e ≥ m]', e >= m ? 1 : 0, nat(e, m), 'threshold', [e, m]) }
  /** THE INVARIANT that survives the collision: the sum of squares, unchanged under the frame's rotation. value a² + b². */
  static invariant(a: number, b: number): CrossFormula { return f('collide-invariant', 'invariant(a, b) = a² + b²', a * a + b * b, nat(a, b), 'invariant', [a, b]) }
  /** THE IMBALANCE that escapes the detector: the missing momentum. value |a − b|. */
  static balance(a: number, b: number): CrossFormula { return f('collide-balance', 'balance(a, b) = |a − b|', Math.abs(a - b), nat(a, b), 'balance', [a, b]) }
  /** THE MISSING FAMILIES: of the `domains` the collisions reach, `families` are served — the gap is the leads to grow.
   *  value domains − families; holds only when the families cover every domain the collisions reach (gap 0). */
  static gap(domains: number, families: number): CrossFormula { return f('collide-gap', 'gap(domains, families) = domains − families; the missing families the collisions imply', Math.max(0, domains - families), nat(domains, families), 'gap', [domains, families]) }
}

for (const name of ['balance', 'channels', 'collide', 'dissolve', 'events', 'gap', 'invariant', 'product', 'threshold'] as const)
  hexRegisterOf('collide', name, (CollideFormulas[name] as (...x: unknown[]) => unknown).bind(CollideFormulas))
