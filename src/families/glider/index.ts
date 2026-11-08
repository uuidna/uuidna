import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GLIDER — scaffolded integer measures crossed to aerospace. Every output an exact finite nonnegative integer. */

const PROOF = 'glider arithmetic (glideratio, sinkrate, wingspan, aspectratio, stallspeed, liftdragpairs, thermalgain, range); scaffolded from the integer-op palette; a measure crossed to aerospace'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'glider', dst: 'aerospace', formula, value, proof: PROOF, ...extra }, holds, { name: `glider.${name}`, params })

export class GliderFormulas {
  static glideratio(x: number, y: number): CrossFormula { return c('glider-glideratio', 'glideratio(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'glideratio', [x, y]) }
  static sinkrate(x: number, y: number): CrossFormula { return c('glider-sinkrate', 'sinkrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'sinkrate', [x, y]) }
  static wingspan(x: number, y: number): CrossFormula { return c('glider-wingspan', 'wingspan(x, y) = x · y', x * y, nat(x, y), 'wingspan', [x, y]) }
  static aspectratio(x: number, y: number): CrossFormula { return c('glider-aspectratio', 'aspectratio(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'aspectratio', [x, y]) }
  static stallspeed(x: number, y: number): CrossFormula { return c('glider-stallspeed', 'stallspeed(x, y) = x · y', x * y, nat(x, y), 'stallspeed', [x, y]) }
  static liftdragpairs(x: number, y: number): CrossFormula { return c('glider-liftdragpairs', 'liftdragpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'liftdragpairs', [x, y]) }
  static thermalgain(x: number, y: number): CrossFormula { return c('glider-thermalgain', 'thermalgain(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'thermalgain', [x, y]) }
  static range(x: number, y: number): CrossFormula { return c('glider-range', 'range(x, y) = x · y', x * y, nat(x, y), 'range', [x, y]) }
}

for (const name of ['aspectratio', 'glideratio', 'liftdragpairs', 'range', 'sinkrate', 'stallspeed', 'thermalgain', 'wingspan'] as const)
  hexRegisterOf('glider', name, (GliderFormulas[name] as (...x: unknown[]) => unknown).bind(GliderFormulas))
