import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OptionFormulas — 8 exact-integer formulas of the option domain, each at a hex address crossing to cross; develops the option leads. */

const PROOF = "option counts: strike(x, y) = x · y; premium(x, y) = x · y; contracts(x, y) = x · y; expiry(x, y) = x + y; intrinsic(x, y) = max(0, x − y); breakeven(x, y) = x + y; greeks(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'option', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `option.${name}`, params })

export class OptionFormulas {
  /** strike(x, y) = x · y. */
  static strike(x: number, y: number): CrossFormula { return f('option-strike', 'strike(x, y) = x · y', x * y, nat(x, y), 'strike', [x, y]) }
  /** premium(x, y) = x · y. */
  static premium(x: number, y: number): CrossFormula { return f('option-premium', 'premium(x, y) = x · y', x * y, nat(x, y), 'premium', [x, y]) }
  /** contracts(x, y) = x · y. */
  static contracts(x: number, y: number): CrossFormula { return f('option-contracts', 'contracts(x, y) = x · y', x * y, nat(x, y), 'contracts', [x, y]) }
  /** expiry(x, y) = x + y. */
  static expiry(x: number, y: number): CrossFormula { return f('option-expiry', 'expiry(x, y) = x + y', x + y, nat(x, y), 'expiry', [x, y]) }
  /** intrinsic(x, y) = max(0, x − y). */
  static intrinsic(x: number, y: number): CrossFormula { return f('option-intrinsic', 'intrinsic(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'intrinsic', [x, y]) }
  /** breakeven(x, y) = x + y. */
  static breakeven(x: number, y: number): CrossFormula { return f('option-breakeven', 'breakeven(x, y) = x + y', x + y, nat(x, y), 'breakeven', [x, y]) }
  /** greeks(x, y) = x + y. */
  static greeks(x: number, y: number): CrossFormula { return f('option-greeks', 'greeks(x, y) = x + y', x + y, nat(x, y), 'greeks', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('option-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['breakeven', 'combos', 'contracts', 'expiry', 'greeks', 'intrinsic', 'premium', 'strike'] as const)
  hexRegisterOf('option', name, (OptionFormulas[name] as (...x: unknown[]) => unknown).bind(OptionFormulas))
