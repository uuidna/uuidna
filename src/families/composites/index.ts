import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COMPOSITES — FIBER-REINFORCED MATERIALS, AS ARITHMETIC. A laminate is numbers: the rule of mixtures, the fiber
 *  volume fraction, longitudinal stiffness, strength under load, density, the layup thickness, anisotropy between
 *  axes, and the void content (porosity). Crosses to `materials` — a composite is a material by design. A measure. */

const PROOF = 'composites arithmetic (rule of mixtures, fiber fraction, stiffness, strength, density, layup, anisotropy, porosity); fiber-reinforced materials as integers; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'composites', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `composites.${name}`, params })

export class CompositesFormulas {
  /** RULE OF MIXTURES proxy: the sum of fiber and matrix contributions. value fiber + matrix. */
  static rule(fiber: number, matrix: number): CrossFormula { return c('composites-rule', 'rule(fiber, matrix) = fiber + matrix', fiber + matrix, nat(fiber, matrix), 'rule', [fiber, matrix]) }
  /** FIBER VOLUME FRACTION as a percentage. value ⌊fiber · 100 / total⌋. */
  static fiberfraction(fiber: number, total: number): CrossFormula { return c('composites-fiberfraction', 'fiberfraction(fiber, total) = ⌊fiber · 100 / total⌋', total > 0 ? Math.floor((fiber * 100) / total) : 0, nat(fiber, total) && total > 0 && fiber <= total, 'fiberfraction', [fiber, total]) }
  /** LONGITUDINAL STIFFNESS: the fiber modulus scaled by the fraction. value ⌊fibermod · fraction / 100⌋. */
  static stiffness(fibermod: number, fraction: number): CrossFormula { return c('composites-stiffness', 'stiffness(fibermod, fraction) = ⌊fibermod · fraction / 100⌋', Math.floor((fibermod * fraction) / 100), nat(fibermod, fraction), 'stiffness', [fibermod, fraction]) }
  /** STRENGTH: load over the cross-sectional area. value ⌊load / area⌋. */
  static strength(load: number, area: number): CrossFormula { return c('composites-strength', 'strength(load, area) = ⌊load / area⌋', area > 0 ? Math.floor(load / area) : 0, nat(load, area) && area > 0, 'strength', [load, area]) }
  /** DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('composites-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** LAYUP: plies at a thickness each. value plies · thickness. */
  static layup(plies: number, thickness: number): CrossFormula { return c('composites-layup', 'layup(plies, thickness) = plies · thickness', plies * thickness, nat(plies, thickness), 'layup', [plies, thickness]) }
  /** ANISOTROPY: the ratio of longitudinal to transverse, as a percentage. value ⌊longitudinal · 100 / transverse⌋. */
  static anisotropy(longitudinal: number, transverse: number): CrossFormula { return c('composites-anisotropy', 'anisotropy(longitudinal, transverse) = ⌊longitudinal · 100 / transverse⌋', transverse > 0 ? Math.floor((longitudinal * 100) / transverse) : 0, nat(longitudinal, transverse) && transverse > 0, 'anisotropy', [longitudinal, transverse]) }
  /** POROSITY: the void content as a percentage. value ⌊voids · 100 / volume⌋. */
  static porosity(voids: number, volume: number): CrossFormula { return c('composites-porosity', 'porosity(voids, volume) = ⌊voids · 100 / volume⌋', volume > 0 ? Math.floor((voids * 100) / volume) : 0, nat(voids, volume) && volume > 0 && voids <= volume, 'porosity', [voids, volume]) }
}

for (const name of ['anisotropy', 'density', 'fiberfraction', 'layup', 'porosity', 'rule', 'stiffness', 'strength'] as const)
  hexRegisterOf('composites', name, (CompositesFormulas[name] as (...x: unknown[]) => unknown).bind(CompositesFormulas))
