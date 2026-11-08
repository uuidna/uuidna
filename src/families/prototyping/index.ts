import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROTOTYPING — THE EARLY-BUILD LOOP, AS ARITHMETIC. A prototype is numbers: how faithful to the final it is, how many
 *  iterations per week, how much of the screens the flows cover, how much feedback got incorporated, the velocity of
 *  screens per day, how much is reused, how much of what was tested validated, and how interactive the screens are.
 *  Crosses to `content` — a prototype is content made early. A measure. */

const PROOF = 'prototyping arithmetic (fidelity, iterations, coverage, feedback, velocity, reuse, validation, interactivity); the early-build loop as numbers; a measure crossed to content'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'prototyping', dst: 'content', formula, value, proof: PROOF, ...extra }, holds, { name: `prototyping.${name}`, params })

export class PrototypingFormulas {
  /** FIDELITY: how close the detail is to the final, as a percentage. value ⌊detail · 100 / max⌋. */
  static fidelity(detail: number, max: number): CrossFormula { return c('prototyping-fidelity', 'fidelity(detail, max) = ⌊detail · 100 / max⌋', max > 0 ? Math.floor((detail * 100) / max) : 0, nat(detail, max) && max > 0 && detail <= max, 'fidelity', [detail, max]) }
  /** ITERATIONS: versions per week. value ⌊versions / weeks⌋. */
  static iterations(versions: number, weeks: number): CrossFormula { return c('prototyping-iterations', 'iterations(versions, weeks) = ⌊versions / weeks⌋', weeks > 0 ? Math.floor(versions / weeks) : 0, nat(versions, weeks) && weeks > 0, 'iterations', [versions, weeks]) }
  /** COVERAGE: screens per flow. value ⌊screens / flows⌋. */
  static coverage(screens: number, flows: number): CrossFormula { return c('prototyping-coverage', 'coverage(screens, flows) = ⌊screens / flows⌋', flows > 0 ? Math.floor(screens / flows) : 0, nat(screens, flows) && flows > 0, 'coverage', [screens, flows]) }
  /** FEEDBACK: incorporated out of received, as a percentage. value ⌊incorporated · 100 / received⌋. */
  static feedback(incorporated: number, received: number): CrossFormula { return c('prototyping-feedback', 'feedback(incorporated, received) = ⌊incorporated · 100 / received⌋', received > 0 ? Math.floor((incorporated * 100) / received) : 0, nat(incorporated, received) && received > 0 && incorporated <= received, 'feedback', [incorporated, received]) }
  /** VELOCITY: screens per day. value ⌊screens / days⌋. */
  static velocity(screens: number, days: number): CrossFormula { return c('prototyping-velocity', 'velocity(screens, days) = ⌊screens / days⌋', days > 0 ? Math.floor(screens / days) : 0, nat(screens, days) && days > 0, 'velocity', [screens, days]) }
  /** REUSE: reused out of components, as a percentage. value ⌊reused · 100 / components⌋. */
  static reuse(reused: number, components: number): CrossFormula { return c('prototyping-reuse', 'reuse(reused, components) = ⌊reused · 100 / components⌋', components > 0 ? Math.floor((reused * 100) / components) : 0, nat(reused, components) && components > 0 && reused <= components, 'reuse', [reused, components]) }
  /** VALIDATION: passed out of tested, as a percentage. value ⌊passed · 100 / tested⌋. */
  static validation(passed: number, tested: number): CrossFormula { return c('prototyping-validation', 'validation(passed, tested) = ⌊passed · 100 / tested⌋', tested > 0 ? Math.floor((passed * 100) / tested) : 0, nat(passed, tested) && tested > 0 && passed <= tested, 'validation', [passed, tested]) }
  /** INTERACTIVITY: interactive out of screens, as a percentage. value ⌊interactive · 100 / screens⌋. */
  static interactivity(interactive: number, screens: number): CrossFormula { return c('prototyping-interactivity', 'interactivity(interactive, screens) = ⌊interactive · 100 / screens⌋', screens > 0 ? Math.floor((interactive * 100) / screens) : 0, nat(interactive, screens) && screens > 0 && interactive <= screens, 'interactivity', [interactive, screens]) }
}

for (const name of ['coverage', 'feedback', 'fidelity', 'interactivity', 'iterations', 'reuse', 'validation', 'velocity'] as const)
  hexRegisterOf('prototyping', name, (PrototypingFormulas[name] as (...x: unknown[]) => unknown).bind(PrototypingFormulas))
