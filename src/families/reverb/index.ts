import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REVERB — A ROOM'S TAIL, AS ARITHMETIC. The sound after the sound is numbers: the Sabine decay of a volume against its
 *  absorption, the first reflection off a wall, the time to fall by a level, the gap before the tail, how scattered it is,
 *  how the highs are damped against the lows, the fundamental room mode, and the wet share of the mix. Crosses to
 *  `acoustics` — reverb is the acoustics of an enclosed space. A measure. */

const PROOF = 'reverb arithmetic (Sabine rt60, early reflections, decay time, pre-delay, diffusion, damping ratio, room modes, wet/dry mix); a measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'reverb', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `reverb.${name}`, params })

export class ReverbFormulas {
  /** RT60: the Sabine proxy — seconds·10 for a volume against its total absorption. value ⌊161 · volume / (100 · absorption)⌋. */
  static rt60(volume: number, absorption: number): CrossFormula { return c('reverb-rt60', 'rt60(volume, absorption) = ⌊161 · volume / (100 · absorption)⌋', absorption > 0 ? Math.floor((161 * volume) / (100 * absorption)) : 0, nat(volume, absorption) && absorption > 0, 'rt60', [volume, absorption]) }
  /** EARLY REFLECTIONS: the first reflection delay off a wall, in ms. value ⌊1000 · distance / speed⌋. */
  static earlyreflections(distance: number, speed: number): CrossFormula { return c('reverb-earlyreflections', 'earlyreflections(distance, speed) = ⌊1000 · distance / speed⌋', speed > 0 ? Math.floor((1000 * distance) / speed) : 0, nat(distance, speed) && speed > 0, 'earlyreflections', [distance, speed]) }
  /** DECAY TIME: time to fall by a level given rt60 is the 60 dB time. value ⌊rt60 · level / 60⌋. */
  static decaytime(rt60: number, level: number): CrossFormula { return c('reverb-decaytime', 'decaytime(rt60, level) = ⌊rt60 · level / 60⌋', Math.floor((rt60 * level) / 60), nat(rt60, level) && level <= 60, 'decaytime', [rt60, level]) }
  /** PRE-DELAY: the gap before the tail, from the extra path a reflection travels, in ms. value ⌊1000 · (reflect − direct) / speed⌋. */
  static predelay(reflect: number, direct: number, speed: number): CrossFormula { return c('reverb-predelay', 'predelay(reflect, direct, speed) = ⌊1000 · max(0, reflect − direct) / speed⌋', speed > 0 ? Math.floor((1000 * Math.max(0, reflect - direct)) / speed) : 0, nat(reflect, direct, speed) && speed > 0, 'predelay', [reflect, direct, speed]) }
  /** DIFFUSION: the scattered share of the total energy, as a percentage. value ⌊scattered · 100 / total⌋. */
  static diffusion(scattered: number, total: number): CrossFormula { return c('reverb-diffusion', 'diffusion(scattered, total) = ⌊scattered · 100 / total⌋', total > 0 ? Math.floor((scattered * 100) / total) : 0, nat(scattered, total) && total > 0 && scattered <= total, 'diffusion', [scattered, total]) }
  /** DAMPING RATIO: high-frequency absorption against low, as a percentage. value ⌊high · 100 / low⌋. */
  static dampingratio(high: number, low: number): CrossFormula { return c('reverb-dampingratio', 'dampingratio(high, low) = ⌊high · 100 / low⌋', low > 0 ? Math.floor((high * 100) / low) : 0, nat(high, low) && low > 0, 'dampingratio', [high, low]) }
  /** ROOM MODES: the fundamental standing-wave frequency of a dimension. value ⌊speed / (2 · length)⌋. */
  static roommodes(speed: number, length: number): CrossFormula { return c('reverb-roommodes', 'roommodes(speed, length) = ⌊speed / (2 · length)⌋', length > 0 ? Math.floor(speed / (2 * length)) : 0, nat(speed, length) && length > 0, 'roommodes', [speed, length]) }
  /** WET/DRY MIX: the wet share of the total, as a percentage. value ⌊wet · 100 / (wet + dry)⌋. */
  static wetdrymix(wet: number, dry: number): CrossFormula { return c('reverb-wetdrymix', 'wetdrymix(wet, dry) = ⌊wet · 100 / (wet + dry)⌋', wet + dry > 0 ? Math.floor((wet * 100) / (wet + dry)) : 0, nat(wet, dry) && wet + dry > 0, 'wetdrymix', [wet, dry]) }
}

for (const name of ['dampingratio', 'decaytime', 'diffusion', 'earlyreflections', 'predelay', 'roommodes', 'rt60', 'wetdrymix'] as const)
  hexRegisterOf('reverb', name, (ReverbFormulas[name] as (...x: unknown[]) => unknown).bind(ReverbFormulas))
