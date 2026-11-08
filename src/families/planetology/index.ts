import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PLANETOLOGY — THE PHYSICS OF A WORLD, AS ARITHMETIC (integer proxies, no sqrt). What a planet is is numbers: surface
 *  gravity, escape speed, bulk density, how much light it throws back, the sunlight it catches, the tidal limit a moon
 *  survives, the sphere it holds against its star, and its equilibrium temperature. Crosses to `astronomy` — a world is
 *  what astronomy observes. A measure. */

const PROOF = 'planetology arithmetic (surface gravity, escape speed, density, albedo, insolation, Roche limit, Hill sphere, equilibrium temperature); integer proxies, no sqrt; a measure crossed to astronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'planetology', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `planetology.${name}`, params })

export class PlanetologyFormulas {
  /** SURFACE GRAVITY: mass over radius squared. value ⌊mass / radius²⌋. */
  static gravity(mass: number, radius: number): CrossFormula { return c('planetology-gravity', 'gravity(mass, radius) = ⌊mass / radius²⌋', radius > 0 ? Math.floor(mass / (radius * radius)) : 0, nat(mass, radius) && radius > 0, 'gravity', [mass, radius]) }
  /** ESCAPE SPEED proxy: mass over radius. value ⌊mass / radius⌋. */
  static escapevelocity(mass: number, radius: number): CrossFormula { return c('planetology-escapevelocity', 'escapevelocity(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0, 'escapevelocity', [mass, radius]) }
  /** BULK DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('planetology-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** ALBEDO as a percentage: light thrown back over light caught. value ⌊reflected · 100 / incident⌋. */
  static albedo(reflected: number, incident: number): CrossFormula { return c('planetology-albedo', 'albedo(reflected, incident) = ⌊reflected · 100 / incident⌋', incident > 0 ? Math.floor((reflected * 100) / incident) : 0, nat(reflected, incident) && incident > 0 && reflected <= incident, 'albedo', [reflected, incident]) }
  /** INSOLATION: stellar luminosity over distance squared. value ⌊luminosity / distance²⌋. */
  static insolation(luminosity: number, distance: number): CrossFormula { return c('planetology-insolation', 'insolation(luminosity, distance) = ⌊luminosity / distance²⌋', distance > 0 ? Math.floor(luminosity / (distance * distance)) : 0, nat(luminosity, distance) && distance > 0, 'insolation', [luminosity, distance]) }
  /** ROCHE LIMIT proxy: the body radius scaled by the density ratio. value radius · ratio. */
  static roche(radius: number, ratio: number): CrossFormula { return c('planetology-roche', 'roche(radius, ratio) = radius · ratio', radius * ratio, nat(radius, ratio), 'roche', [radius, ratio]) }
  /** HILL SPHERE proxy: orbital distance over the mass ratio. value ⌊distance / ratio⌋. */
  static hillsphere(distance: number, ratio: number): CrossFormula { return c('planetology-hillsphere', 'hillsphere(distance, ratio) = ⌊distance / ratio⌋', ratio > 0 ? Math.floor(distance / ratio) : 0, nat(distance, ratio) && ratio > 0, 'hillsphere', [distance, ratio]) }
  /** EQUILIBRIUM TEMPERATURE proxy: the flux absorbed after albedo. value ⌊flux · (100 − albedo) / 100⌋. */
  static equilibrium(flux: number, albedo: number): CrossFormula { return c('planetology-equilibrium', 'equilibrium(flux, albedo) = ⌊flux · (100 − albedo) / 100⌋', Math.floor((flux * Math.max(0, 100 - albedo)) / 100), nat(flux, albedo) && albedo <= 100, 'equilibrium', [flux, albedo]) }
}

for (const name of ['albedo', 'density', 'equilibrium', 'escapevelocity', 'gravity', 'hillsphere', 'insolation', 'roche'] as const)
  hexRegisterOf('planetology', name, (PlanetologyFormulas[name] as (...x: unknown[]) => unknown).bind(PlanetologyFormulas))
