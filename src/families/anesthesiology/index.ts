import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ANESTHESIOLOGY — THE OPERATING ROOM AS ARITHMETIC. Keeping a patient under is numbers: the minimum alveolar
 *  concentration of the agents, the dose by weight, the infusion rate, the mean arterial pressure, the blood a case may
 *  lose, oxygenation, the reversal dose, and whether the depth is adequate. Crosses to `physiology` — anesthesia is
 *  applied physiology. A measure. */

const PROOF = 'anesthesiology arithmetic (MAC, weight dose, infusion rate, mean arterial pressure, allowable blood loss, oxygenation, reversal dose, depth); a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'anesthesiology', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `anesthesiology.${name}`, params })

export class AnesthesiologyFormulas {
  /** MAC: the summed minimum-alveolar-concentration fractions of the agents (volatile + nitrous), as percent of 1 MAC. value agent + nitrous. */
  static mac(agent: number, nitrous: number): CrossFormula { return c('anesthesiology-mac', 'mac(agent, nitrous) = agent + nitrous', agent + nitrous, nat(agent, nitrous), 'mac', [agent, nitrous]) }
  /** DOSAGE: a weight-based dose. value weight · perKg. */
  static dosage(weight: number, perKg: number): CrossFormula { return c('anesthesiology-dosage', 'dosage(weight, perKg) = weight · perKg', weight * perKg, nat(weight, perKg), 'dosage', [weight, perKg]) }
  /** INFUSION RATE: a total volume delivered over the hours of a case. value ⌊total / hours⌋. */
  static infusionrate(total: number, hours: number): CrossFormula { return c('anesthesiology-infusionrate', 'infusionrate(total, hours) = ⌊total / hours⌋', hours > 0 ? Math.floor(total / hours) : 0, nat(total, hours) && hours > 0, 'infusionrate', [total, hours]) }
  /** MEAN ARTERIAL PRESSURE: a diastole-weighted mean of the cuff reading. value ⌊(systolic + 2 · diastolic) / 3⌋. */
  static mapp(systolic: number, diastolic: number): CrossFormula { return c('anesthesiology-mapp', 'mapp(systolic, diastolic) = ⌊(systolic + 2 · diastolic) / 3⌋', Math.floor((systolic + 2 * diastolic) / 3), nat(systolic, diastolic), 'mapp', [systolic, diastolic]) }
  /** ALLOWABLE BLOOD LOSS: estimated blood volume times the hematocrit a case may spend. value ⌊ebv · max(0, hi − hf) / hi⌋. */
  static bloodloss(ebv: number, hi: number, hf: number): CrossFormula { return c('anesthesiology-bloodloss', 'bloodloss(ebv, hi, hf) = ⌊ebv · max(0, hi − hf) / hi⌋', hi > 0 ? Math.floor((ebv * Math.max(0, hi - hf)) / hi) : 0, nat(ebv, hi, hf) && hi > 0 && hf <= hi, 'bloodloss', [ebv, hi, hf]) }
  /** OXYGENATION: the P/F ratio, arterial oxygen over the inspired fraction. value ⌊pao2 · 100 / fio2⌋. */
  static oxygenation(pao2: number, fio2: number): CrossFormula { return c('anesthesiology-oxygenation', 'oxygenation(pao2, fio2) = ⌊pao2 · 100 / fio2⌋', fio2 > 0 ? Math.floor((pao2 * 100) / fio2) : 0, nat(pao2, fio2) && fio2 > 0, 'oxygenation', [pao2, fio2]) }
  /** REVERSAL: a weight-based reversal-agent dose. value weight · perKg. */
  static reversal(weight: number, perKg: number): CrossFormula { return c('anesthesiology-reversal', 'reversal(weight, perKg) = weight · perKg', weight * perKg, nat(weight, perKg), 'reversal', [weight, perKg]) }
  /** DEPTH: 1 when the processed-EEG index is at or below the target of adequate anesthesia. value [bis ≤ target]. */
  static depth(bis: number, target: number): CrossFormula { return c('anesthesiology-depth', 'depth(bis, target) = [bis ≤ target]', bis <= target ? 1 : 0, nat(bis, target) && bis <= 100 && target <= 100, 'depth', [bis, target]) }
}

for (const name of ['bloodloss', 'depth', 'dosage', 'infusionrate', 'mac', 'mapp', 'oxygenation', 'reversal'] as const)
  hexRegisterOf('anesthesiology', name, (AnesthesiologyFormulas[name] as (...x: unknown[]) => unknown).bind(AnesthesiologyFormulas))
