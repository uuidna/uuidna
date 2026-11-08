import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ASTROPHYSICS — THE SKY, AS ARITHMETIC (chosen by the public-API registry, not by hand). A star's reach is numbers:
 *  its Schwarzschild radius by mass, the Chandrasekhar fraction, surface luminosity, the redshift of a line, the Jeans
 *  balance of a cloud, the Eddington limit, the tidal pull at a distance, and the nuclear timescale. Crosses to
 *  `gravity` — the sky is what gravity shapes. A measure. */

const PROOF = 'astrophysics arithmetic (Schwarzschild radius, Chandrasekhar fraction, luminosity, redshift, Jeans balance, Eddington limit, tidal pull, nuclear timescale); a measure crossed to gravity'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'astrophysics', dst: 'gravity', formula, value, proof: PROOF, ...extra }, holds, { name: `astrophysics.${name}`, params })

export class AstrophysicsFormulas {
  /** SCHWARZSCHILD RADIUS: km per solar mass (~2.95, rounded to 3). value mass · 3. */
  static schwarzschild(mass: number): CrossFormula { return c('astrophysics-schwarzschild', 'schwarzschild(mass) = mass · 3', mass * 3, nat(mass), 'schwarzschild', [mass]) }
  /** CHANDRASEKHAR: the fraction of the 1.44 solar-mass limit, ×100. value ⌊mass · 100 / 144⌋. */
  static chandrasekhar(mass: number): CrossFormula { return c('astrophysics-chandrasekhar', 'chandrasekhar(mass) = ⌊mass · 100 / 144⌋', mass > 0 ? Math.floor((mass * 100) / 144) : 0, nat(mass) && mass > 0, 'chandrasekhar', [mass]) }
  /** LUMINOSITY: surface area by temperature. value radius² · temp. */
  static luminosity(radius: number, temp: number): CrossFormula { return c('astrophysics-luminosity', 'luminosity(radius, temp) = radius² · temp', radius * radius * temp, nat(radius, temp), 'luminosity', [radius, temp]) }
  /** REDSHIFT: z of a line, ×1000. value ⌊(observed − emitted) · 1000 / emitted⌋. */
  static redshift(observed: number, emitted: number): CrossFormula { return c('astrophysics-redshift', 'redshift(observed, emitted) = ⌊(observed − emitted) · 1000 / emitted⌋', emitted > 0 ? Math.floor(((observed - emitted) * 1000) / emitted) : 0, nat(observed, emitted) && emitted > 0 && observed >= emitted, 'redshift', [observed, emitted]) }
  /** JEANS: the temperature-density balance of a cloud. value ⌊temperature / density⌋. */
  static jeans(temperature: number, density: number): CrossFormula { return c('astrophysics-jeans', 'jeans(temperature, density) = ⌊temperature / density⌋', density > 0 ? Math.floor(temperature / density) : 0, nat(temperature, density) && density > 0, 'jeans', [temperature, density]) }
  /** EDDINGTON: the luminosity limit proxy by mass. value mass · 33000. */
  static eddington(mass: number): CrossFormula { return c('astrophysics-eddington', 'eddington(mass) = mass · 33000', mass * 33000, nat(mass), 'eddington', [mass]) }
  /** TIDAL: the pull at a distance (inverse cube). value ⌊mass / distance³⌋. */
  static tidal(mass: number, distance: number): CrossFormula { return c('astrophysics-tidal', 'tidal(mass, distance) = ⌊mass / distance³⌋', distance > 0 ? Math.floor(mass / (distance * distance * distance)) : 0, nat(mass, distance) && distance > 0, 'tidal', [mass, distance]) }
  /** TIMESCALE: the nuclear timescale, mass over luminosity. value ⌊mass · 10000 / luminosity⌋. */
  static timescale(mass: number, luminosity_: number): CrossFormula { return c('astrophysics-timescale', 'timescale(mass, luminosity) = ⌊mass · 10000 / luminosity⌋', luminosity_ > 0 ? Math.floor((mass * 10000) / luminosity_) : 0, nat(mass, luminosity_) && luminosity_ > 0, 'timescale', [mass, luminosity_]) }
}

for (const name of ['chandrasekhar', 'eddington', 'jeans', 'luminosity', 'redshift', 'schwarzschild', 'tidal', 'timescale'] as const)
  hexRegisterOf('astrophysics', name, (AstrophysicsFormulas[name] as (...x: unknown[]) => unknown).bind(AstrophysicsFormulas))
