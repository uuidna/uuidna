import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROTOZOOLOGY — scaffolded integer measures crossed to microbiology. Every output an exact finite nonnegative integer. */

const PROOF = 'protozoology arithmetic (cellcount, divisionrate, motilitytypes, cystcount, virulenceindex, speciespairs, generationtime, infectivity); scaffolded from the integer-op palette; a measure crossed to microbiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'protozoology', dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `protozoology.${name}`, params })

export class ProtozoologyFormulas {
  static cellcount(x: number, y: number): CrossFormula { return c('protozoology-cellcount', 'cellcount(x, y) = x · y', x * y, nat(x, y), 'cellcount', [x, y]) }
  static divisionrate(x: number): CrossFormula { return c('protozoology-divisionrate', 'divisionrate(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'divisionrate', [x]) }
  static motilitytypes(x: number, y: number): CrossFormula { return c('protozoology-motilitytypes', 'motilitytypes(x, y) = x + y', x + y, nat(x, y), 'motilitytypes', [x, y]) }
  static cystcount(x: number, y: number): CrossFormula { return c('protozoology-cystcount', 'cystcount(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'cystcount', [x, y]) }
  static virulenceindex(x: number, y: number): CrossFormula { return c('protozoology-virulenceindex', 'virulenceindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'virulenceindex', [x, y]) }
  static speciespairs(x: number, y: number): CrossFormula { return c('protozoology-speciespairs', 'speciespairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'speciespairs', [x, y]) }
  static generationtime(x: number, y: number): CrossFormula { return c('protozoology-generationtime', 'generationtime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'generationtime', [x, y]) }
  static infectivity(x: number, y: number): CrossFormula { return c('protozoology-infectivity', 'infectivity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'infectivity', [x, y]) }
}

for (const name of ['cellcount', 'cystcount', 'divisionrate', 'generationtime', 'infectivity', 'motilitytypes', 'speciespairs', 'virulenceindex'] as const)
  hexRegisterOf('protozoology', name, (ProtozoologyFormulas[name] as (...x: unknown[]) => unknown).bind(ProtozoologyFormulas))
