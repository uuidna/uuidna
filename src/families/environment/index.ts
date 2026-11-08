import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENVIRONMENT — POLLUTION AND ITS LIMITS, AS EVIDENCE. Harm to the environment is numbers: emissions over time, the
 *  exceedance above a permitted limit, a carbon footprint, a concentration in parts per million, the net after offsets,
 *  cumulative exposure, a penalty on the exceedance, and the remediation volume. A measure crossing to `evidence`,
 *  read into the record. */

const PROOF = 'environmental arithmetic (emissions, exceedance over a permit, footprint, concentration in ppm, net of offsets, cumulative exposure, penalty, remediation); a measure crossed to evidence'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const n = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'environment', dst: 'evidence', formula, value, proof: PROOF, ...extra }, holds, { name: `environment.${name}`, params })

export class EnvironmentFormulas {
  /** EMISSIONS: a rate over a number of hours. value rate · hours. */
  static emissions(rate: number, hours: number): CrossFormula { return n('environment-emissions', 'emissions(rate, hours) = rate · hours', rate * hours, nat(rate, hours), 'emissions', [rate, hours]) }
  /** EXCEEDANCE: how far a level is above the permitted limit. value max(0, level − limit). */
  static exceedance(level: number, limit: number): CrossFormula { return n('environment-exceedance', 'exceedance(level, limit) = max(0, level − limit)', Math.max(0, level - limit), nat(level, limit), 'exceedance', [level, limit]) }
  /** THE CARBON FOOTPRINT: an activity scaled by an emission factor. value activity · factor. */
  static footprint(activity: number, factor: number): CrossFormula { return n('environment-footprint', 'footprint(activity, factor) = activity · factor', activity * factor, nat(activity, factor), 'footprint', [activity, factor]) }
  /** CONCENTRATION in parts per million: a mass in a volume. value ⌊mass · 1000000 / volume⌋. */
  static concentration(mass: number, volume: number): CrossFormula { return n('environment-concentration', 'concentration(mass, volume) = ⌊mass · 1000000 / volume⌋', volume > 0 ? Math.floor((mass * 1000000) / volume) : 0, nat(mass, volume) && volume > 0, 'concentration', [mass, volume]) }
  /** THE NET EMISSIONS after offsets purchased or captured. value max(0, emitted − offset). */
  static offset(emitted: number, offset: number): CrossFormula { return n('environment-offset', 'offset(emitted, offset) = max(0, emitted − offset)', Math.max(0, emitted - offset), nat(emitted, offset), 'offset', [emitted, offset]) }
  /** CUMULATIVE EXPOSURE: a concentration over a duration. value concentration · duration. */
  static exposure(concentration: number, duration: number): CrossFormula { return n('environment-exposure', 'exposure(concentration, duration) = concentration · duration', concentration * duration, nat(concentration, duration), 'exposure', [concentration, duration]) }
  /** A PENALTY on the exceedance at a rate per unit. value exceedance · perUnit. */
  static penalty(exceedance: number, perUnit: number): CrossFormula { return n('environment-penalty', 'penalty(exceedance, perUnit) = exceedance · perUnit', exceedance * perUnit, nat(exceedance, perUnit), 'penalty', [exceedance, perUnit]) }
  /** REMEDIATION: a contaminated volume at a cost per unit. value volume · perUnit. */
  static remediation(volume: number, perUnit: number): CrossFormula { return n('environment-remediation', 'remediation(volume, perUnit) = volume · perUnit', volume * perUnit, nat(volume, perUnit), 'remediation', [volume, perUnit]) }
}

for (const name of ['concentration', 'emissions', 'exceedance', 'exposure', 'footprint', 'offset', 'penalty', 'remediation'] as const)
  hexRegisterOf('environment', name, (EnvironmentFormulas[name] as (...x: unknown[]) => unknown).bind(EnvironmentFormulas))
