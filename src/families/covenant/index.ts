import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COVENANT — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'covenant arithmetic (partycount, clausecombos, conditionsubsets, obligationpairs, stageorderings, blessingcurses, renewalcycle, fulfillmentratio); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'covenant', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `covenant.${name}`, params })

export class CovenantFormulas {
  static partycount(x: number, y: number): CrossFormula { return c('covenant-partycount', 'partycount(x, y) = x + y', x + y, nat(x, y), 'partycount', [x, y]) }
  static clausecombos(x: number, y: number): CrossFormula { return c('covenant-clausecombos', 'clausecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'clausecombos', [x, y]) }
  static conditionsubsets(x: number): CrossFormula { return c('covenant-conditionsubsets', 'conditionsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'conditionsubsets', [x]) }
  static obligationpairs(x: number, y: number): CrossFormula { return c('covenant-obligationpairs', 'obligationpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'obligationpairs', [x, y]) }
  static stageorderings(x: number): CrossFormula { return c('covenant-stageorderings', 'stageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stageorderings', [x]) }
  static blessingcurses(x: number, y: number): CrossFormula { return c('covenant-blessingcurses', 'blessingcurses(x, y) = x + y', x + y, nat(x, y), 'blessingcurses', [x, y]) }
  static renewalcycle(x: number, y: number): CrossFormula { return c('covenant-renewalcycle', 'renewalcycle(x, y) = x · y', x * y, nat(x, y), 'renewalcycle', [x, y]) }
  static fulfillmentratio(x: number, y: number): CrossFormula { return c('covenant-fulfillmentratio', 'fulfillmentratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'fulfillmentratio', [x, y]) }
}

for (const name of ['blessingcurses', 'clausecombos', 'conditionsubsets', 'fulfillmentratio', 'obligationpairs', 'partycount', 'renewalcycle', 'stageorderings'] as const)
  hexRegisterOf('covenant', name, (CovenantFormulas[name] as (...x: unknown[]) => unknown).bind(CovenantFormulas))
