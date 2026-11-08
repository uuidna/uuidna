import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** ORBIT — A BODY AROUND A PRIMARY, AS ARITHMETIC. A trajectory is numbers: the period to come round, the semi-major
 *  axis of the ellipse, how eccentric it is, the far and near points, the speed along the path, the plane's tilt, and how
 *  far round it has swept. Crosses to `astronomy` — an orbit is what astronomy measures. A measure (integer proxies, no sqrt). */

const PROOF = 'orbit arithmetic (period, semi-major axis, eccentricity, apoapsis, periapsis, velocity, inclination, mean anomaly); a two-body trajectory as integers; a measure crossed to astronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'orbit', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `orbit.${name}`, params })

export class OrbitFormulas {
  /** PERIOD: the time to traverse the path at a speed. value ⌊circumference / velocity⌋. */
  static period(circumference: number, velocity: number): CrossFormula { return c('orbit-period', 'period(circumference, velocity) = ⌊circumference / velocity⌋', velocity > 0 ? Math.floor(circumference / velocity) : 0, nat(circumference, velocity) && velocity > 0, 'period', [circumference, velocity]) }
  /** SEMI-MAJOR AXIS: the mean of apoapsis and periapsis. value ⌊(apoapsis + periapsis) / 2⌋. */
  static semimajoraxis(apoapsis: number, periapsis: number): CrossFormula { return c('orbit-semimajoraxis', 'semimajoraxis(apoapsis, periapsis) = ⌊(apoapsis + periapsis) / 2⌋', Math.floor((apoapsis + periapsis) / 2), nat(apoapsis, periapsis), 'semimajoraxis', [apoapsis, periapsis]) }
  /** ECCENTRICITY as per-thousand. value ⌊(apoapsis − periapsis) · 1000 / (apoapsis + periapsis)⌋. */
  static eccentricity(apoapsis: number, periapsis: number): CrossFormula { return c('orbit-eccentricity', 'eccentricity(apoapsis, periapsis) = ⌊(apoapsis − periapsis) · 1000 / (apoapsis + periapsis)⌋', (apoapsis + periapsis) > 0 ? Math.floor((Math.max(0, apoapsis - periapsis) * 1000) / (apoapsis + periapsis)) : 0, nat(apoapsis, periapsis) && (apoapsis + periapsis) > 0 && periapsis <= apoapsis, 'eccentricity', [apoapsis, periapsis]) }
  /** APOAPSIS: the far point from semi-major axis and per-thousand eccentricity. value ⌊semimajor · (1000 + ecc) / 1000⌋. */
  static apoapsis(semimajor: number, ecc: number): CrossFormula { return c('orbit-apoapsis', 'apoapsis(semimajor, ecc) = ⌊semimajor · (1000 + ecc) / 1000⌋', Math.floor((semimajor * (1000 + ecc)) / 1000), nat(semimajor, ecc) && ecc <= 1000, 'apoapsis', [semimajor, ecc]) }
  /** PERIAPSIS: the near point from semi-major axis and per-thousand eccentricity. value ⌊semimajor · (1000 − ecc) / 1000⌋. */
  static periapsis(semimajor: number, ecc: number): CrossFormula { return c('orbit-periapsis', 'periapsis(semimajor, ecc) = ⌊semimajor · (1000 − ecc) / 1000⌋', Math.floor((semimajor * Math.max(0, 1000 - ecc)) / 1000), nat(semimajor, ecc) && ecc <= 1000, 'periapsis', [semimajor, ecc]) }
  /** VELOCITY: distance over the time taken. value ⌊distance / time⌋. */
  static velocity(distance: number, time: number): CrossFormula { return c('orbit-velocity', 'velocity(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'velocity', [distance, time]) }
  /** INCLINATION: the plane's tilt in degrees from rise over run. value ⌊rise · 90 / run⌋. */
  static inclination(rise: number, run: number): CrossFormula { return c('orbit-inclination', 'inclination(rise, run) = ⌊rise · 90 / run⌋', run > 0 ? Math.floor((rise * 90) / run) : 0, nat(rise, run) && run > 0, 'inclination', [rise, run]) }
  /** MEAN ANOMALY: the swept angle at a mean motion over time, modulo a full turn. value (motion · time) mod 360. */
  static meananomaly(motion: number, time: number): CrossFormula { return c('orbit-meananomaly', 'meananomaly(motion, time) = (motion · time) mod 360', (motion * time) % fullTurn, nat(motion, time), 'meananomaly', [motion, time]) }
}

for (const name of ['apoapsis', 'eccentricity', 'inclination', 'meananomaly', 'periapsis', 'period', 'semimajoraxis', 'velocity'] as const)
  hexRegisterOf('orbit', name, (OrbitFormulas[name] as (...x: unknown[]) => unknown).bind(OrbitFormulas))
