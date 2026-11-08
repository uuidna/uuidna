import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GERONTOLOGY — scaffolded integer measures crossed to physiology. Every output an exact finite nonnegative integer. */

const PROOF = 'gerontology arithmetic (lifeexpectancy, telomerelength, frailtyindex, biologicalage, functionaldecline, comorbiditypairs, survivalfraction, doublingtime); scaffolded from the integer-op palette; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gerontology', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `gerontology.${name}`, params })

export class GerontologyFormulas {
  static lifeexpectancy(x: number, y: number): CrossFormula { return c('gerontology-lifeexpectancy', 'lifeexpectancy(x, y) = x + y', x + y, nat(x, y), 'lifeexpectancy', [x, y]) }
  static telomerelength(x: number, y: number): CrossFormula { return c('gerontology-telomerelength', 'telomerelength(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'telomerelength', [x, y]) }
  static frailtyindex(x: number, y: number): CrossFormula { return c('gerontology-frailtyindex', 'frailtyindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'frailtyindex', [x, y]) }
  static biologicalage(x: number, y: number): CrossFormula { return c('gerontology-biologicalage', 'biologicalage(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'biologicalage', [x, y]) }
  static functionaldecline(x: number, y: number): CrossFormula { return c('gerontology-functionaldecline', 'functionaldecline(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'functionaldecline', [x, y]) }
  static comorbiditypairs(x: number, y: number): CrossFormula { return c('gerontology-comorbiditypairs', 'comorbiditypairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'comorbiditypairs', [x, y]) }
  static survivalfraction(x: number, y: number): CrossFormula { return c('gerontology-survivalfraction', 'survivalfraction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'survivalfraction', [x, y]) }
  static doublingtime(x: number, y: number): CrossFormula { return c('gerontology-doublingtime', 'doublingtime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'doublingtime', [x, y]) }
}

for (const name of ['biologicalage', 'comorbiditypairs', 'doublingtime', 'frailtyindex', 'functionaldecline', 'lifeexpectancy', 'survivalfraction', 'telomerelength'] as const)
  hexRegisterOf('gerontology', name, (GerontologyFormulas[name] as (...x: unknown[]) => unknown).bind(GerontologyFormulas))
