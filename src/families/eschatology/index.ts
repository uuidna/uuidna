import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ESCHATOLOGY — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'eschatology arithmetic (stageorderings, scenariocombos, symbolcount, cyclelength, outcomechoices, intervalspan, tribulationphases, numbersum); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'eschatology', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `eschatology.${name}`, params })

export class EschatologyFormulas {
  static stageorderings(x: number): CrossFormula { return c('eschatology-stageorderings', 'stageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stageorderings', [x]) }
  static scenariocombos(x: number, y: number): CrossFormula { return c('eschatology-scenariocombos', 'scenariocombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'scenariocombos', [x, y]) }
  static symbolcount(x: number, y: number): CrossFormula { return c('eschatology-symbolcount', 'symbolcount(x, y) = x · y', x * y, nat(x, y), 'symbolcount', [x, y]) }
  static cyclelength(x: number, y: number): CrossFormula { return c('eschatology-cyclelength', 'cyclelength(x, y) = x · y', x * y, nat(x, y), 'cyclelength', [x, y]) }
  static outcomechoices(x: number): CrossFormula { return c('eschatology-outcomechoices', 'outcomechoices(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'outcomechoices', [x]) }
  static intervalspan(x: number, y: number): CrossFormula { return c('eschatology-intervalspan', 'intervalspan(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'intervalspan', [x, y]) }
  static tribulationphases(x: number, y: number): CrossFormula { return c('eschatology-tribulationphases', 'tribulationphases(x, y) = x + y', x + y, nat(x, y), 'tribulationphases', [x, y]) }
  static numbersum(x: number, y: number, z: number): CrossFormula { return c('eschatology-numbersum', 'numbersum(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'numbersum', [x, y, z]) }
}

for (const name of ['cyclelength', 'intervalspan', 'numbersum', 'outcomechoices', 'scenariocombos', 'stageorderings', 'symbolcount', 'tribulationphases'] as const)
  hexRegisterOf('eschatology', name, (EschatologyFormulas[name] as (...x: unknown[]) => unknown).bind(EschatologyFormulas))
