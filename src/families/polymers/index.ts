import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** POLYMERS — MACROMOLECULES AS ARITHMETIC (chosen by the materials registry, not by hand). A chain is numbers: the degree
 *  of polymerization, the molecular weight it carries, how crystalline it packs, the glass transition it falls through, the
 *  stress it bears and the strain it takes, how densely it is crosslinked, and how it thickens a solvent. Crosses to
 *  `materials` — a polymer is the material it becomes. A measure. */

const PROOF = 'polymers arithmetic (degree of polymerization, molecular weight, crystallinity, glass transition, tensile strength, elongation, crosslink spacing, relative viscosity); macromolecules as a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'polymers', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `polymers.${name}`, params })

export class PolymersFormulas {
  /** DEGREE OF POLYMERIZATION: the number-average molecular weight over the monomer's molar mass. value ⌊mn / m0⌋. */
  static degreeofpolymerization(mn: number, m0: number): CrossFormula { return c('polymers-degreeofpolymerization', 'degreeofpolymerization(mn, m0) = ⌊mn / m0⌋', m0 > 0 ? Math.floor(mn / m0) : 0, nat(mn, m0) && m0 > 0, 'degreeofpolymerization', [mn, m0]) }
  /** MOLECULAR WEIGHT: the chain is the degree of polymerization times the monomer mass. value dp · m0. */
  static molecularweight(dp: number, m0: number): CrossFormula { return c('polymers-molecularweight', 'molecularweight(dp, m0) = dp · m0', dp * m0, nat(dp, m0), 'molecularweight', [dp, m0]) }
  /** CRYSTALLINITY as a percentage of the mass that packs ordered. value ⌊cryst · 100 / total⌋. */
  static crystallinity(cryst: number, total: number): CrossFormula { return c('polymers-crystallinity', 'crystallinity(cryst, total) = ⌊cryst · 100 / total⌋', total > 0 ? Math.floor((cryst * 100) / total) : 0, nat(cryst, total) && total > 0 && cryst <= total, 'crystallinity', [cryst, total]) }
  /** GLASS TRANSITION: Flory–Fox, the long-chain limit less a constant over the chain length. value max(0, tgInf − ⌊k / mn⌋). */
  static glasstransition(tgInf: number, k: number, mn: number): CrossFormula { return c('polymers-glasstransition', 'glasstransition(tgInf, k, mn) = max(0, tgInf − ⌊k / mn⌋)', Math.max(0, tgInf - (mn > 0 ? Math.floor(k / mn) : 0)), nat(tgInf, k, mn) && mn > 0, 'glasstransition', [tgInf, k, mn]) }
  /** TENSILE STRENGTH: stress is the force borne over the cross-section. value ⌊force / area⌋. */
  static tensilestrength(force: number, area: number): CrossFormula { return c('polymers-tensilestrength', 'tensilestrength(force, area) = ⌊force / area⌋', area > 0 ? Math.floor(force / area) : 0, nat(force, area) && area > 0, 'tensilestrength', [force, area]) }
  /** ELONGATION: the strain at break as a percentage of the original length. value ⌊delta · 100 / original⌋. */
  static elongation(delta: number, original: number): CrossFormula { return c('polymers-elongation', 'elongation(delta, original) = ⌊delta · 100 / original⌋', original > 0 ? Math.floor((delta * 100) / original) : 0, nat(delta, original) && original > 0, 'elongation', [delta, original]) }
  /** CROSSLINK SPACING: the mass of network between two crosslinks. value ⌊mass / links⌋. */
  static crosslink(mass: number, links: number): CrossFormula { return c('polymers-crosslink', 'crosslink(mass, links) = ⌊mass / links⌋', links > 0 ? Math.floor(mass / links) : 0, nat(mass, links) && links > 0, 'crosslink', [mass, links]) }
  /** RELATIVE VISCOSITY (×100): the solution's efflux time over the pure solvent's. value ⌊solution · 100 / solvent⌋. */
  static viscosity(solution: number, solvent: number): CrossFormula { return c('polymers-viscosity', 'viscosity(solution, solvent) = ⌊solution · 100 / solvent⌋', solvent > 0 ? Math.floor((solution * 100) / solvent) : 0, nat(solution, solvent) && solvent > 0, 'viscosity', [solution, solvent]) }
}

for (const name of ['crosslink', 'crystallinity', 'degreeofpolymerization', 'elongation', 'glasstransition', 'molecularweight', 'tensilestrength', 'viscosity'] as const)
  hexRegisterOf('polymers', name, (PolymersFormulas[name] as (...x: unknown[]) => unknown).bind(PolymersFormulas))
