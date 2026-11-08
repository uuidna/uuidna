import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PUPPETRY — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'puppetry arithmetic (strings, jointcount, controlbars, manipulators, gesturecombos, articulationpoints, riggingsubsets, motionrange); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'puppetry', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `puppetry.${name}`, params })

export class PuppetryFormulas {
  static strings(x: number, y: number): CrossFormula { return c('puppetry-strings', 'strings(x, y) = x + y', x + y, nat(x, y), 'strings', [x, y]) }
  static jointcount(x: number, y: number): CrossFormula { return c('puppetry-jointcount', 'jointcount(x, y) = x · y', x * y, nat(x, y), 'jointcount', [x, y]) }
  static controlbars(x: number, y: number): CrossFormula { return c('puppetry-controlbars', 'controlbars(x, y) = x + y', x + y, nat(x, y), 'controlbars', [x, y]) }
  static manipulators(x: number, y: number): CrossFormula { return c('puppetry-manipulators', 'manipulators(x, y) = x + y', x + y, nat(x, y), 'manipulators', [x, y]) }
  static gesturecombos(x: number, y: number): CrossFormula { return c('puppetry-gesturecombos', 'gesturecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'gesturecombos', [x, y]) }
  static articulationpoints(x: number, y: number): CrossFormula { return c('puppetry-articulationpoints', 'articulationpoints(x, y) = x · y', x * y, nat(x, y), 'articulationpoints', [x, y]) }
  static riggingsubsets(x: number): CrossFormula { return c('puppetry-riggingsubsets', 'riggingsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'riggingsubsets', [x]) }
  static motionrange(x: number, y: number): CrossFormula { return c('puppetry-motionrange', 'motionrange(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'motionrange', [x, y]) }
}

for (const name of ['articulationpoints', 'controlbars', 'gesturecombos', 'jointcount', 'manipulators', 'motionrange', 'riggingsubsets', 'strings'] as const)
  hexRegisterOf('puppetry', name, (PuppetryFormulas[name] as (...x: unknown[]) => unknown).bind(PuppetryFormulas))
