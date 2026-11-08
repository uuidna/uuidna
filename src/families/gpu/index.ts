import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GPU — THE GRAPHICS/COMPUTE PROCESSOR, AS ARITHMETIC. A GPU is numbers by the book: total cores across its streaming
 *  multiprocessors, the 32-thread warp, warps and blocks that cover a thread count, SM occupancy, peak FLOPS and memory
 *  bandwidth, the roofline model (arithmetic intensity, the ridge point, and whether a kernel is compute- or
 *  memory-bound), shared-memory footprint, latency hidden by occupancy, SIMT lane speedup, and utilisation. Deterministic
 *  integer identities, standard GPU architecture and the roofline model. Crosses to `hardware`. A measure, not advice. */

const WARP = 32 // threads per warp (NVIDIA SIMT)
const PROOF = 'GPU arithmetic by the book (cores = SMs · per-SM, the 32-thread warp, warps/blocks covering a thread count, SM occupancy, peak FLOPS = cores · clock · per-cycle, memory bandwidth = bus · clock, the roofline model: arithmetic intensity, ridge point, compute- vs memory-bound, shared memory, latency hiding by occupancy, SIMT lane speedup, utilisation); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const g = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gpu', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `gpu.${name}`, params })

export class GpuFormulas {
  /** CORES — total shader/CUDA cores across the streaming multiprocessors. value sms · perSm. */
  static cores(sms: number, perSm: number): CrossFormula { return g('gpu-cores', 'cores(sms, perSm) = sms · perSm', sms * perSm, nat(sms, perSm), 'cores', [sms, perSm]) }
  /** WARPSIZE — the threads that execute in lockstep, one warp. value 32. */
  static warpsize(): CrossFormula { return g('gpu-warpsize', 'warpsize() = 32 (SIMT threads per warp)', WARP, true, 'warpsize', []) }
  /** WARPS — the warps a thread count needs, rounded up. value ⌈threads / 32⌉. */
  static warps(threads: number): CrossFormula { return g('gpu-warps', 'warps(threads) = ⌈threads / 32⌉', Math.ceil(threads / WARP), nat(threads), 'warps', [threads]) }
  /** OCCUPANCY — active warps as a percentage of the SM's maximum. value ⌊active · 100 / max⌋; holds max > 0. */
  static occupancy(active: number, max: number): CrossFormula { return g('gpu-occupancy', 'occupancy(active, max) = ⌊active · 100 / max⌋', max > 0 ? Math.floor((active * 100) / max) : 0, nat(active, max) && max > 0 && active <= max, 'occupancy', [active, max]) }
  /** GRID — the total threads a launch covers, blocks times threads per block. value blocks · perBlock. */
  static grid(blocks: number, perBlock: number): CrossFormula { return g('gpu-grid', 'grid(blocks, perBlock) = blocks · perBlock', blocks * perBlock, nat(blocks, perBlock), 'grid', [blocks, perBlock]) }
  /** BLOCKS — the blocks needed to cover a thread count, rounded up. value ⌈threads / perBlock⌉; holds perBlock > 0. */
  static blocks(threads: number, perBlock: number): CrossFormula { return g('gpu-blocks', 'blocks(threads, perBlock) = ⌈threads / perBlock⌉', perBlock > 0 ? Math.ceil(threads / perBlock) : 0, nat(threads, perBlock) && perBlock > 0, 'blocks', [threads, perBlock]) }
  /** FLOPS — peak throughput: cores, clock and the FLOPs each core does per cycle. value cores · clock · perCycle. */
  static flops(cores: number, clock: number, perCycle: number): CrossFormula { return g('gpu-flops', 'flops(cores, clock, perCycle) = cores · clock · perCycle', cores * clock * perCycle, nat(cores, clock, perCycle), 'flops', [cores, clock, perCycle]) }
  /** BANDWIDTH — memory bandwidth: the bus width in bytes times the clock. value bus · clock. */
  static bandwidth(bus: number, clock: number): CrossFormula { return g('gpu-bandwidth', 'bandwidth(bus, clock) = bus · clock (bytes per cycle × clock)', bus * clock, nat(bus, clock), 'bandwidth', [bus, clock]) }
  /** INTENSITY — arithmetic intensity, FLOPs per byte moved (the roofline x-axis). value ⌊flops / bytes⌋; holds bytes > 0. */
  static intensity(flops: number, bytes: number): CrossFormula { return g('gpu-intensity', 'intensity(flops, bytes) = ⌊flops / bytes⌋ (FLOP/byte)', bytes > 0 ? Math.floor(flops / bytes) : 0, nat(flops, bytes) && bytes > 0, 'intensity', [flops, bytes]) }
  /** RIDGE — the roofline ridge point: peak FLOPS over bandwidth, the intensity where compute meets memory. value ⌈peak / bandwidth⌉; holds bandwidth > 0. */
  static ridge(peak: number, bandwidth: number): CrossFormula { return g('gpu-ridge', 'ridge(peak, bandwidth) = ⌈peak / bandwidth⌉ (roofline ridge, FLOP/byte)', bandwidth > 0 ? Math.ceil(peak / bandwidth) : 0, nat(peak, bandwidth) && bandwidth > 0, 'ridge', [peak, bandwidth]) }
  /** BOUND — the roofline verdict: compute-bound when intensity meets the ridge, else memory-bound. value [intensity ≥ ridge]. */
  static bound(intensity: number, ridge: number): CrossFormula { return g('gpu-bound', 'bound(intensity, ridge) = [intensity ≥ ridge] (1 compute-bound, 0 memory-bound)', intensity >= ridge ? 1 : 0, nat(intensity, ridge), 'bound', [intensity, ridge]) }
  /** SHARED — the shared-memory footprint of a launch: per-block bytes times resident blocks. value perBlock · blocks. */
  static shared(perBlock: number, blocks: number): CrossFormula { return g('gpu-shared', 'shared(perBlock, blocks) = perBlock · blocks (shared memory footprint)', perBlock * blocks, nat(perBlock, blocks), 'shared', [perBlock, blocks]) }
  /** HIDE — latency hidden when the issued work per cycle across warps covers the memory latency. value [warps · issue ≥ latency]. */
  static hide(warps: number, issue: number, latency: number): CrossFormula { return g('gpu-hide', 'hide(warps, issue, latency) = [warps · issue ≥ latency] (occupancy hides latency)', warps * issue >= latency ? 1 : 0, nat(warps, issue, latency), 'hide', [warps, issue, latency]) }
  /** SPEEDUP — SIMT lane speedup: serial cycles divided across the lanes that run in lockstep. value ⌊serial / lanes⌋; holds lanes > 0. */
  static speedup(serial: number, lanes: number): CrossFormula { return g('gpu-speedup', 'speedup(serial, lanes) = ⌊serial / lanes⌋', lanes > 0 ? Math.floor(serial / lanes) : 0, nat(serial, lanes) && lanes > 0, 'speedup', [serial, lanes]) }
  /** UTIL — GPU utilisation: busy cores as a percentage of the total. value ⌊used · 100 / total⌋; holds total > 0. */
  static util(used: number, total: number): CrossFormula { return g('gpu-util', 'util(used, total) = ⌊used · 100 / total⌋', total > 0 ? Math.floor((used * 100) / total) : 0, nat(used, total) && total > 0 && used <= total, 'util', [used, total]) }
}

for (const name of ['bandwidth', 'blocks', 'bound', 'cores', 'flops', 'grid', 'hide', 'intensity', 'occupancy', 'ridge', 'shared', 'speedup', 'util', 'warps', 'warpsize'] as const)
  hexRegisterOf('gpu', name, (GpuFormulas[name] as (...x: unknown[]) => unknown).bind(GpuFormulas))
