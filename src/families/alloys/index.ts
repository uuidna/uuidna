import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ALLOYS — METALLURGY AS ARITHMETIC (chosen by the materials registry, not by hand). A mixed metal is numbers: the
 *  percent of a base metal, hardness under a load, the melting point of a mix, tensile strength, the carbon equivalent
 *  of a steel, a phase fraction, density and conductance. Crosses to `materials` — an alloy is a material. A measure. */

const PROOF = 'alloys arithmetic (composition, hardness, melting point, tensile strength, carbon equivalent, phase fraction, density, conductivity); the metallurgy domain of the materials registry; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'alloys', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `alloys.${name}`, params })

export class AlloysFormulas {
  /** CARBON EQUIVALENT of a steel (inputs in hundredths of a percent). value carbon + ⌊mn / 6⌋ + ⌊cr / 5⌋. */
  static carbonequivalent(carbon: number, mn: number, cr: number): CrossFormula { return c('alloys-carbonequivalent', 'carbonequivalent(carbon, mn, cr) = carbon + ⌊mn / 6⌋ + ⌊cr / 5⌋', carbon + Math.floor(mn / 6) + Math.floor(cr / 5), nat(carbon, mn, cr), 'carbonequivalent', [carbon, mn, cr]) }
  /** COMPOSITION: the percent a base metal is of the whole. value ⌊base · 100 / total⌋. */
  static composition(base: number, total: number): CrossFormula { return c('alloys-composition', 'composition(base, total) = ⌊base · 100 / total⌋', total > 0 ? Math.floor((base * 100) / total) : 0, nat(base, total) && total > 0 && base <= total, 'composition', [base, total]) }
  /** CONDUCTANCE: conductivity over a cross-section at a length. value ⌊sigma · area / length⌋. */
  static conductivity(sigma: number, area: number, length: number): CrossFormula { return c('alloys-conductivity', 'conductivity(sigma, area, length) = ⌊sigma · area / length⌋', length > 0 ? Math.floor((sigma * area) / length) : 0, nat(sigma, area, length) && length > 0, 'conductivity', [sigma, area, length]) }
  /** DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('alloys-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** HARDNESS: an indentation load over the indent area. value ⌊load / area⌋. */
  static hardness(load: number, area: number): CrossFormula { return c('alloys-hardness', 'hardness(load, area) = ⌊load / area⌋', area > 0 ? Math.floor(load / area) : 0, nat(load, area) && area > 0, 'hardness', [load, area]) }
  /** MELTING POINT of a two-component mix, by the mean of its components. value ⌊(tempA + tempB) / 2⌋. */
  static meltingpoint(tempA: number, tempB: number): CrossFormula { return c('alloys-meltingpoint', 'meltingpoint(tempA, tempB) = ⌊(tempA + tempB) / 2⌋', Math.floor((tempA + tempB) / 2), nat(tempA, tempB), 'meltingpoint', [tempA, tempB]) }
  /** PHASE FRACTION: the percent one phase is of the whole. value ⌊phase · 100 / total⌋. */
  static phasefraction(phase: number, total: number): CrossFormula { return c('alloys-phasefraction', 'phasefraction(phase, total) = ⌊phase · 100 / total⌋', total > 0 ? Math.floor((phase * 100) / total) : 0, nat(phase, total) && total > 0 && phase <= total, 'phasefraction', [phase, total]) }
  /** TENSILE STRENGTH: a breaking force over the cross-section. value ⌊force / area⌋. */
  static tensile(force: number, area: number): CrossFormula { return c('alloys-tensile', 'tensile(force, area) = ⌊force / area⌋', area > 0 ? Math.floor(force / area) : 0, nat(force, area) && area > 0, 'tensile', [force, area]) }
}

for (const name of ['carbonequivalent', 'composition', 'conductivity', 'density', 'hardness', 'meltingpoint', 'phasefraction', 'tensile'] as const)
  hexRegisterOf('alloys', name, (AlloysFormulas[name] as (...x: unknown[]) => unknown).bind(AlloysFormulas))
