import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CPU — THE CENTRAL PROCESSOR, AS ARITHMETIC. A CPU is numbers by the book: total cores across its dies, hardware
 *  threads under simultaneous multithreading, instructions per cycle, MIPS throughput, the cycles to drain a scalar
 *  pipeline, cache lines spanning a buffer, thermal design power, Amdahl's law bookkeeping, parallel speedup, and the
 *  turbo boost ceiling. Deterministic integer identities, standard CPU architecture. Crosses to `hardware`. A measure,
 *  not advice. */

const PROOF = 'CPU arithmetic by the book (cores = dies · per-die, threads = cores · SMT, instructions per cycle, MIPS = IPC · clock, the scalar pipeline drain stages + instructions − 1, cache lines ⌈bytes / line⌉, thermal design power = cores · per-core, Amdahl serial + parallel = 100, parallel speedup = ⌊serial / parallel⌋, turbo = base + boost); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cpu', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `cpu.${name}`, params })

export class CpuFormulas {
  /** CORES — total cores across the dies on the package. value dies · perDie. */
  static cores(dies: number, perDie: number): CrossFormula { return c('cpu-cores', 'cores(dies, perDie) = dies · perDie', dies * perDie, nat(dies, perDie), 'cores', [dies, perDie]) }
  /** THREADS — hardware threads: cores times the SMT width. value cores · smt. */
  static threads(cores: number, smt: number): CrossFormula { return c('cpu-threads', 'threads(cores, smt) = cores · smt', cores * smt, nat(cores, smt), 'threads', [cores, smt]) }
  /** IPC — instructions retired per cycle. value ⌊instructions / cycles⌋; holds cycles > 0. */
  static ipc(instructions: number, cycles: number): CrossFormula { return c('cpu-ipc', 'ipc(instructions, cycles) = ⌊instructions / cycles⌋', cycles > 0 ? Math.floor(instructions / cycles) : 0, nat(instructions, cycles) && cycles > 0, 'ipc', [instructions, cycles]) }
  /** MIPS — millions of instructions per second: IPC times the clock in MHz. value ipc · clockMHz. */
  static mips(ipc: number, clockMHz: number): CrossFormula { return c('cpu-mips', 'mips(ipc, clockMHz) = ipc · clockMHz', ipc * clockMHz, nat(ipc, clockMHz), 'mips', [ipc, clockMHz]) }
  /** PIPELINE — cycles to drain a scalar pipeline of so many stages for a run of instructions. value stages + instructions − 1. */
  static pipeline(stages: number, instructions: number): CrossFormula { return c('cpu-pipeline', 'pipeline(stages, instructions) = stages + instructions − 1', stages + instructions - 1, nat(stages, instructions), 'pipeline', [stages, instructions]) }
  /** CACHELINE — the cache lines a buffer of bytes spans, rounded up. value ⌈bytes / lineBytes⌉; holds lineBytes > 0. */
  static cacheline(bytes: number, lineBytes: number): CrossFormula { return c('cpu-cacheline', 'cacheline(bytes, lineBytes) = ⌈bytes / lineBytes⌉', lineBytes > 0 ? Math.ceil(bytes / lineBytes) : 0, nat(bytes, lineBytes) && lineBytes > 0, 'cacheline', [bytes, lineBytes]) }
  /** TDP — thermal design power: cores times the watts each core dissipates. value cores · perCore (watts). */
  static tdp(cores: number, perCore: number): CrossFormula { return c('cpu-tdp', 'tdp(cores, perCore) = cores · perCore (watts)', cores * perCore, nat(cores, perCore), 'tdp', [cores, perCore]) }
  /** AMDAHL — Amdahl's bookkeeping: the serial and parallel fractions of a workload. value serialPct + parallelPct; holds the split totals 100. */
  static amdahl(serialPct: number, parallelPct: number): CrossFormula { return c('cpu-amdahl', "amdahl(serialPct, parallelPct) = serialPct + parallelPct (= 100)", serialPct + parallelPct, nat(serialPct, parallelPct) && serialPct + parallelPct === 100, 'amdahl', [serialPct, parallelPct]) }
  /** SPEEDUP — parallel speedup: the serial time divided across the parallel workers. value ⌊serial / parallel⌋; holds parallel > 0. */
  static speedup(serial: number, parallel: number): CrossFormula { return c('cpu-speedup', 'speedup(serial, parallel) = ⌊serial / parallel⌋', parallel > 0 ? Math.floor(serial / parallel) : 0, nat(serial, parallel) && parallel > 0, 'speedup', [serial, parallel]) }
  /** TURBO — the turbo boost ceiling: base clock plus the boost headroom. value base + boost (MHz). */
  static turbo(base: number, boost: number): CrossFormula { return c('cpu-turbo', 'turbo(base, boost) = base + boost (MHz)', base + boost, nat(base, boost), 'turbo', [base, boost]) }
}

for (const name of ['amdahl', 'cacheline', 'cores', 'ipc', 'mips', 'pipeline', 'speedup', 'tdp', 'threads', 'turbo'] as const)
  hexRegisterOf('cpu', name, (CpuFormulas[name] as (...x: unknown[]) => unknown).bind(CpuFormulas))
