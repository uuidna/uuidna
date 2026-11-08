import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SPICETRADE — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'spicetrade arithmetic (spicecount, routepairs, priceindex, originsubsets, traderoutes, volumetons, blendcombos, marginpct); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'spicetrade', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `spicetrade.${name}`, params })

export class SpicetradeFormulas {
  static spicecount(x: number, y: number): CrossFormula { return c('spicetrade-spicecount', 'spicecount(x, y) = x + y', x + y, nat(x, y), 'spicecount', [x, y]) }
  static routepairs(x: number, y: number): CrossFormula { return c('spicetrade-routepairs', 'routepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'routepairs', [x, y]) }
  static priceindex(x: number, y: number): CrossFormula { return c('spicetrade-priceindex', 'priceindex(x, y) = x · y', x * y, nat(x, y), 'priceindex', [x, y]) }
  static originsubsets(x: number): CrossFormula { return c('spicetrade-originsubsets', 'originsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'originsubsets', [x]) }
  static traderoutes(x: number, y: number): CrossFormula { return c('spicetrade-traderoutes', 'traderoutes(x, y) = x · y', x * y, nat(x, y), 'traderoutes', [x, y]) }
  static volumetons(x: number, y: number): CrossFormula { return c('spicetrade-volumetons', 'volumetons(x, y) = x · y', x * y, nat(x, y), 'volumetons', [x, y]) }
  static blendcombos(x: number, y: number): CrossFormula { return c('spicetrade-blendcombos', 'blendcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'blendcombos', [x, y]) }
  static marginpct(x: number, y: number): CrossFormula { return c('spicetrade-marginpct', 'marginpct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'marginpct', [x, y]) }
}

for (const name of ['blendcombos', 'marginpct', 'originsubsets', 'priceindex', 'routepairs', 'spicecount', 'traderoutes', 'volumetons'] as const)
  hexRegisterOf('spicetrade', name, (SpicetradeFormulas[name] as (...x: unknown[]) => unknown).bind(SpicetradeFormulas))
