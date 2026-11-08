import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIOINFORMATICS — SEQUENCE ANALYSIS AS ARITHMETIC (chosen by the domain registry, not by hand). Reading genomes is
 *  numbers: percent identity of an alignment, GC content, read coverage of a genome, alignment score per base, the
 *  BLAST e-value proxy, the count of k-mers in a sequence, phylogenetic shared fraction, and an RPKM expression proxy.
 *  Crosses to `genetics` — bioinformatics is how genetics is measured. A measure. */

const PROOF = 'bioinformatics arithmetic (percent identity, GC content, coverage, alignment score per base, e-value proxy, k-mer count, phylogeny shared fraction, RPKM expression proxy); a measure crossed to genetics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bioinformatics', dst: 'genetics', formula, value, proof: PROOF, ...extra }, holds, { name: `bioinformatics.${name}`, params })

export class BioinformaticsFormulas {
  /** PERCENT IDENTITY: matching positions over the alignment length. value ⌊matches · 100 / length⌋. */
  static identity(matches: number, length: number): CrossFormula { return c('bioinformatics-identity', 'identity(matches, length) = ⌊matches · 100 / length⌋', length > 0 ? Math.floor((matches * 100) / length) : 0, nat(matches, length) && length > 0 && matches <= length, 'identity', [matches, length]) }
  /** GC CONTENT as a percentage of the bases. value ⌊gc · 100 / bases⌋. */
  static gccontent(gc: number, bases: number): CrossFormula { return c('bioinformatics-gccontent', 'gccontent(gc, bases) = ⌊gc · 100 / bases⌋', bases > 0 ? Math.floor((gc * 100) / bases) : 0, nat(gc, bases) && bases > 0 && gc <= bases, 'gccontent', [gc, bases]) }
  /** COVERAGE: reads over the genome size. value ⌊reads / genome⌋. */
  static coverage(reads: number, genome: number): CrossFormula { return c('bioinformatics-coverage', 'coverage(reads, genome) = ⌊reads / genome⌋', genome > 0 ? Math.floor(reads / genome) : 0, nat(reads, genome) && genome > 0, 'coverage', [reads, genome]) }
  /** ALIGNMENT SCORE per base. value ⌊score / length⌋. */
  static alignment(score: number, length: number): CrossFormula { return c('bioinformatics-alignment', 'alignment(score, length) = ⌊score / length⌋', length > 0 ? Math.floor(score / length) : 0, nat(score, length) && length > 0, 'alignment', [score, length]) }
  /** E-VALUE PROXY: matches over the database size, scaled. value ⌊matches · 1000000 / database⌋. */
  static evalue(matches: number, database: number): CrossFormula { return c('bioinformatics-evalue', 'evalue(matches, database) = ⌊matches · 1000000 / database⌋', database > 0 ? Math.floor((matches * 1000000) / database) : 0, nat(matches, database) && database > 0, 'evalue', [matches, database]) }
  /** K-MER COUNT: the windows of width k in a sequence. value max(0, length − k + 1). */
  static kmer(length: number, k: number): CrossFormula { return c('bioinformatics-kmer', 'kmer(length, k) = max(0, length − k + 1)', Math.max(0, length - k + 1), nat(length, k), 'kmer', [length, k]) }
  /** PHYLOGENY: shared characters over the total, as a percentage. value ⌊shared · 100 / total⌋. */
  static phylogeny(shared: number, total: number): CrossFormula { return c('bioinformatics-phylogeny', 'phylogeny(shared, total) = ⌊shared · 100 / total⌋', total > 0 ? Math.floor((shared * 100) / total) : 0, nat(shared, total) && total > 0 && shared <= total, 'phylogeny', [shared, total]) }
  /** EXPRESSION (RPKM proxy): reads over transcript length, scaled. value ⌊reads · 1000 / length⌋. */
  static expression(reads: number, length: number): CrossFormula { return c('bioinformatics-expression', 'expression(reads, length) = ⌊reads · 1000 / length⌋', length > 0 ? Math.floor((reads * 1000) / length) : 0, nat(reads, length) && length > 0, 'expression', [reads, length]) }
}

for (const name of ['alignment', 'coverage', 'evalue', 'expression', 'gccontent', 'identity', 'kmer', 'phylogeny'] as const)
  hexRegisterOf('bioinformatics', name, (BioinformaticsFormulas[name] as (...x: unknown[]) => unknown).bind(BioinformaticsFormulas))
