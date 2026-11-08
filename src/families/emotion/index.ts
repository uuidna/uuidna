import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EMOTION — AFFECT AS ARITHMETIC. Feeling is numbers: the balance of positive over negative, arousal above a resting
 *  baseline, how well a stirred state is regulated, empathy matched to another's cues, stress against resources, recovery
 *  back to baseline, contagion across a group, and the intensity of a peak over its duration. Crosses to `med` — emotion
 *  is what medicine reads off the patient. A measure. */

const PROOF = 'emotion arithmetic (valence, arousal, regulation, empathy, stress, recovery, contagion, intensity); affect as a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'emotion', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `emotion.${name}`, params })

export class EmotionFormulas {
  /** VALENCE: positive feeling net of negative. value positive − negative (may be negative). */
  static valence(positive: number, negative: number): CrossFormula { return c('emotion-valence', 'valence(positive, negative) = positive − negative', positive - negative, nat(positive, negative), 'valence', [positive, negative]) }
  /** AROUSAL: intensity above a resting baseline. value max(0, intensity − baseline). */
  static arousal(intensity: number, baseline: number): CrossFormula { return c('emotion-arousal', 'arousal(intensity, baseline) = max(0, intensity − baseline)', Math.max(0, intensity - baseline), nat(intensity, baseline), 'arousal', [intensity, baseline]) }
  /** REGULATION: how much of a stirred state is controlled, per trigger. value ⌊controlled · 100 / triggers⌋. */
  static regulation(controlled: number, triggers: number): CrossFormula { return c('emotion-regulation', 'regulation(controlled, triggers) = ⌊controlled · 100 / triggers⌋', triggers > 0 ? Math.floor((controlled * 100) / triggers) : 0, nat(controlled, triggers) && triggers > 0 && controlled <= triggers, 'regulation', [controlled, triggers]) }
  /** EMPATHY: cues matched out of those shown. value ⌊matched · 100 / cues⌋. */
  static empathy(matched: number, cues: number): CrossFormula { return c('emotion-empathy', 'empathy(matched, cues) = ⌊matched · 100 / cues⌋', cues > 0 ? Math.floor((matched * 100) / cues) : 0, nat(matched, cues) && cues > 0 && matched <= cues, 'empathy', [matched, cues]) }
  /** STRESS: demands measured against resources. value ⌊demands · 100 / resources⌋. */
  static stress(demands: number, resources: number): CrossFormula { return c('emotion-stress', 'stress(demands, resources) = ⌊demands · 100 / resources⌋', resources > 0 ? Math.floor((demands * 100) / resources) : 0, nat(demands, resources) && resources > 0, 'stress', [demands, resources]) }
  /** RECOVERY: the climb back down from an elevated state to baseline. value max(0, elevated − baseline). */
  static recovery(baseline: number, elevated: number): CrossFormula { return c('emotion-recovery', 'recovery(baseline, elevated) = max(0, elevated − baseline)', Math.max(0, elevated - baseline), nat(baseline, elevated), 'recovery', [baseline, elevated]) }
  /** CONTAGION: how far a feeling spreads through a group. value ⌊affected · 100 / group⌋. */
  static contagion(affected: number, group: number): CrossFormula { return c('emotion-contagion', 'contagion(affected, group) = ⌊affected · 100 / group⌋', group > 0 ? Math.floor((affected * 100) / group) : 0, nat(affected, group) && group > 0 && affected <= group, 'contagion', [affected, group]) }
  /** INTENSITY: a peak spread over its duration. value ⌊peak / duration⌋. */
  static intensity(peak: number, duration: number): CrossFormula { return c('emotion-intensity', 'intensity(peak, duration) = ⌊peak / duration⌋', duration > 0 ? Math.floor(peak / duration) : 0, nat(peak, duration) && duration > 0, 'intensity', [peak, duration]) }
}

for (const name of ['arousal', 'contagion', 'empathy', 'intensity', 'recovery', 'regulation', 'stress', 'valence'] as const)
  hexRegisterOf('emotion', name, (EmotionFormulas[name] as (...x: unknown[]) => unknown).bind(EmotionFormulas))
