import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FORMANT — THE RESONANCES OF SPEECH, AS ARITHMETIC. A vocal tract shapes sound into formants: bands of energy whose
 *  center, width and spacing name the vowel. Numbers: the center of a band, its bandwidth, the F1/F2 ratio, the vowel
 *  space, the spacing between formants, the sharpness Q, the dispersion and the resonance peak. Crosses to `acoustics` —
 *  formants are what acoustics measures in a voice. A measure. */

const PROOF = 'formant arithmetic (center frequency, bandwidth, F1/F2 ratio, vowel space, formant spacing, Q factor, dispersion, resonance peak); the resonances of speech as numbers; a measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'formant', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `formant.${name}`, params })

export class FormantFormulas {
  /** CENTER FREQUENCY: the midpoint of a band's edges. value ⌊(low + high) / 2⌋. */
  static centerfrequency(low: number, high: number): CrossFormula { return c('formant-centerfrequency', 'centerfrequency(low, high) = ⌊(low + high) / 2⌋', Math.floor((low + high) / 2), nat(low, high) && low <= high, 'centerfrequency', [low, high]) }
  /** BANDWIDTH: the width of a band from its edges. value max(0, high − low). */
  static bandwidth(high: number, low: number): CrossFormula { return c('formant-bandwidth', 'bandwidth(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low) && high >= low, 'bandwidth', [high, low]) }
  /** F1/F2 RATIO as a percentage. value f1>0 ? ⌊f2 · 100 / f1⌋ : 0. */
  static f1f2ratio(f2: number, f1: number): CrossFormula { return c('formant-f1f2ratio', 'f1f2ratio(f2, f1) = ⌊f2 · 100 / f1⌋', f1 > 0 ? Math.floor((f2 * 100) / f1) : 0, nat(f2, f1) && f1 > 0, 'f1f2ratio', [f2, f1]) }
  /** VOWEL SPACE: the rectangular area spanned by the F1 and F2 ranges. value f1span · f2span. */
  static vowelspace(f1span: number, f2span: number): CrossFormula { return c('formant-vowelspace', 'vowelspace(f1span, f2span) = f1span · f2span', f1span * f2span, nat(f1span, f2span), 'vowelspace', [f1span, f2span]) }
  /** FORMANT SPACING: the average gap across a range of formants. value gaps>0 ? ⌊range / gaps⌋ : 0, gaps = count − 1. */
  static formantspacing(range: number, count: number): CrossFormula { const g = Math.max(0, count - 1); return c('formant-formantspacing', 'formantspacing(range, count) = ⌊range / (count − 1)⌋', g > 0 ? Math.floor(range / g) : 0, nat(range, count) && count > 1, 'formantspacing', [range, count]) }
  /** Q FACTOR: the sharpness of a resonance, center over bandwidth. value bw>0 ? ⌊center / bw⌋ : 0. */
  static qfactor(center: number, bw: number): CrossFormula { return c('formant-qfactor', 'qfactor(center, bw) = ⌊center / bw⌋', bw > 0 ? Math.floor(center / bw) : 0, nat(center, bw) && bw > 0, 'qfactor', [center, bw]) }
  /** DISPERSION: the mean spacing of formants from lowest to highest. value gaps>0 ? ⌊(hi − lo) / gaps⌋ : 0, gaps = n − 1. */
  static dispersion(hi: number, lo: number, n: number): CrossFormula { const g = Math.max(0, n - 1); return c('formant-dispersion', 'dispersion(hi, lo, n) = ⌊(hi − lo) / (n − 1)⌋', g > 0 ? Math.floor(Math.max(0, hi - lo) / g) : 0, nat(hi, lo, n) && n > 1 && hi >= lo, 'dispersion', [hi, lo, n]) }
  /** RESONANCE PEAK: the peak amplitude from gain and Q. value gain · q. */
  static resonancepeak(gain: number, q: number): CrossFormula { return c('formant-resonancepeak', 'resonancepeak(gain, q) = gain · q', gain * q, nat(gain, q), 'resonancepeak', [gain, q]) }
}

for (const name of ['bandwidth', 'centerfrequency', 'dispersion', 'f1f2ratio', 'formantspacing', 'qfactor', 'resonancepeak', 'vowelspace'] as const)
  hexRegisterOf('formant', name, (FormantFormulas[name] as (...x: unknown[]) => unknown).bind(FormantFormulas))
