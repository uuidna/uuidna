import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROTEOMICS — THE PROTEIN CENSUS, AS ARITHMETIC (chosen by the biochemistry registry, not by hand). Measuring proteins is
 *  numbers: relative abundance, the mass spectrometer's mass-to-charge, sequence coverage, fold change between conditions,
 *  the isoelectric point, digestion efficiency, interaction degree, and copies per cell. Crosses to `biochemistry` — proteins
 *  are biochemistry's subject. A measure. */

const PROOF = 'proteomics arithmetic (abundance, mass spec m/z, coverage, fold change, isoelectric point, digestion, interaction, expression); a biochemistry domain; a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'proteomics', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `proteomics.${name}`, params })

export class ProteomicsFormulas {
  /** ABUNDANCE: a peptide's share of the total, as a percentage. value ⌊peptides · 100 / total⌋. */
  static abundance(peptides: number, total: number): CrossFormula { return c('proteomics-abundance', 'abundance(peptides, total) = ⌊peptides · 100 / total⌋', total > 0 ? Math.floor((peptides * 100) / total) : 0, nat(peptides, total) && total > 0 && peptides <= total, 'abundance', [peptides, total]) }
  /** MASS SPECTROMETRY: mass over charge (m/z). value ⌊mass / charge⌋. */
  static massspec(mass: number, charge: number): CrossFormula { return c('proteomics-massspec', 'massspec(mass, charge) = ⌊mass / charge⌋', charge > 0 ? Math.floor(mass / charge) : 0, nat(mass, charge) && charge > 0, 'massspec', [mass, charge]) }
  /** SEQUENCE COVERAGE: identified residues over the sequence, as a percentage. value ⌊identified · 100 / sequence⌋. */
  static coverage(identified: number, sequence: number): CrossFormula { return c('proteomics-coverage', 'coverage(identified, sequence) = ⌊identified · 100 / sequence⌋', sequence > 0 ? Math.floor((identified * 100) / sequence) : 0, nat(identified, sequence) && sequence > 0 && identified <= sequence, 'coverage', [identified, sequence]) }
  /** FOLD CHANGE: treated over control, as a percentage. value ⌊treated · 100 / control⌋. */
  static foldchange(treated: number, control: number): CrossFormula { return c('proteomics-foldchange', 'foldchange(treated, control) = ⌊treated · 100 / control⌋', control > 0 ? Math.floor((treated * 100) / control) : 0, nat(treated, control) && control > 0, 'foldchange', [treated, control]) }
  /** ISOELECTRIC POINT: the pH as given. value ph. */
  static isoelectric(ph: number): CrossFormula { return c('proteomics-isoelectric', 'isoelectric(ph) = ph', ph, nat(ph), 'isoelectric', [ph]) }
  /** DIGESTION: cleaved bonds over the cleavage sites, as a percentage. value ⌊cleaved · 100 / sites⌋. */
  static digestion(cleaved: number, sites: number): CrossFormula { return c('proteomics-digestion', 'digestion(cleaved, sites) = ⌊cleaved · 100 / sites⌋', sites > 0 ? Math.floor((cleaved * 100) / sites) : 0, nat(cleaved, sites) && sites > 0 && cleaved <= sites, 'digestion', [cleaved, sites]) }
  /** INTERACTION: binding partners per protein. value ⌊partners / proteins⌋. */
  static interaction(partners: number, proteins: number): CrossFormula { return c('proteomics-interaction', 'interaction(partners, proteins) = ⌊partners / proteins⌋', proteins > 0 ? Math.floor(partners / proteins) : 0, nat(partners, proteins) && proteins > 0, 'interaction', [partners, proteins]) }
  /** EXPRESSION: protein copies per cell. value ⌊copies / cell⌋. */
  static expression(copies: number, cell: number): CrossFormula { return c('proteomics-expression', 'expression(copies, cell) = ⌊copies / cell⌋', cell > 0 ? Math.floor(copies / cell) : 0, nat(copies, cell) && cell > 0, 'expression', [copies, cell]) }
}

for (const name of ['abundance', 'coverage', 'digestion', 'expression', 'foldchange', 'interaction', 'isoelectric', 'massspec'] as const)
  hexRegisterOf('proteomics', name, (ProteomicsFormulas[name] as (...x: unknown[]) => unknown).bind(ProteomicsFormulas))
