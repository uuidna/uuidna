import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RELIABILITY — RUNNING SYSTEMS AS ARITHMETIC. How long a thing runs between failures and how fast it comes back: mean
 *  time between failures, mean time to repair, availability, the failure rate in FIT, redundancy, survival, the nines, and
 *  reliability over trials. Crosses to `code` — reliability is what the code is judged by. A measure. */

const PROOF = 'reliability arithmetic (mtbf, mttr, availability, failure rate in FIT, redundancy, survival, nines, reliability over trials); a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'reliability', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `reliability.${name}`, params })

export class ReliabilityFormulas {
  /** MEAN TIME BETWEEN FAILURES: uptime over the failures counted. value ⌊uptime / failures⌋. */
  static mtbf(uptime: number, failures: number): CrossFormula { return c('reliability-mtbf', 'mtbf(uptime, failures) = ⌊uptime / failures⌋', failures > 0 ? Math.floor(uptime / failures) : 0, nat(uptime, failures) && failures > 0, 'mtbf', [uptime, failures]) }
  /** MEAN TIME TO REPAIR: downtime over the repairs made. value ⌊downtime / repairs⌋. */
  static mttr(downtime: number, repairs: number): CrossFormula { return c('reliability-mttr', 'mttr(downtime, repairs) = ⌊downtime / repairs⌋', repairs > 0 ? Math.floor(downtime / repairs) : 0, nat(downtime, repairs) && repairs > 0, 'mttr', [downtime, repairs]) }
  /** AVAILABILITY as a percentage. value ⌊uptime · 100 / total⌋. */
  static availability(uptime: number, total: number): CrossFormula { return c('reliability-availability', 'availability(uptime, total) = ⌊uptime · 100 / total⌋', total > 0 ? Math.floor((uptime * 100) / total) : 0, nat(uptime, total) && total > 0 && uptime <= total, 'availability', [uptime, total]) }
  /** FAILURE RATE in FIT: failures per billion hours, scaled per million. value ⌊failures · 1000000 / hours⌋. */
  static failurerate(failures: number, hours: number): CrossFormula { return c('reliability-failurerate', 'failurerate(failures, hours) = ⌊failures · 1000000 / hours⌋', hours > 0 ? Math.floor((failures * 1000000) / hours) : 0, nat(failures, hours) && hours > 0, 'failurerate', [failures, hours]) }
  /** REDUNDANCY as a percentage: backups over components. value ⌊backups · 100 / components⌋. */
  static redundancy(backups: number, components: number): CrossFormula { return c('reliability-redundancy', 'redundancy(backups, components) = ⌊backups · 100 / components⌋', components > 0 ? Math.floor((backups * 100) / components) : 0, nat(backups, components) && components > 0, 'redundancy', [backups, components]) }
  /** SURVIVAL as a percentage: surviving over initial. value ⌊surviving · 100 / initial⌋. */
  static survival(surviving: number, initial: number): CrossFormula { return c('reliability-survival', 'survival(surviving, initial) = ⌊surviving · 100 / initial⌋', initial > 0 ? Math.floor((surviving * 100) / initial) : 0, nat(surviving, initial) && initial > 0 && surviving <= initial, 'survival', [surviving, initial]) }
  /** THE NINES: availability to four places. value ⌊uptime · 10000 / total⌋. */
  static nines(uptime: number, total: number): CrossFormula { return c('reliability-nines', 'nines(uptime, total) = ⌊uptime · 10000 / total⌋', total > 0 ? Math.floor((uptime * 10000) / total) : 0, nat(uptime, total) && total > 0 && uptime <= total, 'nines', [uptime, total]) }
  /** RELIABILITY over trials as a percentage: successes over trials. value ⌊successes · 100 / trials⌋. */
  static reliability(successes: number, trials: number): CrossFormula { return c('reliability-reliability', 'reliability(successes, trials) = ⌊successes · 100 / trials⌋', trials > 0 ? Math.floor((successes * 100) / trials) : 0, nat(successes, trials) && trials > 0 && successes <= trials, 'reliability', [successes, trials]) }
}

for (const name of ['availability', 'failurerate', 'mtbf', 'mttr', 'nines', 'redundancy', 'reliability', 'survival'] as const)
  hexRegisterOf('reliability', name, (ReliabilityFormulas[name] as (...x: unknown[]) => unknown).bind(ReliabilityFormulas))
