import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HARDNESS — RESISTANCE TO INDENTATION, AS ARITHMETIC. Measuring how a material resists a pressed indenter is numbers:
 *  the Brinell number, the Vickers number, the Rockwell reading, the Knoop number, a tensile estimate from hardness,
 *  the indentation area a load leaves, the ratio of major to minor load, and a scale conversion. Crosses to `materials` —
 *  hardness is a property materials carry. A measure. */

const PROOF = 'hardness arithmetic (Brinell, Vickers, Rockwell, Knoop, tensile estimate, indentation area, load ratio, scale conversion); resistance to indentation; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hardness', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `hardness.${name}`, params })

export class HardnessFormulas {
  /** BRINELL: the load carried by the indentation area. value ⌊load / area⌋. */
  static brinell(load: number, area: number): CrossFormula { return c('hardness-brinell', 'brinell(load, area) = ⌊load / area⌋', area > 0 ? Math.floor(load / area) : 0, nat(load, area) && area > 0, 'brinell', [load, area]) }
  /** VICKERS: the diamond-pyramid number, 1.854 · load over the diagonal area. value ⌊1854 · load / area⌋. */
  static vickers(load: number, area: number): CrossFormula { return c('hardness-vickers', 'vickers(load, area) = ⌊1854 · load / area⌋', area > 0 ? Math.floor((1854 * load) / area) : 0, nat(load, area) && area > 0, 'vickers', [load, area]) }
  /** ROCKWELL: a base reading less the penetration depth. value max(0, base − depth). */
  static rockwell(base: number, depth: number): CrossFormula { return c('hardness-rockwell', 'rockwell(base, depth) = max(0, base − depth)', Math.max(0, base - depth), nat(base, depth), 'rockwell', [base, depth]) }
  /** KNOOP: the elongated-pyramid number, 14.229 · load over the area. value ⌊14229 · load / area⌋. */
  static knoop(load: number, area: number): CrossFormula { return c('hardness-knoop', 'knoop(load, area) = ⌊14229 · load / area⌋', area > 0 ? Math.floor((14229 * load) / area) : 0, nat(load, area) && area > 0, 'knoop', [load, area]) }
  /** TENSILE ESTIMATE: ultimate strength from the Brinell number, 3.45 · bhn. value ⌊bhn · 345 / 100⌋. */
  static tensileestimate(bhn: number): CrossFormula { return c('hardness-tensileestimate', 'tensileestimate(bhn) = ⌊bhn · 345 / 100⌋', Math.floor((bhn * 345) / 100), nat(bhn), 'tensileestimate', [bhn]) }
  /** INDENTATION: the area a load leaves at a given hardness. value ⌊load / hardness⌋. */
  static indentation(load: number, hardness: number): CrossFormula { return c('hardness-indentation', 'indentation(load, hardness) = ⌊load / hardness⌋', hardness > 0 ? Math.floor(load / hardness) : 0, nat(load, hardness) && hardness > 0, 'indentation', [load, hardness]) }
  /** LOAD RATIO: the major load over the minor load, as a percentage. value ⌊major · 100 / minor⌋. */
  static loadratio(major: number, minor: number): CrossFormula { return c('hardness-loadratio', 'loadratio(major, minor) = ⌊major · 100 / minor⌋', minor > 0 ? Math.floor((major * 100) / minor) : 0, nat(major, minor) && minor > 0, 'loadratio', [major, minor]) }
  /** SCALE CONVERT: a reading scaled by a conversion factor (per hundred). value ⌊value · factor / 100⌋. */
  static scaleconvert(value: number, factor: number): CrossFormula { return c('hardness-scaleconvert', 'scaleconvert(value, factor) = ⌊value · factor / 100⌋', Math.floor((value * factor) / 100), nat(value, factor), 'scaleconvert', [value, factor]) }
}

for (const name of ['brinell', 'indentation', 'knoop', 'loadratio', 'rockwell', 'scaleconvert', 'tensileestimate', 'vickers'] as const)
  hexRegisterOf('hardness', name, (HardnessFormulas[name] as (...x: unknown[]) => unknown).bind(HardnessFormulas))
