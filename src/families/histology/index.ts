import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HISTOLOGY — THE TISSUE SLIDE, AS ARITHMETIC. Reading a stained section is numbers: the stained fraction, section thickness,
 *  magnification, cell density per field, fibrosis and necrosis as percentages, the grade, and immune infiltration per area.
 *  Crosses to `med` — histology is what medicine reads from the microscope. A measure. */

const PROOF = 'histology arithmetic (staining fraction, thickness, magnification, cell density, fibrosis, necrosis, grade, infiltration); the tissue slide as numbers; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'histology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `histology.${name}`, params })

export class HistologyFormulas {
  /** STAINING: the stained fraction of a section, as a percentage. value ⌊stained · 100 / total⌋. */
  static staining(stained: number, total: number): CrossFormula { return c('histology-staining', 'staining(stained, total) = ⌊stained · 100 / total⌋', total > 0 ? Math.floor((stained * 100) / total) : 0, nat(stained, total) && total > 0 && stained <= total, 'staining', [stained, total]) }
  /** THICKNESS: section thickness in microns. value microns. */
  static thickness(microns: number): CrossFormula { return c('histology-thickness', 'thickness(microns) = microns', microns, nat(microns), 'thickness', [microns]) }
  /** MAGNIFICATION: image size over specimen size. value ⌊image / specimen⌋. */
  static magnification(image: number, specimen: number): CrossFormula { return c('histology-magnification', 'magnification(image, specimen) = ⌊image / specimen⌋', specimen > 0 ? Math.floor(image / specimen) : 0, nat(image, specimen) && specimen > 0, 'magnification', [image, specimen]) }
  /** DENSITY: cells per field of view. value ⌊cells / field⌋. */
  static density(cells: number, field: number): CrossFormula { return c('histology-density', 'density(cells, field) = ⌊cells / field⌋', field > 0 ? Math.floor(cells / field) : 0, nat(cells, field) && field > 0, 'density', [cells, field]) }
  /** FIBROSIS: fibrotic tissue as a percentage. value ⌊fibrotic · 100 / tissue⌋. */
  static fibrosis(fibrotic: number, tissue: number): CrossFormula { return c('histology-fibrosis', 'fibrosis(fibrotic, tissue) = ⌊fibrotic · 100 / tissue⌋', tissue > 0 ? Math.floor((fibrotic * 100) / tissue) : 0, nat(fibrotic, tissue) && tissue > 0 && fibrotic <= tissue, 'fibrosis', [fibrotic, tissue]) }
  /** NECROSIS: dead tissue as a percentage. value ⌊dead · 100 / total⌋. */
  static necrosis(dead: number, total: number): CrossFormula { return c('histology-necrosis', 'necrosis(dead, total) = ⌊dead · 100 / total⌋', total > 0 ? Math.floor((dead * 100) / total) : 0, nat(dead, total) && total > 0 && dead <= total, 'necrosis', [dead, total]) }
  /** GRADE: the histologic grade. value score. */
  static grade(score: number): CrossFormula { return c('histology-grade', 'grade(score) = score', score, nat(score), 'grade', [score]) }
  /** INFILTRATION: immune cells per unit area. value ⌊immune / area⌋. */
  static infiltration(immune: number, area: number): CrossFormula { return c('histology-infiltration', 'infiltration(immune, area) = ⌊immune / area⌋', area > 0 ? Math.floor(immune / area) : 0, nat(immune, area) && area > 0, 'infiltration', [immune, area]) }
}

for (const name of ['density', 'fibrosis', 'grade', 'infiltration', 'magnification', 'necrosis', 'staining', 'thickness'] as const)
  hexRegisterOf('histology', name, (HistologyFormulas[name] as (...x: unknown[]) => unknown).bind(HistologyFormulas))
