import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SEDIMENTOLOGY — THE MAKING OF SEDIMENT, AS ARITHMETIC. A clast is numbers: its mean grain diameter, how well the grains
 *  are sorted, how rounded they are, how fast one settles, how much pore space is left, the load a flow carries, the bedform
 *  regime, and the compositional maturity of the grain population. Crosses to `geomorphology` — sediment is what shapes the
 *  land. A measure. */

const PROOF = 'sedimentology arithmetic (mean grain size, sorting, roundness, settling velocity, porosity, sediment load, bedform regime, maturity); grains made and moved; a measure crossed to geomorphology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sedimentology', dst: 'geomorphology', formula, value, proof: PROOF, ...extra }, holds, { name: `sedimentology.${name}`, params })

export class SedimentologyFormulas {
  /** MEAN GRAIN SIZE: the midpoint of the coarse and fine bounds, in microns. value ⌊(coarse + fine) / 2⌋. */
  static grainsize(coarse: number, fine: number): CrossFormula { return c('sedimentology-grainsize', 'grainsize(coarse, fine) = ⌊(coarse + fine) / 2⌋', Math.floor((coarse + fine) / 2), nat(coarse, fine), 'grainsize', [coarse, fine]) }
  /** SORTING: the spread between the largest and smallest grain. value max(0, hi − lo). */
  static sorting(hi: number, lo: number): CrossFormula { return c('sedimentology-sorting', 'sorting(hi, lo) = max(0, hi − lo)', Math.max(0, hi - lo), nat(hi, lo), 'sorting', [hi, lo]) }
  /** ROUNDNESS: the share of grains counted as rounded. value ⌊rounded · 100 / total⌋. */
  static roundness(rounded: number, total: number): CrossFormula { return c('sedimentology-roundness', 'roundness(rounded, total) = ⌊rounded · 100 / total⌋', total > 0 ? Math.floor((rounded * 100) / total) : 0, nat(rounded, total) && total > 0 && rounded <= total, 'roundness', [rounded, total]) }
  /** SETTLING VELOCITY: Stokes' law, falling as diameter² over the fluid viscosity. value ⌊diameter · diameter / viscosity⌋. */
  static settlingvelocity(diameter: number, viscosity: number): CrossFormula { return c('sedimentology-settlingvelocity', 'settlingvelocity(diameter, viscosity) = ⌊diameter · diameter / viscosity⌋', viscosity > 0 ? Math.floor((diameter * diameter) / viscosity) : 0, nat(diameter, viscosity) && viscosity > 0, 'settlingvelocity', [diameter, viscosity]) }
  /** POROSITY: the void space as a percentage of the bulk volume. value ⌊voids · 100 / bulk⌋. */
  static porosity(voids: number, bulk: number): CrossFormula { return c('sedimentology-porosity', 'porosity(voids, bulk) = ⌊voids · 100 / bulk⌋', bulk > 0 ? Math.floor((voids * 100) / bulk) : 0, nat(voids, bulk) && bulk > 0 && voids <= bulk, 'porosity', [voids, bulk]) }
  /** SEDIMENT LOAD: the mass a flow carries, concentration times discharge. value concentration · discharge. */
  static sedimentload(concentration: number, discharge: number): CrossFormula { return c('sedimentology-sedimentload', 'sedimentload(concentration, discharge) = concentration · discharge', concentration * discharge, nat(concentration, discharge), 'sedimentload', [concentration, discharge]) }
  /** BEDFORM: the flow regime index, velocity over depth. value ⌊velocity / depth⌋. */
  static bedform(velocity: number, depth: number): CrossFormula { return c('sedimentology-bedform', 'bedform(velocity, depth) = ⌊velocity / depth⌋', depth > 0 ? Math.floor(velocity / depth) : 0, nat(velocity, depth) && depth > 0, 'bedform', [velocity, depth]) }
  /** MATURITY: the quartz share of the quartz-plus-feldspar population. value ⌊quartz · 100 / (quartz + feldspar)⌋. */
  static maturity(quartz: number, feldspar: number): CrossFormula { return c('sedimentology-maturity', 'maturity(quartz, feldspar) = ⌊quartz · 100 / (quartz + feldspar)⌋', (quartz + feldspar) > 0 ? Math.floor((quartz * 100) / (quartz + feldspar)) : 0, nat(quartz, feldspar) && (quartz + feldspar) > 0, 'maturity', [quartz, feldspar]) }
}

for (const name of ['bedform', 'grainsize', 'maturity', 'porosity', 'roundness', 'sedimentload', 'settlingvelocity', 'sorting'] as const)
  hexRegisterOf('sedimentology', name, (SedimentologyFormulas[name] as (...x: unknown[]) => unknown).bind(SedimentologyFormulas))
