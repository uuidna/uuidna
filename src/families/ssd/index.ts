import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SSD — NAND FLASH SOLID-STATE STORAGE, AS ARITHMETIC. A drive is numbers by the book: IOPS from queue depth and
 *  latency, sequential throughput, terabytes written over the endurance cycles, the over-provisioning gap, writes per
 *  erase block, the flash channels across the dies, page size from the sectors, read latency, queue depth, and drive
 *  writes per day. Deterministic integer identities, standard NAND SSD organisation. Crosses to `hardware`. A measure,
 *  not advice. */

const PROOF = 'NAND SSD arithmetic by the book (IOPS = ⌊queue · 1e6 / latency-µs⌋, throughput = IOPS · block-KB, TBW = ⌊capacity · cycles / 1000⌋, over-provision = raw − usable, wear-levelling = ⌊writes / blocks⌋, channels = ⌈dies / per-channel⌉, page = sectors · sector-bytes, read latency µs, queue depth, DWPD = ⌊TBW · 1000 / (capacity · days)⌋); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const s = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ssd', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `ssd.${name}`, params })

export class SsdFormulas {
  /** IOPS — I/O operations per second from the queue depth and per-op latency in microseconds. value ⌊queueDepth · 1000000 / latencyUs⌋; holds latencyUs > 0. */
  static iops(queueDepth: number, latencyUs: number): CrossFormula { return s('ssd-iops', 'iops(queueDepth, latencyUs) = ⌊queueDepth · 1000000 / latencyUs⌋', latencyUs > 0 ? Math.floor((queueDepth * 1000000) / latencyUs) : 0, nat(queueDepth, latencyUs) && latencyUs > 0, 'iops', [queueDepth, latencyUs]) }
  /** THROUGHPUT — sequential throughput: IOPS times the block size in kilobytes. value iops · blockKb (KB/s). */
  static throughput(iops: number, blockKb: number): CrossFormula { return s('ssd-throughput', 'throughput(iops, blockKb) = iops · blockKb (KB/s)', iops * blockKb, nat(iops, blockKb), 'throughput', [iops, blockKb]) }
  /** TBW — terabytes written over the endurance: capacity times the program/erase cycles. value ⌊capacityGb · cycles / 1000⌋ (TB). */
  static tbw(capacityGb: number, cycles: number): CrossFormula { return s('ssd-tbw', 'tbw(capacityGb, cycles) = ⌊capacityGb · cycles / 1000⌋ (TB)', Math.floor((capacityGb * cycles) / 1000), nat(capacityGb, cycles), 'tbw', [capacityGb, cycles]) }
  /** OVERPROVISION — the spare capacity the controller keeps back: raw minus usable. value raw − usable; holds usable ≤ raw. */
  static overprovision(raw: number, usable: number): CrossFormula { return s('ssd-overprovision', 'overprovision(raw, usable) = raw − usable', raw - usable, nat(raw, usable) && usable <= raw, 'overprovision', [raw, usable]) }
  /** WEARLEVELING — average program/erase cycles per block spreading the writes. value ⌊writes / blocks⌋; holds blocks > 0. */
  static wearleveling(writes: number, blocks: number): CrossFormula { return s('ssd-wearleveling', 'wearleveling(writes, blocks) = ⌊writes / blocks⌋', blocks > 0 ? Math.floor(writes / blocks) : 0, nat(writes, blocks) && blocks > 0, 'wearleveling', [writes, blocks]) }
  /** CHANNELS — the flash channels across the dies, rounded up. value ⌈dies / perChannel⌉; holds perChannel > 0. */
  static channels(dies: number, perChannel: number): CrossFormula { return s('ssd-channels', 'channels(dies, perChannel) = ⌈dies / perChannel⌉', perChannel > 0 ? Math.ceil(dies / perChannel) : 0, nat(dies, perChannel) && perChannel > 0, 'channels', [dies, perChannel]) }
  /** PAGESIZE — the flash page size: the sectors it holds times the sector bytes. value sectors · sectorBytes (bytes). */
  static pagesize(sectors: number, sectorBytes: number): CrossFormula { return s('ssd-pagesize', 'pagesize(sectors, sectorBytes) = sectors · sectorBytes (bytes)', sectors * sectorBytes, nat(sectors, sectorBytes), 'pagesize', [sectors, sectorBytes]) }
  /** READLATENCY — the flash read latency in microseconds. value us; holds nat. */
  static readlatency(us: number): CrossFormula { return s('ssd-readlatency', 'readlatency(us) = us (µs)', us, nat(us), 'readlatency', [us]) }
  /** QUEUEDEPTH — the outstanding I/O requests in flight. value outstanding; holds nat. */
  static queuedepth(outstanding: number): CrossFormula { return s('ssd-queuedepth', 'queuedepth(outstanding) = outstanding', outstanding, nat(outstanding), 'queuedepth', [outstanding]) }
  /** DWPD — drive writes per day: the full-capacity writes the endurance allows each day of the warranty. value ⌊tbw · 1000 / (capacityGb · days)⌋; holds capacityGb > 0 and days > 0. */
  static dwpd(tbw: number, capacityGb: number, days: number): CrossFormula { return s('ssd-dwpd', 'dwpd(tbw, capacityGb, days) = ⌊tbw · 1000 / (capacityGb · days)⌋', capacityGb > 0 && days > 0 ? Math.floor((tbw * 1000) / (capacityGb * days)) : 0, nat(tbw, capacityGb, days) && capacityGb > 0 && days > 0, 'dwpd', [tbw, capacityGb, days]) }
}

for (const name of ['channels', 'dwpd', 'iops', 'overprovision', 'pagesize', 'queuedepth', 'readlatency', 'tbw', 'throughput', 'wearleveling'] as const)
  hexRegisterOf('ssd', name, (SsdFormulas[name] as (...x: unknown[]) => unknown).bind(SsdFormulas))
