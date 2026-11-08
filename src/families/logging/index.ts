import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOGGING — RUNNING COMPUTE WRITES A RECORD, AS ARITHMETIC (chosen by the public-API registry, not by hand). A log stream
 *  is numbers: events ingested per second, how long records are kept, the fraction sampled, what the bytes cost, the error
 *  share of a window, an index's size, how many times a file rotates, and the bytes compression saves. Crosses to
 *  `observability` — logging is the raw record observability reads. A measure. */

const PROOF = 'logging arithmetic (ingest rate, retention, sampling, storage cost, error ratio, index size, rotations, compression savings); a stream chosen by the public-API registry; a measure crossed to observability'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'logging', dst: 'observability', formula, value, proof: PROOF, ...extra }, holds, { name: `logging.${name}`, params })

export class LoggingFormulas {
  /** INGEST RATE: events over the seconds they arrived in. value ⌊events / seconds⌋. */
  static ingestrate(events: number, seconds: number): CrossFormula { return c('logging-ingestrate', 'ingestrate(events, seconds) = ⌊events / seconds⌋', seconds > 0 ? Math.floor(events / seconds) : 0, nat(events, seconds) && seconds > 0, 'ingestrate', [events, seconds]) }
  /** RETENTION: daily bytes kept for a number of days. value dailyBytes · days. */
  static retention(dailyBytes: number, days: number): CrossFormula { return c('logging-retention', 'retention(dailyBytes, days) = dailyBytes · days', dailyBytes * days, nat(dailyBytes, days), 'retention', [dailyBytes, days]) }
  /** SAMPLING RATE: the percentage of events kept. value ⌊sampled · 100 / total⌋. */
  static samplingrate(sampled: number, total: number): CrossFormula { return c('logging-samplingrate', 'samplingrate(sampled, total) = ⌊sampled · 100 / total⌋', total > 0 ? Math.floor((sampled * 100) / total) : 0, nat(sampled, total) && total > 0 && sampled <= total, 'samplingrate', [sampled, total]) }
  /** STORAGE COST: gigabytes kept at a rate each. value gb · rate. */
  static storagecost(gb: number, rate: number): CrossFormula { return c('logging-storagecost', 'storagecost(gb, rate) = gb · rate', gb * rate, nat(gb, rate), 'storagecost', [gb, rate]) }
  /** ERROR RATIO: the error percentage of a window. value ⌊errors · 100 / total⌋. */
  static errorratio(errors: number, total: number): CrossFormula { return c('logging-errorratio', 'errorratio(errors, total) = ⌊errors · 100 / total⌋', total > 0 ? Math.floor((errors * 100) / total) : 0, nat(errors, total) && total > 0 && errors <= total, 'errorratio', [errors, total]) }
  /** INDEX SIZE: documents at a size each. value docs · bytesPer. */
  static indexsize(docs: number, bytesPer: number): CrossFormula { return c('logging-indexsize', 'indexsize(docs, bytesPer) = docs · bytesPer', docs * bytesPer, nat(docs, bytesPer), 'indexsize', [docs, bytesPer]) }
  /** ROTATION COUNT: files a byte total needs at a maximum size. value ⌈totalBytes / maxBytes⌉. */
  static rotationcount(totalBytes: number, maxBytes: number): CrossFormula { return c('logging-rotationcount', 'rotationcount(totalBytes, maxBytes) = ⌈totalBytes / maxBytes⌉', maxBytes > 0 ? Math.ceil(totalBytes / maxBytes) : 0, nat(totalBytes, maxBytes) && maxBytes > 0, 'rotationcount', [totalBytes, maxBytes]) }
  /** COMPRESSION SAVINGS: the bytes compression removes. value max(0, original − compressed). */
  static compressionsavings(original: number, compressed: number): CrossFormula { return c('logging-compressionsavings', 'compressionsavings(original, compressed) = max(0, original − compressed)', Math.max(0, original - compressed), nat(original, compressed), 'compressionsavings', [original, compressed]) }
}

for (const name of ['compressionsavings', 'errorratio', 'indexsize', 'ingestrate', 'retention', 'rotationcount', 'samplingrate', 'storagecost'] as const)
  hexRegisterOf('logging', name, (LoggingFormulas[name] as (...x: unknown[]) => unknown).bind(LoggingFormulas))
