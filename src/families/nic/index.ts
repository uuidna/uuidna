import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NIC — THE NETWORK INTERFACE CARD, AS ARITHMETIC. A network adapter is numbers by the book: the line rate, goodput
 *  after efficiency, packets per second from the frame size, the MTU, per-frame overhead, the full-duplex aggregate,
 *  the RSS receive queues, interrupts after coalescing, path latency across hops, and lane-aggregated bandwidth.
 *  Deterministic integer identities, standard Ethernet/PCIe networking. Crosses to `hardware`. A measure, not advice. */

const PROOF = 'NIC arithmetic by the book (line rate Gb/s, goodput = ⌊Gb/s · efficiency / 100⌋, packets = ⌊Gb/s · 125e6 / frame-bytes⌋, MTU bytes, overhead = frame − payload, full-duplex = Gb/s · 2, RSS queues = cores · per-core, interrupts = ⌈packets / coalesce⌉, latency = hops · per-hop-µs, bandwidth = lanes · per-lane-Gb/s); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const n = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'nic', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `nic.${name}`, params })

export class NicFormulas {
  /** LINERATE — the nominal line rate of the link. value gbps (Gb/s); holds nat. */
  static linerate(gbps: number): CrossFormula { return n('nic-linerate', 'linerate(gbps) = gbps (Gb/s)', gbps, nat(gbps), 'linerate', [gbps]) }
  /** THROUGHPUT — goodput: the line rate scaled by the efficiency percentage. value ⌊gbps · efficiencyPct / 100⌋; holds efficiencyPct ≤ 100. */
  static throughput(gbps: number, efficiencyPct: number): CrossFormula { return n('nic-throughput', 'throughput(gbps, efficiencyPct) = ⌊gbps · efficiencyPct / 100⌋', Math.floor((gbps * efficiencyPct) / 100), nat(gbps, efficiencyPct) && efficiencyPct <= 100, 'throughput', [gbps, efficiencyPct]) }
  /** PACKETS — packets per second the line rate carries at a given frame size. value ⌊gbps · 125000000 / frameBytes⌋; holds frameBytes > 0. */
  static packets(gbps: number, frameBytes: number): CrossFormula { return n('nic-packets', 'packets(gbps, frameBytes) = ⌊gbps · 125000000 / frameBytes⌋ (pps)', frameBytes > 0 ? Math.floor((gbps * 125000000) / frameBytes) : 0, nat(gbps, frameBytes) && frameBytes > 0, 'packets', [gbps, frameBytes]) }
  /** MTU — the maximum transmission unit in bytes. value bytes; holds nat. */
  static mtu(bytes: number): CrossFormula { return n('nic-mtu', 'mtu(bytes) = bytes', bytes, nat(bytes), 'mtu', [bytes]) }
  /** OVERHEAD — the framing overhead: the frame bytes beyond the payload. value frameBytes − payloadBytes; holds payloadBytes ≤ frameBytes. */
  static overhead(frameBytes: number, payloadBytes: number): CrossFormula { return n('nic-overhead', 'overhead(frameBytes, payloadBytes) = frameBytes − payloadBytes', frameBytes - payloadBytes, nat(frameBytes, payloadBytes) && payloadBytes <= frameBytes, 'overhead', [frameBytes, payloadBytes]) }
  /** DUPLEX — the full-duplex aggregate: send and receive at the line rate together. value gbps · 2 (Gb/s). */
  static duplex(gbps: number): CrossFormula { return n('nic-duplex', 'duplex(gbps) = gbps · 2 (full-duplex aggregate)', gbps * 2, nat(gbps), 'duplex', [gbps]) }
  /** QUEUES — the receive-side scaling queues: cores times the queues each core drives. value cores · perCore. */
  static queues(cores: number, perCore: number): CrossFormula { return n('nic-queues', 'queues(cores, perCore) = cores · perCore (RSS)', cores * perCore, nat(cores, perCore), 'queues', [cores, perCore]) }
  /** INTERRUPTS — the interrupts raised after coalescing a count of packets. value ⌈packets / coalesce⌉; holds coalesce > 0. */
  static interrupts(packets: number, coalesce: number): CrossFormula { return n('nic-interrupts', 'interrupts(packets, coalesce) = ⌈packets / coalesce⌉', coalesce > 0 ? Math.ceil(packets / coalesce) : 0, nat(packets, coalesce) && coalesce > 0, 'interrupts', [packets, coalesce]) }
  /** LATENCY — path latency: the per-hop delay across the hops, in microseconds. value hops · perHopUs (µs). */
  static latency(hops: number, perHopUs: number): CrossFormula { return n('nic-latency', 'latency(hops, perHopUs) = hops · perHopUs (µs)', hops * perHopUs, nat(hops, perHopUs), 'latency', [hops, perHopUs]) }
  /** BANDWIDTH — aggregate bandwidth across the link's lanes. value lanes · perLaneGbps (Gb/s). */
  static bandwidth(lanes: number, perLaneGbps: number): CrossFormula { return n('nic-bandwidth', 'bandwidth(lanes, perLaneGbps) = lanes · perLaneGbps (Gb/s)', lanes * perLaneGbps, nat(lanes, perLaneGbps), 'bandwidth', [lanes, perLaneGbps]) }
}

for (const name of ['bandwidth', 'duplex', 'interrupts', 'latency', 'linerate', 'mtu', 'overhead', 'packets', 'queues', 'throughput'] as const)
  hexRegisterOf('nic', name, (NicFormulas[name] as (...x: unknown[]) => unknown).bind(NicFormulas))
