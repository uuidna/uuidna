import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ONOMASTICS — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'onomastics arithmetic (namecount, surnamepairs, orderingchoices, frequencyrank, patronymiclayers, etymsubsets, variantspellings, distributionratio); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'onomastics', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `onomastics.${name}`, params })

export class OnomasticsFormulas {
  static namecount(x: number, y: number): CrossFormula { return c('onomastics-namecount', 'namecount(x, y) = x · y', x * y, nat(x, y), 'namecount', [x, y]) }
  static surnamepairs(x: number, y: number): CrossFormula { return c('onomastics-surnamepairs', 'surnamepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'surnamepairs', [x, y]) }
  static orderingchoices(x: number): CrossFormula { return c('onomastics-orderingchoices', 'orderingchoices(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'orderingchoices', [x]) }
  static frequencyrank(x: number, y: number): CrossFormula { return c('onomastics-frequencyrank', 'frequencyrank(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'frequencyrank', [x, y]) }
  static patronymiclayers(x: number, y: number): CrossFormula { return c('onomastics-patronymiclayers', 'patronymiclayers(x, y) = x + y', x + y, nat(x, y), 'patronymiclayers', [x, y]) }
  static etymsubsets(x: number): CrossFormula { return c('onomastics-etymsubsets', 'etymsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'etymsubsets', [x]) }
  static variantspellings(x: number, y: number): CrossFormula { return c('onomastics-variantspellings', 'variantspellings(x, y) = x · y', x * y, nat(x, y), 'variantspellings', [x, y]) }
  static distributionratio(x: number, y: number): CrossFormula { return c('onomastics-distributionratio', 'distributionratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'distributionratio', [x, y]) }
}

for (const name of ['distributionratio', 'etymsubsets', 'frequencyrank', 'namecount', 'orderingchoices', 'patronymiclayers', 'surnamepairs', 'variantspellings'] as const)
  hexRegisterOf('onomastics', name, (OnomasticsFormulas[name] as (...x: unknown[]) => unknown).bind(OnomasticsFormulas))
