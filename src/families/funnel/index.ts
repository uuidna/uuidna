import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FUNNEL — THE CONVERSION FUNNEL, AS ARITHMETIC. A user journey is numbers: how many convert of those who entered, where they
 *  drop off, the pass rate of each step, how fast conversions accrue, which stage is the bottleneck, the value of a conversion,
 *  how many abandon what they started, and the completed throughput per hour. Crosses to `analytics` — a funnel is what analytics
 *  measures. A measure. */

const PROOF = 'funnel arithmetic (conversion, dropoff, step rate, velocity, bottleneck, value, abandonment, throughput); the conversion journey as integers; a measure crossed to analytics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'funnel', dst: 'analytics', formula, value, proof: PROOF, ...extra }, holds, { name: `funnel.${name}`, params })

export class FunnelFormulas {
  /** CONVERSION as a percentage of those who entered. value ⌊converted · 100 / entered⌋. */
  static conversion(converted: number, entered: number): CrossFormula { return c('funnel-conversion', 'conversion(converted, entered) = ⌊converted · 100 / entered⌋', entered > 0 ? Math.floor((converted * 100) / entered) : 0, nat(converted, entered) && entered > 0 && converted <= entered, 'conversion', [converted, entered]) }
  /** DROPOFF at a stage as a percentage of its arrivals. value ⌊lost · 100 / stage⌋. */
  static dropoff(lost: number, stage: number): CrossFormula { return c('funnel-dropoff', 'dropoff(lost, stage) = ⌊lost · 100 / stage⌋', stage > 0 ? Math.floor((lost * 100) / stage) : 0, nat(lost, stage) && stage > 0 && lost <= stage, 'dropoff', [lost, stage]) }
  /** STEP RATE: those who passed as a percentage of those who reached it. value ⌊passed · 100 / reached⌋. */
  static steprate(passed: number, reached: number): CrossFormula { return c('funnel-steprate', 'steprate(passed, reached) = ⌊passed · 100 / reached⌋', reached > 0 ? Math.floor((passed * 100) / reached) : 0, nat(passed, reached) && reached > 0 && passed <= reached, 'steprate', [passed, reached]) }
  /** VELOCITY: conversions per day. value ⌊converted / days⌋. */
  static velocity(converted: number, days: number): CrossFormula { return c('funnel-velocity', 'velocity(converted, days) = ⌊converted / days⌋', days > 0 ? Math.floor(converted / days) : 0, nat(converted, days) && days > 0, 'velocity', [converted, days]) }
  /** BOTTLENECK: those stuck as a percentage of the total. value ⌊stuck · 100 / total⌋. */
  static bottleneck(stuck: number, total: number): CrossFormula { return c('funnel-bottleneck', 'bottleneck(stuck, total) = ⌊stuck · 100 / total⌋', total > 0 ? Math.floor((stuck * 100) / total) : 0, nat(stuck, total) && total > 0 && stuck <= total, 'bottleneck', [stuck, total]) }
  /** VALUE: revenue per conversion. value ⌊revenue / conversions⌋. */
  static value(revenue: number, conversions: number): CrossFormula { return c('funnel-value', 'value(revenue, conversions) = ⌊revenue / conversions⌋', conversions > 0 ? Math.floor(revenue / conversions) : 0, nat(revenue, conversions) && conversions > 0, 'value', [revenue, conversions]) }
  /** ABANDONMENT as a percentage of those who started. value ⌊abandoned · 100 / started⌋. */
  static abandonment(abandoned: number, started: number): CrossFormula { return c('funnel-abandonment', 'abandonment(abandoned, started) = ⌊abandoned · 100 / started⌋', started > 0 ? Math.floor((abandoned * 100) / started) : 0, nat(abandoned, started) && started > 0 && abandoned <= started, 'abandonment', [abandoned, started]) }
  /** THROUGHPUT: completed per hour. value ⌊completed / hours⌋. */
  static throughput(completed: number, hours: number): CrossFormula { return c('funnel-throughput', 'throughput(completed, hours) = ⌊completed / hours⌋', hours > 0 ? Math.floor(completed / hours) : 0, nat(completed, hours) && hours > 0, 'throughput', [completed, hours]) }
}

for (const name of ['abandonment', 'bottleneck', 'conversion', 'dropoff', 'steprate', 'throughput', 'value', 'velocity'] as const)
  hexRegisterOf('funnel', name, (FunnelFormulas[name] as (...x: unknown[]) => unknown).bind(FunnelFormulas))
