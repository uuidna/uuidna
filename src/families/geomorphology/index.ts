import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a landscape is numbers: the slope of a hillside, how much
 *  ground erosion carries off, the streams draining an area, the relief between peak and valley, the sediment a basin lays
 *  down each year, how a channel winds, how deep a river cuts, and how far rock has weathered. Crosses to `geology` — the
 *  surface is what the rock beneath becomes. A measure. */

const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief, sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `geomorphology.${name}`, params })

export class GeomorphologyFormulas {
  /** SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. */
  static slope(rise: number, run: number): CrossFormula { return c('geomorphology-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) }
  /** EROSION: ground lost per unit area. value ⌊lost / area⌋. */
  static erosion(lost: number, area: number): CrossFormula { return c('geomorphology-erosion', 'erosion(lost, area) = ⌊lost / area⌋', area > 0 ? Math.floor(lost / area) : 0, nat(lost, area) && area > 0, 'erosion', [lost, area]) }
  /** DRAINAGE DENSITY: streams per unit area. value ⌊streams / area⌋. */
  static drainage(streams: number, area: number): CrossFormula { return c('geomorphology-drainage', 'drainage(streams, area) = ⌊streams / area⌋', area > 0 ? Math.floor(streams / area) : 0, nat(streams, area) && area > 0, 'drainage', [streams, area]) }
  /** RELIEF: the height between peak and valley. value max(0, peak − valley). */
  static relief(peak: number, valley: number): CrossFormula { return c('geomorphology-relief', 'relief(peak, valley) = max(0, peak − valley)', Math.max(0, peak - valley), nat(peak, valley), 'relief', [peak, valley]) }
  /** SEDIMENT: deposited material per year. value ⌊deposited / years⌋. */
  static sediment(deposited: number, years: number): CrossFormula { return c('geomorphology-sediment', 'sediment(deposited, years) = ⌊deposited / years⌋', years > 0 ? Math.floor(deposited / years) : 0, nat(deposited, years) && years > 0, 'sediment', [deposited, years]) }
  /** SINUOSITY: channel length over valley length, as a ratio. value ⌊channel · 100 / valley⌋. */
  static sinuosity(channel: number, valley: number): CrossFormula { return c('geomorphology-sinuosity', 'sinuosity(channel, valley) = ⌊channel · 100 / valley⌋', valley > 0 ? Math.floor((channel * 100) / valley) : 0, nat(channel, valley) && valley > 0, 'sinuosity', [channel, valley]) }
  /** INCISION: depth cut over channel width. value ⌊depth · 100 / width⌋. */
  static incision(depth: number, width: number): CrossFormula { return c('geomorphology-incision', 'incision(depth, width) = ⌊depth · 100 / width⌋', width > 0 ? Math.floor((depth * 100) / width) : 0, nat(depth, width) && width > 0, 'incision', [depth, width]) }
  /** WEATHERING: rock weathered of the surface exposed, as a percent. value ⌊weathered · 100 / exposed⌋. */
  static weathering(weathered: number, exposed: number): CrossFormula { return c('geomorphology-weathering', 'weathering(weathered, exposed) = ⌊weathered · 100 / exposed⌋', exposed > 0 ? Math.floor((weathered * 100) / exposed) : 0, nat(weathered, exposed) && exposed > 0 && weathered <= exposed, 'weathering', [weathered, exposed]) }
}

for (const name of ['drainage', 'erosion', 'incision', 'relief', 'sediment', 'sinuosity', 'slope', 'weathering'] as const)
  hexRegisterOf('geomorphology', name, (GeomorphologyFormulas[name] as (...x: unknown[]) => unknown).bind(GeomorphologyFormulas))
