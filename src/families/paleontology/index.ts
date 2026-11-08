import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PALEONTOLOGY — THE FOSSIL RECORD, AS ARITHMETIC. Deep time is numbers: elapsed age by half-lives, the carbon that
 *  remains after decay, how complete a skeleton is, species diversity per sample, a stratum's depositional age, an
 *  extinction's toll, reconstructed size, and specimen abundance per area. Crosses to `geology` — the rock that holds
 *  the record. A measure. */

const PROOF = 'paleontology arithmetic (radiometric age, carbon decay, skeletal completeness, diversity, stratigraphy, extinction toll, body size, abundance); the fossil record as integers; a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'paleontology', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `paleontology.${name}`, params })

export class PaleontologyFormulas {
  /** RADIOMETRIC AGE: elapsed time as half-lives at a half-life length. value halflives · halflife. */
  static age(halflives: number, halflife: number): CrossFormula { return c('paleontology-age', 'age(halflives, halflife) = halflives · halflife', halflives * halflife, nat(halflives, halflife), 'age', [halflives, halflife]) }
  /** CARBON DECAY: the isotope remaining after whole half-lives. value ⌊initial / 2^halflives⌋. */
  static decay(initial: number, halflives: number): CrossFormula { return c('paleontology-decay', 'decay(initial, halflives) = ⌊initial / 2^halflives⌋', halflives >= 0 ? Math.floor(initial / (2 ** halflives)) : 0, nat(initial, halflives), 'decay', [initial, halflives]) }
  /** SKELETAL COMPLETENESS as a percentage. value ⌊found · 100 / expected⌋. */
  static completeness(found: number, expected: number): CrossFormula { return c('paleontology-completeness', 'completeness(found, expected) = ⌊found · 100 / expected⌋', expected > 0 ? Math.floor((found * 100) / expected) : 0, nat(found, expected) && expected > 0 && found <= expected, 'completeness', [found, expected]) }
  /** DIVERSITY: species over samples. value ⌊species / samples⌋. */
  static diversity(species: number, samples: number): CrossFormula { return c('paleontology-diversity', 'diversity(species, samples) = ⌊species / samples⌋', samples > 0 ? Math.floor(species / samples) : 0, nat(species, samples) && samples > 0, 'diversity', [species, samples]) }
  /** STRATUM: depositional age from depth at a sedimentation rate. value ⌊depth / rate⌋. */
  static stratum(depth: number, rate: number): CrossFormula { return c('paleontology-stratum', 'stratum(depth, rate) = ⌊depth / rate⌋', rate > 0 ? Math.floor(depth / rate) : 0, nat(depth, rate) && rate > 0, 'stratum', [depth, rate]) }
  /** EXTINCTION TOLL as a percentage. value ⌊lost · 100 / total⌋. */
  static extinction(lost: number, total: number): CrossFormula { return c('paleontology-extinction', 'extinction(lost, total) = ⌊lost · 100 / total⌋', total > 0 ? Math.floor((lost * 100) / total) : 0, nat(lost, total) && total > 0 && lost <= total, 'extinction', [lost, total]) }
  /** BODY SIZE: reconstructed length at a scale factor. value length · scale. */
  static size(length: number, scale: number): CrossFormula { return c('paleontology-size', 'size(length, scale) = length · scale', length * scale, nat(length, scale), 'size', [length, scale]) }
  /** ABUNDANCE: specimens over area. value ⌊specimens / area⌋. */
  static abundance(specimens: number, area: number): CrossFormula { return c('paleontology-abundance', 'abundance(specimens, area) = ⌊specimens / area⌋', area > 0 ? Math.floor(specimens / area) : 0, nat(specimens, area) && area > 0, 'abundance', [specimens, area]) }
}

for (const name of ['abundance', 'age', 'completeness', 'decay', 'diversity', 'extinction', 'size', 'stratum'] as const)
  hexRegisterOf('paleontology', name, (PaleontologyFormulas[name] as (...x: unknown[]) => unknown).bind(PaleontologyFormulas))
