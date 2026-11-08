import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TIMBRE — THE COLOUR OF A SOUND, AS ARITHMETIC (what the ear hears past pitch and loudness). Timbre is numbers: how much
 *  energy sits high in the spectrum, how harmonic it is, where the spectral centre of mass falls, the odd-to-even balance,
 *  the attack in milliseconds, how far partials drift from their ideal, where the energy rolls off, and the Q of a formant.
 *  Crosses to `acoustics` — timbre is the perceived reading of what acoustics measures. A measure. */

const PROOF = 'timbre arithmetic (brightness, harmonic ratio, spectral centroid, odd/even balance, attack time, inharmonicity, rolloff, formant Q); the colour of a sound past pitch and loudness; a measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'timbre', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `timbre.${name}`, params })

export class TimbreFormulas {
  /** ATTACK TIME: how long the onset takes, in milliseconds, from samples at a sample rate. value ⌊samples · 1000 / rate⌋. */
  static attacktime(samples: number, rate: number): CrossFormula { return c('timbre-attacktime', 'attacktime(samples, rate) = ⌊samples · 1000 / rate⌋', rate > 0 ? Math.floor((samples * 1000) / rate) : 0, nat(samples, rate) && rate > 0, 'attacktime', [samples, rate]) }
  /** BRIGHTNESS: the percentage of spectral energy above the cutoff. value ⌊high · 100 / total⌋. */
  static brightness(high: number, total: number): CrossFormula { return c('timbre-brightness', 'brightness(high, total) = ⌊high · 100 / total⌋', total > 0 ? Math.floor((high * 100) / total) : 0, nat(high, total) && total > 0 && high <= total, 'brightness', [high, total]) }
  /** FORMANT: the Q of a formant, its centre frequency over its bandwidth. value ⌊freq / bandwidth⌋. */
  static formant(freq: number, bandwidth: number): CrossFormula { return c('timbre-formant', 'formant(freq, bandwidth) = ⌊freq / bandwidth⌋', bandwidth > 0 ? Math.floor(freq / bandwidth) : 0, nat(freq, bandwidth) && bandwidth > 0, 'formant', [freq, bandwidth]) }
  /** HARMONIC RATIO: the percentage of total energy that is harmonic. value ⌊harmonic · 100 / total⌋. */
  static harmonicratio(harmonic: number, total: number): CrossFormula { return c('timbre-harmonicratio', 'harmonicratio(harmonic, total) = ⌊harmonic · 100 / total⌋', total > 0 ? Math.floor((harmonic * 100) / total) : 0, nat(harmonic, total) && total > 0 && harmonic <= total, 'harmonicratio', [harmonic, total]) }
  /** INHARMONICITY: how far a partial drifts above its ideal harmonic, in parts per thousand. value ⌊max(0, partial − ideal) · 1000 / ideal⌋. */
  static inharmonicity(partial: number, ideal: number): CrossFormula { return c('timbre-inharmonicity', 'inharmonicity(partial, ideal) = ⌊max(0, partial − ideal) · 1000 / ideal⌋', ideal > 0 ? Math.floor((Math.max(0, partial - ideal) * 1000) / ideal) : 0, nat(partial, ideal) && ideal > 0, 'inharmonicity', [partial, ideal]) }
  /** ODD/EVEN BALANCE: odd-harmonic energy as a percentage of even-harmonic energy. value ⌊odd · 100 / even⌋. */
  static oddevenratio(odd: number, even: number): CrossFormula { return c('timbre-oddevenratio', 'oddevenratio(odd, even) = ⌊odd · 100 / even⌋', even > 0 ? Math.floor((odd * 100) / even) : 0, nat(odd, even) && even > 0, 'oddevenratio', [odd, even]) }
  /** ROLLOFF: the percentage of the spectrum below which the cumulative energy sits. value ⌊cumulative · 100 / total⌋. */
  static rolloff(cumulative: number, total: number): CrossFormula { return c('timbre-rolloff', 'rolloff(cumulative, total) = ⌊cumulative · 100 / total⌋', total > 0 ? Math.floor((cumulative * 100) / total) : 0, nat(cumulative, total) && total > 0 && cumulative <= total, 'rolloff', [cumulative, total]) }
  /** SPECTRAL CENTROID: the energy-weighted centre of the spectrum. value ⌊weighted / total⌋. */
  static spectralcentroid(weighted: number, total: number): CrossFormula { return c('timbre-spectralcentroid', 'spectralcentroid(weighted, total) = ⌊weighted / total⌋', total > 0 ? Math.floor(weighted / total) : 0, nat(weighted, total) && total > 0, 'spectralcentroid', [weighted, total]) }
}

for (const name of ['attacktime', 'brightness', 'formant', 'harmonicratio', 'inharmonicity', 'oddevenratio', 'rolloff', 'spectralcentroid'] as const)
  hexRegisterOf('timbre', name, (TimbreFormulas[name] as (...x: unknown[]) => unknown).bind(TimbreFormulas))
