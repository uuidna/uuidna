import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SAMPLING — DRAWING A FEW TO KNOW THE MANY, AS ARITHMETIC. A survey is numbers: how many to draw, the margin of error, the
 *  standard error, how a stratum is allocated, how many clusters, the systematic interval, the design weight, and the finite
 *  population correction. Crosses to `probability` — a sample is a draw, and probability is what it estimates. A measure. */

const PROOF = 'sampling arithmetic (sample size, margin of error, standard error, stratum allocation, clusters, systematic interval, design weight, finite correction); a measure crossed to probability'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sampling', dst: 'probability', formula, value, proof: PROOF, ...extra }, holds, { name: `sampling.${name}`, params })

export class SamplingFormulas {
  /** SAMPLE SIZE: a percentage of the population drawn. value ⌊pop · rate / 100⌋. */
  static samplesize(pop: number, rate: number): CrossFormula { return c('sampling-samplesize', 'samplesize(pop, rate) = ⌊pop · rate / 100⌋', Math.floor((pop * rate) / 100), nat(pop, rate) && rate <= 100, 'samplesize', [pop, rate]) }
  /** MARGIN OF ERROR: the z-score times the standard error. value z · se. */
  static marginoferror(z: number, se: number): CrossFormula { return c('sampling-marginoferror', 'marginoferror(z, se) = z · se', z * se, nat(z, se), 'marginoferror', [z, se]) }
  /** STANDARD ERROR: the spread over the root of the count. value ⌊sd / root⌋. */
  static standarderror(sd: number, root: number): CrossFormula { return c('sampling-standarderror', 'standarderror(sd, root) = ⌊sd / root⌋', root > 0 ? Math.floor(sd / root) : 0, nat(sd, root) && root > 0, 'standarderror', [sd, root]) }
  /** STRATUM ALLOCATION: the per-stratum share, rounded up. value ⌈total / strata⌉. */
  static stratum(total: number, strata: number): CrossFormula { return c('sampling-stratum', 'stratum(total, strata) = ⌈total / strata⌉', strata > 0 ? Math.ceil(total / strata) : 0, nat(total, strata) && strata > 0, 'stratum', [total, strata]) }
  /** CLUSTERS: whole clusters at a size each. value ⌊units / perCluster⌋. */
  static cluster(units: number, perCluster: number): CrossFormula { return c('sampling-cluster', 'cluster(units, perCluster) = ⌊units / perCluster⌋', perCluster > 0 ? Math.floor(units / perCluster) : 0, nat(units, perCluster) && perCluster > 0, 'cluster', [units, perCluster]) }
  /** SYSTEMATIC: the sampling interval k. value ⌊pop / sample⌋. */
  static systematic(pop: number, sample: number): CrossFormula { return c('sampling-systematic', 'systematic(pop, sample) = ⌊pop / sample⌋', sample > 0 ? Math.floor(pop / sample) : 0, nat(pop, sample) && sample > 0, 'systematic', [pop, sample]) }
  /** DESIGN WEIGHT: the inverse-probability weight, per thousand. value ⌊pop · 1000 / sample⌋. */
  static weight(pop: number, sample: number): CrossFormula { return c('sampling-weight', 'weight(pop, sample) = ⌊pop · 1000 / sample⌋', sample > 0 ? Math.floor((pop * 1000) / sample) : 0, nat(pop, sample) && sample > 0, 'weight', [pop, sample]) }
  /** FINITE POPULATION CORRECTION: the fraction not sampled, as a percentage. value ⌊(pop − sample) · 100 / pop⌋. */
  static finitecorrection(pop: number, sample: number): CrossFormula { return c('sampling-finitecorrection', 'finitecorrection(pop, sample) = ⌊(pop − sample) · 100 / pop⌋', pop > 0 ? Math.floor((Math.max(0, pop - sample) * 100) / pop) : 0, nat(pop, sample) && pop > 0 && sample <= pop, 'finitecorrection', [pop, sample]) }
}

for (const name of ['cluster', 'finitecorrection', 'marginoferror', 'samplesize', 'standarderror', 'stratum', 'systematic', 'weight'] as const)
  hexRegisterOf('sampling', name, (SamplingFormulas[name] as (...x: unknown[]) => unknown).bind(SamplingFormulas))
