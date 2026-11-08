import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOCIOLOGY — SOCIAL SCIENCE, AS ARITHMETIC. Society is numbers: how unequal a share is, how many move between strata,
 *  how dense a network is, how tightly a group holds together, how segregated an area is, how many take part, how far an
 *  idea has spread, and how big a cohort is. Crosses to `econ` — society priced is economics. A measure. */

const PROOF = 'sociology arithmetic (gini, mobility, network density, cohesion, segregation, participation, diffusion, cohort); social science as integers; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sociology', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `sociology.${name}`, params })

export class SociologyFormulas {
  /** GINI PROXY: the top share's percentage of the total — an inequality proxy. value ⌊top · 100 / total⌋. */
  static gini(top: number, total: number): CrossFormula { return c('sociology-gini', 'gini(top, total) = ⌊top · 100 / total⌋', total > 0 ? Math.floor((top * 100) / total) : 0, nat(top, total) && total > 0 && top <= total, 'gini', [top, total]) }
  /** MOBILITY: those who moved strata as a percentage of the cohort. value ⌊moved · 100 / cohort⌋. */
  static mobility(moved: number, cohort: number): CrossFormula { return c('sociology-mobility', 'mobility(moved, cohort) = ⌊moved · 100 / cohort⌋', cohort > 0 ? Math.floor((moved * 100) / cohort) : 0, nat(moved, cohort) && cohort > 0 && moved <= cohort, 'mobility', [moved, cohort]) }
  /** NETWORK DENSITY (×100): edges over the possible pairs. value nodes > 1 ? ⌊edges · 200 / (nodes · (nodes − 1))⌋ : 0. */
  static network(nodes: number, edges: number): CrossFormula { return c('sociology-network', 'network(nodes, edges) = ⌊edges · 200 / (nodes · (nodes − 1))⌋', nodes > 1 ? Math.floor((edges * 200) / (nodes * (nodes - 1))) : 0, nat(nodes, edges) && nodes > 1, 'network', [nodes, edges]) }
  /** COHESION: ties per member. value ⌊ties / members⌋. */
  static cohesion(ties: number, members: number): CrossFormula { return c('sociology-cohesion', 'cohesion(ties, members) = ⌊ties / members⌋', members > 0 ? Math.floor(ties / members) : 0, nat(ties, members) && members > 0, 'cohesion', [ties, members]) }
  /** SEGREGATION: a group's percentage of an area. value ⌊group · 100 / area⌋. */
  static segregation(group: number, area: number): CrossFormula { return c('sociology-segregation', 'segregation(group, area) = ⌊group · 100 / area⌋', area > 0 ? Math.floor((group * 100) / area) : 0, nat(group, area) && area > 0 && group <= area, 'segregation', [group, area]) }
  /** PARTICIPATION: active over eligible, as a percentage. value ⌊active · 100 / eligible⌋. */
  static participation(active: number, eligible: number): CrossFormula { return c('sociology-participation', 'participation(active, eligible) = ⌊active · 100 / eligible⌋', eligible > 0 ? Math.floor((active * 100) / eligible) : 0, nat(active, eligible) && eligible > 0 && active <= eligible, 'participation', [active, eligible]) }
  /** DIFFUSION: adopters over the population, as a percentage. value ⌊adopters · 100 / population⌋. */
  static diffusion(adopters: number, population: number): CrossFormula { return c('sociology-diffusion', 'diffusion(adopters, population) = ⌊adopters · 100 / population⌋', population > 0 ? Math.floor((adopters * 100) / population) : 0, nat(adopters, population) && population > 0 && adopters <= population, 'diffusion', [adopters, population]) }
  /** COHORT: the cohort's size. value size. */
  static cohort(size: number): CrossFormula { return c('sociology-cohort', 'cohort(size) = size', size, nat(size), 'cohort', [size]) }
}

for (const name of ['cohesion', 'cohort', 'diffusion', 'gini', 'mobility', 'network', 'participation', 'segregation'] as const)
  hexRegisterOf('sociology', name, (SociologyFormulas[name] as (...x: unknown[]) => unknown).bind(SociologyFormulas))
