import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OVERTONE — THE HARMONIC SERIES AS ARITHMETIC. A plucked string or blown pipe sounds a fundamental and its overtones:
 *  the nth harmonic frequency, which harmonic a frequency is, a partial's amplitude, how far a stiff string's partial
 *  strays from the ideal, the sum of a run of harmonics, the fundamental read back from a harmonic, the spectral centroid,
 *  and how many harmonics fit a bandwidth. Crosses to `acoustics` — overtones are what acoustics hears. A measure. */

const PROOF = 'overtone arithmetic (harmonic frequency, harmonic number, partial amplitude, inharmonicity, series sum, fundamental, spectral centroid, harmonic count); the harmonic series as a measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'overtone', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `overtone.${name}`, params })

export class OvertoneFormulas {
  /** HARMONIC FREQUENCY: the nth harmonic of a fundamental. value fundamental · n. */
  static harmonicfreq(fundamental: number, n: number): CrossFormula { return c('overtone-harmonicfreq', 'harmonicfreq(fundamental, n) = fundamental · n', fundamental * n, nat(fundamental, n), 'harmonicfreq', [fundamental, n]) }
  /** HARMONIC NUMBER: which harmonic a frequency is. value ⌊freq / fundamental⌋. */
  static harmonicnumber(freq: number, fundamental: number): CrossFormula { return c('overtone-harmonicnumber', 'harmonicnumber(freq, fundamental) = ⌊freq / fundamental⌋', fundamental > 0 ? Math.floor(freq / fundamental) : 0, nat(freq, fundamental) && fundamental > 0, 'harmonicnumber', [freq, fundamental]) }
  /** PARTIAL AMPLITUDE: the nth partial of a 1/n spectrum. value ⌊a1 / n⌋. */
  static partialamplitude(a1: number, n: number): CrossFormula { return c('overtone-partialamplitude', 'partialamplitude(a1, n) = ⌊a1 / n⌋', n > 0 ? Math.floor(a1 / n) : 0, nat(a1, n) && n > 0, 'partialamplitude', [a1, n]) }
  /** INHARMONICITY: how far a stiff string's partial strays above the ideal. value max(0, actual − ideal). */
  static inharmonicity(actual: number, ideal: number): CrossFormula { return c('overtone-inharmonicity', 'inharmonicity(actual, ideal) = max(0, actual − ideal)', Math.max(0, actual - ideal), nat(actual, ideal), 'inharmonicity', [actual, ideal]) }
  /** SERIES SUM: the summed frequency of the first n harmonics. value fundamental · n · (n + 1) / 2. */
  static seriessum(fundamental: number, n: number): CrossFormula { return c('overtone-seriessum', 'seriessum(fundamental, n) = fundamental · n · (n + 1) / 2', fundamental * ((n * (n + 1)) / 2), nat(fundamental, n), 'seriessum', [fundamental, n]) }
  /** FUNDAMENTAL: read back from a known nth harmonic. value ⌊freq / n⌋. */
  static fundamentalfrom(freq: number, n: number): CrossFormula { return c('overtone-fundamentalfrom', 'fundamentalfrom(freq, n) = ⌊freq / n⌋', n > 0 ? Math.floor(freq / n) : 0, nat(freq, n) && n > 0, 'fundamentalfrom', [freq, n]) }
  /** SPECTRAL CENTROID: the amplitude-weighted mean frequency. value ⌊sumFreqAmp / sumAmp⌋. */
  static spectralcentroid(sumFreqAmp: number, sumAmp: number): CrossFormula { return c('overtone-spectralcentroid', 'spectralcentroid(sumFreqAmp, sumAmp) = ⌊sumFreqAmp / sumAmp⌋', sumAmp > 0 ? Math.floor(sumFreqAmp / sumAmp) : 0, nat(sumFreqAmp, sumAmp) && sumAmp > 0, 'spectralcentroid', [sumFreqAmp, sumAmp]) }
  /** HARMONIC COUNT: how many harmonics of a fundamental fit a bandwidth. value ⌊bandwidth / fundamental⌋. */
  static harmoniccount(bandwidth: number, fundamental: number): CrossFormula { return c('overtone-harmoniccount', 'harmoniccount(bandwidth, fundamental) = ⌊bandwidth / fundamental⌋', fundamental > 0 ? Math.floor(bandwidth / fundamental) : 0, nat(bandwidth, fundamental) && fundamental > 0, 'harmoniccount', [bandwidth, fundamental]) }
}

for (const name of ['fundamentalfrom', 'harmoniccount', 'harmonicfreq', 'harmonicnumber', 'inharmonicity', 'partialamplitude', 'seriessum', 'spectralcentroid'] as const)
  hexRegisterOf('overtone', name, (OvertoneFormulas[name] as (...x: unknown[]) => unknown).bind(OvertoneFormulas))
