import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SEROLOGY — scaffolded integer measures crossed to immunology. Every output an exact finite nonnegative integer. */

const PROOF = 'serology arithmetic (titer, dilutionfactor, antibodypairs, antigencombos, seroconversion, crossreactivity, bindingaffinity, panelsubsets); scaffolded from the integer-op palette; a measure crossed to immunology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'serology', dst: 'immunology', formula, value, proof: PROOF, ...extra }, holds, { name: `serology.${name}`, params })

export class SerologyFormulas {
  static titer(x: number): CrossFormula { return c('serology-titer', 'titer(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'titer', [x]) }
  static dilutionfactor(x: number, y: number): CrossFormula { return c('serology-dilutionfactor', 'dilutionfactor(x, y) = x · y', x * y, nat(x, y), 'dilutionfactor', [x, y]) }
  static antibodypairs(x: number, y: number): CrossFormula { return c('serology-antibodypairs', 'antibodypairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'antibodypairs', [x, y]) }
  static antigencombos(x: number, y: number): CrossFormula { return c('serology-antigencombos', 'antigencombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'antigencombos', [x, y]) }
  static seroconversion(x: number, y: number): CrossFormula { return c('serology-seroconversion', 'seroconversion(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'seroconversion', [x, y]) }
  static crossreactivity(x: number, y: number): CrossFormula { return c('serology-crossreactivity', 'crossreactivity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'crossreactivity', [x, y]) }
  static bindingaffinity(x: number, y: number): CrossFormula { return c('serology-bindingaffinity', 'bindingaffinity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'bindingaffinity', [x, y]) }
  static panelsubsets(x: number): CrossFormula { return c('serology-panelsubsets', 'panelsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'panelsubsets', [x]) }
}

for (const name of ['antibodypairs', 'antigencombos', 'bindingaffinity', 'crossreactivity', 'dilutionfactor', 'panelsubsets', 'seroconversion', 'titer'] as const)
  hexRegisterOf('serology', name, (SerologyFormulas[name] as (...x: unknown[]) => unknown).bind(SerologyFormulas))
