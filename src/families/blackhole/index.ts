import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BLACKHOLE — A BLACK HOLE AS ARITHMETIC (integer proxies, one measure per curvature fact). A black hole is numbers: the
 *  Schwarzschild radius a mass folds to, the Hawking temperature it glows at, the entropy on its horizon, the photon
 *  sphere light circles on, the innermost stable orbit matter holds, the tidal gradient that stretches, the time it takes
 *  to evaporate, and the rate it swallows matter. Crosses to `astrophysics` — a black hole is what astrophysics measures. */

const PROOF = 'blackhole arithmetic (schwarzschild radius, hawking temperature, horizon entropy, photon sphere, isco, tidal gradient, evaporation time, accretion rate); integer proxies, each a measure crossed to astrophysics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'blackhole', dst: 'astrophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `blackhole.${name}`, params })

export class BlackholeFormulas {
  /** SCHWARZSCHILD RADIUS: a mass folds to ~3 km per solar mass. value mass · 3. */
  static schwarzschildradius(mass: number): CrossFormula { return c('blackhole-schwarzschildradius', 'schwarzschildradius(mass) = mass · 3', mass * 3, nat(mass), 'schwarzschildradius', [mass]) }
  /** HAWKING TEMPERATURE: inversely proportional to mass (nanokelvin proxy). value ⌊620000 / mass⌋. */
  static hawkingtemp(mass: number): CrossFormula { return c('blackhole-hawkingtemp', 'hawkingtemp(mass) = ⌊620000 / mass⌋', mass > 0 ? Math.floor(620000 / mass) : 0, nat(mass) && mass > 0, 'hawkingtemp', [mass]) }
  /** HORIZON ENTROPY: area, so the square of the mass. value mass · mass. */
  static entropy(mass: number): CrossFormula { return c('blackhole-entropy', 'entropy(mass) = mass · mass', mass * mass, nat(mass), 'entropy', [mass]) }
  /** PHOTON SPHERE: 1.5× the Schwarzschild radius (rs = 3·mass). value ⌊9 · mass / 2⌋. */
  static photonsphere(mass: number): CrossFormula { return c('blackhole-photonsphere', 'photonsphere(mass) = ⌊9 · mass / 2⌋', Math.floor((9 * mass) / 2), nat(mass), 'photonsphere', [mass]) }
  /** ISCO: the innermost stable circular orbit, 3× the Schwarzschild radius. value mass · 9. */
  static isco(mass: number): CrossFormula { return c('blackhole-isco', 'isco(mass) = mass · 9', mass * 9, nat(mass), 'isco', [mass]) }
  /** TIDAL GRADIENT: ~2·mass over distance cubed. value ⌊2 · mass / distance³⌋. */
  static tidalforce(mass: number, distance: number): CrossFormula { return c('blackhole-tidalforce', 'tidalforce(mass, distance) = ⌊2 · mass / distance³⌋', distance > 0 ? Math.floor((2 * mass) / (distance * distance * distance)) : 0, nat(mass, distance) && distance > 0, 'tidalforce', [mass, distance]) }
  /** EVAPORATION TIME: proportional to the cube of the mass. value mass · mass · mass. */
  static evaporationtime(mass: number): CrossFormula { return c('blackhole-evaporationtime', 'evaporationtime(mass) = mass · mass · mass', mass * mass * mass, nat(mass), 'evaporationtime', [mass]) }
  /** ACCRETION RATE: matter swallowed over time. value ⌊matter / time⌋. */
  static accretionrate(matter: number, time: number): CrossFormula { return c('blackhole-accretionrate', 'accretionrate(matter, time) = ⌊matter / time⌋', time > 0 ? Math.floor(matter / time) : 0, nat(matter, time) && time > 0, 'accretionrate', [matter, time]) }
}

for (const name of ['accretionrate', 'entropy', 'evaporationtime', 'hawkingtemp', 'isco', 'photonsphere', 'schwarzschildradius', 'tidalforce'] as const)
  hexRegisterOf('blackhole', name, (BlackholeFormulas[name] as (...x: unknown[]) => unknown).bind(BlackholeFormulas))
