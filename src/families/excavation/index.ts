import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EXCAVATION — EARTHWORK AS ARITHMETIC (chosen by the registry, not by hand). Moving ground is numbers: the volume of a
 *  pit, the cut above grade and the fill still needed below it, how bank soil swells loose and compacts back down, the
 *  truckloads to haul it away, the horizontal run of a side slope, and the benches a deep face is cut into. Crosses to
 *  `civil` — excavation is the earthwork a civil design sits on. A measure. */

const PROOF = 'excavation arithmetic (pit volume, cut, fill, swell, compaction, haul loads, slope run, benches); earthwork a civil design sits on; a measure crossed to civil'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'excavation', dst: 'civil', formula, value, proof: PROOF, ...extra }, holds, { name: `excavation.${name}`, params })

export class ExcavationFormulas {
  /** PIT VOLUME: length by width by depth. value length · width · depth. */
  static volume(length: number, width: number, depth: number): CrossFormula { return c('excavation-volume', 'volume(length, width, depth) = length · width · depth', length * width * depth, nat(length, width, depth), 'volume', [length, width, depth]) }
  /** CUT: the spoil removed above grade, an area at a depth. value area · depth. */
  static cut(area: number, depth: number): CrossFormula { return c('excavation-cut', 'cut(area, depth) = area · depth', area * depth, nat(area, depth), 'cut', [area, depth]) }
  /** FILL: the volume still needed below grade after what is already placed. value max(0, required − placed). */
  static fill(required: number, placed: number): CrossFormula { return c('excavation-fill', 'fill(required, placed) = max(0, required − placed)', Math.max(0, required - placed), nat(required, placed), 'fill', [required, placed]) }
  /** SWELL: bank soil loosens when dug, growing by a percent. value ⌊bank · (100 + pct) / 100⌋. */
  static swell(bank: number, pct: number): CrossFormula { return c('excavation-swell', 'swell(bank, pct) = ⌊bank · (100 + pct) / 100⌋', Math.floor((bank * (100 + pct)) / 100), nat(bank, pct), 'swell', [bank, pct]) }
  /** COMPACTION: loose soil settles back when compacted, shrinking by a percent. value ⌊loose · (100 − pct) / 100⌋. */
  static compaction(loose: number, pct: number): CrossFormula { return c('excavation-compaction', 'compaction(loose, pct) = ⌊loose · (100 − pct) / 100⌋', Math.floor((loose * Math.max(0, 100 - pct)) / 100), nat(loose, pct) && pct <= 100, 'compaction', [loose, pct]) }
  /** HAUL: the truckloads to carry a volume off at a per-load capacity. value ⌈volume / capacity⌉. */
  static haul(volume: number, capacity: number): CrossFormula { return c('excavation-haul', 'haul(volume, capacity) = ⌈volume / capacity⌉', capacity > 0 ? Math.ceil(volume / capacity) : 0, nat(volume, capacity) && capacity > 0, 'haul', [volume, capacity]) }
  /** SLOPE: the horizontal run of a side slope at a height and an H:V ratio. value height · ratio. */
  static slope(height: number, ratio: number): CrossFormula { return c('excavation-slope', 'slope(height, ratio) = height · ratio', height * ratio, nat(height, ratio), 'slope', [height, ratio]) }
  /** BENCH: the benches a deep face is cut into at a per-bench height. value ⌈height / perBench⌉. */
  static bench(height: number, perBench: number): CrossFormula { return c('excavation-bench', 'bench(height, perBench) = ⌈height / perBench⌉', perBench > 0 ? Math.ceil(height / perBench) : 0, nat(height, perBench) && perBench > 0, 'bench', [height, perBench]) }
}

for (const name of ['bench', 'compaction', 'cut', 'fill', 'haul', 'slope', 'swell', 'volume'] as const)
  hexRegisterOf('excavation', name, (ExcavationFormulas[name] as (...x: unknown[]) => unknown).bind(ExcavationFormulas))
