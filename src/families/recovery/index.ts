import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RECOVERY — scaffolded integer measures crossed to physiology. Every output an exact finite nonnegative integer. */

const PROOF = 'recovery arithmetic (resttime, heartratedrop, sleepdebt, recoveryrate, musclerepair, readiness, overtrainingindex, hydrationgap); scaffolded from the integer-op palette; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'recovery', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `recovery.${name}`, params })

export class RecoveryFormulas {
  static resttime(x: number, y: number): CrossFormula { return c('recovery-resttime', 'resttime(x, y) = x · y', x * y, nat(x, y), 'resttime', [x, y]) }
  static heartratedrop(x: number, y: number): CrossFormula { return c('recovery-heartratedrop', 'heartratedrop(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'heartratedrop', [x, y]) }
  static sleepdebt(x: number, y: number): CrossFormula { return c('recovery-sleepdebt', 'sleepdebt(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'sleepdebt', [x, y]) }
  static recoveryrate(x: number, y: number): CrossFormula { return c('recovery-recoveryrate', 'recoveryrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'recoveryrate', [x, y]) }
  static musclerepair(x: number, y: number): CrossFormula { return c('recovery-musclerepair', 'musclerepair(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'musclerepair', [x, y]) }
  static readiness(x: number, y: number): CrossFormula { return c('recovery-readiness', 'readiness(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'readiness', [x, y]) }
  static overtrainingindex(x: number, y: number): CrossFormula { return c('recovery-overtrainingindex', 'overtrainingindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'overtrainingindex', [x, y]) }
  static hydrationgap(x: number, y: number): CrossFormula { return c('recovery-hydrationgap', 'hydrationgap(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'hydrationgap', [x, y]) }
}

for (const name of ['heartratedrop', 'hydrationgap', 'musclerepair', 'overtrainingindex', 'readiness', 'recoveryrate', 'resttime', 'sleepdebt'] as const)
  hexRegisterOf('recovery', name, (RecoveryFormulas[name] as (...x: unknown[]) => unknown).bind(RecoveryFormulas))
