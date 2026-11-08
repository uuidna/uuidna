import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TOOLING — THE MACHINE SHOP AS ARITHMETIC (cutting tools, molds and their upkeep). Making parts is numbers: how many
 *  parts a tool lives for, the wear it takes, the feed and cutting speed of the spindle, the depth per pass, the cavities
 *  a mold holds, the maintenance cycles a machine runs, and how fully it is used. Crosses to `mechanical` — tooling is
 *  what the mechanical domain drives. A measure. */

const PROOF = 'tooling arithmetic (tool life, wear, feed, cutting speed, depth per pass, mold cavities, maintenance cycles, utilization); the machine shop as a measure crossed to mechanical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tooling', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, { name: `tooling.${name}`, params })

export class ToolingFormulas {
  /** TOOL LIFE: parts a tool makes before end of life, cutting distance over wear per part. value ⌊distance / perPart⌋. */
  static life(distance: number, perPart: number): CrossFormula { return c('tooling-life', 'life(distance, perPart) = ⌊distance / perPart⌋', perPart > 0 ? Math.floor(distance / perPart) : 0, nat(distance, perPart) && perPart > 0, 'life', [distance, perPart]) }
  /** WEAR: total wear (microns) over the parts cut at a wear rate each. value parts · rate. */
  static wear(parts: number, rate: number): CrossFormula { return c('tooling-wear', 'wear(parts, rate) = parts · rate', parts * rate, nat(parts, rate), 'wear', [parts, rate]) }
  /** FEED: table feed (mm/min) from spindle speed and feed per revolution. value rpm · perRev. */
  static feed(rpm: number, perRev: number): CrossFormula { return c('tooling-feed', 'feed(rpm, perRev) = rpm · perRev', rpm * perRev, nat(rpm, perRev), 'feed', [rpm, perRev]) }
  /** CUTTING SPEED: surface speed (m/min) from spindle speed and tool circumference (mm). value ⌊rpm · circumference / 1000⌋. */
  static speed(rpm: number, circumference: number): CrossFormula { return c('tooling-speed', 'speed(rpm, circumference) = ⌊rpm · circumference / 1000⌋', Math.floor((rpm * circumference) / 1000), nat(rpm, circumference), 'speed', [rpm, circumference]) }
  /** DEPTH PER PASS: a total depth spread over the passes. value ⌈total / passes⌉. */
  static depth(total: number, passes: number): CrossFormula { return c('tooling-depth', 'depth(total, passes) = ⌈total / passes⌉', passes > 0 ? Math.ceil(total / passes) : 0, nat(total, passes) && passes > 0, 'depth', [total, passes]) }
  /** CAVITIES: parts a mold holds, platen area over a part footprint. value ⌊platen / footprint⌋. */
  static cavities(platen: number, footprint: number): CrossFormula { return c('tooling-cavities', 'cavities(platen, footprint) = ⌊platen / footprint⌋', footprint > 0 ? Math.floor(platen / footprint) : 0, nat(platen, footprint) && footprint > 0, 'cavities', [platen, footprint]) }
  /** MAINTENANCE: service cycles a machine runs, run hours over a service interval. value ⌊hours / interval⌋. */
  static maintenance(hours: number, interval: number): CrossFormula { return c('tooling-maintenance', 'maintenance(hours, interval) = ⌊hours / interval⌋', interval > 0 ? Math.floor(hours / interval) : 0, nat(hours, interval) && interval > 0, 'maintenance', [hours, interval]) }
  /** UTILIZATION as a percentage: run time over available time. value ⌊run · 100 / total⌋. */
  static utilization(run: number, total: number): CrossFormula { return c('tooling-utilization', 'utilization(run, total) = ⌊run · 100 / total⌋', total > 0 ? Math.floor((run * 100) / total) : 0, nat(run, total) && total > 0 && run <= total, 'utilization', [run, total]) }
}

for (const name of ['cavities', 'depth', 'feed', 'life', 'maintenance', 'speed', 'utilization', 'wear'] as const)
  hexRegisterOf('tooling', name, (ToolingFormulas[name] as (...x: unknown[]) => unknown).bind(ToolingFormulas))
