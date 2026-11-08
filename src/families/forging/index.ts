import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FORGING — SHAPING METAL UNDER LOAD, AS ARITHMETIC. A press deforms a billet and the shop floor is numbers: the force a
 *  die must deliver, the reduction worked into a section, the strain taken, the load each die carries, the flow stress of
 *  the stock, the upset ratio, the energy a blow spends, and the draft removed per pass. Crosses to `metallurgy` — forging
 *  is what metallurgy governs. A measure. */

const PROOF = 'forging arithmetic (forge force, reduction, strain, die load, flow stress, upset ratio, blow energy, draft); shaping metal under load; a measure crossed to metallurgy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'forging', dst: 'metallurgy', formula, value, proof: PROOF, ...extra }, holds, { name: `forging.${name}`, params })

export class ForgingFormulas {
  /** FORGE FORCE: pressure over the contact area. value pressure · area. */
  static force(pressure: number, area: number): CrossFormula { return c('forging-force', 'force(pressure, area) = pressure · area', pressure * area, nat(pressure, area), 'force', [pressure, area]) }
  /** REDUCTION worked into a section, as a percentage. value ⌊(before − after) · 100 / before⌋. */
  static reduction(before: number, after: number): CrossFormula { return c('forging-reduction', 'reduction(before, after) = ⌊max(0, before − after) · 100 / before⌋', before > 0 ? Math.floor((Math.max(0, before - after) * 100) / before) : 0, nat(before, after) && before > 0, 'reduction', [before, after]) }
  /** ENGINEERING STRAIN as a percentage. value ⌊delta · 100 / original⌋. */
  static strain(delta: number, original: number): CrossFormula { return c('forging-strain', 'strain(delta, original) = ⌊delta · 100 / original⌋', original > 0 ? Math.floor((delta * 100) / original) : 0, nat(delta, original) && original > 0, 'strain', [delta, original]) }
  /** DIE LOAD: forge force shared across the dies. value ⌊force / dies⌋. */
  static dieload(force: number, dies: number): CrossFormula { return c('forging-dieload', 'dieload(force, dies) = ⌊force / dies⌋', dies > 0 ? Math.floor(force / dies) : 0, nat(force, dies) && dies > 0, 'dieload', [force, dies]) }
  /** FLOW STRESS: base strength at a strain-hardening factor. value strength · factor. */
  static flowstress(strength: number, factor: number): CrossFormula { return c('forging-flowstress', 'flowstress(strength, factor) = strength · factor', strength * factor, nat(strength, factor), 'flowstress', [strength, factor]) }
  /** UPSET RATIO: billet height over its diameter. value ⌊height / diameter⌋. */
  static upsetratio(height: number, diameter: number): CrossFormula { return c('forging-upsetratio', 'upsetratio(height, diameter) = ⌊height / diameter⌋', diameter > 0 ? Math.floor(height / diameter) : 0, nat(height, diameter) && diameter > 0, 'upsetratio', [height, diameter]) }
  /** BLOW ENERGY: forge force over the stroke distance. value force · distance. */
  static energy(force: number, distance: number): CrossFormula { return c('forging-energy', 'energy(force, distance) = force · distance', force * distance, nat(force, distance), 'energy', [force, distance]) }
  /** DRAFT: thickness removed in a pass. value max(0, before − after). */
  static draft(before: number, after: number): CrossFormula { return c('forging-draft', 'draft(before, after) = max(0, before − after)', Math.max(0, before - after), nat(before, after), 'draft', [before, after]) }
}

for (const name of ['dieload', 'draft', 'energy', 'flowstress', 'force', 'reduction', 'strain', 'upsetratio'] as const)
  hexRegisterOf('forging', name, (ForgingFormulas[name] as (...x: unknown[]) => unknown).bind(ForgingFormulas))
