import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DRAYAGE — scaffolded integer measures crossed to supplychain. Every output an exact finite nonnegative integer. */

const PROOF = 'drayage arithmetic (costpermove, turntime, containersperday, chassisutilization, waittime, milesperload, demurrage, dualmoves); scaffolded from the integer-op palette; a measure crossed to supplychain'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'drayage', dst: 'supplychain', formula, value, proof: PROOF, ...extra }, holds, { name: `drayage.${name}`, params })

export class DrayageFormulas {
  static costpermove(x: number, y: number): CrossFormula { return c('drayage-costpermove', 'costpermove(x, y) = x · y', x * y, nat(x, y), 'costpermove', [x, y]) }
  static turntime(x: number, y: number): CrossFormula { return c('drayage-turntime', 'turntime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'turntime', [x, y]) }
  static containersperday(x: number, y: number): CrossFormula { return c('drayage-containersperday', 'containersperday(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'containersperday', [x, y]) }
  static chassisutilization(x: number, y: number): CrossFormula { return c('drayage-chassisutilization', 'chassisutilization(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'chassisutilization', [x, y]) }
  static waittime(x: number, y: number): CrossFormula { return c('drayage-waittime', 'waittime(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'waittime', [x, y]) }
  static milesperload(x: number, y: number): CrossFormula { return c('drayage-milesperload', 'milesperload(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'milesperload', [x, y]) }
  static demurrage(x: number, y: number): CrossFormula { return c('drayage-demurrage', 'demurrage(x, y) = x · y', x * y, nat(x, y), 'demurrage', [x, y]) }
  static dualmoves(x: number, y: number): CrossFormula { return c('drayage-dualmoves', 'dualmoves(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'dualmoves', [x, y]) }
}

for (const name of ['chassisutilization', 'containersperday', 'costpermove', 'demurrage', 'dualmoves', 'milesperload', 'turntime', 'waittime'] as const)
  hexRegisterOf('drayage', name, (DrayageFormulas[name] as (...x: unknown[]) => unknown).bind(DrayageFormulas))
