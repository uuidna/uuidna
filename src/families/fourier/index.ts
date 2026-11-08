import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FOURIER — THE FREQUENCY DOMAIN, AS ARITHMETIC (chosen by the public-API registry, not by hand). A transform is numbers:
 *  the width of a bin, the resolution a window buys, the Nyquist limit, the harmonics of a tone, the work an FFT costs,
 *  the power in a spectrum, the fundamental of a period, and the energy that leaks past the main bin. Crosses to `signal` —
 *  fourier is how a signal reads in frequency. A measure. */

const PROOF = 'fourier arithmetic (bin width, frequency resolution, Nyquist, harmonics, FFT operations, spectral power, fundamental, leakage); a frequency-domain domain named by the public-API registry; a measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fourier', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `fourier.${name}`, params })

export class FourierFormulas {
  /** BIN WIDTH: the sample rate spread across the FFT size. value ⌊rate / size⌋. */
  static binwidth(rate: number, size: number): CrossFormula { return c('fourier-binwidth', 'binwidth(rate, size) = ⌊rate / size⌋', size > 0 ? Math.floor(rate / size) : 0, nat(rate, size) && size > 0, 'binwidth', [rate, size]) }
  /** FFT OPERATIONS: n points at a log2 proxy of passes. value n · k. */
  static fftoperations(n: number, k: number): CrossFormula { return c('fourier-fftoperations', 'fftoperations(n, k) = n · k', n * k, nat(n, k), 'fftoperations', [n, k]) }
  /** FREQUENCY RESOLUTION: the sample rate over the window length. value ⌊rate / n⌋. */
  static frequencyresolution(rate: number, n: number): CrossFormula { return c('fourier-frequencyresolution', 'frequencyresolution(rate, n) = ⌊rate / n⌋', n > 0 ? Math.floor(rate / n) : 0, nat(rate, n) && n > 0, 'frequencyresolution', [rate, n]) }
  /** FUNDAMENTAL FREQUENCY: the sample rate over the period in samples. value ⌊rate / period⌋. */
  static fundamentalfrequency(rate: number, period: number): CrossFormula { return c('fourier-fundamentalfrequency', 'fundamentalfrequency(rate, period) = ⌊rate / period⌋', period > 0 ? Math.floor(rate / period) : 0, nat(rate, period) && period > 0, 'fundamentalfrequency', [rate, period]) }
  /** HARMONICS: a fundamental repeated as integer multiples. value fundamental · count. */
  static harmonics(fundamental: number, count: number): CrossFormula { return c('fourier-harmonics', 'harmonics(fundamental, count) = fundamental · count', fundamental * count, nat(fundamental, count), 'harmonics', [fundamental, count]) }
  /** LEAKAGE: energy outside the main bin, never negative. value max(0, total − inband). */
  static leakage(total: number, inband: number): CrossFormula { return c('fourier-leakage', 'leakage(total, inband) = max(0, total − inband)', Math.max(0, total - inband), nat(total, inband), 'leakage', [total, inband]) }
  /** NYQUIST: the highest representable frequency, half the sample rate. value ⌊rate / 2⌋. */
  static nyquist(rate: number): CrossFormula { return c('fourier-nyquist', 'nyquist(rate) = ⌊rate / 2⌋', Math.floor(rate / 2), nat(rate), 'nyquist', [rate]) }
  /** SPECTRAL POWER: the squared magnitude of a bin. value real · real + imag · imag. */
  static spectralpower(real: number, imag: number): CrossFormula { return c('fourier-spectralpower', 'spectralpower(real, imag) = real · real + imag · imag', real * real + imag * imag, nat(real, imag), 'spectralpower', [real, imag]) }
}

for (const name of ['binwidth', 'fftoperations', 'frequencyresolution', 'fundamentalfrequency', 'harmonics', 'leakage', 'nyquist', 'spectralpower'] as const)
  hexRegisterOf('fourier', name, (FourierFormulas[name] as (...x: unknown[]) => unknown).bind(FourierFormulas))
