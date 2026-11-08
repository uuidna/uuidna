import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CYTOLOGY — THE CELL, AS ARITHMETIC. Counting cells is numbers: how many divide, the nucleus against the cytoplasm,
 *  how many live, how much of the dish is covered, how many die, how fast the population folds, and the plain measures a
 *  slide carries — diameter and passage. Crosses to `med` — cytology is what medicine reads off the microscope. A measure. */

const PROOF = 'cytology arithmetic (mitotic index, N/C ratio, viability, confluence, apoptosis, population doubling, diameter, passage); the cell as counts; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cytology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `cytology.${name}`, params })

export class CytologyFormulas {
  /** MITOTIC INDEX: dividing cells per hundred counted. value ⌊dividing · 100 / total⌋. */
  static mitosis(dividing: number, total: number): CrossFormula { return c('cytology-mitosis', 'mitosis(dividing, total) = ⌊dividing · 100 / total⌋', total > 0 ? Math.floor((dividing * 100) / total) : 0, nat(dividing, total) && total > 0 && dividing <= total, 'mitosis', [dividing, total]) }
  /** NUCLEUS-TO-CYTOPLASM RATIO as a percentage. value ⌊nucleus · 100 / cytoplasm⌋. */
  static ratio(nucleus: number, cytoplasm: number): CrossFormula { return c('cytology-ratio', 'ratio(nucleus, cytoplasm) = ⌊nucleus · 100 / cytoplasm⌋', cytoplasm > 0 ? Math.floor((nucleus * 100) / cytoplasm) : 0, nat(nucleus, cytoplasm) && cytoplasm > 0, 'ratio', [nucleus, cytoplasm]) }
  /** VIABILITY: live cells per hundred. value ⌊live · 100 / total⌋. */
  static viability(live: number, total: number): CrossFormula { return c('cytology-viability', 'viability(live, total) = ⌊live · 100 / total⌋', total > 0 ? Math.floor((live * 100) / total) : 0, nat(live, total) && total > 0 && live <= total, 'viability', [live, total]) }
  /** CONFLUENCE: the fraction of the dish covered, as a percentage. value ⌊covered · 100 / area⌋. */
  static confluence(covered: number, area: number): CrossFormula { return c('cytology-confluence', 'confluence(covered, area) = ⌊covered · 100 / area⌋', area > 0 ? Math.floor((covered * 100) / area) : 0, nat(covered, area) && area > 0 && covered <= area, 'confluence', [covered, area]) }
  /** APOPTOSIS: dying cells per hundred. value ⌊dying · 100 / total⌋. */
  static apoptosis(dying: number, total: number): CrossFormula { return c('cytology-apoptosis', 'apoptosis(dying, total) = ⌊dying · 100 / total⌋', total > 0 ? Math.floor((dying * 100) / total) : 0, nat(dying, total) && total > 0 && dying <= total, 'apoptosis', [dying, total]) }
  /** POPULATION DOUBLING: the fold from initial to final. value ⌊final / initial⌋. */
  static doubling(final: number, initial: number): CrossFormula { return c('cytology-doubling', 'doubling(final, initial) = ⌊final / initial⌋', initial > 0 ? Math.floor(final / initial) : 0, nat(final, initial) && initial > 0, 'doubling', [final, initial]) }
  /** DIAMETER: the cell size in micrometers, as measured. value micrometers. */
  static diameter(micrometers: number): CrossFormula { return c('cytology-diameter', 'diameter(micrometers) = micrometers', micrometers, nat(micrometers), 'diameter', [micrometers]) }
  /** PASSAGE: the subculture number of the line. value number. */
  static passage(number: number): CrossFormula { return c('cytology-passage', 'passage(number) = number', number, nat(number), 'passage', [number]) }
}

for (const name of ['apoptosis', 'confluence', 'diameter', 'doubling', 'mitosis', 'passage', 'ratio', 'viability'] as const)
  hexRegisterOf('cytology', name, (CytologyFormulas[name] as (...x: unknown[]) => unknown).bind(CytologyFormulas))
