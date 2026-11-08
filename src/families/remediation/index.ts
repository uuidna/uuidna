import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REMEDIATION — CLEANING A CONTAMINATED SITE, AS ARITHMETIC. Removing pollution is numbers: how concentrated a contaminant
 *  is, how much a treatment reduces it, dilution by clean water, radioactive half-life decay, the fraction cleaned up,
 *  cumulative exposure, whether a reading is under the safe threshold, and the volume of soil to treat. Crosses to
 *  `environment` — remediation is what restores the environment. A measure. */

const PROOF = 'remediation arithmetic (contaminant concentration, reduction, dilution, half-life decay, cleanup fraction, exposure, safe threshold, treatment volume); a measure crossed to environment'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'remediation', dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `remediation.${name}`, params })

export class RemediationFormulas {
  /** CONTAMINANT CONCENTRATION: contaminant mass over the volume it sits in. value ⌊mass / volume⌋. */
  static contaminant(mass: number, volume: number): CrossFormula { return c('remediation-contaminant', 'contaminant(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'contaminant', [mass, volume]) }
  /** REDUCTION as a percentage of what a treatment removed. value ⌊(before − after) · 100 / before⌋. */
  static reduction(before: number, after: number): CrossFormula { return c('remediation-reduction', 'reduction(before, after) = ⌊(before − after) · 100 / before⌋', before > 0 ? Math.floor((Math.max(0, before - after) * 100) / before) : 0, nat(before, after) && before > 0 && after <= before, 'reduction', [before, after]) }
  /** DILUTION: a concentration diluted by a clean-water factor. value ⌊conc / factor⌋. */
  static dilution(conc: number, factor: number): CrossFormula { return c('remediation-dilution', 'dilution(conc, factor) = ⌊conc / factor⌋', factor > 0 ? Math.floor(conc / factor) : 0, nat(conc, factor) && factor > 0, 'dilution', [conc, factor]) }
  /** HALF-LIFE DECAY: what remains of an amount after a number of half-lives. value ⌊initial / 2^periods⌋. */
  static halflife(initial: number, periods: number): CrossFormula { return c('remediation-halflife', 'halflife(initial, periods) = ⌊initial / 2^periods⌋', Math.floor(initial / Math.pow(2, periods)), nat(initial, periods), 'halflife', [initial, periods]) }
  /** CLEANUP: the fraction cleaned, as a percentage. value ⌊removed · 100 / total⌋. */
  static cleanup(removed: number, total: number): CrossFormula { return c('remediation-cleanup', 'cleanup(removed, total) = ⌊removed · 100 / total⌋', total > 0 ? Math.floor((removed * 100) / total) : 0, nat(removed, total) && total > 0 && removed <= total, 'cleanup', [removed, total]) }
  /** EXPOSURE: a daily dose accumulated over days. value dose · days. */
  static exposure(dose: number, days: number): CrossFormula { return c('remediation-exposure', 'exposure(dose, days) = dose · days', dose * days, nat(dose, days), 'exposure', [dose, days]) }
  /** THE THRESHOLD: 1 when a reading is at or under the safe limit. value [level ≤ limit]. */
  static threshold(level: number, limit: number): CrossFormula { return c('remediation-threshold', 'threshold(level, limit) = [level ≤ limit]', level <= limit ? 1 : 0, nat(level, limit), 'threshold', [level, limit]) }
  /** TREATMENT VOLUME: the soil box to treat. value length · width · depth. */
  static volume(length: number, width: number, depth: number): CrossFormula { return c('remediation-volume', 'volume(length, width, depth) = length · width · depth', length * width * depth, nat(length, width, depth), 'volume', [length, width, depth]) }
}

for (const name of ['cleanup', 'contaminant', 'dilution', 'exposure', 'halflife', 'reduction', 'threshold', 'volume'] as const)
  hexRegisterOf('remediation', name, (RemediationFormulas[name] as (...x: unknown[]) => unknown).bind(RemediationFormulas))
