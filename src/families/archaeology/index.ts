import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ARCHAEOLOGY — DIGGING THE PAST, AS ARITHMETIC. The record is numbers: radiocarbon age from half-lives, the depth of
 *  stacked strata, how old a find is against a reference, finds per area, the span a seriation covers, the share of a
 *  typology matched, the days an excavation takes, and the decay a dating reads. Crosses to `cern` — the same decay the
 *  particle lab measures. A measure. */

const PROOF = 'archaeology arithmetic (radiocarbon age, stratum depth, find age, artifact density, seriation span, typology share, excavation days, radiometric dating); a measure crossed to cern'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'archaeology', dst: 'cern', formula, value, proof: PROOF, ...extra }, holds, { name: `archaeology.${name}`, params })

export class ArchaeologyFormulas {
  /** RADIOCARBON AGE: half-lives at the carbon-14 half-life. value ⌊5730 · halflives⌋ years. */
  static carbon(halflives: number): CrossFormula { return c('archaeology-carbon', 'carbon(halflives) = ⌊5730 · halflives⌋', Math.floor(5730 * halflives), nat(halflives), 'carbon', [halflives]) }
  /** STRATUM DEPTH: layers at a thickness each. value layers · each. */
  static stratum(layers: number, each: number): CrossFormula { return c('archaeology-stratum', 'stratum(layers, each) = layers · each', layers * each, nat(layers, each), 'stratum', [layers, each]) }
  /** FIND AGE: a found date against a reference. value max(0, reference − found). */
  static age(found: number, reference: number): CrossFormula { return c('archaeology-age', 'age(found, reference) = max(0, reference − found)', Math.max(0, reference - found), nat(found, reference), 'age', [found, reference]) }
  /** ARTIFACT DENSITY: finds over the area dug. value ⌊finds / area⌋. */
  static artifacts(finds: number, area: number): CrossFormula { return c('archaeology-artifacts', 'artifacts(finds, area) = ⌊finds / area⌋', area > 0 ? Math.floor(finds / area) : 0, nat(finds, area) && area > 0, 'artifacts', [finds, area]) }
  /** SERIATION SPAN: earliest to latest. value max(0, late − early). */
  static seriation(early: number, late: number): CrossFormula { return c('archaeology-seriation', 'seriation(early, late) = max(0, late − early)', Math.max(0, late - early), nat(early, late), 'seriation', [early, late]) }
  /** TYPOLOGY SHARE: matched of total, as a percentage. value ⌊matched · 100 / total⌋. */
  static typology(matched: number, total: number): CrossFormula { return c('archaeology-typology', 'typology(matched, total) = ⌊matched · 100 / total⌋', total > 0 ? Math.floor((matched * 100) / total) : 0, nat(matched, total) && total > 0 && matched <= total, 'typology', [matched, total]) }
  /** EXCAVATION DAYS: volume at a per-day rate. value ⌊volume / rate⌋. */
  static excavation(volume: number, rate: number): CrossFormula { return c('archaeology-excavation', 'excavation(volume, rate) = ⌊volume / rate⌋', rate > 0 ? Math.floor(volume / rate) : 0, nat(volume, rate) && rate > 0, 'excavation', [volume, rate]) }
  /** RADIOMETRIC DATING: decayed of original, as a percentage. value ⌊decayed · 100 / original⌋. */
  static dating(decayed: number, original: number): CrossFormula { return c('archaeology-dating', 'dating(decayed, original) = ⌊decayed · 100 / original⌋', original > 0 ? Math.floor((decayed * 100) / original) : 0, nat(decayed, original) && original > 0 && decayed <= original, 'dating', [decayed, original]) }
}

for (const name of ['age', 'artifacts', 'carbon', 'dating', 'excavation', 'seriation', 'stratum', 'typology'] as const)
  hexRegisterOf('archaeology', name, (ArchaeologyFormulas[name] as (...x: unknown[]) => unknown).bind(ArchaeologyFormulas))
