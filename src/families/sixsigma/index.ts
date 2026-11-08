import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SIXSIGMA — PROCESS QUALITY, AS ARITHMETIC (the DMAIC measures, every one an integer). A process is numbers: defects per
 *  million opportunities, defects per unit, first-pass yield, rolled throughput yield, the capability index, the sigma
 *  level that spec and spread allow, total defects and total opportunities. Crosses to `quality` — six sigma is how quality
 *  is measured. A measure. */

const PROOF = 'six sigma arithmetic (dpmo, dpu, yield, rolled throughput, cpk, sigma level, defects, opportunities); the DMAIC measures as integers; a measure crossed to quality'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sixsigma', dst: 'quality', formula, value, proof: PROOF, ...extra }, holds, { name: `sixsigma.${name}`, params })

export class SixsigmaFormulas {
  /** CAPABILITY INDEX: tolerance over spread, ×100 (Cpk 1.33 reads 133). value ⌊tolerance · 100 / spread⌋. */
  static cpk(tolerance: number, spread: number): CrossFormula { return c('sixsigma-cpk', 'cpk(tolerance, spread) = ⌊tolerance · 100 / spread⌋', spread > 0 ? Math.floor((tolerance * 100) / spread) : 0, nat(tolerance, spread) && spread > 0, 'cpk', [tolerance, spread]) }
  /** TOTAL DEFECTS: units at a per-unit defect count. value units · perUnit. */
  static defects(units: number, perUnit: number): CrossFormula { return c('sixsigma-defects', 'defects(units, perUnit) = units · perUnit', units * perUnit, nat(units, perUnit), 'defects', [units, perUnit]) }
  /** DEFECTS PER MILLION OPPORTUNITIES. value ⌊defects · 1000000 / opportunities⌋. */
  static dpmo(defects: number, opportunities: number): CrossFormula { return c('sixsigma-dpmo', 'dpmo(defects, opportunities) = ⌊defects · 1000000 / opportunities⌋', opportunities > 0 ? Math.floor((defects * 1000000) / opportunities) : 0, nat(defects, opportunities) && opportunities > 0, 'dpmo', [defects, opportunities]) }
  /** DEFECTS PER UNIT, per thousand units. value ⌊defects · 1000 / units⌋. */
  static dpu(defects: number, units: number): CrossFormula { return c('sixsigma-dpu', 'dpu(defects, units) = ⌊defects · 1000 / units⌋', units > 0 ? Math.floor((defects * 1000) / units) : 0, nat(defects, units) && units > 0, 'dpu', [defects, units]) }
  /** TOTAL OPPORTUNITIES: units at a per-unit opportunity count. value units · perUnit. */
  static opportunities(units: number, perUnit: number): CrossFormula { return c('sixsigma-opportunities', 'opportunities(units, perUnit) = units · perUnit', units * perUnit, nat(units, perUnit), 'opportunities', [units, perUnit]) }
  /** ROLLED THROUGHPUT YIELD: three stage yields (percent) multiplied. value ⌊y1 · y2 · y3 / 10000⌋. */
  static rolledthroughput(y1: number, y2: number, y3: number): CrossFormula { return c('sixsigma-rolledthroughput', 'rolledthroughput(y1, y2, y3) = ⌊y1 · y2 · y3 / 10000⌋', Math.floor((y1 * y2 * y3) / 10000), nat(y1, y2, y3) && y1 <= 100 && y2 <= 100 && y3 <= 100, 'rolledthroughput', [y1, y2, y3]) }
  /** SIGMA LEVEL: the standard deviations that fit in the spec. value ⌊spec / stddev⌋. */
  static sigma(spec: number, stddev: number): CrossFormula { return c('sixsigma-sigma', 'sigma(spec, stddev) = ⌊spec / stddev⌋', stddev > 0 ? Math.floor(spec / stddev) : 0, nat(spec, stddev) && stddev > 0, 'sigma', [spec, stddev]) }
  /** FIRST-PASS YIELD as a percentage. value ⌊passed · 100 / total⌋. */
  static yield(passed: number, total: number): CrossFormula { return c('sixsigma-yield', 'yield(passed, total) = ⌊passed · 100 / total⌋', total > 0 ? Math.floor((passed * 100) / total) : 0, nat(passed, total) && total > 0 && passed <= total, 'yield', [passed, total]) }
}

for (const name of ['cpk', 'defects', 'dpmo', 'dpu', 'opportunities', 'rolledthroughput', 'sigma', 'yield'] as const)
  hexRegisterOf('sixsigma', name, (SixsigmaFormulas[name] as (...x: unknown[]) => unknown).bind(SixsigmaFormulas))
