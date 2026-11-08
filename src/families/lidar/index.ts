import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LIDAR — LIGHT DETECTION AND RANGING, AS ARITHMETIC. A pulse of light goes out and comes back: the range is the round-trip
 *  time at the speed of light, halved. The point cloud is numbers — density over area, accuracy in ppm, how many pulses
 *  returned, how far the beam penetrated to the ground, the swath a scan sweeps, the ground sample spacing, the noise. Crosses
 *  to `geophysics` — lidar is how the Earth's surface is measured from above. A measure. */

const PROOF = 'lidar arithmetic (range by time-of-flight, point density, accuracy ppm, returns, ground penetration, swath, resolution, noise); light detection and ranging as a point cloud; a measure crossed to geophysics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lidar', dst: 'geophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `lidar.${name}`, params })

export class LidarFormulas {
  /** RANGE: time-of-flight, round trip halved. value ⌊speed · time / 2⌋. */
  static range(speed: number, time: number): CrossFormula { return c('lidar-range', 'range(speed, time) = ⌊speed · time / 2⌋', Math.floor((speed * time) / 2), nat(speed, time), 'range', [speed, time]) }
  /** POINT DENSITY: points over area. value ⌊points / area⌋. */
  static pointdensity(points: number, area: number): CrossFormula { return c('lidar-pointdensity', 'pointdensity(points, area) = ⌊points / area⌋', area > 0 ? Math.floor(points / area) : 0, nat(points, area) && area > 0, 'pointdensity', [points, area]) }
  /** ACCURACY in parts per million. value ⌊error · 10000 / range⌋. */
  static accuracy(error: number, range_: number): CrossFormula { return c('lidar-accuracy', 'accuracy(error, range) = ⌊error · 10000 / range⌋', range_ > 0 ? Math.floor((error * 10000) / range_) : 0, nat(error, range_) && range_ > 0, 'accuracy', [error, range_]) }
  /** RETURNS as a percentage of pulses. value ⌊detected · 100 / pulses⌋. */
  static returns(detected: number, pulses: number): CrossFormula { return c('lidar-returns', 'returns(detected, pulses) = ⌊detected · 100 / pulses⌋', pulses > 0 ? Math.floor((detected * 100) / pulses) : 0, nat(detected, pulses) && pulses > 0, 'returns', [detected, pulses]) }
  /** GROUND PENETRATION as a percentage of total returns. value ⌊ground · 100 / total⌋. */
  static penetration(ground: number, total: number): CrossFormula { return c('lidar-penetration', 'penetration(ground, total) = ⌊ground · 100 / total⌋', total > 0 ? Math.floor((ground * 100) / total) : 0, nat(ground, total) && total > 0 && ground <= total, 'penetration', [ground, total]) }
  /** SWATH: altitude at a scan angle. value altitude · angle. */
  static swath(altitude: number, angle: number): CrossFormula { return c('lidar-swath', 'swath(altitude, angle) = altitude · angle', altitude * angle, nat(altitude, angle), 'swath', [altitude, angle]) }
  /** RESOLUTION: the ground sample spacing itself. value spacing. */
  static resolution(spacing: number): CrossFormula { return c('lidar-resolution', 'resolution(spacing) = spacing', spacing, nat(spacing), 'resolution', [spacing]) }
  /** NOISE: outliers as a percentage of points. value ⌊outliers · 100 / points⌋. */
  static noise(outliers: number, points: number): CrossFormula { return c('lidar-noise', 'noise(outliers, points) = ⌊outliers · 100 / points⌋', points > 0 ? Math.floor((outliers * 100) / points) : 0, nat(outliers, points) && points > 0 && outliers <= points, 'noise', [outliers, points]) }
}

for (const name of ['accuracy', 'noise', 'penetration', 'pointdensity', 'range', 'resolution', 'returns', 'swath'] as const)
  hexRegisterOf('lidar', name, (LidarFormulas[name] as (...x: unknown[]) => unknown).bind(LidarFormulas))
