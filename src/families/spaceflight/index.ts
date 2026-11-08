import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SPACEFLIGHT — scaffolded integer measures crossed to aerospace. Every output an exact finite nonnegative integer. */

const PROOF = 'spaceflight arithmetic (deltav, escapevelocity, orbitalperiod, payloadfraction, stageorderings, burntime, apogee, twr); scaffolded from the integer-op palette; a measure crossed to aerospace'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'spaceflight', dst: 'aerospace', formula, value, proof: PROOF, ...extra }, holds, { name: `spaceflight.${name}`, params })

export class SpaceflightFormulas {
  static deltav(x: number, y: number): CrossFormula { return c('spaceflight-deltav', 'deltav(x, y) = x · y', x * y, nat(x, y), 'deltav', [x, y]) }
  static escapevelocity(x: number, y: number): CrossFormula { return c('spaceflight-escapevelocity', 'escapevelocity(x, y) = x · y', x * y, nat(x, y), 'escapevelocity', [x, y]) }
  static orbitalperiod(x: number, y: number): CrossFormula { return c('spaceflight-orbitalperiod', 'orbitalperiod(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'orbitalperiod', [x, y]) }
  static payloadfraction(x: number, y: number): CrossFormula { return c('spaceflight-payloadfraction', 'payloadfraction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'payloadfraction', [x, y]) }
  static stageorderings(x: number): CrossFormula { return c('spaceflight-stageorderings', 'stageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stageorderings', [x]) }
  static burntime(x: number, y: number): CrossFormula { return c('spaceflight-burntime', 'burntime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'burntime', [x, y]) }
  static apogee(x: number, y: number): CrossFormula { return c('spaceflight-apogee', 'apogee(x, y) = x · y', x * y, nat(x, y), 'apogee', [x, y]) }
  static twr(x: number, y: number): CrossFormula { return c('spaceflight-twr', 'twr(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'twr', [x, y]) }
}

for (const name of ['apogee', 'burntime', 'deltav', 'escapevelocity', 'orbitalperiod', 'payloadfraction', 'stageorderings', 'twr'] as const)
  hexRegisterOf('spaceflight', name, (SpaceflightFormulas[name] as (...x: unknown[]) => unknown).bind(SpaceflightFormulas))
