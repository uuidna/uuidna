import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SUBMARINE — scaffolded integer measures crossed to physics. Every output an exact finite nonnegative integer. */

const PROOF = 'submarine arithmetic (depth, pressure, buoyancy, displacement, ballasttanks, sonarrange, crushdepth, trimangle); scaffolded from the integer-op palette; a measure crossed to physics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'submarine', dst: 'physics', formula, value, proof: PROOF, ...extra }, holds, { name: `submarine.${name}`, params })

export class SubmarineFormulas {
  static depth(x: number, y: number): CrossFormula { return c('submarine-depth', 'depth(x, y) = x · y', x * y, nat(x, y), 'depth', [x, y]) }
  static pressure(x: number, y: number): CrossFormula { return c('submarine-pressure', 'pressure(x, y) = x · y', x * y, nat(x, y), 'pressure', [x, y]) }
  static buoyancy(x: number, y: number): CrossFormula { return c('submarine-buoyancy', 'buoyancy(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'buoyancy', [x, y]) }
  static displacement(x: number, y: number): CrossFormula { return c('submarine-displacement', 'displacement(x, y) = x · y', x * y, nat(x, y), 'displacement', [x, y]) }
  static ballasttanks(x: number, y: number): CrossFormula { return c('submarine-ballasttanks', 'ballasttanks(x, y) = x + y', x + y, nat(x, y), 'ballasttanks', [x, y]) }
  static sonarrange(x: number, y: number): CrossFormula { return c('submarine-sonarrange', 'sonarrange(x, y) = x · y', x * y, nat(x, y), 'sonarrange', [x, y]) }
  static crushdepth(x: number, y: number): CrossFormula { return c('submarine-crushdepth', 'crushdepth(x, y) = x · y', x * y, nat(x, y), 'crushdepth', [x, y]) }
  static trimangle(x: number, y: number): CrossFormula { return c('submarine-trimangle', 'trimangle(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'trimangle', [x, y]) }
}

for (const name of ['ballasttanks', 'buoyancy', 'crushdepth', 'depth', 'displacement', 'pressure', 'sonarrange', 'trimangle'] as const)
  hexRegisterOf('submarine', name, (SubmarineFormulas[name] as (...x: unknown[]) => unknown).bind(SubmarineFormulas))
