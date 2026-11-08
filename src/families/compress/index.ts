import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COMPRESS — scaffolded integer measures crossed to signal. Every output an exact finite nonnegative integer. */

const PROOF = 'compress arithmetic (ratio, savedbits, dictionarysize, codelength, entropybits, blockcombos, huffmandepth, throughput); scaffolded from the integer-op palette; a measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'compress', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `compress.${name}`, params })

export class CompressFormulas {
  static ratio(x: number, y: number): CrossFormula { return c('compress-ratio', 'ratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) }
  static savedbits(x: number, y: number): CrossFormula { return c('compress-savedbits', 'savedbits(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'savedbits', [x, y]) }
  static dictionarysize(x: number): CrossFormula { return c('compress-dictionarysize', 'dictionarysize(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'dictionarysize', [x]) }
  static codelength(x: number, y: number): CrossFormula { return c('compress-codelength', 'codelength(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'codelength', [x, y]) }
  static entropybits(x: number, y: number): CrossFormula { return c('compress-entropybits', 'entropybits(x, y) = x · y', x * y, nat(x, y), 'entropybits', [x, y]) }
  static blockcombos(x: number, y: number): CrossFormula { return c('compress-blockcombos', 'blockcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'blockcombos', [x, y]) }
  static huffmandepth(x: number, y: number): CrossFormula { return c('compress-huffmandepth', 'huffmandepth(x, y) = x + y', x + y, nat(x, y), 'huffmandepth', [x, y]) }
  static throughput(x: number, y: number): CrossFormula { return c('compress-throughput', 'throughput(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'throughput', [x, y]) }
}

for (const name of ['blockcombos', 'codelength', 'dictionarysize', 'entropybits', 'huffmandepth', 'ratio', 'savedbits', 'throughput'] as const)
  hexRegisterOf('compress', name, (CompressFormulas[name] as (...x: unknown[]) => unknown).bind(CompressFormulas))
