import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ASSAY — THE BENCH, AS ARITHMETIC (chosen by the registry, not by hand). A quantitative assay is numbers: concentration from
 *  mass and volume, dilution by the C1V1 rule, percent recovery, a limit of detection, a point on the standard curve, purity,
 *  reaction yield, and the mean of replicates. Crosses to `chemistry` — assay is what chemistry measures. A measure. */

const PROOF = 'assay arithmetic (concentration, dilution, recovery, limit of detection, standard curve, purity, yield, replicate mean); a quantitative measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'assay', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `assay.${name}`, params })

export class AssayFormulas {
  /** CONCENTRATION: mass over volume. value ⌊mass / volume⌋. */
  static concentration(mass: number, volume: number): CrossFormula { return c('assay-concentration', 'concentration(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'concentration', [mass, volume]) }
  /** DILUTION by the C1V1 = C2V2 rule: concentration after diluting a sample into a total. value ⌊conc · vol / total⌋. */
  static dilution(conc: number, vol: number, total: number): CrossFormula { return c('assay-dilution', 'dilution(conc, vol, total) = ⌊conc · vol / total⌋', total > 0 ? Math.floor((conc * vol) / total) : 0, nat(conc, vol, total) && total > 0, 'dilution', [conc, vol, total]) }
  /** RECOVERY as a percentage. value ⌊found · 100 / expected⌋. */
  static recovery(found: number, expected: number): CrossFormula { return c('assay-recovery', 'recovery(found, expected) = ⌊found · 100 / expected⌋', expected > 0 ? Math.floor((found * 100) / expected) : 0, nat(found, expected) && expected > 0, 'recovery', [found, expected]) }
  /** LIMIT OF DETECTION: the blank plus k standard deviations. value blank + k · sd. */
  static limitofdetection(blank: number, k: number, sd: number): CrossFormula { return c('assay-limitofdetection', 'limitofdetection(blank, k, sd) = blank + k · sd', blank + k * sd, nat(blank, k, sd), 'limitofdetection', [blank, k, sd]) }
  /** STANDARD CURVE: a point on the line y = slope · x + intercept. value slope · x + intercept. */
  static standardcurve(slope: number, x: number, intercept: number): CrossFormula { return c('assay-standardcurve', 'standardcurve(slope, x, intercept) = slope · x + intercept', slope * x + intercept, nat(slope, x, intercept), 'standardcurve', [slope, x, intercept]) }
  /** PURITY as a percentage. value ⌊pure · 100 / total⌋. */
  static purity(pure: number, total: number): CrossFormula { return c('assay-purity', 'purity(pure, total) = ⌊pure · 100 / total⌋', total > 0 ? Math.floor((pure * 100) / total) : 0, nat(pure, total) && total > 0 && pure <= total, 'purity', [pure, total]) }
  /** YIELD: actual over theoretical, as a percentage. value ⌊actual · 100 / theoretical⌋. */
  static yield(actual: number, theoretical: number): CrossFormula { return c('assay-yield', 'yield(actual, theoretical) = ⌊actual · 100 / theoretical⌋', theoretical > 0 ? Math.floor((actual * 100) / theoretical) : 0, nat(actual, theoretical) && theoretical > 0, 'yield', [actual, theoretical]) }
  /** REPLICATES: the mean of a summed set of replicate readings. value ⌊sum / n⌋. */
  static replicates(sum: number, n: number): CrossFormula { return c('assay-replicates', 'replicates(sum, n) = ⌊sum / n⌋', n > 0 ? Math.floor(sum / n) : 0, nat(sum, n) && n > 0, 'replicates', [sum, n]) }
}

for (const name of ['concentration', 'dilution', 'limitofdetection', 'purity', 'recovery', 'replicates', 'standardcurve', 'yield'] as const)
  hexRegisterOf('assay', name, (AssayFormulas[name] as (...x: unknown[]) => unknown).bind(AssayFormulas))
