import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MARINATION — scaffolded integer measures crossed to biochemistry. Every output an exact finite nonnegative integer. */

const PROOF = 'marination arithmetic (penetrationdepth, aciduptake, tenderization, marinatetime, saltdiffusion, flavorload, phshift, weightgain); scaffolded from the integer-op palette; a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'marination', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `marination.${name}`, params })

export class MarinationFormulas {
  static penetrationdepth(x: number, y: number): CrossFormula { return c('marination-penetrationdepth', 'penetrationdepth(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'penetrationdepth', [x, y]) }
  static aciduptake(x: number, y: number): CrossFormula { return c('marination-aciduptake', 'aciduptake(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'aciduptake', [x, y]) }
  static tenderization(x: number, y: number): CrossFormula { return c('marination-tenderization', 'tenderization(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'tenderization', [x, y]) }
  static marinatetime(x: number, y: number): CrossFormula { return c('marination-marinatetime', 'marinatetime(x, y) = x · y', x * y, nat(x, y), 'marinatetime', [x, y]) }
  static saltdiffusion(x: number, y: number): CrossFormula { return c('marination-saltdiffusion', 'saltdiffusion(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'saltdiffusion', [x, y]) }
  static flavorload(x: number, y: number): CrossFormula { return c('marination-flavorload', 'flavorload(x, y) = x · y', x * y, nat(x, y), 'flavorload', [x, y]) }
  static phshift(x: number, y: number): CrossFormula { return c('marination-phshift', 'phshift(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'phshift', [x, y]) }
  static weightgain(x: number, y: number): CrossFormula { return c('marination-weightgain', 'weightgain(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'weightgain', [x, y]) }
}

for (const name of ['aciduptake', 'flavorload', 'marinatetime', 'penetrationdepth', 'phshift', 'saltdiffusion', 'tenderization', 'weightgain'] as const)
  hexRegisterOf('marination', name, (MarinationFormulas[name] as (...x: unknown[]) => unknown).bind(MarinationFormulas))
