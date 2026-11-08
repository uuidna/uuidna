import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THE PHYSICS TESLA'S PATENTS STATE, AS FORMULAS. The patents are the record (US 381,968 polyphase induction motor,
 *  1888; 593,138 the coil, 1897; 645,576 and 649,621 wireless transmission, 1900; 787,412 the art of transmitting
 *  energy through the natural media, 1905; 1,119,732 the magnifying transmitter, 1914); what they claim reduces to a
 *  few exact relations: a rotating field's synchronous speed from frequency and poles, a tuned circuit's resonance
 *  from inductance and capacitance, a coupled coil's voltage from its turns, a quarter wave from a frequency, and the
 *  Earth-ionosphere cavity's modes, which 787,412 reaches for and Schumann measured in 1952. Each is a function of
 *  naturals; the combinations are the ones the patents compose: phases × poles, turns × turns, frequency × length.
 *  The windings cross Qpu.Coil (the lattice's coil of coins × rays). Nothing numerological is here: 3, 6 and 9 are
 *  digits, not a theory. */

const C = 299792458 // m/s
const PROOF = 'US patents 381,968; 593,138; 645,576; 649,621; 787,412; 1,119,732 (Google Patents / USPTO); Schumann 1952'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'tesla', dst: 'physics', formula, value, proof: PROOF }, holds, { name: `tesla.${name}`, params })

export class TeslaFormulas {
  /** The synchronous speed of a rotating field: 120·f / p rpm (381,968: a two-phase field turns the rotor). */
  static sync(hz: number, poles: number): CrossFormula { return f('tesla-sync', 'n = 120 · f / p', poles > 0 ? Math.floor((120 * hz) / poles) : 0, nat(hz, poles) && poles > 0 && poles % 2 === 0, 'sync', [hz, poles]) }
  /** The slip of an induction rotor turning at r rpm in a field of n rpm, in thousandths. */
  static slip(fieldRpm: number, rotorRpm: number): CrossFormula { return f('tesla-slip', 's = (n − r) / n', fieldRpm > 0 ? Math.round(((fieldRpm - rotorRpm) / fieldRpm) * 1000) : 0, nat(fieldRpm, rotorRpm) && fieldRpm > 0 && rotorRpm <= fieldRpm, 'slip', [fieldRpm, rotorRpm]) }
  /** A tuned circuit's resonance from L in microhenry and C in picofarad, in kilohertz (593,138: primary and secondary tuned alike). */
  static resonance(uH: number, pF: number): CrossFormula { return f('tesla-resonance', 'f = 1 / (2π √(L C))', uH > 0 && pF > 0 ? Math.round(1 / (2 * Math.PI * Math.sqrt(uH * 1e-6 * pF * 1e-12)) / 1000) : 0, nat(uH, pF) && uH > 0 && pF > 0, 'resonance', [uH, pF]) }
  /** The windings' ratio of a coupled coil, secondary over primary, in thousandths: the voltage it steps up by (593,138). */
  static turns(primary: number, secondary: number): CrossFormula { return f('tesla-turns', 'V₂ / V₁ = N₂ / N₁', primary > 0 ? Math.round((secondary / primary) * 1000) : 0, nat(primary, secondary) && primary > 0, 'turns', [primary, secondary]) }
  /** The quarter wave of a frequency in kilohertz, in metres: the length a resonant secondary wants (645,576). */
  static quarter(khz: number): CrossFormula { return f('tesla-quarter', 'λ/4 = c / (4 f)', khz > 0 ? Math.round(C / (4 * khz * 1000)) : 0, nat(khz) && khz > 0, 'quarter', [khz]) }
  /** The n-th Schumann mode of the Earth-ionosphere cavity, in millihertz: 7.83 Hz · √(n(n + 1) / 2) (787,412 reaches for the Earth's own resonance; measured 1952). */
  static schumann(n: number): CrossFormula { return f('tesla-schumann', 'fₙ = 7.83 · √(n (n + 1) / 2) Hz', n > 0 ? Math.round(7830 * Math.sqrt((n * (n + 1)) / 2)) : 0, nat(n) && n > 0, 'schumann', [n]) }
  /** The wavelength around the Earth of the n-th mode: the circumference over n, in kilometres (40075 km around). */
  static earth(n: number): CrossFormula { return f('tesla-earth', 'λₙ = 40075 km / n', n > 0 ? Math.round(40075 / n) : 0, nat(n) && n > 0, 'earth', [n]) }
  /** The combinations of a polyphase system: p phases on q pole pairs, the distinct field positions p · q (381,968: two phases, 1888). */
  static field(phases: number, polePairs: number): CrossFormula { return f('tesla-field', 'positions = phases · pole pairs', phases * polePairs, nat(phases, polePairs) && phases >= 2 && polePairs >= 1, 'field', [phases, polePairs]) }
  /** The energy of a charged capacitance, C in picofarad at V volts, in microjoules (the primary's bank, 1,119,732). */
  static energy(pF: number, volts: number): CrossFormula { return f('tesla-energy', 'E = ½ C V²', Math.round(0.5 * pF * 1e-12 * volts * volts * 1e6), nat(pF, volts), 'energy', [pF, volts]) }
  /** The period of a resonance in kilohertz, in nanoseconds. */
  static period(khz: number): CrossFormula { return f('tesla-period', 'T = 1 / f', khz > 0 ? Math.round(1e6 / khz) : 0, nat(khz) && khz > 0, 'period', [khz]) }
  /** The windings a coil of the lattice holds: coins × rays turns, the cross with Qpu.Coil. */
  static windings(coins: number, rays: number): CrossFormula { return f('tesla-windings', 'turns = coins · rays', coins * rays, nat(coins, rays), 'windings', [coins, rays]) }
}

for (const name of ['earth', 'energy', 'field', 'period', 'quarter', 'resonance', 'schumann', 'slip', 'sync', 'turns', 'windings'] as const)
  hexRegisterOf('tesla', name, (TeslaFormulas[name] as (...x: unknown[]) => unknown).bind(TeslaFormulas))
