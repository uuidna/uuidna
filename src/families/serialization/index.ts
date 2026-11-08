import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SERIALIZATION — TURNING STRUCTURE INTO BYTES, AS ARITHMETIC (chosen by the wire-format registry, not by hand). Writing
 *  a value to the wire is numbers: per-message overhead, the payload left after it, messages per second, framed size,
 *  the encoded expansion, schema tag cost, the delta to resend, and how many batches a run needs. Crosses to `compression`
 *  — serialization is the bytes compression then shrinks. A measure. */

const PROOF = 'serialization arithmetic (overhead, payload, throughput, framing, encoding, schema tags, delta, batches); the wire-format domain the registry had uncovered; a measure crossed to compression'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'serialization', dst: 'compression', formula, value, proof: PROOF, ...extra }, holds, { name: `serialization.${name}`, params })

export class SerializationFormulas {
  /** OVERHEAD: a fixed-size header on every message. value header · count. */
  static overhead(header: number, count: number): CrossFormula { return c('serialization-overhead', 'overhead(header, count) = header · count', header * count, nat(header, count), 'overhead', [header, count]) }
  /** PAYLOAD: the data bytes left once the overhead is removed. value max(0, total − overhead). */
  static payload(total: number, overhead: number): CrossFormula { return c('serialization-payload', 'payload(total, overhead) = max(0, total − overhead)', Math.max(0, total - overhead), nat(total, overhead), 'payload', [total, overhead]) }
  /** THROUGHPUT: messages serialized over seconds. value ⌊messages / seconds⌋. */
  static throughput(messages: number, seconds: number): CrossFormula { return c('serialization-throughput', 'throughput(messages, seconds) = ⌊messages / seconds⌋', seconds > 0 ? Math.floor(messages / seconds) : 0, nat(messages, seconds) && seconds > 0, 'throughput', [messages, seconds]) }
  /** FRAMING: payload plus a fixed frame delimiter on every chunk. value payload + frame · chunks. */
  static framing(payload: number, frame: number, chunks: number): CrossFormula { return c('serialization-framing', 'framing(payload, frame, chunks) = payload + frame · chunks', payload + frame * chunks, nat(payload, frame, chunks), 'framing', [payload, frame, chunks]) }
  /** ENCODING: base64 expansion — four output bytes per three input bytes. value ⌈bytes / 3⌉ · 4. */
  static encoding(bytes: number): CrossFormula { return c('serialization-encoding', 'encoding(bytes) = ⌈bytes / 3⌉ · 4', Math.ceil(bytes / 3) * 4, nat(bytes), 'encoding', [bytes]) }
  /** SCHEMA: a per-field tag written for every field. value fields · tag. */
  static schema(fields: number, tag: number): CrossFormula { return c('serialization-schema', 'schema(fields, tag) = fields · tag', fields * tag, nat(fields, tag), 'schema', [fields, tag]) }
  /** DELTA: the changed fields, at a size each, are all that is resent. value changed · size. */
  static delta(changed: number, size: number): CrossFormula { return c('serialization-delta', 'delta(changed, size) = changed · size', changed * size, nat(changed, size), 'delta', [changed, size]) }
  /** BATCH: the batches a run of records needs at a batch size. value ⌈records / size⌉. */
  static batch(records: number, size: number): CrossFormula { return c('serialization-batch', 'batch(records, size) = ⌈records / size⌉', size > 0 ? Math.ceil(records / size) : 0, nat(records, size) && size > 0, 'batch', [records, size]) }
}

for (const name of ['batch', 'delta', 'encoding', 'framing', 'overhead', 'payload', 'schema', 'throughput'] as const)
  hexRegisterOf('serialization', name, (SerializationFormulas[name] as (...x: unknown[]) => unknown).bind(SerializationFormulas))
