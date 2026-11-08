import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MICROECONOMICS — THE BEHAVIOUR OF MARKETS AS ARITHMETIC (price and quantity, buyer and seller). Elasticity of demand,
 *  consumer surplus, marginal cost, the equilibrium shortage, utility per unit of cost, firm profit, monopoly market share,
 *  and the deadweight loss of a distorted market. Crosses to `econ` — microeconomics is economics in the small. A measure. */

const PROOF = 'microeconomics arithmetic (elasticity, surplus, marginal cost, equilibrium shortage, utility, profit, monopoly share, deadweight loss); markets in the small; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'microeconomics', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `microeconomics.${name}`, params })

export class MicroeconomicsFormulas {
  /** ELASTICITY: the percent change in quantity per unit change in price. value ⌊quantitychange · 100 / pricechange⌋. */
  static elasticity(quantitychange: number, pricechange: number): CrossFormula { return c('microeconomics-elasticity', 'elasticity(quantitychange, pricechange) = ⌊quantitychange · 100 / pricechange⌋', pricechange > 0 ? Math.floor((quantitychange * 100) / pricechange) : 0, nat(quantitychange, pricechange) && pricechange > 0, 'elasticity', [quantitychange, pricechange]) }
  /** CONSUMER SURPLUS: willingness to pay over the price actually paid. value max(0, willingness − price). */
  static surplus(willingness: number, price: number): CrossFormula { return c('microeconomics-surplus', 'surplus(willingness, price) = max(0, willingness − price)', Math.max(0, willingness - price), nat(willingness, price), 'surplus', [willingness, price]) }
  /** MARGINAL COST: total cost over the units produced. value ⌊total / units⌋. */
  static marginal(total: number, units: number): CrossFormula { return c('microeconomics-marginal', 'marginal(total, units) = ⌊total / units⌋', units > 0 ? Math.floor(total / units) : 0, nat(total, units) && units > 0, 'marginal', [total, units]) }
  /** EQUILIBRIUM: the shortage when demand runs over supply. value max(0, demand − supply). */
  static equilibrium(supply: number, demand: number): CrossFormula { return c('microeconomics-equilibrium', 'equilibrium(supply, demand) = max(0, demand − supply)', Math.max(0, demand - supply), nat(supply, demand), 'equilibrium', [supply, demand]) }
  /** UTILITY: the satisfaction per unit of cost. value ⌊satisfaction / cost⌋. */
  static utility(satisfaction: number, cost: number): CrossFormula { return c('microeconomics-utility', 'utility(satisfaction, cost) = ⌊satisfaction / cost⌋', cost > 0 ? Math.floor(satisfaction / cost) : 0, nat(satisfaction, cost) && cost > 0, 'utility', [satisfaction, cost]) }
  /** PROFIT: revenue over the cost of earning it. value max(0, revenue − cost). */
  static profit(revenue: number, cost: number): CrossFormula { return c('microeconomics-profit', 'profit(revenue, cost) = max(0, revenue − cost)', Math.max(0, revenue - cost), nat(revenue, cost), 'profit', [revenue, cost]) }
  /** MONOPOLY: the firm's share of its market, as a percentage. value ⌊firm · 100 / market⌋. */
  static monopoly(firm: number, market: number): CrossFormula { return c('microeconomics-monopoly', 'monopoly(firm, market) = ⌊firm · 100 / market⌋', market > 0 ? Math.floor((firm * 100) / market) : 0, nat(firm, market) && market > 0 && firm <= market, 'monopoly', [firm, market]) }
  /** DEADWEIGHT LOSS: the welfare lost as a share of the total. value ⌊lost · 100 / total⌋. */
  static deadweight(lost: number, total: number): CrossFormula { return c('microeconomics-deadweight', 'deadweight(lost, total) = ⌊lost · 100 / total⌋', total > 0 ? Math.floor((lost * 100) / total) : 0, nat(lost, total) && total > 0 && lost <= total, 'deadweight', [lost, total]) }
}

for (const name of ['deadweight', 'elasticity', 'equilibrium', 'marginal', 'monopoly', 'profit', 'surplus', 'utility'] as const)
  hexRegisterOf('microeconomics', name, (MicroeconomicsFormulas[name] as (...x: unknown[]) => unknown).bind(MicroeconomicsFormulas))
