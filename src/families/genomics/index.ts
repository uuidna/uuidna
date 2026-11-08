import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GENOMICS — SEQUENCE AND VARIATION, AS ARITHMETIC. Reading a genome is numbers: how deep the reads cover it, the GC
 *  fraction, variants per million bases, how often a site is heterozygous, how fragmented an assembly is, the N50, the
 *  per-generation mutation rate, and the share of conserved synteny blocks. Crosses to `genetics` — genomics measures what
 *  genetics explains. A measure. */

const PROOF = 'genomics arithmetic (coverage depth, GC content, SNP density per million, heterozygosity, assembly fragmentation, N50, mutation rate, synteny conservation); a measure crossed to genetics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'genomics', dst: 'genetics', formula, value, proof: PROOF, ...extra }, holds, { name: `genomics.${name}`, params })

export class GenomicsFormulas {
  /** ASSEMBLY: contigs as a percentage of the reads. value ⌊contigs · 100 / reads⌋. */
  static assembly(contigs: number, reads: number): CrossFormula { return c('genomics-assembly', 'assembly(contigs, reads) = ⌊contigs · 100 / reads⌋', reads > 0 ? Math.floor((contigs * 100) / reads) : 0, nat(contigs, reads) && reads > 0, 'assembly', [contigs, reads]) }
  /** COVERAGE: read depth over the genome length. value ⌊reads / genome⌋. */
  static coverage(reads: number, genome: number): CrossFormula { return c('genomics-coverage', 'coverage(reads, genome) = ⌊reads / genome⌋', genome > 0 ? Math.floor(reads / genome) : 0, nat(reads, genome) && genome > 0, 'coverage', [reads, genome]) }
  /** GC CONTENT as a percentage of bases. value ⌊gc · 100 / bases⌋. */
  static gccontent(gc: number, bases: number): CrossFormula { return c('genomics-gccontent', 'gccontent(gc, bases) = ⌊gc · 100 / bases⌋', bases > 0 ? Math.floor((gc * 100) / bases) : 0, nat(gc, bases) && bases > 0 && gc <= bases, 'gccontent', [gc, bases]) }
  /** HETEROZYGOSITY as a percentage of sites. value ⌊hetero · 100 / total⌋. */
  static heterozygosity(hetero: number, total: number): CrossFormula { return c('genomics-heterozygosity', 'heterozygosity(hetero, total) = ⌊hetero · 100 / total⌋', total > 0 ? Math.floor((hetero * 100) / total) : 0, nat(hetero, total) && total > 0 && hetero <= total, 'heterozygosity', [hetero, total]) }
  /** MUTATION rate: changes per generation. value ⌊changed / generations⌋. */
  static mutation(changed: number, generations: number): CrossFormula { return c('genomics-mutation', 'mutation(changed, generations) = ⌊changed / generations⌋', generations > 0 ? Math.floor(changed / generations) : 0, nat(changed, generations) && generations > 0, 'mutation', [changed, generations]) }
  /** N50: the contig length that marks half the assembly. value length. */
  static n50(length: number): CrossFormula { return c('genomics-n50', 'n50(length) = length', length, nat(length), 'n50', [length]) }
  /** SNP density: variants per million bases. value ⌊variants · 1000000 / bases⌋. */
  static snp(variants: number, bases: number): CrossFormula { return c('genomics-snp', 'snp(variants, bases) = ⌊variants · 1000000 / bases⌋', bases > 0 ? Math.floor((variants * 1000000) / bases) : 0, nat(variants, bases) && bases > 0, 'snp', [variants, bases]) }
  /** SYNTENY: conserved blocks as a percentage. value ⌊conserved · 100 / blocks⌋. */
  static synteny(conserved: number, blocks: number): CrossFormula { return c('genomics-synteny', 'synteny(conserved, blocks) = ⌊conserved · 100 / blocks⌋', blocks > 0 ? Math.floor((conserved * 100) / blocks) : 0, nat(conserved, blocks) && blocks > 0 && conserved <= blocks, 'synteny', [conserved, blocks]) }
}

for (const name of ['assembly', 'coverage', 'gccontent', 'heterozygosity', 'mutation', 'n50', 'snp', 'synteny'] as const)
  hexRegisterOf('genomics', name, (GenomicsFormulas[name] as (...x: unknown[]) => unknown).bind(GenomicsFormulas))
