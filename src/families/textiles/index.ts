import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TEXTILES — CLOTH AS ARITHMETIC. Weaving and fabric are numbers: threads per inch, weight per area, how hard a cloth
 *  pulls before it tears, how far it stretches, the count of a yarn, how much it shrinks in the wash, how closely the
 *  weave covers, and how it drapes. Crosses to `materials` — textiles are what materials are made into. A measure. */

const PROOF = 'textiles arithmetic (thread count, GSM weight, tensile, elongation, yarn count, shrinkage, coverage, drape); cloth as a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'textiles', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `textiles.${name}`, params })

export class TextilesFormulas {
  /** THREAD COUNT: warp plus weft threads per inch. value warp + weft. */
  static threadcount(warp: number, weft: number): CrossFormula { return c('textiles-threadcount', 'threadcount(warp, weft) = warp + weft', warp + weft, nat(warp, weft), 'threadcount', [warp, weft]) }
  /** GSM: grams of mass over the area it covers. value ⌊mass / area⌋. */
  static gsm(mass: number, area: number): CrossFormula { return c('textiles-gsm', 'gsm(mass, area) = ⌊mass / area⌋', area > 0 ? Math.floor(mass / area) : 0, nat(mass, area) && area > 0, 'gsm', [mass, area]) }
  /** TENSILE strength: breaking force over the width that bore it. value ⌊force / width⌋. */
  static tensile(force: number, width: number): CrossFormula { return c('textiles-tensile', 'tensile(force, width) = ⌊force / width⌋', width > 0 ? Math.floor(force / width) : 0, nat(force, width) && width > 0, 'tensile', [force, width]) }
  /** ELONGATION as a percentage: how far it stretched past its original length. value ⌊(stretched − original) · 100 / original⌋. */
  static elongation(stretched: number, original: number): CrossFormula { return c('textiles-elongation', 'elongation(stretched, original) = ⌊(stretched − original) · 100 / original⌋', original > 0 ? Math.floor(((stretched - original) * 100) / original) : 0, nat(stretched, original) && original > 0 && stretched >= original, 'elongation', [stretched, original]) }
  /** YARN count: length over weight, a count proxy. value ⌊length / weight⌋. */
  static yarn(length: number, weight: number): CrossFormula { return c('textiles-yarn', 'yarn(length, weight) = ⌊length / weight⌋', weight > 0 ? Math.floor(length / weight) : 0, nat(length, weight) && weight > 0, 'yarn', [length, weight]) }
  /** SHRINKAGE as a percentage: how much it lost in the wash. value ⌊(before − after) · 100 / before⌋. */
  static shrinkage(before: number, after: number): CrossFormula { return c('textiles-shrinkage', 'shrinkage(before, after) = ⌊(before − after) · 100 / before⌋', before > 0 ? Math.floor(((before - after) * 100) / before) : 0, nat(before, after) && before > 0 && after <= before, 'shrinkage', [before, after]) }
  /** COVERAGE as a percentage: yarn against the gaps it leaves. value ⌊yarns · 100 / (yarns + gaps)⌋. */
  static coverage(yarns: number, gaps: number): CrossFormula { return c('textiles-coverage', 'coverage(yarns, gaps) = ⌊yarns · 100 / (yarns + gaps)⌋', (yarns + gaps) > 0 ? Math.floor((yarns * 100) / (yarns + gaps)) : 0, nat(yarns, gaps) && (yarns + gaps) > 0, 'coverage', [yarns, gaps]) }
  /** DRAPE: how far it bends against its stiffness. value ⌊bending · 100 / stiffness⌋. */
  static drape(bending: number, stiffness: number): CrossFormula { return c('textiles-drape', 'drape(bending, stiffness) = ⌊bending · 100 / stiffness⌋', stiffness > 0 ? Math.floor((bending * 100) / stiffness) : 0, nat(bending, stiffness) && stiffness > 0, 'drape', [bending, stiffness]) }
}

for (const name of ['coverage', 'drape', 'elongation', 'gsm', 'shrinkage', 'tensile', 'threadcount', 'yarn'] as const)
  hexRegisterOf('textiles', name, (TextilesFormulas[name] as (...x: unknown[]) => unknown).bind(TextilesFormulas))
