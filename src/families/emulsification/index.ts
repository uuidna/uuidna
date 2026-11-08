import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EMULSIFICATION — scaffolded integer measures crossed to chemistry. Every output an exact finite nonnegative integer. */

const PROOF = 'emulsification arithmetic (dropletsize, stabilityindex, emulsifierratio, phaseratio, viscosity, creamingrate, surfacetension, coalescencetime); scaffolded from the integer-op palette; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'emulsification', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `emulsification.${name}`, params })

export class EmulsificationFormulas {
  static dropletsize(x: number, y: number): CrossFormula { return c('emulsification-dropletsize', 'dropletsize(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dropletsize', [x, y]) }
  static stabilityindex(x: number, y: number): CrossFormula { return c('emulsification-stabilityindex', 'stabilityindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'stabilityindex', [x, y]) }
  static emulsifierratio(x: number, y: number): CrossFormula { return c('emulsification-emulsifierratio', 'emulsifierratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'emulsifierratio', [x, y]) }
  static phaseratio(x: number, y: number): CrossFormula { return c('emulsification-phaseratio', 'phaseratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'phaseratio', [x, y]) }
  static viscosity(x: number, y: number): CrossFormula { return c('emulsification-viscosity', 'viscosity(x, y) = x · y', x * y, nat(x, y), 'viscosity', [x, y]) }
  static creamingrate(x: number, y: number): CrossFormula { return c('emulsification-creamingrate', 'creamingrate(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'creamingrate', [x, y]) }
  static surfacetension(x: number, y: number): CrossFormula { return c('emulsification-surfacetension', 'surfacetension(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'surfacetension', [x, y]) }
  static coalescencetime(x: number, y: number): CrossFormula { return c('emulsification-coalescencetime', 'coalescencetime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'coalescencetime', [x, y]) }
}

for (const name of ['coalescencetime', 'creamingrate', 'dropletsize', 'emulsifierratio', 'phaseratio', 'stabilityindex', 'surfacetension', 'viscosity'] as const)
  hexRegisterOf('emulsification', name, (EmulsificationFormulas[name] as (...x: unknown[]) => unknown).bind(EmulsificationFormulas))
