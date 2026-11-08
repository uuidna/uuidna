import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STELLAR — THE PHYSICS OF A STAR, AS ARITHMETIC (integer proxies, no floats). A star is numbers: how long it burns on the
 *  main sequence, how bright it is for its mass, the Schwarzschild radius of its remnant, the gravity at its surface, the
 *  temperature its colour implies, the rate of fusion in its core, the mass its wind carries off, and the spectral class its
 *  temperature sorts it into. Crosses to `astrophysics` — stellar quantities are what astrophysics measures. A measure. */

const PROOF = 'stellar arithmetic (main-sequence lifetime, mass-luminosity, Schwarzschild radius, surface gravity, effective temperature, core fusion rate, mass loss, spectral class); integer proxies of stellar structure; a measure crossed to astrophysics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'stellar', dst: 'astrophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `stellar.${name}`, params })

export class StellarFormulas {
  /** MAIN-SEQUENCE LIFETIME: ∝ mass / luminosity, in megayears (the Sun's ~10⁴ Myr at unit mass and luminosity). value ⌊mass · 10000 / lum⌋. */
  static mainsequencelifetime(mass: number, lum: number): CrossFormula { return c('stellar-mainsequencelifetime', 'mainsequencelifetime(mass, lum) = ⌊mass · 10000 / lum⌋', lum > 0 ? Math.floor((mass * 10000) / lum) : 0, nat(mass, lum) && lum > 0, 'mainsequencelifetime', [mass, lum]) }
  /** MASS-LUMINOSITY: luminosity rises with the cube of the mass (integer proxy for L ∝ M^3.5). value mass³. */
  static masslunminosity(mass: number): CrossFormula { return c('stellar-masslunminosity', 'masslunminosity(mass) = mass³', mass * mass * mass, nat(mass), 'masslunminosity', [mass]) }
  /** SCHWARZSCHILD RADIUS: ~3 km per solar mass. value mass · 3. */
  static schwarzschildradius(mass: number): CrossFormula { return c('stellar-schwarzschildradius', 'schwarzschildradius(mass) = mass · 3', mass * 3, nat(mass), 'schwarzschildradius', [mass]) }
  /** SURFACE GRAVITY: ∝ mass / radius² (scaled by 1000). value ⌊mass · 1000 / radius²⌋. */
  static surfacegravity(mass: number, radius: number): CrossFormula { return c('stellar-surfacegravity', 'surfacegravity(mass, radius) = ⌊mass · 1000 / radius²⌋', radius > 0 ? Math.floor((mass * 1000) / (radius * radius)) : 0, nat(mass, radius) && radius > 0, 'surfacegravity', [mass, radius]) }
  /** EFFECTIVE TEMPERATURE: Wien's law, the colour's peak wavelength in nm against 2898000 nm·K. value ⌊2898000 / wavelength⌋. */
  static effectivetemp(wavelength: number): CrossFormula { return c('stellar-effectivetemp', 'effectivetemp(wavelength) = ⌊2898000 / wavelength⌋', wavelength > 0 ? Math.floor(2898000 / wavelength) : 0, nat(wavelength) && wavelength > 0, 'effectivetemp', [wavelength]) }
  /** CORE FUSION RATE: mass available at the core temperature. value mass · temp. */
  static corefusionrate(mass: number, temp: number): CrossFormula { return c('stellar-corefusionrate', 'corefusionrate(mass, temp) = mass · temp', mass * temp, nat(mass, temp), 'corefusionrate', [mass, temp]) }
  /** MASS LOSS: the mass left after a wind carries off rate per year. value max(0, initial − rate · years). */
  static massloss(initial: number, rate: number, years: number): CrossFormula { return c('stellar-massloss', 'massloss(initial, rate, years) = max(0, initial − rate · years)', Math.max(0, initial - rate * years), nat(initial, rate, years), 'massloss', [initial, rate, years]) }
  /** SPECTRAL CLASS: the temperature sorted into a class index (thousands of kelvin). value ⌊temp / 1000⌋. */
  static spectralclass(temp: number): CrossFormula { return c('stellar-spectralclass', 'spectralclass(temp) = ⌊temp / 1000⌋', Math.floor(temp / 1000), nat(temp), 'spectralclass', [temp]) }
}

for (const name of ['corefusionrate', 'effectivetemp', 'mainsequencelifetime', 'massloss', 'masslunminosity', 'schwarzschildradius', 'spectralclass', 'surfacegravity'] as const)
  hexRegisterOf('stellar', name, (StellarFormulas[name] as (...x: unknown[]) => unknown).bind(StellarFormulas))
