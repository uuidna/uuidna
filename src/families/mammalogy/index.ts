import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MAMMALOGY — THE STUDY OF MAMMALS, AS ARITHMETIC. A mammal's life is numbers: how long it carries young, how fast it burns
 *  energy, the ground one animal ranges over, the young per birth, milk over the days nursed, how many share a territory, the
 *  gap from body heat to the air, and how many of the born survive. Crosses to `zoology` — mammalogy is one of its branches. A measure. */

const PROOF = 'mammalogy arithmetic (gestation, metabolism, home range, litter, lactation, territory, thermoneutral gap, survival); a branch of zoology; a measure crossed to zoology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mammalogy', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name: `mammalogy.${name}`, params })

export class MammalogyFormulas {
  /** GESTATION: the days a mammal carries young. value days. */
  static gestation(days: number): CrossFormula { return c('mammalogy-gestation', 'gestation(days) = days', days, nat(days), 'gestation', [days]) }
  /** METABOLISM: basal rate proxy as mass at a factor. value mass · factor. */
  static metabolism(mass: number, factor: number): CrossFormula { return c('mammalogy-metabolism', 'metabolism(mass, factor) = mass · factor', mass * factor, nat(mass, factor), 'metabolism', [mass, factor]) }
  /** HOME RANGE: the ground a mammal covers as mass at a factor. value mass · factor. */
  static homerange(mass: number, factor: number): CrossFormula { return c('mammalogy-homerange', 'homerange(mass, factor) = mass · factor', mass * factor, nat(mass, factor), 'homerange', [mass, factor]) }
  /** LITTER: young per birth. value ⌊offspring / births⌋. */
  static litter(offspring: number, births: number): CrossFormula { return c('mammalogy-litter', 'litter(offspring, births) = ⌊offspring / births⌋', births > 0 ? Math.floor(offspring / births) : 0, nat(offspring, births) && births > 0, 'litter', [offspring, births]) }
  /** LACTATION: milk over the days nursed. value ⌊milk / days⌋. */
  static lactation(milk: number, days: number): CrossFormula { return c('mammalogy-lactation', 'lactation(milk, days) = ⌊milk / days⌋', days > 0 ? Math.floor(milk / days) : 0, nat(milk, days) && days > 0, 'lactation', [milk, days]) }
  /** TERRITORY: individuals over the area they share. value ⌊individuals / area⌋. */
  static territory(individuals: number, area: number): CrossFormula { return c('mammalogy-territory', 'territory(individuals, area) = ⌊individuals / area⌋', area > 0 ? Math.floor(individuals / area) : 0, nat(individuals, area) && area > 0, 'territory', [individuals, area]) }
  /** THERMONEUTRAL: the gap from body heat to the air. value max(0, body − ambient). */
  static thermoneutral(body: number, ambient: number): CrossFormula { return c('mammalogy-thermoneutral', 'thermoneutral(body, ambient) = max(0, body − ambient)', Math.max(0, body - ambient), nat(body, ambient), 'thermoneutral', [body, ambient]) }
  /** SURVIVAL as a percentage of the born. value ⌊surviving · 100 / born⌋. */
  static survival(surviving: number, born: number): CrossFormula { return c('mammalogy-survival', 'survival(surviving, born) = ⌊surviving · 100 / born⌋', born > 0 ? Math.floor((surviving * 100) / born) : 0, nat(surviving, born) && born > 0 && surviving <= born, 'survival', [surviving, born]) }
}

for (const name of ['gestation', 'homerange', 'lactation', 'litter', 'metabolism', 'survival', 'territory', 'thermoneutral'] as const)
  hexRegisterOf('mammalogy', name, (MammalogyFormulas[name] as (...x: unknown[]) => unknown).bind(MammalogyFormulas))
