import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MIME — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'mime arithmetic (gestures, illusiontypes, isolationpoints, sequenceorderings, gesturepairs, tempobeats, spacegrid, claritypct); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mime', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `mime.${name}`, params })

export class MimeFormulas {
  static gestures(x: number, y: number): CrossFormula { return c('mime-gestures', 'gestures(x, y) = x + y', x + y, nat(x, y), 'gestures', [x, y]) }
  static illusiontypes(x: number, y: number): CrossFormula { return c('mime-illusiontypes', 'illusiontypes(x, y) = x · y', x * y, nat(x, y), 'illusiontypes', [x, y]) }
  static isolationpoints(x: number, y: number): CrossFormula { return c('mime-isolationpoints', 'isolationpoints(x, y) = x + y', x + y, nat(x, y), 'isolationpoints', [x, y]) }
  static sequenceorderings(x: number): CrossFormula { return c('mime-sequenceorderings', 'sequenceorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'sequenceorderings', [x]) }
  static gesturepairs(x: number, y: number): CrossFormula { return c('mime-gesturepairs', 'gesturepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'gesturepairs', [x, y]) }
  static tempobeats(x: number, y: number): CrossFormula { return c('mime-tempobeats', 'tempobeats(x, y) = x · y', x * y, nat(x, y), 'tempobeats', [x, y]) }
  static spacegrid(x: number, y: number): CrossFormula { return c('mime-spacegrid', 'spacegrid(x, y) = x · y', x * y, nat(x, y), 'spacegrid', [x, y]) }
  static claritypct(x: number, y: number): CrossFormula { return c('mime-claritypct', 'claritypct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'claritypct', [x, y]) }
}

for (const name of ['claritypct', 'gesturepairs', 'gestures', 'illusiontypes', 'isolationpoints', 'sequenceorderings', 'spacegrid', 'tempobeats'] as const)
  hexRegisterOf('mime', name, (MimeFormulas[name] as (...x: unknown[]) => unknown).bind(MimeFormulas))
