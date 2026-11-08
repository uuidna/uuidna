import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INTERESTRATE — scaffolded integer measures crossed to banking. Every output an exact finite nonnegative integer. */

const PROOF = 'interestrate arithmetic (simpleinterest, apr, compoundperiods, doublingyears, discountfactor, yieldcurve, spread, realrate); scaffolded from the integer-op palette; a measure crossed to banking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'interestrate', dst: 'banking', formula, value, proof: PROOF, ...extra }, holds, { name: `interestrate.${name}`, params })

export class InterestrateFormulas {
  static simpleinterest(x: number, y: number): CrossFormula { return c('interestrate-simpleinterest', 'simpleinterest(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'simpleinterest', [x, y]) }
  static apr(x: number, y: number): CrossFormula { return c('interestrate-apr', 'apr(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'apr', [x, y]) }
  static compoundperiods(x: number, y: number): CrossFormula { return c('interestrate-compoundperiods', 'compoundperiods(x, y) = x · y', x * y, nat(x, y), 'compoundperiods', [x, y]) }
  static doublingyears(x: number, y: number): CrossFormula { return c('interestrate-doublingyears', 'doublingyears(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'doublingyears', [x, y]) }
  static discountfactor(x: number, y: number): CrossFormula { return c('interestrate-discountfactor', 'discountfactor(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'discountfactor', [x, y]) }
  static yieldcurve(x: number, y: number, z: number): CrossFormula { return c('interestrate-yieldcurve', 'yieldcurve(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'yieldcurve', [x, y, z]) }
  static spread(x: number, y: number): CrossFormula { return c('interestrate-spread', 'spread(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'spread', [x, y]) }
  static realrate(x: number, y: number): CrossFormula { return c('interestrate-realrate', 'realrate(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'realrate', [x, y]) }
}

for (const name of ['apr', 'compoundperiods', 'discountfactor', 'doublingyears', 'realrate', 'simpleinterest', 'spread', 'yieldcurve'] as const)
  hexRegisterOf('interestrate', name, (InterestrateFormulas[name] as (...x: unknown[]) => unknown).bind(InterestrateFormulas))
