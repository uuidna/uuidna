import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PAINTING — scaffolded integer measures crossed to optics. Every output an exact finite nonnegative integer. */

const PROOF = 'painting arithmetic (primarycolors, mixingcombos, layercount, huewheel, pigmentsubsets, canvasarea, valuescale, opacityratio); scaffolded from the integer-op palette; a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'painting', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `painting.${name}`, params })

export class PaintingFormulas {
  static primarycolors(x: number, y: number): CrossFormula { return c('painting-primarycolors', 'primarycolors(x, y) = x + y', x + y, nat(x, y), 'primarycolors', [x, y]) }
  static mixingcombos(x: number, y: number): CrossFormula { return c('painting-mixingcombos', 'mixingcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'mixingcombos', [x, y]) }
  static layercount(x: number, y: number): CrossFormula { return c('painting-layercount', 'layercount(x, y) = x + y', x + y, nat(x, y), 'layercount', [x, y]) }
  static huewheel(x: number, y: number): CrossFormula { return c('painting-huewheel', 'huewheel(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'huewheel', [x, y]) }
  static pigmentsubsets(x: number): CrossFormula { return c('painting-pigmentsubsets', 'pigmentsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'pigmentsubsets', [x]) }
  static canvasarea(x: number, y: number): CrossFormula { return c('painting-canvasarea', 'canvasarea(x, y) = x · y', x * y, nat(x, y), 'canvasarea', [x, y]) }
  static valuescale(x: number, y: number): CrossFormula { return c('painting-valuescale', 'valuescale(x, y) = x + y', x + y, nat(x, y), 'valuescale', [x, y]) }
  static opacityratio(x: number, y: number): CrossFormula { return c('painting-opacityratio', 'opacityratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'opacityratio', [x, y]) }
}

for (const name of ['canvasarea', 'huewheel', 'layercount', 'mixingcombos', 'opacityratio', 'pigmentsubsets', 'primarycolors', 'valuescale'] as const)
  hexRegisterOf('painting', name, (PaintingFormulas[name] as (...x: unknown[]) => unknown).bind(PaintingFormulas))
