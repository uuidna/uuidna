import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AGRICULTURE — FARMING & AGRONOMY, AS ARITHMETIC (chosen by the public-API registry, not by hand). A farm is numbers:
 *  yield per hectare, seed and water and fertilizer a field needs, germination and moisture as percentages, the fields a
 *  rotation can run, and the harvest a yield returns over an area. Crosses to `econ` — a farm is an economy of land. A measure. */

const PROOF = 'agriculture arithmetic (yield per area, seed, water, fertilizer, germination, rotation, moisture, harvest); farming & agronomy as integers; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'agriculture', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `agriculture.${name}`, params })

export class AgricultureFormulas {
  /** YIELD: harvest over the area it came from. value ⌊harvest / area⌋. */
  static yield(harvest: number, area: number): CrossFormula { return c('agriculture-yield', 'yield(harvest, area) = ⌊harvest / area⌋', area > 0 ? Math.floor(harvest / area) : 0, nat(harvest, area) && area > 0, 'yield', [harvest, area]) }
  /** SEED: an area at a sowing rate. value area · rate. */
  static seed(area: number, rate: number): CrossFormula { return c('agriculture-seed', 'seed(area, rate) = area · rate', area * rate, nat(area, rate), 'seed', [area, rate]) }
  /** WATER: an area at millimetres of irrigation. value area · mm. */
  static water(area: number, mm: number): CrossFormula { return c('agriculture-water', 'water(area, mm) = area · mm', area * mm, nat(area, mm), 'water', [area, mm]) }
  /** FERTILIZER: an area at an amount per hectare. value area · perHa. */
  static fertilizer(area: number, perHa: number): CrossFormula { return c('agriculture-fertilizer', 'fertilizer(area, perHa) = area · perHa', area * perHa, nat(area, perHa), 'fertilizer', [area, perHa]) }
  /** GERMINATION as a percentage. value ⌊sprouted · 100 / sown⌋. */
  static germination(sprouted: number, sown: number): CrossFormula { return c('agriculture-germination', 'germination(sprouted, sown) = ⌊sprouted · 100 / sown⌋', sown > 0 ? Math.floor((sprouted * 100) / sown) : 0, nat(sprouted, sown) && sown > 0 && sprouted <= sown, 'germination', [sprouted, sown]) }
  /** ROTATION: the fields a rotation of so many years can run. value ⌊fields / years⌋. */
  static rotation(fields: number, years: number): CrossFormula { return c('agriculture-rotation', 'rotation(fields, years) = ⌊fields / years⌋', years > 0 ? Math.floor(fields / years) : 0, nat(fields, years) && years > 0, 'rotation', [fields, years]) }
  /** MOISTURE as a percentage of wet over dry. value ⌊wet · 100 / dry⌋. */
  static moisture(wet: number, dry: number): CrossFormula { return c('agriculture-moisture', 'moisture(wet, dry) = ⌊wet · 100 / dry⌋', dry > 0 ? Math.floor((wet * 100) / dry) : 0, nat(wet, dry) && dry > 0, 'moisture', [wet, dry]) }
  /** HARVEST: a yield per area over an area. value perArea · area. */
  static harvest(perArea: number, area: number): CrossFormula { return c('agriculture-harvest', 'harvest(perArea, area) = perArea · area', perArea * area, nat(perArea, area), 'harvest', [perArea, area]) }
}

for (const name of ['fertilizer', 'germination', 'harvest', 'moisture', 'rotation', 'seed', 'water', 'yield'] as const)
  hexRegisterOf('agriculture', name, (AgricultureFormulas[name] as (...x: unknown[]) => unknown).bind(AgricultureFormulas))
