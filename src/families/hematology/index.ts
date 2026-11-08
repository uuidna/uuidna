import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HEMATOLOGY — THE BLOOD, AS ARITHMETIC (a med measure, not advice). Counting what a blood panel reports: packed-cell
 *  fraction, hemoglobin concentration, mean cell volume, clotting ratio, platelet density, oxygen saturation, clotting
 *  time, and a white-cell differential. Crosses to `med` — hematology is a reading of the body. A measure. */

const PROOF = 'hematology arithmetic (hematocrit, hemoglobin, mean cell volume, INR, platelets, oxygen saturation, clotting time, differential); a med measure, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hematology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `hematology.${name}`, params })

export class HematologyFormulas {
  /** HEMATOCRIT: packed cells as a percentage of whole blood. value ⌊cells · 100 / blood⌋. */
  static hematocrit(cells: number, blood: number): CrossFormula { return c('hematology-hematocrit', 'hematocrit(cells, blood) = ⌊cells · 100 / blood⌋', blood > 0 ? Math.floor((cells * 100) / blood) : 0, nat(cells, blood) && blood > 0 && cells <= blood, 'hematocrit', [cells, blood]) }
  /** HEMOGLOBIN concentration: mass over volume. value ⌊mass / volume⌋. */
  static hemoglobin(mass: number, volume: number): CrossFormula { return c('hematology-hemoglobin', 'hemoglobin(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'hemoglobin', [mass, volume]) }
  /** MEAN CELL VOLUME: hematocrit scaled by the cell count. value ⌊hematocrit · 10 / count⌋. */
  static mcv(hematocrit: number, count: number): CrossFormula { return c('hematology-mcv', 'mcv(hematocrit, count) = ⌊hematocrit · 10 / count⌋', count > 0 ? Math.floor((hematocrit * 10) / count) : 0, nat(hematocrit, count) && count > 0, 'mcv', [hematocrit, count]) }
  /** INR: the patient's clotting time over the control, as a ratio. value ⌊patient · 100 / control⌋. */
  static inr(patient: number, control: number): CrossFormula { return c('hematology-inr', 'inr(patient, control) = ⌊patient · 100 / control⌋', control > 0 ? Math.floor((patient * 100) / control) : 0, nat(patient, control) && control > 0, 'inr', [patient, control]) }
  /** PLATELETS: the count per unit volume. value ⌊count / volume⌋. */
  static platelets(count: number, volume: number): CrossFormula { return c('hematology-platelets', 'platelets(count, volume) = ⌊count / volume⌋', volume > 0 ? Math.floor(count / volume) : 0, nat(count, volume) && volume > 0, 'platelets', [count, volume]) }
  /** OXYGEN SATURATION: bound as a percentage of capacity. value ⌊bound · 100 / capacity⌋. */
  static oxygen(bound: number, capacity: number): CrossFormula { return c('hematology-oxygen', 'oxygen(bound, capacity) = ⌊bound · 100 / capacity⌋', capacity > 0 ? Math.floor((bound * 100) / capacity) : 0, nat(bound, capacity) && capacity > 0 && bound <= capacity, 'oxygen', [bound, capacity]) }
  /** CLOTTING TIME: seconds, held as a natural. value seconds. */
  static clotting(seconds: number): CrossFormula { return c('hematology-clotting', 'clotting(seconds) = seconds', seconds, nat(seconds), 'clotting', [seconds]) }
  /** DIFFERENTIAL: a cell type as a percentage of the total count. value ⌊type · 100 / total⌋. */
  static differential(type: number, total: number): CrossFormula { return c('hematology-differential', 'differential(type, total) = ⌊type · 100 / total⌋', total > 0 ? Math.floor((type * 100) / total) : 0, nat(type, total) && total > 0 && type <= total, 'differential', [type, total]) }
}

for (const name of ['clotting', 'differential', 'hematocrit', 'hemoglobin', 'inr', 'mcv', 'oxygen', 'platelets'] as const)
  hexRegisterOf('hematology', name, (HematologyFormulas[name] as (...x: unknown[]) => unknown).bind(HematologyFormulas))
