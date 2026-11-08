import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HEMATOCRIT — THE RED CELL FRACTION, AS ARITHMETIC. A blood count is numbers: the packed cell volume, the mean
 *  corpuscular volume, the mean corpuscular hemoglobin and its concentration, the red cell count, the hemoglobin ratio,
 *  the plasma fraction left over, and the viscosity the packing drives. Crosses to `hematology` — hematocrit is the
 *  measure hematology reads. A measure. */

const PROOF = 'hematocrit arithmetic (packed cell volume, MCV, MCH, MCHC, red cell count, hemoglobin ratio, plasma fraction, blood viscosity); a measure crossed to hematology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hematocrit', dst: 'hematology', formula, value, proof: PROOF, ...extra }, holds, { name: `hematocrit.${name}`, params })

export class HematocritFormulas {
  /** PACKED CELL VOLUME: packed red cells as a percentage of whole blood. value ⌊packed · 100 / total⌋. */
  static packedcellvolume(packed: number, total: number): CrossFormula { return c('hematocrit-packedcellvolume', 'packedcellvolume(packed, total) = ⌊packed · 100 / total⌋', total > 0 ? Math.floor((packed * 100) / total) : 0, nat(packed, total) && total > 0 && packed <= total, 'packedcellvolume', [packed, total]) }
  /** MEAN CORPUSCULAR VOLUME: the hematocrit volume over the red cell count. value ⌊hct / count⌋. */
  static mcv(hct: number, count: number): CrossFormula { return c('hematocrit-mcv', 'mcv(hct, count) = ⌊hct / count⌋', count > 0 ? Math.floor(hct / count) : 0, nat(hct, count) && count > 0, 'mcv', [hct, count]) }
  /** MEAN CORPUSCULAR HEMOGLOBIN: the hemoglobin over the red cell count. value ⌊hgb / count⌋. */
  static mch(hgb: number, count: number): CrossFormula { return c('hematocrit-mch', 'mch(hgb, count) = ⌊hgb / count⌋', count > 0 ? Math.floor(hgb / count) : 0, nat(hgb, count) && count > 0, 'mch', [hgb, count]) }
  /** MEAN CORPUSCULAR HEMOGLOBIN CONCENTRATION: the hemoglobin over the hematocrit. value ⌊hgb · 100 / hct⌋. */
  static mchc(hgb: number, hct: number): CrossFormula { return c('hematocrit-mchc', 'mchc(hgb, hct) = ⌊hgb · 100 / hct⌋', hct > 0 ? Math.floor((hgb * 100) / hct) : 0, nat(hgb, hct) && hct > 0, 'mchc', [hgb, hct]) }
  /** RED CELL COUNT: the cells a concentration gives over a volume. value conc · volume. */
  static redcellcount(conc: number, volume: number): CrossFormula { return c('hematocrit-redcellcount', 'redcellcount(conc, volume) = conc · volume', conc * volume, nat(conc, volume), 'redcellcount', [conc, volume]) }
  /** HEMOGLOBIN RATIO: hemoglobin as a percentage of a reference total. value ⌊hgb · 100 / total⌋. */
  static hemoglobinratio(hgb: number, total: number): CrossFormula { return c('hematocrit-hemoglobinratio', 'hemoglobinratio(hgb, total) = ⌊hgb · 100 / total⌋', total > 0 ? Math.floor((hgb * 100) / total) : 0, nat(hgb, total) && total > 0, 'hemoglobinratio', [hgb, total]) }
  /** PLASMA FRACTION: the whole blood left once the cells are packed out. value max(0, total − packed). */
  static plasmafraction(total: number, packed: number): CrossFormula { return c('hematocrit-plasmafraction', 'plasmafraction(total, packed) = max(0, total − packed)', Math.max(0, total - packed), nat(total, packed), 'plasmafraction', [total, packed]) }
  /** BLOOD VISCOSITY: the relative viscosity the packing drives, per hundred. value ⌊hct · factor / 100⌋. */
  static bloodviscosity(hct: number, factor: number): CrossFormula { return c('hematocrit-bloodviscosity', 'bloodviscosity(hct, factor) = ⌊hct · factor / 100⌋', Math.floor((hct * factor) / 100), nat(hct, factor), 'bloodviscosity', [hct, factor]) }
}

for (const name of ['bloodviscosity', 'hemoglobinratio', 'mch', 'mchc', 'mcv', 'packedcellvolume', 'plasmafraction', 'redcellcount'] as const)
  hexRegisterOf('hematocrit', name, (HematocritFormulas[name] as (...x: unknown[]) => unknown).bind(HematocritFormulas))
