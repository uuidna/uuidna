import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** PLASMA — THE FOURTH STATE OF MATTER, AS ARITHMETIC. An ionized gas is numbers: temperature per particle, number density
 *  in a volume, the Debye screening length, how long energy stays confined, the fraction ionized, the fusion gain Q, the
 *  magnetic beta, and the plasma frequency. Crosses to `energy` — plasma is energy held in a field. A measure. */

const PROOF = 'plasma arithmetic (temperature, density, Debye length, confinement, ionization, fusion Q, magnetic beta, plasma frequency); the fourth state of matter as numbers; a measure crossed to energy'
const HUE = 'a 64-bit simhash (Charikar; Manku, Jain, Sarma, WWW 2007: 8 bytes a page, Hamming ≤ 3 on 8 billion pages) painted on the wheel'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'plasma', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `plasma.${name}`, params })
const hueTo = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'plasma', dst: 'colortheory', formula, value, proof: HUE, ...extra }, holds, { name: `plasma.${name}`, params })

export class PlasmaFormulas {
  /** TEMPERATURE: energy shared over the particles. value ⌊energy / particles⌋. */
  static temperature(energy: number, particles: number): CrossFormula { return c('plasma-temperature', 'temperature(energy, particles) = ⌊energy / particles⌋', particles > 0 ? Math.floor(energy / particles) : 0, nat(energy, particles) && particles > 0, 'temperature', [energy, particles]) }
  /** NUMBER DENSITY: particles in a volume. value ⌊particles / volume⌋. */
  static density(particles: number, volume: number): CrossFormula { return c('plasma-density', 'density(particles, volume) = ⌊particles / volume⌋', volume > 0 ? Math.floor(particles / volume) : 0, nat(particles, volume) && volume > 0, 'density', [particles, volume]) }
  /** DEBYE screening: temperature over density. value ⌊temperature / density_⌋. */
  static debye(temperature: number, density_: number): CrossFormula { return c('plasma-debye', 'debye(temperature, density_) = ⌊temperature / density_⌋', density_ > 0 ? Math.floor(temperature / density_) : 0, nat(temperature, density_) && density_ > 0, 'debye', [temperature, density_]) }
  /** CONFINEMENT time: energy over its loss rate. value ⌊energy / loss⌋. */
  static confinement(energy: number, loss: number): CrossFormula { return c('plasma-confinement', 'confinement(energy, loss) = ⌊energy / loss⌋', loss > 0 ? Math.floor(energy / loss) : 0, nat(energy, loss) && loss > 0, 'confinement', [energy, loss]) }
  /** IONIZATION fraction as a percentage. value ⌊ionized · 100 / total⌋. */
  static ionization(ionized: number, total: number): CrossFormula { return c('plasma-ionization', 'ionization(ionized, total) = ⌊ionized · 100 / total⌋', total > 0 ? Math.floor((ionized * 100) / total) : 0, nat(ionized, total) && total > 0 && ionized <= total, 'ionization', [ionized, total]) }
  /** FUSION gain Q as a percentage. value ⌊output · 100 / input⌋. */
  static fusion(output: number, input: number): CrossFormula { return c('plasma-fusion', 'fusion(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0, 'fusion', [output, input]) }
  /** MAGNETIC beta proxy: pressure over field. value ⌊pressure / field⌋. */
  static magnetic(pressure: number, field: number): CrossFormula { return c('plasma-magnetic', 'magnetic(pressure, field) = ⌊pressure / field⌋', field > 0 ? Math.floor(pressure / field) : 0, nat(pressure, field) && field > 0, 'magnetic', [pressure, field]) }
  /** PLASMA FREQUENCY proxy: density times charge. value density_ · charge. */
  static frequency(density_: number, charge: number): CrossFormula { return c('plasma-frequency', 'frequency(density_, charge) = density_ · charge', density_ * charge, nat(density_, charge), 'frequency', [density_, charge]) }

  /** BYTES of a fingerprint: the minimum cost of one page. 64 bits is 8 bytes — the width that indexed 8 billion pages. */
  static bytes(bits: number): CrossFormula { return hueTo('plasma-bytes', 'bytes(bits) = ⌊bits / 8⌋', bits > 0 ? Math.floor(bits / 8) : 0, nat(bits) && bits > 0 && bits % 8 === 0, 'bytes', [bits], { bits }) }
  /** HUE of a Hamming distance on a fingerprint of `bits`: degrees around the wheel. Distance 0 sits at hue 0. */
  static hue(distance: number, bits: number): CrossFormula { return hueTo('plasma-hue', 'hue(distance, bits) = ⌊distance · 360 / bits⌋', bits > 0 ? Math.floor((distance * fullTurn) / bits) : 0, nat(distance, bits) && bits > 0 && distance <= bits, 'hue', [distance, bits]) }
  /** NEAR: 1 when two fingerprints differ in at most `k` bits. The web-scale choice is k = 3 on 64 bits. Holds only then. */
  static near(distance: number, k: number): CrossFormula { const ok = distance <= k; return hueTo('plasma-near', 'near(distance, k) = [distance ≤ k]', ok ? 1 : 0, nat(distance, k) && ok, 'near', [distance, k], { lead: true, note: 'a near public fingerprint is a lead; law.reviewed before any advice' }) }
}

for (const name of ['bytes', 'confinement', 'debye', 'density', 'frequency', 'fusion', 'hue', 'ionization', 'magnetic', 'near', 'temperature'] as const)
  hexRegisterOf('plasma', name, (PlasmaFormulas[name] as (...x: unknown[]) => unknown).bind(PlasmaFormulas))
