import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONSTRUCTION — BUILDING & CONSTRUCTION, AS ARITHMETIC (chosen by the public-API registry, not by hand). Putting up a
 *  building is numbers: floor area, volume, the materials an area needs, total cost, the crew per shift, progress to date,
 *  the load each support carries, and the waste off the cut. Crosses to `econ` — construction is spend and yield. A measure. */

const PROOF = 'construction arithmetic (area, volume, materials, cost, crew, progress, load, waste); a building-trades domain; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'construction', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `construction.${name}`, params })

export class ConstructionFormulas {
  /** FLOOR AREA: length by width. value length · width. */
  static area(length: number, width: number): CrossFormula { return c('construction-area', 'area(length, width) = length · width', length * width, nat(length, width), 'area', [length, width]) }
  /** VOLUME: floor area raised a height. value area · height. */
  static volume(area: number, height: number): CrossFormula { return c('construction-volume', 'volume(area, height) = area · height', area * height, nat(area, height), 'volume', [area, height]) }
  /** MATERIALS: an area at a per-square-metre rate. value area · perSqm. */
  static materials(area: number, perSqm: number): CrossFormula { return c('construction-materials', 'materials(area, perSqm) = area · perSqm', area * perSqm, nat(area, perSqm), 'materials', [area, perSqm]) }
  /** TOTAL COST: materials plus labor. value materials + labor. */
  static cost(materials: number, labor: number): CrossFormula { return c('construction-cost', 'cost(materials, labor) = materials + labor', materials + labor, nat(materials, labor), 'cost', [materials, labor]) }
  /** CREW: the hours each worker takes on a shift. value ⌊hours / workers⌋. */
  static crew(hours: number, workers: number): CrossFormula { return c('construction-crew', 'crew(hours, workers) = ⌊hours / workers⌋', workers > 0 ? Math.floor(hours / workers) : 0, nat(hours, workers) && workers > 0, 'crew', [hours, workers]) }
  /** PROGRESS as a percentage. value ⌊done · 100 / total⌋. */
  static progress(done: number, total: number): CrossFormula { return c('construction-progress', 'progress(done, total) = ⌊done · 100 / total⌋', total > 0 ? Math.floor((done * 100) / total) : 0, nat(done, total) && total > 0 && done <= total, 'progress', [done, total]) }
  /** LOAD: the weight each support carries. value ⌊weight / supports⌋. */
  static load(weight: number, supports: number): CrossFormula { return c('construction-load', 'load(weight, supports) = ⌊weight / supports⌋', supports > 0 ? Math.floor(weight / supports) : 0, nat(weight, supports) && supports > 0, 'load', [weight, supports]) }
  /** WASTE as a percentage of what was used. value ⌊scrap · 100 / used⌋. */
  static waste(scrap: number, used: number): CrossFormula { return c('construction-waste', 'waste(scrap, used) = ⌊scrap · 100 / used⌋', used > 0 ? Math.floor((scrap * 100) / used) : 0, nat(scrap, used) && used > 0 && scrap <= used, 'waste', [scrap, used]) }
}

for (const name of ['area', 'cost', 'crew', 'load', 'materials', 'progress', 'volume', 'waste'] as const)
  hexRegisterOf('construction', name, (ConstructionFormulas[name] as (...x: unknown[]) => unknown).bind(ConstructionFormulas))
