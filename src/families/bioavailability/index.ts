import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIOAVAILABILITY — HOW MUCH OF A DOSE REACHES THE BLOOD, AS ARITHMETIC. A drug given is not a drug absorbed: the
 *  absolute fraction against an IV reference, the relative fraction against another formulation, the fraction absorbed,
 *  the dose-corrected exposure, the raw AUC ratio, the share surviving first pass, the amount absorbed, and what is
 *  retained after elimination. Crosses to `pharmacology` — bioavailability is the first number pharmacology reads. */

const PROOF = 'bioavailability arithmetic (absolute F, relative F, fraction absorbed, dose-corrected AUC, AUC ratio, first-pass oral factor, amount absorbed, amount retained); the dose that reaches the blood; a measure crossed to pharmacology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bioavailability', dst: 'pharmacology', formula, value, proof: PROOF, ...extra }, holds, { name: `bioavailability.${name}`, params })

export class BioavailabilityFormulas {
  /** ABSOLUTE bioavailability F against an IV reference, as a percentage. value ⌊aucOral · 100 / aucIv⌋. */
  static absolute(aucOral: number, aucIv: number): CrossFormula { return c('bioavailability-absolute', 'absolute(aucOral, aucIv) = ⌊aucOral · 100 / aucIv⌋', aucIv > 0 ? Math.floor((aucOral * 100) / aucIv) : 0, nat(aucOral, aucIv) && aucIv > 0, 'absolute', [aucOral, aucIv]) }
  /** AMOUNT ABSORBED: the dose at a percent fraction. value ⌊dose · fraction / 100⌋. */
  static absorbed(dose: number, fraction: number): CrossFormula { return c('bioavailability-absorbed', 'absorbed(dose, fraction) = ⌊dose · fraction / 100⌋', Math.floor((dose * fraction) / 100), nat(dose, fraction) && fraction <= 100, 'absorbed', [dose, fraction]) }
  /** RAW AUC RATIO: one exposure over another. value ⌊auc1 / auc2⌋. */
  static aucratio(auc1: number, auc2: number): CrossFormula { return c('bioavailability-aucratio', 'aucratio(auc1, auc2) = ⌊auc1 / auc2⌋', auc2 > 0 ? Math.floor(auc1 / auc2) : 0, nat(auc1, auc2) && auc2 > 0, 'aucratio', [auc1, auc2]) }
  /** DOSE-CORRECTED exposure: AUC per unit of dose. value ⌊auc / dose⌋. */
  static dosecorrected(auc: number, dose: number): CrossFormula { return c('bioavailability-dosecorrected', 'dosecorrected(auc, dose) = ⌊auc / dose⌋', dose > 0 ? Math.floor(auc / dose) : 0, nat(auc, dose) && dose > 0, 'dosecorrected', [auc, dose]) }
  /** FRACTION absorbed of the dose, as a percentage. value ⌊absorbed · 100 / dose⌋. */
  static fraction(absorbed: number, dose: number): CrossFormula { return c('bioavailability-fraction', 'fraction(absorbed, dose) = ⌊absorbed · 100 / dose⌋', dose > 0 ? Math.floor((absorbed * 100) / dose) : 0, nat(absorbed, dose) && dose > 0 && absorbed <= dose, 'fraction', [absorbed, dose]) }
  /** FIRST-PASS ORAL FACTOR: the share of the dose surviving extraction, as a percentage. value ⌊(dose − extracted) · 100 / dose⌋. */
  static oralfactor(dose: number, extracted: number): CrossFormula { return c('bioavailability-oralfactor', 'oralfactor(dose, extracted) = ⌊(dose − extracted) · 100 / dose⌋', dose > 0 ? Math.floor((Math.max(0, dose - extracted) * 100) / dose) : 0, nat(dose, extracted) && dose > 0 && extracted <= dose, 'oralfactor', [dose, extracted]) }
  /** RELATIVE bioavailability against another formulation, as a percentage. value ⌊aucTest · 100 / aucRef⌋. */
  static relative(aucTest: number, aucRef: number): CrossFormula { return c('bioavailability-relative', 'relative(aucTest, aucRef) = ⌊aucTest · 100 / aucRef⌋', aucRef > 0 ? Math.floor((aucTest * 100) / aucRef) : 0, nat(aucTest, aucRef) && aucRef > 0, 'relative', [aucTest, aucRef]) }
  /** AMOUNT RETAINED after elimination. value max(0, absorbed − eliminated). */
  static retained(absorbed: number, eliminated: number): CrossFormula { return c('bioavailability-retained', 'retained(absorbed, eliminated) = max(0, absorbed − eliminated)', Math.max(0, absorbed - eliminated), nat(absorbed, eliminated), 'retained', [absorbed, eliminated]) }
}

for (const name of ['absolute', 'absorbed', 'aucratio', 'dosecorrected', 'fraction', 'oralfactor', 'relative', 'retained'] as const)
  hexRegisterOf('bioavailability', name, (BioavailabilityFormulas[name] as (...x: unknown[]) => unknown).bind(BioavailabilityFormulas))
