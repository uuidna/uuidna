import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** IMMUNOLOGY — THE IMMUNE RESPONSE, AS ARITHMETIC (chosen by the registry, not by hand). The response is numbers: the
 *  titer a serial dilution reaches, the antibody response over baseline, seroconversion and neutralization as percentages,
 *  the cell count per volume, the cytokine rise, binding affinity, and the fold boost. Crosses to `med` — immunology is
 *  what medicine measures. A measure. */

const PROOF = 'immunology arithmetic (titer, response, seroconversion, neutralization, cell count, cytokine, affinity, boost); the immune response as a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'immunology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `immunology.${name}`, params })

export class ImmunologyFormulas {
  /** TITER: a serial dilution doubled some number of times. value dilution · 2^doublings. */
  static titer(dilution: number, doublings: number): CrossFormula { return c('immunology-titer', 'titer(dilution, doublings) = dilution · 2^doublings', dilution * (2 ** doublings), nat(dilution, doublings), 'titer', [dilution, doublings]) }
  /** RESPONSE: antibodies over baseline, never below zero. value max(0, antibodies − baseline). */
  static response(antibodies: number, baseline: number): CrossFormula { return c('immunology-response', 'response(antibodies, baseline) = max(0, antibodies − baseline)', Math.max(0, antibodies - baseline), nat(antibodies, baseline), 'response', [antibodies, baseline]) }
  /** SEROCONVERSION as a percentage. value ⌊converted · 100 / tested⌋. */
  static seroconversion(converted: number, tested: number): CrossFormula { return c('immunology-seroconversion', 'seroconversion(converted, tested) = ⌊converted · 100 / tested⌋', tested > 0 ? Math.floor((converted * 100) / tested) : 0, nat(converted, tested) && tested > 0 && converted <= tested, 'seroconversion', [converted, tested]) }
  /** NEUTRALIZATION as a percentage. value ⌊blocked · 100 / virus⌋. */
  static neutralization(blocked: number, virus: number): CrossFormula { return c('immunology-neutralization', 'neutralization(blocked, virus) = ⌊blocked · 100 / virus⌋', virus > 0 ? Math.floor((blocked * 100) / virus) : 0, nat(blocked, virus) && virus > 0 && blocked <= virus, 'neutralization', [blocked, virus]) }
  /** CELL COUNT: cells per unit volume. value ⌊cells / volume⌋. */
  static cellcount(cells: number, volume: number): CrossFormula { return c('immunology-cellcount', 'cellcount(cells, volume) = ⌊cells / volume⌋', volume > 0 ? Math.floor(cells / volume) : 0, nat(cells, volume) && volume > 0, 'cellcount', [cells, volume]) }
  /** CYTOKINE: level over baseline, never below zero. value max(0, level − baseline). */
  static cytokine(level: number, baseline: number): CrossFormula { return c('immunology-cytokine', 'cytokine(level, baseline) = max(0, level − baseline)', Math.max(0, level - baseline), nat(level, baseline), 'cytokine', [level, baseline]) }
  /** AFFINITY: bound over free as a percentage. value ⌊bound · 100 / free⌋. */
  static affinity(bound: number, free: number): CrossFormula { return c('immunology-affinity', 'affinity(bound, free) = ⌊bound · 100 / free⌋', free > 0 ? Math.floor((bound * 100) / free) : 0, nat(bound, free) && free > 0, 'affinity', [bound, free]) }
  /** BOOST: the fold rise after over before, ·100. value ⌊after · 100 / before⌋. */
  static boost(after: number, before: number): CrossFormula { return c('immunology-boost', 'boost(after, before) = ⌊after · 100 / before⌋', before > 0 ? Math.floor((after * 100) / before) : 0, nat(after, before) && before > 0, 'boost', [after, before]) }
}

for (const name of ['affinity', 'boost', 'cellcount', 'cytokine', 'neutralization', 'response', 'seroconversion', 'titer'] as const)
  hexRegisterOf('immunology', name, (ImmunologyFormulas[name] as (...x: unknown[]) => unknown).bind(ImmunologyFormulas))
