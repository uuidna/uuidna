import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** KNOT — KNOT THEORY AS ARITHMETIC (chosen by the registry, not by hand). A knot is numbers: the crossings a diagram
 *  cannot shed, the genus of its Seifert surface, the bridges, the writhe, the moves to the unknot, the link components,
 *  the determinant, and the sticks of a polygonal realization. Crosses to `topology` — a knot is a topological invariant.
 *  A measure. */

const PROOF = 'knot arithmetic (crossing number, genus, bridge number, writhe, unknotting number, components, determinant, stick count); torus-knot and Seifert invariants; a measure crossed to topology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'knot', dst: 'topology', formula, value, proof: PROOF, ...extra }, holds, { name: `knot.${name}`, params })

export class KnotFormulas {
  /** CROSSING NUMBER of the torus knot T(p, q): the crossings no diagram can shed. value min(p·(q−1), q·(p−1)). */
  static crossingnumber(p: number, q: number): CrossFormula { return c('knot-crossingnumber', 'crossingnumber(p, q) = min(p·(q−1), q·(p−1))', Math.min(p * Math.max(0, q - 1), q * Math.max(0, p - 1)), nat(p, q), 'crossingnumber', [p, q]) }
  /** SEIFERT GENUS from the crossings c and Seifert circles s. value ⌊(c − s + 1) / 2⌋. */
  static genus(c0: number, s: number): CrossFormula { return c('knot-genus', 'genus(c, s) = ⌊(c − s + 1) / 2⌋', Math.floor(Math.max(0, c0 - s + 1) / 2), nat(c0, s), 'genus', [c0, s]) }
  /** BRIDGE NUMBER of the torus knot T(p, q): the maximal overpasses. value min(p, q). */
  static bridgenumber(p: number, q: number): CrossFormula { return c('knot-bridgenumber', 'bridgenumber(p, q) = min(p, q)', Math.min(p, q), nat(p, q), 'bridgenumber', [p, q]) }
  /** WRITHE: the net sign of the crossings, positive over negative. value max(0, pos − neg). */
  static writhe(pos: number, neg: number): CrossFormula { return c('knot-writhe', 'writhe(pos, neg) = max(0, pos − neg)', Math.max(0, pos - neg), nat(pos, neg), 'writhe', [pos, neg]) }
  /** UNKNOTTING NUMBER of the torus knot T(p, q): the crossing changes to the unknot. value ⌊(p−1)(q−1) / 2⌋. */
  static unknottingnumber(p: number, q: number): CrossFormula { return c('knot-unknottingnumber', 'unknottingnumber(p, q) = ⌊(p−1)(q−1) / 2⌋', Math.floor((Math.max(0, p - 1) * Math.max(0, q - 1)) / 2), nat(p, q), 'unknottingnumber', [p, q]) }
  /** COMPONENTS of the (2, n) torus link: two when n is even, one when n is odd. value [n even] ? 2 : 1. */
  static components(n: number): CrossFormula { return c('knot-components', 'components(n) = [n even] ? 2 : 1', n % 2 === 0 ? 2 : 1, nat(n), 'components', [n]) }
  /** DETERMINANT of the twist knot: an odd invariant of the twists. value 2·twists + 1. */
  static determinant(twists: number): CrossFormula { return c('knot-determinant', 'determinant(twists) = 2·twists + 1', 2 * twists + 1, nat(twists), 'determinant', [twists]) }
  /** STICK NUMBER: the sticks of a polygonal realization from the crossings. value crossings + 3. */
  static stickcount(crossings: number): CrossFormula { return c('knot-stickcount', 'stickcount(crossings) = crossings + 3', crossings + 3, nat(crossings), 'stickcount', [crossings]) }
}

for (const name of ['bridgenumber', 'components', 'crossingnumber', 'determinant', 'genus', 'stickcount', 'unknottingnumber', 'writhe'] as const)
  hexRegisterOf('knot', name, (KnotFormulas[name] as (...x: unknown[]) => unknown).bind(KnotFormulas))
