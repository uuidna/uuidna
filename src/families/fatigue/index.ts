import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FATIGUE — METAL FATIGUE AS ARITHMETIC (how a material fails under repeated load, not one pull). Cyclic loading is numbers:
 *  the stress range of a cycle, its mean, its amplitude, how many cycles a part lasts, the accumulated Miner damage, the
 *  endurance limit under which it never fails, the R stress ratio, and the safety factor on strength. Crosses to `materials`
 *  — fatigue is a property of the material under test. A measure. */

const PROOF = 'fatigue arithmetic (stress range, mean, amplitude, cycles to failure, Miner damage, endurance limit, stress ratio, safety factor); cyclic failure of a loaded part; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fatigue', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `fatigue.${name}`, params })

export class FatigueFormulas {
  /** CYCLES TO FAILURE: total damage capacity over the damage spent per cycle. value ⌊capacity / perCycle⌋. */
  static cyclestofailure(capacity: number, perCycle: number): CrossFormula { return c('fatigue-cyclestofailure', 'cyclestofailure(capacity, perCycle) = ⌊capacity / perCycle⌋', perCycle > 0 ? Math.floor(capacity / perCycle) : 0, nat(capacity, perCycle) && perCycle > 0, 'cyclestofailure', [capacity, perCycle]) }
  /** STRESS RANGE of a cycle: peak stress less trough stress. value max(0, smax − smin). */
  static stressrange(smax: number, smin: number): CrossFormula { return c('fatigue-stressrange', 'stressrange(smax, smin) = max(0, smax − smin)', Math.max(0, smax - smin), nat(smax, smin) && smax >= smin, 'stressrange', [smax, smin]) }
  /** MEAN STRESS of a cycle: the midpoint of peak and trough. value ⌊(smax + smin) / 2⌋. */
  static meanstress(smax: number, smin: number): CrossFormula { return c('fatigue-meanstress', 'meanstress(smax, smin) = ⌊(smax + smin) / 2⌋', Math.floor((smax + smin) / 2), nat(smax, smin), 'meanstress', [smax, smin]) }
  /** AMPLITUDE of a cycle: half the stress range. value ⌊max(0, smax − smin) / 2⌋. */
  static amplitude(smax: number, smin: number): CrossFormula { return c('fatigue-amplitude', 'amplitude(smax, smin) = ⌊max(0, smax − smin) / 2⌋', Math.floor(Math.max(0, smax - smin) / 2), nat(smax, smin) && smax >= smin, 'amplitude', [smax, smin]) }
  /** MINER DAMAGE: cycles applied over cycles allowed, as a percent of life spent. value ⌊applied · 100 / allowed⌋. */
  static minerdamage(applied: number, allowed: number): CrossFormula { return c('fatigue-minerdamage', 'minerdamage(applied, allowed) = ⌊applied · 100 / allowed⌋', allowed > 0 ? Math.floor((applied * 100) / allowed) : 0, nat(applied, allowed) && allowed > 0, 'minerdamage', [applied, allowed]) }
  /** ENDURANCE LIMIT: the stress below which fatigue never occurs, half the ultimate strength. value ⌊ultimate · 50 / 100⌋. */
  static endurancelimit(ultimate: number): CrossFormula { return c('fatigue-endurancelimit', 'endurancelimit(ultimate) = ⌊ultimate · 50 / 100⌋', Math.floor((ultimate * 50) / 100), nat(ultimate), 'endurancelimit', [ultimate]) }
  /** STRESS RATIO R: trough over peak, as a percent. value ⌊smin · 100 / smax⌋. */
  static stressratio(smin: number, smax: number): CrossFormula { return c('fatigue-stressratio', 'stressratio(smin, smax) = ⌊smin · 100 / smax⌋', smax > 0 ? Math.floor((smin * 100) / smax) : 0, nat(smin, smax) && smax > 0 && smin <= smax, 'stressratio', [smin, smax]) }
  /** SAFETY FACTOR: material strength over the applied stress. value ⌊strength / applied⌋. */
  static safetyfactor(strength: number, applied: number): CrossFormula { return c('fatigue-safetyfactor', 'safetyfactor(strength, applied) = ⌊strength / applied⌋', applied > 0 ? Math.floor(strength / applied) : 0, nat(strength, applied) && applied > 0, 'safetyfactor', [strength, applied]) }
}

for (const name of ['amplitude', 'cyclestofailure', 'endurancelimit', 'meanstress', 'minerdamage', 'safetyfactor', 'stressrange', 'stressratio'] as const)
  hexRegisterOf('fatigue', name, (FatigueFormulas[name] as (...x: unknown[]) => unknown).bind(FatigueFormulas))
