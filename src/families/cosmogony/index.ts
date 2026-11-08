import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COSMOGONY — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'cosmogony arithmetic (stageorderings, elementcombos, creationdays, emanationlevels, dualitypairs, cyclelength, principlesubsets, orderfromchaos); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cosmogony', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `cosmogony.${name}`, params })

export class CosmogonyFormulas {
  static stageorderings(x: number): CrossFormula { return c('cosmogony-stageorderings', 'stageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stageorderings', [x]) }
  static elementcombos(x: number, y: number): CrossFormula { return c('cosmogony-elementcombos', 'elementcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'elementcombos', [x, y]) }
  static creationdays(x: number, y: number): CrossFormula { return c('cosmogony-creationdays', 'creationdays(x, y) = x + y', x + y, nat(x, y), 'creationdays', [x, y]) }
  static emanationlevels(x: number): CrossFormula { return c('cosmogony-emanationlevels', 'emanationlevels(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'emanationlevels', [x]) }
  static dualitypairs(x: number, y: number): CrossFormula { return c('cosmogony-dualitypairs', 'dualitypairs(x, y) = x · y', x * y, nat(x, y), 'dualitypairs', [x, y]) }
  static cyclelength(x: number, y: number): CrossFormula { return c('cosmogony-cyclelength', 'cyclelength(x, y) = x · y', x * y, nat(x, y), 'cyclelength', [x, y]) }
  static principlesubsets(x: number): CrossFormula { return c('cosmogony-principlesubsets', 'principlesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'principlesubsets', [x]) }
  static orderfromchaos(x: number, y: number): CrossFormula { return c('cosmogony-orderfromchaos', 'orderfromchaos(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'orderfromchaos', [x, y]) }
}

for (const name of ['creationdays', 'cyclelength', 'dualitypairs', 'elementcombos', 'emanationlevels', 'orderfromchaos', 'principlesubsets', 'stageorderings'] as const)
  hexRegisterOf('cosmogony', name, (CosmogonyFormulas[name] as (...x: unknown[]) => unknown).bind(CosmogonyFormulas))
