import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** UROLOGY — THE URINARY TRACT AS ARITHMETIC (chosen by the clinical registry, not by hand). Measuring the tract is numbers:
 *  flow rate, residual fraction, PSA density, hourly output, stone size, voiding frequency, solute concentration, and the
 *  continence fraction. Crosses to `med` — urology is one of medicine's measures. A measure. */

const PROOF = 'urology arithmetic (flow rate, residual fraction, PSA density, output, stone size, frequency, concentration, continence); a clinical measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'urology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `urology.${name}`, params })

export class UrologyFormulas {
  /** FLOW RATE: voided volume over the seconds taken. value ⌊volume / seconds⌋. */
  static flowrate(volume: number, seconds: number): CrossFormula { return c('urology-flowrate', 'flowrate(volume, seconds) = ⌊volume / seconds⌋', seconds > 0 ? Math.floor(volume / seconds) : 0, nat(volume, seconds) && seconds > 0, 'flowrate', [volume, seconds]) }
  /** RESIDUAL FRACTION: post-void remaining as a percentage of capacity. value ⌊remaining · 100 / capacity⌋. */
  static residual(remaining: number, capacity: number): CrossFormula { return c('urology-residual', 'residual(remaining, capacity) = ⌊remaining · 100 / capacity⌋', capacity > 0 ? Math.floor((remaining * 100) / capacity) : 0, nat(remaining, capacity) && capacity > 0 && remaining <= capacity, 'residual', [remaining, capacity]) }
  /** PSA DENSITY: antigen over prostate volume. value ⌊antigen / volume⌋. */
  static psa(antigen: number, volume: number): CrossFormula { return c('urology-psa', 'psa(antigen, volume) = ⌊antigen / volume⌋', volume > 0 ? Math.floor(antigen / volume) : 0, nat(antigen, volume) && volume > 0, 'psa', [antigen, volume]) }
  /** HOURLY OUTPUT: volume over the hours observed. value ⌊volume / hours⌋. */
  static output(volume: number, hours: number): CrossFormula { return c('urology-output', 'output(volume, hours) = ⌊volume / hours⌋', hours > 0 ? Math.floor(volume / hours) : 0, nat(volume, hours) && hours > 0, 'output', [volume, hours]) }
  /** STONE SIZE: the stone diameter itself. value diameter. */
  static stone(diameter: number): CrossFormula { return c('urology-stone', 'stone(diameter) = diameter', diameter, nat(diameter), 'stone', [diameter]) }
  /** VOIDING FREQUENCY: voids per hour, scaled. value ⌊voids · 100 / hours⌋. */
  static frequency(voids: number, hours: number): CrossFormula { return c('urology-frequency', 'frequency(voids, hours) = ⌊voids · 100 / hours⌋', hours > 0 ? Math.floor((voids * 100) / hours) : 0, nat(voids, hours) && hours > 0, 'frequency', [voids, hours]) }
  /** SOLUTE CONCENTRATION: solutes over volume. value ⌊solutes / volume⌋. */
  static concentration(solutes: number, volume: number): CrossFormula { return c('urology-concentration', 'concentration(solutes, volume) = ⌊solutes / volume⌋', volume > 0 ? Math.floor(solutes / volume) : 0, nat(solutes, volume) && volume > 0, 'concentration', [solutes, volume]) }
  /** CONTINENCE: dry days as a percentage of the total. value ⌊dry · 100 / total⌋. */
  static continence(dry: number, total: number): CrossFormula { return c('urology-continence', 'continence(dry, total) = ⌊dry · 100 / total⌋', total > 0 ? Math.floor((dry * 100) / total) : 0, nat(dry, total) && total > 0 && dry <= total, 'continence', [dry, total]) }
}

for (const name of ['concentration', 'continence', 'flowrate', 'frequency', 'output', 'psa', 'residual', 'stone'] as const)
  hexRegisterOf('urology', name, (UrologyFormulas[name] as (...x: unknown[]) => unknown).bind(UrologyFormulas))
