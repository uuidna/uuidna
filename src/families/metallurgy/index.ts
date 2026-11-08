import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** METALLURGY — THE SCIENCE OF METALS, AS ARITHMETIC (chosen by the materials registry, not by hand). Working metal is
 *  numbers: hardness under a load, an alloy's composition, tensile strength, ductility, grain size, elastic modulus,
 *  fatigue life, and corrosion loss. Crosses to `materials` — metallurgy is what materials science measures. A measure. */

const PROOF = 'metallurgy arithmetic (hardness, alloy composition, tensile, ductility, grain, modulus, fatigue, corrosion); a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'metallurgy', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `metallurgy.${name}`, params })

export class MetallurgyFormulas {
  /** HARDNESS: load over the indentation area. value ⌊load / area⌋. */
  static hardness(load: number, area: number): CrossFormula { return c('metallurgy-hardness', 'hardness(load, area) = ⌊load / area⌋', area > 0 ? Math.floor(load / area) : 0, nat(load, area) && area > 0, 'hardness', [load, area]) }
  /** ALLOY COMPOSITION as a percentage. value ⌊element · 100 / total⌋. */
  static alloy(element: number, total: number): CrossFormula { return c('metallurgy-alloy', 'alloy(element, total) = ⌊element · 100 / total⌋', total > 0 ? Math.floor((element * 100) / total) : 0, nat(element, total) && total > 0 && element <= total, 'alloy', [element, total]) }
  /** TENSILE STRENGTH: force over the cross-section. value ⌊force / section⌋. */
  static tensile(force: number, section: number): CrossFormula { return c('metallurgy-tensile', 'tensile(force, section) = ⌊force / section⌋', section > 0 ? Math.floor(force / section) : 0, nat(force, section) && section > 0, 'tensile', [force, section]) }
  /** DUCTILITY: elongation as a percentage. value ⌊(final − initial) · 100 / initial⌋. */
  static ductility(final: number, initial: number): CrossFormula { return c('metallurgy-ductility', 'ductility(final, initial) = ⌊(final − initial) · 100 / initial⌋', initial > 0 ? Math.floor(((final - initial) * 100) / initial) : 0, nat(final, initial) && initial > 0 && final >= initial, 'ductility', [final, initial]) }
  /** GRAIN SIZE: area over the grain count. value ⌊area / count⌋. */
  static grain(area: number, count: number): CrossFormula { return c('metallurgy-grain', 'grain(area, count) = ⌊area / count⌋', count > 0 ? Math.floor(area / count) : 0, nat(area, count) && count > 0, 'grain', [area, count]) }
  /** ELASTIC MODULUS: stress over strain. value ⌊stress / strain⌋. */
  static modulus(stress: number, strain: number): CrossFormula { return c('metallurgy-modulus', 'modulus(stress, strain) = ⌊stress / strain⌋', strain > 0 ? Math.floor(stress / strain) : 0, nat(stress, strain) && strain > 0, 'modulus', [stress, strain]) }
  /** FATIGUE LIFE: cycles over the load. value ⌊cycles / load⌋. */
  static fatigue(cycles: number, load: number): CrossFormula { return c('metallurgy-fatigue', 'fatigue(cycles, load) = ⌊cycles / load⌋', load > 0 ? Math.floor(cycles / load) : 0, nat(cycles, load) && load > 0, 'fatigue', [cycles, load]) }
  /** CORROSION: mass lost as a percentage of the exposed mass. value ⌊lost · 100 / exposed⌋. */
  static corrosion(lost: number, exposed: number): CrossFormula { return c('metallurgy-corrosion', 'corrosion(lost, exposed) = ⌊lost · 100 / exposed⌋', exposed > 0 ? Math.floor((lost * 100) / exposed) : 0, nat(lost, exposed) && exposed > 0 && lost <= exposed, 'corrosion', [lost, exposed]) }
}

for (const name of ['alloy', 'corrosion', 'ductility', 'fatigue', 'grain', 'hardness', 'modulus', 'tensile'] as const)
  hexRegisterOf('metallurgy', name, (MetallurgyFormulas[name] as (...x: unknown[]) => unknown).bind(MetallurgyFormulas))
