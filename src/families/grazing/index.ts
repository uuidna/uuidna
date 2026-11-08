import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GRAZING — MANAGED PASTURE AS ARITHMETIC. Running a herd on land is numbers: the stocking rate per hectare, the land's
 *  carrying capacity, how much forage is used, the rest a paddock gets, animal units by weight, the days a pasture lasts,
 *  dry-matter intake, and the length of a rotation cycle. Crosses to `ecology` — grazing is what ecology sustains. A measure. */

const PROOF = 'grazing arithmetic (stocking rate, carrying capacity, forage utilization, rest period, animal units, pasture days, dry-matter intake, rotation cycle); managed pasture as a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'grazing', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `grazing.${name}`, params })

export class GrazingFormulas {
  /** STOCKING RATE: animals per unit area. value ⌊animals / area⌋. */
  static stockingrate(animals: number, area: number): CrossFormula { return c('grazing-stockingrate', 'stockingrate(animals, area) = ⌊animals / area⌋', area > 0 ? Math.floor(animals / area) : 0, nat(animals, area) && area > 0, 'stockingrate', [animals, area]) }
  /** CARRYING CAPACITY: animals the forage can feed at a per-animal demand. value ⌊forage / demand⌋. */
  static carryingcapacity(forage: number, demand: number): CrossFormula { return c('grazing-carryingcapacity', 'carryingcapacity(forage, demand) = ⌊forage / demand⌋', demand > 0 ? Math.floor(forage / demand) : 0, nat(forage, demand) && demand > 0, 'carryingcapacity', [forage, demand]) }
  /** FORAGE UTILIZATION as a percentage. value ⌊grazed · 100 / available⌋. */
  static forageutilization(grazed: number, available: number): CrossFormula { return c('grazing-forageutilization', 'forageutilization(grazed, available) = ⌊grazed · 100 / available⌋', available > 0 ? Math.floor((grazed * 100) / available) : 0, nat(grazed, available) && available > 0 && grazed <= available, 'forageutilization', [grazed, available]) }
  /** REST PERIOD: the days a paddock rests out of a cycle after grazing. value max(0, cycle − graze). */
  static restperiod(cycle: number, graze: number): CrossFormula { return c('grazing-restperiod', 'restperiod(cycle, graze) = max(0, cycle − graze)', Math.max(0, cycle - graze), nat(cycle, graze), 'restperiod', [cycle, graze]) }
  /** ANIMAL UNITS: head at an average weight, one unit per 1000 lb. value ⌊head · weight / 1000⌋. */
  static animalunits(head: number, weight: number): CrossFormula { return c('grazing-animalunits', 'animalunits(head, weight) = ⌊head · weight / 1000⌋', Math.floor((head * weight) / 1000), nat(head, weight), 'animalunits', [head, weight]) }
  /** PASTURE DAYS: the days a forage stock lasts at a daily intake. value ⌊forage / intake⌋. */
  static pasturedays(forage: number, intake: number): CrossFormula { return c('grazing-pasturedays', 'pasturedays(forage, intake) = ⌊forage / intake⌋', intake > 0 ? Math.floor(forage / intake) : 0, nat(forage, intake) && intake > 0, 'pasturedays', [forage, intake]) }
  /** DRY-MATTER INTAKE: a share of body weight per day. value ⌊weight · pct / 100⌋. */
  static dmintake(weight: number, pct: number): CrossFormula { return c('grazing-dmintake', 'dmintake(weight, pct) = ⌊weight · pct / 100⌋', Math.floor((weight * pct) / 100), nat(weight, pct) && pct <= 100, 'dmintake', [weight, pct]) }
  /** ROTATION CYCLE: the paddocks of a rotation at days each. value paddocks · days. */
  static rotationcycle(paddocks: number, days: number): CrossFormula { return c('grazing-rotationcycle', 'rotationcycle(paddocks, days) = paddocks · days', paddocks * days, nat(paddocks, days), 'rotationcycle', [paddocks, days]) }
}

for (const name of ['animalunits', 'carryingcapacity', 'dmintake', 'forageutilization', 'pasturedays', 'restperiod', 'rotationcycle', 'stockingrate'] as const)
  hexRegisterOf('grazing', name, (GrazingFormulas[name] as (...x: unknown[]) => unknown).bind(GrazingFormulas))
