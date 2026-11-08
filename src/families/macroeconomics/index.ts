import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MACROECONOMICS — THE WHOLE ECONOMY, AS ARITHMETIC (chosen by the public-API registry, not by hand). An economy is
 *  numbers: output as spending, the price level year over year, who is without work, how fast output grows, the reach of
 *  a dollar of spending, how often money turns over, the gap between spending and revenue, and the debt that gap leaves
 *  against output. Crosses to `econ` — macroeconomics is the aggregate the micro measures sum to. A measure. */

const PROOF = 'macroeconomics arithmetic (gdp, inflation, unemployment, growth, multiplier, velocity, deficit, debt-to-gdp); the registry\'s whole-economy domain; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'macroeconomics', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `macroeconomics.${name}`, params })

export class MacroeconomicsFormulas {
  /** DEBT-TO-GDP: the deficit as a percentage of output. value ⌊deficit · 100 / gdp⌋. */
  static debt(deficit_: number, gdp_: number): CrossFormula { return c('macroeconomics-debt', 'debt(deficit, gdp) = ⌊deficit · 100 / gdp⌋', gdp_ > 0 ? Math.floor((deficit_ * 100) / gdp_) : 0, nat(deficit_, gdp_) && gdp_ > 0, 'debt', [deficit_, gdp_]) }
  /** DEFICIT: spending beyond revenue, never negative. value max(0, spending − revenue). */
  static deficit(spending: number, revenue: number): CrossFormula { return c('macroeconomics-deficit', 'deficit(spending, revenue) = max(0, spending − revenue)', Math.max(0, spending - revenue), nat(spending, revenue), 'deficit', [spending, revenue]) }
  /** GDP: output as the sum of consumption and investment (G + NX proxy simplified into the pair). value consumption + investment. */
  static gdp(consumption: number, investment: number): CrossFormula { return c('macroeconomics-gdp', 'gdp(consumption, investment) = consumption + investment', consumption + investment, nat(consumption, investment), 'gdp', [consumption, investment]) }
  /** GROWTH: output change over the prior period, as a percentage. value ⌊(current − previous) · 100 / previous⌋. */
  static growth(current: number, previous: number): CrossFormula { return c('macroeconomics-growth', 'growth(current, previous) = ⌊(current − previous) · 100 / previous⌋', previous > 0 ? Math.floor((current - previous) * 100 / previous) : 0, nat(current, previous) && previous > 0 && current >= previous, 'growth', [current, previous]) }
  /** INFLATION: the price level change over the prior period, as a percentage. value ⌊(current − previous) · 100 / previous⌋. */
  static inflation(current: number, previous: number): CrossFormula { return c('macroeconomics-inflation', 'inflation(current, previous) = ⌊(current − previous) · 100 / previous⌋', previous > 0 ? Math.floor((current - previous) * 100 / previous) : 0, nat(current, previous) && previous > 0 && current >= previous, 'inflation', [current, previous]) }
  /** MULTIPLIER: the reach of spending at a marginal propensity to consume (percent, 0..99). value ⌊spending · 100 / (100 − mpc)⌋. */
  static multiplier(spending: number, mpc: number): CrossFormula { return c('macroeconomics-multiplier', 'multiplier(spending, mpc) = ⌊spending · 100 / (100 − mpc)⌋', mpc < 100 ? Math.floor((spending * 100) / (100 - mpc)) : 0, nat(spending, mpc) && mpc < 100, 'multiplier', [spending, mpc]) }
  /** UNEMPLOYMENT: the jobless share of the labor force, as a percentage. value ⌊jobless · 100 / labor⌋. */
  static unemployment(jobless: number, labor: number): CrossFormula { return c('macroeconomics-unemployment', 'unemployment(jobless, labor) = ⌊jobless · 100 / labor⌋', labor > 0 ? Math.floor((jobless * 100) / labor) : 0, nat(jobless, labor) && labor > 0 && jobless <= labor, 'unemployment', [jobless, labor]) }
  /** VELOCITY: how often money turns over to produce output. value ⌊gdp / money⌋. */
  static velocity(gdp_: number, money: number): CrossFormula { return c('macroeconomics-velocity', 'velocity(gdp, money) = ⌊gdp / money⌋', money > 0 ? Math.floor(gdp_ / money) : 0, nat(gdp_, money) && money > 0, 'velocity', [gdp_, money]) }
}

for (const name of ['debt', 'deficit', 'gdp', 'growth', 'inflation', 'multiplier', 'unemployment', 'velocity'] as const)
  hexRegisterOf('macroeconomics', name, (MacroeconomicsFormulas[name] as (...x: unknown[]) => unknown).bind(MacroeconomicsFormulas))
