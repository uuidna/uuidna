import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EPIGENETICS — HERITABLE CHANGE WITHOUT CHANGING THE SEQUENCE, AS ARITHMETIC. Marks and their rates are numbers:
 *  the percent of methylated sites, acetylated histones, actively expressed genes, silenced imprinted alleles, open
 *  chromatin, the aging clock's sites per year, what inheritance transmits, and how much a region is remodeled.
 *  Crosses to `genetics` — epigenetics is the layer above the genes. A measure. */

const PROOF = 'epigenetics arithmetic (methylation, acetylation, expression, imprinting, chromatin, clock, inheritance, remodeling); heritable marks above the sequence; a measure crossed to genetics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'epigenetics', dst: 'genetics', formula, value, proof: PROOF, ...extra }, holds, { name: `epigenetics.${name}`, params })

export class EpigeneticsFormulas {
  /** METHYLATION: the percent of CpG sites that are methylated. value ⌊methylated · 100 / sites⌋. */
  static methylation(methylated: number, sites: number): CrossFormula { return c('epigenetics-methylation', 'methylation(methylated, sites) = ⌊methylated · 100 / sites⌋', sites > 0 ? Math.floor((methylated * 100) / sites) : 0, nat(methylated, sites) && sites > 0 && methylated <= sites, 'methylation', [methylated, sites]) }
  /** ACETYLATION: the percent of histones that are acetylated. value ⌊acetylated · 100 / histones⌋. */
  static acetylation(acetylated: number, histones: number): CrossFormula { return c('epigenetics-acetylation', 'acetylation(acetylated, histones) = ⌊acetylated · 100 / histones⌋', histones > 0 ? Math.floor((acetylated * 100) / histones) : 0, nat(acetylated, histones) && histones > 0 && acetylated <= histones, 'acetylation', [acetylated, histones]) }
  /** EXPRESSION: the percent of genes actively expressed. value ⌊active · 100 / genes⌋. */
  static expression(active: number, genes: number): CrossFormula { return c('epigenetics-expression', 'expression(active, genes) = ⌊active · 100 / genes⌋', genes > 0 ? Math.floor((active * 100) / genes) : 0, nat(active, genes) && genes > 0 && active <= genes, 'expression', [active, genes]) }
  /** IMPRINTING: the percent of alleles silenced by parental imprint. value ⌊silenced · 100 / alleles⌋. */
  static imprinting(silenced: number, alleles: number): CrossFormula { return c('epigenetics-imprinting', 'imprinting(silenced, alleles) = ⌊silenced · 100 / alleles⌋', alleles > 0 ? Math.floor((silenced * 100) / alleles) : 0, nat(silenced, alleles) && alleles > 0 && silenced <= alleles, 'imprinting', [silenced, alleles]) }
  /** CHROMATIN: the percent of regions in open (accessible) chromatin. value ⌊open · 100 / total⌋. */
  static chromatin(open: number, total: number): CrossFormula { return c('epigenetics-chromatin', 'chromatin(open, total) = ⌊open · 100 / total⌋', total > 0 ? Math.floor((open * 100) / total) : 0, nat(open, total) && total > 0 && open <= total, 'chromatin', [open, total]) }
  /** CLOCK: the aging clock's methylation sites per year of age. value ⌊sites / age⌋. */
  static clock(sites: number, age: number): CrossFormula { return c('epigenetics-clock', 'clock(sites, age) = ⌊sites / age⌋', age > 0 ? Math.floor(sites / age) : 0, nat(sites, age) && age > 0, 'clock', [sites, age]) }
  /** INHERITANCE: the percent of offspring the mark is transmitted to. value ⌊transmitted · 100 / offspring⌋. */
  static inheritance(transmitted: number, offspring: number): CrossFormula { return c('epigenetics-inheritance', 'inheritance(transmitted, offspring) = ⌊transmitted · 100 / offspring⌋', offspring > 0 ? Math.floor((transmitted * 100) / offspring) : 0, nat(transmitted, offspring) && offspring > 0 && transmitted <= offspring, 'inheritance', [transmitted, offspring]) }
  /** REMODELING: the percent of regions whose chromatin was remodeled. value ⌊changed · 100 / regions⌋. */
  static remodeling(changed: number, regions: number): CrossFormula { return c('epigenetics-remodeling', 'remodeling(changed, regions) = ⌊changed · 100 / regions⌋', regions > 0 ? Math.floor((changed * 100) / regions) : 0, nat(changed, regions) && regions > 0 && changed <= regions, 'remodeling', [changed, regions]) }
}

for (const name of ['acetylation', 'chromatin', 'clock', 'expression', 'imprinting', 'inheritance', 'methylation', 'remodeling'] as const)
  hexRegisterOf('epigenetics', name, (EpigeneticsFormulas[name] as (...x: unknown[]) => unknown).bind(EpigeneticsFormulas))
