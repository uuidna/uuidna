import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TIDES — THE RISE AND FALL OF THE SEA, AS ARITHMETIC. A tide is numbers: the range between high and low water, the
 *  spring tide when sun and moon pull together, the neap tide when they pull apart, the period of a cycle, the amplitude
 *  of the swing, the mean sea level, the flow rate through a channel, and a harmonic constituent. Crosses to
 *  `oceanography` — tides are what oceanography measures. A measure. */

const PROOF = 'tides arithmetic (range, spring tide, neap tide, period, amplitude, mean sea level, flow rate, harmonic constituent); the rise and fall of the sea as integers; a measure crossed to oceanography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tides', dst: 'oceanography', formula, value, proof: PROOF, ...extra }, holds, { name: `tides.${name}`, params })

export class TidesFormulas {
  /** AMPLITUDE: half of a tidal range. value ⌊range / 2⌋. */
  static amplitude(range: number): CrossFormula { return c('tides-amplitude', 'amplitude(range) = ⌊range / 2⌋', Math.floor(range / 2), nat(range), 'amplitude', [range]) }
  /** FLOW RATE: a volume through a channel over time. value ⌊volume / time⌋. */
  static flowrate(volume: number, time: number): CrossFormula { return c('tides-flowrate', 'flowrate(volume, time) = ⌊volume / time⌋', time > 0 ? Math.floor(volume / time) : 0, nat(volume, time) && time > 0, 'flowrate', [volume, time]) }
  /** HARMONIC: a constituent is an amplitude taken a number of times. value amplitude · number. */
  static harmonic(amplitude: number, number: number): CrossFormula { return c('tides-harmonic', 'harmonic(amplitude, number) = amplitude · number', amplitude * number, nat(amplitude, number), 'harmonic', [amplitude, number]) }
  /** MEAN SEA LEVEL: the midpoint of high and low water. value ⌊(high + low) / 2⌋. */
  static meanlevel(high: number, low: number): CrossFormula { return c('tides-meanlevel', 'meanlevel(high, low) = ⌊(high + low) / 2⌋', Math.floor((high + low) / 2), nat(high, low) && high >= low, 'meanlevel', [high, low]) }
  /** NEAP TIDE: sun and moon at right angles; the lunar pull less the solar. value max(0, lunar − solar). */
  static neaptide(lunar: number, solar: number): CrossFormula { return c('tides-neaptide', 'neaptide(lunar, solar) = max(0, lunar − solar)', Math.max(0, lunar - solar), nat(lunar, solar), 'neaptide', [lunar, solar]) }
  /** PERIOD: the hours in a cycle over the number of cycles. value ⌊hours / cycles⌋. */
  static period(hours: number, cycles: number): CrossFormula { return c('tides-period', 'period(hours, cycles) = ⌊hours / cycles⌋', cycles > 0 ? Math.floor(hours / cycles) : 0, nat(hours, cycles) && cycles > 0, 'period', [hours, cycles]) }
  /** RANGE: high water less low water. value max(0, high − low). */
  static range(high: number, low: number): CrossFormula { return c('tides-range', 'range(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low), 'range', [high, low]) }
  /** SPRING TIDE: sun and moon aligned; the pulls add. value solar + lunar. */
  static springtide(solar: number, lunar: number): CrossFormula { return c('tides-springtide', 'springtide(solar, lunar) = solar + lunar', solar + lunar, nat(solar, lunar), 'springtide', [solar, lunar]) }
}

for (const name of ['amplitude', 'flowrate', 'harmonic', 'meanlevel', 'neaptide', 'period', 'range', 'springtide'] as const)
  hexRegisterOf('tides', name, (TidesFormulas[name] as (...x: unknown[]) => unknown).bind(TidesFormulas))
