import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MILLING — TURNING GRAIN INTO FLOUR, AS ARITHMETIC (the mill is numbers). Extraction rate, flour yield, grinding
 *  throughput, flour and bran mass balance, sieve fineness, grain moisture, and the blend of several grains. Crosses to
 *  `agriculture` — milling is what the harvest becomes. A measure. */

const PROOF = 'milling arithmetic (extraction, yield, throughput, flour, bran, fineness, moisture, blend); grain becomes flour; a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'milling', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `milling.${name}`, params })

export class MillingFormulas {
  /** EXTRACTION RATE: flour drawn from wheat, as a percentage. value ⌊flour · 100 / wheat⌋. */
  static extraction(flour: number, wheat: number): CrossFormula { return c('milling-extraction', 'extraction(flour, wheat) = ⌊flour · 100 / wheat⌋', wheat > 0 ? Math.floor((flour * 100) / wheat) : 0, nat(flour, wheat) && wheat > 0 && flour <= wheat, 'extraction', [flour, wheat]) }
  /** FLOUR YIELD: grain at an extraction rate. value ⌊grain · rate / 100⌋. */
  static yield(grain: number, rate: number): CrossFormula { return c('milling-yield', 'yield(grain, rate) = ⌊grain · rate / 100⌋', Math.floor((grain * rate) / 100), nat(grain, rate) && rate <= 100, 'yield', [grain, rate]) }
  /** THROUGHPUT: grain milled over hours. value ⌊grain / hours⌋. */
  static throughput(grain: number, hours: number): CrossFormula { return c('milling-throughput', 'throughput(grain, hours) = ⌊grain / hours⌋', hours > 0 ? Math.floor(grain / hours) : 0, nat(grain, hours) && hours > 0, 'throughput', [grain, hours]) }
  /** FLOUR MASS: total milled less the bran. value max(0, total − bran). */
  static flour(total: number, bran: number): CrossFormula { return c('milling-flour', 'flour(total, bran) = max(0, total − bran)', Math.max(0, total - bran), nat(total, bran), 'flour', [total, bran]) }
  /** BRAN BYPRODUCT: total milled less the flour. value max(0, total − flour). */
  static bran(total: number, flour: number): CrossFormula { return c('milling-bran', 'bran(total, flour) = max(0, total − flour)', Math.max(0, total - flour), nat(total, flour), 'bran', [total, flour]) }
  /** FINENESS: particles passing a sieve, as a percentage. value ⌊passed · 100 / total⌋. */
  static fineness(passed: number, total: number): CrossFormula { return c('milling-fineness', 'fineness(passed, total) = ⌊passed · 100 / total⌋', total > 0 ? Math.floor((passed * 100) / total) : 0, nat(passed, total) && total > 0 && passed <= total, 'fineness', [passed, total]) }
  /** MOISTURE: water in a grain mass, as a percentage. value ⌊water · 100 / mass⌋. */
  static moisture(water: number, mass: number): CrossFormula { return c('milling-moisture', 'moisture(water, mass) = ⌊water · 100 / mass⌋', mass > 0 ? Math.floor((water * 100) / mass) : 0, nat(water, mass) && mass > 0 && water <= mass, 'moisture', [water, mass]) }
  /** BLEND: the total mass of three grains milled together. value wheat + rye + barley. */
  static blend(wheat: number, rye: number, barley: number): CrossFormula { return c('milling-blend', 'blend(wheat, rye, barley) = wheat + rye + barley', wheat + rye + barley, nat(wheat, rye, barley), 'blend', [wheat, rye, barley]) }
}

for (const name of ['blend', 'bran', 'extraction', 'fineness', 'flour', 'moisture', 'throughput', 'yield'] as const)
  hexRegisterOf('milling', name, (MillingFormulas[name] as (...x: unknown[]) => unknown).bind(MillingFormulas))
