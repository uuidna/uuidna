import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ZOOLOGY — ANIMAL POPULATIONS AS ARITHMETIC. The living count is numbers: net population change, density over range,
 *  metabolic demand, lifespan, fecundity per female, predation success, migration time, and the survival rate from birth.
 *  Crosses to `ecology` — zoology is what ecology counts. A measure. */

const PROOF = 'zoology arithmetic (population change, density, metabolism, lifespan, fecundity, predation, migration, survival); animal populations as counts; a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'zoology', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `zoology.${name}`, params })

export class ZoologyFormulas {
  /** POPULATION: net change, births over deaths, never below zero. value max(0, births − deaths). */
  static population(births: number, deaths: number): CrossFormula { return c('zoology-population', 'population(births, deaths) = max(0, births − deaths)', Math.max(0, births - deaths), nat(births, deaths), 'population', [births, deaths]) }
  /** DENSITY: individuals over the range they hold. value ⌊count / area⌋. */
  static density(count: number, area: number): CrossFormula { return c('zoology-density', 'density(count, area) = ⌊count / area⌋', area > 0 ? Math.floor(count / area) : 0, nat(count, area) && area > 0, 'density', [count, area]) }
  /** METABOLISM: demand at a per-mass rate. value mass · rate. */
  static metabolism(mass: number, rate: number): CrossFormula { return c('zoology-metabolism', 'metabolism(mass, rate) = mass · rate', mass * rate, nat(mass, rate), 'metabolism', [mass, rate]) }
  /** LIFESPAN: years lived. value years. */
  static lifespan(years: number): CrossFormula { return c('zoology-lifespan', 'lifespan(years) = years', years, nat(years), 'lifespan', [years]) }
  /** FECUNDITY: offspring per female. value ⌊offspring / females⌋. */
  static fecundity(offspring: number, females: number): CrossFormula { return c('zoology-fecundity', 'fecundity(offspring, females) = ⌊offspring / females⌋', females > 0 ? Math.floor(offspring / females) : 0, nat(offspring, females) && females > 0, 'fecundity', [offspring, females]) }
  /** PREDATION: hunting success as a percentage. value ⌊caught · 100 / encountered⌋. */
  static predation(caught: number, encountered: number): CrossFormula { return c('zoology-predation', 'predation(caught, encountered) = ⌊caught · 100 / encountered⌋', encountered > 0 ? Math.floor((caught * 100) / encountered) : 0, nat(caught, encountered) && encountered > 0 && caught <= encountered, 'predation', [caught, encountered]) }
  /** MIGRATION: time to cross a distance at a speed. value ⌊distance / speed⌋. */
  static migration(distance: number, speed: number): CrossFormula { return c('zoology-migration', 'migration(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'migration', [distance, speed]) }
  /** SURVIVAL: the share alive from birth, as a percentage. value ⌊alive · 100 / born⌋. */
  static survival(alive: number, born: number): CrossFormula { return c('zoology-survival', 'survival(alive, born) = ⌊alive · 100 / born⌋', born > 0 ? Math.floor((alive * 100) / born) : 0, nat(alive, born) && born > 0 && alive <= born, 'survival', [alive, born]) }
}

for (const name of ['density', 'fecundity', 'lifespan', 'metabolism', 'migration', 'population', 'predation', 'survival'] as const)
  hexRegisterOf('zoology', name, (ZoologyFormulas[name] as (...x: unknown[]) => unknown).bind(ZoologyFormulas))
