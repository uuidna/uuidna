import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHYSIOTHERAPY — RECOVERY AS ARITHMETIC. Rehab is numbers: range of motion regained, strength against bodyweight,
 *  recovery of what was lost, endurance per session, adherence to the plan, pain relieved from baseline, gait speed,
 *  and balance held across trials. Crosses to `med` — physiotherapy is a branch of medicine. A measure. */

const PROOF = 'physiotherapy arithmetic (range of motion, strength, recovery, endurance, adherence, pain, gait, balance); rehab as a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'physiotherapy', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `physiotherapy.${name}`, params })

export class PhysiotherapyFormulas {
  /** RANGE OF MOTION as a percentage of normal. value ⌊achieved · 100 / normal⌋. */
  static rom(achieved: number, normal: number): CrossFormula { return c('physiotherapy-rom', 'rom(achieved, normal) = ⌊achieved · 100 / normal⌋', normal > 0 ? Math.floor((achieved * 100) / normal) : 0, nat(achieved, normal) && normal > 0 && achieved <= normal, 'rom', [achieved, normal]) }
  /** STRENGTH: load lifted against bodyweight, as a percentage. value ⌊lifted · 100 / bodyweight⌋. */
  static strength(lifted: number, bodyweight: number): CrossFormula { return c('physiotherapy-strength', 'strength(lifted, bodyweight) = ⌊lifted · 100 / bodyweight⌋', bodyweight > 0 ? Math.floor((lifted * 100) / bodyweight) : 0, nat(lifted, bodyweight) && bodyweight > 0, 'strength', [lifted, bodyweight]) }
  /** RECOVERY: function regained out of what was lost, as a percentage. value ⌊regained · 100 / lost⌋. */
  static recovery(regained: number, lost: number): CrossFormula { return c('physiotherapy-recovery', 'recovery(regained, lost) = ⌊regained · 100 / lost⌋', lost > 0 ? Math.floor((regained * 100) / lost) : 0, nat(regained, lost) && lost > 0 && regained <= lost, 'recovery', [regained, lost]) }
  /** ENDURANCE: repetitions sustained per unit time. value ⌊repetitions / time⌋. */
  static endurance(repetitions: number, time: number): CrossFormula { return c('physiotherapy-endurance', 'endurance(repetitions, time) = ⌊repetitions / time⌋', time > 0 ? Math.floor(repetitions / time) : 0, nat(repetitions, time) && time > 0, 'endurance', [repetitions, time]) }
  /** ADHERENCE: sessions completed out of prescribed, as a percentage. value ⌊completed · 100 / prescribed⌋. */
  static adherence(completed: number, prescribed: number): CrossFormula { return c('physiotherapy-adherence', 'adherence(completed, prescribed) = ⌊completed · 100 / prescribed⌋', prescribed > 0 ? Math.floor((completed * 100) / prescribed) : 0, nat(completed, prescribed) && prescribed > 0 && completed <= prescribed, 'adherence', [completed, prescribed]) }
  /** PAIN relieved from baseline. value max(0, baseline − current). */
  static pain(baseline: number, current: number): CrossFormula { return c('physiotherapy-pain', 'pain(baseline, current) = max(0, baseline − current)', Math.max(0, baseline - current), nat(baseline, current), 'pain', [baseline, current]) }
  /** GAIT speed: distance covered per unit time. value ⌊distance / time⌋. */
  static gait(distance: number, time: number): CrossFormula { return c('physiotherapy-gait', 'gait(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'gait', [distance, time]) }
  /** BALANCE: trials held out of trials attempted, as a percentage. value ⌊held · 100 / trials⌋. */
  static balance(held: number, trials: number): CrossFormula { return c('physiotherapy-balance', 'balance(held, trials) = ⌊held · 100 / trials⌋', trials > 0 ? Math.floor((held * 100) / trials) : 0, nat(held, trials) && trials > 0 && held <= trials, 'balance', [held, trials]) }
}

for (const name of ['adherence', 'balance', 'endurance', 'gait', 'pain', 'recovery', 'rom', 'strength'] as const)
  hexRegisterOf('physiotherapy', name, (PhysiotherapyFormulas[name] as (...x: unknown[]) => unknown).bind(PhysiotherapyFormulas))
