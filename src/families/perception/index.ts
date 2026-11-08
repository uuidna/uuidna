import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PERCEPTION — SENSING AS ARITHMETIC (how a system turns stimulus into a read). Detection thresholds, Weber's just-noticeable
 *  difference, visual acuity, contrast, sensory adaptation, signal sensitivity, illusion strength, and reaction latency.
 *  Crosses to `neuroscience` — perception is what the nervous system computes. A measure. */

const PROOF = 'perception arithmetic (threshold, Weber fraction, acuity, contrast, adaptation, sensitivity, illusion, latency); sensing as a measure crossed to neuroscience'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'perception', dst: 'neuroscience', formula, value, proof: PROOF, ...extra }, holds, { name: `perception.${name}`, params })

export class PerceptionFormulas {
  /** DETECTION THRESHOLD: stimuli detected over trials, as a percentage. value ⌊detected · 100 / trials⌋. */
  static threshold(detected: number, trials: number): CrossFormula { return c('perception-threshold', 'threshold(detected, trials) = ⌊detected · 100 / trials⌋', trials > 0 ? Math.floor((detected * 100) / trials) : 0, nat(detected, trials) && trials > 0 && detected <= trials, 'threshold', [detected, trials]) }
  /** WEBER FRACTION: the just-noticeable difference over the baseline, as a percentage. value ⌊difference · 100 / baseline⌋. */
  static weber(difference: number, baseline: number): CrossFormula { return c('perception-weber', 'weber(difference, baseline) = ⌊difference · 100 / baseline⌋', baseline > 0 ? Math.floor((difference * 100) / baseline) : 0, nat(difference, baseline) && baseline > 0, 'weber', [difference, baseline]) }
  /** VISUAL ACUITY: viewing distance over detail size. value ⌊distance / size⌋. */
  static acuity(distance: number, size: number): CrossFormula { return c('perception-acuity', 'acuity(distance, size) = ⌊distance / size⌋', size > 0 ? Math.floor(distance / size) : 0, nat(distance, size) && size > 0, 'acuity', [distance, size]) }
  /** CONTRAST: light over dark luminance, as a percentage. value ⌊light · 100 / dark⌋. */
  static contrast(light: number, dark: number): CrossFormula { return c('perception-contrast', 'contrast(light, dark) = ⌊light · 100 / dark⌋', dark > 0 ? Math.floor((light * 100) / dark) : 0, nat(light, dark) && dark > 0, 'contrast', [light, dark]) }
  /** SENSORY ADAPTATION: the drop from initial to adapted response. value max(0, initial − adapted). */
  static adaptation(initial: number, adapted: number): CrossFormula { return c('perception-adaptation', 'adaptation(initial, adapted) = max(0, initial − adapted)', Math.max(0, initial - adapted), nat(initial, adapted), 'adaptation', [initial, adapted]) }
  /** SIGNAL SENSITIVITY: hits over signals present, as a percentage. value ⌊hits · 100 / signals⌋. */
  static sensitivity(hits: number, signals: number): CrossFormula { return c('perception-sensitivity', 'sensitivity(hits, signals) = ⌊hits · 100 / signals⌋', signals > 0 ? Math.floor((hits * 100) / signals) : 0, nat(hits, signals) && signals > 0 && hits <= signals, 'sensitivity', [hits, signals]) }
  /** ILLUSION STRENGTH: perceived over actual magnitude, as a percentage. value ⌊perceived · 100 / actual⌋. */
  static illusion(perceived: number, actual: number): CrossFormula { return c('perception-illusion', 'illusion(perceived, actual) = ⌊perceived · 100 / actual⌋', actual > 0 ? Math.floor((perceived * 100) / actual) : 0, nat(perceived, actual) && actual > 0, 'illusion', [perceived, actual]) }
  /** REACTION LATENCY: milliseconds to respond. value milliseconds. */
  static latency(milliseconds: number): CrossFormula { return c('perception-latency', 'latency(milliseconds) = milliseconds', milliseconds, nat(milliseconds), 'latency', [milliseconds]) }
}

for (const name of ['acuity', 'adaptation', 'contrast', 'illusion', 'latency', 'sensitivity', 'threshold', 'weber'] as const)
  hexRegisterOf('perception', name, (PerceptionFormulas[name] as (...x: unknown[]) => unknown).bind(PerceptionFormulas))
