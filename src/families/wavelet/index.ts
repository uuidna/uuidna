import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WAVELET — MULTIRESOLUTION ANALYSIS AS ARITHMETIC (chosen by the transform registry, not by hand). A wavelet decomposition
 *  is numbers: how many levels a signal admits, the scale at a level, the coefficients a level carries, how much a thresholded
 *  reconstruction compresses, the subbands a decomposition yields, the energy in a band, the vanishing moments of a filter, and
 *  the detail coefficients spread across levels. Crosses to `signal` — a wavelet is how a signal is read. A measure. */

const PROOF = 'wavelet arithmetic (levels, scale, coefficients, compression, decomposition, energy, vanishing moments, detail coefficients); a multiresolution measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'wavelet', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `wavelet.${name}`, params })

export class WaveletFormulas {
  /** LEVELS: the decomposition levels a signal of a length admits at a base window. value ⌊length / base⌋. */
  static levels(length: number, base: number): CrossFormula { return c('wavelet-levels', 'levels(length, base) = ⌊length / base⌋', base > 0 ? Math.floor(length / base) : 0, nat(length, base) && base > 0, 'levels', [length, base]) }
  /** SCALE: the scale factor at a level for a base dilation. value factor · level. */
  static scale(factor: number, level: number): CrossFormula { return c('wavelet-scale', 'scale(factor, level) = factor · level', factor * level, nat(factor, level), 'scale', [factor, level]) }
  /** COEFFICIENTS: the coefficients a level carries over a signal length. value ⌊length / level⌋. */
  static coefficients(length: number, level: number): CrossFormula { return c('wavelet-coefficients', 'coefficients(length, level) = ⌊length / level⌋', level > 0 ? Math.floor(length / level) : 0, nat(length, level) && level > 0, 'coefficients', [length, level]) }
  /** COMPRESSION as a percentage: the fraction of coefficients dropped. value ⌊(original − retained) · 100 / original⌋. */
  static compression(original: number, retained: number): CrossFormula { return c('wavelet-compression', 'compression(original, retained) = ⌊(original − retained) · 100 / original⌋', original > 0 ? Math.floor((Math.max(0, original - retained) * 100) / original) : 0, nat(original, retained) && original > 0 && retained <= original, 'compression', [original, retained]) }
  /** DECOMPOSITION: the subbands a decomposition yields from approximation and detail bands. value approx + detail. */
  static decomposition(approx: number, detail: number): CrossFormula { return c('wavelet-decomposition', 'decomposition(approx, detail) = approx + detail', approx + detail, nat(approx, detail), 'decomposition', [approx, detail]) }
  /** ENERGY: the energy in a band, amplitude over its samples. value amplitude · samples. */
  static energy(amplitude: number, samples: number): CrossFormula { return c('wavelet-energy', 'energy(amplitude, samples) = amplitude · samples', amplitude * samples, nat(amplitude, samples), 'energy', [amplitude, samples]) }
  /** VANISHING MOMENTS: a Daubechies filter of a tap count has half as many vanishing moments. value ⌊taps / 2⌋. */
  static vanishingmoments(taps: number): CrossFormula { return c('wavelet-vanishingmoments', 'vanishingmoments(taps) = ⌊taps / 2⌋', 2 > 0 ? Math.floor(taps / 2) : 0, nat(taps), 'vanishingmoments', [taps]) }
  /** DETAIL COEFFICIENTS: the detail coefficients spread across a band count, rounded up. value ⌈coeffs / bands⌉. */
  static detailcoeffs(coeffs: number, bands: number): CrossFormula { return c('wavelet-detailcoeffs', 'detailcoeffs(coeffs, bands) = ⌈coeffs / bands⌉', bands > 0 ? Math.ceil(coeffs / bands) : 0, nat(coeffs, bands) && bands > 0, 'detailcoeffs', [coeffs, bands]) }
}

for (const name of ['coefficients', 'compression', 'decomposition', 'detailcoeffs', 'energy', 'levels', 'scale', 'vanishingmoments'] as const)
  hexRegisterOf('wavelet', name, (WaveletFormulas[name] as (...x: unknown[]) => unknown).bind(WaveletFormulas))
