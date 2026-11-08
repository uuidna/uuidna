import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PSYCHOPHYSICS — THE LAW BETWEEN STIMULUS AND SENSATION, AS ARITHMETIC. How much a stimulus must change to be felt is
 *  numbers: the Weber fraction, the just-noticeable difference, the percent-correct threshold, Stevens' power-law magnitude,
 *  signal-over-noise sensitivity, reaction time, sensory adaptation, and magnitude estimation. Crosses to `neuroscience` —
 *  psychophysics is the behaviour the neurons produce. A measure. */

const PROOF = 'psychophysics arithmetic (Weber fraction, jnd, threshold, Stevens power, sensitivity, reaction time, adaptation, magnitude); the law between stimulus and sensation; a measure crossed to neuroscience'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'psychophysics', dst: 'neuroscience', formula, value, proof: PROOF, ...extra }, holds, { name: `psychophysics.${name}`, params })

export class PsychophysicsFormulas {
  /** WEBER FRACTION: the change over the baseline, per mille. value ⌊delta · 1000 / baseline⌋. */
  static weberfraction(delta: number, baseline: number): CrossFormula { return c('psychophysics-weberfraction', 'weberfraction(delta, baseline) = ⌊delta · 1000 / baseline⌋', baseline > 0 ? Math.floor((delta * 1000) / baseline) : 0, nat(delta, baseline) && baseline > 0, 'weberfraction', [delta, baseline]) }
  /** JUST-NOTICEABLE DIFFERENCE: the baseline times its Weber fraction (per mille). value ⌊baseline · weber / 1000⌋. */
  static jnd(baseline: number, weber: number): CrossFormula { return c('psychophysics-jnd', 'jnd(baseline, weber) = ⌊baseline · weber / 1000⌋', Math.floor((baseline * weber) / 1000), nat(baseline, weber), 'jnd', [baseline, weber]) }
  /** ABSOLUTE THRESHOLD: percent correct at the threshold level. value ⌊hits · 100 / trials⌋. */
  static thresholds(hits: number, trials: number): CrossFormula { return c('psychophysics-thresholds', 'thresholds(hits, trials) = ⌊hits · 100 / trials⌋', trials > 0 ? Math.floor((hits * 100) / trials) : 0, nat(hits, trials) && trials > 0 && hits <= trials, 'thresholds', [hits, trials]) }
  /** STEVENS POWER LAW: perceived magnitude is the intensity scaled by a gain (percent). value ⌊intensity · gain / 100⌋. */
  static stevenspower(intensity: number, gain: number): CrossFormula { return c('psychophysics-stevenspower', 'stevenspower(intensity, gain) = ⌊intensity · gain / 100⌋', Math.floor((intensity * gain) / 100), nat(intensity, gain), 'stevenspower', [intensity, gain]) }
  /** SENSITIVITY: the signal over the noise, per cent. value ⌊signal · 100 / noise⌋. */
  static sensitivity(signal: number, noise: number): CrossFormula { return c('psychophysics-sensitivity', 'sensitivity(signal, noise) = ⌊signal · 100 / noise⌋', noise > 0 ? Math.floor((signal * 100) / noise) : 0, nat(signal, noise) && noise > 0, 'sensitivity', [signal, noise]) }
  /** REACTION TIME: a base latency plus the distance travelled at a speed. value base + ⌊distance / speed⌋. */
  static reactiontime(base: number, distance: number, speed: number): CrossFormula { return c('psychophysics-reactiontime', 'reactiontime(base, distance, speed) = base + ⌊distance / speed⌋', speed > 0 ? base + Math.floor(distance / speed) : 0, nat(base, distance, speed) && speed > 0, 'reactiontime', [base, distance, speed]) }
  /** ADAPTATION: the response decays from its initial level. value max(0, initial − decay · time). */
  static adaptation(initial: number, decay: number, time: number): CrossFormula { return c('psychophysics-adaptation', 'adaptation(initial, decay, time) = max(0, initial − decay · time)', Math.max(0, initial - decay * time), nat(initial, decay, time), 'adaptation', [initial, decay, time]) }
  /** MAGNITUDE ESTIMATION: the stimulus reported on a scale. value stimulus · scale. */
  static magnitude(stimulus: number, scale: number): CrossFormula { return c('psychophysics-magnitude', 'magnitude(stimulus, scale) = stimulus · scale', stimulus * scale, nat(stimulus, scale), 'magnitude', [stimulus, scale]) }
}

for (const name of ['adaptation', 'jnd', 'magnitude', 'reactiontime', 'sensitivity', 'stevenspower', 'thresholds', 'weberfraction'] as const)
  hexRegisterOf('psychophysics', name, (PsychophysicsFormulas[name] as (...x: unknown[]) => unknown).bind(PsychophysicsFormulas))
