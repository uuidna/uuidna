import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOGIC — PROPOSITIONAL REASONING AS ARITHMETIC. Truth is numbers: the rows of a truth table, AND and OR over 0/1 (or
 *  counts), material implication and equivalence as indicators, the share of satisfying models, the share of true cases,
 *  and proof steps per axiom. Crosses to `code` — logic is what code is built from. A measure. */

const PROOF = 'logic arithmetic (truth-table rows, conjunction, disjunction, implication, equivalence, satisfiable share, entropy share, proof steps per axiom); propositional reasoning as integers; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'logic', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `logic.${name}`, params })

export class LogicFormulas {
  /** TRUTH TABLE: the rows over a number of variables. value 2^variables. */
  static truthtable(variables: number): CrossFormula { return c('logic-truthtable', 'truthtable(variables) = 2^variables', 2 ** variables, nat(variables), 'truthtable', [variables]) }
  /** CONJUNCTION: AND over 0/1 or counts. value min(a, b). */
  static conjunction(a: number, b: number): CrossFormula { return c('logic-conjunction', 'conjunction(a, b) = min(a, b)', Math.min(a, b), nat(a, b), 'conjunction', [a, b]) }
  /** DISJUNCTION: OR over 0/1 or counts. value max(a, b). */
  static disjunction(a: number, b: number): CrossFormula { return c('logic-disjunction', 'disjunction(a, b) = max(a, b)', Math.max(a, b), nat(a, b), 'disjunction', [a, b]) }
  /** MATERIAL IMPLICATION over 0/1. value [antecedent ≤ consequent]. */
  static implication(antecedent: number, consequent: number): CrossFormula { return c('logic-implication', 'implication(antecedent, consequent) = [antecedent ≤ consequent]', antecedent <= consequent ? 1 : 0, nat(antecedent, consequent), 'implication', [antecedent, consequent]) }
  /** EQUIVALENCE: 1 when the two sides agree. value [a = b]. */
  static equivalence(a: number, b: number): CrossFormula { return c('logic-equivalence', 'equivalence(a, b) = [a = b]', a === b ? 1 : 0, nat(a, b), 'equivalence', [a, b]) }
  /** SATISFIABLE: the share of satisfying models as a percentage. value ⌊models · 100 / total⌋. */
  static satisfiable(models: number, total: number): CrossFormula { return c('logic-satisfiable', 'satisfiable(models, total) = ⌊models · 100 / total⌋', total > 0 ? Math.floor((models * 100) / total) : 0, nat(models, total) && total > 0 && models <= total, 'satisfiable', [models, total]) }
  /** ENTROPY: the share of true cases as a percentage. value ⌊cases · 100 / total⌋. */
  static entropy(cases: number, total: number): CrossFormula { return c('logic-entropy', 'entropy(cases, total) = ⌊cases · 100 / total⌋', total > 0 ? Math.floor((cases * 100) / total) : 0, nat(cases, total) && total > 0 && cases <= total, 'entropy', [cases, total]) }
  /** PROOF: steps per axiom. value ⌊steps / axioms⌋. */
  static proof(steps: number, axioms: number): CrossFormula { return c('logic-proof', 'proof(steps, axioms) = ⌊steps / axioms⌋', axioms > 0 ? Math.floor(steps / axioms) : 0, nat(steps, axioms) && axioms > 0, 'proof', [steps, axioms]) }
}

for (const name of ['conjunction', 'disjunction', 'entropy', 'equivalence', 'implication', 'proof', 'satisfiable', 'truthtable'] as const)
  hexRegisterOf('logic', name, (LogicFormulas[name] as (...x: unknown[]) => unknown).bind(LogicFormulas))
