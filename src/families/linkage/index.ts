import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LINKAGE — scaffolded integer measures crossed to robotics. Every output an exact finite nonnegative integer. */

const PROOF = 'linkage arithmetic (degreesoffreedom, linkcount, jointcount, reach, transmissionangle, mechanicaladvantage, couplercurve, grashofcondition); scaffolded from the integer-op palette; a measure crossed to robotics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'linkage', dst: 'robotics', formula, value, proof: PROOF, ...extra }, holds, { name: `linkage.${name}`, params })

export class LinkageFormulas {
  static degreesoffreedom(x: number, y: number): CrossFormula { return c('linkage-degreesoffreedom', 'degreesoffreedom(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'degreesoffreedom', [x, y]) }
  static linkcount(x: number, y: number): CrossFormula { return c('linkage-linkcount', 'linkcount(x, y) = x + y', x + y, nat(x, y), 'linkcount', [x, y]) }
  static jointcount(x: number, y: number): CrossFormula { return c('linkage-jointcount', 'jointcount(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'jointcount', [x, y]) }
  static reach(x: number, y: number): CrossFormula { return c('linkage-reach', 'reach(x, y) = x · y', x * y, nat(x, y), 'reach', [x, y]) }
  static transmissionangle(x: number, y: number): CrossFormula { return c('linkage-transmissionangle', 'transmissionangle(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'transmissionangle', [x, y]) }
  static mechanicaladvantage(x: number, y: number): CrossFormula { return c('linkage-mechanicaladvantage', 'mechanicaladvantage(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'mechanicaladvantage', [x, y]) }
  static couplercurve(x: number, y: number): CrossFormula { return c('linkage-couplercurve', 'couplercurve(x, y) = x · y', x * y, nat(x, y), 'couplercurve', [x, y]) }
  static grashofcondition(x: number, y: number): CrossFormula { return c('linkage-grashofcondition', 'grashofcondition(x, y) = [x ≥ y]', x >= y ? 1 : 0, nat(x, y), 'grashofcondition', [x, y]) }
}

for (const name of ['couplercurve', 'degreesoffreedom', 'grashofcondition', 'jointcount', 'linkcount', 'mechanicaladvantage', 'reach', 'transmissionangle'] as const)
  hexRegisterOf('linkage', name, (LinkageFormulas[name] as (...x: unknown[]) => unknown).bind(LinkageFormulas))
