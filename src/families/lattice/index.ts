import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LATTICE — scaffolded integer measures crossed to crystallography. Every output an exact finite nonnegative integer. */

const PROOF = 'lattice arithmetic (points, unitcells, coordinationnumber, symmetryorderings, planepairs, packingfraction, latticevectors, millerindices); scaffolded from the integer-op palette; a measure crossed to crystallography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lattice', dst: 'crystallography', formula, value, proof: PROOF, ...extra }, holds, { name: `lattice.${name}`, params })

export class LatticeFormulas {
  static points(x: number, y: number, z: number): CrossFormula { return c('lattice-points', 'points(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'points', [x, y, z]) }
  static unitcells(x: number, y: number): CrossFormula { return c('lattice-unitcells', 'unitcells(x, y) = x · y', x * y, nat(x, y), 'unitcells', [x, y]) }
  static coordinationnumber(x: number, y: number): CrossFormula { return c('lattice-coordinationnumber', 'coordinationnumber(x, y) = x + y', x + y, nat(x, y), 'coordinationnumber', [x, y]) }
  static symmetryorderings(x: number): CrossFormula { return c('lattice-symmetryorderings', 'symmetryorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'symmetryorderings', [x]) }
  static planepairs(x: number, y: number): CrossFormula { return c('lattice-planepairs', 'planepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'planepairs', [x, y]) }
  static packingfraction(x: number, y: number): CrossFormula { return c('lattice-packingfraction', 'packingfraction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'packingfraction', [x, y]) }
  static latticevectors(x: number, y: number): CrossFormula { return c('lattice-latticevectors', 'latticevectors(x, y) = x + y', x + y, nat(x, y), 'latticevectors', [x, y]) }
  static millerindices(x: number): CrossFormula { return c('lattice-millerindices', 'millerindices(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'millerindices', [x]) }
}

for (const name of ['coordinationnumber', 'latticevectors', 'millerindices', 'packingfraction', 'planepairs', 'points', 'symmetryorderings', 'unitcells'] as const)
  hexRegisterOf('lattice', name, (LatticeFormulas[name] as (...x: unknown[]) => unknown).bind(LatticeFormulas))
