import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** QUALITY — MANUFACTURING QUALITY AS ARITHMETIC (chosen by the registry, not by hand). Making things well is numbers:
 *  defects per million, first-pass yield, the sigma distance, process capability, conformance, rework, scrap, and
 *  customer satisfaction. Crosses to `manufacturing` — quality is what the line is measured by. A measure. */

const PROOF = 'quality arithmetic (DPMO, first-pass yield, sigma, capability, conformance, rework, scrap, satisfaction); a manufacturing measure crossed to manufacturing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'quality', dst: 'manufacturing', formula, value, proof: PROOF, ...extra }, holds, { name: `quality.${name}`, params })

export class QualityFormulas {
  /** PROCESS CAPABILITY (Cp proxy): tolerance over spread, scaled. value ⌊tolerance · 100 / spread⌋. */
  static capability(tolerance: number, spread: number): CrossFormula { return c('quality-capability', 'capability(tolerance, spread) = ⌊tolerance · 100 / spread⌋', spread > 0 ? Math.floor((tolerance * 100) / spread) : 0, nat(tolerance, spread) && spread > 0, 'capability', [tolerance, spread]) }
  /** CONFORMANCE as a percentage. value ⌊conforming · 100 / inspected⌋. */
  static conformance(conforming: number, inspected: number): CrossFormula { return c('quality-conformance', 'conformance(conforming, inspected) = ⌊conforming · 100 / inspected⌋', inspected > 0 ? Math.floor((conforming * 100) / inspected) : 0, nat(conforming, inspected) && inspected > 0 && conforming <= inspected, 'conformance', [conforming, inspected]) }
  /** DEFECT RATE: defects per million opportunities. value ⌊defects · 1000000 / units⌋. */
  static defectrate(defects: number, units: number): CrossFormula { return c('quality-defectrate', 'defectrate(defects, units) = ⌊defects · 1000000 / units⌋', units > 0 ? Math.floor((defects * 1000000) / units) : 0, nat(defects, units) && units > 0, 'defectrate', [defects, units]) }
  /** FIRST-PASS YIELD as a percentage. value ⌊good · 100 / total⌋. */
  static firstpass(good: number, total: number): CrossFormula { return c('quality-firstpass', 'firstpass(good, total) = ⌊good · 100 / total⌋', total > 0 ? Math.floor((good * 100) / total) : 0, nat(good, total) && total > 0 && good <= total, 'firstpass', [good, total]) }
  /** REWORK as a percentage. value ⌊reworked · 100 / produced⌋. */
  static rework(reworked: number, produced: number): CrossFormula { return c('quality-rework', 'rework(reworked, produced) = ⌊reworked · 100 / produced⌋', produced > 0 ? Math.floor((reworked * 100) / produced) : 0, nat(reworked, produced) && produced > 0 && reworked <= produced, 'rework', [reworked, produced]) }
  /** SATISFACTION as a percentage. value ⌊satisfied · 100 / surveyed⌋. */
  static satisfaction(satisfied: number, surveyed: number): CrossFormula { return c('quality-satisfaction', 'satisfaction(satisfied, surveyed) = ⌊satisfied · 100 / surveyed⌋', surveyed > 0 ? Math.floor((satisfied * 100) / surveyed) : 0, nat(satisfied, surveyed) && surveyed > 0 && satisfied <= surveyed, 'satisfaction', [satisfied, surveyed]) }
  /** SCRAP as a percentage. value ⌊scrapped · 100 / total⌋. */
  static scrap(scrapped: number, total: number): CrossFormula { return c('quality-scrap', 'scrap(scrapped, total) = ⌊scrapped · 100 / total⌋', total > 0 ? Math.floor((scrapped * 100) / total) : 0, nat(scrapped, total) && total > 0 && scrapped <= total, 'scrap', [scrapped, total]) }
  /** SIGMA distance: mean over deviation. value ⌊mean / deviation⌋. */
  static sigma(mean: number, deviation: number): CrossFormula { return c('quality-sigma', 'sigma(mean, deviation) = ⌊mean / deviation⌋', deviation > 0 ? Math.floor(mean / deviation) : 0, nat(mean, deviation) && deviation > 0, 'sigma', [mean, deviation]) }
}

for (const name of ['capability', 'conformance', 'defectrate', 'firstpass', 'rework', 'satisfaction', 'scrap', 'sigma'] as const)
  hexRegisterOf('quality', name, (QualityFormulas[name] as (...x: unknown[]) => unknown).bind(QualityFormulas))
