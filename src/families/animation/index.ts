import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ANIMATION — MOTION AS ARITHMETIC (chosen by the registry, not by hand). Making things move is numbers: the frames a
 *  shot holds, the in-betweens a tween spans, the keyframes dropped along a timeline, how long a clip plays, the onion
 *  skins shown around the current frame, the cels stacked across layers, the eased progress, and the clip's duration in
 *  milliseconds. Crosses to `media` — animation is the moving picture media carries. A measure. */

const PROOF = 'animation arithmetic (frames, tweening in-betweens, keyframes, playback seconds, onion skins, cels, eased progress, duration ms); a registry domain; a measure crossed to media'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'animation', dst: 'media', formula, value, proof: PROOF, ...extra }, holds, { name: `animation.${name}`, params })

export class AnimationFormulas {
  /** CELS: cels stacked across every layer. value layers · cels. */
  static cel(layers: number, cels: number): CrossFormula { return c('animation-cel', 'cel(layers, cels) = layers · cels', layers * cels, nat(layers, cels), 'cel', [layers, cels]) }
  /** DURATION in milliseconds for a frame count at a frame rate. value ⌊frames · 1000 / fps⌋. */
  static duration(frames: number, fps: number): CrossFormula { return c('animation-duration', 'duration(frames, fps) = ⌊frames · 1000 / fps⌋', fps > 0 ? Math.floor((frames * 1000) / fps) : 0, nat(frames, fps) && fps > 0, 'duration', [frames, fps]) }
  /** EASING: eased progress as a percentage of the duration. value ⌊t · 100 / duration⌋. */
  static easing(t: number, duration: number): CrossFormula { return c('animation-easing', 'easing(t, duration) = ⌊t · 100 / duration⌋', duration > 0 ? Math.floor((t * 100) / duration) : 0, nat(t, duration) && duration > 0, 'easing', [t, duration]) }
  /** FRAMES: the frames a shot holds at a frame rate. value seconds · fps. */
  static frames(seconds: number, fps: number): CrossFormula { return c('animation-frames', 'frames(seconds, fps) = seconds · fps', seconds * fps, nat(seconds, fps), 'frames', [seconds, fps]) }
  /** KEYFRAMES placed every so many frames along a timeline. value ⌈total / every⌉. */
  static keyframes(total: number, every: number): CrossFormula { return c('animation-keyframes', 'keyframes(total, every) = ⌈total / every⌉', every > 0 ? Math.ceil(total / every) : 0, nat(total, every) && every > 0, 'keyframes', [total, every]) }
  /** ONIONSKIN: skins shown around the current frame (neighbours plus the frame itself). value before + after + 1. */
  static onionskin(before: number, after: number): CrossFormula { return c('animation-onionskin', 'onionskin(before, after) = before + after + 1', before + after + 1, nat(before, after), 'onionskin', [before, after]) }
  /** PLAYBACK: how long a frame count plays in whole seconds. value ⌊frames / fps⌋. */
  static playback(frames: number, fps: number): CrossFormula { return c('animation-playback', 'playback(frames, fps) = ⌊frames / fps⌋', fps > 0 ? Math.floor(frames / fps) : 0, nat(frames, fps) && fps > 0, 'playback', [frames, fps]) }
  /** TWEENING: the per-step delta spanned between two keyframe values. value ⌊(end − start) / steps⌋. */
  static tweening(start: number, end: number, steps: number): CrossFormula { return c('animation-tweening', 'tweening(start, end, steps) = ⌊max(0, end − start) / steps⌋', steps > 0 ? Math.floor(Math.max(0, end - start) / steps) : 0, nat(start, end, steps) && steps > 0, 'tweening', [start, end, steps]) }
}

for (const name of ['cel', 'duration', 'easing', 'frames', 'keyframes', 'onionskin', 'playback', 'tweening'] as const)
  hexRegisterOf('animation', name, (AnimationFormulas[name] as (...x: unknown[]) => unknown).bind(AnimationFormulas))
