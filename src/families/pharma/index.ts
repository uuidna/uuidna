import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHARMA — PHARMACOLOGY / PHARMACOKINETICS, AS ARITHMETIC (dosing by the numbers, not by hand). A drug in a body is numbers:
 *  the dose for a weight, the amount left after so many half-lives, clearance by a rate, the loading dose for a volume of
 *  distribution, bioavailability as a percentage, the dosing interval, the therapeutic index, the steady-state level.
 *  Crosses to `med` — pharma is what medicine prescribes. A measure. */

const PROOF = 'pharma arithmetic (dose by weight, half-life decay, clearance, loading dose, bioavailability, dosing interval, therapeutic index, steady state); dosing as numbers; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pharma', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `pharma.${name}`, params })

export class PharmaFormulas {
  /** DOSE by body weight at a per-kg amount. value weight · perKg. */
  static dose(weight: number, perKg: number): CrossFormula { return c('pharma-dose', 'dose(weight, perKg) = weight · perKg', weight * perKg, nat(weight, perKg), 'dose', [weight, perKg]) }
  /** HALF-LIFE DECAY: the amount left after so many halvings. value ⌊amount / 2^halvings⌋. */
  static halflife(amount: number, halvings: number): CrossFormula { return c('pharma-halflife', 'halflife(amount, halvings) = ⌊amount / 2^halvings⌋', Math.floor(amount / (2 ** halvings)), nat(amount, halvings), 'halflife', [amount, halvings]) }
  /** CLEARANCE: the dose cleared at an elimination rate. value ⌊dose / rate⌋. */
  static clearance(dose: number, rate: number): CrossFormula { return c('pharma-clearance', 'clearance(dose, rate) = ⌊dose / rate⌋', rate > 0 ? Math.floor(dose / rate) : 0, nat(dose, rate) && rate > 0, 'clearance', [dose, rate]) }
  /** LOADING DOSE: a target concentration over a volume of distribution. value target · volume. */
  static loading(target: number, volume: number): CrossFormula { return c('pharma-loading', 'loading(target, volume) = target · volume', target * volume, nat(target, volume), 'loading', [target, volume]) }
  /** BIOAVAILABILITY as a percentage of the given dose. value ⌊absorbed · 100 / given⌋. */
  static bioavailability(absorbed: number, given: number): CrossFormula { return c('pharma-bioavailability', 'bioavailability(absorbed, given) = ⌊absorbed · 100 / given⌋', given > 0 ? Math.floor((absorbed * 100) / given) : 0, nat(absorbed, given) && given > 0 && absorbed <= given, 'bioavailability', [absorbed, given]) }
  /** DOSING INTERVAL: half-lives across a number of doses. value halflife · doses. */
  static interval(halflife: number, doses: number): CrossFormula { return c('pharma-interval', 'interval(halflife, doses) = halflife · doses', halflife * doses, nat(halflife, doses), 'interval', [halflife, doses]) }
  /** THERAPEUTIC INDEX: the toxic dose as a percentage of the effective dose. value ⌊toxic · 100 / dose⌋. */
  static therapeutic(dose: number, toxic: number): CrossFormula { return c('pharma-therapeutic', 'therapeutic(dose, toxic) = ⌊toxic · 100 / dose⌋', dose > 0 ? Math.floor((toxic * 100) / dose) : 0, nat(dose, toxic) && dose > 0, 'therapeutic', [dose, toxic]) }
  /** STEADY STATE: the dose spread over the dosing interval. value ⌊dose / interval⌋. */
  static steadystate(dose: number, interval: number): CrossFormula { return c('pharma-steadystate', 'steadystate(dose, interval) = ⌊dose / interval⌋', interval > 0 ? Math.floor(dose / interval) : 0, nat(dose, interval) && interval > 0, 'steadystate', [dose, interval]) }
}

for (const name of ['bioavailability', 'clearance', 'dose', 'halflife', 'interval', 'loading', 'steadystate', 'therapeutic'] as const)
  hexRegisterOf('pharma', name, (PharmaFormulas[name] as (...x: unknown[]) => unknown).bind(PharmaFormulas))
