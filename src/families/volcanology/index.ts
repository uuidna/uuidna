import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VOLCANOLOGY — ERUPTIONS AS ARITHMETIC. The explosivity index, effusion rate, lava viscosity, ash loading, magma
 *  refill time, pyroclastic reach, excess gas, and repose interval. Crosses to `seismology` — a volcano is what the
 *  ground records. A measure. */

const PROOF = 'volcanology arithmetic (explosivity index, effusion rate, viscosity, ash load, magma refill, pyroclastic reach, excess gas, repose); a measure crossed to seismology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'volcanology', dst: 'seismology', formula, value, proof: PROOF, ...extra }, holds, { name: `volcanology.${name}`, params })

export class VolcanologyFormulas {
  /** EXPLOSIVITY INDEX proxy: the erupted volume. value volume. */
  static vei(volume: number): CrossFormula { return c('volcanology-vei', 'vei(volume) = volume', volume, nat(volume), 'vei', [volume]) }
  /** EFFUSION RATE: volume over the hours of eruption. value ⌊volume / hours⌋. */
  static effusion(volume: number, hours: number): CrossFormula { return c('volcanology-effusion', 'effusion(volume, hours) = ⌊volume / hours⌋', hours > 0 ? Math.floor(volume / hours) : 0, nat(volume, hours) && hours > 0, 'effusion', [volume, hours]) }
  /** LAVA VISCOSITY: silica fraction over temperature. value ⌊silica · 1000 / temperature⌋. */
  static viscosity(silica: number, temperature: number): CrossFormula { return c('volcanology-viscosity', 'viscosity(silica, temperature) = ⌊silica · 1000 / temperature⌋', temperature > 0 ? Math.floor((silica * 1000) / temperature) : 0, nat(silica, temperature) && temperature > 0, 'viscosity', [silica, temperature]) }
  /** ASH LOADING: mass over the area it falls on. value ⌊mass / area⌋. */
  static ash(mass: number, area: number): CrossFormula { return c('volcanology-ash', 'ash(mass, area) = ⌊mass / area⌋', area > 0 ? Math.floor(mass / area) : 0, nat(mass, area) && area > 0, 'ash', [mass, area]) }
  /** MAGMA REFILL TIME: chamber volume over the refill rate. value ⌊chamber / rate⌋. */
  static magma(chamber: number, rate: number): CrossFormula { return c('volcanology-magma', 'magma(chamber, rate) = ⌊chamber / rate⌋', rate > 0 ? Math.floor(chamber / rate) : 0, nat(chamber, rate) && rate > 0, 'magma', [chamber, rate]) }
  /** PYROCLASTIC REACH: distance scaled by slope. value distance · slope. */
  static pyroclastic(distance: number, slope: number): CrossFormula { return c('volcanology-pyroclastic', 'pyroclastic(distance, slope) = distance · slope', distance * slope, nat(distance, slope), 'pyroclastic', [distance, slope]) }
  /** EXCESS GAS: emitted above the baseline. value max(0, emitted − baseline). */
  static gas(emitted: number, baseline: number): CrossFormula { return c('volcanology-gas', 'gas(emitted, baseline) = max(0, emitted − baseline)', Math.max(0, emitted - baseline), nat(emitted, baseline), 'gas', [emitted, baseline]) }
  /** REPOSE INTERVAL: the years of quiet between eruptions. value years. */
  static repose(years: number): CrossFormula { return c('volcanology-repose', 'repose(years) = years', years, nat(years), 'repose', [years]) }
}

for (const name of ['ash', 'effusion', 'gas', 'magma', 'pyroclastic', 'repose', 'vei', 'viscosity'] as const)
  hexRegisterOf('volcanology', name, (VolcanologyFormulas[name] as (...x: unknown[]) => unknown).bind(VolcanologyFormulas))
