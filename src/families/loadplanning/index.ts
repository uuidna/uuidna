import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOADPLANNING — scaffolded integer measures crossed to supplychain. Every output an exact finite nonnegative integer. */

const PROOF = 'loadplanning arithmetic (utilization, cubicfill, weightlimit, stackheight, palletspertruck, axleload, voidspace, loadbalance); scaffolded from the integer-op palette; a measure crossed to supplychain'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'loadplanning', dst: 'supplychain', formula, value, proof: PROOF, ...extra }, holds, { name: `loadplanning.${name}`, params })

export class LoadplanningFormulas {
  static utilization(x: number, y: number): CrossFormula { return c('loadplanning-utilization', 'utilization(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'utilization', [x, y]) }
  static cubicfill(x: number, y: number): CrossFormula { return c('loadplanning-cubicfill', 'cubicfill(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'cubicfill', [x, y]) }
  static weightlimit(x: number, y: number): CrossFormula { return c('loadplanning-weightlimit', 'weightlimit(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'weightlimit', [x, y]) }
  static stackheight(x: number, y: number): CrossFormula { return c('loadplanning-stackheight', 'stackheight(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'stackheight', [x, y]) }
  static palletspertruck(x: number, y: number): CrossFormula { return c('loadplanning-palletspertruck', 'palletspertruck(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'palletspertruck', [x, y]) }
  static axleload(x: number, y: number): CrossFormula { return c('loadplanning-axleload', 'axleload(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'axleload', [x, y]) }
  static voidspace(x: number, y: number): CrossFormula { return c('loadplanning-voidspace', 'voidspace(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'voidspace', [x, y]) }
  static loadbalance(x: number, y: number): CrossFormula { return c('loadplanning-loadbalance', 'loadbalance(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'loadbalance', [x, y]) }
}

for (const name of ['axleload', 'cubicfill', 'loadbalance', 'palletspertruck', 'stackheight', 'utilization', 'voidspace', 'weightlimit'] as const)
  hexRegisterOf('loadplanning', name, (LoadplanningFormulas[name] as (...x: unknown[]) => unknown).bind(LoadplanningFormulas))
