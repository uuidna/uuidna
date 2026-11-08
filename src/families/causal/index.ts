import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CAUSAL — causal inference as exact combinatorics, not a fabricated coverage number. The edges a DAG on n nodes can
 *  hold, the edges of a causal chain, the adjustment sets a confounder set admits (2^k), the binary counterfactual
 *  worlds over v variables, treatment×outcome pairs, the colliders a node centres, the non-empty conditioning sets,
 *  and the parallel mediation paths. Each an exact integer at a hex address; develops the causal lead. */

const PROOF = 'causal counts: edges = n(n−1)/2 (A000217); chains = n−1; backdoorSets = 2^confounders (A000079); counterfactuals = 2^vars; confounded = treatments·outcomes; forks = (n−1)(n−2)/2; conditionings = 2^n − 1 (A000225); mediation = mediators + 1'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const pow2 = (k: number) => (k <= 30 ? 2 ** k : 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'causal', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `causal.${name}`, params })

export class CausalFormulas {
  /** Maximum edges of a DAG on `nodes` (one per ordered pair): nodes(nodes−1)/2. */
  static edges(nodes: number): CrossFormula { return f('causal-edges', 'edges(nodes) = nodes(nodes−1)/2', (nodes * (nodes - 1)) / 2, nat(nodes), 'edges', [nodes]) }
  /** Edges of a causal chain through `nodes`: nodes − 1 (0 for none). */
  static chains(nodes: number): CrossFormula { return f('causal-chains', 'chains(nodes) = max(0, nodes − 1)', Math.max(0, nodes - 1), nat(nodes), 'chains', [nodes]) }
  /** The adjustment sets a set of `confounders` admits: 2^confounders (confounders ≤ 30). */
  static backdoorSets(confounders: number): CrossFormula { return f('causal-backdoorSets', 'backdoorSets(confounders) = 2^confounders', pow2(confounders), nat(confounders) && confounders <= 30, 'backdoorSets', [confounders]) }
  /** The binary counterfactual worlds over `vars` variables: 2^vars (vars ≤ 30). */
  static counterfactuals(vars: number): CrossFormula { return f('causal-counterfactuals', 'counterfactuals(vars) = 2^vars', pow2(vars), nat(vars) && vars <= 30, 'counterfactuals', [vars]) }
  /** Treatment×outcome pairs to deconfound from `treatments` and `outcomes`: treatments · outcomes. */
  static confounded(treatments: number, outcomes: number): CrossFormula { return f('causal-confounded', 'confounded(treatments, outcomes) = treatments · outcomes', treatments * outcomes, nat(treatments, outcomes), 'confounded', [treatments, outcomes]) }
  /** The colliders a node centres among `nodes` (pairs of its others): (nodes−1)(nodes−2)/2. */
  static forks(nodes: number): CrossFormula { return f('causal-forks', 'forks(nodes) = (nodes−1)(nodes−2)/2', nodes >= 2 ? ((nodes - 1) * (nodes - 2)) / 2 : 0, nat(nodes), 'forks', [nodes]) }
  /** The non-empty conditioning sets over `nodes`: 2^nodes − 1 (nodes ≤ 30). */
  static conditionings(nodes: number): CrossFormula { return f('causal-conditionings', 'conditionings(nodes) = 2^nodes − 1', nodes <= 30 ? pow2(nodes) - 1 : 0, nat(nodes) && nodes <= 30, 'conditionings', [nodes]) }
  /** The parallel mediation paths `mediators` mediators open: mediators + 1 (direct plus one each). */
  static mediation(mediators: number): CrossFormula { return f('causal-mediation', 'mediation(mediators) = mediators + 1', mediators + 1, nat(mediators), 'mediation', [mediators]) }
}

for (const name of ['backdoorSets', 'chains', 'conditionings', 'confounded', 'counterfactuals', 'edges', 'forks', 'mediation'] as const)
  hexRegisterOf('causal', name, (CausalFormulas[name] as (...x: unknown[]) => unknown).bind(CausalFormulas))
