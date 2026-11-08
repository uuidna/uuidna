import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REDSHIFT — THE LIGHT OF RECEDING GALAXIES, AS ARITHMETIC. A spectral line arrives stretched: the shift z, the recession
 *  velocity it implies, the Hubble distance, the wavelength stretch, the lookback time, the cosmic scale factor, the Doppler
 *  reading, and the comoving distance. Crosses to `cosmology` — redshift is what cosmology reads off the sky. A measure. */

const PROOF = 'redshift arithmetic (shift z, recession velocity, Hubble distance, wavelength shift, lookback time, scale factor, Doppler z, comoving distance); a measure crossed to cosmology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'redshift', dst: 'cosmology', formula, value, proof: PROOF, ...extra }, holds, { name: `redshift.${name}`, params })

export class RedshiftFormulas {
  /** SHIFT z (×1000): the fractional stretch of a line. value ⌊(observed − emitted) · 1000 / emitted⌋. */
  static z(observed: number, emitted: number): CrossFormula { return c('redshift-z', 'z(observed, emitted) = ⌊max(0, observed − emitted) · 1000 / emitted⌋', emitted > 0 ? Math.floor((Math.max(0, observed - emitted) * 1000) / emitted) : 0, nat(observed, emitted) && emitted > 0, 'z', [observed, emitted]) }
  /** RECESSION VELOCITY: v ≈ c·z, with z given ×1000. value ⌊z · c / 1000⌋. */
  static recessionvelocity(z: number, c_: number): CrossFormula { return c('redshift-recessionvelocity', 'recessionvelocity(z, c) = ⌊z · c / 1000⌋', Math.floor((z * c_) / 1000), nat(z, c_), 'recessionvelocity', [z, c_]) }
  /** HUBBLE DISTANCE: d = v / H₀. value ⌊velocity / hubble⌋. */
  static hubbledistance(velocity: number, hubble: number): CrossFormula { return c('redshift-hubbledistance', 'hubbledistance(velocity, hubble) = ⌊velocity / hubble⌋', hubble > 0 ? Math.floor(velocity / hubble) : 0, nat(velocity, hubble) && hubble > 0, 'hubbledistance', [velocity, hubble]) }
  /** WAVELENGTH SHIFT: Δλ = λ · z, with z given ×1000. value ⌊emitted · z / 1000⌋. */
  static wavelengthshift(emitted: number, z: number): CrossFormula { return c('redshift-wavelengthshift', 'wavelengthshift(emitted, z) = ⌊emitted · z / 1000⌋', Math.floor((emitted * z) / 1000), nat(emitted, z), 'wavelengthshift', [emitted, z]) }
  /** LOOKBACK TIME: t = d / c. value ⌊distance / speed⌋. */
  static lookbacktime(distance: number, speed: number): CrossFormula { return c('redshift-lookbacktime', 'lookbacktime(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'lookbacktime', [distance, speed]) }
  /** SCALE FACTOR (×1000): a = 1 / (1 + z), with z given ×1000. value ⌊1000000 / (1000 + z)⌋. */
  static scalefactor(z: number): CrossFormula { return c('redshift-scalefactor', 'scalefactor(z) = ⌊1000000 / (1000 + z)⌋', (1000 + z) > 0 ? Math.floor(1000000 / (1000 + z)) : 0, nat(z), 'scalefactor', [z]) }
  /** DOPPLER z (×1000): z = v / c from a velocity reading. value ⌊velocity · 1000 / c⌋. */
  static dopplerz(velocity: number, c_: number): CrossFormula { return c('redshift-dopplerz', 'dopplerz(velocity, c) = ⌊velocity · 1000 / c⌋', c_ > 0 ? Math.floor((velocity * 1000) / c_) : 0, nat(velocity, c_) && c_ > 0, 'dopplerz', [velocity, c_]) }
  /** COMOVING DISTANCE: Dc ≈ (c / H₀) · z, with z given ×1000. value ⌊z · hubbledist / 1000⌋. */
  static comovingdistance(z: number, hubbledist: number): CrossFormula { return c('redshift-comovingdistance', 'comovingdistance(z, hubbledist) = ⌊z · hubbledist / 1000⌋', Math.floor((z * hubbledist) / 1000), nat(z, hubbledist), 'comovingdistance', [z, hubbledist]) }
}

for (const name of ['comovingdistance', 'dopplerz', 'hubbledistance', 'lookbacktime', 'recessionvelocity', 'scalefactor', 'wavelengthshift', 'z'] as const)
  hexRegisterOf('redshift', name, (RedshiftFormulas[name] as (...x: unknown[]) => unknown).bind(RedshiftFormulas))
