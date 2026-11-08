import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ANIMISM — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'animism arithmetic (spiritcount, entitypairs, ritualtypes, totemsubsets, offeringcombos, seasonalcycles, ancestorlayers, animacyratio); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'animism', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `animism.${name}`, params })

export class AnimismFormulas {
  static spiritcount(x: number, y: number): CrossFormula { return c('animism-spiritcount', 'spiritcount(x, y) = x · y', x * y, nat(x, y), 'spiritcount', [x, y]) }
  static entitypairs(x: number, y: number): CrossFormula { return c('animism-entitypairs', 'entitypairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'entitypairs', [x, y]) }
  static ritualtypes(x: number, y: number): CrossFormula { return c('animism-ritualtypes', 'ritualtypes(x, y) = x + y', x + y, nat(x, y), 'ritualtypes', [x, y]) }
  static totemsubsets(x: number): CrossFormula { return c('animism-totemsubsets', 'totemsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'totemsubsets', [x]) }
  static offeringcombos(x: number, y: number): CrossFormula { return c('animism-offeringcombos', 'offeringcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'offeringcombos', [x, y]) }
  static seasonalcycles(x: number, y: number): CrossFormula { return c('animism-seasonalcycles', 'seasonalcycles(x, y) = x · y', x * y, nat(x, y), 'seasonalcycles', [x, y]) }
  static ancestorlayers(x: number, y: number): CrossFormula { return c('animism-ancestorlayers', 'ancestorlayers(x, y) = x + y', x + y, nat(x, y), 'ancestorlayers', [x, y]) }
  static animacyratio(x: number, y: number): CrossFormula { return c('animism-animacyratio', 'animacyratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'animacyratio', [x, y]) }
}

for (const name of ['ancestorlayers', 'animacyratio', 'entitypairs', 'offeringcombos', 'ritualtypes', 'seasonalcycles', 'spiritcount', 'totemsubsets'] as const)
  hexRegisterOf('animism', name, (AnimismFormulas[name] as (...x: unknown[]) => unknown).bind(AnimismFormulas))
