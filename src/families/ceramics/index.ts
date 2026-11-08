import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CERAMICS — THE FIRED-CLAY TRADE, AS ARITHMETIC (chosen by the materials registry, not by hand). Working clay is numbers:
 *  how much a piece shrinks from wet to fired, how porous the body is, the firing cone, bulk density, surface hardness,
 *  glaze laid on in coats, how much thermal shock it bears, and how far vitrification has run. Crosses to `materials` —
 *  ceramics is one of its bodies. A measure. */

const PROOF = 'ceramics arithmetic (shrinkage, porosity, firing cone, density, hardness, glaze, thermal shock, vitrification); a materials body; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ceramics', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `ceramics.${name}`, params })

export class CeramicsFormulas {
  /** SHRINKAGE from wet to fired, as a percentage. value ⌊(wet − fired) · 100 / wet⌋. */
  static shrinkage(wet: number, fired: number): CrossFormula { return c('ceramics-shrinkage', 'shrinkage(wet, fired) = ⌊(wet − fired) · 100 / wet⌋', wet > 0 ? Math.floor(((wet - fired) * 100) / wet) : 0, nat(wet, fired) && wet > 0 && fired <= wet, 'shrinkage', [wet, fired]) }
  /** POROSITY: pore volume over bulk volume, as a percentage. value ⌊pores · 100 / volume⌋. */
  static porosity(pores: number, volume: number): CrossFormula { return c('ceramics-porosity', 'porosity(pores, volume) = ⌊pores · 100 / volume⌋', volume > 0 ? Math.floor((pores * 100) / volume) : 0, nat(pores, volume) && volume > 0 && pores <= volume, 'porosity', [pores, volume]) }
  /** FIRING cone, a temperature proxy. value temperature. */
  static firing(temperature: number): CrossFormula { return c('ceramics-firing', 'firing(temperature) = temperature', temperature, nat(temperature), 'firing', [temperature]) }
  /** DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('ceramics-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** HARDNESS on the scratch scale. value scratch. */
  static hardness(scratch: number): CrossFormula { return c('ceramics-hardness', 'hardness(scratch) = scratch', scratch, nat(scratch), 'hardness', [scratch]) }
  /** GLAZE: thickness laid on in coats. value thickness · coats. */
  static glaze(thickness: number, coats: number): CrossFormula { return c('ceramics-glaze', 'glaze(thickness, coats) = thickness · coats', thickness * coats, nat(thickness, coats), 'glaze', [thickness, coats]) }
  /** THERMAL SHOCK borne: delta over resistance. value ⌊delta / resistance⌋. */
  static thermalshock(delta: number, resistance: number): CrossFormula { return c('ceramics-thermalshock', 'thermalshock(delta, resistance) = ⌊delta / resistance⌋', resistance > 0 ? Math.floor(delta / resistance) : 0, nat(delta, resistance) && resistance > 0, 'thermalshock', [delta, resistance]) }
  /** VITRIFICATION: glassy phase over total, as a percentage. value ⌊glassy · 100 / total⌋. */
  static vitrification(glassy: number, total: number): CrossFormula { return c('ceramics-vitrification', 'vitrification(glassy, total) = ⌊glassy · 100 / total⌋', total > 0 ? Math.floor((glassy * 100) / total) : 0, nat(glassy, total) && total > 0 && glassy <= total, 'vitrification', [glassy, total]) }
}

for (const name of ['density', 'firing', 'glaze', 'hardness', 'porosity', 'shrinkage', 'thermalshock', 'vitrification'] as const)
  hexRegisterOf('ceramics', name, (CeramicsFormulas[name] as (...x: unknown[]) => unknown).bind(CeramicsFormulas))
