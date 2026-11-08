import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HERPETOLOGY — THE STUDY OF REPTILES AND AMPHIBIANS, AS ARITHMETIC. Cold-blooded life is numbers: heat carried over
 *  ambient, venom potency by body mass, eggs per female, days to hatch, metabolism by temperature, growth over a season,
 *  the share of a clutch that survives, and scales per row. Crosses to `zoology` — herpetology is a branch of it. A measure. */

const PROOF = 'herpetology arithmetic (thermoregulation, venom LD50 proxy, clutch, incubation, metabolism, growth, survival, scalation); a branch of zoology, a measure crossed to zoology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'herpetology', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name: `herpetology.${name}`, params })

export class HerpetologyFormulas {
  /** THERMOREGULATION: body heat carried over ambient. value max(0, body − ambient). */
  static thermoregulation(body: number, ambient: number): CrossFormula { return c('herpetology-thermoregulation', 'thermoregulation(body, ambient) = max(0, body − ambient)', Math.max(0, body - ambient), nat(body, ambient), 'thermoregulation', [body, ambient]) }
  /** VENOM: an LD50 proxy, dose per unit mass scaled by a thousand. value ⌊dose · 1000 / mass⌋. */
  static venom(dose: number, mass: number): CrossFormula { return c('herpetology-venom', 'venom(dose, mass) = ⌊dose · 1000 / mass⌋', mass > 0 ? Math.floor((dose * 1000) / mass) : 0, nat(dose, mass) && mass > 0, 'venom', [dose, mass]) }
  /** CLUTCH: eggs per female. value ⌊eggs / females⌋. */
  static clutch(eggs: number, females: number): CrossFormula { return c('herpetology-clutch', 'clutch(eggs, females) = ⌊eggs / females⌋', females > 0 ? Math.floor(eggs / females) : 0, nat(eggs, females) && females > 0, 'clutch', [eggs, females]) }
  /** INCUBATION: the days to hatch. value days. */
  static incubation(days: number): CrossFormula { return c('herpetology-incubation', 'incubation(days) = days', days, nat(days), 'incubation', [days]) }
  /** METABOLISM: mass per degree of temperature. value ⌊mass / temperature⌋. */
  static metabolism(mass: number, temperature: number): CrossFormula { return c('herpetology-metabolism', 'metabolism(mass, temperature) = ⌊mass / temperature⌋', temperature > 0 ? Math.floor(mass / temperature) : 0, nat(mass, temperature) && temperature > 0, 'metabolism', [mass, temperature]) }
  /** GROWTH over a season: length gained. value max(0, final − initial). */
  static growth(grown: number, initial: number): CrossFormula { return c('herpetology-growth', 'growth(final, initial) = max(0, final − initial)', Math.max(0, grown - initial), nat(grown, initial), 'growth', [grown, initial]) }
  /** SURVIVAL: the share of a clutch that hatches, as a percentage. value ⌊hatched · 100 / eggs⌋. */
  static survival(hatched: number, eggs: number): CrossFormula { return c('herpetology-survival', 'survival(hatched, eggs) = ⌊hatched · 100 / eggs⌋', eggs > 0 ? Math.floor((hatched * 100) / eggs) : 0, nat(hatched, eggs) && eggs > 0 && hatched <= eggs, 'survival', [hatched, eggs]) }
  /** SCALATION: scales per row. value ⌊scales / rows⌋. */
  static scalation(scales: number, rows: number): CrossFormula { return c('herpetology-scalation', 'scalation(scales, rows) = ⌊scales / rows⌋', rows > 0 ? Math.floor(scales / rows) : 0, nat(scales, rows) && rows > 0, 'scalation', [scales, rows]) }
}

for (const name of ['clutch', 'growth', 'incubation', 'metabolism', 'scalation', 'survival', 'thermoregulation', 'venom'] as const)
  hexRegisterOf('herpetology', name, (HerpetologyFormulas[name] as (...x: unknown[]) => unknown).bind(HerpetologyFormulas))
