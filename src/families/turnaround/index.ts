import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TURNAROUND — scaffolded integer measures crossed to logistics. Every output an exact finite nonnegative integer. */

const PROOF = 'turnaround arithmetic (gatetime, dockoccupancy, loadtime, cyclecount, delayminutes, berthutilization, servicerate, idlegap); scaffolded from the integer-op palette; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'turnaround', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `turnaround.${name}`, params })

export class TurnaroundFormulas {
  static gatetime(x: number, y: number): CrossFormula { return c('turnaround-gatetime', 'gatetime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'gatetime', [x, y]) }
  static dockoccupancy(x: number, y: number): CrossFormula { return c('turnaround-dockoccupancy', 'dockoccupancy(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'dockoccupancy', [x, y]) }
  static loadtime(x: number, y: number): CrossFormula { return c('turnaround-loadtime', 'loadtime(x, y) = x + y', x + y, nat(x, y), 'loadtime', [x, y]) }
  static cyclecount(x: number, y: number): CrossFormula { return c('turnaround-cyclecount', 'cyclecount(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'cyclecount', [x, y]) }
  static delayminutes(x: number, y: number): CrossFormula { return c('turnaround-delayminutes', 'delayminutes(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'delayminutes', [x, y]) }
  static berthutilization(x: number, y: number): CrossFormula { return c('turnaround-berthutilization', 'berthutilization(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'berthutilization', [x, y]) }
  static servicerate(x: number, y: number): CrossFormula { return c('turnaround-servicerate', 'servicerate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'servicerate', [x, y]) }
  static idlegap(x: number, y: number): CrossFormula { return c('turnaround-idlegap', 'idlegap(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'idlegap', [x, y]) }
}

for (const name of ['berthutilization', 'cyclecount', 'delayminutes', 'dockoccupancy', 'gatetime', 'idlegap', 'loadtime', 'servicerate'] as const)
  hexRegisterOf('turnaround', name, (TurnaroundFormulas[name] as (...x: unknown[]) => unknown).bind(TurnaroundFormulas))
