import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ORBITAL — KEPLERIAN MECHANICS AS ARITHMETIC (chosen by the public-API registry, not by hand). A closed orbit is numbers:
 *  the period a body takes, its farthest and nearest points, how oval it is, the mean radius, how fast it moves, the tilt of
 *  its plane, and the burn budget to change it. Integer proxies only (no sqrt, no ln). Crosses to `astronomy` — an orbit is
 *  what astronomy measures. A measure. */

const PROOF = 'orbital arithmetic (period, apoapsis, periapsis, eccentricity, semimajor, velocity, inclination, delta-v); Keplerian mechanics as integer proxies; a measure crossed to astronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'orbital', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `orbital.${name}`, params })

export class OrbitalFormulas {
  /** PERIOD: time once around, path over speed (perimeter proxy 6·radius for 2πr). value ⌊6 · radius / speed⌋. */
  static period(radius: number, speed: number): CrossFormula { return c('orbital-period', 'period(radius, speed) = ⌊6 · radius / speed⌋', speed > 0 ? Math.floor((6 * radius) / speed) : 0, nat(radius, speed) && speed > 0, 'period', [radius, speed]) }
  /** APOAPSIS: farthest point, mean radius plus focal distance. value semimajor + focal. */
  static apoapsis(semimajor: number, focal: number): CrossFormula { return c('orbital-apoapsis', 'apoapsis(semimajor, focal) = semimajor + focal', semimajor + focal, nat(semimajor, focal), 'apoapsis', [semimajor, focal]) }
  /** PERIAPSIS: nearest point, mean radius minus focal distance. value max(0, semimajor − focal). */
  static periapsis(semimajor: number, focal: number): CrossFormula { return c('orbital-periapsis', 'periapsis(semimajor, focal) = max(0, semimajor − focal)', Math.max(0, semimajor - focal), nat(semimajor, focal), 'periapsis', [semimajor, focal]) }
  /** ECCENTRICITY: how oval, focal over mean radius scaled by 1000. value ⌊focal · 1000 / semimajor⌋. */
  static eccentricity(focal: number, semimajor: number): CrossFormula { return c('orbital-eccentricity', 'eccentricity(focal, semimajor) = ⌊focal · 1000 / semimajor⌋', semimajor > 0 ? Math.floor((focal * 1000) / semimajor) : 0, nat(focal, semimajor) && semimajor > 0, 'eccentricity', [focal, semimajor]) }
  /** SEMIMAJOR: mean radius, half of apoapsis and periapsis. value ⌊(apoapsis + periapsis) / 2⌋. */
  static semimajor(apoapsis: number, periapsis: number): CrossFormula { return c('orbital-semimajor', 'semimajor(apoapsis, periapsis) = ⌊(apoapsis + periapsis) / 2⌋', Math.floor((apoapsis + periapsis) / 2), nat(apoapsis, periapsis), 'semimajor', [apoapsis, periapsis]) }
  /** VELOCITY: speed along the path, distance over time. value ⌊distance / time⌋. */
  static velocity(distance: number, time: number): CrossFormula { return c('orbital-velocity', 'velocity(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'velocity', [distance, time]) }
  /** INCLINATION: plane tilt in degrees, rise over run scaled to a quarter turn. value ⌊rise · 90 / run⌋. */
  static inclination(rise: number, run: number): CrossFormula { return c('orbital-inclination', 'inclination(rise, run) = ⌊rise · 90 / run⌋', run > 0 ? Math.floor((rise * 90) / run) : 0, nat(rise, run) && run > 0, 'inclination', [rise, run]) }
  /** DELTA-V: the burn budget, two burns summed (a Hohmann transfer). value burn1 + burn2. */
  static deltav(burn1: number, burn2: number): CrossFormula { return c('orbital-deltav', 'deltav(burn1, burn2) = burn1 + burn2', burn1 + burn2, nat(burn1, burn2), 'deltav', [burn1, burn2]) }
}

for (const name of ['apoapsis', 'deltav', 'eccentricity', 'inclination', 'periapsis', 'period', 'semimajor', 'velocity'] as const)
  hexRegisterOf('orbital', name, (OrbitalFormulas[name] as (...x: unknown[]) => unknown).bind(OrbitalFormulas))
