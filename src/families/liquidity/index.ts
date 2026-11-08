import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LIQUIDITY — SOLVENCY AND SURVIVAL, AS ARITHMETIC (chosen by the public-API registry, not by hand). A balance sheet is
 *  numbers: the current ratio, the quick ratio, interest coverage, the cash ratio, working capital, the regulator's LCR,
 *  net stable funding, and how long the cash lasts. Crosses to `banking` — liquidity is what banking underwrites. A measure. */

const PROOF = 'liquidity arithmetic (current ratio, quick ratio, coverage, cash ratio, working capital, LCR, net stable funding, burn rate); a measure crossed to banking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'liquidity', dst: 'banking', formula, value, proof: PROOF, ...extra }, holds, { name: `liquidity.${name}`, params })

export class LiquidityFormulas {
  /** CURRENT RATIO as a percentage: current assets over current liabilities. value ⌊assets · 100 / liabilities⌋. */
  static currentratio(assets: number, liabilities: number): CrossFormula { return c('liquidity-currentratio', 'currentratio(assets, liabilities) = ⌊assets · 100 / liabilities⌋', liabilities > 0 ? Math.floor((assets * 100) / liabilities) : 0, nat(assets, liabilities) && liabilities > 0, 'currentratio', [assets, liabilities]) }
  /** QUICK RATIO as a percentage: liquid assets over current liabilities. value ⌊liquid · 100 / liabilities⌋. */
  static quickratio(liquid: number, liabilities: number): CrossFormula { return c('liquidity-quickratio', 'quickratio(liquid, liabilities) = ⌊liquid · 100 / liabilities⌋', liabilities > 0 ? Math.floor((liquid * 100) / liabilities) : 0, nat(liquid, liabilities) && liabilities > 0, 'quickratio', [liquid, liabilities]) }
  /** INTEREST COVERAGE: operating income over the interest due. value ⌊income / interest⌋. */
  static coverageratio(income: number, interest: number): CrossFormula { return c('liquidity-coverageratio', 'coverageratio(income, interest) = ⌊income / interest⌋', interest > 0 ? Math.floor(income / interest) : 0, nat(income, interest) && interest > 0, 'coverageratio', [income, interest]) }
  /** CASH RATIO as a percentage: cash on hand over current liabilities. value ⌊cash · 100 / liabilities⌋. */
  static cashratio(cash: number, liabilities: number): CrossFormula { return c('liquidity-cashratio', 'cashratio(cash, liabilities) = ⌊cash · 100 / liabilities⌋', liabilities > 0 ? Math.floor((cash * 100) / liabilities) : 0, nat(cash, liabilities) && liabilities > 0, 'cashratio', [cash, liabilities]) }
  /** WORKING CAPITAL: current assets less current liabilities, floored at zero. value max(0, assets − liabilities). */
  static workingcapital(assets: number, liabilities: number): CrossFormula { return c('liquidity-workingcapital', 'workingcapital(assets, liabilities) = max(0, assets − liabilities)', Math.max(0, assets - liabilities), nat(assets, liabilities), 'workingcapital', [assets, liabilities]) }
  /** LIQUIDITY COVERAGE RATIO as a percentage: high-quality liquid assets over net outflows. value ⌊hqla · 100 / outflows⌋. */
  static lcr(hqla: number, outflows: number): CrossFormula { return c('liquidity-lcr', 'lcr(hqla, outflows) = ⌊hqla · 100 / outflows⌋', outflows > 0 ? Math.floor((hqla * 100) / outflows) : 0, nat(hqla, outflows) && outflows > 0, 'lcr', [hqla, outflows]) }
  /** NET STABLE FUNDING RATIO as a percentage: available stable funding over required. value ⌊available · 100 / required⌋. */
  static netstablefunding(available: number, required: number): CrossFormula { return c('liquidity-netstablefunding', 'netstablefunding(available, required) = ⌊available · 100 / required⌋', required > 0 ? Math.floor((available * 100) / required) : 0, nat(available, required) && required > 0, 'netstablefunding', [available, required]) }
  /** BURN RATE: cash on hand spread over the months it lasts. value ⌊cash / months⌋. */
  static burnrate(cash: number, months: number): CrossFormula { return c('liquidity-burnrate', 'burnrate(cash, months) = ⌊cash / months⌋', months > 0 ? Math.floor(cash / months) : 0, nat(cash, months) && months > 0, 'burnrate', [cash, months]) }
}

for (const name of ['burnrate', 'cashratio', 'coverageratio', 'currentratio', 'lcr', 'netstablefunding', 'quickratio', 'workingcapital'] as const)
  hexRegisterOf('liquidity', name, (LiquidityFormulas[name] as (...x: unknown[]) => unknown).bind(LiquidityFormulas))
