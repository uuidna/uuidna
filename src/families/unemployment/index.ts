import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** UNEMPLOYMENT — scaffolded integer measures crossed to macroeconomics. Every output an exact finite nonnegative integer. */

const PROOF = 'unemployment arithmetic (ratepct, labourforce, unemployed, participationrate, naturalrate, okunsgap, jobseekers, durationweeks); scaffolded from the integer-op palette; a measure crossed to macroeconomics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'unemployment', dst: 'macroeconomics', formula, value, proof: PROOF, ...extra }, holds, { name: `unemployment.${name}`, params })

export class UnemploymentFormulas {
  static ratepct(x: number, y: number): CrossFormula { return c('unemployment-ratepct', 'ratepct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ratepct', [x, y]) }
  static labourforce(x: number, y: number): CrossFormula { return c('unemployment-labourforce', 'labourforce(x, y) = x · y', x * y, nat(x, y), 'labourforce', [x, y]) }
  static unemployed(x: number, y: number): CrossFormula { return c('unemployment-unemployed', 'unemployed(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'unemployed', [x, y]) }
  static participationrate(x: number, y: number): CrossFormula { return c('unemployment-participationrate', 'participationrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'participationrate', [x, y]) }
  static naturalrate(x: number, y: number): CrossFormula { return c('unemployment-naturalrate', 'naturalrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'naturalrate', [x, y]) }
  static okunsgap(x: number, y: number): CrossFormula { return c('unemployment-okunsgap', 'okunsgap(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'okunsgap', [x, y]) }
  static jobseekers(x: number, y: number): CrossFormula { return c('unemployment-jobseekers', 'jobseekers(x, y) = x · y', x * y, nat(x, y), 'jobseekers', [x, y]) }
  static durationweeks(x: number, y: number): CrossFormula { return c('unemployment-durationweeks', 'durationweeks(x, y) = x + y', x + y, nat(x, y), 'durationweeks', [x, y]) }
}

for (const name of ['durationweeks', 'jobseekers', 'labourforce', 'naturalrate', 'okunsgap', 'participationrate', 'ratepct', 'unemployed'] as const)
  hexRegisterOf('unemployment', name, (UnemploymentFormulas[name] as (...x: unknown[]) => unknown).bind(UnemploymentFormulas))
