import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HASHING — THE HASH TABLE, AS ARITHMETIC (chosen by the public-API registry, not by hand). Placing keys is numbers:
 *  which bucket a key lands in, the load factor, collisions past capacity, the next probe slot, the birthday pairs that
 *  clash, a raw modulo, the capacity after a resize, and the average spread. Crosses to `indexing` — a hash is how an
 *  index finds a row. A measure. */

const PROOF = 'hashing arithmetic (bucket, load factor, collisions, linear probe, birthday pairs, modulo, resize capacity, distribution); the registry\'s hash-table domain; a measure crossed to indexing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hashing', dst: 'indexing', formula, value, proof: PROOF, ...extra }, holds, { name: `hashing.${name}`, params })

export class HashingFormulas {
  /** BUCKET: which bucket a key hashes to. value key mod buckets. */
  static bucket(key: number, buckets: number): CrossFormula { return c('hashing-bucket', 'bucket(key, buckets) = key mod buckets', buckets > 0 ? key % buckets : 0, nat(key, buckets) && buckets > 0, 'bucket', [key, buckets]) }
  /** LOAD FACTOR as a percentage. value ⌊entries · 100 / buckets⌋. */
  static loadfactor(entries: number, buckets: number): CrossFormula { return c('hashing-loadfactor', 'loadfactor(entries, buckets) = ⌊entries · 100 / buckets⌋', buckets > 0 ? Math.floor((entries * 100) / buckets) : 0, nat(entries, buckets) && buckets > 0, 'loadfactor', [entries, buckets]) }
  /** COLLISIONS: entries past the buckets available. value max(0, entries − buckets). */
  static collisions(entries: number, buckets: number): CrossFormula { return c('hashing-collisions', 'collisions(entries, buckets) = max(0, entries − buckets)', Math.max(0, entries - buckets), nat(entries, buckets), 'collisions', [entries, buckets]) }
  /** PROBE: the next slot under linear probing. value (slot + step) mod buckets. */
  static probe(slot: number, step: number, buckets: number): CrossFormula { return c('hashing-probe', 'probe(slot, step, buckets) = (slot + step) mod buckets', buckets > 0 ? (slot + step) % buckets : 0, nat(slot, step, buckets) && buckets > 0, 'probe', [slot, step, buckets]) }
  /** BIRTHDAY: the pairs of keys that can clash among n. value ⌊n · (n − 1) / 2⌋. */
  static birthday(n: number): CrossFormula { return c('hashing-birthday', 'birthday(n) = ⌊n · (n − 1) / 2⌋', Math.floor((n * Math.max(0, n - 1)) / 2), nat(n), 'birthday', [n]) }
  /** MODULO: a raw remainder. value a mod b. */
  static modulo(a: number, b: number): CrossFormula { return c('hashing-modulo', 'modulo(a, b) = a mod b', b > 0 ? a % b : 0, nat(a, b) && b > 0, 'modulo', [a, b]) }
  /** RESIZE: the capacity after growing by a factor. value capacity · factor. */
  static resize(capacity: number, factor: number): CrossFormula { return c('hashing-resize', 'resize(capacity, factor) = capacity · factor', capacity * factor, nat(capacity, factor), 'resize', [capacity, factor]) }
  /** DISTRIBUTION: the average entries per bucket. value ⌊entries / buckets⌋. */
  static distribution(entries: number, buckets: number): CrossFormula { return c('hashing-distribution', 'distribution(entries, buckets) = ⌊entries / buckets⌋', buckets > 0 ? Math.floor(entries / buckets) : 0, nat(entries, buckets) && buckets > 0, 'distribution', [entries, buckets]) }
}

for (const name of ['birthday', 'bucket', 'collisions', 'distribution', 'loadfactor', 'modulo', 'probe', 'resize'] as const)
  hexRegisterOf('hashing', name, (HashingFormulas[name] as (...x: unknown[]) => unknown).bind(HashingFormulas))
