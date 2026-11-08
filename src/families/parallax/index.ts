import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PARALLAX — THE GEOMETRY OF DISTANCE, AS ARITHMETIC. A nearby star shifts against the far background as the Earth
 *  swings across its orbit, and that shift is a measured angle. The numbers follow: distance from the parallax angle,
 *  the angle from a baseline, the baseline itself, proper motion, arcseconds, parsecs, tangential velocity, and the
 *  error budget of a measurement. Crosses to `astronomy` — parallax is the first rung of the cosmic distance ladder. */

const PROOF = 'parallax arithmetic (distance from parallax, angle from baseline, baseline, proper motion, arcseconds, parsecs, tangential velocity, error budget); the first rung of the distance ladder; a measure crossed to astronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'parallax', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `parallax.${name}`, params })

export class ParallaxFormulas {
  /** PARALLAX ANGLE: the apparent shift of a baseline seen at a distance. value ⌊baseline / distance⌋. */
  static angle(baseline: number, distance: number): CrossFormula { return c('parallax-angle', 'angle(baseline, distance) = ⌊baseline / distance⌋', distance > 0 ? Math.floor(baseline / distance) : 0, nat(baseline, distance) && distance > 0, 'angle', [baseline, distance]) }
  /** ARCSECONDS in a span of degrees. value degrees · 3600. */
  static arcseconds(degrees: number): CrossFormula { return c('parallax-arcseconds', 'arcseconds(degrees) = degrees · 3600', degrees * 3600, nat(degrees), 'arcseconds', [degrees]) }
  /** BASELINE: the observing baseline is the diameter of the orbit, twice its radius. value radius · 2. */
  static baseline(radius: number): CrossFormula { return c('parallax-baseline', 'baseline(radius) = radius · 2', radius * 2, nat(radius), 'baseline', [radius]) }
  /** DISTANCE in parsecs from a parallax of p milliarcseconds. value ⌊1000000 / parallaxmas⌋. */
  static distance(parallaxmas: number): CrossFormula { return c('parallax-distance', 'distance(parallaxmas) = ⌊1000000 / parallaxmas⌋', parallaxmas > 0 ? Math.floor(1000000 / parallaxmas) : 0, nat(parallaxmas) && parallaxmas > 0, 'distance', [parallaxmas]) }
  /** ERROR BUDGET: the total error shared out over the measurements. value ⌊total / sources⌋. */
  static errorbudget(total: number, sources: number): CrossFormula { return c('parallax-errorbudget', 'errorbudget(total, sources) = ⌊total / sources⌋', sources > 0 ? Math.floor(total / sources) : 0, nat(total, sources) && sources > 0, 'errorbudget', [total, sources]) }
  /** PARSECS from a distance in light-years (1 pc = 3.26 ly). value ⌊lightyears · 100 / 326⌋. */
  static parsecs(lightyears: number): CrossFormula { return c('parallax-parsecs', 'parsecs(lightyears) = ⌊lightyears · 100 / 326⌋', Math.floor((lightyears * 100) / 326), nat(lightyears), 'parsecs', [lightyears]) }
  /** PROPER MOTION: angular displacement over the years it took. value ⌊delta / years⌋. */
  static propermotion(delta: number, years: number): CrossFormula { return c('parallax-propermotion', 'propermotion(delta, years) = ⌊delta / years⌋', years > 0 ? Math.floor(delta / years) : 0, nat(delta, years) && years > 0, 'propermotion', [delta, years]) }
  /** TANGENTIAL VELOCITY from proper motion and distance (Vt = 4.74 · μ · d). value ⌊mu · distance · 474 / 100⌋. */
  static tangentialvelocity(mu: number, distance: number): CrossFormula { return c('parallax-tangentialvelocity', 'tangentialvelocity(mu, distance) = ⌊mu · distance · 474 / 100⌋', Math.floor((mu * distance * 474) / 100), nat(mu, distance), 'tangentialvelocity', [mu, distance]) }
}

for (const name of ['angle', 'arcseconds', 'baseline', 'distance', 'errorbudget', 'parsecs', 'propermotion', 'tangentialvelocity'] as const)
  hexRegisterOf('parallax', name, (ParallaxFormulas[name] as (...x: unknown[]) => unknown).bind(ParallaxFormulas))
