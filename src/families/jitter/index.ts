import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** JITTER — THE VARIANCE OF DELAY, AS ARITHMETIC (chosen by the public-API registry, not by hand). Packet timing is
 *  numbers: the variation between consecutive delays, the mean deviation, the de-jitter buffer a flow needs, the
 *  peak-to-peak spread, the playout delay, the RFC 3550 interarrival estimate, the spacing between packets, and the
 *  absolute jitter against a reference clock. Crosses to `networking` — jitter is what the network link suffers. A measure. */

const PROOF = 'jitter arithmetic (variation, mean deviation, buffer depth, peak-to-peak, playout delay, RFC 3550 interarrival estimate, packet spacing, absolute); the variance of delay on a link; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'jitter', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `jitter.${name}`, params })

export class JitterFormulas {
  /** VARIATION: the magnitude between two consecutive delays. value |a − b|. */
  static variation(a: number, b: number): CrossFormula { return c('jitter-variation', 'variation(a, b) = |a − b|', Math.max(0, a - b) + Math.max(0, b - a), nat(a, b), 'variation', [a, b]) }
  /** MEAN DEVIATION: accumulated deviation over the samples counted. value ⌊total / count⌋. */
  static meandeviation(total: number, count: number): CrossFormula { return c('jitter-meandeviation', 'meandeviation(total, count) = ⌊total / count⌋', count > 0 ? Math.floor(total / count) : 0, nat(total, count) && count > 0, 'meandeviation', [total, count]) }
  /** BUFFER DEPTH: the de-jitter buffer a flow needs, jitter times a safety multiplier. value jitter · mult. */
  static bufferdepth(jitter: number, mult: number): CrossFormula { return c('jitter-bufferdepth', 'bufferdepth(jitter, mult) = jitter · mult', jitter * mult, nat(jitter, mult), 'bufferdepth', [jitter, mult]) }
  /** PEAK-TO-PEAK: the spread between the largest and smallest delay. value max(0, hi − lo). */
  static peaktopeak(hi: number, lo: number): CrossFormula { return c('jitter-peaktopeak', 'peaktopeak(hi, lo) = max(0, hi − lo)', Math.max(0, hi - lo), nat(hi, lo), 'peaktopeak', [hi, lo]) }
  /** PLAYOUT DELAY: a fixed base plus jitter scaled by a factor. value base + jitter · k. */
  static playoutdelay(base: number, jitter: number, k: number): CrossFormula { return c('jitter-playoutdelay', 'playoutdelay(base, jitter, k) = base + jitter · k', base + jitter * k, nat(base, jitter, k), 'playoutdelay', [base, jitter, k]) }
  /** RFC 3550 interarrival estimate: prev + ⌊(|D| − prev) / 16⌋, the gain-1/16 smoother. value prev + ⌊max(0, dabs − prev) / 16⌋. */
  static rfc3550estimate(prev: number, dabs: number): CrossFormula { return c('jitter-rfc3550estimate', 'rfc3550estimate(prev, dabs) = prev + ⌊max(0, dabs − prev) / 16⌋', prev + Math.floor(Math.max(0, dabs - prev) / 16), nat(prev, dabs), 'rfc3550estimate', [prev, dabs]) }
  /** PACKET SPACING: a time span shared out over the packets sent. value ⌊span / packets⌋. */
  static packetspacing(span: number, packets: number): CrossFormula { return c('jitter-packetspacing', 'packetspacing(span, packets) = ⌊span / packets⌋', packets > 0 ? Math.floor(span / packets) : 0, nat(span, packets) && packets > 0, 'packetspacing', [span, packets]) }
  /** ABSOLUTE jitter: the magnitude of a measured delay against a reference clock. value |measured − reference|. */
  static absolute(measured: number, reference: number): CrossFormula { return c('jitter-absolute', 'absolute(measured, reference) = |measured − reference|', Math.max(0, measured - reference) + Math.max(0, reference - measured), nat(measured, reference), 'absolute', [measured, reference]) }
}

for (const name of ['absolute', 'bufferdepth', 'meandeviation', 'packetspacing', 'peaktopeak', 'playoutdelay', 'rfc3550estimate', 'variation'] as const)
  hexRegisterOf('jitter', name, (JitterFormulas[name] as (...x: unknown[]) => unknown).bind(JitterFormulas))
