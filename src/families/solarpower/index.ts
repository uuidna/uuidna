import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOLARPOWER — scaffolded integer measures crossed to energy. Every output an exact finite nonnegative integer. */

const PROOF = 'solarpower arithmetic (paneloutput, efficiency, irradiance, dailyyield, arraysize, degradation, inverterloss, capacityfactor); scaffolded from the integer-op palette; a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'solarpower', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `solarpower.${name}`, params })

export class SolarpowerFormulas {
  static paneloutput(x: number, y: number): CrossFormula { return c('solarpower-paneloutput', 'paneloutput(x, y) = x · y', x * y, nat(x, y), 'paneloutput', [x, y]) }
  static efficiency(x: number, y: number): CrossFormula { return c('solarpower-efficiency', 'efficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
  static irradiance(x: number, y: number): CrossFormula { return c('solarpower-irradiance', 'irradiance(x, y) = x · y', x * y, nat(x, y), 'irradiance', [x, y]) }
  static dailyyield(x: number, y: number): CrossFormula { return c('solarpower-dailyyield', 'dailyyield(x, y) = x · y', x * y, nat(x, y), 'dailyyield', [x, y]) }
  static arraysize(x: number, y: number): CrossFormula { return c('solarpower-arraysize', 'arraysize(x, y) = x · y', x * y, nat(x, y), 'arraysize', [x, y]) }
  static degradation(x: number, y: number): CrossFormula { return c('solarpower-degradation', 'degradation(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'degradation', [x, y]) }
  static inverterloss(x: number, y: number): CrossFormula { return c('solarpower-inverterloss', 'inverterloss(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'inverterloss', [x, y]) }
  static capacityfactor(x: number, y: number): CrossFormula { return c('solarpower-capacityfactor', 'capacityfactor(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'capacityfactor', [x, y]) }
}

for (const name of ['arraysize', 'capacityfactor', 'dailyyield', 'degradation', 'efficiency', 'inverterloss', 'irradiance', 'paneloutput'] as const)
  hexRegisterOf('solarpower', name, (SolarpowerFormulas[name] as (...x: unknown[]) => unknown).bind(SolarpowerFormulas))
