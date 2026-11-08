import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ONCOLOGY — THE MEASURE OF A TUMOUR, AS ARITHMETIC (chosen by the clinical registry, not by hand). Cancer is numbers:
 *  the TNM stage, the grade, survival, how fast it doubles, how far it shrank under treatment, the burden per volume,
 *  the remission rate, and the total radiation dose. Crosses to `med` — oncology is a branch of medicine. A measure. */

const PROOF = 'oncology arithmetic (TNM staging, grade, survival, doubling, response, burden, remission, radiation dose); a clinical measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'oncology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `oncology.${name}`, params })

export class OncologyFormulas {
  /** TNM STAGING: the sum of the tumour, node and metastasis scores. value tumor + nodes + metastasis. */
  static staging(tumor: number, nodes: number, metastasis: number): CrossFormula { return c('oncology-staging', 'staging(tumor, nodes, metastasis) = tumor + nodes + metastasis', tumor + nodes + metastasis, nat(tumor, nodes, metastasis), 'staging', [tumor, nodes, metastasis]) }
  /** GRADE: the histological grade, a natural as given. value score. */
  static grade(score: number): CrossFormula { return c('oncology-grade', 'grade(score) = score', score, nat(score), 'grade', [score]) }
  /** SURVIVAL as a percentage. value ⌊alive · 100 / total⌋. */
  static survival(alive: number, total: number): CrossFormula { return c('oncology-survival', 'survival(alive, total) = ⌊alive · 100 / total⌋', total > 0 ? Math.floor((alive * 100) / total) : 0, nat(alive, total) && total > 0 && alive <= total, 'survival', [alive, total]) }
  /** DOUBLING: the growth over the previous count, never negative. value max(0, current − previous). */
  static doubling(current: number, previous: number): CrossFormula { return c('oncology-doubling', 'doubling(current, previous) = max(0, current − previous)', Math.max(0, current - previous), nat(current, previous), 'doubling', [current, previous]) }
  /** RESPONSE: the shrinkage under treatment, as a percentage. value ⌊(before − after) · 100 / before⌋. */
  static response(before: number, after: number): CrossFormula { return c('oncology-response', 'response(before, after) = ⌊(before − after) · 100 / before⌋', before > 0 ? Math.floor(((before - after) * 100) / before) : 0, nat(before, after) && before > 0 && after <= before, 'response', [before, after]) }
  /** BURDEN: cells over the volume they occupy. value ⌊cells / volume⌋. */
  static burden(cells: number, volume: number): CrossFormula { return c('oncology-burden', 'burden(cells, volume) = ⌊cells / volume⌋', volume > 0 ? Math.floor(cells / volume) : 0, nat(cells, volume) && volume > 0, 'burden', [cells, volume]) }
  /** REMISSION: the cleared fraction of those treated, as a percentage. value ⌊clear · 100 / treated⌋. */
  static remission(clear: number, treated: number): CrossFormula { return c('oncology-remission', 'remission(clear, treated) = ⌊clear · 100 / treated⌋', treated > 0 ? Math.floor((clear * 100) / treated) : 0, nat(clear, treated) && treated > 0 && clear <= treated, 'remission', [clear, treated]) }
  /** DOSE: the total radiation over the fractions delivered. value fractions · gray. */
  static dose(fractions: number, gray: number): CrossFormula { return c('oncology-dose', 'dose(fractions, gray) = fractions · gray', fractions * gray, nat(fractions, gray), 'dose', [fractions, gray]) }
}

for (const name of ['burden', 'dose', 'doubling', 'grade', 'remission', 'response', 'staging', 'survival'] as const)
  hexRegisterOf('oncology', name, (OncologyFormulas[name] as (...x: unknown[]) => unknown).bind(OncologyFormulas))
