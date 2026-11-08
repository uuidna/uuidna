import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHROMATOGRAPHY — SEPARATION SCIENCE, AS ARITHMETIC. A column resolves a mixture into peaks: the time an analyte is held,
 *  how far apart two peaks fall, the theoretical plates of the column, the selectivity between neighbours, the retention
 *  factor, the plate height, the area under a peak, and the retardation factor of a spot. Crosses to `chemistry` — the
 *  separation is what the chemistry is read from. A measure. */

const PROOF = 'chromatography arithmetic (retention, resolution, plates, selectivity, capacity factor, plate height, peak area, Rf); separation science as integer measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'chromatography', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `chromatography.${name}`, params })

export class ChromatographyFormulas {
  /** CAPACITY (retention) FACTOR, ·100: how long held past the void. value ⌊(tr − t0) · 100 / t0⌋. */
  static capacity(tr: number, t0: number): CrossFormula { return c('chromatography-capacity', 'capacity(tr, t0) = ⌊max(0, tr − t0) · 100 / t0⌋', t0 > 0 ? Math.floor((Math.max(0, tr - t0) * 100) / t0) : 0, nat(tr, t0) && t0 > 0, 'capacity', [tr, t0]) }
  /** EFFICIENCY as plate height (HETP): the column length over its plates. value ⌊length / plates⌋. */
  static efficiency(length: number, plates: number): CrossFormula { return c('chromatography-efficiency', 'efficiency(length, plates) = ⌊length / plates⌋', plates > 0 ? Math.floor(length / plates) : 0, nat(length, plates) && plates > 0, 'efficiency', [length, plates]) }
  /** PEAK AREA of a triangular peak: half base times height. value ⌊height · width / 2⌋. */
  static peakarea(height: number, width: number): CrossFormula { return c('chromatography-peakarea', 'peakarea(height, width) = ⌊height · width / 2⌋', Math.floor((height * width) / 2), nat(height, width), 'peakarea', [height, width]) }
  /** THEORETICAL PLATES: column efficiency from retention and peak width. value ⌊16 · tr² / w²⌋. */
  static plates(tr: number, w: number): CrossFormula { return c('chromatography-plates', 'plates(tr, w) = ⌊16 · tr² / w²⌋', w > 0 ? Math.floor((16 * tr * tr) / (w * w)) : 0, nat(tr, w) && w > 0, 'plates', [tr, w]) }
  /** RESOLUTION between two peaks from their separation and widths. value ⌊2 · dt / (w1 + w2)⌋. */
  static resolution(dt: number, w1: number, w2: number): CrossFormula { return c('chromatography-resolution', 'resolution(dt, w1, w2) = ⌊2 · dt / (w1 + w2)⌋', (w1 + w2) > 0 ? Math.floor((2 * dt) / (w1 + w2)) : 0, nat(dt, w1, w2) && (w1 + w2) > 0, 'resolution', [dt, w1, w2]) }
  /** RETENTION: the adjusted retention time, held past the void volume. value max(0, tr − t0). */
  static retention(tr: number, t0: number): CrossFormula { return c('chromatography-retention', 'retention(tr, t0) = max(0, tr − t0)', Math.max(0, tr - t0), nat(tr, t0), 'retention', [tr, t0]) }
  /** RF (retardation factor), ·100: how far a spot ran against the solvent front. value ⌊solute · 100 / solvent⌋. */
  static rf(solute: number, solvent: number): CrossFormula { return c('chromatography-rf', 'rf(solute, solvent) = ⌊solute · 100 / solvent⌋', solvent > 0 ? Math.floor((solute * 100) / solvent) : 0, nat(solute, solvent) && solvent > 0, 'rf', [solute, solvent]) }
  /** SELECTIVITY (separation factor α), ·100: the ratio of two retention factors. value ⌊k2 · 100 / k1⌋. */
  static selectivity(k2: number, k1: number): CrossFormula { return c('chromatography-selectivity', 'selectivity(k2, k1) = ⌊k2 · 100 / k1⌋', k1 > 0 ? Math.floor((k2 * 100) / k1) : 0, nat(k2, k1) && k1 > 0, 'selectivity', [k2, k1]) }
}

for (const name of ['capacity', 'efficiency', 'peakarea', 'plates', 'resolution', 'retention', 'rf', 'selectivity'] as const)
  hexRegisterOf('chromatography', name, (ChromatographyFormulas[name] as (...x: unknown[]) => unknown).bind(ChromatographyFormulas))
