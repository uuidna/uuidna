import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DROUGHT — scaffolded integer measures crossed to hydrology. Every output an exact finite nonnegative integer. */

const PROOF = 'drought arithmetic (severity, durationmonths, rainfalldeficit, pdsi, affectedarea, waterdeficit, recoverymonths, impactindex); scaffolded from the integer-op palette; a measure crossed to hydrology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'drought', dst: 'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `drought.${name}`, params })

export class DroughtFormulas {
  static severity(x: number, y: number): CrossFormula { return c('drought-severity', 'severity(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'severity', [x, y]) }
  static durationmonths(x: number, y: number): CrossFormula { return c('drought-durationmonths', 'durationmonths(x, y) = x + y', x + y, nat(x, y), 'durationmonths', [x, y]) }
  static rainfalldeficit(x: number, y: number): CrossFormula { return c('drought-rainfalldeficit', 'rainfalldeficit(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'rainfalldeficit', [x, y]) }
  static pdsi(x: number, y: number): CrossFormula { return c('drought-pdsi', 'pdsi(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'pdsi', [x, y]) }
  static affectedarea(x: number, y: number): CrossFormula { return c('drought-affectedarea', 'affectedarea(x, y) = x · y', x * y, nat(x, y), 'affectedarea', [x, y]) }
  static waterdeficit(x: number, y: number): CrossFormula { return c('drought-waterdeficit', 'waterdeficit(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'waterdeficit', [x, y]) }
  static recoverymonths(x: number, y: number): CrossFormula { return c('drought-recoverymonths', 'recoverymonths(x, y) = x + y', x + y, nat(x, y), 'recoverymonths', [x, y]) }
  static impactindex(x: number, y: number): CrossFormula { return c('drought-impactindex', 'impactindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'impactindex', [x, y]) }
}

for (const name of ['affectedarea', 'durationmonths', 'impactindex', 'pdsi', 'rainfalldeficit', 'recoverymonths', 'severity', 'waterdeficit'] as const)
  hexRegisterOf('drought', name, (DroughtFormulas[name] as (...x: unknown[]) => unknown).bind(DroughtFormulas))
