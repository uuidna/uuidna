import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MALACOLOGY — scaffolded integer measures crossed to zoology. Every output an exact finite nonnegative integer. */

const PROOF = 'malacology arithmetic (shellwhorls, spiralratio, speciescount, radulateeth, chambercount, growthlines, shellcombos, aperturesize); scaffolded from the integer-op palette; a measure crossed to zoology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'malacology', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name: `malacology.${name}`, params })

export class MalacologyFormulas {
  static shellwhorls(x: number, y: number): CrossFormula { return c('malacology-shellwhorls', 'shellwhorls(x, y) = x + y', x + y, nat(x, y), 'shellwhorls', [x, y]) }
  static spiralratio(x: number, y: number): CrossFormula { return c('malacology-spiralratio', 'spiralratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'spiralratio', [x, y]) }
  static speciescount(x: number, y: number): CrossFormula { return c('malacology-speciescount', 'speciescount(x, y) = x · y', x * y, nat(x, y), 'speciescount', [x, y]) }
  static radulateeth(x: number, y: number): CrossFormula { return c('malacology-radulateeth', 'radulateeth(x, y) = x · y', x * y, nat(x, y), 'radulateeth', [x, y]) }
  static chambercount(x: number, y: number): CrossFormula { return c('malacology-chambercount', 'chambercount(x, y) = x + y', x + y, nat(x, y), 'chambercount', [x, y]) }
  static growthlines(x: number, y: number): CrossFormula { return c('malacology-growthlines', 'growthlines(x, y) = x · y', x * y, nat(x, y), 'growthlines', [x, y]) }
  static shellcombos(x: number, y: number): CrossFormula { return c('malacology-shellcombos', 'shellcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'shellcombos', [x, y]) }
  static aperturesize(x: number, y: number): CrossFormula { return c('malacology-aperturesize', 'aperturesize(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'aperturesize', [x, y]) }
}

for (const name of ['aperturesize', 'chambercount', 'growthlines', 'radulateeth', 'shellcombos', 'shellwhorls', 'speciescount', 'spiralratio'] as const)
  hexRegisterOf('malacology', name, (MalacologyFormulas[name] as (...x: unknown[]) => unknown).bind(MalacologyFormulas))
