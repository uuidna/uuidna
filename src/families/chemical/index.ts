import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHEMICAL — CHEMICAL ENGINEERING AS ARITHMETIC. Running a process is numbers: how much feed reacts, how much product
 *  against the theoretical, how long a parcel resides, the reflux ratio, heat and mass transfer, selectivity, pressure
 *  drop across a bed. Crosses to `chemistry` — engineering is chemistry at scale. A measure. */

const PROOF = 'chemical engineering arithmetic (conversion, yield, residence time, reflux, heat transfer, mass transfer, selectivity, pressure drop); a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'chemical', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `chemical.${name}`, params })

export class ChemicalFormulas {
  /** CONVERSION: fraction of feed reacted, as a percentage. value ⌊reacted · 100 / fed⌋. */
  static conversion(reacted: number, fed: number): CrossFormula { return c('chemical-conversion', 'conversion(reacted, fed) = ⌊reacted · 100 / fed⌋', fed > 0 ? Math.floor((reacted * 100) / fed) : 0, nat(reacted, fed) && fed > 0 && reacted <= fed, 'conversion', [reacted, fed]) }
  /** HEAT TRANSFER: duty from coefficient and area. value coefficient · area. */
  static heattransfer(coefficient: number, area: number): CrossFormula { return c('chemical-heattransfer', 'heattransfer(coefficient, area) = coefficient · area', coefficient * area, nat(coefficient, area), 'heattransfer', [coefficient, area]) }
  /** MASS TRANSFER: flux from gradient and coefficient. value gradient · coefficient. */
  static masstransfer(gradient: number, coefficient: number): CrossFormula { return c('chemical-masstransfer', 'masstransfer(gradient, coefficient) = gradient · coefficient', gradient * coefficient, nat(gradient, coefficient), 'masstransfer', [gradient, coefficient]) }
  /** YIELD: product against the theoretical, as a percentage. value ⌊product · 100 / theoretical⌋. */
  static output(product: number, theoretical: number): CrossFormula { return c('chemical-output', 'output(product, theoretical) = ⌊product · 100 / theoretical⌋', theoretical > 0 ? Math.floor((product * 100) / theoretical) : 0, nat(product, theoretical) && theoretical > 0 && product <= theoretical, 'output', [product, theoretical]) }
  /** PRESSURE DROP: inlet less outlet, never below zero. value max(0, inlet − outlet). */
  static pressuredrop(inlet: number, outlet: number): CrossFormula { return c('chemical-pressuredrop', 'pressuredrop(inlet, outlet) = max(0, inlet − outlet)', Math.max(0, inlet - outlet), nat(inlet, outlet), 'pressuredrop', [inlet, outlet]) }
  /** REFLUX: returned against distillate, as a percentage. value ⌊returned · 100 / distillate⌋. */
  static reflux(returned: number, distillate: number): CrossFormula { return c('chemical-reflux', 'reflux(returned, distillate) = ⌊returned · 100 / distillate⌋', distillate > 0 ? Math.floor((returned * 100) / distillate) : 0, nat(returned, distillate) && distillate > 0, 'reflux', [returned, distillate]) }
  /** RESIDENCE TIME: volume over volumetric flow. value ⌊volume / flow⌋. */
  static residence(volume: number, flow: number): CrossFormula { return c('chemical-residence', 'residence(volume, flow) = ⌊volume / flow⌋', flow > 0 ? Math.floor(volume / flow) : 0, nat(volume, flow) && flow > 0, 'residence', [volume, flow]) }
  /** SELECTIVITY: desired against total product, as a percentage. value ⌊desired · 100 / total⌋. */
  static selectivity(desired: number, total: number): CrossFormula { return c('chemical-selectivity', 'selectivity(desired, total) = ⌊desired · 100 / total⌋', total > 0 ? Math.floor((desired * 100) / total) : 0, nat(desired, total) && total > 0 && desired <= total, 'selectivity', [desired, total]) }
}

for (const name of ['conversion', 'heattransfer', 'masstransfer', 'output', 'pressuredrop', 'reflux', 'residence', 'selectivity'] as const)
  hexRegisterOf('chemical', name, (ChemicalFormulas[name] as (...x: unknown[]) => unknown).bind(ChemicalFormulas))
