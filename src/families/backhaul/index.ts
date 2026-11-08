import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BACKHAUL — scaffolded integer measures crossed to logistics. Every output an exact finite nonnegative integer. */

const PROOF = 'backhaul arithmetic (emptymiles, utilization, revenuemiles, matchrate, deadheadratio, savings, payloadratio, cycledistance); scaffolded from the integer-op palette; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'backhaul', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `backhaul.${name}`, params })

export class BackhaulFormulas {
  static emptymiles(x: number, y: number): CrossFormula { return c('backhaul-emptymiles', 'emptymiles(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'emptymiles', [x, y]) }
  static utilization(x: number, y: number): CrossFormula { return c('backhaul-utilization', 'utilization(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'utilization', [x, y]) }
  static revenuemiles(x: number, y: number): CrossFormula { return c('backhaul-revenuemiles', 'revenuemiles(x, y) = x · y', x * y, nat(x, y), 'revenuemiles', [x, y]) }
  static matchrate(x: number, y: number): CrossFormula { return c('backhaul-matchrate', 'matchrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'matchrate', [x, y]) }
  static deadheadratio(x: number, y: number): CrossFormula { return c('backhaul-deadheadratio', 'deadheadratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'deadheadratio', [x, y]) }
  static savings(x: number, y: number): CrossFormula { return c('backhaul-savings', 'savings(x, y) = x · y', x * y, nat(x, y), 'savings', [x, y]) }
  static payloadratio(x: number, y: number): CrossFormula { return c('backhaul-payloadratio', 'payloadratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'payloadratio', [x, y]) }
  static cycledistance(x: number, y: number): CrossFormula { return c('backhaul-cycledistance', 'cycledistance(x, y) = x + y', x + y, nat(x, y), 'cycledistance', [x, y]) }
}

for (const name of ['cycledistance', 'deadheadratio', 'emptymiles', 'matchrate', 'payloadratio', 'revenuemiles', 'savings', 'utilization'] as const)
  hexRegisterOf('backhaul', name, (BackhaulFormulas[name] as (...x: unknown[]) => unknown).bind(BackhaulFormulas))
