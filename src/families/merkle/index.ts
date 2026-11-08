import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MERKLE — scaffolded integer measures crossed to graphtheory. Every output an exact finite nonnegative integer. */

const PROOF = 'merkle arithmetic (leaves, treeheight, proofsize, hashcombos, nodecount, siblingpairs, rootpaths, verificationsteps); scaffolded from the integer-op palette; a measure crossed to graphtheory'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'merkle', dst: 'graphtheory', formula, value, proof: PROOF, ...extra }, holds, { name: `merkle.${name}`, params })

export class MerkleFormulas {
  static leaves(x: number): CrossFormula { return c('merkle-leaves', 'leaves(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'leaves', [x]) }
  static treeheight(x: number, y: number): CrossFormula { return c('merkle-treeheight', 'treeheight(x, y) = x + y', x + y, nat(x, y), 'treeheight', [x, y]) }
  static proofsize(x: number, y: number): CrossFormula { return c('merkle-proofsize', 'proofsize(x, y) = x · y', x * y, nat(x, y), 'proofsize', [x, y]) }
  static hashcombos(x: number, y: number): CrossFormula { return c('merkle-hashcombos', 'hashcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'hashcombos', [x, y]) }
  static nodecount(x: number, y: number): CrossFormula { return c('merkle-nodecount', 'nodecount(x, y) = x · y', x * y, nat(x, y), 'nodecount', [x, y]) }
  static siblingpairs(x: number, y: number): CrossFormula { return c('merkle-siblingpairs', 'siblingpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'siblingpairs', [x, y]) }
  static rootpaths(x: number, y: number): CrossFormula { return c('merkle-rootpaths', 'rootpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'rootpaths', [x, y]) }
  static verificationsteps(x: number, y: number): CrossFormula { return c('merkle-verificationsteps', 'verificationsteps(x, y) = x + y', x + y, nat(x, y), 'verificationsteps', [x, y]) }
}

for (const name of ['hashcombos', 'leaves', 'nodecount', 'proofsize', 'rootpaths', 'siblingpairs', 'treeheight', 'verificationsteps'] as const)
  hexRegisterOf('merkle', name, (MerkleFormulas[name] as (...x: unknown[]) => unknown).bind(MerkleFormulas))
