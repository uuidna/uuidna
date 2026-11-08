import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TPU — THE TENSOR/AI ACCELERATOR, AS ARITHMETIC. A systolic array is numbers by the book: the MACs laid out across its
 *  rows and columns, the TOPS it sustains at a clock, the tiles a matrix is cut into, raw throughput, PE utilisation,
 *  operand reuse in the dataflow, pipeline latency, on-chip weight memory, batching passes, and compute efficiency against
 *  peak. Deterministic integer identities, standard systolic-array and accelerator arithmetic. Crosses to `hardware`. A
 *  measure, not advice. */

const PROOF = 'TPU arithmetic by the book (MACs = rows · cols of the systolic array, TOPS = MACs · clock · ops-per-MAC, tiles = ⌈matrix / tile⌉, throughput = MACs · clock, PE utilisation, operand reuse in the dataflow, pipeline latency = depth + cycles, weight memory = weights · bytes, batch passes, efficiency against peak); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const t = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tpu', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `tpu.${name}`, params })

export class TpuFormulas {
  /** MACS — the multiply-accumulate units laid out across the systolic array. value rows · cols. */
  static macs(rows: number, cols: number): CrossFormula { return t('tpu-macs', 'macs(rows, cols) = rows · cols', rows * cols, nat(rows, cols), 'macs', [rows, cols]) }
  /** TOPS — tera-ops the array sustains: MACs times clock times the ops each MAC does. value macs · clockMHz · opsPerMac. */
  static tops(macs: number, clockMHz: number, opsPerMac: number): CrossFormula { return t('tpu-tops', 'tops(macs, clockMHz, opsPerMac) = macs · clockMHz · opsPerMac', macs * clockMHz * opsPerMac, nat(macs, clockMHz, opsPerMac), 'tops', [macs, clockMHz, opsPerMac]) }
  /** TILES — the tiles a matrix is cut into, rounded up. value ⌈matrix / tile⌉; holds tile > 0. */
  static tiles(matrix: number, tile: number): CrossFormula { return t('tpu-tiles', 'tiles(matrix, tile) = ⌈matrix / tile⌉', tile > 0 ? Math.ceil(matrix / tile) : 0, nat(matrix, tile) && tile > 0, 'tiles', [matrix, tile]) }
  /** THROUGHPUT — the MACs run per clock across the whole array. value macs · clockMHz. */
  static throughput(macs: number, clockMHz: number): CrossFormula { return t('tpu-throughput', 'throughput(macs, clockMHz) = macs · clockMHz', macs * clockMHz, nat(macs, clockMHz), 'throughput', [macs, clockMHz]) }
  /** UTILIZATION — active PEs as a percentage of the array's total. value ⌊active · 100 / total⌋; holds total > 0, active ≤ total. */
  static utilization(active: number, total: number): CrossFormula { return t('tpu-utilization', 'utilization(active, total) = ⌊active · 100 / total⌋', total > 0 ? Math.floor((active * 100) / total) : 0, nat(active, total) && total > 0 && active <= total, 'utilization', [active, total]) }
  /** DATAFLOW — operands moved for the work: each reuse across the loads into the array. value reuse · loads. */
  static dataflow(reuse: number, loads: number): CrossFormula { return t('tpu-dataflow', 'dataflow(reuse, loads) = reuse · loads (operand reuse)', reuse * loads, nat(reuse, loads), 'dataflow', [reuse, loads]) }
  /** LATENCY — pipeline latency: the array depth plus the cycles the data streams. value depth + cycles. */
  static latency(depth: number, cycles: number): CrossFormula { return t('tpu-latency', 'latency(depth, cycles) = depth + cycles', depth + cycles, nat(depth, cycles), 'latency', [depth, cycles]) }
  /** MEMORY — on-chip weight memory: the weights times the bytes each takes. value weights · bytes. */
  static memory(weights: number, bytes: number): CrossFormula { return t('tpu-memory', 'memory(weights, bytes) = weights · bytes', weights * bytes, nat(weights, bytes), 'memory', [weights, bytes]) }
  /** BATCH — the passes a sample set needs through the array, rounded up. value ⌈samples / perPass⌉; holds perPass > 0. */
  static batch(samples: number, perPass: number): CrossFormula { return t('tpu-batch', 'batch(samples, perPass) = ⌈samples / perPass⌉', perPass > 0 ? Math.ceil(samples / perPass) : 0, nat(samples, perPass) && perPass > 0, 'batch', [samples, perPass]) }
  /** EFFICIENCY — useful ops as a percentage of the array's peak. value ⌊useful · 100 / peak⌋; holds peak > 0, useful ≤ peak. */
  static efficiency(useful: number, peak: number): CrossFormula { return t('tpu-efficiency', 'efficiency(useful, peak) = ⌊useful · 100 / peak⌋', peak > 0 ? Math.floor((useful * 100) / peak) : 0, nat(useful, peak) && peak > 0 && useful <= peak, 'efficiency', [useful, peak]) }
}

for (const name of ['batch', 'dataflow', 'efficiency', 'latency', 'macs', 'memory', 'throughput', 'tiles', 'tops', 'utilization'] as const)
  hexRegisterOf('tpu', name, (TpuFormulas[name] as (...x: unknown[]) => unknown).bind(TpuFormulas))
