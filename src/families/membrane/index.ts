import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MEMBRANE — THE CELL BOUNDARY, AS ARITHMETIC. A membrane is numbers: the resting potential across it, the Nernst
 *  potential of an ion, how fast something permeates, how fluid the bilayer is, the surface area it wraps, the rate it
 *  transports, the charge it stores, and how selective its channels are. Crosses to `biochemistry` — a membrane is where
 *  biochemistry meets a boundary. A measure. */

const PROOF = 'membrane arithmetic (resting potential, Nernst, permeability, fluidity, surface area, transport rate, capacitance, selectivity); the cell boundary as integers; a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'membrane', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `membrane.${name}`, params })

export class MembraneFormulas {
  /** RESTING POTENTIAL: the standing charge difference across the bilayer (mV). value max(0, outside − inside). */
  static restingpotential(outside: number, inside: number): CrossFormula { return c('membrane-restingpotential', 'restingpotential(outside, inside) = max(0, outside − inside)', Math.max(0, outside - inside), nat(outside, inside), 'restingpotential', [outside, inside]) }
  /** NERNST POTENTIAL: 61 mV per decade of gradient, divided by the ion's valence. value ⌊61 · decades / valence⌋. */
  static nernst(decades: number, valence: number): CrossFormula { return c('membrane-nernst', 'nernst(decades, valence) = ⌊61 · decades / valence⌋', valence > 0 ? Math.floor((61 * decades) / valence) : 0, nat(decades, valence) && valence > 0, 'nernst', [decades, valence]) }
  /** PERMEABILITY: flux per unit area per unit concentration. value ⌊flux / (area · conc)⌋. */
  static permeability(flux: number, area: number, conc: number): CrossFormula { return c('membrane-permeability', 'permeability(flux, area, conc) = ⌊flux / (area · conc)⌋', area * conc > 0 ? Math.floor(flux / (area * conc)) : 0, nat(flux, area, conc) && area > 0 && conc > 0, 'permeability', [flux, area, conc]) }
  /** FLUIDITY: the bilayer gets more fluid with temperature, less with viscosity. value ⌊temp / viscosity⌋. */
  static fluidity(temp: number, viscosity: number): CrossFormula { return c('membrane-fluidity', 'fluidity(temp, viscosity) = ⌊temp / viscosity⌋', viscosity > 0 ? Math.floor(temp / viscosity) : 0, nat(temp, viscosity) && viscosity > 0, 'fluidity', [temp, viscosity]) }
  /** SURFACE AREA: a sphere's wrap, with π taken as 3. value 12 · radius². */
  static surfacearea(radius: number): CrossFormula { return c('membrane-surfacearea', 'surfacearea(radius) = 12 · radius²', 12 * radius * radius, nat(radius), 'surfacearea', [radius]) }
  /** TRANSPORT RATE: molecules carried per unit time. value ⌊molecules / time⌋. */
  static transportrate(molecules: number, time: number): CrossFormula { return c('membrane-transportrate', 'transportrate(molecules, time) = ⌊molecules / time⌋', time > 0 ? Math.floor(molecules / time) : 0, nat(molecules, time) && time > 0, 'transportrate', [molecules, time]) }
  /** CAPACITANCE: the charge the bilayer stores, area over its thickness (ε taken as 1). value ⌊area / distance⌋. */
  static capacitance(area: number, distance: number): CrossFormula { return c('membrane-capacitance', 'capacitance(area, distance) = ⌊area / distance⌋', distance > 0 ? Math.floor(area / distance) : 0, nat(area, distance) && distance > 0, 'capacitance', [area, distance]) }
  /** SELECTIVITY: the fraction of crossings that are the wanted ion, as a percentage. value ⌊wanted · 100 / total⌋. */
  static selectivity(wanted: number, total: number): CrossFormula { return c('membrane-selectivity', 'selectivity(wanted, total) = ⌊wanted · 100 / total⌋', total > 0 ? Math.floor((wanted * 100) / total) : 0, nat(wanted, total) && total > 0 && wanted <= total, 'selectivity', [wanted, total]) }
}

for (const name of ['capacitance', 'fluidity', 'nernst', 'permeability', 'restingpotential', 'selectivity', 'surfacearea', 'transportrate'] as const)
  hexRegisterOf('membrane', name, (MembraneFormulas[name] as (...x: unknown[]) => unknown).bind(MembraneFormulas))
