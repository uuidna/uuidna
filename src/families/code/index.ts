import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CODE — THE CODE/CODEFEATURE BLOCK, AS ARITHMETIC (the syntax-display block from the public-API website registry, not by hand).
 *  Showing source is numbers: the lines a snippet wraps to, the share highlighted, tokens at a width, indent depth, whether a
 *  column or a snippet fits, how many languages are offered, and code density. Crosses to `frontend` — code is what the page renders.
 *  A measure. */

const PROOF = 'code arithmetic (lines, highlight share, tokens, indent depth, column wrap, snippet fit, languages, density); the Code/CodeFeature block from the public-API website registry; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'code', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `code.${name}`, params })

export class CodeFormulas {
  /** LINES: the lines a character count wraps to at a width. value ⌈chars / perLine⌉. */
  static lines(chars: number, perLine: number): CrossFormula { return c('code-lines', 'lines(chars, perLine) = ⌈chars / perLine⌉', perLine > 0 ? Math.ceil(chars / perLine) : 0, nat(chars, perLine) && perLine > 0, 'lines', [chars, perLine]) }
  /** HIGHLIGHT: the share of lines highlighted, as a percentage. value ⌊highlighted · 100 / lines⌋. */
  static highlight(highlighted: number, lines: number): CrossFormula { return c('code-highlight', 'highlight(highlighted, lines) = ⌊highlighted · 100 / lines⌋', lines > 0 ? Math.floor((highlighted * 100) / lines) : 0, nat(highlighted, lines) && lines > 0 && highlighted <= lines, 'highlight', [highlighted, lines]) }
  /** TOKENS: the tokens a character count holds at a token width. value ⌊chars / perToken⌋. */
  static tokens(chars: number, perToken: number): CrossFormula { return c('code-tokens', 'tokens(chars, perToken) = ⌊chars / perToken⌋', perToken > 0 ? Math.floor(chars / perToken) : 0, nat(chars, perToken) && perToken > 0, 'tokens', [chars, perToken]) }
  /** INDENT: the indent depth of leading spaces at a tab width. value ⌊spaces / tab⌋. */
  static indent(spaces: number, tab: number): CrossFormula { return c('code-indent', 'indent(spaces, tab) = ⌊spaces / tab⌋', tab > 0 ? Math.floor(spaces / tab) : 0, nat(spaces, tab) && tab > 0, 'indent', [spaces, tab]) }
  /** WRAP: 1 when a column count fits the maximum. value [cols ≤ max]. */
  static wrap(cols: number, max: number): CrossFormula { return c('code-wrap', 'wrap(cols, max) = [cols ≤ max]', cols <= max ? 1 : 0, nat(cols, max), 'wrap', [cols, max]) }
  /** SNIPPET: 1 when a snippet's lines fit the maximum. value [lines ≤ max]. */
  static snippet(lines: number, max: number): CrossFormula { return c('code-snippet', 'snippet(lines, max) = [lines ≤ max]', lines <= max ? 1 : 0, nat(lines, max), 'snippet', [lines, max]) }
  /** LANGUAGES: the languages offered. value count. */
  static languages(count: number): CrossFormula { return c('code-languages', 'languages(count) = count', count, nat(count), 'languages', [count]) }
  /** DENSITY: the share of total lines that are code, as a percentage. value ⌊code · 100 / total⌋. */
  static density(code: number, total: number): CrossFormula { return c('code-density', 'density(code, total) = ⌊code · 100 / total⌋', total > 0 ? Math.floor((code * 100) / total) : 0, nat(code, total) && total > 0 && code <= total, 'density', [code, total]) }
}

for (const name of ['density', 'highlight', 'indent', 'languages', 'lines', 'snippet', 'tokens', 'wrap'] as const)
  hexRegisterOf('code', name, (CodeFormulas[name] as (...x: unknown[]) => unknown).bind(CodeFormulas))
