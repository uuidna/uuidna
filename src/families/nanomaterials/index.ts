import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NANOMATERIALS — THE NANOSCALE AS ARITHMETIC (chosen by the materials registry, not by hand). A nanoparticle is numbers:
 *  the surface it exposes, the aspect ratio of a tube, the band gap widened by confinement, the quantum yield of a dot,
 *  the drug a carrier loads, the fraction of atoms dispersed on the surface, surface-to-volume, and the confinement energy.
 *  Crosses to `materials` — a nanomaterial is a material taken to the nanoscale. A measure. */

const PROOF = 'nanomaterials arithmetic (surface area, aspect ratio, confinement band gap, quantum yield, drug loading, dispersion, surface-to-volume, confinement energy); the nanoscale of the materials domain; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'nanomaterials', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `nanomaterials.${name}`, params })

export class NanomaterialsFormulas {
  /** SURFACE AREA: particles at an area each. value particles · perParticle. */
  static surfacearea(particles: number, perParticle: number): CrossFormula { return c('nanomaterials-surfacearea', 'surfacearea(particles, perParticle) = particles · perParticle', particles * perParticle, nat(particles, perParticle), 'surfacearea', [particles, perParticle]) }
  /** ASPECT RATIO: length over diameter. value ⌊length / diameter⌋. */
  static aspectratio(length: number, diameter: number): CrossFormula { return c('nanomaterials-aspectratio', 'aspectratio(length, diameter) = ⌊length / diameter⌋', diameter > 0 ? Math.floor(length / diameter) : 0, nat(length, diameter) && diameter > 0, 'aspectratio', [length, diameter]) }
  /** BAND GAP: bulk gap widened by the confinement shift. value bulk + shift. */
  static bandgap(bulk: number, shift: number): CrossFormula { return c('nanomaterials-bandgap', 'bandgap(bulk, shift) = bulk + shift', bulk + shift, nat(bulk, shift), 'bandgap', [bulk, shift]) }
  /** QUANTUM YIELD: photons emitted over absorbed, as a percentage. value ⌊emitted · 100 / absorbed⌋. */
  static quantumyield(emitted: number, absorbed: number): CrossFormula { return c('nanomaterials-quantumyield', 'quantumyield(emitted, absorbed) = ⌊emitted · 100 / absorbed⌋', absorbed > 0 ? Math.floor((emitted * 100) / absorbed) : 0, nat(emitted, absorbed) && absorbed > 0 && emitted <= absorbed, 'quantumyield', [emitted, absorbed]) }
  /** DRUG LOADING: payload over the whole carrier, as a percentage. value ⌊drug · 100 / (drug + carrier)⌋. */
  static loading(drug: number, carrier: number): CrossFormula { return c('nanomaterials-loading', 'loading(drug, carrier) = ⌊drug · 100 / (drug + carrier)⌋', (drug + carrier) > 0 ? Math.floor((drug * 100) / (drug + carrier)) : 0, nat(drug, carrier) && (drug + carrier) > 0, 'loading', [drug, carrier]) }
  /** DISPERSION: surface atoms over total atoms, as a percentage. value ⌊surface · 100 / total⌋. */
  static dispersion(surface: number, total: number): CrossFormula { return c('nanomaterials-dispersion', 'dispersion(surface, total) = ⌊surface · 100 / total⌋', total > 0 ? Math.floor((surface * 100) / total) : 0, nat(surface, total) && total > 0 && surface <= total, 'dispersion', [surface, total]) }
  /** SURFACE-TO-VOLUME: area over volume. value ⌊area / volume⌋. */
  static surfacevolume(area: number, volume: number): CrossFormula { return c('nanomaterials-surfacevolume', 'surfacevolume(area, volume) = ⌊area / volume⌋', volume > 0 ? Math.floor(area / volume) : 0, nat(area, volume) && volume > 0, 'surfacevolume', [area, volume]) }
  /** CONFINEMENT ENERGY: a constant over the radius squared. value ⌊constant / (radius · radius)⌋. */
  static confinement(constant: number, radius: number): CrossFormula { return c('nanomaterials-confinement', 'confinement(constant, radius) = ⌊constant / (radius · radius)⌋', radius > 0 ? Math.floor(constant / (radius * radius)) : 0, nat(constant, radius) && radius > 0, 'confinement', [constant, radius]) }
}

for (const name of ['aspectratio', 'bandgap', 'confinement', 'dispersion', 'loading', 'quantumyield', 'surfacearea', 'surfacevolume'] as const)
  hexRegisterOf('nanomaterials', name, (NanomaterialsFormulas[name] as (...x: unknown[]) => unknown).bind(NanomaterialsFormulas))
