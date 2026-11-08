import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EnzymeFormulas — 8 exact-integer formulas of the enzyme domain, each at a hex address crossing to cross; develops the enzyme leads. */

const PROOF = "enzyme counts: turnover(x, y) = x · y; km(x, y) = x / y; vmax(x, y) = x · y; substrates(x, y) = x + y; activesites(x, y) = x · y; inhibition(x, y) = x · 100 / y; ph(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'enzyme', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `enzyme.${name}`, params })

export class EnzymeFormulas {
  /** turnover(x, y) = x · y. */
  static turnover(x: number, y: number): CrossFormula { return f('enzyme-turnover', 'turnover(x, y) = x · y', x * y, nat(x, y), 'turnover', [x, y]) }
  /** km(x, y) = x / y. */
  static km(x: number, y: number): CrossFormula { return f('enzyme-km', 'km(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'km', [x, y]) }
  /** vmax(x, y) = x · y. */
  static vmax(x: number, y: number): CrossFormula { return f('enzyme-vmax', 'vmax(x, y) = x · y', x * y, nat(x, y), 'vmax', [x, y]) }
  /** substrates(x, y) = x + y. */
  static substrates(x: number, y: number): CrossFormula { return f('enzyme-substrates', 'substrates(x, y) = x + y', x + y, nat(x, y), 'substrates', [x, y]) }
  /** activesites(x, y) = x · y. */
  static activesites(x: number, y: number): CrossFormula { return f('enzyme-activesites', 'activesites(x, y) = x · y', x * y, nat(x, y), 'activesites', [x, y]) }
  /** inhibition(x, y) = x · 100 / y. */
  static inhibition(x: number, y: number): CrossFormula { return f('enzyme-inhibition', 'inhibition(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'inhibition', [x, y]) }
  /** ph(x, y) = x / y. */
  static ph(x: number, y: number): CrossFormula { return f('enzyme-ph', 'ph(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ph', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('enzyme-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['activesites', 'combos', 'inhibition', 'km', 'ph', 'substrates', 'turnover', 'vmax'] as const)
  hexRegisterOf('enzyme', name, (EnzymeFormulas[name] as (...x: unknown[]) => unknown).bind(EnzymeFormulas))
