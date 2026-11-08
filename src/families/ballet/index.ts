import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BALLET — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'ballet arithmetic (positions, barreexercises, turnrotations, jumpheight, sequenceorderings, portpairs, tempobpm, balancemargin); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ballet', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `ballet.${name}`, params })

export class BalletFormulas {
  static positions(x: number, y: number): CrossFormula { return c('ballet-positions', 'positions(x, y) = x + y', x + y, nat(x, y), 'positions', [x, y]) }
  static barreexercises(x: number, y: number): CrossFormula { return c('ballet-barreexercises', 'barreexercises(x, y) = x · y', x * y, nat(x, y), 'barreexercises', [x, y]) }
  static turnrotations(x: number, y: number): CrossFormula { return c('ballet-turnrotations', 'turnrotations(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'turnrotations', [x, y]) }
  static jumpheight(x: number, y: number): CrossFormula { return c('ballet-jumpheight', 'jumpheight(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'jumpheight', [x, y]) }
  static sequenceorderings(x: number): CrossFormula { return c('ballet-sequenceorderings', 'sequenceorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'sequenceorderings', [x]) }
  static portpairs(x: number, y: number): CrossFormula { return c('ballet-portpairs', 'portpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'portpairs', [x, y]) }
  static tempobpm(x: number, y: number): CrossFormula { return c('ballet-tempobpm', 'tempobpm(x, y) = x · y', x * y, nat(x, y), 'tempobpm', [x, y]) }
  static balancemargin(x: number, y: number): CrossFormula { return c('ballet-balancemargin', 'balancemargin(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'balancemargin', [x, y]) }
}

for (const name of ['balancemargin', 'barreexercises', 'jumpheight', 'portpairs', 'positions', 'sequenceorderings', 'tempobpm', 'turnrotations'] as const)
  hexRegisterOf('ballet', name, (BalletFormulas[name] as (...x: unknown[]) => unknown).bind(BalletFormulas))
