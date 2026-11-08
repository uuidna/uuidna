import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INDUCTOR — scaffolded integer measures crossed to electronics. Every output an exact finite nonnegative integer. */

const PROOF = 'inductor arithmetic (inductance, reactance, energy, timeconstant, turnspairs, quality, seriessum, coupling); scaffolded from the integer-op palette; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'inductor', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `inductor.${name}`, params })

export class InductorFormulas {
  static inductance(x: number, y: number): CrossFormula { return c('inductor-inductance', 'inductance(x, y) = x · y', x * y, nat(x, y), 'inductance', [x, y]) }
  static reactance(x: number, y: number): CrossFormula { return c('inductor-reactance', 'reactance(x, y) = x · y', x * y, nat(x, y), 'reactance', [x, y]) }
  static energy(x: number, y: number): CrossFormula { return c('inductor-energy', 'energy(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'energy', [x, y]) }
  static timeconstant(x: number, y: number): CrossFormula { return c('inductor-timeconstant', 'timeconstant(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'timeconstant', [x, y]) }
  static turnspairs(x: number, y: number): CrossFormula { return c('inductor-turnspairs', 'turnspairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'turnspairs', [x, y]) }
  static quality(x: number, y: number): CrossFormula { return c('inductor-quality', 'quality(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'quality', [x, y]) }
  static seriessum(x: number, y: number): CrossFormula { return c('inductor-seriessum', 'seriessum(x, y) = x + y', x + y, nat(x, y), 'seriessum', [x, y]) }
  static coupling(x: number, y: number): CrossFormula { return c('inductor-coupling', 'coupling(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coupling', [x, y]) }
}

for (const name of ['coupling', 'energy', 'inductance', 'quality', 'reactance', 'seriessum', 'timeconstant', 'turnspairs'] as const)
  hexRegisterOf('inductor', name, (InductorFormulas[name] as (...x: unknown[]) => unknown).bind(InductorFormulas))
