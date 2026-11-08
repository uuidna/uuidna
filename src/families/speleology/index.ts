import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SPELEOLOGY — CAVE SCIENCE, AS ARITHMETIC. A cave is numbers: how deep it goes, how far its passages run, how long a
 *  speleothem takes to grow, how much rock dissolved, how much of it has been surveyed, the gradient of a passage, the
 *  humidity of its air, and how many chambers it holds. Crosses to `geology` — a cave is rock measured. A measure. */

const PROOF = 'speleology arithmetic (depth, passage length, speleothem growth, dissolution, survey coverage, gradient, humidity, chambers); cave science as a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'speleology', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `speleology.${name}`, params })

export class SpeleologyFormulas {
  /** DEPTH: how far below the entrance, in meters. value meters. */
  static depth(meters: number): CrossFormula { return c('speleology-depth', 'depth(meters) = meters', meters, nat(meters), 'depth', [meters]) }
  /** PASSAGE EXTENT: passages at a length each. value passages · segments. */
  static extent(passages: number, segments: number): CrossFormula { return c('speleology-extent', 'extent(passages, segments) = passages · segments', passages * segments, nat(passages, segments), 'extent', [passages, segments]) }
  /** SPELEOTHEM GROWTH TIME: height at a growth rate. value ⌊height / rate⌋. */
  static speleothem(height: number, rate: number): CrossFormula { return c('speleology-speleothem', 'speleothem(height, rate) = ⌊height / rate⌋', rate > 0 ? Math.floor(height / rate) : 0, nat(height, rate) && rate > 0, 'speleothem', [height, rate]) }
  /** DISSOLUTION as a percentage of exposed rock removed. value ⌊removed · 100 / exposed⌋. */
  static dissolution(removed: number, exposed: number): CrossFormula { return c('speleology-dissolution', 'dissolution(removed, exposed) = ⌊removed · 100 / exposed⌋', exposed > 0 ? Math.floor((removed * 100) / exposed) : 0, nat(removed, exposed) && exposed > 0 && removed <= exposed, 'dissolution', [removed, exposed]) }
  /** SURVEY COVERAGE as a percentage. value ⌊measured · 100 / total⌋. */
  static survey(measured: number, total: number): CrossFormula { return c('speleology-survey', 'survey(measured, total) = ⌊measured · 100 / total⌋', total > 0 ? Math.floor((measured * 100) / total) : 0, nat(measured, total) && total > 0 && measured <= total, 'survey', [measured, total]) }
  /** GRADIENT: drop over distance, as a percentage. value ⌊drop · 100 / distance⌋. */
  static gradient(drop: number, distance: number): CrossFormula { return c('speleology-gradient', 'gradient(drop, distance) = ⌊drop · 100 / distance⌋', distance > 0 ? Math.floor((drop * 100) / distance) : 0, nat(drop, distance) && distance > 0, 'gradient', [drop, distance]) }
  /** HUMIDITY of cave air as a percentage. value ⌊vapor · 100 / capacity⌋. */
  static humidity(vapor: number, capacity: number): CrossFormula { return c('speleology-humidity', 'humidity(vapor, capacity) = ⌊vapor · 100 / capacity⌋', capacity > 0 ? Math.floor((vapor * 100) / capacity) : 0, nat(vapor, capacity) && capacity > 0 && vapor <= capacity, 'humidity', [vapor, capacity]) }
  /** CHAMBERS: how many rooms the cave holds. value count. */
  static chambers(count: number): CrossFormula { return c('speleology-chambers', 'chambers(count) = count', count, nat(count), 'chambers', [count]) }
}

for (const name of ['chambers', 'depth', 'dissolution', 'extent', 'gradient', 'humidity', 'speleothem', 'survey'] as const)
  hexRegisterOf('speleology', name, (SpeleologyFormulas[name] as (...x: unknown[]) => unknown).bind(SpeleologyFormulas))
