import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REVERBERATION — A ROOM'S TAIL, AS ARITHMETIC (chosen by the public-API registry, not by hand). A sound's decay is
 *  numbers: the Sabine time, the time from room and absorbers, the absorption area, the mean free path between surfaces,
 *  the critical distance, the decay rate in dB/s, the early-reflection delay, and the clarity ratio. Crosses to
 *  `acoustics` — reverberation is the room half of what acoustics measures. A measure. */

const PROOF = 'reverberation arithmetic (Sabine RT60, room RT60, absorption area, mean free path, critical distance, decay rate, early reflections, clarity); a room measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'reverberation', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `reverberation.${name}`, params })

export class ReverberationFormulas {
  /** SABINE RT60: reverberation time from volume over total absorption. value ⌊161 · volume / (1000 · absorption)⌋. */
  static sabine(volume: number, absorption: number): CrossFormula { return c('reverberation-sabine', 'sabine(volume, absorption) = ⌊161 · volume / (1000 · absorption)⌋', absorption > 0 ? Math.floor((161 * volume) / (1000 * absorption)) : 0, nat(volume, absorption) && absorption > 0, 'sabine', [volume, absorption]) }
  /** ROOM RT60: reverberation time from volume, surface area and absorption coefficient. value ⌊161 · volume / (1000 · area · coeff)⌋. */
  static rt60(volume: number, area: number, coeff: number): CrossFormula { return c('reverberation-rt60', 'rt60(volume, area, coeff) = ⌊161 · volume / (1000 · area · coeff)⌋', area > 0 && coeff > 0 ? Math.floor((161 * volume) / (1000 * area * coeff)) : 0, nat(volume, area, coeff) && area > 0 && coeff > 0, 'rt60', [volume, area, coeff]) }
  /** ABSORPTION AREA: total sabins from surface area and a percent coefficient. value ⌊area · coeff / 100⌋. */
  static absorptionarea(area: number, coeff: number): CrossFormula { return c('reverberation-absorptionarea', 'absorptionarea(area, coeff) = ⌊area · coeff / 100⌋', Math.floor((area * coeff) / 100), nat(area, coeff), 'absorptionarea', [area, coeff]) }
  /** MEAN FREE PATH: average distance between surface hits. value ⌊4 · volume / surface⌋. */
  static meanfreepath(volume: number, surface: number): CrossFormula { return c('reverberation-meanfreepath', 'meanfreepath(volume, surface) = ⌊4 · volume / surface⌋', surface > 0 ? Math.floor((4 * volume) / surface) : 0, nat(volume, surface) && surface > 0, 'meanfreepath', [volume, surface]) }
  /** CRITICAL DISTANCE: where direct and reverberant fields meet, from absorption and directivity. value ⌊absorption · directivity / 50⌋. */
  static criticaldistance(absorption: number, directivity: number): CrossFormula { return c('reverberation-criticaldistance', 'criticaldistance(absorption, directivity) = ⌊absorption · directivity / 50⌋', Math.floor((absorption * directivity) / 50), nat(absorption, directivity), 'criticaldistance', [absorption, directivity]) }
  /** DECAY RATE: dB lost per second over the measured time. value ⌊level / time⌋. */
  static decayrate(level: number, time: number): CrossFormula { return c('reverberation-decayrate', 'decayrate(level, time) = ⌊level / time⌋', time > 0 ? Math.floor(level / time) : 0, nat(level, time) && time > 0, 'decayrate', [level, time]) }
  /** EARLY REFLECTIONS: the first-reflection delay in milliseconds, from path length and speed. value ⌊1000 · distance / speed⌋. */
  static earlyreflections(distance: number, speed: number): CrossFormula { return c('reverberation-earlyreflections', 'earlyreflections(distance, speed) = ⌊1000 · distance / speed⌋', speed > 0 ? Math.floor((1000 * distance) / speed) : 0, nat(distance, speed) && speed > 0, 'earlyreflections', [distance, speed]) }
  /** CLARITY: the early-to-late energy ratio, ten times over. value ⌊10 · early / late⌋. */
  static clarity(early: number, late: number): CrossFormula { return c('reverberation-clarity', 'clarity(early, late) = ⌊10 · early / late⌋', late > 0 ? Math.floor((10 * early) / late) : 0, nat(early, late) && late > 0, 'clarity', [early, late]) }
}

for (const name of ['absorptionarea', 'clarity', 'criticaldistance', 'decayrate', 'earlyreflections', 'meanfreepath', 'rt60', 'sabine'] as const)
  hexRegisterOf('reverberation', name, (ReverberationFormulas[name] as (...x: unknown[]) => unknown).bind(ReverberationFormulas))
