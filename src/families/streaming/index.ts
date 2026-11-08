import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STREAMING — DELIVERING MEDIA, AS ARITHMETIC (chosen by the public-API registry, not by hand). Serving a stream is
 *  numbers: the bitrate a buffer sustains, how full the buffer is, rebuffers per minute, startup and playback latency,
 *  bandwidth per stream, delivered quality, and concurrent viewers against capacity. Crosses to `media` — streaming is
 *  how media reaches the viewer. A measure. */

const PROOF = 'streaming arithmetic (bitrate, buffer fill, rebuffer rate, latency, bandwidth, quality, concurrency, startup); a public-API registry domain; a measure crossed to media'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'streaming', dst: 'media', formula, value, proof: PROOF, ...extra }, holds, { name: `streaming.${name}`, params })

export class StreamingFormulas {
  /** BANDWIDTH per stream: throughput shared across the streams served. value ⌊throughput / streams⌋. */
  static bandwidth(throughput: number, streams: number): CrossFormula { return c('streaming-bandwidth', 'bandwidth(throughput, streams) = ⌊throughput / streams⌋', streams > 0 ? Math.floor(throughput / streams) : 0, nat(throughput, streams) && streams > 0, 'bandwidth', [throughput, streams]) }
  /** BITRATE: bits delivered over seconds. value ⌊bits / seconds⌋. */
  static bitrate(bits: number, seconds: number): CrossFormula { return c('streaming-bitrate', 'bitrate(bits, seconds) = ⌊bits / seconds⌋', seconds > 0 ? Math.floor(bits / seconds) : 0, nat(bits, seconds) && seconds > 0, 'bitrate', [bits, seconds]) }
  /** BUFFER fill as a percentage. value ⌊filled · 100 / capacity⌋. */
  static buffer(filled: number, capacity: number): CrossFormula { return c('streaming-buffer', 'buffer(filled, capacity) = ⌊filled · 100 / capacity⌋', capacity > 0 ? Math.floor((filled * 100) / capacity) : 0, nat(filled, capacity) && capacity > 0 && filled <= capacity, 'buffer', [filled, capacity]) }
  /** CONCURRENCY: viewers against capacity as a percentage. value ⌊viewers · 100 / capacity⌋. */
  static concurrency(viewers: number, capacity: number): CrossFormula { return c('streaming-concurrency', 'concurrency(viewers, capacity) = ⌊viewers · 100 / capacity⌋', capacity > 0 ? Math.floor((viewers * 100) / capacity) : 0, nat(viewers, capacity) && capacity > 0, 'concurrency', [viewers, capacity]) }
  /** PLAYBACK LATENCY in milliseconds. value milliseconds. */
  static latency(milliseconds: number): CrossFormula { return c('streaming-latency', 'latency(milliseconds) = milliseconds', milliseconds, nat(milliseconds), 'latency', [milliseconds]) }
  /** DELIVERED QUALITY: delivered against requested as a percentage. value ⌊delivered · 100 / requested⌋. */
  static quality(delivered: number, requested: number): CrossFormula { return c('streaming-quality', 'quality(delivered, requested) = ⌊delivered · 100 / requested⌋', requested > 0 ? Math.floor((delivered * 100) / requested) : 0, nat(delivered, requested) && requested > 0 && delivered <= requested, 'quality', [delivered, requested]) }
  /** REBUFFER rate: stalls over the minutes watched. value ⌊stalls / minutes⌋. */
  static rebuffer(stalls: number, minutes: number): CrossFormula { return c('streaming-rebuffer', 'rebuffer(stalls, minutes) = ⌊stalls / minutes⌋', minutes > 0 ? Math.floor(stalls / minutes) : 0, nat(stalls, minutes) && minutes > 0, 'rebuffer', [stalls, minutes]) }
  /** STARTUP delay in milliseconds. value milliseconds. */
  static startup(milliseconds: number): CrossFormula { return c('streaming-startup', 'startup(milliseconds) = milliseconds', milliseconds, nat(milliseconds), 'startup', [milliseconds]) }
}

for (const name of ['bandwidth', 'bitrate', 'buffer', 'concurrency', 'latency', 'quality', 'rebuffer', 'startup'] as const)
  hexRegisterOf('streaming', name, (StreamingFormulas[name] as (...x: unknown[]) => unknown).bind(StreamingFormulas))
