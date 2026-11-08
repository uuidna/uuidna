import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CROSSDOCK — scaffolded integer measures crossed to supplychain. Every output an exact finite nonnegative integer. */

const PROOF = 'crossdock arithmetic (throughput, dwelltime, doorsneeded, touchcount, flowrate, stagingarea, sortaccuracy, transferlag); scaffolded from the integer-op palette; a measure crossed to supplychain'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'crossdock', dst: 'supplychain', formula, value, proof: PROOF, ...extra }, holds, { name: `crossdock.${name}`, params })

export class CrossdockFormulas {
  static throughput(x: number, y: number): CrossFormula { return c('crossdock-throughput', 'throughput(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'throughput', [x, y]) }
  static dwelltime(x: number, y: number): CrossFormula { return c('crossdock-dwelltime', 'dwelltime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dwelltime', [x, y]) }
  static doorsneeded(x: number, y: number): CrossFormula { return c('crossdock-doorsneeded', 'doorsneeded(x, y) = ⌈x / y⌉', y > 0 ? Math.ceil(x / y) : 0, nat(x, y) && y > 0, 'doorsneeded', [x, y]) }
  static touchcount(x: number, y: number): CrossFormula { return c('crossdock-touchcount', 'touchcount(x, y) = x · y', x * y, nat(x, y), 'touchcount', [x, y]) }
  static flowrate(x: number, y: number): CrossFormula { return c('crossdock-flowrate', 'flowrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'flowrate', [x, y]) }
  static stagingarea(x: number, y: number): CrossFormula { return c('crossdock-stagingarea', 'stagingarea(x, y) = x · y', x * y, nat(x, y), 'stagingarea', [x, y]) }
  static sortaccuracy(x: number, y: number): CrossFormula { return c('crossdock-sortaccuracy', 'sortaccuracy(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'sortaccuracy', [x, y]) }
  static transferlag(x: number, y: number): CrossFormula { return c('crossdock-transferlag', 'transferlag(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'transferlag', [x, y]) }
}

for (const name of ['doorsneeded', 'dwelltime', 'flowrate', 'sortaccuracy', 'stagingarea', 'throughput', 'touchcount', 'transferlag'] as const)
  hexRegisterOf('crossdock', name, (CrossdockFormulas[name] as (...x: unknown[]) => unknown).bind(CrossdockFormulas))
