import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INTERCONNECT — BUSES AND LINKS, AS ARITHMETIC. A fabric is numbers by the book: the lanes a link set carries, raw
 *  bandwidth, usable throughput after line coding (128b/130b and the like), link latency over the hops, the bit width,
 *  the links in a regular topology, full-duplex bandwidth, transfers across the lanes, the encoding overhead, and the
 *  diameter of a linear chain. Deterministic integer identities, standard PCIe/NVLink and graph-topology arithmetic.
 *  Crosses to `hardware`. A measure, not advice. */

const PROOF = 'Interconnect arithmetic by the book (lanes = links · per-link, bandwidth = lanes · per-lane Gbps, throughput = ⌊bw · encNum / encDen⌋ line coding, latency = hops · per-hop ns, width = lanes · bits-per-lane, topology links = ⌊nodes · degree / 2⌋, duplex = bw · 2, transfers = GT/s · lanes, overhead = rawGbps − effectiveGbps, hops = nodes − 1 chain diameter); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const i = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'interconnect', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `interconnect.${name}`, params })

export class InterconnectFormulas {
  /** LANES — the lanes a link set carries: links times lanes-per-link. value links · perLink. */
  static lanes(links: number, perLink: number): CrossFormula { return i('interconnect-lanes', 'lanes(links, perLink) = links · perLink', links * perLink, nat(links, perLink), 'lanes', [links, perLink]) }
  /** BANDWIDTH — raw bandwidth: the lanes times the Gbps each carries. value lanes · perLaneGbps. */
  static bandwidth(lanes: number, perLaneGbps: number): CrossFormula { return i('interconnect-bandwidth', 'bandwidth(lanes, perLaneGbps) = lanes · perLaneGbps', lanes * perLaneGbps, nat(lanes, perLaneGbps), 'bandwidth', [lanes, perLaneGbps]) }
  /** THROUGHPUT — usable bandwidth after line coding (e.g. 128/130). value ⌊bandwidthGbps · encodingNum / encodingDen⌋; holds encodingDen > 0. */
  static throughput(bandwidthGbps: number, encodingNum: number, encodingDen: number): CrossFormula { return i('interconnect-throughput', 'throughput(bandwidthGbps, encodingNum, encodingDen) = ⌊bandwidthGbps · encodingNum / encodingDen⌋', encodingDen > 0 ? Math.floor((bandwidthGbps * encodingNum) / encodingDen) : 0, nat(bandwidthGbps, encodingNum, encodingDen) && encodingDen > 0, 'throughput', [bandwidthGbps, encodingNum, encodingDen]) }
  /** LATENCY — link latency over the hops: the hops times the nanoseconds each adds. value hops · perHopNs. */
  static latency(hops: number, perHopNs: number): CrossFormula { return i('interconnect-latency', 'latency(hops, perHopNs) = hops · perHopNs', hops * perHopNs, nat(hops, perHopNs), 'latency', [hops, perHopNs]) }
  /** WIDTH — the bit width of the link: the lanes times the bits each carries. value lanes · bitsPerLane. */
  static width(lanes: number, bitsPerLane: number): CrossFormula { return i('interconnect-width', 'width(lanes, bitsPerLane) = lanes · bitsPerLane', lanes * bitsPerLane, nat(lanes, bitsPerLane), 'width', [lanes, bitsPerLane]) }
  /** TOPOLOGY — the links in a regular graph: nodes times degree over two (the handshake lemma). value ⌊nodes · degree / 2⌋. */
  static topology(nodes: number, degree: number): CrossFormula { return i('interconnect-topology', 'topology(nodes, degree) = ⌊nodes · degree / 2⌋ (links in a regular graph)', Math.floor((nodes * degree) / 2), nat(nodes, degree), 'topology', [nodes, degree]) }
  /** DUPLEX — full-duplex bandwidth: the one-way bandwidth doubled. value bandwidthGbps · 2. */
  static duplex(bandwidthGbps: number): CrossFormula { return i('interconnect-duplex', 'duplex(bandwidthGbps) = bandwidthGbps · 2', bandwidthGbps * 2, nat(bandwidthGbps), 'duplex', [bandwidthGbps]) }
  /** TRANSFERS — total transfers: the giga-transfers-per-second across the lanes. value gtps · lanes. */
  static transfers(gtps: number, lanes: number): CrossFormula { return i('interconnect-transfers', 'transfers(gtps, lanes) = gtps · lanes', gtps * lanes, nat(gtps, lanes), 'transfers', [gtps, lanes]) }
  /** OVERHEAD — the bandwidth lost to encoding: raw minus effective. value rawGbps − effectiveGbps; holds effectiveGbps ≤ rawGbps. */
  static overhead(rawGbps: number, effectiveGbps: number): CrossFormula { return i('interconnect-overhead', 'overhead(rawGbps, effectiveGbps) = rawGbps − effectiveGbps', rawGbps - effectiveGbps, nat(rawGbps, effectiveGbps) && effectiveGbps <= rawGbps, 'overhead', [rawGbps, effectiveGbps]) }
  /** HOPS — the diameter of a linear chain: one fewer than the nodes. value nodes − 1; holds nodes ≥ 1. */
  static hops(nodes: number): CrossFormula { return i('interconnect-hops', 'hops(nodes) = nodes − 1 (linear chain diameter)', nodes - 1, nat(nodes) && nodes >= 1, 'hops', [nodes]) }
}

for (const name of ['bandwidth', 'duplex', 'hops', 'lanes', 'latency', 'overhead', 'throughput', 'topology', 'transfers', 'width'] as const)
  hexRegisterOf('interconnect', name, (InterconnectFormulas[name] as (...x: unknown[]) => unknown).bind(InterconnectFormulas))
