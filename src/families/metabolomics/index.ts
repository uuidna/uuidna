import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** METABOLOMICS — THE SMALL-MOLECULE CHEMISTRY OF A CELL, AS ARITHMETIC. The metabolites a sample holds are numbers:
 *  concentration from moles over volume, reaction flux, how far a pathway reaches per step, fold change against a control,
 *  pool turnover, dwell time on a column, a product-to-substrate ratio, and how much of the known set a run detects.
 *  Crosses to `biochemistry` — metabolomics is the measured face of a cell's chemistry. A measure. */

const PROOF = 'metabolomics arithmetic (concentration, flux, pathway reach, fold change, turnover, retention, ratio, coverage); the measured small-molecule chemistry of a cell; a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'metabolomics', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `metabolomics.${name}`, params })

export class MetabolomicsFormulas {
  /** CONCENTRATION: moles over the volume they occupy. value ⌊moles / volume⌋. */
  static concentration(moles: number, volume: number): CrossFormula { return c('metabolomics-concentration', 'concentration(moles, volume) = ⌊moles / volume⌋', volume > 0 ? Math.floor(moles / volume) : 0, nat(moles, volume) && volume > 0, 'concentration', [moles, volume]) }
  /** FLUX: a reaction rate scaled by the enzyme present. value rate · enzyme. */
  static flux(rate: number, enzyme: number): CrossFormula { return c('metabolomics-flux', 'flux(rate, enzyme) = rate · enzyme', rate * enzyme, nat(rate, enzyme), 'flux', [rate, enzyme]) }
  /** PATHWAY: metabolites reached per step along it. value ⌊metabolites / steps⌋. */
  static pathway(metabolites: number, steps: number): CrossFormula { return c('metabolomics-pathway', 'pathway(metabolites, steps) = ⌊metabolites / steps⌋', steps > 0 ? Math.floor(metabolites / steps) : 0, nat(metabolites, steps) && steps > 0, 'pathway', [metabolites, steps]) }
  /** FOLD CHANGE: treated against control, as a percentage. value ⌊treated · 100 / control⌋. */
  static foldchange(treated: number, control: number): CrossFormula { return c('metabolomics-foldchange', 'foldchange(treated, control) = ⌊treated · 100 / control⌋', control > 0 ? Math.floor((treated * 100) / control) : 0, nat(treated, control) && control > 0, 'foldchange', [treated, control]) }
  /** TURNOVER: produced against the standing pool, as a percentage. value ⌊produced · 100 / pool⌋. */
  static turnover(produced: number, pool: number): CrossFormula { return c('metabolomics-turnover', 'turnover(produced, pool) = ⌊produced · 100 / pool⌋', pool > 0 ? Math.floor((produced * 100) / pool) : 0, nat(produced, pool) && pool > 0, 'turnover', [produced, pool]) }
  /** RETENTION: the dwell time on a column. value time. */
  static retention(time: number): CrossFormula { return c('metabolomics-retention', 'retention(time) = time', time, nat(time), 'retention', [time]) }
  /** RATIO: product over substrate, as a percentage. value ⌊product · 100 / substrate⌋. */
  static ratio(product: number, substrate: number): CrossFormula { return c('metabolomics-ratio', 'ratio(product, substrate) = ⌊product · 100 / substrate⌋', substrate > 0 ? Math.floor((product * 100) / substrate) : 0, nat(product, substrate) && substrate > 0, 'ratio', [product, substrate]) }
  /** COVERAGE: detected against the known set, as a percentage. value ⌊detected · 100 / known⌋. */
  static coverage(detected: number, known: number): CrossFormula { return c('metabolomics-coverage', 'coverage(detected, known) = ⌊detected · 100 / known⌋', known > 0 ? Math.floor((detected * 100) / known) : 0, nat(detected, known) && known > 0 && detected <= known, 'coverage', [detected, known]) }
}

for (const name of ['concentration', 'coverage', 'flux', 'foldchange', 'pathway', 'ratio', 'retention', 'turnover'] as const)
  hexRegisterOf('metabolomics', name, (MetabolomicsFormulas[name] as (...x: unknown[]) => unknown).bind(MetabolomicsFormulas))
