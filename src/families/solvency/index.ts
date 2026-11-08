import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOLVENCY — THE BALANCE SHEET AS ARITHMETIC (chosen by the regulatory-capital registry, not by hand). Whether a firm can
 *  pay is numbers: the solvency ratio, available capital, the solvency margin, the coverage of own funds, the capital a risk
 *  profile requires, its floor, the buffer above it, and leverage. Crosses to `statistics` — solvency is a distribution of
 *  assets against claims. A measure. */

const PROOF = 'solvency arithmetic (solvency ratio, available capital, margin, coverage, SCR, MCR, buffer, leverage); the registry\'s uncovered regulatory-capital domain; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'solvency', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `solvency.${name}`, params })

export class SolvencyFormulas {
  /** SOLVENCY RATIO: assets as a percentage of liabilities. value ⌊assets · 100 / liabilities⌋. */
  static ratio(assets: number, liabilities: number): CrossFormula { return c('solvency-ratio', 'ratio(assets, liabilities) = ⌊assets · 100 / liabilities⌋', liabilities > 0 ? Math.floor((assets * 100) / liabilities) : 0, nat(assets, liabilities) && liabilities > 0, 'ratio', [assets, liabilities]) }
  /** AVAILABLE CAPITAL: assets less liabilities, never below zero. value max(0, assets − liabilities). */
  static capital(assets: number, liabilities: number): CrossFormula { return c('solvency-capital', 'capital(assets, liabilities) = max(0, assets − liabilities)', Math.max(0, assets - liabilities), nat(assets, liabilities), 'capital', [assets, liabilities]) }
  /** SOLVENCY MARGIN: net worth as a percentage of assets. value ⌊max(0, assets − liabilities) · 100 / assets⌋. */
  static margin(assets: number, liabilities: number): CrossFormula { return c('solvency-margin', 'margin(assets, liabilities) = ⌊max(0, assets − liabilities) · 100 / assets⌋', assets > 0 ? Math.floor((Math.max(0, assets - liabilities) * 100) / assets) : 0, nat(assets, liabilities) && assets > 0, 'margin', [assets, liabilities]) }
  /** COVERAGE: own funds as a percentage of the capital requirement. value ⌊funds · 100 / scr⌋. */
  static coverage(funds: number, scr: number): CrossFormula { return c('solvency-coverage', 'coverage(funds, scr) = ⌊funds · 100 / scr⌋', scr > 0 ? Math.floor((funds * 100) / scr) : 0, nat(funds, scr) && scr > 0, 'coverage', [funds, scr]) }
  /** SOLVENCY CAPITAL REQUIREMENT: a percentage of liabilities, rounded up. value ⌈liabilities · pct / 100⌉. */
  static scr(liabilities: number, pct: number): CrossFormula { return c('solvency-scr', 'scr(liabilities, pct) = ⌈liabilities · pct / 100⌉', Math.ceil((liabilities * pct) / 100), nat(liabilities, pct), 'scr', [liabilities, pct]) }
  /** MINIMUM CAPITAL REQUIREMENT: a percentage of the SCR, the floor. value ⌊scr · pct / 100⌋. */
  static mcr(scr: number, pct: number): CrossFormula { return c('solvency-mcr', 'mcr(scr, pct) = ⌊scr · pct / 100⌋', Math.floor((scr * pct) / 100), nat(scr, pct), 'mcr', [scr, pct]) }
  /** CAPITAL BUFFER: own funds above the requirement, never below zero. value max(0, funds − scr). */
  static buffer(funds: number, scr: number): CrossFormula { return c('solvency-buffer', 'buffer(funds, scr) = max(0, funds − scr)', Math.max(0, funds - scr), nat(funds, scr), 'buffer', [funds, scr]) }
  /** LEVERAGE: debt as a percentage of equity. value ⌊debt · 100 / equity⌋. */
  static leverage(debt: number, equity: number): CrossFormula { return c('solvency-leverage', 'leverage(debt, equity) = ⌊debt · 100 / equity⌋', equity > 0 ? Math.floor((debt * 100) / equity) : 0, nat(debt, equity) && equity > 0, 'leverage', [debt, equity]) }
}

for (const name of ['buffer', 'capital', 'coverage', 'leverage', 'margin', 'mcr', 'ratio', 'scr'] as const)
  hexRegisterOf('solvency', name, (SolvencyFormulas[name] as (...x: unknown[]) => unknown).bind(SolvencyFormulas))
