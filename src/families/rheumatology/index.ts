import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RHEUMATOLOGY — DISEASE ACTIVITY AS ARITHMETIC. Measuring inflammatory joint disease is numbers: the composite
 *  activity score, the affected-joint count, sedimentation rate, C-reactive protein above baseline, the flare index,
 *  joint mobility, the pain score, and the combined inflammation burden. Crosses to `immunology` — rheumatic disease is
 *  what the immune system drives. A measure. */

const PROOF = 'rheumatology arithmetic (composite activity, joint count, ESR, CRP, flare index, mobility, pain score, inflammation burden); a measure crossed to immunology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rheumatology', dst: 'immunology', formula, value, proof: PROOF, ...extra }, holds, { name: `rheumatology.${name}`, params })

export class RheumatologyFormulas {
  /** C-REACTIVE PROTEIN above baseline. value max(0, level − baseline). */
  static crp(level: number, baseline: number): CrossFormula { return c('rheumatology-crp', 'crp(level, baseline) = max(0, level − baseline)', Math.max(0, level - baseline), nat(level, baseline), 'crp', [level, baseline]) }
  /** DAS28 composite activity: tender + swollen joints plus a tenth of the sedimentation rate. value tender + swollen + ⌊esr / 10⌋. */
  static das28(tender: number, swollen: number, esr: number): CrossFormula { return c('rheumatology-das28', 'das28(tender, swollen, esr) = tender + swollen + ⌊esr / 10⌋', tender + swollen + Math.floor(esr / 10), nat(tender, swollen, esr), 'das28', [tender, swollen, esr]) }
  /** ESR: the sedimentation distance over the hours elapsed. value ⌊distance / hours⌋. */
  static esr(distance: number, hours: number): CrossFormula { return c('rheumatology-esr', 'esr(distance, hours) = ⌊distance / hours⌋', hours > 0 ? Math.floor(distance / hours) : 0, nat(distance, hours) && hours > 0, 'esr', [distance, hours]) }
  /** FLARE INDEX: the active joints as a percentage of the total. value ⌊active · 100 / total⌋. */
  static flareindex(active: number, total: number): CrossFormula { return c('rheumatology-flareindex', 'flareindex(active, total) = ⌊active · 100 / total⌋', total > 0 ? Math.floor((active * 100) / total) : 0, nat(active, total) && total > 0 && active <= total, 'flareindex', [active, total]) }
  /** INFLAMMATION burden: sedimentation rate plus C-reactive protein. value esr + crp. */
  static inflammation(esr: number, crp: number): CrossFormula { return c('rheumatology-inflammation', 'inflammation(esr, crp) = esr + crp', esr + crp, nat(esr, crp), 'inflammation', [esr, crp]) }
  /** JOINT COUNT: the tender and swollen joints together. value tender + swollen. */
  static jointcount(tender: number, swollen: number): CrossFormula { return c('rheumatology-jointcount', 'jointcount(tender, swollen) = tender + swollen', tender + swollen, nat(tender, swollen), 'jointcount', [tender, swollen]) }
  /** MOBILITY: the achieved range as a percentage of the normal range. value ⌊range · 100 / normal⌋. */
  static mobility(range: number, normal: number): CrossFormula { return c('rheumatology-mobility', 'mobility(range, normal) = ⌊range · 100 / normal⌋', normal > 0 ? Math.floor((range * 100) / normal) : 0, nat(range, normal) && normal > 0 && range <= normal, 'mobility', [range, normal]) }
  /** PAIN SCORE: the reported score as a percentage of the maximum. value ⌊score · 100 / max⌋. */
  static painscore(score: number, max: number): CrossFormula { return c('rheumatology-painscore', 'painscore(score, max) = ⌊score · 100 / max⌋', max > 0 ? Math.floor((score * 100) / max) : 0, nat(score, max) && max > 0 && score <= max, 'painscore', [score, max]) }
}

for (const name of ['crp', 'das28', 'esr', 'flareindex', 'inflammation', 'jointcount', 'mobility', 'painscore'] as const)
  hexRegisterOf('rheumatology', name, (RheumatologyFormulas[name] as (...x: unknown[]) => unknown).bind(RheumatologyFormulas))
