import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LATENCY — WHERE THE TIME GOES, AS ARITHMETIC (chosen by the public-API registry, not by hand). Moving a packet is numbers:
 *  the signal's time on the wire, the bits clocked out, the wait in a queue, the work at each node, the one-way sum, the whole
 *  round trip, the serialization of a frame, and the end-to-end total across hops. Crosses to `networking` — latency is what the
 *  network costs in time. A measure. */

const PROOF = 'latency arithmetic (propagation, transmission, queuing, processing, serialization, one-way, round-trip, end-to-end total); a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'latency', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `latency.${name}`, params })

export class LatencyFormulas {
  /** ONE-WAY: the delays on a single trip summed. value prop + trans + queue. */
  static oneway(prop: number, trans: number, queue: number): CrossFormula { return c('latency-oneway', 'oneway(prop, trans, queue) = prop + trans + queue', prop + trans + queue, nat(prop, trans, queue), 'oneway', [prop, trans, queue]) }
  /** PROCESSING: the work a node spends per packet. value ops · perOp. */
  static processing(ops: number, perOp: number): CrossFormula { return c('latency-processing', 'processing(ops, perOp) = ops · perOp', ops * perOp, nat(ops, perOp), 'processing', [ops, perOp]) }
  /** PROPAGATION: distance over signal speed. value ⌊distance / speed⌋. */
  static propagation(distance: number, speed: number): CrossFormula { return c('latency-propagation', 'propagation(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'propagation', [distance, speed]) }
  /** QUEUING: packets waiting at a service time each. value packets · service. */
  static queuing(packets: number, service: number): CrossFormula { return c('latency-queuing', 'queuing(packets, service) = packets · service', packets * service, nat(packets, service), 'queuing', [packets, service]) }
  /** ROUND-TRIP: twice the one-way time. value 2 · oneway. */
  static roundtrip(oneway: number): CrossFormula { return c('latency-roundtrip', 'roundtrip(oneway) = 2 · oneway', 2 * oneway, nat(oneway), 'roundtrip', [oneway]) }
  /** SERIALIZATION: a frame's bytes clocked out as bits over the rate. value ⌊bytes · 8 / rate⌋. */
  static serialization(bytes: number, rate: number): CrossFormula { return c('latency-serialization', 'serialization(bytes, rate) = ⌊bytes · 8 / rate⌋', rate > 0 ? Math.floor((bytes * 8) / rate) : 0, nat(bytes, rate) && rate > 0, 'serialization', [bytes, rate]) }
  /** TOTAL: the one-way time across every hop. value oneway · hops. */
  static total(oneway: number, hops: number): CrossFormula { return c('latency-total', 'total(oneway, hops) = oneway · hops', oneway * hops, nat(oneway, hops), 'total', [oneway, hops]) }
  /** TRANSMISSION: bits clocked out over the link rate. value ⌊bits / rate⌋. */
  static transmission(bits: number, rate: number): CrossFormula { return c('latency-transmission', 'transmission(bits, rate) = ⌊bits / rate⌋', rate > 0 ? Math.floor(bits / rate) : 0, nat(bits, rate) && rate > 0, 'transmission', [bits, rate]) }
}

for (const name of ['oneway', 'processing', 'propagation', 'queuing', 'roundtrip', 'serialization', 'total', 'transmission'] as const)
  hexRegisterOf('latency', name, (LatencyFormulas[name] as (...x: unknown[]) => unknown).bind(LatencyFormulas))
