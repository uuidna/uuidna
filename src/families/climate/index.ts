import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CLIMATE — CLIMATE SCIENCE, AS ARITHMETIC. Warming is numbers: emissions from activity, the carbon budget left,
 *  temperature anomaly against a baseline, net emissions after capture, the warming a forcing drives, sea level over the
 *  years, the renewable share, and carbon intensity per unit of output. Crosses to `environment` — climate is what the
 *  environment measures. A measure. */

const PROOF = 'climate arithmetic (emissions, carbon budget, temperature anomaly, offset, warming, sea level, renewable share, carbon intensity); climate science as integers; a measure crossed to environment'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'climate', dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `climate.${name}`, params })

export class ClimateFormulas {
  /** EMISSIONS: an activity at an emission factor. value activity · factor. */
  static emissions(activity: number, factor: number): CrossFormula { return c('climate-emissions', 'emissions(activity, factor) = activity · factor', activity * factor, nat(activity, factor), 'emissions', [activity, factor]) }
  /** CARBON BUDGET: what is left of the allowance after what is emitted. value max(0, allowed − emitted). */
  static budget(emitted: number, allowed: number): CrossFormula { return c('climate-budget', 'budget(emitted, allowed) = max(0, allowed − emitted)', Math.max(0, allowed - emitted), nat(emitted, allowed), 'budget', [emitted, allowed]) }
  /** TEMPERATURE ANOMALY against a baseline (may be negative). value now − baseline. */
  static anomaly(now: number, baseline: number): CrossFormula { return c('climate-anomaly', 'anomaly(now, baseline) = now − baseline', now - baseline, nat(now, baseline), 'anomaly', [now, baseline]) }
  /** OFFSET: net emissions after capture. value max(0, emitted − captured). */
  static offset(emitted: number, captured: number): CrossFormula { return c('climate-offset', 'offset(emitted, captured) = max(0, emitted − captured)', Math.max(0, emitted - captured), nat(emitted, captured), 'offset', [emitted, captured]) }
  /** WARMING a radiative forcing drives at a sensitivity. value ⌊forcing · sensitivity / 100⌋. */
  static warming(forcing: number, sensitivity: number): CrossFormula { return c('climate-warming', 'warming(forcing, sensitivity) = ⌊forcing · sensitivity / 100⌋', Math.floor((forcing * sensitivity) / 100), nat(forcing, sensitivity), 'warming', [forcing, sensitivity]) }
  /** SEA LEVEL: a rate over the years. value rate · years. */
  static sealevel(rate: number, years: number): CrossFormula { return c('climate-sealevel', 'sealevel(rate, years) = rate · years', rate * years, nat(rate, years), 'sealevel', [rate, years]) }
  /** RENEWABLE share as a percentage. value ⌊clean · 100 / total⌋. */
  static renewable(clean: number, total: number): CrossFormula { return c('climate-renewable', 'renewable(clean, total) = ⌊clean · 100 / total⌋', total > 0 ? Math.floor((clean * 100) / total) : 0, nat(clean, total) && total > 0 && clean <= total, 'renewable', [clean, total]) }
  /** CARBON INTENSITY: emissions per unit of output. value ⌊emissions / gdp⌋. */
  static intensity(emissions: number, gdp: number): CrossFormula { return c('climate-intensity', 'intensity(emissions, gdp) = ⌊emissions / gdp⌋', gdp > 0 ? Math.floor(emissions / gdp) : 0, nat(emissions, gdp) && gdp > 0, 'intensity', [emissions, gdp]) }
}

for (const name of ['anomaly', 'budget', 'emissions', 'intensity', 'offset', 'renewable', 'sealevel', 'warming'] as const)
  hexRegisterOf('climate', name, (ClimateFormulas[name] as (...x: unknown[]) => unknown).bind(ClimateFormulas))
