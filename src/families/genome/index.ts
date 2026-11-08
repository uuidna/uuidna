import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GenomeFormulas — 8 exact-integer formulas of the genome domain, each at a hex address crossing to cross; develops the genome leads. */

const PROOF = "genome counts: basepairs(x, y) = x · y; genes(x, y) = x · y; codons(x, y) = x / y; chromosomes(x, y) = x + y; gcpct(x, y) = x · 100 / y; mutations(x, y) = x / y; reads(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'genome', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `genome.${name}`, params })

export class GenomeFormulas {
  /** basepairs(x, y) = x · y. */
  static basepairs(x: number, y: number): CrossFormula { return f('genome-basepairs', 'basepairs(x, y) = x · y', x * y, nat(x, y), 'basepairs', [x, y]) }
  /** genes(x, y) = x · y. */
  static genes(x: number, y: number): CrossFormula { return f('genome-genes', 'genes(x, y) = x · y', x * y, nat(x, y), 'genes', [x, y]) }
  /** codons(x, y) = x / y. */
  static codons(x: number, y: number): CrossFormula { return f('genome-codons', 'codons(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'codons', [x, y]) }
  /** chromosomes(x, y) = x + y. */
  static chromosomes(x: number, y: number): CrossFormula { return f('genome-chromosomes', 'chromosomes(x, y) = x + y', x + y, nat(x, y), 'chromosomes', [x, y]) }
  /** gcpct(x, y) = x · 100 / y. */
  static gcpct(x: number, y: number): CrossFormula { return f('genome-gcpct', 'gcpct(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'gcpct', [x, y]) }
  /** mutations(x, y) = x / y. */
  static mutations(x: number, y: number): CrossFormula { return f('genome-mutations', 'mutations(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'mutations', [x, y]) }
  /** reads(x, y) = x · y. */
  static reads(x: number, y: number): CrossFormula { return f('genome-reads', 'reads(x, y) = x · y', x * y, nat(x, y), 'reads', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('genome-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['basepairs', 'chromosomes', 'codons', 'combos', 'gcpct', 'genes', 'mutations', 'reads'] as const)
  hexRegisterOf('genome', name, (GenomeFormulas[name] as (...x: unknown[]) => unknown).bind(GenomeFormulas))
