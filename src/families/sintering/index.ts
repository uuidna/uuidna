import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SINTERING — CONSOLIDATING A POWDER COMPACT INTO A SOLID, AS ARITHMETIC. Firing a green part below its melting point is
 *  numbers: relative density reached, the porosity left, how far the part shrank, the necks that grow between grains, the
 *  temperature held, the time at temperature, the density pressed before firing, and how far densification ran. Crosses to
 *  `metallurgy` — sintering is the process metallurgy measures in the finished part. A measure. */

const PROOF = 'sintering arithmetic (relative density, porosity, shrinkage, neck growth, temperature, hold time, green density, densification); a powder-metallurgy measure crossed to metallurgy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sintering', dst: 'metallurgy', formula, value, proof: PROOF, ...extra }, holds, { name: `sintering.${name}`, params })

export class SinteringFormulas {
  /** DENSIFICATION PARAMETER: how far firing closed the gap from green to full. value ⌊(sintered − green) · 100 / (theoretical − green)⌋. */
  static densification(sintered: number, green: number, theoretical: number): CrossFormula { const d = theoretical - green; return c('sintering-densification', 'densification(sintered, green, theoretical) = ⌊(sintered − green) · 100 / (theoretical − green)⌋', d > 0 ? Math.floor((Math.max(0, sintered - green) * 100) / d) : 0, nat(sintered, green, theoretical) && theoretical > green && sintered >= green, 'densification', [sintered, green, theoretical]) }
  /** RELATIVE DENSITY: the sintered density as a percent of theoretical. value ⌊sintered · 100 / theoretical⌋. */
  static density(sintered: number, theoretical: number): CrossFormula { return c('sintering-density', 'density(sintered, theoretical) = ⌊sintered · 100 / theoretical⌋', theoretical > 0 ? Math.floor((sintered * 100) / theoretical) : 0, nat(sintered, theoretical) && theoretical > 0 && sintered <= theoretical, 'density', [sintered, theoretical]) }
  /** GREEN DENSITY: the pressed compact's density, mass over volume (scaled). value ⌊mass · 100 / volume⌋. */
  static greendensity(mass: number, volume: number): CrossFormula { return c('sintering-greendensity', 'greendensity(mass, volume) = ⌊mass · 100 / volume⌋', volume > 0 ? Math.floor((mass * 100) / volume) : 0, nat(mass, volume) && volume > 0, 'greendensity', [mass, volume]) }
  /** HOLD TIME: minutes at the ramp rate to reach the sintering temperature. value ⌊temp / rate⌋. */
  static holdtime(temp: number, rate: number): CrossFormula { return c('sintering-holdtime', 'holdtime(temp, rate) = ⌊temp / rate⌋', rate > 0 ? Math.floor(temp / rate) : 0, nat(temp, rate) && rate > 0, 'holdtime', [temp, rate]) }
  /** NECK GROWTH: the neck diameter as a percent of the particle diameter. value ⌊neck · 100 / particle⌋. */
  static neckgrowth(neck: number, particle: number): CrossFormula { return c('sintering-neckgrowth', 'neckgrowth(neck, particle) = ⌊neck · 100 / particle⌋', particle > 0 ? Math.floor((neck * 100) / particle) : 0, nat(neck, particle) && particle > 0 && neck <= particle, 'neckgrowth', [neck, particle]) }
  /** POROSITY: the void fraction left, the complement of relative density. value max(0, 100 − relative). */
  static porosity(relative: number): CrossFormula { return c('sintering-porosity', 'porosity(relative) = max(0, 100 − relative)', Math.max(0, 100 - relative), nat(relative) && relative <= 100, 'porosity', [relative]) }
  /** LINEAR SHRINKAGE: how far the part shrank, as a percent of its initial length. value ⌊(initial − final) · 100 / initial⌋. */
  static shrinkage(initial: number, final: number): CrossFormula { return c('sintering-shrinkage', 'shrinkage(initial, final) = ⌊(initial − final) · 100 / initial⌋', initial > 0 ? Math.floor((Math.max(0, initial - final) * 100) / initial) : 0, nat(initial, final) && initial > 0 && final <= initial, 'shrinkage', [initial, final]) }
  /** SINTERING TEMPERATURE: a fraction of the melting point, held for firing. value ⌊melt · frac / 100⌋. */
  static temperature(melt: number, frac: number): CrossFormula { return c('sintering-temperature', 'temperature(melt, frac) = ⌊melt · frac / 100⌋', Math.floor((melt * frac) / 100), nat(melt, frac) && frac <= 100, 'temperature', [melt, frac]) }
}

for (const name of ['densification', 'density', 'greendensity', 'holdtime', 'neckgrowth', 'porosity', 'shrinkage', 'temperature'] as const)
  hexRegisterOf('sintering', name, (SinteringFormulas[name] as (...x: unknown[]) => unknown).bind(SinteringFormulas))
