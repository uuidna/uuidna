import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TARIFF — scaffolded integer measures crossed to macroeconomics. Every output an exact finite nonnegative integer. */

const PROOF = 'tariff arithmetic (ratepct, revenue, deadweightloss, importprice, quotafill, protectioneffect, schedulesubsets, tradereduction); scaffolded from the integer-op palette; a measure crossed to macroeconomics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tariff', dst: 'macroeconomics', formula, value, proof: PROOF, ...extra }, holds, { name: `tariff.${name}`, params })

export class TariffFormulas {
  static ratepct(x: number, y: number): CrossFormula { return c('tariff-ratepct', 'ratepct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ratepct', [x, y]) }
  static revenue(x: number, y: number): CrossFormula { return c('tariff-revenue', 'revenue(x, y) = x · y', x * y, nat(x, y), 'revenue', [x, y]) }
  static deadweightloss(x: number, y: number): CrossFormula { return c('tariff-deadweightloss', 'deadweightloss(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'deadweightloss', [x, y]) }
  static importprice(x: number, y: number): CrossFormula { return c('tariff-importprice', 'importprice(x, y) = x + y', x + y, nat(x, y), 'importprice', [x, y]) }
  static quotafill(x: number, y: number): CrossFormula { return c('tariff-quotafill', 'quotafill(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'quotafill', [x, y]) }
  static protectioneffect(x: number, y: number): CrossFormula { return c('tariff-protectioneffect', 'protectioneffect(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'protectioneffect', [x, y]) }
  static schedulesubsets(x: number): CrossFormula { return c('tariff-schedulesubsets', 'schedulesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'schedulesubsets', [x]) }
  static tradereduction(x: number, y: number): CrossFormula { return c('tariff-tradereduction', 'tradereduction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'tradereduction', [x, y]) }
}

for (const name of ['deadweightloss', 'importprice', 'protectioneffect', 'quotafill', 'ratepct', 'revenue', 'schedulesubsets', 'tradereduction'] as const)
  hexRegisterOf('tariff', name, (TariffFormulas[name] as (...x: unknown[]) => unknown).bind(TariffFormulas))
