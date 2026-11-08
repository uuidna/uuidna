import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TILLAGE — WORKING THE SOIL, AS ARITHMETIC (a field operation, not a stored row). Breaking ground is numbers: the depth
 *  worked, the passes to cover a field, residue left on the surface, fuel burned per hectare, how much soil is disturbed,
 *  the draft force an implement pulls, its effective working width, and the hectares an hour it turns over. Crosses to
 *  `agronomy` — tillage is what agronomy plans and judges. A measure. */

const PROOF = 'tillage arithmetic (worked depth, passes, residue cover, fuel per hectare, soil disturbance, draft force, working width, field capacity); a field operation measured, crossed to agronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tillage', dst: 'agronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `tillage.${name}`, params })

export class TillageFormulas {
  /** WORKED DEPTH: the depth each layer turns, over the layers worked. value layers · perLayer. */
  static depth(layers: number, perLayer: number): CrossFormula { return c('tillage-depth', 'depth(layers, perLayer) = layers · perLayer', layers * perLayer, nat(layers, perLayer), 'depth', [layers, perLayer]) }
  /** DRAFT FORCE: the force an implement pulls at a per-metre soil resistance. value width · resistance. */
  static drafforce(width: number, resistance: number): CrossFormula { return c('tillage-drafforce', 'drafforce(width, resistance) = width · resistance', width * resistance, nat(width, resistance), 'drafforce', [width, resistance]) }
  /** FIELD CAPACITY: hectares turned over per hour. value ⌊area / hours⌋. */
  static fieldcapacity(area: number, hours: number): CrossFormula { return c('tillage-fieldcapacity', 'fieldcapacity(area, hours) = ⌊area / hours⌋', hours > 0 ? Math.floor(area / hours) : 0, nat(area, hours) && hours > 0, 'fieldcapacity', [area, hours]) }
  /** FUEL PER HECTARE: fuel burned over the area worked. value ⌊fuel / area⌋. */
  static fuelperhectare(fuel: number, area: number): CrossFormula { return c('tillage-fuelperhectare', 'fuelperhectare(fuel, area) = ⌊fuel / area⌋', area > 0 ? Math.floor(fuel / area) : 0, nat(fuel, area) && area > 0, 'fuelperhectare', [fuel, area]) }
  /** PASSES: the passes to cover a field at a per-pass width. value ⌈field / perPass⌉. */
  static passes(field: number, perPass: number): CrossFormula { return c('tillage-passes', 'passes(field, perPass) = ⌈field / perPass⌉', perPass > 0 ? Math.ceil(field / perPass) : 0, nat(field, perPass) && perPass > 0, 'passes', [field, perPass]) }
  /** RESIDUE COVER as a percentage of the surface. value ⌊covered · 100 / total⌋. */
  static residuecover(covered: number, total: number): CrossFormula { return c('tillage-residuecover', 'residuecover(covered, total) = ⌊covered · 100 / total⌋', total > 0 ? Math.floor((covered * 100) / total) : 0, nat(covered, total) && total > 0 && covered <= total, 'residuecover', [covered, total]) }
  /** SOIL DISTURBANCE as a percentage of the width tilled. value ⌊disturbed · 100 / width⌋. */
  static soildisturbance(disturbed: number, width: number): CrossFormula { return c('tillage-soildisturbance', 'soildisturbance(disturbed, width) = ⌊disturbed · 100 / width⌋', width > 0 ? Math.floor((disturbed * 100) / width) : 0, nat(disturbed, width) && width > 0 && disturbed <= width, 'soildisturbance', [disturbed, width]) }
  /** WORKING WIDTH: the effective width after overlap. value max(0, span − overlap). */
  static workingwidth(span: number, overlap: number): CrossFormula { return c('tillage-workingwidth', 'workingwidth(span, overlap) = max(0, span − overlap)', Math.max(0, span - overlap), nat(span, overlap), 'workingwidth', [span, overlap]) }
}

for (const name of ['depth', 'drafforce', 'fieldcapacity', 'fuelperhectare', 'passes', 'residuecover', 'soildisturbance', 'workingwidth'] as const)
  hexRegisterOf('tillage', name, (TillageFormulas[name] as (...x: unknown[]) => unknown).bind(TillageFormulas))
