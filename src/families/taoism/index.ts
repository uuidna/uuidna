import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TAOISM — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'taoism arithmetic (principles, trigrampairs, hexagrams, virtuecount, elementcombos, chaptercount, stageorderings, balanceratio); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'taoism', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `taoism.${name}`, params })

export class TaoismFormulas {
  static principles(x: number, y: number): CrossFormula { return c('taoism-principles', 'principles(x, y) = x + y', x + y, nat(x, y), 'principles', [x, y]) }
  static trigrampairs(x: number, y: number): CrossFormula { return c('taoism-trigrampairs', 'trigrampairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'trigrampairs', [x, y]) }
  static hexagrams(x: number, y: number): CrossFormula { return c('taoism-hexagrams', 'hexagrams(x, y) = x · y', x * y, nat(x, y), 'hexagrams', [x, y]) }
  static virtuecount(x: number, y: number): CrossFormula { return c('taoism-virtuecount', 'virtuecount(x, y) = x + y', x + y, nat(x, y), 'virtuecount', [x, y]) }
  static elementcombos(x: number, y: number): CrossFormula { return c('taoism-elementcombos', 'elementcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'elementcombos', [x, y]) }
  static chaptercount(x: number, y: number): CrossFormula { return c('taoism-chaptercount', 'chaptercount(x, y) = x · y', x * y, nat(x, y), 'chaptercount', [x, y]) }
  static stageorderings(x: number): CrossFormula { return c('taoism-stageorderings', 'stageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stageorderings', [x]) }
  static balanceratio(x: number, y: number): CrossFormula { return c('taoism-balanceratio', 'balanceratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'balanceratio', [x, y]) }
}

for (const name of ['balanceratio', 'chaptercount', 'elementcombos', 'hexagrams', 'principles', 'stageorderings', 'trigrampairs', 'virtuecount'] as const)
  hexRegisterOf('taoism', name, (TaoismFormulas[name] as (...x: unknown[]) => unknown).bind(TaoismFormulas))
