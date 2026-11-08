import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIOGEOGRAPHY — scaffolded integer measures crossed to geography. Every output an exact finite nonnegative integer. */

const PROOF = 'biogeography arithmetic (speciescount, endemismratio, rangesize, dispersalpaths, islandpairs, latitudegradient, habitatsubsets, turnoverrate); scaffolded from the integer-op palette; a measure crossed to geography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'biogeography', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, { name: `biogeography.${name}`, params })

export class BiogeographyFormulas {
  static speciescount(x: number, y: number): CrossFormula { return c('biogeography-speciescount', 'speciescount(x, y) = x · y', x * y, nat(x, y), 'speciescount', [x, y]) }
  static endemismratio(x: number, y: number): CrossFormula { return c('biogeography-endemismratio', 'endemismratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'endemismratio', [x, y]) }
  static rangesize(x: number, y: number): CrossFormula { return c('biogeography-rangesize', 'rangesize(x, y) = x · y', x * y, nat(x, y), 'rangesize', [x, y]) }
  static dispersalpaths(x: number): CrossFormula { return c('biogeography-dispersalpaths', 'dispersalpaths(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'dispersalpaths', [x]) }
  static islandpairs(x: number, y: number): CrossFormula { return c('biogeography-islandpairs', 'islandpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'islandpairs', [x, y]) }
  static latitudegradient(x: number, y: number): CrossFormula { return c('biogeography-latitudegradient', 'latitudegradient(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'latitudegradient', [x, y]) }
  static habitatsubsets(x: number): CrossFormula { return c('biogeography-habitatsubsets', 'habitatsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'habitatsubsets', [x]) }
  static turnoverrate(x: number, y: number): CrossFormula { return c('biogeography-turnoverrate', 'turnoverrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'turnoverrate', [x, y]) }
}

for (const name of ['dispersalpaths', 'endemismratio', 'habitatsubsets', 'islandpairs', 'latitudegradient', 'rangesize', 'speciescount', 'turnoverrate'] as const)
  hexRegisterOf('biogeography', name, (BiogeographyFormulas[name] as (...x: unknown[]) => unknown).bind(BiogeographyFormulas))
