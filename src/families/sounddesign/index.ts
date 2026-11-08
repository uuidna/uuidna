import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOUNDDESIGN — scaffolded integer measures crossed to acoustics. Every output an exact finite nonnegative integer. */

const PROOF = 'sounddesign arithmetic (layers, frequencybands, reverbms, mixpairs, dynamicrangedb, cuepoints, channelsubsets, loudnesslufs); scaffolded from the integer-op palette; a measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sounddesign', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `sounddesign.${name}`, params })

export class SounddesignFormulas {
  static layers(x: number, y: number): CrossFormula { return c('sounddesign-layers', 'layers(x, y) = x + y', x + y, nat(x, y), 'layers', [x, y]) }
  static frequencybands(x: number, y: number): CrossFormula { return c('sounddesign-frequencybands', 'frequencybands(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'frequencybands', [x, y]) }
  static reverbms(x: number, y: number): CrossFormula { return c('sounddesign-reverbms', 'reverbms(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'reverbms', [x, y]) }
  static mixpairs(x: number, y: number): CrossFormula { return c('sounddesign-mixpairs', 'mixpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'mixpairs', [x, y]) }
  static dynamicrangedb(x: number, y: number): CrossFormula { return c('sounddesign-dynamicrangedb', 'dynamicrangedb(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dynamicrangedb', [x, y]) }
  static cuepoints(x: number, y: number): CrossFormula { return c('sounddesign-cuepoints', 'cuepoints(x, y) = x · y', x * y, nat(x, y), 'cuepoints', [x, y]) }
  static channelsubsets(x: number): CrossFormula { return c('sounddesign-channelsubsets', 'channelsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'channelsubsets', [x]) }
  static loudnesslufs(x: number, y: number): CrossFormula { return c('sounddesign-loudnesslufs', 'loudnesslufs(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'loudnesslufs', [x, y]) }
}

for (const name of ['channelsubsets', 'cuepoints', 'dynamicrangedb', 'frequencybands', 'layers', 'loudnesslufs', 'mixpairs', 'reverbms'] as const)
  hexRegisterOf('sounddesign', name, (SounddesignFormulas[name] as (...x: unknown[]) => unknown).bind(SounddesignFormulas))
