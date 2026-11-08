import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THROUGHPUT — MOVING BITS, AS ARITHMETIC. Carrying a load across a link is numbers: the useful bits per second, how much
 *  of the pipe is in use, the bandwidth-delay product, the rate left after loss, the header overhead, the window a path
 *  wants, whether the link is saturated, and how efficient the carry is. Crosses to `networking` — throughput is what the
 *  network delivers. A measure. */

const PROOF = 'throughput arithmetic (goodput, utilization, bandwidth-delay, effective rate, overhead, window, saturation, efficiency); moving bits across a link; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'throughput', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `throughput.${name}`, params })

export class ThroughputFormulas {
  /** GOODPUT: useful payload bits over the time taken. value ⌊payload / time⌋. */
  static goodput(payload: number, time: number): CrossFormula { return c('throughput-goodput', 'goodput(payload, time) = ⌊payload / time⌋', time > 0 ? Math.floor(payload / time) : 0, nat(payload, time) && time > 0, 'goodput', [payload, time]) }
  /** UTILIZATION: how much of the capacity is in use, as a percentage. value ⌊used · 100 / capacity⌋. */
  static utilization(used: number, capacity: number): CrossFormula { return c('throughput-utilization', 'utilization(used, capacity) = ⌊used · 100 / capacity⌋', capacity > 0 ? Math.floor((used * 100) / capacity) : 0, nat(used, capacity) && capacity > 0 && used <= capacity, 'utilization', [used, capacity]) }
  /** BANDWIDTH-DELAY PRODUCT: the bits in flight on a path. value bandwidth · delay. */
  static bandwidthdelay(bandwidth: number, delay: number): CrossFormula { return c('throughput-bandwidthdelay', 'bandwidthdelay(bandwidth, delay) = bandwidth · delay', bandwidth * delay, nat(bandwidth, delay), 'bandwidthdelay', [bandwidth, delay]) }
  /** EFFECTIVE RATE: the rate left after loss. value max(0, sent − lost). */
  static effectiverate(sent: number, lost: number): CrossFormula { return c('throughput-effectiverate', 'effectiverate(sent, lost) = max(0, sent − lost)', Math.max(0, sent - lost), nat(sent, lost), 'effectiverate', [sent, lost]) }
  /** OVERHEAD RATIO: header bytes against payload, as a percentage. value ⌊header · 100 / payload⌋. */
  static overheadratio(header: number, payload: number): CrossFormula { return c('throughput-overheadratio', 'overheadratio(header, payload) = ⌊header · 100 / payload⌋', payload > 0 ? Math.floor((header * 100) / payload) : 0, nat(header, payload) && payload > 0, 'overheadratio', [header, payload]) }
  /** WINDOW SIZE: segments a bandwidth-delay product spans at a segment size. value ⌈bdp / mss⌉. */
  static windowsize(bdp: number, mss: number): CrossFormula { return c('throughput-windowsize', 'windowsize(bdp, mss) = ⌈bdp / mss⌉', mss > 0 ? Math.ceil(bdp / mss) : 0, nat(bdp, mss) && mss > 0, 'windowsize', [bdp, mss]) }
  /** SATURATION: 1 when the offered load meets or exceeds capacity. value [load ≥ capacity]. */
  static saturation(load: number, capacity: number): CrossFormula { return c('throughput-saturation', 'saturation(load, capacity) = [load ≥ capacity]', load >= capacity ? 1 : 0, nat(load, capacity), 'saturation', [load, capacity]) }
  /** EFFICIENCY: goodput against the raw line rate, as a percentage. value ⌊good · 100 / raw⌋. */
  static efficiency(good: number, raw: number): CrossFormula { return c('throughput-efficiency', 'efficiency(good, raw) = ⌊good · 100 / raw⌋', raw > 0 ? Math.floor((good * 100) / raw) : 0, nat(good, raw) && raw > 0 && good <= raw, 'efficiency', [good, raw]) }
}

for (const name of ['bandwidthdelay', 'effectiverate', 'efficiency', 'goodput', 'overheadratio', 'saturation', 'utilization', 'windowsize'] as const)
  hexRegisterOf('throughput', name, (ThroughputFormulas[name] as (...x: unknown[]) => unknown).bind(ThroughputFormulas))
