import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EDITING — THE CUTTING ROOM AS ARITHMETIC (chosen by the public-API registry, not by hand). Assembling a cut is numbers:
 *  the cuts that join the clips, the pace of those cuts, the length of the timeline, the clips a ripple delete shifts, the
 *  frames a transition spends, the runtime a frame count plays to, the takes that cover the setups, and the assembly length.
 *  Crosses to `media` — editing is what media is made of. A measure. */

const PROOF = 'editing arithmetic (cuts, pacing, timeline, ripple, transition, runtime, coverage, assembly); the cutting room as integers; a measure crossed to media'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'editing', dst: 'media', formula, value, proof: PROOF, ...extra }, holds, { name: `editing.${name}`, params })

export class EditingFormulas {
  /** CUTS: the cuts that join a run of clips end to end. value max(0, clips − 1). */
  static cuts(clips: number): CrossFormula { return c('editing-cuts', 'cuts(clips) = max(0, clips − 1)', Math.max(0, clips - 1), nat(clips), 'cuts', [clips]) }
  /** PACING: cuts spent per minute of the cut. value ⌊cuts / minutes⌋. */
  static pacing(cuts: number, minutes: number): CrossFormula { return c('editing-pacing', 'pacing(cuts, minutes) = ⌊cuts / minutes⌋', minutes > 0 ? Math.floor(cuts / minutes) : 0, nat(cuts, minutes) && minutes > 0, 'pacing', [cuts, minutes]) }
  /** TIMELINE: the duration of clips laid end to end, each the same length. value clips · each. */
  static timeline(clips: number, each: number): CrossFormula { return c('editing-timeline', 'timeline(clips, each) = clips · each', clips * each, nat(clips, each), 'timeline', [clips, each]) }
  /** RIPPLE: the clips a ripple delete at a position shifts left. value max(0, total − position). */
  static ripple(position: number, total: number): CrossFormula { return c('editing-ripple', 'ripple(position, total) = max(0, total − position)', Math.max(0, total - position), nat(position, total) && position <= total, 'ripple', [position, total]) }
  /** TRANSITION: the frames every join between clips spends on a transition. value max(0, clips − 1) · frames. */
  static transition(clips: number, frames: number): CrossFormula { return c('editing-transition', 'transition(clips, frames) = max(0, clips − 1) · frames', Math.max(0, clips - 1) * frames, nat(clips, frames), 'transition', [clips, frames]) }
  /** RUNTIME: the seconds a frame count plays to at a frame rate. value ⌊frames / fps⌋. */
  static runtime(frames: number, fps: number): CrossFormula { return c('editing-runtime', 'runtime(frames, fps) = ⌊frames / fps⌋', fps > 0 ? Math.floor(frames / fps) : 0, nat(frames, fps) && fps > 0, 'runtime', [frames, fps]) }
  /** COVERAGE: the takes that cover every setup. value setups · takes. */
  static coverage(setups: number, takes: number): CrossFormula { return c('editing-coverage', 'coverage(setups, takes) = setups · takes', setups * takes, nat(setups, takes), 'coverage', [setups, takes]) }
  /** ASSEMBLY: the length of an assembly cut, each scene the same length. value scenes · perScene. */
  static assembly(scenes: number, perScene: number): CrossFormula { return c('editing-assembly', 'assembly(scenes, perScene) = scenes · perScene', scenes * perScene, nat(scenes, perScene), 'assembly', [scenes, perScene]) }
}

for (const name of ['assembly', 'coverage', 'cuts', 'pacing', 'ripple', 'runtime', 'timeline', 'transition'] as const)
  hexRegisterOf('editing', name, (EditingFormulas[name] as (...x: unknown[]) => unknown).bind(EditingFormulas))
