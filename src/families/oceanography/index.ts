import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OCEANOGRAPHY — OCEAN SCIENCE, AS ARITHMETIC (chosen by the public-API registry, not by hand). The sea is numbers:
 *  pressure with depth, salinity, density, the tide's range, a current's speed, the thermocline's drop, a wave's run, and
 *  upwelling intensity. Crosses to `environment` — the ocean is a measure the environment reads. A measure. */

const PROOF = 'oceanography arithmetic (pressure, salinity, density, tide, current, thermocline, wave, upwelling); ocean science as integers; a measure crossed to environment'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'oceanography', dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `oceanography.${name}`, params })

export class OceanographyFormulas {
  /** PRESSURE: roughly one bar per ten metres of depth. value ⌊depth / 10⌋. */
  static pressure(depth: number): CrossFormula { return c('oceanography-pressure', 'pressure(depth) = ⌊depth / 10⌋', Math.floor(depth / 10), nat(depth), 'pressure', [depth]) }
  /** SALINITY: dissolved salt per thousand parts of water (PSU/ppt). value ⌊salt · 1000 / water⌋. */
  static salinity(salt: number, water: number): CrossFormula { return c('oceanography-salinity', 'salinity(salt, water) = ⌊salt · 1000 / water⌋', water > 0 ? Math.floor((salt * 1000) / water) : 0, nat(salt, water) && water > 0, 'salinity', [salt, water]) }
  /** DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('oceanography-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** TIDE: the range between high and low water. value max(0, high − low). */
  static tide(high: number, low: number): CrossFormula { return c('oceanography-tide', 'tide(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low), 'tide', [high, low]) }
  /** CURRENT: distance over time. value ⌊distance / time⌋. */
  static current(distance: number, time: number): CrossFormula { return c('oceanography-current', 'current(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'current', [distance, time]) }
  /** THERMOCLINE: the drop from surface to deep temperature. value max(0, surface − deep). */
  static thermocline(surface: number, deep: number): CrossFormula { return c('oceanography-thermocline', 'thermocline(surface, deep) = max(0, surface − deep)', Math.max(0, surface - deep), nat(surface, deep), 'thermocline', [surface, deep]) }
  /** WAVE: a wave's run from height and period. value ⌊height · period / 2⌋. */
  static wave(height: number, period: number): CrossFormula { return c('oceanography-wave', 'wave(height, period) = ⌊height · period / 2⌋', Math.floor((height * period) / 2), nat(height, period), 'wave', [height, period]) }
  /** UPWELLING: flux over area. value ⌊flux / area⌋. */
  static upwelling(flux: number, area: number): CrossFormula { return c('oceanography-upwelling', 'upwelling(flux, area) = ⌊flux / area⌋', area > 0 ? Math.floor(flux / area) : 0, nat(flux, area) && area > 0, 'upwelling', [flux, area]) }
}

for (const name of ['current', 'density', 'pressure', 'salinity', 'thermocline', 'tide', 'upwelling', 'wave'] as const)
  hexRegisterOf('oceanography', name, (OceanographyFormulas[name] as (...x: unknown[]) => unknown).bind(OceanographyFormulas))
