import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENTOMOLOGY — THE STUDY OF INSECTS, AS ARITHMETIC. Colonies are counted: workers plus queens, the stages of a
 *  metamorphosis, the swarm packed into an area, what a forager brings back per trip, the share of a crop infested or
 *  pollinated, the fraction of eggs that hatch, and the beats a wing makes each second. Crosses to `ecology` — insects
 *  are what an ecology lives on. A measure. */

const PROOF = 'entomology arithmetic (colony headcount, metamorphosis stages, swarm density, foraging yield, infestation, pollination, lifecycle hatch, wingbeat); a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'entomology', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `entomology.${name}`, params })

export class EntomologyFormulas {
  /** COLONY: the headcount of workers and queens. value workers + queens. */
  static colony(workers: number, queens: number): CrossFormula { return c('entomology-colony', 'colony(workers, queens) = workers + queens', workers + queens, nat(workers, queens), 'colony', [workers, queens]) }
  /** METAMORPHOSIS: the number of stages. value stages. */
  static metamorphosis(stages: number): CrossFormula { return c('entomology-metamorphosis', 'metamorphosis(stages) = stages', stages, nat(stages), 'metamorphosis', [stages]) }
  /** SWARM density: individuals over an area. value ⌊individuals / area⌋. */
  static swarm(individuals: number, area: number): CrossFormula { return c('entomology-swarm', 'swarm(individuals, area) = ⌊individuals / area⌋', area > 0 ? Math.floor(individuals / area) : 0, nat(individuals, area) && area > 0, 'swarm', [individuals, area]) }
  /** FORAGING: what is collected per trip. value ⌊collected / trips⌋. */
  static foraging(collected: number, trips: number): CrossFormula { return c('entomology-foraging', 'foraging(collected, trips) = ⌊collected / trips⌋', trips > 0 ? Math.floor(collected / trips) : 0, nat(collected, trips) && trips > 0, 'foraging', [collected, trips]) }
  /** INFESTATION as a percentage. value ⌊infested · 100 / total⌋. */
  static infestation(infested: number, total: number): CrossFormula { return c('entomology-infestation', 'infestation(infested, total) = ⌊infested · 100 / total⌋', total > 0 ? Math.floor((infested * 100) / total) : 0, nat(infested, total) && total > 0 && infested <= total, 'infestation', [infested, total]) }
  /** POLLINATION as a percentage. value ⌊visited · 100 / flowers⌋. */
  static pollination(visited: number, flowers: number): CrossFormula { return c('entomology-pollination', 'pollination(visited, flowers) = ⌊visited · 100 / flowers⌋', flowers > 0 ? Math.floor((visited * 100) / flowers) : 0, nat(visited, flowers) && flowers > 0 && visited <= flowers, 'pollination', [visited, flowers]) }
  /** LIFECYCLE: the share of eggs that hatch. value ⌊hatched · 100 / eggs⌋. */
  static lifecycle(eggs: number, hatched: number): CrossFormula { return c('entomology-lifecycle', 'lifecycle(eggs, hatched) = ⌊hatched · 100 / eggs⌋', eggs > 0 ? Math.floor((hatched * 100) / eggs) : 0, nat(eggs, hatched) && eggs > 0 && hatched <= eggs, 'lifecycle', [eggs, hatched]) }
  /** WINGBEAT: beats over seconds. value ⌊beats / seconds⌋. */
  static wingbeat(beats: number, seconds: number): CrossFormula { return c('entomology-wingbeat', 'wingbeat(beats, seconds) = ⌊beats / seconds⌋', seconds > 0 ? Math.floor(beats / seconds) : 0, nat(beats, seconds) && seconds > 0, 'wingbeat', [beats, seconds]) }
}

for (const name of ['colony', 'foraging', 'infestation', 'lifecycle', 'metamorphosis', 'pollination', 'swarm', 'wingbeat'] as const)
  hexRegisterOf('entomology', name, (EntomologyFormulas[name] as (...x: unknown[]) => unknown).bind(EntomologyFormulas))
