import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PATHOLOGY — DIAGNOSTIC TESTS AND SLIDES, AS ARITHMETIC. A diagnostic test is numbers: how often it catches disease
 *  (sensitivity), how often it clears the healthy (specificity), how trustworthy a positive is (precision), how common
 *  the disease is (prevalence), and the slide read out as counts — mitotic figures per field, cellularity per area,
 *  observer concordance, and marker positivity. Crosses to `med` — pathology is what medicine reads. A measure. */

const PROOF = 'pathology arithmetic (sensitivity, specificity, precision, prevalence, mitotic rate, cellularity, concordance, positivity); diagnostic tests and slides as counts; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pathology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `pathology.${name}`, params })

export class PathologyFormulas {
  /** SENSITIVITY: true positives over all actual positives, as a percentage. value ⌊truepos · 100 / actualpos⌋. */
  static sensitivity(truepos: number, actualpos: number): CrossFormula { return c('pathology-sensitivity', 'sensitivity(truepos, actualpos) = ⌊truepos · 100 / actualpos⌋', actualpos > 0 ? Math.floor((truepos * 100) / actualpos) : 0, nat(truepos, actualpos) && actualpos > 0 && truepos <= actualpos, 'sensitivity', [truepos, actualpos]) }
  /** SPECIFICITY: true negatives over all actual negatives, as a percentage. value ⌊trueneg · 100 / actualneg⌋. */
  static specificity(trueneg: number, actualneg: number): CrossFormula { return c('pathology-specificity', 'specificity(trueneg, actualneg) = ⌊trueneg · 100 / actualneg⌋', actualneg > 0 ? Math.floor((trueneg * 100) / actualneg) : 0, nat(trueneg, actualneg) && actualneg > 0 && trueneg <= actualneg, 'specificity', [trueneg, actualneg]) }
  /** PRECISION: true positives over all predicted positives, as a percentage. value ⌊truepos · 100 / predictedpos⌋. */
  static precision(truepos: number, predictedpos: number): CrossFormula { return c('pathology-precision', 'precision(truepos, predictedpos) = ⌊truepos · 100 / predictedpos⌋', predictedpos > 0 ? Math.floor((truepos * 100) / predictedpos) : 0, nat(truepos, predictedpos) && predictedpos > 0 && truepos <= predictedpos, 'precision', [truepos, predictedpos]) }
  /** PREVALENCE: the diseased over the population, as a percentage. value ⌊diseased · 100 / population⌋. */
  static prevalence(diseased: number, population: number): CrossFormula { return c('pathology-prevalence', 'prevalence(diseased, population) = ⌊diseased · 100 / population⌋', population > 0 ? Math.floor((diseased * 100) / population) : 0, nat(diseased, population) && population > 0 && diseased <= population, 'prevalence', [diseased, population]) }
  /** MITOTIC RATE: mitotic figures per high-power field. value ⌊figures / fields⌋. */
  static mitotic(figures: number, fields: number): CrossFormula { return c('pathology-mitotic', 'mitotic(figures, fields) = ⌊figures / fields⌋', fields > 0 ? Math.floor(figures / fields) : 0, nat(figures, fields) && fields > 0, 'mitotic', [figures, fields]) }
  /** CELLULARITY: cells per unit area. value ⌊cells / area⌋. */
  static cellularity(cells: number, area: number): CrossFormula { return c('pathology-cellularity', 'cellularity(cells, area) = ⌊cells / area⌋', area > 0 ? Math.floor(cells / area) : 0, nat(cells, area) && area > 0, 'cellularity', [cells, area]) }
  /** CONCORDANCE: observers who agree over the total, as a percentage. value ⌊agree · 100 / total⌋. */
  static concordance(agree: number, total: number): CrossFormula { return c('pathology-concordance', 'concordance(agree, total) = ⌊agree · 100 / total⌋', total > 0 ? Math.floor((agree * 100) / total) : 0, nat(agree, total) && total > 0 && agree <= total, 'concordance', [agree, total]) }
  /** POSITIVITY: stained cells over the cells counted, as a percentage. value ⌊stained · 100 / counted⌋. */
  static positivity(stained: number, counted: number): CrossFormula { return c('pathology-positivity', 'positivity(stained, counted) = ⌊stained · 100 / counted⌋', counted > 0 ? Math.floor((stained * 100) / counted) : 0, nat(stained, counted) && counted > 0 && stained <= counted, 'positivity', [stained, counted]) }
}

for (const name of ['cellularity', 'concordance', 'mitotic', 'positivity', 'precision', 'prevalence', 'sensitivity', 'specificity'] as const)
  hexRegisterOf('pathology', name, (PathologyFormulas[name] as (...x: unknown[]) => unknown).bind(PathologyFormulas))
