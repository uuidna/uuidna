import { gcdOf, hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GROUPTHEORY — FINITE GROUPS AS ARITHMETIC. The structure of a finite group is counting: the order of a direct product,
 *  the cosets Lagrange's theorem carves out, the order of a cyclic group, the index of a subgroup, how cosets tile a group,
 *  the factorial order of a symmetric group, a generator raised to a power, and the order of a single element. Crosses to
 *  `algebra` — group theory is the structure algebra reasons over. Exact, finite, hex-addressable. */

const PROOF = 'group theory arithmetic (direct-product order, Lagrange cosets, cyclic order, subgroup index, coset count, symmetric-group order n!, generator power aᵏ mod n, element order n/gcd); every value an exact finite integer; crossed to algebra'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const fact = (n: number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r }
const modpow = (a: number, k: number, m: number): number => { if (m <= 0) return 0; let r = 1 % m, x = a % m, e = k; while (e > 0) { if (e & 1) r = (r * x) % m; x = (x * x) % m; e = Math.floor(e / 2) } return r }
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'grouptheory', dst: 'algebra', formula, value, proof: PROOF, ...extra }, holds, { name: `grouptheory.${name}`, params })

export class GrouptheoryFormulas {
  /** DIRECT-PRODUCT ORDER: |Z_a × Z_b|. value a · b. */
  static order(a: number, b: number): CrossFormula { return c('grouptheory-order', 'order(a, b) = a · b', a * b, nat(a, b), 'order', [a, b]) }
  /** COSETS (Lagrange): the left cosets of a subgroup of order h in a group of order g. value ⌊g / h⌋. */
  static cosets(g: number, h: number): CrossFormula { return c('grouptheory-cosets', 'cosets(g, h) = ⌊g / h⌋', h > 0 ? Math.floor(g / h) : 0, nat(g, h) && h > 0, 'cosets', [g, h]) }
  /** CYCLIC ORDER: the order of the cyclic group Z_n. value n. */
  static cyclicorder(n: number): CrossFormula { return c('grouptheory-cyclicorder', 'cyclicorder(n) = n', n, nat(n) && n > 0, 'cyclicorder', [n]) }
  /** SUBGROUP INDEX [G:H] = |G| / |H|. value ⌊g / h⌋. */
  static subgroupindex(g: number, h: number): CrossFormula { return c('grouptheory-subgroupindex', 'subgroupindex(g, h) = ⌊g / h⌋', h > 0 ? Math.floor(g / h) : 0, nat(g, h) && h > 0, 'subgroupindex', [g, h]) }
  /** COSET COUNT: how many cosets of size h tile a group of order g. value ⌊g / h⌋. */
  static cosetcount(g: number, h: number): CrossFormula { return c('grouptheory-cosetcount', 'cosetcount(g, h) = ⌊g / h⌋', h > 0 ? Math.floor(g / h) : 0, nat(g, h) && h > 0, 'cosetcount', [g, h]) }
  /** SYMMETRIC-GROUP ORDER: |S_n| = n!. value n!. */
  static symmetricorder(n: number): CrossFormula { return c('grouptheory-symmetricorder', 'symmetricorder(n) = n!', fact(n), nat(n) && n <= 12, 'symmetricorder', [n]) }
  /** GENERATOR POWER: a generator a raised to the power k in Z_n. value aᵏ mod n. */
  static generatorpower(a: number, k: number, n: number): CrossFormula { return c('grouptheory-generatorpower', 'generatorpower(a, k, n) = aᵏ mod n', modpow(a, k, n), nat(a, k, n) && n > 0, 'generatorpower', [a, k, n]) }
  /** ELEMENT ORDER: the order of element a in the cyclic group Z_n. value n / gcd(a, n). */
  static elementorder(a: number, n: number): CrossFormula { const d = gcdOf(a, n); return c('grouptheory-elementorder', 'elementorder(a, n) = n / gcd(a, n)', n > 0 && d > 0 ? Math.floor(n / d) : 0, nat(a, n) && n > 0, 'elementorder', [a, n]) }
}

for (const name of ['cosetcount', 'cosets', 'cyclicorder', 'elementorder', 'generatorpower', 'order', 'subgroupindex', 'symmetricorder'] as const)
  hexRegisterOf('grouptheory', name, (GrouptheoryFormulas[name] as (...x: unknown[]) => unknown).bind(GrouptheoryFormulas))
