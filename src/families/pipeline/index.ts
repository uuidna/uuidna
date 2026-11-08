import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PIPELINE — A CI/CD PIPELINE AS ARITHMETIC (the stages a build runs, not a wall of YAML). Running a pipeline is numbers:
 *  how many stages, how long each ran, which stage is the bottleneck, how work parallelises across stages, the success rate,
 *  the queue depth per worker, the cache hit rate, and throughput in builds per hour. Crosses to `cloud` — a pipeline is what
 *  runs on the cloud. A measure. */

const PROOF = 'pipeline arithmetic (stages, duration, bottleneck, parallelism, success rate, queue depth, cache hit, throughput); a build pipeline as numbers; a measure crossed to cloud'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pipeline', dst: 'cloud', formula, value, proof: PROOF, ...extra }, holds, { name: `pipeline.${name}`, params })

export class PipelineFormulas {
  /** STAGES: how many stages the pipeline runs. value count. */
  static stages(count: number): CrossFormula { return c('pipeline-stages', 'stages(count) = count', count, nat(count), 'stages', [count]) }
  /** DURATION: the wall time of a stage, start to end. value max(0, end − start). */
  static duration(start: number, end: number): CrossFormula { return c('pipeline-duration', 'duration(start, end) = max(0, end − start)', Math.max(0, end - start), nat(start, end), 'duration', [start, end]) }
  /** BOTTLENECK: the slowest stage as a percentage of the total. value ⌊slowest · 100 / total⌋. */
  static bottleneck(slowest: number, total: number): CrossFormula { return c('pipeline-bottleneck', 'bottleneck(slowest, total) = ⌊slowest · 100 / total⌋', total > 0 ? Math.floor((slowest * 100) / total) : 0, nat(slowest, total) && total > 0 && slowest <= total, 'bottleneck', [slowest, total]) }
  /** PARALLELISM: jobs spread across stages. value ⌊jobs / stages⌋. */
  static parallelism(jobs: number, stages_: number): CrossFormula { return c('pipeline-parallelism', 'parallelism(jobs, stages) = ⌊jobs / stages⌋', stages_ > 0 ? Math.floor(jobs / stages_) : 0, nat(jobs, stages_) && stages_ > 0, 'parallelism', [jobs, stages_]) }
  /** SUCCESS RATE: passed runs as a percentage. value ⌊passed · 100 / runs⌋. */
  static successrate(passed: number, runs: number): CrossFormula { return c('pipeline-successrate', 'successrate(passed, runs) = ⌊passed · 100 / runs⌋', runs > 0 ? Math.floor((passed * 100) / runs) : 0, nat(passed, runs) && runs > 0 && passed <= runs, 'successrate', [passed, runs]) }
  /** QUEUE: waiting jobs spread over the workers. value ⌊waiting / workers⌋. */
  static queue(waiting: number, workers: number): CrossFormula { return c('pipeline-queue', 'queue(waiting, workers) = ⌊waiting / workers⌋', workers > 0 ? Math.floor(waiting / workers) : 0, nat(waiting, workers) && workers > 0, 'queue', [waiting, workers]) }
  /** CACHE HIT: cached steps as a percentage. value ⌊cached · 100 / steps⌋. */
  static cachehit(cached: number, steps: number): CrossFormula { return c('pipeline-cachehit', 'cachehit(cached, steps) = ⌊cached · 100 / steps⌋', steps > 0 ? Math.floor((cached * 100) / steps) : 0, nat(cached, steps) && steps > 0 && cached <= steps, 'cachehit', [cached, steps]) }
  /** THROUGHPUT: builds over hours. value ⌊builds / hours⌋. */
  static throughput(builds: number, hours: number): CrossFormula { return c('pipeline-throughput', 'throughput(builds, hours) = ⌊builds / hours⌋', hours > 0 ? Math.floor(builds / hours) : 0, nat(builds, hours) && hours > 0, 'throughput', [builds, hours]) }
}

for (const name of ['bottleneck', 'cachehit', 'duration', 'parallelism', 'queue', 'stages', 'successrate', 'throughput'] as const)
  hexRegisterOf('pipeline', name, (PipelineFormulas[name] as (...x: unknown[]) => unknown).bind(PipelineFormulas))
