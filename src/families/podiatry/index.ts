import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PODIATRY — THE FOOT, AS ARITHMETIC (chosen by the clinical registry, not by hand). The foot is numbers: the arch index,
 *  the pressure under a load, the cadence of a gait, the pronation angle, a wound's healing, standing balance, stride length,
 *  and callus thickness. Crosses to `med` — podiatry is a branch of medicine. A measure. */

const PROOF = 'podiatry arithmetic (arch index, plantar pressure, gait cadence, pronation, wound healing, balance, stride, callus); a clinical measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'podiatry', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `podiatry.${name}`, params })

export class PodiatryFormulas {
  /** ARCH INDEX: height over length, as a percentage. value ⌊height · 100 / length⌋. */
  static arch(height: number, length: number): CrossFormula { return c('podiatry-arch', 'arch(height, length) = ⌊height · 100 / length⌋', length > 0 ? Math.floor((height * 100) / length) : 0, nat(height, length) && length > 0, 'arch', [height, length]) }
  /** PLANTAR PRESSURE: force over the area it bears on. value ⌊force / area⌋. */
  static pressure(force: number, area: number): CrossFormula { return c('podiatry-pressure', 'pressure(force, area) = ⌊force / area⌋', area > 0 ? Math.floor(force / area) : 0, nat(force, area) && area > 0, 'pressure', [force, area]) }
  /** GAIT CADENCE: steps over the minutes walked. value ⌊steps / minutes⌋. */
  static gait(steps: number, minutes: number): CrossFormula { return c('podiatry-gait', 'gait(steps, minutes) = ⌊steps / minutes⌋', minutes > 0 ? Math.floor(steps / minutes) : 0, nat(steps, minutes) && minutes > 0, 'gait', [steps, minutes]) }
  /** PRONATION: the measured angle. value angle. */
  static pronation(angle: number): CrossFormula { return c('podiatry-pronation', 'pronation(angle) = angle', angle, nat(angle), 'pronation', [angle]) }
  /** WOUND HEALING as a percentage. value ⌊healed · 100 / wound⌋. */
  static healing(healed: number, wound: number): CrossFormula { return c('podiatry-healing', 'healing(healed, wound) = ⌊healed · 100 / wound⌋', wound > 0 ? Math.floor((healed * 100) / wound) : 0, nat(healed, wound) && wound > 0 && healed <= wound, 'healing', [healed, wound]) }
  /** STANDING BALANCE as a percentage of trials held stable. value ⌊stable · 100 / trials⌋. */
  static balance(stable: number, trials: number): CrossFormula { return c('podiatry-balance', 'balance(stable, trials) = ⌊stable · 100 / trials⌋', trials > 0 ? Math.floor((stable * 100) / trials) : 0, nat(stable, trials) && trials > 0 && stable <= trials, 'balance', [stable, trials]) }
  /** STRIDE LENGTH: distance over the steps taken. value ⌊distance / steps⌋. */
  static stride(distance: number, steps: number): CrossFormula { return c('podiatry-stride', 'stride(distance, steps) = ⌊distance / steps⌋', steps > 0 ? Math.floor(distance / steps) : 0, nat(distance, steps) && steps > 0, 'stride', [distance, steps]) }
  /** CALLUS: the measured thickness. value thickness. */
  static callus(thickness: number): CrossFormula { return c('podiatry-callus', 'callus(thickness) = thickness', thickness, nat(thickness), 'callus', [thickness]) }
}

for (const name of ['arch', 'balance', 'callus', 'gait', 'healing', 'pressure', 'pronation', 'stride'] as const)
  hexRegisterOf('podiatry', name, (PodiatryFormulas[name] as (...x: unknown[]) => unknown).bind(PodiatryFormulas))
