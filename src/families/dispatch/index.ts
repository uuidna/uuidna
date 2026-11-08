import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DISPATCH — scaffolded integer measures crossed to logistics. Every output an exact finite nonnegative integer. */

const PROOF = 'dispatch arithmetic (queuewait, assignmentrate, idletime, responsetime, jobspershift, overtimeratio, coverage, backlog); scaffolded from the integer-op palette; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dispatch', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `dispatch.${name}`, params })

export class DispatchFormulas {
  static queuewait(x: number, y: number): CrossFormula { return c('dispatch-queuewait', 'queuewait(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'queuewait', [x, y]) }
  static assignmentrate(x: number, y: number): CrossFormula { return c('dispatch-assignmentrate', 'assignmentrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'assignmentrate', [x, y]) }
  static idletime(x: number, y: number): CrossFormula { return c('dispatch-idletime', 'idletime(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'idletime', [x, y]) }
  static responsetime(x: number, y: number): CrossFormula { return c('dispatch-responsetime', 'responsetime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'responsetime', [x, y]) }
  static jobspershift(x: number, y: number): CrossFormula { return c('dispatch-jobspershift', 'jobspershift(x, y) = x · y', x * y, nat(x, y), 'jobspershift', [x, y]) }
  static overtimeratio(x: number, y: number): CrossFormula { return c('dispatch-overtimeratio', 'overtimeratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'overtimeratio', [x, y]) }
  static coverage(x: number, y: number): CrossFormula { return c('dispatch-coverage', 'coverage(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coverage', [x, y]) }
  static backlog(x: number, y: number): CrossFormula { return c('dispatch-backlog', 'backlog(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'backlog', [x, y]) }
}

for (const name of ['assignmentrate', 'backlog', 'coverage', 'idletime', 'jobspershift', 'overtimeratio', 'queuewait', 'responsetime'] as const)
  hexRegisterOf('dispatch', name, (DispatchFormulas[name] as (...x: unknown[]) => unknown).bind(DispatchFormulas))
