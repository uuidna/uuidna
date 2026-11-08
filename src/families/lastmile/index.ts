import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LASTMILE — scaffolded integer measures crossed to logistics. Every output an exact finite nonnegative integer. */

const PROOF = 'lastmile arithmetic (stopspermile, deliverydensity, costperstop, successrate, routetime, failedratio, packagespervehicle, detourfactor); scaffolded from the integer-op palette; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lastmile', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `lastmile.${name}`, params })

export class LastmileFormulas {
  static stopspermile(x: number, y: number): CrossFormula { return c('lastmile-stopspermile', 'stopspermile(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'stopspermile', [x, y]) }
  static deliverydensity(x: number, y: number): CrossFormula { return c('lastmile-deliverydensity', 'deliverydensity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'deliverydensity', [x, y]) }
  static costperstop(x: number, y: number): CrossFormula { return c('lastmile-costperstop', 'costperstop(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'costperstop', [x, y]) }
  static successrate(x: number, y: number): CrossFormula { return c('lastmile-successrate', 'successrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'successrate', [x, y]) }
  static routetime(x: number, y: number): CrossFormula { return c('lastmile-routetime', 'routetime(x, y) = x · y', x * y, nat(x, y), 'routetime', [x, y]) }
  static failedratio(x: number, y: number): CrossFormula { return c('lastmile-failedratio', 'failedratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'failedratio', [x, y]) }
  static packagespervehicle(x: number, y: number): CrossFormula { return c('lastmile-packagespervehicle', 'packagespervehicle(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'packagespervehicle', [x, y]) }
  static detourfactor(x: number, y: number): CrossFormula { return c('lastmile-detourfactor', 'detourfactor(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'detourfactor', [x, y]) }
}

for (const name of ['costperstop', 'deliverydensity', 'detourfactor', 'failedratio', 'packagespervehicle', 'routetime', 'stopspermile', 'successrate'] as const)
  hexRegisterOf('lastmile', name, (LastmileFormulas[name] as (...x: unknown[]) => unknown).bind(LastmileFormulas))
