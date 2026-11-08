import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NETWORKING — THE MOVEMENT OF PACKETS, AS ARITHMETIC (chosen by the public-API registry, not by hand). Moving data is
 *  numbers: bandwidth per second, propagation latency, packet throughput, loss rate, the hops a path takes, link
 *  utilization, delay jitter, and the hosts a subnet holds. Crosses to `logistics` — networking is logistics for bits.
 *  A measure. */

const PROOF = 'networking arithmetic (bandwidth, latency, throughput, loss, hops, utilization, jitter, subnet); the registry\'s packet-movement domain; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'networking', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `networking.${name}`, params })

export class NetworkingFormulas {
  /** BANDWIDTH: bits over seconds. value ⌊bits / seconds⌋. */
  static bandwidth(bits: number, seconds: number): CrossFormula { return c('networking-bandwidth', 'bandwidth(bits, seconds) = ⌊bits / seconds⌋', seconds > 0 ? Math.floor(bits / seconds) : 0, nat(bits, seconds) && seconds > 0, 'bandwidth', [bits, seconds]) }
  /** LATENCY: distance over propagation speed. value ⌊distance / speed⌋. */
  static latency(distance: number, speed: number): CrossFormula { return c('networking-latency', 'latency(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'latency', [distance, speed]) }
  /** THROUGHPUT: packets over a window. value ⌊packets / window⌋. */
  static throughput(packets: number, window: number): CrossFormula { return c('networking-throughput', 'throughput(packets, window) = ⌊packets / window⌋', window > 0 ? Math.floor(packets / window) : 0, nat(packets, window) && window > 0, 'throughput', [packets, window]) }
  /** LOSS as a percentage. value ⌊dropped · 100 / sent⌋. */
  static loss(dropped: number, sent: number): CrossFormula { return c('networking-loss', 'loss(dropped, sent) = ⌊dropped · 100 / sent⌋', sent > 0 ? Math.floor((dropped * 100) / sent) : 0, nat(dropped, sent) && sent > 0 && dropped <= sent, 'loss', [dropped, sent]) }
  /** HOPS on a path of nodes. value nodes − 1. */
  static hops(nodes: number): CrossFormula { return c('networking-hops', 'hops(nodes) = nodes − 1', nodes > 0 ? nodes - 1 : 0, nat(nodes), 'hops', [nodes]) }
  /** UTILIZATION as a percentage. value ⌊used · 100 / capacity⌋. */
  static utilization(used: number, capacity: number): CrossFormula { return c('networking-utilization', 'utilization(used, capacity) = ⌊used · 100 / capacity⌋', capacity > 0 ? Math.floor((used * 100) / capacity) : 0, nat(used, capacity) && capacity > 0 && used <= capacity, 'utilization', [used, capacity]) }
  /** JITTER: the spread between the largest and smallest delay. value max(0, max_ − min_). */
  static jitter(max_: number, min_: number): CrossFormula { return c('networking-jitter', 'jitter(max_, min_) = max(0, max_ − min_)', Math.max(0, max_ - min_), nat(max_, min_), 'jitter', [max_, min_]) }
  /** SUBNET: the hosts a block holds. value hosts · 2^bits. */
  static subnet(hosts: number, bits: number): CrossFormula { return c('networking-subnet', 'subnet(hosts, bits) = hosts · 2^bits', hosts * (2 ** bits), nat(hosts, bits), 'subnet', [hosts, bits]) }
}

for (const name of ['bandwidth', 'hops', 'jitter', 'latency', 'loss', 'subnet', 'throughput', 'utilization'] as const)
  hexRegisterOf('networking', name, (NetworkingFormulas[name] as (...x: unknown[]) => unknown).bind(NetworkingFormulas))
