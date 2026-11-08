import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OLIGOPOLY — scaffolded integer measures crossed to microeconomics. Every output an exact finite nonnegative integer. */

const PROOF = 'oligopoly arithmetic (firms, concentration, hhindex, collusiongain, reactionpairs, cournotoutput, marketsharesubsets, stabilityindex); scaffolded from the integer-op palette; a measure crossed to microeconomics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'oligopoly', dst: 'microeconomics', formula, value, proof: PROOF, ...extra }, holds, { name: `oligopoly.${name}`, params })

export class OligopolyFormulas {
  static firms(x: number, y: number): CrossFormula { return c('oligopoly-firms', 'firms(x, y) = x + y', x + y, nat(x, y), 'firms', [x, y]) }
  static concentration(x: number, y: number): CrossFormula { return c('oligopoly-concentration', 'concentration(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'concentration', [x, y]) }
  static hhindex(x: number, y: number): CrossFormula { return c('oligopoly-hhindex', 'hhindex(x, y) = x · y', x * y, nat(x, y), 'hhindex', [x, y]) }
  static collusiongain(x: number, y: number): CrossFormula { return c('oligopoly-collusiongain', 'collusiongain(x, y) = x · y', x * y, nat(x, y), 'collusiongain', [x, y]) }
  static reactionpairs(x: number, y: number): CrossFormula { return c('oligopoly-reactionpairs', 'reactionpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'reactionpairs', [x, y]) }
  static cournotoutput(x: number, y: number): CrossFormula { return c('oligopoly-cournotoutput', 'cournotoutput(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'cournotoutput', [x, y]) }
  static marketsharesubsets(x: number): CrossFormula { return c('oligopoly-marketsharesubsets', 'marketsharesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'marketsharesubsets', [x]) }
  static stabilityindex(x: number, y: number): CrossFormula { return c('oligopoly-stabilityindex', 'stabilityindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'stabilityindex', [x, y]) }
}

for (const name of ['collusiongain', 'concentration', 'cournotoutput', 'firms', 'hhindex', 'marketsharesubsets', 'reactionpairs', 'stabilityindex'] as const)
  hexRegisterOf('oligopoly', name, (OligopolyFormulas[name] as (...x: unknown[]) => unknown).bind(OligopolyFormulas))
