import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LIMNOLOGY — INLAND WATERS AS ARITHMETIC (lakes, ponds, reservoirs). The state of a body of water is numbers: dissolved
 *  oxygen against saturation, Secchi clarity, trophic load, residence time, thermal stratification, primary productivity,
 *  acidity, and turbidity. Crosses to `hydrology` — limnology is the still water hydrology moves. A measure. */

const PROOF = 'limnology arithmetic (dissolved oxygen, Secchi clarity, trophic load, residence time, stratification, productivity, pH, turbidity); a measure crossed to hydrology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'limnology', dst: 'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `limnology.${name}`, params })

export class LimnologyFormulas {
  /** DISSOLVED OXYGEN as a percentage of saturation. value ⌊dissolved · 100 / saturation⌋. */
  static oxygen(dissolved: number, saturation: number): CrossFormula { return c('limnology-oxygen', 'oxygen(dissolved, saturation) = ⌊dissolved · 100 / saturation⌋', saturation > 0 ? Math.floor((dissolved * 100) / saturation) : 0, nat(dissolved, saturation) && saturation > 0 && dissolved <= saturation, 'oxygen', [dissolved, saturation]) }
  /** CLARITY: the Secchi depth. value depth. */
  static clarity(depth: number): CrossFormula { return c('limnology-clarity', 'clarity(depth) = depth', depth, nat(depth), 'clarity', [depth]) }
  /** TROPHIC load: nutrients per unit volume. value ⌊nutrients / volume⌋. */
  static trophic(nutrients: number, volume: number): CrossFormula { return c('limnology-trophic', 'trophic(nutrients, volume) = ⌊nutrients / volume⌋', volume > 0 ? Math.floor(nutrients / volume) : 0, nat(nutrients, volume) && volume > 0, 'trophic', [nutrients, volume]) }
  /** RESIDENCE time: volume over outflow. value ⌊volume / outflow⌋. */
  static residence(volume: number, outflow: number): CrossFormula { return c('limnology-residence', 'residence(volume, outflow) = ⌊volume / outflow⌋', outflow > 0 ? Math.floor(volume / outflow) : 0, nat(volume, outflow) && outflow > 0, 'residence', [volume, outflow]) }
  /** STRATIFICATION: surface minus bottom, floored at zero. value max(0, surface − bottom). */
  static stratification(surface: number, bottom: number): CrossFormula { return c('limnology-stratification', 'stratification(surface, bottom) = max(0, surface − bottom)', Math.max(0, surface - bottom), nat(surface, bottom), 'stratification', [surface, bottom]) }
  /** PRODUCTIVITY: fixed carbon per unit area. value ⌊carbon / area⌋. */
  static productivity(carbon: number, area: number): CrossFormula { return c('limnology-productivity', 'productivity(carbon, area) = ⌊carbon / area⌋', area > 0 ? Math.floor(carbon / area) : 0, nat(carbon, area) && area > 0, 'productivity', [carbon, area]) }
  /** PH as an acid-to-base ratio, scaled. value ⌊acid · 100 / base⌋. */
  static ph(acid: number, base: number): CrossFormula { return c('limnology-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) }
  /** TURBIDITY: scattered light as a fraction of incident. value ⌊scattered · 100 / incident⌋. */
  static turbidity(scattered: number, incident: number): CrossFormula { return c('limnology-turbidity', 'turbidity(scattered, incident) = ⌊scattered · 100 / incident⌋', incident > 0 ? Math.floor((scattered * 100) / incident) : 0, nat(scattered, incident) && incident > 0 && scattered <= incident, 'turbidity', [scattered, incident]) }
}

for (const name of ['clarity', 'oxygen', 'ph', 'productivity', 'residence', 'stratification', 'trophic', 'turbidity'] as const)
  hexRegisterOf('limnology', name, (LimnologyFormulas[name] as (...x: unknown[]) => unknown).bind(LimnologyFormulas))
