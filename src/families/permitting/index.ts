import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PERMITTING — THE PERMIT PIPELINE, AS ARITHMETIC. A permitting office is numbers: the backlog of filed-but-unprocessed
 *  applications, the average cycle time per permit, the approval rate, throughput per day, the fees collected, the
 *  inspections a batch needs, when a permit expires, and the queue a day's arrivals forms. Crosses to `governance` —
 *  permitting is one of the services governance oversees. A measure. */

const PROOF = 'permitting arithmetic (backlog, cycle time, approval rate, throughput, fees, inspections, expiry, queue); the permit pipeline as integers; a measure crossed to governance'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'permitting', dst: 'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `permitting.${name}`, params })

export class PermittingFormulas {
  /** APPROVAL RATE as a percentage. value ⌊approved · 100 / reviewed⌋. */
  static approval(approved: number, reviewed: number): CrossFormula { return c('permitting-approval', 'approval(approved, reviewed) = ⌊approved · 100 / reviewed⌋', reviewed > 0 ? Math.floor((approved * 100) / reviewed) : 0, nat(approved, reviewed) && reviewed > 0 && approved <= reviewed, 'approval', [approved, reviewed]) }
  /** BACKLOG: filed applications not yet processed. value max(0, filed − processed). */
  static backlog(filed: number, processed: number): CrossFormula { return c('permitting-backlog', 'backlog(filed, processed) = max(0, filed − processed)', Math.max(0, filed - processed), nat(filed, processed), 'backlog', [filed, processed]) }
  /** CYCLE TIME: average days per permit. value ⌊totalDays / permits⌋. */
  static cycletime(totalDays: number, permits: number): CrossFormula { return c('permitting-cycletime', 'cycletime(totalDays, permits) = ⌊totalDays / permits⌋', permits > 0 ? Math.floor(totalDays / permits) : 0, nat(totalDays, permits) && permits > 0, 'cycletime', [totalDays, permits]) }
  /** EXPIRY: the day a permit lapses. value issued + validDays. */
  static expiry(issued: number, validDays: number): CrossFormula { return c('permitting-expiry', 'expiry(issued, validDays) = issued + validDays', issued + validDays, nat(issued, validDays), 'expiry', [issued, validDays]) }
  /** FEE: permits at a flat rate each. value permits · rate. */
  static fee(permits: number, rate: number): CrossFormula { return c('permitting-fee', 'fee(permits, rate) = permits · rate', permits * rate, nat(permits, rate), 'fee', [permits, rate]) }
  /** INSPECTIONS: the inspections a batch of permits needs. value permits · perPermit. */
  static inspections(permits: number, perPermit: number): CrossFormula { return c('permitting-inspections', 'inspections(permits, perPermit) = permits · perPermit', permits * perPermit, nat(permits, perPermit), 'inspections', [permits, perPermit]) }
  /** QUEUE: the windows a day's arrivals need at a per-window service rate. value ⌈arrivals / serviceRate⌉. */
  static queue(arrivals: number, serviceRate: number): CrossFormula { return c('permitting-queue', 'queue(arrivals, serviceRate) = ⌈arrivals / serviceRate⌉', serviceRate > 0 ? Math.ceil(arrivals / serviceRate) : 0, nat(arrivals, serviceRate) && serviceRate > 0, 'queue', [arrivals, serviceRate]) }
  /** THROUGHPUT: permits cleared per day. value ⌊permits / days⌋. */
  static throughput(permits: number, days: number): CrossFormula { return c('permitting-throughput', 'throughput(permits, days) = ⌊permits / days⌋', days > 0 ? Math.floor(permits / days) : 0, nat(permits, days) && days > 0, 'throughput', [permits, days]) }
}

for (const name of ['approval', 'backlog', 'cycletime', 'expiry', 'fee', 'inspections', 'queue', 'throughput'] as const)
  hexRegisterOf('permitting', name, (PermittingFormulas[name] as (...x: unknown[]) => unknown).bind(PermittingFormulas))
