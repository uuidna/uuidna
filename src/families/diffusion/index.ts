import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DIFFUSION — TRANSPORT DOWN A GRADIENT, AS ARITHMETIC. Matter spreading is numbers: the flux through a face, the
 *  concentration gradient, mean squared displacement in a time, membrane permeability, Fick's steady rate, the drop
 *  across a barrier, the effusion ratio of two species, and whether influx balances outflux. Crosses to `chemistry` —
 *  diffusion is how chemistry moves. A measure. */

const PROOF = 'diffusion arithmetic (flux, gradient, mean squared displacement, permeability, Fick rate, concentration drop, effusion ratio, steady state); transport down a gradient; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'diffusion', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `diffusion.${name}`, params })

export class DiffusionFormulas {
  /** FLUX: Fick's first law as a product — diffusivity times the gradient. value d · gradient. */
  static flux(d: number, gradient: number): CrossFormula { return c('diffusion-flux', 'flux(d, gradient) = d · gradient', d * gradient, nat(d, gradient), 'flux', [d, gradient]) }
  /** GRADIENT: the concentration difference per unit distance. value ⌊max(0, chigh − clow) / dist⌋. */
  static gradient(chigh: number, clow: number, dist: number): CrossFormula { return c('diffusion-gradient', 'gradient(chigh, clow, dist) = ⌊max(0, chigh − clow) / dist⌋', dist > 0 ? Math.floor(Math.max(0, chigh - clow) / dist) : 0, nat(chigh, clow, dist) && dist > 0, 'gradient', [chigh, clow, dist]) }
  /** MEAN SQUARED DISPLACEMENT: 1D Einstein relation ⟨x²⟩ = 2·D·t. value 2 · d · t. */
  static meansquare(d: number, t: number): CrossFormula { return c('diffusion-meansquare', 'meansquare(d, t) = 2 · d · t', 2 * d * t, nat(d, t), 'meansquare', [d, t]) }
  /** PERMEABILITY: diffusivity times solubility over thickness. value ⌊d · sol / thick⌋. */
  static permeability(d: number, sol: number, thick: number): CrossFormula { return c('diffusion-permeability', 'permeability(d, sol, thick) = ⌊d · sol / thick⌋', thick > 0 ? Math.floor((d * sol) / thick) : 0, nat(d, sol, thick) && thick > 0, 'permeability', [d, sol, thick]) }
  /** FICK RATE: mass transported over the elapsed time. value ⌊mass / time⌋. */
  static fickrate(mass: number, time: number): CrossFormula { return c('diffusion-fickrate', 'fickrate(mass, time) = ⌊mass / time⌋', time > 0 ? Math.floor(mass / time) : 0, nat(mass, time) && time > 0, 'fickrate', [mass, time]) }
  /** CONCENTRATION DROP across a barrier. value max(0, cin − cout). */
  static concentrationdrop(cin: number, cout: number): CrossFormula { return c('diffusion-concentrationdrop', 'concentrationdrop(cin, cout) = max(0, cin − cout)', Math.max(0, cin - cout), nat(cin, cout), 'concentrationdrop', [cin, cout]) }
  /** EFFUSION RATIO: Graham's-law proxy, the lighter species scaled by 100 over the heavier. value ⌊m1 · 100 / m2⌋. */
  static effusionratio(m1: number, m2: number): CrossFormula { return c('diffusion-effusionratio', 'effusionratio(m1, m2) = ⌊m1 · 100 / m2⌋', m2 > 0 ? Math.floor((m1 * 100) / m2) : 0, nat(m1, m2) && m2 > 0, 'effusionratio', [m1, m2]) }
  /** STEADY FLUX: 1 when influx balances outflux (steady state). value [influx = outflux]. */
  static steadyflux(influx: number, outflux: number): CrossFormula { return c('diffusion-steadyflux', 'steadyflux(influx, outflux) = [influx = outflux]', influx === outflux ? 1 : 0, nat(influx, outflux), 'steadyflux', [influx, outflux]) }
}

for (const name of ['concentrationdrop', 'effusionratio', 'fickrate', 'flux', 'gradient', 'meansquare', 'permeability', 'steadyflux'] as const)
  hexRegisterOf('diffusion', name, (DiffusionFormulas[name] as (...x: unknown[]) => unknown).bind(DiffusionFormulas))
