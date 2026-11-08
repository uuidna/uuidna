import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** KNITTING — FABRIC FORMATION AS ARITHMETIC. A knit is a grid of loops: the gauge (stitches per 10 cm), the courses
 *  (rows per 10 cm), the wales a width carries, the stitches a piece holds, the yarn each loop spends, the tightness of
 *  that loop, the loops a machine makes, and the finished weight (gsm). Crosses to `materials` — knitting is what a
 *  material becomes. A measure. */

const PROOF = 'knitting arithmetic (gauge, courses, wales, stitch count, loop length, tightness, productivity, gsm); loops on a grid of yarn; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'knitting', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `knitting.${name}`, params })

export class KnittingFormulas {
  /** GAUGE: stitches measured over a width, scaled to 10 cm. value ⌊stitches · 10 / cm⌋. */
  static gauge(stitches: number, cm: number): CrossFormula { return c('knitting-gauge', 'gauge(stitches, cm) = ⌊stitches · 10 / cm⌋', cm > 0 ? Math.floor((stitches * 10) / cm) : 0, nat(stitches, cm) && cm > 0, 'gauge', [stitches, cm]) }
  /** COURSES: rows measured over a length, scaled to 10 cm. value ⌊rows · 10 / cm⌋. */
  static courses(rows: number, cm: number): CrossFormula { return c('knitting-courses', 'courses(rows, cm) = ⌊rows · 10 / cm⌋', cm > 0 ? Math.floor((rows * 10) / cm) : 0, nat(rows, cm) && cm > 0, 'courses', [rows, cm]) }
  /** WALES: the stitch columns a width carries at a per-cm density. value perCm · width. */
  static wales(perCm: number, width: number): CrossFormula { return c('knitting-wales', 'wales(perCm, width) = perCm · width', perCm * width, nat(perCm, width), 'wales', [perCm, width]) }
  /** STITCH COUNT: the loops in a rectangular piece, wales by courses. value wales · courses. */
  static stitch(wales: number, courses: number): CrossFormula { return c('knitting-stitch', 'stitch(wales, courses) = wales · courses', wales * courses, nat(wales, courses), 'stitch', [wales, courses]) }
  /** LOOP LENGTH: millimetres of yarn spent per loop. value ⌊yarn / stitches⌋. */
  static looplength(yarn: number, stitches: number): CrossFormula { return c('knitting-looplength', 'looplength(yarn, stitches) = ⌊yarn / stitches⌋', stitches > 0 ? Math.floor(yarn / stitches) : 0, nat(yarn, stitches) && stitches > 0, 'looplength', [yarn, stitches]) }
  /** TIGHTNESS: the loop's tightness index, yarn fineness over loop length. value ⌊tex / looplen⌋. */
  static tightness(tex: number, looplen: number): CrossFormula { return c('knitting-tightness', 'tightness(tex, looplen) = ⌊tex / looplen⌋', looplen > 0 ? Math.floor(tex / looplen) : 0, nat(tex, looplen) && looplen > 0, 'tightness', [tex, looplen]) }
  /** PRODUCTIVITY: the loops a machine makes, needles turning at an rpm for the minutes run. value needles · rpm · minutes. */
  static productivity(needles: number, rpm: number, minutes: number): CrossFormula { return c('knitting-productivity', 'productivity(needles, rpm, minutes) = needles · rpm · minutes', needles * rpm * minutes, nat(needles, rpm, minutes), 'productivity', [needles, rpm, minutes]) }
  /** GSM: finished weight, grams spread over an area (cm²), scaled to a square metre. value ⌊mass · 10000 / area⌋. */
  static gsm(mass: number, area: number): CrossFormula { return c('knitting-gsm', 'gsm(mass, area) = ⌊mass · 10000 / area⌋', area > 0 ? Math.floor((mass * 10000) / area) : 0, nat(mass, area) && area > 0, 'gsm', [mass, area]) }
}

for (const name of ['courses', 'gauge', 'gsm', 'looplength', 'productivity', 'stitch', 'tightness', 'wales'] as const)
  hexRegisterOf('knitting', name, (KnittingFormulas[name] as (...x: unknown[]) => unknown).bind(KnittingFormulas))
