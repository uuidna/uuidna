import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MITOSIS — CELL DIVISION AS ARITHMETIC. A dividing population is numbers: cells after a run of doublings, generations in a
 *  span of time, the length of a cycle from its phases, the fraction of the cycle a phase takes, time per doubling, chromosomes
 *  carried by the population, the growth fraction and the mitotic index. Crosses to `genetics` — mitosis is what carries the
 *  genome from one cell to two. A measure. */

const PROOF = 'mitosis arithmetic (cell count by doublings, generations, cycle length, phase fraction, doubling time, chromosomes, growth fraction, mitotic index); cell division crossed to genetics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mitosis', dst: 'genetics', formula, value, proof: PROOF, ...extra }, holds, { name: `mitosis.${name}`, params })

export class MitosisFormulas {
  /** CELL COUNT: an initial population after a run of doublings. value initial · 2^gens. */
  static cellcount(initial: number, gens: number): CrossFormula { return c('mitosis-cellcount', 'cellcount(initial, gens) = initial · 2^gens', initial * 2 ** gens, nat(initial, gens), 'cellcount', [initial, gens]) }
  /** CHROMOSOMES: the chromosomes a population carries at a count per cell. value cells · diploid. */
  static chromosomes(cells: number, diploid: number): CrossFormula { return c('mitosis-chromosomes', 'chromosomes(cells, diploid) = cells · diploid', cells * diploid, nat(cells, diploid), 'chromosomes', [cells, diploid]) }
  /** CYCLE LENGTH: the cell cycle as the sum of its phases (G1, S, G2M). value g1 + s + g2m. */
  static cyclelength(g1: number, s: number, g2m: number): CrossFormula { return c('mitosis-cyclelength', 'cyclelength(g1, s, g2m) = g1 + s + g2m', g1 + s + g2m, nat(g1, s, g2m), 'cyclelength', [g1, s, g2m]) }
  /** DOUBLING TIME: time over the doublings observed. value ⌊time / doublings⌋. */
  static doublingtime(time: number, doublings: number): CrossFormula { return c('mitosis-doublingtime', 'doublingtime(time, doublings) = ⌊time / doublings⌋', doublings > 0 ? Math.floor(time / doublings) : 0, nat(time, doublings) && doublings > 0, 'doublingtime', [time, doublings]) }
  /** GENERATIONS: the divisions a span of time allows at a cycle length. value ⌊hours / cycle⌋. */
  static generations(hours: number, cycle: number): CrossFormula { return c('mitosis-generations', 'generations(hours, cycle) = ⌊hours / cycle⌋', cycle > 0 ? Math.floor(hours / cycle) : 0, nat(hours, cycle) && cycle > 0, 'generations', [hours, cycle]) }
  /** GROWTH FRACTION: the cycling cells as a percentage of the population. value ⌊cycling · 100 / total⌋. */
  static growthfraction(cycling: number, total: number): CrossFormula { return c('mitosis-growthfraction', 'growthfraction(cycling, total) = ⌊cycling · 100 / total⌋', total > 0 ? Math.floor((cycling * 100) / total) : 0, nat(cycling, total) && total > 0 && cycling <= total, 'growthfraction', [cycling, total]) }
  /** MITOTIC INDEX: the cells in mitosis as a percentage of the population. value ⌊mitotic · 100 / total⌋. */
  static mitoticindex(mitotic: number, total: number): CrossFormula { return c('mitosis-mitoticindex', 'mitoticindex(mitotic, total) = ⌊mitotic · 100 / total⌋', total > 0 ? Math.floor((mitotic * 100) / total) : 0, nat(mitotic, total) && total > 0 && mitotic <= total, 'mitoticindex', [mitotic, total]) }
  /** PHASE FRACTION: a phase as a percentage of the cycle. value ⌊phase · 100 / cycle⌋. */
  static phasefraction(phase: number, cycle: number): CrossFormula { return c('mitosis-phasefraction', 'phasefraction(phase, cycle) = ⌊phase · 100 / cycle⌋', cycle > 0 ? Math.floor((phase * 100) / cycle) : 0, nat(phase, cycle) && cycle > 0 && phase <= cycle, 'phasefraction', [phase, cycle]) }
}

for (const name of ['cellcount', 'chromosomes', 'cyclelength', 'doublingtime', 'generations', 'growthfraction', 'mitoticindex', 'phasefraction'] as const)
  hexRegisterOf('mitosis', name, (MitosisFormulas[name] as (...x: unknown[]) => unknown).bind(MitosisFormulas))
