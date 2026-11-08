import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RELATIVITY — SPACETIME AS ARITHMETIC. Energy, time dilation, the beta fraction of light speed, momentum, gravitational
 *  redshift, spatial curvature, the Schwarzschild horizon, and the spacetime interval. Every value an integer; every
 *  division guarded. Crosses to `gravity` — relativity is what gravity bends. A measure. */

const PROOF = 'relativity arithmetic (energy, time dilation, lorentz beta, momentum, redshift, curvature, horizon, interval); integer proxies with every division guarded; a measure crossed to gravity'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'relativity', dst: 'gravity', formula, value, proof: PROOF, ...extra }, holds, { name: `relativity.${name}`, params })

export class RelativityFormulas {
  /** ENERGY: mass times c² (caller supplies c² scaled, E = mc² proxy). value mass · c2. */
  static energy(mass: number, c2: number): CrossFormula { return c('relativity-energy', 'energy(mass, c2) = mass · c2', mass * c2, nat(mass, c2), 'energy', [mass, c2]) }
  /** TIME DILATION: proper time stretched by a factor. value proper · factor. */
  static dilation(proper: number, factor: number): CrossFormula { return c('relativity-dilation', 'dilation(proper, factor) = proper · factor', proper * factor, nat(proper, factor), 'dilation', [proper, factor]) }
  /** LORENTZ BETA: velocity as a percentage of light speed. value ⌊velocity · 100 / c⌋. */
  static lorentz(velocity: number, c_: number): CrossFormula { return c('relativity-lorentz', 'lorentz(velocity, c) = ⌊velocity · 100 / c⌋', c_ > 0 ? Math.floor((velocity * 100) / c_) : 0, nat(velocity, c_) && c_ > 0 && velocity <= c_, 'lorentz', [velocity, c_]) }
  /** MOMENTUM: mass times velocity. value mass · velocity. */
  static momentum(mass: number, velocity: number): CrossFormula { return c('relativity-momentum', 'momentum(mass, velocity) = mass · velocity', mass * velocity, nat(mass, velocity), 'momentum', [mass, velocity]) }
  /** GRAVITATIONAL REDSHIFT: the fractional shift (per mille) below the emitted frequency. value ⌊max(0, emitted − gravity) · 1000 / emitted⌋. */
  static redshift(emitted: number, gravity_: number): CrossFormula { return c('relativity-redshift', 'redshift(emitted, gravity) = ⌊max(0, emitted − gravity) · 1000 / emitted⌋', emitted > 0 ? Math.floor((Math.max(0, emitted - gravity_) * 1000) / emitted) : 0, nat(emitted, gravity_) && emitted > 0, 'redshift', [emitted, gravity_]) }
  /** CURVATURE: mass over radius (a spatial curvature proxy). value ⌊mass / radius⌋. */
  static curvature(mass: number, radius: number): CrossFormula { return c('relativity-curvature', 'curvature(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0, 'curvature', [mass, radius]) }
  /** SCHWARZSCHILD HORIZON: the event-horizon radius proxy. value mass · 3. */
  static horizon(mass: number): CrossFormula { return c('relativity-horizon', 'horizon(mass) = mass · 3', mass * 3, nat(mass), 'horizon', [mass]) }
  /** SPACETIME INTERVAL: the space component above the time component. value max(0, space − time). */
  static interval(space: number, time_: number): CrossFormula { return c('relativity-interval', 'interval(space, time) = max(0, space − time)', Math.max(0, space - time_), nat(space, time_), 'interval', [space, time_]) }
}

for (const name of ['curvature', 'dilation', 'energy', 'horizon', 'interval', 'lorentz', 'momentum', 'redshift'] as const)
  hexRegisterOf('relativity', name, (RelativityFormulas[name] as (...x: unknown[]) => unknown).bind(RelativityFormulas))
