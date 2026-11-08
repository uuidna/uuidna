import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FLORICULTURE — GROWING CUT FLOWERS AND ORNAMENTALS, AS ARITHMETIC (chosen by the public-API registry, not by hand).
 *  Growing blooms is numbers: how fast buds open, stem length from the nodes, days a cut stem lasts in the vase, the crop a
 *  bed yields, the plants a bed holds, the saleable stems after culls, petals per flower, and whether the chill forces a
 *  bloom. Crosses to `botany` — floriculture is botany put to work. A measure. */

const PROOF = 'floriculture arithmetic (bloom rate, stem length, vase life, yield, spacing, grade-out, petal count, forcing); a registry domain uncovered; a measure crossed to botany'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'floriculture', dst: 'botany', formula, value, proof: PROOF, ...extra }, holds, { name: `floriculture.${name}`, params })

export class FloricultureFormulas {
  /** BLOOM RATE: buds that open per day. value ⌊blooms / days⌋. */
  static bloomrate(blooms: number, days: number): CrossFormula { return c('floriculture-bloomrate', 'bloomrate(blooms, days) = ⌊blooms / days⌋', days > 0 ? Math.floor(blooms / days) : 0, nat(blooms, days) && days > 0, 'bloomrate', [blooms, days]) }
  /** STEM LENGTH: nodes at an internode length each. value nodes · intern. */
  static stemlength(nodes: number, intern: number): CrossFormula { return c('floriculture-stemlength', 'stemlength(nodes, intern) = nodes · intern', nodes * intern, nat(nodes, intern), 'stemlength', [nodes, intern]) }
  /** VASE LIFE: base days a cut stem lasts, shortened by temperature. value max(0, base − temp). */
  static vaselife(base: number, temp: number): CrossFormula { return c('floriculture-vaselife', 'vaselife(base, temp) = max(0, base − temp)', Math.max(0, base - temp), nat(base, temp), 'vaselife', [base, temp]) }
  /** YIELD: plants at a stem count each. value plants · perplant. */
  static yield(plants: number, perplant: number): CrossFormula { return c('floriculture-yield', 'yield(plants, perplant) = plants · perplant', plants * perplant, nat(plants, perplant), 'yield', [plants, perplant]) }
  /** SPACING: the plants a bed holds at an area per plant. value ⌊area / perplant⌋. */
  static spacing(area: number, perplant: number): CrossFormula { return c('floriculture-spacing', 'spacing(area, perplant) = ⌊area / perplant⌋', perplant > 0 ? Math.floor(area / perplant) : 0, nat(area, perplant) && perplant > 0, 'spacing', [area, perplant]) }
  /** GRADE-OUT: saleable stems after the culls are pulled. value max(0, total − culls). */
  static gradeout(total: number, culls: number): CrossFormula { return c('floriculture-gradeout', 'gradeout(total, culls) = max(0, total − culls)', Math.max(0, total - culls), nat(total, culls) && culls <= total, 'gradeout', [total, culls]) }
  /** PETAL COUNT: petals from whorls at a count each. value whorls · per. */
  static petalcount(whorls: number, per: number): CrossFormula { return c('floriculture-petalcount', 'petalcount(whorls, per) = whorls · per', whorls * per, nat(whorls, per), 'petalcount', [whorls, per]) }
  /** FORCING: 1 when accumulated chill meets the required hours. value [heat ≥ required]. */
  static forcing(heat: number, required: number): CrossFormula { return c('floriculture-forcing', 'forcing(heat, required) = [heat ≥ required]', heat >= required ? 1 : 0, nat(heat, required), 'forcing', [heat, required]) }
}

for (const name of ['bloomrate', 'forcing', 'gradeout', 'petalcount', 'spacing', 'stemlength', 'vaselife', 'yield'] as const)
  hexRegisterOf('floriculture', name, (FloricultureFormulas[name] as (...x: unknown[]) => unknown).bind(FloricultureFormulas))
