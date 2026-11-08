import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CLEARANCE — DRUG ELIMINATION AS ARITHMETIC. How the body removes a drug is numbers: the kidney's renal clearance, the
 *  liver's hepatic clearance, their sum, the filtration fraction, the organ extraction ratio, the fraction surviving first
 *  pass, the residual dose, and clearance against GFR. Crosses to `pharmacology` — clearance is what pharmacology does to
 *  a dose. A measure. */

const PROOF = 'clearance arithmetic (renal, hepatic, total, filtration fraction, extraction ratio, first pass, residual dose, clearance ratio); drug elimination as a measure crossed to pharmacology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'clearance', dst: 'pharmacology', formula, value, proof: PROOF, ...extra }, holds, { name: `clearance.${name}`, params })

export class ClearanceFormulas {
  /** RENAL CLEARANCE: urine concentration · urine flow over plasma concentration. value ⌊urineConc · urineFlow / plasmaConc⌋. */
  static renal(urineConc: number, urineFlow: number, plasmaConc: number): CrossFormula { return c('clearance-renal', 'renal(urineConc, urineFlow, plasmaConc) = ⌊urineConc · urineFlow / plasmaConc⌋', plasmaConc > 0 ? Math.floor((urineConc * urineFlow) / plasmaConc) : 0, nat(urineConc, urineFlow, plasmaConc) && plasmaConc > 0, 'renal', [urineConc, urineFlow, plasmaConc]) }
  /** HEPATIC CLEARANCE: blood flow at an extraction ratio (percent). value ⌊flow · er / 100⌋. */
  static hepatic(flow: number, er: number): CrossFormula { return c('clearance-hepatic', 'hepatic(flow, er) = ⌊flow · er / 100⌋', Math.floor((flow * er) / 100), nat(flow, er) && er <= 100, 'hepatic', [flow, er]) }
  /** TOTAL CLEARANCE: renal plus hepatic. value renal + hepatic. */
  static total(renal: number, hepatic: number): CrossFormula { return c('clearance-total', 'total(renal, hepatic) = renal + hepatic', renal + hepatic, nat(renal, hepatic), 'total', [renal, hepatic]) }
  /** FILTRATION FRACTION: GFR over renal plasma flow, as a percent. value ⌊gfr · 100 / rpf⌋. */
  static filtration(gfr: number, rpf: number): CrossFormula { return c('clearance-filtration', 'filtration(gfr, rpf) = ⌊gfr · 100 / rpf⌋', rpf > 0 ? Math.floor((gfr * 100) / rpf) : 0, nat(gfr, rpf) && rpf > 0 && gfr <= rpf, 'filtration', [gfr, rpf]) }
  /** EXTRACTION RATIO: the fraction an organ removes, as a percent. value ⌊(cin − cout) · 100 / cin⌋. */
  static extractionratio(cin: number, cout: number): CrossFormula { return c('clearance-extractionratio', 'extractionratio(cin, cout) = ⌊max(0, cin − cout) · 100 / cin⌋', cin > 0 ? Math.floor((Math.max(0, cin - cout) * 100) / cin) : 0, nat(cin, cout) && cin > 0, 'extractionratio', [cin, cout]) }
  /** FIRST PASS: the percent of a dose surviving first-pass extraction. value max(0, 100 − er). */
  static firstpass(er: number): CrossFormula { return c('clearance-firstpass', 'firstpass(er) = max(0, 100 − er)', Math.max(0, 100 - er), nat(er) && er <= 100, 'firstpass', [er]) }
  /** RESIDUAL DOSE: what is left of a dose after the cleared amount. value max(0, dose − cleared). */
  static residual(dose: number, cleared: number): CrossFormula { return c('clearance-residual', 'residual(dose, cleared) = max(0, dose − cleared)', Math.max(0, dose - cleared), nat(dose, cleared), 'residual', [dose, cleared]) }
  /** CLEARANCE RATIO: clearance against GFR, as a percent. value ⌊clearance · 100 / gfr⌋. */
  static ratio(clearance: number, gfr: number): CrossFormula { return c('clearance-ratio', 'ratio(clearance, gfr) = ⌊clearance · 100 / gfr⌋', gfr > 0 ? Math.floor((clearance * 100) / gfr) : 0, nat(clearance, gfr) && gfr > 0, 'ratio', [clearance, gfr]) }
}

for (const name of ['extractionratio', 'filtration', 'firstpass', 'hepatic', 'ratio', 'renal', 'residual', 'total'] as const)
  hexRegisterOf('clearance', name, (ClearanceFormulas[name] as (...x: unknown[]) => unknown).bind(ClearanceFormulas))
