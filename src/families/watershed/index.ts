import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WATERSHED — A DRAINAGE BASIN AS ARITHMETIC. Water on a catchment is numbers: the runoff a storm sheds, how finely
 *  streams dissect the land, how long flow takes to concentrate, the peak a storm drives, what the soil drinks, the
 *  area it drains, where a reach sits in the stream hierarchy, and the fall from ridge to outlet. Crosses to `hydrology`
 *  — watershed is the surface hydrology acts on. A measure. */

const PROOF = 'watershed arithmetic (runoff, drainage density, time of concentration, peak flow, infiltration, catchment area, stream order, basin relief); a drainage basin as integer formulas; a measure crossed to hydrology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'watershed', dst: 'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `watershed.${name}`, params })

export class WatershedFormulas {
  /** RUNOFF: the depth a storm sheds at a runoff coefficient (percent). value ⌊rainfall · coeff / 100⌋. */
  static runoff(rainfall: number, coeff: number): CrossFormula { return c('watershed-runoff', 'runoff(rainfall, coeff) = ⌊rainfall · coeff / 100⌋', Math.floor((rainfall * coeff) / 100), nat(rainfall, coeff), 'runoff', [rainfall, coeff]) }
  /** DRAINAGE DENSITY: total stream length over the basin area. value ⌊length / area⌋. */
  static drainagedensity(length: number, area: number): CrossFormula { return c('watershed-drainagedensity', 'drainagedensity(length, area) = ⌊length / area⌋', area > 0 ? Math.floor(length / area) : 0, nat(length, area) && area > 0, 'drainagedensity', [length, area]) }
  /** TIME OF CONCENTRATION: travel time of flow along its path at a velocity. value ⌊length / velocity⌋. */
  static timeofconcentration(length: number, velocity: number): CrossFormula { return c('watershed-timeofconcentration', 'timeofconcentration(length, velocity) = ⌊length / velocity⌋', velocity > 0 ? Math.floor(length / velocity) : 0, nat(length, velocity) && velocity > 0, 'timeofconcentration', [length, velocity]) }
  /** PEAK FLOW: the rational method — coefficient (percent), intensity, area. value ⌊coeff · intensity · area / 100⌋. */
  static peakflow(intensity: number, area: number, coeff: number): CrossFormula { return c('watershed-peakflow', 'peakflow(intensity, area, coeff) = ⌊coeff · intensity · area / 100⌋', Math.floor((coeff * intensity * area) / 100), nat(intensity, area, coeff), 'peakflow', [intensity, area, coeff]) }
  /** INFILTRATION: the rainfall the soil drinks, what the storm did not shed. value max(0, rainfall − runoff). */
  static infiltration(rainfall: number, runoff: number): CrossFormula { return c('watershed-infiltration', 'infiltration(rainfall, runoff) = max(0, rainfall − runoff)', Math.max(0, rainfall - runoff), nat(rainfall, runoff), 'infiltration', [rainfall, runoff]) }
  /** CATCHMENT AREA: the drained rectangle, length by width. value length · width. */
  static catchmentarea(length: number, width: number): CrossFormula { return c('watershed-catchmentarea', 'catchmentarea(length, width) = length · width', length * width, nat(length, width), 'catchmentarea', [length, width]) }
  /** STREAM ORDER (Strahler): two reaches of equal order make the next; otherwise the greater stands. value [a = b] ? a + 1 : max(a, b). */
  static streamorder(a: number, b: number): CrossFormula { return c('watershed-streamorder', 'streamorder(a, b) = [a = b] ? a + 1 : max(a, b)', a === b ? a + 1 : Math.max(a, b), nat(a, b), 'streamorder', [a, b]) }
  /** BASIN RELIEF: the fall from the highest ridge to the outlet. value max(0, highest − lowest). */
  static basinrelief(highest: number, lowest: number): CrossFormula { return c('watershed-basinrelief', 'basinrelief(highest, lowest) = max(0, highest − lowest)', Math.max(0, highest - lowest), nat(highest, lowest), 'basinrelief', [highest, lowest]) }
}

for (const name of ['basinrelief', 'catchmentarea', 'drainagedensity', 'infiltration', 'peakflow', 'runoff', 'streamorder', 'timeofconcentration'] as const)
  hexRegisterOf('watershed', name, (WatershedFormulas[name] as (...x: unknown[]) => unknown).bind(WatershedFormulas))
