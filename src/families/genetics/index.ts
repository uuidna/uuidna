import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GENETICS — LIFE'S CODE, AS ARITHMETIC (chosen by the public-API registry, not by hand). A genome is numbers: codons from
 *  bases, GC content, Punnett ratios, mutation rate, heritability, alleles per gene, sequencing coverage, and how alike two
 *  sequences are. Crosses to `med` — genetics is what medicine reads. A measure. */

const PROOF = 'genetics arithmetic (codons, GC content, Punnett ratio, mutation rate, heritability, alleles, coverage, similarity); life\'s code as integers; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'genetics', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `genetics.${name}`, params })

export class GeneticsFormulas {
  /** CODONS: triplets of bases. value ⌊bases / 3⌋. */
  static codons(bases: number): CrossFormula { return c('genetics-codons', 'codons(bases) = ⌊bases / 3⌋', Math.floor(bases / 3), nat(bases), 'codons', [bases]) }
  /** GC CONTENT as a percentage. value ⌊gc · 100 / total⌋. */
  static gc(gc: number, total: number): CrossFormula { return c('genetics-gc', 'gc(gc, total) = ⌊gc · 100 / total⌋', total > 0 ? Math.floor((gc * 100) / total) : 0, nat(gc, total) && total > 0 && gc <= total, 'gc', [gc, total]) }
  /** PUNNETT: the dominant share of offspring as a percentage. value ⌊dominant · 100 / total⌋. */
  static punnett(dominant: number, total: number): CrossFormula { return c('genetics-punnett', 'punnett(dominant, total) = ⌊dominant · 100 / total⌋', total > 0 ? Math.floor((dominant * 100) / total) : 0, nat(dominant, total) && total > 0 && dominant <= total, 'punnett', [dominant, total]) }
  /** MUTATION RATE per million bases. value ⌊mutations · 1000000 / bases⌋. */
  static mutation(mutations: number, bases: number): CrossFormula { return c('genetics-mutation', 'mutation(mutations, bases) = ⌊mutations · 1000000 / bases⌋', bases > 0 ? Math.floor((mutations * 1000000) / bases) : 0, nat(mutations, bases) && bases > 0, 'mutation', [mutations, bases]) }
  /** HERITABILITY: the genetic share of variance as a percentage. value ⌊genetic · 100 / total⌋. */
  static heritability(genetic: number, total: number): CrossFormula { return c('genetics-heritability', 'heritability(genetic, total) = ⌊genetic · 100 / total⌋', total > 0 ? Math.floor((genetic * 100) / total) : 0, nat(genetic, total) && total > 0 && genetic <= total, 'heritability', [genetic, total]) }
  /** ALLELES: two per gene, diploid. value genes · 2. */
  static alleles(genes: number): CrossFormula { return c('genetics-alleles', 'alleles(genes) = genes · 2', genes * 2, nat(genes), 'alleles', [genes]) }
  /** COVERAGE: reads over the genome length. value ⌊reads / genome⌋. */
  static coverage(reads: number, genome: number): CrossFormula { return c('genetics-coverage', 'coverage(reads, genome) = ⌊reads / genome⌋', genome > 0 ? Math.floor(reads / genome) : 0, nat(reads, genome) && genome > 0, 'coverage', [reads, genome]) }
  /** SIMILARITY: matching positions over length as a percentage. value ⌊matches · 100 / length⌋. */
  static similarity(matches: number, length: number): CrossFormula { return c('genetics-similarity', 'similarity(matches, length) = ⌊matches · 100 / length⌋', length > 0 ? Math.floor((matches * 100) / length) : 0, nat(matches, length) && length > 0 && matches <= length, 'similarity', [matches, length]) }
}

for (const name of ['alleles', 'codons', 'coverage', 'gc', 'heritability', 'mutation', 'punnett', 'similarity'] as const)
  hexRegisterOf('genetics', name, (GeneticsFormulas[name] as (...x: unknown[]) => unknown).bind(GeneticsFormulas))
