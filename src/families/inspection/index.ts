import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INSPECTION — ACCEPTANCE QUALITY, AS ARITHMETIC (chosen by the public-API registry, not by hand). Checking a lot is
 *  numbers: the defect rate, the sample a lot needs, defects per thousand, whether a lot is accepted, first-pass yield,
 *  rework minutes, scrap rate, and inspection coverage. Crosses to `quality` — inspection is how quality is measured. A
 *  measure. */

const PROOF = 'inspection arithmetic (defect rate, sampling, AQL per thousand, acceptance, first-pass yield, rework, scrap, coverage); an acceptance-quality domain; a measure crossed to quality'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'inspection', dst: 'quality', formula, value, proof: PROOF, ...extra }, holds, { name: `inspection.${name}`, params })

export class InspectionFormulas {
  /** DEFECT RATE as a percentage. value ⌊defects · 100 / total⌋. */
  static defectrate(defects: number, total: number): CrossFormula { return c('inspection-defectrate', 'defectrate(defects, total) = ⌊defects · 100 / total⌋', total > 0 ? Math.floor((defects * 100) / total) : 0, nat(defects, total) && total > 0 && defects <= total, 'defectrate', [defects, total]) }
  /** SAMPLING: the units to sample at one per `rate`. value ⌈lot / rate⌉. */
  static sampling(lot: number, rate: number): CrossFormula { return c('inspection-sampling', 'sampling(lot, rate) = ⌈lot / rate⌉', rate > 0 ? Math.ceil(lot / rate) : 0, nat(lot, rate) && rate > 0, 'sampling', [lot, rate]) }
  /** AQL: defects per thousand sampled. value ⌊defects · 1000 / sampled⌋. */
  static aql(defects: number, sampled: number): CrossFormula { return c('inspection-aql', 'aql(defects, sampled) = ⌊defects · 1000 / sampled⌋', sampled > 0 ? Math.floor((defects * 1000) / sampled) : 0, nat(defects, sampled) && sampled > 0, 'aql', [defects, sampled]) }
  /** ACCEPTANCE: 1 when defects found are within the allowed count. value [found ≤ allowed]. */
  static acceptance(found: number, allowed: number): CrossFormula { return c('inspection-acceptance', 'acceptance(found, allowed) = [found ≤ allowed]', found <= allowed ? 1 : 0, nat(found, allowed), 'acceptance', [found, allowed]) }
  /** FIRST-PASS YIELD as a percentage. value ⌊passed · 100 / total⌋. */
  static firstpass(passed: number, total: number): CrossFormula { return c('inspection-firstpass', 'firstpass(passed, total) = ⌊passed · 100 / total⌋', total > 0 ? Math.floor((passed * 100) / total) : 0, nat(passed, total) && total > 0 && passed <= total, 'firstpass', [passed, total]) }
  /** REWORK: units at minutes each. value units · minutes. */
  static rework(units: number, minutes: number): CrossFormula { return c('inspection-rework', 'rework(units, minutes) = units · minutes', units * minutes, nat(units, minutes), 'rework', [units, minutes]) }
  /** SCRAP RATE as a percentage. value ⌊scrapped · 100 / total⌋. */
  static scrap(scrapped: number, total: number): CrossFormula { return c('inspection-scrap', 'scrap(scrapped, total) = ⌊scrapped · 100 / total⌋', total > 0 ? Math.floor((scrapped * 100) / total) : 0, nat(scrapped, total) && total > 0 && scrapped <= total, 'scrap', [scrapped, total]) }
  /** COVERAGE: the share of a lot inspected, as a percentage. value ⌊inspected · 100 / total⌋. */
  static coverage(inspected: number, total: number): CrossFormula { return c('inspection-coverage', 'coverage(inspected, total) = ⌊inspected · 100 / total⌋', total > 0 ? Math.floor((inspected * 100) / total) : 0, nat(inspected, total) && total > 0 && inspected <= total, 'coverage', [inspected, total]) }
}

for (const name of ['acceptance', 'aql', 'coverage', 'defectrate', 'firstpass', 'rework', 'sampling', 'scrap'] as const)
  hexRegisterOf('inspection', name, (InspectionFormulas[name] as (...x: unknown[]) => unknown).bind(InspectionFormulas))
