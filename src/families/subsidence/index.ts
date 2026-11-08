import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SUBSIDENCE — scaffolded integer measures crossed to geology. Every output an exact finite nonnegative integer. */

const PROOF = 'subsidence arithmetic (rate, cumulative, compaction, withdrawalvolume, consolidationtime, settlement, influencedepth, riskindex); scaffolded from the integer-op palette; a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'subsidence', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `subsidence.${name}`, params })

export class SubsidenceFormulas {
  static rate(x: number, y: number): CrossFormula { return c('subsidence-rate', 'rate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rate', [x, y]) }
  static cumulative(x: number, y: number): CrossFormula { return c('subsidence-cumulative', 'cumulative(x, y) = x · y', x * y, nat(x, y), 'cumulative', [x, y]) }
  static compaction(x: number, y: number): CrossFormula { return c('subsidence-compaction', 'compaction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'compaction', [x, y]) }
  static withdrawalvolume(x: number, y: number): CrossFormula { return c('subsidence-withdrawalvolume', 'withdrawalvolume(x, y) = x · y', x * y, nat(x, y), 'withdrawalvolume', [x, y]) }
  static consolidationtime(x: number, y: number): CrossFormula { return c('subsidence-consolidationtime', 'consolidationtime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'consolidationtime', [x, y]) }
  static settlement(x: number, y: number): CrossFormula { return c('subsidence-settlement', 'settlement(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'settlement', [x, y]) }
  static influencedepth(x: number, y: number): CrossFormula { return c('subsidence-influencedepth', 'influencedepth(x, y) = x · y', x * y, nat(x, y), 'influencedepth', [x, y]) }
  static riskindex(x: number, y: number): CrossFormula { return c('subsidence-riskindex', 'riskindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'riskindex', [x, y]) }
}

for (const name of ['compaction', 'consolidationtime', 'cumulative', 'influencedepth', 'rate', 'riskindex', 'settlement', 'withdrawalvolume'] as const)
  hexRegisterOf('subsidence', name, (SubsidenceFormulas[name] as (...x: unknown[]) => unknown).bind(SubsidenceFormulas))
