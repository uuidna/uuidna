import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FERTILIZATION — FEEDING A CROP, AS ARITHMETIC (a measure crossed to agronomy). Growing is numbers: the nitrogen a crop
 *  needs after the soil's credit, a nutrient's share of a blend, the fertilizer a field takes, what the harvest removes,
 *  what leaches away, a soil test against its critical level, a dose split across passes, and how much of what is applied
 *  the crop actually uses. Crosses to `agronomy` — fertilization is what agronomy prescribes. A measure. */

const PROOF = 'fertilization arithmetic (nitrogen rate, NPK share, application rate, nutrient uptake, leaching loss, soil-test index, split dose, use efficiency); a measure crossed to agronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fertilization', dst: 'agronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `fertilization.${name}`, params })

export class FertilizationFormulas {
  /** NITROGEN RATE: the crop's N target less the soil's supply. value max(0, target − soil). */
  static nitrogenrate(target: number, soil: number): CrossFormula { return c('fertilization-nitrogenrate', 'nitrogenrate(target, soil) = max(0, target − soil)', Math.max(0, target - soil), nat(target, soil), 'nitrogenrate', [target, soil]) }
  /** NPK SHARE: a nutrient's percentage of the blend. value ⌊part · 100 / total⌋. */
  static npkratio(part: number, total: number): CrossFormula { return c('fertilization-npkratio', 'npkratio(part, total) = ⌊part · 100 / total⌋', total > 0 ? Math.floor((part * 100) / total) : 0, nat(part, total) && total > 0 && part <= total, 'npkratio', [part, total]) }
  /** APPLICATION RATE: a field's area at a per-hectare rate. value area · rate. */
  static applicationrate(area: number, rate: number): CrossFormula { return c('fertilization-applicationrate', 'applicationrate(area, rate) = area · rate', area * rate, nat(area, rate), 'applicationrate', [area, rate]) }
  /** NUTRIENT UPTAKE: the harvest's yield at a per-unit uptake. value yield · perUnit. */
  static nutrientuptake(yld: number, perUnit: number): CrossFormula { return c('fertilization-nutrientuptake', 'nutrientuptake(yield, perUnit) = yield · perUnit', yld * perUnit, nat(yld, perUnit), 'nutrientuptake', [yld, perUnit]) }
  /** LEACHING LOSS: a percentage of what was applied washes away. value ⌊applied · pct / 100⌋. */
  static leachingloss(applied: number, pct: number): CrossFormula { return c('fertilization-leachingloss', 'leachingloss(applied, pct) = ⌊applied · pct / 100⌋', Math.floor((applied * pct) / 100), nat(applied, pct) && pct <= 100, 'leachingloss', [applied, pct]) }
  /** SOIL-TEST INDEX: a measured level against its critical level. value ⌊measured · 100 / critical⌋. */
  static soiltestindex(measured: number, critical: number): CrossFormula { return c('fertilization-soiltestindex', 'soiltestindex(measured, critical) = ⌊measured · 100 / critical⌋', critical > 0 ? Math.floor((measured * 100) / critical) : 0, nat(measured, critical) && critical > 0, 'soiltestindex', [measured, critical]) }
  /** SPLIT APPLICATION: a total dose spread evenly across passes. value ⌊total / splits⌋. */
  static splitapplication(total: number, splits: number): CrossFormula { return c('fertilization-splitapplication', 'splitapplication(total, splits) = ⌊total / splits⌋', splits > 0 ? Math.floor(total / splits) : 0, nat(total, splits) && splits > 0, 'splitapplication', [total, splits]) }
  /** USE EFFICIENCY: the share of applied nutrient the crop takes up. value ⌊uptake · 100 / applied⌋. */
  static efficiency(uptake: number, applied: number): CrossFormula { return c('fertilization-efficiency', 'efficiency(uptake, applied) = ⌊uptake · 100 / applied⌋', applied > 0 ? Math.floor((uptake * 100) / applied) : 0, nat(uptake, applied) && applied > 0 && uptake <= applied, 'efficiency', [uptake, applied]) }
}

for (const name of ['applicationrate', 'efficiency', 'leachingloss', 'nitrogenrate', 'npkratio', 'nutrientuptake', 'soiltestindex', 'splitapplication'] as const)
  hexRegisterOf('fertilization', name, (FertilizationFormulas[name] as (...x: unknown[]) => unknown).bind(FertilizationFormulas))
