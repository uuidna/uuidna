import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CERN — scaffolded integer measures crossed to physics. Every output an exact finite nonnegative integer. */

const PROOF = 'cern arithmetic (energygev, collisions, luminosity, detectorlayers, particlepairs, bunchspacing, tracksperevent, triggerrate); scaffolded from the integer-op palette; a measure crossed to physics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cern', dst: 'physics', formula, value, proof: PROOF, ...extra }, holds, { name: `cern.${name}`, params })

export class CernFormulas {
  static energygev(x: number, y: number): CrossFormula { return c('cern-energygev', 'energygev(x, y) = x · y', x * y, nat(x, y), 'energygev', [x, y]) }
  static collisions(x: number, y: number): CrossFormula { return c('cern-collisions', 'collisions(x, y) = x · y', x * y, nat(x, y), 'collisions', [x, y]) }
  static luminosity(x: number, y: number): CrossFormula { return c('cern-luminosity', 'luminosity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'luminosity', [x, y]) }
  static detectorlayers(x: number, y: number): CrossFormula { return c('cern-detectorlayers', 'detectorlayers(x, y) = x + y', x + y, nat(x, y), 'detectorlayers', [x, y]) }
  static particlepairs(x: number, y: number): CrossFormula { return c('cern-particlepairs', 'particlepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'particlepairs', [x, y]) }
  static bunchspacing(x: number, y: number): CrossFormula { return c('cern-bunchspacing', 'bunchspacing(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'bunchspacing', [x, y]) }
  static tracksperevent(x: number, y: number): CrossFormula { return c('cern-tracksperevent', 'tracksperevent(x, y) = x · y', x * y, nat(x, y), 'tracksperevent', [x, y]) }
  static triggerrate(x: number, y: number): CrossFormula { return c('cern-triggerrate', 'triggerrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'triggerrate', [x, y]) }
}

for (const name of ['bunchspacing', 'collisions', 'detectorlayers', 'energygev', 'luminosity', 'particlepairs', 'tracksperevent', 'triggerrate'] as const)
  hexRegisterOf('cern', name, (CernFormulas[name] as (...x: unknown[]) => unknown).bind(CernFormulas))
