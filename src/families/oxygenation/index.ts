import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OXYGENATION — GETTING OXYGEN FROM AIR TO BLOOD, AS ARITHMETIC. The breath is numbers: how saturated the blood is, the
 *  oxygen a decilitre carries, the P/F ratio that stages lung injury, the alveolar-arterial gap, the rate oxygen is
 *  delivered, the fraction tissues extract, the blood's carrying capacity, and the shunt that bypasses the exchange.
 *  Crosses to `pulmonology` — oxygenation is what the lung physician reads. A measure. */

const PROOF = 'oxygenation arithmetic (saturation, oxygen content, P/F ratio, A-a gradient, delivery, extraction, carrying capacity, shunt); a measure crossed to pulmonology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'oxygenation', dst: 'pulmonology', formula, value, proof: PROOF, ...extra }, holds, { name: `oxygenation.${name}`, params })

export class OxygenationFormulas {
  /** SATURATION: bound haemoglobin as a percentage of the total. value ⌊bound · 100 / total⌋. */
  static saturation(bound: number, total: number): CrossFormula { return c('oxygenation-saturation', 'saturation(bound, total) = ⌊bound · 100 / total⌋', total > 0 ? Math.floor((bound * 100) / total) : 0, nat(bound, total) && total > 0 && bound <= total, 'saturation', [bound, total]) }
  /** OXYGEN CONTENT: haemoglobin carried at a saturation. value hb · sat. */
  static oxygencontent(hb: number, sat: number): CrossFormula { return c('oxygenation-oxygencontent', 'oxygencontent(hb, sat) = hb · sat', hb * sat, nat(hb, sat) && sat <= 100, 'oxygencontent', [hb, sat]) }
  /** P/F RATIO: arterial oxygen over inspired fraction (percent). value ⌊pao2 · 100 / fio2⌋. */
  static pao2fio2ratio(pao2: number, fio2: number): CrossFormula { return c('oxygenation-pao2fio2ratio', 'pao2fio2ratio(pao2, fio2) = ⌊pao2 · 100 / fio2⌋', fio2 > 0 ? Math.floor((pao2 * 100) / fio2) : 0, nat(pao2, fio2) && fio2 > 0, 'pao2fio2ratio', [pao2, fio2]) }
  /** ALVEOLAR-ARTERIAL GRADIENT: the gap between alveolar and arterial oxygen. value max(0, pAO2 − paO2). */
  static alveolararterial(pAO2: number, paO2: number): CrossFormula { return c('oxygenation-alveolararterial', 'alveolararterial(pAO2, paO2) = max(0, pAO2 − paO2)', Math.max(0, pAO2 - paO2), nat(pAO2, paO2), 'alveolararterial', [pAO2, paO2]) }
  /** DELIVERY RATE: cardiac output times oxygen content. value output · content. */
  static deliveryrate(output: number, content: number): CrossFormula { return c('oxygenation-deliveryrate', 'deliveryrate(output, content) = output · content', output * content, nat(output, content), 'deliveryrate', [output, content]) }
  /** EXTRACTION RATIO: consumption as a percentage of delivery. value ⌊consumption · 100 / delivery⌋. */
  static extractionratio(consumption: number, delivery: number): CrossFormula { return c('oxygenation-extractionratio', 'extractionratio(consumption, delivery) = ⌊consumption · 100 / delivery⌋', delivery > 0 ? Math.floor((consumption * 100) / delivery) : 0, nat(consumption, delivery) && delivery > 0, 'extractionratio', [consumption, delivery]) }
  /** CARRYING CAPACITY: the oxygen a haemoglobin level can bind (1.34 ml/g). value ⌊hb · 134 / 100⌋. */
  static carryingcapacity(hb: number): CrossFormula { return c('oxygenation-carryingcapacity', 'carryingcapacity(hb) = ⌊hb · 134 / 100⌋', Math.floor((hb * 134) / 100), nat(hb), 'carryingcapacity', [hb]) }
  /** SHUNT FRACTION: blood bypassing exchange as a percentage. value ⌊max(0, cc − ca) · 100 / max(0, cc − cv)⌋. */
  static shuntfraction(cc: number, ca: number, cv: number): CrossFormula { return c('oxygenation-shuntfraction', 'shuntfraction(cc, ca, cv) = ⌊max(0, cc − ca) · 100 / max(0, cc − cv)⌋', Math.max(0, cc - cv) > 0 ? Math.floor((Math.max(0, cc - ca) * 100) / Math.max(0, cc - cv)) : 0, nat(cc, ca, cv), 'shuntfraction', [cc, ca, cv]) }
}

for (const name of ['alveolararterial', 'carryingcapacity', 'deliveryrate', 'extractionratio', 'oxygencontent', 'pao2fio2ratio', 'saturation', 'shuntfraction'] as const)
  hexRegisterOf('oxygenation', name, (OxygenationFormulas[name] as (...x: unknown[]) => unknown).bind(OxygenationFormulas))
