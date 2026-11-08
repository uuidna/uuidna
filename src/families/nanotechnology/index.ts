import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NANOTECHNOLOGY — THE VERY SMALL, AS ARITHMETIC (chosen by the public-API registry, not by hand). Working at the
 *  nanoscale is numbers: surface-to-volume ratio, aspect ratio, how many particles a mass holds, quantum confinement,
 *  reaction yield, band gap, coating mass, and how well a dispersion spreads. Crosses to `materials` — nanotechnology
 *  is materials at the limit. A measure. */

const PROOF = 'nanotechnology arithmetic (surface-to-volume, aspect ratio, particle count, quantum confinement, yield, band gap, coating, dispersion); the very small as integers; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'nanotechnology', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `nanotechnology.${name}`, params })

export class NanotechnologyFormulas {
  /** ASPECT RATIO: length over diameter, scaled. value ⌊length · 100 / diameter⌋. */
  static aspectratio(length: number, diameter: number): CrossFormula { return c('nanotechnology-aspectratio', 'aspectratio(length, diameter) = ⌊length · 100 / diameter⌋', diameter > 0 ? Math.floor((length * 100) / diameter) : 0, nat(length, diameter) && diameter > 0, 'aspectratio', [length, diameter]) }
  /** BAND GAP: bulk energy scaled down by size. value ⌊energy / size⌋. */
  static bandgap(energy: number, size: number): CrossFormula { return c('nanotechnology-bandgap', 'bandgap(energy, size) = ⌊energy / size⌋', size > 0 ? Math.floor(energy / size) : 0, nat(energy, size) && size > 0, 'bandgap', [energy, size]) }
  /** COATING: mass of a shell at a thickness over so many layers. value thickness · layers. */
  static coating(thickness: number, layers: number): CrossFormula { return c('nanotechnology-coating', 'coating(thickness, layers) = thickness · layers', thickness * layers, nat(thickness, layers), 'coating', [thickness, layers]) }
  /** DISPERSION: how much of the total is dispersed, scaled. value ⌊dispersed · 100 / total⌋. */
  static dispersion(dispersed: number, total: number): CrossFormula { return c('nanotechnology-dispersion', 'dispersion(dispersed, total) = ⌊dispersed · 100 / total⌋', total > 0 ? Math.floor((dispersed * 100) / total) : 0, nat(dispersed, total) && total > 0 && dispersed <= total, 'dispersion', [dispersed, total]) }
  /** PARTICLE COUNT: how many particles a mass holds. value ⌊mass / particlemass⌋. */
  static particlecount(mass: number, particlemass: number): CrossFormula { return c('nanotechnology-particlecount', 'particlecount(mass, particlemass) = ⌊mass / particlemass⌋', particlemass > 0 ? Math.floor(mass / particlemass) : 0, nat(mass, particlemass) && particlemass > 0, 'particlecount', [mass, particlemass]) }
  /** QUANTUM CONFINEMENT: bulk property over the confining size. value ⌊bulk / size⌋. */
  static quantumconfinement(bulk: number, size: number): CrossFormula { return c('nanotechnology-quantumconfinement', 'quantumconfinement(bulk, size) = ⌊bulk / size⌋', size > 0 ? Math.floor(bulk / size) : 0, nat(bulk, size) && size > 0, 'quantumconfinement', [bulk, size]) }
  /** SURFACE-TO-VOLUME RATIO, scaled. value ⌊surface · 100 / volume⌋. */
  static surfacevolume(surface: number, volume: number): CrossFormula { return c('nanotechnology-surfacevolume', 'surfacevolume(surface, volume) = ⌊surface · 100 / volume⌋', volume > 0 ? Math.floor((surface * 100) / volume) : 0, nat(surface, volume) && volume > 0, 'surfacevolume', [surface, volume]) }
  /** YIELD RATE: produced over theoretical, as a percentage. value ⌊produced · 100 / theoretical⌋. */
  static yieldrate(produced: number, theoretical: number): CrossFormula { return c('nanotechnology-yieldrate', 'yieldrate(produced, theoretical) = ⌊produced · 100 / theoretical⌋', theoretical > 0 ? Math.floor((produced * 100) / theoretical) : 0, nat(produced, theoretical) && theoretical > 0 && produced <= theoretical, 'yieldrate', [produced, theoretical]) }
}

for (const name of ['aspectratio', 'bandgap', 'coating', 'dispersion', 'particlecount', 'quantumconfinement', 'surfacevolume', 'yieldrate'] as const)
  hexRegisterOf('nanotechnology', name, (NanotechnologyFormulas[name] as (...x: unknown[]) => unknown).bind(NanotechnologyFormulas))
