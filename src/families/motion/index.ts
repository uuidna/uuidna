import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MOTION — CSS ANIMATION/TRANSITION, AS ARITHMETIC (learned from Tailwind's duration scale, not by hand). Movement is
 *  numbers: how long a transition runs, the frames it spans at a frame rate, the frame rate itself, a staggered delay,
 *  the stagger of a list, the total span, progress so far, and the step count of an easing. Crosses to `css` — motion is
 *  what a stylesheet declares. A measure. */

const DURATIONS = [75, 100, 150, 200, 300, 500, 700, 1000] as const
const PROOF = 'motion arithmetic (duration scale, frames, fps, delay, stagger, total span, progress, easing steps); Tailwind\'s transition-duration scale; a measure crossed to css'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'motion', dst: 'css', formula, value, proof: PROOF, ...extra }, holds, { name: `motion.${name}`, params })

export class MotionFormulas {
  /** DURATION: the i-th step of Tailwind's duration scale, in ms. value [75,100,150,200,300,500,700,1000][i]. */
  static duration(i: number): CrossFormula { return c('motion-duration', 'duration(i) = [75,100,150,200,300,500,700,1000][i]', nat(i) && i < 8 ? DURATIONS[i] : 0, nat(i) && i < 8, 'duration', [i]) }
  /** FRAMES: the frames a span of ms covers at a frame rate. value ⌊ms · fps / 1000⌋. */
  static frames(ms: number, fps: number): CrossFormula { return c('motion-frames', 'frames(ms, fps) = ⌊ms · fps / 1000⌋', Math.floor((ms * fps) / 1000), nat(ms, fps), 'frames', [ms, fps]) }
  /** FPS: frames over seconds. value ⌊frames / seconds⌋. */
  static fps(frames: number, seconds: number): CrossFormula { return c('motion-fps', 'fps(frames, seconds) = ⌊frames / seconds⌋', seconds > 0 ? Math.floor(frames / seconds) : 0, nat(frames, seconds) && seconds > 0, 'fps', [frames, seconds]) }
  /** DELAY: a step on the base duration scale (75 ms). value step · 75. */
  static delay(step: number): CrossFormula { return c('motion-delay', 'delay(step) = step · 75', step * 75, nat(step), 'delay', [step]) }
  /** STAGGER: a list of items at a per-item gap. value items · gap. */
  static stagger(items: number, gap: number): CrossFormula { return c('motion-stagger', 'stagger(items, gap) = items · gap', items * gap, nat(items, gap), 'stagger', [items, gap]) }
  /** TOTAL SPAN: a duration after its delay. value duration + delay. */
  static total(duration: number, delay: number): CrossFormula { return c('motion-total', 'total(duration, delay) = duration + delay', duration + delay, nat(duration, delay), 'total', [duration, delay]) }
  /** PROGRESS: elapsed over a duration, as a percentage. value ⌊elapsed · 100 / duration⌋. */
  static progress(elapsed: number, duration: number): CrossFormula { return c('motion-progress', 'progress(elapsed, duration) = ⌊elapsed · 100 / duration⌋', duration > 0 ? Math.floor((elapsed * 100) / duration) : 0, nat(elapsed, duration) && duration > 0, 'progress', [elapsed, duration]) }
  /** EASING: the step count of a steps() timing function. value steps. */
  static easing(steps: number): CrossFormula { return c('motion-easing', 'easing(steps) = steps', steps, nat(steps), 'easing', [steps]) }
}

for (const name of ['delay', 'duration', 'easing', 'fps', 'frames', 'progress', 'stagger', 'total'] as const)
  hexRegisterOf('motion', name, (MotionFormulas[name] as (...x: unknown[]) => unknown).bind(MotionFormulas))
