import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CREED — scaffolded integer measures crossed to sociology. Every output an exact finite nonnegative integer. */

const PROOF = 'creed arithmetic (articlecount, clausecombos, affirmationorderings, doctrinesubsets, councilcount, anathemacount, consensusratio, variantcreeds); scaffolded from the integer-op palette; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'creed', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `creed.${name}`, params })

export class CreedFormulas {
  static articlecount(x: number, y: number): CrossFormula { return c('creed-articlecount', 'articlecount(x, y) = x + y', x + y, nat(x, y), 'articlecount', [x, y]) }
  static clausecombos(x: number, y: number): CrossFormula { return c('creed-clausecombos', 'clausecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'clausecombos', [x, y]) }
  static affirmationorderings(x: number): CrossFormula { return c('creed-affirmationorderings', 'affirmationorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'affirmationorderings', [x]) }
  static doctrinesubsets(x: number): CrossFormula { return c('creed-doctrinesubsets', 'doctrinesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'doctrinesubsets', [x]) }
  static councilcount(x: number, y: number): CrossFormula { return c('creed-councilcount', 'councilcount(x, y) = x + y', x + y, nat(x, y), 'councilcount', [x, y]) }
  static anathemacount(x: number, y: number): CrossFormula { return c('creed-anathemacount', 'anathemacount(x, y) = x · y', x * y, nat(x, y), 'anathemacount', [x, y]) }
  static consensusratio(x: number, y: number): CrossFormula { return c('creed-consensusratio', 'consensusratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'consensusratio', [x, y]) }
  static variantcreeds(x: number, y: number): CrossFormula { return c('creed-variantcreeds', 'variantcreeds(x, y) = x + y', x + y, nat(x, y), 'variantcreeds', [x, y]) }
}

for (const name of ['affirmationorderings', 'anathemacount', 'articlecount', 'clausecombos', 'consensusratio', 'councilcount', 'doctrinesubsets', 'variantcreeds'] as const)
  hexRegisterOf('creed', name, (CreedFormulas[name] as (...x: unknown[]) => unknown).bind(CreedFormulas))
