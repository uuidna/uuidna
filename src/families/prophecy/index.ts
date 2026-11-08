import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROPHECY — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'prophecy arithmetic (fulfillmentratio, symbolcount, timecycles, interpretationcombos, numbersum, sequencepaths, subsetreadings, intervalspan); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'prophecy', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `prophecy.${name}`, params })

export class ProphecyFormulas {
  static fulfillmentratio(x: number, y: number): CrossFormula { return c('prophecy-fulfillmentratio', 'fulfillmentratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'fulfillmentratio', [x, y]) }
  static symbolcount(x: number, y: number): CrossFormula { return c('prophecy-symbolcount', 'symbolcount(x, y) = x · y', x * y, nat(x, y), 'symbolcount', [x, y]) }
  static timecycles(x: number, y: number): CrossFormula { return c('prophecy-timecycles', 'timecycles(x, y) = x · y', x * y, nat(x, y), 'timecycles', [x, y]) }
  static interpretationcombos(x: number, y: number): CrossFormula { return c('prophecy-interpretationcombos', 'interpretationcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'interpretationcombos', [x, y]) }
  static numbersum(x: number, y: number, z: number): CrossFormula { return c('prophecy-numbersum', 'numbersum(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'numbersum', [x, y, z]) }
  static sequencepaths(x: number, y: number): CrossFormula { return c('prophecy-sequencepaths', 'sequencepaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'sequencepaths', [x, y]) }
  static subsetreadings(x: number): CrossFormula { return c('prophecy-subsetreadings', 'subsetreadings(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'subsetreadings', [x]) }
  static intervalspan(x: number, y: number): CrossFormula { return c('prophecy-intervalspan', 'intervalspan(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'intervalspan', [x, y]) }
}

for (const name of ['fulfillmentratio', 'interpretationcombos', 'intervalspan', 'numbersum', 'sequencepaths', 'subsetreadings', 'symbolcount', 'timecycles'] as const)
  hexRegisterOf('prophecy', name, (ProphecyFormulas[name] as (...x: unknown[]) => unknown).bind(ProphecyFormulas))
