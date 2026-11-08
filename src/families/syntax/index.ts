import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SYNTAX — THE SHAPE OF LANGUAGE, AS ARITHMETIC. A sentence is a parse tree: how deep it runs, how wide it branches, how
 *  far features agree, how many clauses it carries, how many readings it allows, how tight its dependencies, how it embeds
 *  itself, and whether it is well-formed. Crosses to `linguistics` — syntax is the measure linguistics describes. A measure. */

const PROOF = 'syntax arithmetic (parse-tree depth, branching, feature agreement, clause complexity, ambiguity, dependency density, recursion, well-formedness); a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'syntax', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `syntax.${name}`, params })

export class SyntaxFormulas {
  /** PARSE-TREE DEPTH: nodes over branches. value ⌊nodes / branches⌋. */
  static depth(nodes: number, branches: number): CrossFormula { return c('syntax-depth', 'depth(nodes, branches) = ⌊nodes / branches⌋', branches > 0 ? Math.floor(nodes / branches) : 0, nat(nodes, branches) && branches > 0, 'depth', [nodes, branches]) }
  /** BRANCHING FACTOR: children over nodes. value ⌊children / nodes⌋. */
  static branching(children: number, nodes: number): CrossFormula { return c('syntax-branching', 'branching(children, nodes) = ⌊children / nodes⌋', nodes > 0 ? Math.floor(children / nodes) : 0, nat(children, nodes) && nodes > 0, 'branching', [children, nodes]) }
  /** FEATURE AGREEMENT as a percentage. value ⌊matched · 100 / features⌋. */
  static agreement(matched: number, features: number): CrossFormula { return c('syntax-agreement', 'agreement(matched, features) = ⌊matched · 100 / features⌋', features > 0 ? Math.floor((matched * 100) / features) : 0, nat(matched, features) && features > 0 && matched <= features, 'agreement', [matched, features]) }
  /** CLAUSE COMPLEXITY: clauses over sentences. value ⌊clauses / sentences⌋. */
  static complexity(clauses: number, sentences: number): CrossFormula { return c('syntax-complexity', 'complexity(clauses, sentences) = ⌊clauses / sentences⌋', sentences > 0 ? Math.floor(clauses / sentences) : 0, nat(clauses, sentences) && sentences > 0, 'complexity', [clauses, sentences]) }
  /** AMBIGUITY: the readings a sentence allows. value parses. */
  static ambiguity(parses: number): CrossFormula { return c('syntax-ambiguity', 'ambiguity(parses) = parses', parses, nat(parses), 'ambiguity', [parses]) }
  /** DEPENDENCY DENSITY as a percentage. value ⌊links · 100 / words⌋. */
  static dependency(links: number, words: number): CrossFormula { return c('syntax-dependency', 'dependency(links, words) = ⌊links · 100 / words⌋', words > 0 ? Math.floor((links * 100) / words) : 0, nat(links, words) && words > 0, 'dependency', [links, words]) }
  /** RECURSION: the embeddings a structure nests. value embeddings. */
  static recursion(embeddings: number): CrossFormula { return c('syntax-recursion', 'recursion(embeddings) = embeddings', embeddings, nat(embeddings), 'recursion', [embeddings]) }
  /** WELL-FORMEDNESS as a percentage. value ⌊valid · 100 / total⌋. */
  static wellformed(valid: number, total: number): CrossFormula { return c('syntax-wellformed', 'wellformed(valid, total) = ⌊valid · 100 / total⌋', total > 0 ? Math.floor((valid * 100) / total) : 0, nat(valid, total) && total > 0 && valid <= total, 'wellformed', [valid, total]) }
}

for (const name of ['agreement', 'ambiguity', 'branching', 'complexity', 'dependency', 'depth', 'recursion', 'wellformed'] as const)
  hexRegisterOf('syntax', name, (SyntaxFormulas[name] as (...x: unknown[]) => unknown).bind(SyntaxFormulas))
