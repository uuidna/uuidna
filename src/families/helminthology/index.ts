import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HELMINTHOLOGY — scaffolded integer measures crossed to microbiology. Every output an exact finite nonnegative integer. */

const PROOF = 'helminthology arithmetic (eggcount, wormburden, prevalence, lifecyclestages, hostcombos, treatmentefficacy, fecundity, transmissionpaths); scaffolded from the integer-op palette; a measure crossed to microbiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'helminthology', dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `helminthology.${name}`, params })

export class HelminthologyFormulas {
  static eggcount(x: number, y: number): CrossFormula { return c('helminthology-eggcount', 'eggcount(x, y) = x · y', x * y, nat(x, y), 'eggcount', [x, y]) }
  static wormburden(x: number, y: number): CrossFormula { return c('helminthology-wormburden', 'wormburden(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'wormburden', [x, y]) }
  static prevalence(x: number, y: number): CrossFormula { return c('helminthology-prevalence', 'prevalence(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'prevalence', [x, y]) }
  static lifecyclestages(x: number, y: number): CrossFormula { return c('helminthology-lifecyclestages', 'lifecyclestages(x, y) = x + y', x + y, nat(x, y), 'lifecyclestages', [x, y]) }
  static hostcombos(x: number, y: number): CrossFormula { return c('helminthology-hostcombos', 'hostcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'hostcombos', [x, y]) }
  static treatmentefficacy(x: number, y: number): CrossFormula { return c('helminthology-treatmentefficacy', 'treatmentefficacy(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'treatmentefficacy', [x, y]) }
  static fecundity(x: number, y: number): CrossFormula { return c('helminthology-fecundity', 'fecundity(x, y) = x · y', x * y, nat(x, y), 'fecundity', [x, y]) }
  static transmissionpaths(x: number, y: number): CrossFormula { return c('helminthology-transmissionpaths', 'transmissionpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'transmissionpaths', [x, y]) }
}

for (const name of ['eggcount', 'fecundity', 'hostcombos', 'lifecyclestages', 'prevalence', 'transmissionpaths', 'treatmentefficacy', 'wormburden'] as const)
  hexRegisterOf('helminthology', name, (HelminthologyFormulas[name] as (...x: unknown[]) => unknown).bind(HelminthologyFormulas))
