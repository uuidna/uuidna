import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STAINEDGLASS — scaffolded integer measures crossed to optics. Every output an exact finite nonnegative integer. */

const PROOF = 'stainedglass arithmetic (panecount, leadlines, transmittance, colorcombos, cameleadlength, refractionindex, panelsubsets, symmetryorderings); scaffolded from the integer-op palette; a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'stainedglass', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `stainedglass.${name}`, params })

export class StainedglassFormulas {
  static panecount(x: number, y: number): CrossFormula { return c('stainedglass-panecount', 'panecount(x, y) = x · y', x * y, nat(x, y), 'panecount', [x, y]) }
  static leadlines(x: number, y: number): CrossFormula { return c('stainedglass-leadlines', 'leadlines(x, y) = x + y', x + y, nat(x, y), 'leadlines', [x, y]) }
  static transmittance(x: number, y: number): CrossFormula { return c('stainedglass-transmittance', 'transmittance(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'transmittance', [x, y]) }
  static colorcombos(x: number, y: number): CrossFormula { return c('stainedglass-colorcombos', 'colorcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'colorcombos', [x, y]) }
  static cameleadlength(x: number, y: number): CrossFormula { return c('stainedglass-cameleadlength', 'cameleadlength(x, y) = x · y', x * y, nat(x, y), 'cameleadlength', [x, y]) }
  static refractionindex(x: number, y: number): CrossFormula { return c('stainedglass-refractionindex', 'refractionindex(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'refractionindex', [x, y]) }
  static panelsubsets(x: number): CrossFormula { return c('stainedglass-panelsubsets', 'panelsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'panelsubsets', [x]) }
  static symmetryorderings(x: number): CrossFormula { return c('stainedglass-symmetryorderings', 'symmetryorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'symmetryorderings', [x]) }
}

for (const name of ['cameleadlength', 'colorcombos', 'leadlines', 'panecount', 'panelsubsets', 'refractionindex', 'symmetryorderings', 'transmittance'] as const)
  hexRegisterOf('stainedglass', name, (StainedglassFormulas[name] as (...x: unknown[]) => unknown).bind(StainedglassFormulas))
