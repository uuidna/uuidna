import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OSMOSIS — THE MOVEMENT OF WATER ACROSS A MEMBRANE, AS ARITHMETIC. Osmosis is numbers: the pressure a solute exerts,
 *  the osmolarity of a solution, whether a cell is hyper- or hypotonic, the water potential that drives flow, the net
 *  flux through a membrane, how much a membrane reflects a solute, the concentration gradient, and whether two sides sit
 *  at equilibrium. Crosses to `biochemistry` — osmosis is the physical chemistry the cell runs on. A measure. */

const PROOF = 'osmosis arithmetic (osmotic pressure, osmolarity, tonicity, water potential, net flux, reflection coefficient, gradient, equilibrium); water across a membrane as number; a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'osmosis', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `osmosis.${name}`, params })

export class OsmosisFormulas {
  /** OSMOTIC PRESSURE: van't Hoff — the dissociation factor, the concentration, the temperature. value i · conc · temp. */
  static osmoticpressure(i: number, conc: number, temp: number): CrossFormula { return c('osmosis-osmoticpressure', 'osmoticpressure(i, conc, temp) = i · conc · temp', i * conc * temp, nat(i, conc, temp), 'osmoticpressure', [i, conc, temp]) }
  /** OSMOLARITY: osmotically active particles per unit volume. value ⌊particles / volume⌋. */
  static osmolarity(particles: number, volume: number): CrossFormula { return c('osmosis-osmolarity', 'osmolarity(particles, volume) = ⌊particles / volume⌋', volume > 0 ? Math.floor(particles / volume) : 0, nat(particles, volume) && volume > 0, 'osmolarity', [particles, volume]) }
  /** TONICITY: 1 when the inside concentration exceeds the outside (hypertonic). value [inside > outside]. */
  static tonicity(inside: number, outside: number): CrossFormula { return c('osmosis-tonicity', 'tonicity(inside, outside) = [inside > outside]', inside > outside ? 1 : 0, nat(inside, outside), 'tonicity', [inside, outside]) }
  /** WATER POTENTIAL: pressure potential minus solute potential. value max(0, pressure − solute). */
  static waterpotential(solute: number, pressure: number): CrossFormula { return c('osmosis-waterpotential', 'waterpotential(solute, pressure) = max(0, pressure − solute)', Math.max(0, pressure - solute), nat(solute, pressure), 'waterpotential', [solute, pressure]) }
  /** NET FLUX: the permeability coefficient over the area over the gradient. value coeff · area · gradient. */
  static netflux(coeff: number, area: number, gradient: number): CrossFormula { return c('osmosis-netflux', 'netflux(coeff, area, gradient) = coeff · area · gradient', coeff * area * gradient, nat(coeff, area, gradient), 'netflux', [coeff, area, gradient]) }
  /** REFLECTION COEFFICIENT: the fraction of solutes a membrane reflects, as a percentage. value ⌊solutes · 100 / pores⌋. */
  static reflectioncoeff(solutes: number, pores: number): CrossFormula { return c('osmosis-reflectioncoeff', 'reflectioncoeff(solutes, pores) = ⌊solutes · 100 / pores⌋', pores > 0 ? Math.floor((solutes * 100) / pores) : 0, nat(solutes, pores) && pores > 0, 'reflectioncoeff', [solutes, pores]) }
  /** GRADIENT: the concentration difference that drives flow. value max(0, high − low). */
  static gradient(high: number, low: number): CrossFormula { return c('osmosis-gradient', 'gradient(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low), 'gradient', [high, low]) }
  /** EQUILIBRIUM: 1 when the two sides sit at equal concentration. value [left = right]. */
  static equilibrium(left: number, right: number): CrossFormula { return c('osmosis-equilibrium', 'equilibrium(left, right) = [left = right]', left === right ? 1 : 0, nat(left, right), 'equilibrium', [left, right]) }
}

for (const name of ['equilibrium', 'gradient', 'netflux', 'osmolarity', 'osmoticpressure', 'reflectioncoeff', 'tonicity', 'waterpotential'] as const)
  hexRegisterOf('osmosis', name, (OsmosisFormulas[name] as (...x: unknown[]) => unknown).bind(OsmosisFormulas))
