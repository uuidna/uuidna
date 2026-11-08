import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MEIOSIS — THE REDUCTION DIVISION, AS ARITHMETIC. The cell halves its chromosomes and shuffles them: the gametes one
 *  meiosis yields, the haploid number, the crossovers across the bivalents, recombination frequency, the variation two
 *  gamete pools combine to, the diploid fertilization restores, the sister chromatids after replication, and Mendelian
 *  segregation. Crosses to `genetics` — meiosis is how inheritance happens. A measure. */

const PROOF = 'meiosis arithmetic (gametes, haploid number, crossovers, recombination frequency, assortment variation, diploid restoration, sister chromatids, Mendelian segregation); the reduction division as a measure crossed to genetics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'meiosis', dst: 'genetics', formula, value, proof: PROOF, ...extra }, holds, { name: `meiosis.${name}`, params })

export class MeiosisFormulas {
  /** GAMETES: one meiosis of a diploid cell yields four gametes. value cells · 4. */
  static gametes(cells: number): CrossFormula { return c('meiosis-gametes', 'gametes(cells) = cells · 4', cells * 4, nat(cells), 'gametes', [cells]) }
  /** HAPLOID NUMBER: the diploid count halved. value ⌊diploid / 2⌋. */
  static haploid(diploid: number): CrossFormula { return c('meiosis-haploid', 'haploid(diploid) = ⌊diploid / 2⌋', diploid > 0 ? Math.floor(diploid / 2) : 0, nat(diploid) && diploid > 0, 'haploid', [diploid]) }
  /** CROSSOVERS: crossovers per bivalent across every bivalent. value bivalents · perBivalent. */
  static crossovers(bivalents: number, perBivalent: number): CrossFormula { return c('meiosis-crossovers', 'crossovers(bivalents, perBivalent) = bivalents · perBivalent', bivalents * perBivalent, nat(bivalents, perBivalent), 'crossovers', [bivalents, perBivalent]) }
  /** RECOMBINATION FREQUENCY: recombinant offspring as a percentage of the total. value ⌊recombinant · 100 / total⌋. */
  static recombinants(recombinant: number, total: number): CrossFormula { return c('meiosis-recombinants', 'recombinants(recombinant, total) = ⌊recombinant · 100 / total⌋', total > 0 ? Math.floor((recombinant * 100) / total) : 0, nat(recombinant, total) && total > 0 && recombinant <= total, 'recombinants', [recombinant, total]) }
  /** VARIATION: the gamete combinations two gamete pools assort into. value maternal · paternal. */
  static variation(maternal: number, paternal: number): CrossFormula { return c('meiosis-variation', 'variation(maternal, paternal) = maternal · paternal', maternal * paternal, nat(maternal, paternal), 'variation', [maternal, paternal]) }
  /** DIPLOID RESTORATION: fertilization fuses two haploid sets. value haploid · 2. */
  static diploidrestore(haploid: number): CrossFormula { return c('meiosis-diploidrestore', 'diploidrestore(haploid) = haploid · 2', haploid * 2, nat(haploid), 'diploidrestore', [haploid]) }
  /** SISTER CHROMATIDS: each chromosome carries two after replication. value chromosomes · 2. */
  static chromatids(chromosomes: number): CrossFormula { return c('meiosis-chromatids', 'chromatids(chromosomes) = chromosomes · 2', chromosomes * 2, nat(chromosomes), 'chromatids', [chromosomes]) }
  /** MENDELIAN SEGREGATION: offspring at a num:den ratio. value ⌊offspring · num / den⌋. */
  static segregation(offspring: number, num: number, den: number): CrossFormula { return c('meiosis-segregation', 'segregation(offspring, num, den) = ⌊offspring · num / den⌋', den > 0 ? Math.floor((offspring * num) / den) : 0, nat(offspring, num, den) && den > 0 && num <= den, 'segregation', [offspring, num, den]) }
}

for (const name of ['chromatids', 'crossovers', 'diploidrestore', 'gametes', 'haploid', 'recombinants', 'segregation', 'variation'] as const)
  hexRegisterOf('meiosis', name, (MeiosisFormulas[name] as (...x: unknown[]) => unknown).bind(MeiosisFormulas))
