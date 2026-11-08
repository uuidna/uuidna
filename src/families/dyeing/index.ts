import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DYEING — THE BATH AS ARITHMETIC. Putting colour on fibre is numbers: the depth of shade on weight of fabric, the
 *  liquor ratio of water to goods, how much dye the bath gives up (exhaustion) and how much stays fixed, the dye
 *  concentration in the bath, the temperature ramp, the average fastness rating, and the mass taken up. Crosses to
 *  `chemistry` — a dyebath is a reaction. A measure. */

const PROOF = 'dyeing arithmetic (shade owf, liquor ratio, exhaustion, fixation, concentration, temperature ramp, fastness rating, dye uptake); the bath as a reaction, a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dyeing', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `dyeing.${name}`, params })

export class DyeingFormulas {
  /** SHADE: depth of shade on weight of fabric, as a percent. value ⌊dye · 100 / fabric⌋. */
  static shade(dye: number, fabric: number): CrossFormula { return c('dyeing-shade', 'shade(dye, fabric) = ⌊dye · 100 / fabric⌋', fabric > 0 ? Math.floor((dye * 100) / fabric) : 0, nat(dye, fabric) && fabric > 0, 'shade', [dye, fabric]) }
  /** LIQUOR RATIO: parts of bath water to one part of goods. value ⌊water / fabric⌋. */
  static liquorratio(water: number, fabric: number): CrossFormula { return c('dyeing-liquorratio', 'liquorratio(water, fabric) = ⌊water / fabric⌋', fabric > 0 ? Math.floor(water / fabric) : 0, nat(water, fabric) && fabric > 0, 'liquorratio', [water, fabric]) }
  /** EXHAUSTION: the percent of dye the bath has given up to the fibre. value ⌊absorbed · 100 / initial⌋. */
  static exhaustion(absorbed: number, initial: number): CrossFormula { return c('dyeing-exhaustion', 'exhaustion(absorbed, initial) = ⌊absorbed · 100 / initial⌋', initial > 0 ? Math.floor((absorbed * 100) / initial) : 0, nat(absorbed, initial) && initial > 0 && absorbed <= initial, 'exhaustion', [absorbed, initial]) }
  /** FIXATION: the percent of applied dye that stays fixed on the fibre. value ⌊fixed · 100 / applied⌋. */
  static fixation(fixed: number, applied: number): CrossFormula { return c('dyeing-fixation', 'fixation(fixed, applied) = ⌊fixed · 100 / applied⌋', applied > 0 ? Math.floor((fixed * 100) / applied) : 0, nat(fixed, applied) && applied > 0 && fixed <= applied, 'fixation', [fixed, applied]) }
  /** CONCENTRATION: dye mass per litre of bath. value ⌊mass / volume⌋. */
  static concentration(mass: number, volume: number): CrossFormula { return c('dyeing-concentration', 'concentration(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'concentration', [mass, volume]) }
  /** TEMPERATURE: the dyebath ramp, a start held for a rate over the minutes. value start + rate · minutes. */
  static temperature(start: number, rate: number, minutes: number): CrossFormula { return c('dyeing-temperature', 'temperature(start, rate, minutes) = start + rate · minutes', start + rate * minutes, nat(start, rate, minutes), 'temperature', [start, rate, minutes]) }
  /** FASTNESS: the average of the wash and light ratings (1–5 grey scale). value ⌊(wash + light) / 2⌋. */
  static fastness(wash: number, light: number): CrossFormula { return c('dyeing-fastness', 'fastness(wash, light) = ⌊(wash + light) / 2⌋', Math.floor((wash + light) / 2), nat(wash, light) && wash <= 5 && light <= 5, 'fastness', [wash, light]) }
  /** UPTAKE: the dye mass taken up, a concentration over a bath volume. value conc · volume. */
  static uptake(conc: number, volume: number): CrossFormula { return c('dyeing-uptake', 'uptake(conc, volume) = conc · volume', conc * volume, nat(conc, volume), 'uptake', [conc, volume]) }
}

for (const name of ['concentration', 'exhaustion', 'fastness', 'fixation', 'liquorratio', 'shade', 'temperature', 'uptake'] as const)
  hexRegisterOf('dyeing', name, (DyeingFormulas[name] as (...x: unknown[]) => unknown).bind(DyeingFormulas))
