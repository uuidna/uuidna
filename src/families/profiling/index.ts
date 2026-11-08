import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROFILING — WHERE RUNNING CODE SPENDS ITSELF, AS ARITHMETIC. A profile is numbers: the share of time in a hotspot,
 *  operations per second, bytes per allocated object, the speedup a change buys, instrumentation overhead, cache hit rate,
 *  frames per flamegraph depth, and garbage collections per unit of runtime. Crosses to `code` — profiling measures code. */

const PROOF = 'profiling arithmetic (hotspot share, throughput, allocation, speedup, overhead, cache hit, flamegraph, gc rate); where running code spends itself; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'profiling', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `profiling.${name}`, params })

export class ProfilingFormulas {
  /** HOTSPOT: a function's self time as a percentage of the total. value ⌊self · 100 / total⌋. */
  static hotspot(self: number, total: number): CrossFormula { return c('profiling-hotspot', 'hotspot(self, total) = ⌊self · 100 / total⌋', total > 0 ? Math.floor((self * 100) / total) : 0, nat(self, total) && total > 0 && self <= total, 'hotspot', [self, total]) }
  /** THROUGHPUT: operations over seconds. value ⌊operations / seconds⌋. */
  static throughput(operations: number, seconds: number): CrossFormula { return c('profiling-throughput', 'throughput(operations, seconds) = ⌊operations / seconds⌋', seconds > 0 ? Math.floor(operations / seconds) : 0, nat(operations, seconds) && seconds > 0, 'throughput', [operations, seconds]) }
  /** ALLOCATION: bytes over the objects allocated. value ⌊bytes / objects⌋. */
  static allocation(bytes: number, objects: number): CrossFormula { return c('profiling-allocation', 'allocation(bytes, objects) = ⌊bytes / objects⌋', objects > 0 ? Math.floor(bytes / objects) : 0, nat(bytes, objects) && objects > 0, 'allocation', [bytes, objects]) }
  /** SPEEDUP: before over after, as a percentage. value ⌊before · 100 / after⌋. */
  static speedup(before: number, after: number): CrossFormula { return c('profiling-speedup', 'speedup(before, after) = ⌊before · 100 / after⌋', after > 0 ? Math.floor((before * 100) / after) : 0, nat(before, after) && after > 0, 'speedup', [before, after]) }
  /** OVERHEAD: the instrumented run over the baseline, as a percentage. value ⌊(instrumented − baseline) · 100 / baseline⌋. */
  static overhead(instrumented: number, baseline: number): CrossFormula { return c('profiling-overhead', 'overhead(instrumented, baseline) = ⌊(instrumented − baseline) · 100 / baseline⌋', baseline > 0 ? Math.floor(((instrumented - baseline) * 100) / baseline) : 0, nat(instrumented, baseline) && baseline > 0 && instrumented >= baseline, 'overhead', [instrumented, baseline]) }
  /** CACHE HIT: hits over accesses, as a percentage. value ⌊hits · 100 / accesses⌋. */
  static cachehit(hits: number, accesses: number): CrossFormula { return c('profiling-cachehit', 'cachehit(hits, accesses) = ⌊hits · 100 / accesses⌋', accesses > 0 ? Math.floor((hits * 100) / accesses) : 0, nat(hits, accesses) && accesses > 0 && hits <= accesses, 'cachehit', [hits, accesses]) }
  /** FLAMEGRAPH: frames over the stack depth. value ⌊frames / depth⌋. */
  static flamegraph(frames: number, depth: number): CrossFormula { return c('profiling-flamegraph', 'flamegraph(frames, depth) = ⌊frames / depth⌋', depth > 0 ? Math.floor(frames / depth) : 0, nat(frames, depth) && depth > 0, 'flamegraph', [frames, depth]) }
  /** GC: collections per thousand units of runtime. value ⌊collections · 1000 / runtime⌋. */
  static gc(collections: number, runtime: number): CrossFormula { return c('profiling-gc', 'gc(collections, runtime) = ⌊collections · 1000 / runtime⌋', runtime > 0 ? Math.floor((collections * 1000) / runtime) : 0, nat(collections, runtime) && runtime > 0, 'gc', [collections, runtime]) }
}

for (const name of ['allocation', 'cachehit', 'flamegraph', 'gc', 'hotspot', 'overhead', 'speedup', 'throughput'] as const)
  hexRegisterOf('profiling', name, (ProfilingFormulas[name] as (...x: unknown[]) => unknown).bind(ProfilingFormulas))
