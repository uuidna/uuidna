import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured as it sprouts). Germination is numbers: how many seeds
 *  break per day, the mean time to emerge, the energy by the peak count, the viable fraction, the speed of the push, how
 *  tightly the batch comes up together, the final percent, and the vigor the seedlings carry. Crosses to `botany` —
 *  germination is where botany begins. A measure. */

const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability, speed index, uniformity spread, final percent, seedling vigor); a measure crossed to botany'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF, ...extra }, holds, { name: `germination.${name}`, params })

export class GerminationFormulas {
  /** RATE: seeds germinating per day. value ⌊germinated / days⌋. */
  static rate(germinated: number, days: number): CrossFormula { return c('germination-rate', 'rate(germinated, days) = ⌊germinated / days⌋', days > 0 ? Math.floor(germinated / days) : 0, nat(germinated, days) && days > 0, 'rate', [germinated, days]) }
  /** MEAN GERMINATION TIME: summed seed-days over the seeds germinated. value ⌊sumtimes / germinated⌋. */
  static meantime(sumtimes: number, germinated: number): CrossFormula { return c('germination-meantime', 'meantime(sumtimes, germinated) = ⌊sumtimes / germinated⌋', germinated > 0 ? Math.floor(sumtimes / germinated) : 0, nat(sumtimes, germinated) && germinated > 0, 'meantime', [sumtimes, germinated]) }
  /** GERMINATION ENERGY: percent germinated counted at the peak period. value ⌊peak · 100 / sown⌋. */
  static energy(peak: number, sown: number): CrossFormula { return c('germination-energy', 'energy(peak, sown) = ⌊peak · 100 / sown⌋', sown > 0 ? Math.floor((peak * 100) / sown) : 0, nat(peak, sown) && sown > 0 && peak <= sown, 'energy', [peak, sown]) }
  /** VIABILITY: the viable fraction as a percentage. value ⌊viable · 100 / tested⌋. */
  static viability(viable: number, tested: number): CrossFormula { return c('germination-viability', 'viability(viable, tested) = ⌊viable · 100 / tested⌋', tested > 0 ? Math.floor((viable * 100) / tested) : 0, nat(viable, tested) && tested > 0 && viable <= tested, 'viability', [viable, tested]) }
  /** SPEED INDEX: how fast the push comes, germinated scaled over days. value ⌊germinated · 100 / days⌋. */
  static speedindex(germinated: number, days: number): CrossFormula { return c('germination-speedindex', 'speedindex(germinated, days) = ⌊germinated · 100 / days⌋', days > 0 ? Math.floor((germinated * 100) / days) : 0, nat(germinated, days) && days > 0, 'speedindex', [germinated, days]) }
  /** UNIFORMITY: the spread in days between last and first emergence (lower is tighter). value max(0, maxday − minday). */
  static uniformity(maxday: number, minday: number): CrossFormula { return c('germination-uniformity', 'uniformity(maxday, minday) = max(0, maxday − minday)', Math.max(0, maxday - minday), nat(maxday, minday), 'uniformity', [maxday, minday]) }
  /** FINAL PERCENT: the final germination percentage. value ⌊germinated · 100 / sown⌋. */
  static finalpercent(germinated: number, sown: number): CrossFormula { return c('germination-finalpercent', 'finalpercent(germinated, sown) = ⌊germinated · 100 / sown⌋', sown > 0 ? Math.floor((germinated * 100) / sown) : 0, nat(germinated, sown) && sown > 0 && germinated <= sown, 'finalpercent', [germinated, sown]) }
  /** VIGOR INDEX: seedling vigor as germination percent times seedling length. value germpercent · length. */
  static vigorindex(germpercent: number, length: number): CrossFormula { return c('germination-vigorindex', 'vigorindex(germpercent, length) = germpercent · length', germpercent * length, nat(germpercent, length), 'vigorindex', [germpercent, length]) }
}

for (const name of ['energy', 'finalpercent', 'meantime', 'rate', 'speedindex', 'uniformity', 'viability', 'vigorindex'] as const)
  hexRegisterOf('germination', name, (GerminationFormulas[name] as (...x: unknown[]) => unknown).bind(GerminationFormulas))
