import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CANNING — HOME & COMMERCIAL PRESERVING, AS ARITHMETIC. Putting up food is numbers: the headspace a jar leaves, the
 *  processing minutes a load needs, accumulated lethality (F-value), the yield after loss, brine strength, the seal rate,
 *  the batches a harvest fills, and whether the temperature sterilizes. Crosses to `cuisine` — canning is how cuisine keeps.
 *  A measure. */

const PROOF = 'canning arithmetic (headspace, process time, F-value lethality, yield after loss, brine strength, seal rate, batches, sterilize); preserving as a measure crossed to cuisine'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'canning', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `canning.${name}`, params })

export class CanningFormulas {
  /** HEADSPACE: the empty room a jar leaves above the fill. value max(0, jar − fill). */
  static headspace(jar: number, fill: number): CrossFormula { return c('canning-headspace', 'headspace(jar, fill) = max(0, jar − fill)', Math.max(0, jar - fill), nat(jar, fill) && fill <= jar, 'headspace', [jar, fill]) }
  /** PROCESS TIME: a base heat-up plus a per-jar cost over the jars in the load. value base + perJar · jars. */
  static processtime(base: number, perJar: number, jars: number): CrossFormula { return c('canning-processtime', 'processtime(base, perJar, jars) = base + perJar · jars', base + perJar * jars, nat(base, perJar, jars), 'processtime', [base, perJar, jars]) }
  /** F-VALUE: accumulated lethality, a per-minute rate over the minutes held. value lethality · minutes. */
  static fvalue(lethality: number, minutes: number): CrossFormula { return c('canning-fvalue', 'fvalue(lethality, minutes) = lethality · minutes', lethality * minutes, nat(lethality, minutes), 'fvalue', [lethality, minutes]) }
  /** YIELD: what survives after a loss percentage. value ⌊input · (100 − lossPct) / 100⌋. */
  static yield(input: number, lossPct: number): CrossFormula { return c('canning-yield', 'yield(input, lossPct) = ⌊input · (100 − lossPct) / 100⌋', Math.floor((input * Math.max(0, 100 - lossPct)) / 100), nat(input, lossPct) && lossPct <= 100, 'yield', [input, lossPct]) }
  /** BRINE: the salt a water volume carries at a strength percentage. value ⌊water · saltPct / 100⌋. */
  static brine(water: number, saltPct: number): CrossFormula { return c('canning-brine', 'brine(water, saltPct) = ⌊water · saltPct / 100⌋', Math.floor((water * saltPct) / 100), nat(water, saltPct) && saltPct <= 100, 'brine', [water, saltPct]) }
  /** SEAL RATE: the jars that sealed, as a percentage of the load. value ⌊sealed · 100 / total⌋. */
  static seal(sealed: number, total: number): CrossFormula { return c('canning-seal', 'seal(sealed, total) = ⌊sealed · 100 / total⌋', total > 0 ? Math.floor((sealed * 100) / total) : 0, nat(sealed, total) && total > 0 && sealed <= total, 'seal', [sealed, total]) }
  /** BATCHES: the batches a harvest fills at a per-batch capacity. value ⌈total / perBatch⌉. */
  static batch(total: number, perBatch: number): CrossFormula { return c('canning-batch', 'batch(total, perBatch) = ⌈total / perBatch⌉', perBatch > 0 ? Math.ceil(total / perBatch) : 0, nat(total, perBatch) && perBatch > 0, 'batch', [total, perBatch]) }
  /** STERILIZE: 1 when the temperature reaches the target. value [temp ≥ target]. */
  static sterilize(temp: number, target: number): CrossFormula { return c('canning-sterilize', 'sterilize(temp, target) = [temp ≥ target]', temp >= target ? 1 : 0, nat(temp, target), 'sterilize', [temp, target]) }
}

for (const name of ['batch', 'brine', 'fvalue', 'headspace', 'processtime', 'seal', 'sterilize', 'yield'] as const)
  hexRegisterOf('canning', name, (CanningFormulas[name] as (...x: unknown[]) => unknown).bind(CanningFormulas))
