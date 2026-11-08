import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COSMOLOGY — THE EXPANDING UNIVERSE, AS ARITHMETIC. The large-scale numbers: the Hubble rate from a velocity over a
 *  distance, recession velocity, the age a distance implies, mass density in a volume, the change in the scale factor,
 *  the particle horizon, the curvature parameter, and how the CMB temperature scales with redshift. Crosses to `gravity` —
 *  cosmology is gravity at the scale of the whole. A measure. */

const PROOF = 'cosmology arithmetic (Hubble rate, recession, age, density, expansion, horizon, curvature, CMB temperature); the universe at scale; a measure crossed to gravity'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cosmology', dst: 'gravity', formula, value, proof: PROOF, ...extra }, holds, { name: `cosmology.${name}`, params })

export class CosmologyFormulas {
  /** HUBBLE RATE: velocity over distance (H0 proxy). value ⌊velocity / distance⌋. */
  static hubble(velocity: number, distance: number): CrossFormula { return c('cosmology-hubble', 'hubble(velocity, distance) = ⌊velocity / distance⌋', distance > 0 ? Math.floor(velocity / distance) : 0, nat(velocity, distance) && distance > 0, 'hubble', [velocity, distance]) }
  /** RECESSION VELOCITY: v = H0 · d. value constant · distance. */
  static recession(constant: number, distance: number): CrossFormula { return c('cosmology-recession', 'recession(constant, distance) = constant · distance', constant * distance, nat(constant, distance), 'recession', [constant, distance]) }
  /** AGE a distance implies at a rate. value ⌊distance / constant⌋. */
  static age(distance: number, constant: number): CrossFormula { return c('cosmology-age', 'age(distance, constant) = ⌊distance / constant⌋', constant > 0 ? Math.floor(distance / constant) : 0, nat(distance, constant) && constant > 0, 'age', [distance, constant]) }
  /** DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('cosmology-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** EXPANSION: the change in the scale factor. value max(0, now − then). */
  static expansion(now: number, then: number): CrossFormula { return c('cosmology-expansion', 'expansion(now, then) = max(0, now − then)', Math.max(0, now - then), nat(now, then), 'expansion', [now, then]) }
  /** PARTICLE HORIZON: speed over an age. value speed · age_. */
  static horizon(speed: number, age_: number): CrossFormula { return c('cosmology-horizon', 'horizon(speed, age_) = speed · age_', speed * age_, nat(speed, age_), 'horizon', [speed, age_]) }
  /** CURVATURE: density against critical (Omega · 1000). value ⌊density · 1000 / critical⌋. */
  static curvature(density: number, critical: number): CrossFormula { return c('cosmology-curvature', 'curvature(density, critical) = ⌊density · 1000 / critical⌋', critical > 0 ? Math.floor((density * 1000) / critical) : 0, nat(density, critical) && critical > 0, 'curvature', [density, critical]) }
  /** CMB TEMPERATURE scaling with redshift. value current · (redshift + 1). */
  static temperature(redshift: number, current: number): CrossFormula { return c('cosmology-temperature', 'temperature(redshift, current) = current · (redshift + 1)', current * (redshift + 1), nat(redshift, current), 'temperature', [redshift, current]) }
}

for (const name of ['age', 'curvature', 'density', 'expansion', 'horizon', 'hubble', 'recession', 'temperature'] as const)
  hexRegisterOf('cosmology', name, (CosmologyFormulas[name] as (...x: unknown[]) => unknown).bind(CosmologyFormulas))
