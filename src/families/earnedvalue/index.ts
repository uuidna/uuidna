import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EARNED VALUE — PROJECT CONTROL AS ARITHMETIC. A project is three running numbers: the budgeted cost of the work planned
 *  (PV), the budgeted cost of the work done (EV), and the money actually spent (AC). From them the standard indices and
 *  variances fall out — cost and schedule performance, the variances, the estimate and the to-complete index — each an exact
 *  integer. Crosses to `econ` — earned value is project economics. A measure. */

const PROOF = 'earned value arithmetic (CPI, SPI, cost/schedule variance, EAC, ETC, TCPI, VAC from PV/EV/AC/BAC); project control as exact integers; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'earnedvalue', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `earnedvalue.${name}`, params })

export class EarnedvalueFormulas {
  /** COST PERFORMANCE INDEX (×100): earned value over actual cost. value ⌊ev · 100 / ac⌋. */
  static cpi(ev: number, ac: number): CrossFormula { return c('earnedvalue-cpi', 'cpi(ev, ac) = ⌊ev · 100 / ac⌋', ac > 0 ? Math.floor((ev * 100) / ac) : 0, nat(ev, ac) && ac > 0, 'cpi', [ev, ac]) }
  /** SCHEDULE PERFORMANCE INDEX (×100): earned value over planned value. value ⌊ev · 100 / pv⌋. */
  static spi(ev: number, pv: number): CrossFormula { return c('earnedvalue-spi', 'spi(ev, pv) = ⌊ev · 100 / pv⌋', pv > 0 ? Math.floor((ev * 100) / pv) : 0, nat(ev, pv) && pv > 0, 'spi', [ev, pv]) }
  /** COST VARIANCE: earned value less actual cost, floored at zero. value max(0, ev − ac). */
  static costvariance(ev: number, ac: number): CrossFormula { return c('earnedvalue-costvariance', 'costvariance(ev, ac) = max(0, ev − ac)', Math.max(0, ev - ac), nat(ev, ac), 'costvariance', [ev, ac]) }
  /** SCHEDULE VARIANCE: earned value less planned value, floored at zero. value max(0, ev − pv). */
  static schedulevariance(ev: number, pv: number): CrossFormula { return c('earnedvalue-schedulevariance', 'schedulevariance(ev, pv) = max(0, ev − pv)', Math.max(0, ev - pv), nat(ev, pv), 'schedulevariance', [ev, pv]) }
  /** ESTIMATE AT COMPLETION: budget at completion scaled by cost efficiency. value ⌊bac · ac / ev⌋. */
  static eac(bac: number, ac: number, ev: number): CrossFormula { return c('earnedvalue-eac', 'eac(bac, ac, ev) = ⌊bac · ac / ev⌋', ev > 0 ? Math.floor((bac * ac) / ev) : 0, nat(bac, ac, ev) && ev > 0, 'eac', [bac, ac, ev]) }
  /** ESTIMATE TO COMPLETE: the budget left on the work remaining. value max(0, bac − ev). */
  static etc(bac: number, ev: number): CrossFormula { return c('earnedvalue-etc', 'etc(bac, ev) = max(0, bac − ev)', Math.max(0, bac - ev), nat(bac, ev), 'etc', [bac, ev]) }
  /** TO-COMPLETE PERFORMANCE INDEX (×100): work remaining over budget remaining. value ⌊max(0, bac − ev) · 100 / max(0, bac − ac)⌋. */
  static tcpi(bac: number, ev: number, ac: number): CrossFormula { const rem = Math.max(0, bac - ac); return c('earnedvalue-tcpi', 'tcpi(bac, ev, ac) = ⌊max(0, bac − ev) · 100 / max(0, bac − ac)⌋', rem > 0 ? Math.floor((Math.max(0, bac - ev) * 100) / rem) : 0, nat(bac, ev, ac) && bac > ac, 'tcpi', [bac, ev, ac]) }
  /** VARIANCE AT COMPLETION: budget at completion less the estimate at completion. value max(0, bac − eac). */
  static vac(bac: number, eac: number): CrossFormula { return c('earnedvalue-vac', 'vac(bac, eac) = max(0, bac − eac)', Math.max(0, bac - eac), nat(bac, eac), 'vac', [bac, eac]) }
}

for (const name of ['costvariance', 'cpi', 'eac', 'etc', 'schedulevariance', 'spi', 'tcpi', 'vac'] as const)
  hexRegisterOf('earnedvalue', name, (EarnedvalueFormulas[name] as (...x: unknown[]) => unknown).bind(EarnedvalueFormulas))
