import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** APIOLOGY — scaffolded integer measures crossed to ecology. Every output an exact finite nonnegative integer. */

const PROOF = 'apiology arithmetic (hivepopulation, combcells, foragerange, pollenloads, dancepaths, honeyyield, broodcycle, swarmthreshold); scaffolded from the integer-op palette; a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'apiology', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `apiology.${name}`, params })

export class ApiologyFormulas {
  static hivepopulation(x: number, y: number): CrossFormula { return c('apiology-hivepopulation', 'hivepopulation(x, y) = x · y', x * y, nat(x, y), 'hivepopulation', [x, y]) }
  static combcells(x: number, y: number): CrossFormula { return c('apiology-combcells', 'combcells(x, y) = x · y', x * y, nat(x, y), 'combcells', [x, y]) }
  static foragerange(x: number, y: number): CrossFormula { return c('apiology-foragerange', 'foragerange(x, y) = x · y', x * y, nat(x, y), 'foragerange', [x, y]) }
  static pollenloads(x: number, y: number): CrossFormula { return c('apiology-pollenloads', 'pollenloads(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'pollenloads', [x, y]) }
  static dancepaths(x: number, y: number): CrossFormula { return c('apiology-dancepaths', 'dancepaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'dancepaths', [x, y]) }
  static honeyyield(x: number, y: number): CrossFormula { return c('apiology-honeyyield', 'honeyyield(x, y) = x · y', x * y, nat(x, y), 'honeyyield', [x, y]) }
  static broodcycle(x: number, y: number): CrossFormula { return c('apiology-broodcycle', 'broodcycle(x, y) = x + y', x + y, nat(x, y), 'broodcycle', [x, y]) }
  static swarmthreshold(x: number, y: number): CrossFormula { return c('apiology-swarmthreshold', 'swarmthreshold(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'swarmthreshold', [x, y]) }
}

for (const name of ['broodcycle', 'combcells', 'dancepaths', 'foragerange', 'hivepopulation', 'honeyyield', 'pollenloads', 'swarmthreshold'] as const)
  hexRegisterOf('apiology', name, (ApiologyFormulas[name] as (...x: unknown[]) => unknown).bind(ApiologyFormulas))
