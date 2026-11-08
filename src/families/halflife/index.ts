import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HALFLIFE — RADIOACTIVE DECAY AS ARITHMETIC. How much of a sample is left after whole half-lives: the count of half-lives
 *  that have passed, what remains, what decayed, the decay constant, the mean life, the activity, the fraction remaining, and
 *  population doubling over generations. Integer halving by number of half-lives — no exp, no log, no floats. Crosses to
 *  `chemistry` — decay is what chemistry measures. A measure. */

const PROOF = 'halflife arithmetic (elapsed half-lives, remaining, decayed, decay constant, mean life, activity, fraction, generations) by integer halving; no exp/log/floats; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'halflife', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `halflife.${name}`, params })

export class HalflifeFormulas {
  /** ELAPSED HALF-LIVES: whole half-lives that have passed. value ⌊elapsed / halflife⌋. */
  static elapsedlives(elapsed: number, halflife: number): CrossFormula { return c('halflife-elapsedlives', 'elapsedlives(elapsed, halflife) = ⌊elapsed / halflife⌋', halflife > 0 ? Math.floor(elapsed / halflife) : 0, nat(elapsed, halflife) && halflife > 0, 'elapsedlives', [elapsed, halflife]) }
  /** REMAINING after whole half-lives. value ⌊amount / 2^lives⌋. */
  static remaining(amount: number, lives: number): CrossFormula { return c('halflife-remaining', 'remaining(amount, lives) = ⌊amount / 2^lives⌋', Math.floor(amount / (2 ** lives)), nat(amount, lives) && lives <= 30, 'remaining', [amount, lives]) }
  /** DECAYED: the part that is gone. value max(0, amount − ⌊amount / 2^lives⌋). */
  static decayed(amount: number, lives: number): CrossFormula { return c('halflife-decayed', 'decayed(amount, lives) = max(0, amount − ⌊amount / 2^lives⌋)', Math.max(0, amount - Math.floor(amount / (2 ** lives))), nat(amount, lives) && lives <= 30, 'decayed', [amount, lives]) }
  /** DECAY CONSTANT λ, scaled by 1000, with ln2 ≈ 0.693. value ⌊scale · 693 / (halflife · 1000)⌋. */
  static constant(scale: number, halflife: number): CrossFormula { return c('halflife-constant', 'constant(scale, halflife) = ⌊scale · 693 / (halflife · 1000)⌋', halflife > 0 ? Math.floor((scale * 693) / (halflife * 1000)) : 0, nat(scale, halflife) && halflife > 0, 'constant', [scale, halflife]) }
  /** MEAN LIFE τ = halflife / ln2, with 1/ln2 ≈ 1.443. value ⌊halflife · 1443 / 1000⌋. */
  static meanlife(halflife: number): CrossFormula { return c('halflife-meanlife', 'meanlife(halflife) = ⌊halflife · 1443 / 1000⌋', Math.floor((halflife * 1443) / 1000), nat(halflife), 'meanlife', [halflife]) }
  /** ACTIVITY A = λ · N, with λ scaled by 1000. value ⌊atoms · lambda / 1000⌋. */
  static activity(atoms: number, lambda: number): CrossFormula { return c('halflife-activity', 'activity(atoms, lambda) = ⌊atoms · lambda / 1000⌋', Math.floor((atoms * lambda) / 1000), nat(atoms, lambda), 'activity', [atoms, lambda]) }
  /** FRACTION remaining, out of a scale (100 = percent). value ⌊scale / 2^lives⌋. */
  static fraction(scale: number, lives: number): CrossFormula { return c('halflife-fraction', 'fraction(scale, lives) = ⌊scale / 2^lives⌋', Math.floor(scale / (2 ** lives)), nat(scale, lives) && lives <= 30, 'fraction', [scale, lives]) }
  /** GENERATIONS: a population doubled over whole generations. value initial · 2^lives. */
  static generations(initial: number, lives: number): CrossFormula { return c('halflife-generations', 'generations(initial, lives) = initial · 2^lives', initial * (2 ** lives), nat(initial, lives) && lives <= 30, 'generations', [initial, lives]) }
}

for (const name of ['activity', 'constant', 'decayed', 'elapsedlives', 'fraction', 'generations', 'meanlife', 'remaining'] as const)
  hexRegisterOf('halflife', name, (HalflifeFormulas[name] as (...x: unknown[]) => unknown).bind(HalflifeFormulas))
