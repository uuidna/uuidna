import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INGESTION — THE STREAM AT THE DOOR, AS ARITHMETIC (chosen by the public-API registry, not by hand). Taking events in is
 *  numbers: the rate they arrive, the pressure when they outrun capacity, how full the buffer is, the window watermark, the
 *  lag between produced and consumed, the batch size, the retry budget left, and the last checkpoint offset. Crosses to
 *  `caching` — ingestion is what fills the cache. A measure. */

const PROOF = 'ingestion arithmetic (event rate, backpressure, buffer fill, watermark, lag, batch size, retry budget, checkpoint); the registry\'s stream-door domain; a measure crossed to caching'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ingestion', dst: 'caching', formula, value, proof: PROOF, ...extra }, holds, { name: `ingestion.${name}`, params })

export class IngestionFormulas {
  /** EVENT RATE: events over the seconds they spanned. value ⌊events / seconds⌋. */
  static eventrate(events: number, seconds: number): CrossFormula { return c('ingestion-eventrate', 'eventrate(events, seconds) = ⌊events / seconds⌋', seconds > 0 ? Math.floor(events / seconds) : 0, nat(events, seconds) && seconds > 0, 'eventrate', [events, seconds]) }
  /** BACKPRESSURE: incoming that outruns capacity. value max(0, incoming − capacity). */
  static backpressure(incoming: number, capacity: number): CrossFormula { return c('ingestion-backpressure', 'backpressure(incoming, capacity) = max(0, incoming − capacity)', Math.max(0, incoming - capacity), nat(incoming, capacity), 'backpressure', [incoming, capacity]) }
  /** BUFFER FILL as a percentage. value ⌊used · 100 / size⌋. */
  static bufferfill(used: number, size: number): CrossFormula { return c('ingestion-bufferfill', 'bufferfill(used, size) = ⌊used · 100 / size⌋', size > 0 ? Math.floor((used * 100) / size) : 0, nat(used, size) && size > 0 && used <= size, 'bufferfill', [used, size]) }
  /** WATERMARK: the windows a stream of events needs at a per-window span. value ⌈events / window⌉. */
  static watermark(events: number, window: number): CrossFormula { return c('ingestion-watermark', 'watermark(events, window) = ⌈events / window⌉', window > 0 ? Math.ceil(events / window) : 0, nat(events, window) && window > 0, 'watermark', [events, window]) }
  /** LAG: produced that the consumer has not caught. value max(0, produced − consumed). */
  static lag(produced: number, consumed: number): CrossFormula { return c('ingestion-lag', 'lag(produced, consumed) = max(0, produced − consumed)', Math.max(0, produced - consumed), nat(produced, consumed), 'lag', [produced, consumed]) }
  /** BATCH SIZE: records split into batches. value ⌈records / batches⌉. */
  static batchsize(records: number, batches: number): CrossFormula { return c('ingestion-batchsize', 'batchsize(records, batches) = ⌈records / batches⌉', batches > 0 ? Math.ceil(records / batches) : 0, nat(records, batches) && batches > 0, 'batchsize', [records, batches]) }
  /** RETRY BUDGET: attempts left under a cap. value max(0, max − attempts). */
  static retrybudget(attempts: number, max: number): CrossFormula { return c('ingestion-retrybudget', 'retrybudget(attempts, max) = max(0, max − attempts)', Math.max(0, max - attempts), nat(attempts, max), 'retrybudget', [attempts, max]) }
  /** CHECKPOINT: the last offset aligned to an interval. value ⌊offset / interval⌋ · interval. */
  static checkpoint(offset: number, interval: number): CrossFormula { return c('ingestion-checkpoint', 'checkpoint(offset, interval) = ⌊offset / interval⌋ · interval', interval > 0 ? Math.floor(offset / interval) * interval : 0, nat(offset, interval) && interval > 0, 'checkpoint', [offset, interval]) }
}

for (const name of ['backpressure', 'batchsize', 'bufferfill', 'checkpoint', 'eventrate', 'lag', 'retrybudget', 'watermark'] as const)
  hexRegisterOf('ingestion', name, (IngestionFormulas[name] as (...x: unknown[]) => unknown).bind(IngestionFormulas))
