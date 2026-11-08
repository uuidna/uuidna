import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ECOLOGY — ECOSYSTEMS AND BIODIVERSITY, AS ARITHMETIC. Life in a place is numbers: a population's net change, how
 *  densely it packs an area, how diverse the species are, how many the land can carry, biomass, predator pressure, how
 *  much habitat is protected, and the energy left a trophic level up. Crosses to `environment` — ecology is life read
 *  against the environment it lives in. A measure. */

const PROOF = 'ecology arithmetic (population, density, diversity, carrying capacity, biomass, predation, habitat, trophic energy); ecosystems and biodiversity as a measure crossed to environment'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ecology', dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `ecology.${name}`, params })

export class EcologyFormulas {
  /** POPULATION: net change, births less deaths. value births − deaths (may be negative). */
  static population(births: number, deaths: number): CrossFormula { return c('ecology-population', 'population(births, deaths) = births − deaths', births - deaths, nat(births, deaths), 'population', [births, deaths]) }
  /** DENSITY: individuals over the area they occupy. value ⌊count / area⌋. */
  static density(count: number, area: number): CrossFormula { return c('ecology-density', 'density(count, area) = ⌊count / area⌋', area > 0 ? Math.floor(count / area) : 0, nat(count, area) && area > 0, 'density', [count, area]) }
  /** DIVERSITY: species as a percentage of the total counted. value ⌊species · 100 / total⌋. */
  static diversity(species: number, total: number): CrossFormula { return c('ecology-diversity', 'diversity(species, total) = ⌊species · 100 / total⌋', total > 0 ? Math.floor((species * 100) / total) : 0, nat(species, total) && total > 0 && species <= total, 'diversity', [species, total]) }
  /** CARRYING CAPACITY: how many the resources sustain at a per-individual need. value ⌊resources / perIndividual⌋. */
  static carrying(resources: number, perIndividual: number): CrossFormula { return c('ecology-carrying', 'carrying(resources, perIndividual) = ⌊resources / perIndividual⌋', perIndividual > 0 ? Math.floor(resources / perIndividual) : 0, nat(resources, perIndividual) && perIndividual > 0, 'carrying', [resources, perIndividual]) }
  /** BIOMASS: individuals at a mass each. value individuals · mass. */
  static biomass(individuals: number, mass: number): CrossFormula { return c('ecology-biomass', 'biomass(individuals, mass) = individuals · mass', individuals * mass, nat(individuals, mass), 'biomass', [individuals, mass]) }
  /** PREDATION: prey available per predator. value ⌊prey / predators⌋. */
  static predation(prey: number, predators: number): CrossFormula { return c('ecology-predation', 'predation(prey, predators) = ⌊prey / predators⌋', predators > 0 ? Math.floor(prey / predators) : 0, nat(prey, predators) && predators > 0, 'predation', [prey, predators]) }
  /** HABITAT: protected land as a percentage of the total. value ⌊protected · 100 / total⌋. */
  static habitat(protectedArea: number, total: number): CrossFormula { return c('ecology-habitat', 'habitat(protected, total) = ⌊protected · 100 / total⌋', total > 0 ? Math.floor((protectedArea * 100) / total) : 0, nat(protectedArea, total) && total > 0 && protectedArea <= total, 'habitat', [protectedArea, total]) }
  /** TROPHIC: energy left a level up, the 10% rule as a proxy. value ⌊energy / level⌋. */
  static trophic(energy: number, level: number): CrossFormula { return c('ecology-trophic', 'trophic(energy, level) = ⌊energy / level⌋', level > 0 ? Math.floor(energy / level) : 0, nat(energy, level) && level > 0, 'trophic', [energy, level]) }
}

for (const name of ['biomass', 'carrying', 'density', 'diversity', 'habitat', 'population', 'predation', 'trophic'] as const)
  hexRegisterOf('ecology', name, (EcologyFormulas[name] as (...x: unknown[]) => unknown).bind(EcologyFormulas))
