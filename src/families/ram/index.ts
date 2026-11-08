import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RAM — DRAM MAIN MEMORY, AS ARITHMETIC. A memory system is numbers by the book: total capacity across modules, the
 *  channels that span them, transfer bandwidth, ranks of chips, CAS latency in picoseconds, rows refreshed per window,
 *  banks across bank groups, the burst a transfer moves, the CAS-plus-RCD access latency, and utilisation. Deterministic
 *  integer identities, standard DRAM organisation. Crosses to `hardware`. A measure, not advice. */

const PROOF = 'DRAM arithmetic by the book (capacity = modules · GB-each, channels = ⌈modules / per-channel⌉, bandwidth = bus-bytes · MT/s, ranks = ⌊chips / per-rank⌋, CAS latency = cycles · tCK-ps, refresh rows per window, banks = groups · per-group, burst = length · bus-bytes, access latency = CAS + RCD, utilisation = ⌊used · 100 / total⌋); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const r = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ram', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `ram.${name}`, params })

export class RamFormulas {
  /** CAPACITY — total memory across the modules. value modules · gbEach (GB). */
  static capacity(modules: number, gbEach: number): CrossFormula { return r('ram-capacity', 'capacity(modules, gbEach) = modules · gbEach (GB)', modules * gbEach, nat(modules, gbEach), 'capacity', [modules, gbEach]) }
  /** CHANNELS — the memory channels the modules populate, rounded up. value ⌈modules / perChannel⌉; holds perChannel > 0. */
  static channels(modules: number, perChannel: number): CrossFormula { return r('ram-channels', 'channels(modules, perChannel) = ⌈modules / perChannel⌉', perChannel > 0 ? Math.ceil(modules / perChannel) : 0, nat(modules, perChannel) && perChannel > 0, 'channels', [modules, perChannel]) }
  /** BANDWIDTH — transfer bandwidth: bus width in bytes times the transfers per second. value busWidthBytes · mtps. */
  static bandwidth(busWidthBytes: number, mtps: number): CrossFormula { return r('ram-bandwidth', 'bandwidth(busWidthBytes, mtps) = busWidthBytes · mtps', busWidthBytes * mtps, nat(busWidthBytes, mtps), 'bandwidth', [busWidthBytes, mtps]) }
  /** RANKS — the ranks the chips form, whole ranks only. value ⌊chips / perRank⌋; holds perRank > 0. */
  static ranks(chips: number, perRank: number): CrossFormula { return r('ram-ranks', 'ranks(chips, perRank) = ⌊chips / perRank⌋', perRank > 0 ? Math.floor(chips / perRank) : 0, nat(chips, perRank) && perRank > 0, 'ranks', [chips, perRank]) }
  /** CASLATENCY — CAS latency as time: the CAS cycles times the clock period in picoseconds. value cycles · tckPs (ps). */
  static caslatency(cycles: number, tckPs: number): CrossFormula { return r('ram-caslatency', 'caslatency(cycles, tckPs) = cycles · tckPs (ps)', cycles * tckPs, nat(cycles, tckPs), 'caslatency', [cycles, tckPs]) }
  /** REFRESH — rows refreshed within one tREFC window. value rows; holds nat. */
  static refresh(rows: number, trefcMs: number): CrossFormula { return r('ram-refresh', 'refresh(rows, trefcMs) = rows (refreshed per window)', rows, nat(rows, trefcMs), 'refresh', [rows, trefcMs]) }
  /** BANKS — total banks across the bank groups. value groups · perGroup. */
  static banks(groups: number, perGroup: number): CrossFormula { return r('ram-banks', 'banks(groups, perGroup) = groups · perGroup', groups * perGroup, nat(groups, perGroup), 'banks', [groups, perGroup]) }
  /** BURST — the bytes a burst moves: the burst length times the bus width in bytes. value length · busWidthBytes. */
  static burst(length: number, busWidthBytes: number): CrossFormula { return r('ram-burst', 'burst(length, busWidthBytes) = length · busWidthBytes', length * busWidthBytes, nat(length, busWidthBytes), 'burst', [length, busWidthBytes]) }
  /** LATENCY — access latency in cycles: CAS plus RAS-to-CAS delay. value cas + rcd. */
  static latency(cas: number, rcd: number): CrossFormula { return r('ram-latency', 'latency(cas, rcd) = cas + rcd', cas + rcd, nat(cas, rcd), 'latency', [cas, rcd]) }
  /** UTILIZATION — memory utilisation: used as a percentage of the total. value ⌊used · 100 / total⌋; holds total > 0 and used ≤ total. */
  static utilization(used: number, total: number): CrossFormula { return r('ram-utilization', 'utilization(used, total) = ⌊used · 100 / total⌋', total > 0 ? Math.floor((used * 100) / total) : 0, nat(used, total) && total > 0 && used <= total, 'utilization', [used, total]) }
}

for (const name of ['bandwidth', 'banks', 'burst', 'capacity', 'caslatency', 'channels', 'latency', 'ranks', 'refresh', 'utilization'] as const)
  hexRegisterOf('ram', name, (RamFormulas[name] as (...x: unknown[]) => unknown).bind(RamFormulas))
