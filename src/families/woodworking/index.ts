import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WOODWORKING — THE WORKSHOP AS ARITHMETIC. Cutting and joining stock is numbers: board-feet in a slab, the moisture a
 *  board still carries, the strength of a glued joint, the kerf a saw eats, the yield off a board, Janka hardness, seasonal
 *  expansion, and the waste in offcuts. Crosses to `construction` — woodworking is what construction is built from. A measure. */

const PROOF = 'woodworking arithmetic (board-feet, moisture, joint strength, kerf, yield, hardness, expansion, waste); the workshop as a measure crossed to construction'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'woodworking', dst: 'construction', formula, value, proof: PROOF, ...extra }, holds, { name: `woodworking.${name}`, params })

export class WoodworkingFormulas {
  /** BOARD-FEET: a slab's length by width, in board-feet. value ⌊length · width / 144⌋. */
  static boardfeet(length: number, width: number): CrossFormula { return c('woodworking-boardfeet', 'boardfeet(length, width) = ⌊length · width / 144⌋', Math.floor((length * width) / 144), nat(length, width), 'boardfeet', [length, width]) }
  /** EXPANSION: seasonal movement per a thousand of width. value ⌊change · 1000 / width⌋. */
  static expansion(width: number, change: number): CrossFormula { return c('woodworking-expansion', 'expansion(width, change) = ⌊change · 1000 / width⌋', width > 0 ? Math.floor((change * 1000) / width) : 0, nat(width, change) && width > 0, 'expansion', [width, change]) }
  /** HARDNESS: the Janka reading, held as a natural. value janka. */
  static hardness(janka: number): CrossFormula { return c('woodworking-hardness', 'hardness(janka) = janka', janka, nat(janka), 'hardness', [janka]) }
  /** JOINT STRENGTH: glue area at a per-area rating. value gluearea · rating. */
  static jointstrength(gluearea: number, rating: number): CrossFormula { return c('woodworking-jointstrength', 'jointstrength(gluearea, rating) = gluearea · rating', gluearea * rating, nat(gluearea, rating), 'jointstrength', [gluearea, rating]) }
  /** KERF: the stock a saw eats across the cuts. value cuts · width. */
  static kerf(cuts: number, width: number): CrossFormula { return c('woodworking-kerf', 'kerf(cuts, width) = cuts · width', cuts * width, nat(cuts, width), 'kerf', [cuts, width]) }
  /** MOISTURE as a percentage of the dry weight. value ⌊(wet − dry) · 100 / dry⌋. */
  static moisture(wet: number, dry: number): CrossFormula { return c('woodworking-moisture', 'moisture(wet, dry) = ⌊(wet − dry) · 100 / dry⌋', dry > 0 ? Math.floor(((wet - dry) * 100) / dry) : 0, nat(wet, dry) && dry > 0 && wet >= dry, 'moisture', [wet, dry]) }
  /** USAGE: the usable yield off a board, as a percentage. value ⌊usable · 100 / board⌋. */
  static usage(usable: number, board: number): CrossFormula { return c('woodworking-usage', 'usage(usable, board) = ⌊usable · 100 / board⌋', board > 0 ? Math.floor((usable * 100) / board) : 0, nat(usable, board) && board > 0 && usable <= board, 'usage', [usable, board]) }
  /** WASTE: the offcuts as a percentage of the total. value ⌊offcuts · 100 / total⌋. */
  static waste(offcuts: number, total: number): CrossFormula { return c('woodworking-waste', 'waste(offcuts, total) = ⌊offcuts · 100 / total⌋', total > 0 ? Math.floor((offcuts * 100) / total) : 0, nat(offcuts, total) && total > 0 && offcuts <= total, 'waste', [offcuts, total]) }
}

for (const name of ['boardfeet', 'expansion', 'hardness', 'jointstrength', 'kerf', 'moisture', 'usage', 'waste'] as const)
  hexRegisterOf('woodworking', name, (WoodworkingFormulas[name] as (...x: unknown[]) => unknown).bind(WoodworkingFormulas))
