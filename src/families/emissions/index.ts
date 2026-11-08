import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EMISSIONS — CARBON ACCOUNTING AS ARITHMETIC (chosen by the registry, not by hand). Greenhouse gas is numbers:
 *  intensity per unit of output, emissions per head, the reduction against a baseline, the scope share, the CO2e
 *  equivalent, the carbon tax owed, the overage past an allowance, and how much is sequestered. Crosses to `climate`
 *  — emissions are what the climate integrates. A measure. */

const PROOF = 'emissions arithmetic (intensity, per-capita, reduction, scope share, CO2e equivalent, carbon tax, allowance overage, sequestration); a measure crossed to climate'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'emissions', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name: `emissions.${name}`, params })

export class EmissionsFormulas {
  /** INTENSITY: emissions per unit of output. value ⌊emitted / output⌋. */
  static intensity(emitted: number, output: number): CrossFormula { return c('emissions-intensity', 'intensity(emitted, output) = ⌊emitted / output⌋', output > 0 ? Math.floor(emitted / output) : 0, nat(emitted, output) && output > 0, 'intensity', [emitted, output]) }
  /** PER CAPITA: total emissions per head. value ⌊total / population⌋. */
  static percapita(total: number, population: number): CrossFormula { return c('emissions-percapita', 'percapita(total, population) = ⌊total / population⌋', population > 0 ? Math.floor(total / population) : 0, nat(total, population) && population > 0, 'percapita', [total, population]) }
  /** REDUCTION against a baseline, as a percentage. value ⌊(baseline − current) · 100 / baseline⌋. */
  static reduction(baseline: number, current: number): CrossFormula { return c('emissions-reduction', 'reduction(baseline, current) = ⌊(baseline − current) · 100 / baseline⌋', baseline > 0 ? Math.floor(((baseline - current) * 100) / baseline) : 0, nat(baseline, current) && baseline > 0 && current <= baseline, 'reduction', [baseline, current]) }
  /** SCOPE share: direct emissions as a percentage of the total. value ⌊direct · 100 / total⌋. */
  static scope(direct: number, total: number): CrossFormula { return c('emissions-scope', 'scope(direct, total) = ⌊direct · 100 / total⌋', total > 0 ? Math.floor((direct * 100) / total) : 0, nat(direct, total) && total > 0 && direct <= total, 'scope', [direct, total]) }
  /** CO2 EQUIVALENT: a gas weighted by its warming factor. value gas · factor. */
  static equivalent(gas: number, factor: number): CrossFormula { return c('emissions-equivalent', 'equivalent(gas, factor) = gas · factor', gas * factor, nat(gas, factor), 'equivalent', [gas, factor]) }
  /** CARBON TAX: emissions at a rate per hundred. value ⌊emitted · rate / 100⌋. */
  static tax(emitted: number, rate: number): CrossFormula { return c('emissions-tax', 'tax(emitted, rate) = ⌊emitted · rate / 100⌋', Math.floor((emitted * rate) / 100), nat(emitted, rate), 'tax', [emitted, rate]) }
  /** ALLOWANCE overage: emissions past a cap. value max(0, emitted − cap). */
  static allowance(emitted: number, cap: number): CrossFormula { return c('emissions-allowance', 'allowance(emitted, cap) = max(0, emitted − cap)', Math.max(0, emitted - cap), nat(emitted, cap), 'allowance', [emitted, cap]) }
  /** SEQUESTRATION: captured as a percentage of emitted. value ⌊captured · 100 / emitted⌋. */
  static sequestration(captured: number, emitted: number): CrossFormula { return c('emissions-sequestration', 'sequestration(captured, emitted) = ⌊captured · 100 / emitted⌋', emitted > 0 ? Math.floor((captured * 100) / emitted) : 0, nat(captured, emitted) && emitted > 0, 'sequestration', [captured, emitted]) }
}

for (const name of ['allowance', 'equivalent', 'intensity', 'percapita', 'reduction', 'scope', 'sequestration', 'tax'] as const)
  hexRegisterOf('emissions', name, (EmissionsFormulas[name] as (...x: unknown[]) => unknown).bind(EmissionsFormulas))
