import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SEMICONDUCTORS — THE DEVICE PHYSICS OF A CHIP, AS ARITHMETIC. A fabricated part is numbers: the bandgap left after
 *  narrowing, the dopant atoms in a volume, drift mobility, the resistivity of a bar, the gate overdrive past threshold,
 *  die yield, dies per wafer, and junction capacitance. Crosses to `electrical` — a semiconductor is what carries the
 *  current electrical circuits describe. A measure. */

const PROOF = 'semiconductor arithmetic (bandgap, doping, mobility, resistivity, threshold overdrive, yield, dies per wafer, junction); device physics as integers; a measure crossed to electrical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'semiconductors', dst: 'electrical', formula, value, proof: PROOF, ...extra }, holds, { name: `semiconductors.${name}`, params })

export class SemiconductorsFormulas {
  /** BANDGAP: the gap energy (meV) left after temperature narrowing. value max(0, base − narrow). */
  static bandgap(base: number, narrow: number): CrossFormula { return c('semiconductors-bandgap', 'bandgap(base, narrow) = max(0, base − narrow)', Math.max(0, base - narrow), nat(base, narrow), 'bandgap', [base, narrow]) }
  /** DOPING: dopant atoms in a volume at a concentration. value concentration · volume. */
  static doping(concentration: number, volume: number): CrossFormula { return c('semiconductors-doping', 'doping(concentration, volume) = concentration · volume', concentration * volume, nat(concentration, volume), 'doping', [concentration, volume]) }
  /** MOBILITY: drift mobility as distance over time. value ⌊distance / time⌋. */
  static mobility(distance: number, time: number): CrossFormula { return c('semiconductors-mobility', 'mobility(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'mobility', [distance, time]) }
  /** RESISTIVITY: ρ = R·A / L of a bar. value ⌊resistance · area / length⌋. */
  static resistivity(resistance: number, area: number, length: number): CrossFormula { return c('semiconductors-resistivity', 'resistivity(resistance, area, length) = ⌊resistance · area / length⌋', length > 0 ? Math.floor((resistance * area) / length) : 0, nat(resistance, area, length) && length > 0, 'resistivity', [resistance, area, length]) }
  /** THRESHOLD: the gate overdrive past the threshold voltage. value max(0, vgs − vt). */
  static threshold(vgs: number, vt: number): CrossFormula { return c('semiconductors-threshold', 'threshold(vgs, vt) = max(0, vgs − vt)', Math.max(0, vgs - vt), nat(vgs, vt), 'threshold', [vgs, vt]) }
  /** YIELD: good dies as a percentage of the total. value ⌊good · 100 / total⌋. */
  static yield(good: number, total: number): CrossFormula { return c('semiconductors-yield', 'yield(good, total) = ⌊good · 100 / total⌋', total > 0 ? Math.floor((good * 100) / total) : 0, nat(good, total) && total > 0 && good <= total, 'yield', [good, total]) }
  /** WAFER: the dies a wafer holds at a die size. value ⌊area / dieSize⌋. */
  static wafer(area: number, dieSize: number): CrossFormula { return c('semiconductors-wafer', 'wafer(area, dieSize) = ⌊area / dieSize⌋', dieSize > 0 ? Math.floor(area / dieSize) : 0, nat(area, dieSize) && dieSize > 0, 'wafer', [area, dieSize]) }
  /** JUNCTION: capacitance C = εA / d, as area over depletion width. value ⌊area / width⌋. */
  static junction(area: number, width: number): CrossFormula { return c('semiconductors-junction', 'junction(area, width) = ⌊area / width⌋', width > 0 ? Math.floor(area / width) : 0, nat(area, width) && width > 0, 'junction', [area, width]) }
}

for (const name of ['bandgap', 'doping', 'junction', 'mobility', 'resistivity', 'threshold', 'wafer', 'yield'] as const)
  hexRegisterOf('semiconductors', name, (SemiconductorsFormulas[name] as (...x: unknown[]) => unknown).bind(SemiconductorsFormulas))
