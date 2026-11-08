import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PETROLEUM — THE OIL-AND-GAS DOMAIN, AS ARITHMETIC (chosen by the registry, not by hand). A barrel is numbers: API gravity
 *  from specific gravity, the recovery factor, rock porosity and permeability, the refinery yield, reservoir depth, flow over
 *  hours, and hydrocarbon saturation of the pore space. Crosses to `energy` — petroleum is what energy burns. A measure. */

const PROOF = 'petroleum arithmetic (api gravity, recovery, porosity, permeability, refinery yield, depth, flow, saturation); an oil-and-gas measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'petroleum', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `petroleum.${name}`, params })

export class PetroleumFormulas {
  /** API GRAVITY: a proxy from specific gravity. value ⌊141500 / specific⌋ − 131. */
  static api(specific: number): CrossFormula { return c('petroleum-api', 'api(specific) = ⌊141500 / specific⌋ − 131', specific > 0 ? Math.floor(141500 / specific) - 131 : 0, nat(specific) && specific > 0, 'api', [specific]) }
  /** RECOVERY FACTOR: produced of reserves, as a percentage. value ⌊produced · 100 / reserves⌋. */
  static recovery(produced: number, reserves: number): CrossFormula { return c('petroleum-recovery', 'recovery(produced, reserves) = ⌊produced · 100 / reserves⌋', reserves > 0 ? Math.floor((produced * 100) / reserves) : 0, nat(produced, reserves) && reserves > 0 && produced <= reserves, 'recovery', [produced, reserves]) }
  /** POROSITY: pore space of the rock volume, as a percentage. value ⌊pores · 100 / volume⌋. */
  static porosity(pores: number, volume: number): CrossFormula { return c('petroleum-porosity', 'porosity(pores, volume) = ⌊pores · 100 / volume⌋', volume > 0 ? Math.floor((pores * 100) / volume) : 0, nat(pores, volume) && volume > 0 && pores <= volume, 'porosity', [pores, volume]) }
  /** PERMEABILITY: flow over pressure. value ⌊flow / pressure⌋. */
  static permeability(flow: number, pressure: number): CrossFormula { return c('petroleum-permeability', 'permeability(flow, pressure) = ⌊flow / pressure⌋', pressure > 0 ? Math.floor(flow / pressure) : 0, nat(flow, pressure) && pressure > 0, 'permeability', [flow, pressure]) }
  /** REFINERY YIELD: product of the crude, as a percentage. value ⌊product · 100 / crude⌋. */
  static refined(product: number, crude: number): CrossFormula { return c('petroleum-refined', 'refined(product, crude) = ⌊product · 100 / crude⌋', crude > 0 ? Math.floor((product * 100) / crude) : 0, nat(product, crude) && crude > 0 && product <= crude, 'refined', [product, crude]) }
  /** DEPTH: reservoir depth in metres. value meters. */
  static depth(meters: number): CrossFormula { return c('petroleum-depth', 'depth(meters) = meters', meters, nat(meters), 'depth', [meters]) }
  /** FLOW: a rate over hours. value rate · hours. */
  static flow(rate: number, hours: number): CrossFormula { return c('petroleum-flow', 'flow(rate, hours) = rate · hours', rate * hours, nat(rate, hours), 'flow', [rate, hours]) }
  /** SATURATION: hydrocarbon of the pore space, as a percentage. value ⌊hydrocarbon · 100 / pore⌋. */
  static saturation(hydrocarbon: number, pore: number): CrossFormula { return c('petroleum-saturation', 'saturation(hydrocarbon, pore) = ⌊hydrocarbon · 100 / pore⌋', pore > 0 ? Math.floor((hydrocarbon * 100) / pore) : 0, nat(hydrocarbon, pore) && pore > 0 && hydrocarbon <= pore, 'saturation', [hydrocarbon, pore]) }
}

for (const name of ['api', 'depth', 'flow', 'permeability', 'porosity', 'recovery', 'refined', 'saturation'] as const)
  hexRegisterOf('petroleum', name, (PetroleumFormulas[name] as (...x: unknown[]) => unknown).bind(PetroleumFormulas))
