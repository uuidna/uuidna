import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHARMACOLOGY — DOSING AS ARITHMETIC (chosen by the registry, not by hand). How a drug moves through the body is
 *  numbers: elimination half-life, clearance, oral bioavailability, the loading amount, the therapeutic index, a
 *  weight-based dose, plasma protein binding, and the fraction eliminated. Crosses to `pharma` — the practice that
 *  prescribes what pharmacology measures. A measure. */

const PROOF = 'pharmacology arithmetic (half-life, clearance, bioavailability, loading, therapeutic index, dose, protein binding, elimination); a dosing domain; a measure crossed to pharma'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pharmacology', dst: 'pharma', formula, value, proof: PROOF, ...extra }, holds, { name: `pharmacology.${name}`, params })

export class PharmacologyFormulas {
  /** HALF-LIFE: t½ = 0.693 · V / CL, as a ⌊volume · 693 / (clearance · 1000)⌋ proxy. value 0 when clearance is 0. */
  static halflife(volume: number, clearance: number): CrossFormula { return c('pharmacology-halflife', 'halflife(volume, clearance) = ⌊volume · 693 / (clearance · 1000)⌋', clearance > 0 ? Math.floor((volume * 693) / (clearance * 1000)) : 0, nat(volume, clearance) && clearance > 0, 'halflife', [volume, clearance]) }
  /** CLEARANCE: dose over the area under the curve. value ⌊dose / auc⌋. */
  static clearance(dose: number, auc: number): CrossFormula { return c('pharmacology-clearance', 'clearance(dose, auc) = ⌊dose / auc⌋', auc > 0 ? Math.floor(dose / auc) : 0, nat(dose, auc) && auc > 0, 'clearance', [dose, auc]) }
  /** BIOAVAILABILITY: oral exposure as a percentage of intravenous. value ⌊oral · 100 / iv⌋. */
  static bioavailability(oral: number, iv: number): CrossFormula { return c('pharmacology-bioavailability', 'bioavailability(oral, iv) = ⌊oral · 100 / iv⌋', iv > 0 ? Math.floor((oral * 100) / iv) : 0, nat(oral, iv) && iv > 0 && oral <= iv, 'bioavailability', [oral, iv]) }
  /** LOADING: the amount to reach a target concentration in a volume. value concentration · volume. */
  static loading(concentration: number, volume: number): CrossFormula { return c('pharmacology-loading', 'loading(concentration, volume) = concentration · volume', concentration * volume, nat(concentration, volume), 'loading', [concentration, volume]) }
  /** THERAPEUTIC INDEX: the toxic dose over the effective dose. value ⌊toxic / effective⌋. */
  static therapeutic(toxic: number, effective: number): CrossFormula { return c('pharmacology-therapeutic', 'therapeutic(toxic, effective) = ⌊toxic / effective⌋', effective > 0 ? Math.floor(toxic / effective) : 0, nat(toxic, effective) && effective > 0, 'therapeutic', [toxic, effective]) }
  /** DOSE: a weight-based dose at a per-kilogram rate. value weight · rate. */
  static dose(weight: number, rate: number): CrossFormula { return c('pharmacology-dose', 'dose(weight, rate) = weight · rate', weight * rate, nat(weight, rate), 'dose', [weight, rate]) }
  /** PROTEIN BINDING: the bound fraction as a percentage of total. value ⌊bound · 100 / total⌋. */
  static bound(bound_: number, total: number): CrossFormula { return c('pharmacology-bound', 'bound(bound_, total) = ⌊bound_ · 100 / total⌋', total > 0 ? Math.floor((bound_ * 100) / total) : 0, nat(bound_, total) && total > 0 && bound_ <= total, 'bound', [bound_, total]) }
  /** ELIMINATION: the fraction cleared from an initial to a final concentration. value ⌊(initial − final) · 100 / initial⌋. */
  static elimination(initial: number, final: number): CrossFormula { return c('pharmacology-elimination', 'elimination(initial, final) = ⌊(initial − final) · 100 / initial⌋', initial > 0 ? Math.floor(((initial - final) * 100) / initial) : 0, nat(initial, final) && initial > 0 && final <= initial, 'elimination', [initial, final]) }
}

for (const name of ['bioavailability', 'bound', 'clearance', 'dose', 'elimination', 'halflife', 'loading', 'therapeutic'] as const)
  hexRegisterOf('pharmacology', name, (PharmacologyFormulas[name] as (...x: unknown[]) => unknown).bind(PharmacologyFormulas))
