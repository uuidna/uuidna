import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DISTILLATION — SEPARATION AS ARITHMETIC. Splitting a mixture is numbers: the purity of a cut, the reflux ratio, the
 *  theoretical plates a column holds, the relative volatility of the components, the recovery of what was fed, the heads
 *  cut off the front, the boiling temperature held, and the azeotrope's balance. Crosses to `chemistry` — distillation
 *  is chemistry made quantitative. A measure. */

const PROOF = 'distillation arithmetic (purity, reflux ratio, theoretical plates, relative volatility, recovery, heads cut, boiling temperature, azeotrope balance); a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'distillation', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `distillation.${name}`, params })

export class DistillationFormulas {
  /** PURITY of a cut as a percentage. value ⌊target · 100 / total⌋. */
  static purity(target: number, total: number): CrossFormula { return c('distillation-purity', 'purity(target, total) = ⌊target · 100 / total⌋', total > 0 ? Math.floor((target * 100) / total) : 0, nat(target, total) && total > 0 && target <= total, 'purity', [target, total]) }
  /** REFLUX ratio as a percentage. value ⌊returned · 100 / distillate⌋. */
  static reflux(returned: number, distillate: number): CrossFormula { return c('distillation-reflux', 'reflux(returned, distillate) = ⌊returned · 100 / distillate⌋', distillate > 0 ? Math.floor((returned * 100) / distillate) : 0, nat(returned, distillate) && distillate > 0, 'reflux', [returned, distillate]) }
  /** THEORETICAL PLATES: separation height over height-equivalent per plate. value ⌊separation / hetp⌋. */
  static plates(separation: number, hetp: number): CrossFormula { return c('distillation-plates', 'plates(separation, hetp) = ⌊separation / hetp⌋', hetp > 0 ? Math.floor(separation / hetp) : 0, nat(separation, hetp) && hetp > 0, 'plates', [separation, hetp]) }
  /** RELATIVE VOLATILITY of vapor over liquid. value ⌊vapor · 100 / liquid⌋. */
  static volatility(vapor: number, liquid: number): CrossFormula { return c('distillation-volatility', 'volatility(vapor, liquid) = ⌊vapor · 100 / liquid⌋', liquid > 0 ? Math.floor((vapor * 100) / liquid) : 0, nat(vapor, liquid) && liquid > 0, 'volatility', [vapor, liquid]) }
  /** RECOVERY of what was collected over what was fed. value ⌊collected · 100 / fed⌋. */
  static recovery(collected: number, fed: number): CrossFormula { return c('distillation-recovery', 'recovery(collected, fed) = ⌊collected · 100 / fed⌋', fed > 0 ? Math.floor((collected * 100) / fed) : 0, nat(collected, fed) && fed > 0 && collected <= fed, 'recovery', [collected, fed]) }
  /** HEADS CUT off the front as a percentage. value ⌊heads · 100 / total⌋. */
  static cut(heads: number, total: number): CrossFormula { return c('distillation-cut', 'cut(heads, total) = ⌊heads · 100 / total⌋', total > 0 ? Math.floor((heads * 100) / total) : 0, nat(heads, total) && total > 0 && heads <= total, 'cut', [heads, total]) }
  /** BOILING TEMPERATURE held, in degrees celsius. value celsius. */
  static temperature(celsius: number): CrossFormula { return c('distillation-temperature', 'temperature(celsius) = celsius', celsius, nat(celsius), 'temperature', [celsius]) }
  /** AZEOTROPE balance of component a in the pair. value ⌊componenta · 100 / (componenta + componentb)⌋. */
  static azeotrope(componenta: number, componentb: number): CrossFormula { return c('distillation-azeotrope', 'azeotrope(componenta, componentb) = ⌊componenta · 100 / (componenta + componentb)⌋', (componenta + componentb) > 0 ? Math.floor((componenta * 100) / (componenta + componentb)) : 0, nat(componenta, componentb) && (componenta + componentb) > 0, 'azeotrope', [componenta, componentb]) }
}

for (const name of ['azeotrope', 'cut', 'plates', 'purity', 'recovery', 'reflux', 'temperature', 'volatility'] as const)
  hexRegisterOf('distillation', name, (DistillationFormulas[name] as (...x: unknown[]) => unknown).bind(DistillationFormulas))
