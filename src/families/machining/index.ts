import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MACHINING — SUBTRACTIVE MANUFACTURING, AS ARITHMETIC (chosen by the registry, not by hand). Cutting metal is numbers:
 *  surface cutting speed, feed rate, material removal, dimensional tolerance in ppm, tool life, surface finish, chip load
 *  per tooth, and the pass rate of produced parts. Crosses to `manufacturing` — machining is how a part is made. A measure. */

const PROOF = 'machining arithmetic (cutting speed, feed rate, material removal, tolerance ppm, tool life, surface finish, chip load, pass rate); a subtractive-manufacturing domain; a measure crossed to manufacturing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'machining', dst: 'manufacturing', formula, value, proof: PROOF, ...extra }, holds, { name: `machining.${name}`, params })

export class MachiningFormulas {
  /** CHIP LOAD: feed per tooth. value ⌊feed / teeth⌋. */
  static chipload(feed: number, teeth: number): CrossFormula { return c('machining-chipload', 'chipload(feed, teeth) = ⌊feed / teeth⌋', teeth > 0 ? Math.floor(feed / teeth) : 0, nat(feed, teeth) && teeth > 0, 'chipload', [feed, teeth]) }
  /** CUTTING SPEED: surface speed proxy from diameter and spindle rpm. value ⌊diameter · rpm · 314 / 100000⌋. */
  static cuttingspeed(diameter: number, rpm: number): CrossFormula { return c('machining-cuttingspeed', 'cuttingspeed(diameter, rpm) = ⌊diameter · rpm · 314 / 100000⌋', Math.floor((diameter * rpm * 314) / 100000), nat(diameter, rpm), 'cuttingspeed', [diameter, rpm]) }
  /** FEED RATE: feed per revolution times rpm. value feed · rpm. */
  static feedrate(feed: number, rpm: number): CrossFormula { return c('machining-feedrate', 'feedrate(feed, rpm) = feed · rpm', feed * rpm, nat(feed, rpm), 'feedrate', [feed, rpm]) }
  /** MATERIAL REMOVAL: cross-section of the cut. value depth · width. */
  static materialremoval(depth: number, width: number): CrossFormula { return c('machining-materialremoval', 'materialremoval(depth, width) = depth · width', depth * width, nat(depth, width), 'materialremoval', [depth, width]) }
  /** PASS RATE: good parts as a percentage of produced. value ⌊good · 100 / produced⌋. */
  static passrate(good: number, produced: number): CrossFormula { return c('machining-passrate', 'passrate(good, produced) = ⌊good · 100 / produced⌋', produced > 0 ? Math.floor((good * 100) / produced) : 0, nat(good, produced) && produced > 0 && good <= produced, 'passrate', [good, produced]) }
  /** SURFACE FINISH: the roughness measure itself. value roughness. */
  static surfacefinish(roughness: number): CrossFormula { return c('machining-surfacefinish', 'surfacefinish(roughness) = roughness', roughness, nat(roughness), 'surfacefinish', [roughness]) }
  /** TOOL LIFE: material removed per unit of wear. value ⌊volume / wear⌋. */
  static toollife(volume: number, wear: number): CrossFormula { return c('machining-toollife', 'toollife(volume, wear) = ⌊volume / wear⌋', wear > 0 ? Math.floor(volume / wear) : 0, nat(volume, wear) && wear > 0, 'toollife', [volume, wear]) }
  /** TOLERANCE: deviation against nominal in parts per million. value ⌊deviation · 1000000 / nominal⌋. */
  static tolerance(deviation: number, nominal: number): CrossFormula { return c('machining-tolerance', 'tolerance(deviation, nominal) = ⌊deviation · 1000000 / nominal⌋', nominal > 0 ? Math.floor((deviation * 1000000) / nominal) : 0, nat(deviation, nominal) && nominal > 0, 'tolerance', [deviation, nominal]) }
}

for (const name of ['chipload', 'cuttingspeed', 'feedrate', 'materialremoval', 'passrate', 'surfacefinish', 'toollife', 'tolerance'] as const)
  hexRegisterOf('machining', name, (MachiningFormulas[name] as (...x: unknown[]) => unknown).bind(MachiningFormulas))
