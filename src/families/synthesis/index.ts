import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SYNTHESIS — program synthesis as exact combinatorics, not a fabricated coverage number. Halstead length and
 *  vocabulary, token count, the IO example grid, rewrite applications, the control-flow paths a decision count opens,
 *  the enumeration space a grammar of productions reaches at a depth, and Halstead effort. Each an exact integer at a
 *  hex address; develops the synthesis lead. */

const PROOF = 'synthesis counts: length = operators + operands; vocabulary = distinctOps + distinctOperands; tokens = lines·perLine; examples = inputs·outputs; rewrites = rules·terms; paths = 2^decisions (A000079); candidates = productions^depth; effort = length·vocabulary'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const safePow = (base: number, exp: number) => { const p = base ** exp; return Number.isSafeInteger(p) ? p : 0 }
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'synthesis', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `synthesis.${name}`, params })

export class SynthesisFormulas {
  /** Halstead program length from `operators` and `operands`: operators + operands. */
  static length(operators: number, operands: number): CrossFormula { return f('synthesis-length', 'length(operators, operands) = operators + operands', operators + operands, nat(operators, operands), 'length', [operators, operands]) }
  /** Halstead vocabulary from `distinctOps` and `distinctOperands`: distinctOps + distinctOperands. */
  static vocabulary(distinctOps: number, distinctOperands: number): CrossFormula { return f('synthesis-vocabulary', 'vocabulary(distinctOps, distinctOperands) = distinctOps + distinctOperands', distinctOps + distinctOperands, nat(distinctOps, distinctOperands), 'vocabulary', [distinctOps, distinctOperands]) }
  /** Token count over `lines` of `perLine` tokens each: lines · perLine. */
  static tokens(lines: number, perLine: number): CrossFormula { return f('synthesis-tokens', 'tokens(lines, perLine) = lines · perLine', lines * perLine, nat(lines, perLine), 'tokens', [lines, perLine]) }
  /** The IO example grid over `inputs` and `outputs`: inputs · outputs. */
  static examples(inputs: number, outputs: number): CrossFormula { return f('synthesis-examples', 'examples(inputs, outputs) = inputs · outputs', inputs * outputs, nat(inputs, outputs), 'examples', [inputs, outputs]) }
  /** Rewrite applications of `rules` rules over `terms` terms: rules · terms. */
  static rewrites(rules: number, terms: number): CrossFormula { return f('synthesis-rewrites', 'rewrites(rules, terms) = rules · terms', rules * terms, nat(rules, terms), 'rewrites', [rules, terms]) }
  /** The control-flow paths `decisions` binary decisions open: 2^decisions (decisions ≤ 30). */
  static paths(decisions: number): CrossFormula { return f('synthesis-paths', 'paths(decisions) = 2^decisions', decisions <= 30 ? 2 ** decisions : 0, nat(decisions) && decisions <= 30, 'paths', [decisions]) }
  /** The enumeration space a grammar of `productions` reaches at `depth`: productions^depth (0 if it overflows). */
  static candidates(productions: number, depth: number): CrossFormula { return f('synthesis-candidates', 'candidates(productions, depth) = productions^depth', safePow(productions, depth), nat(productions, depth) && Number.isSafeInteger(productions ** depth), 'candidates', [productions, depth]) }
  /** Halstead effort as the product of `length` and `vocabulary`: length · vocabulary. */
  static effort(length: number, vocabulary: number): CrossFormula { return f('synthesis-effort', 'effort(length, vocabulary) = length · vocabulary', length * vocabulary, nat(length, vocabulary), 'effort', [length, vocabulary]) }
}

for (const name of ['candidates', 'effort', 'examples', 'length', 'paths', 'rewrites', 'tokens', 'vocabulary'] as const)
  hexRegisterOf('synthesis', name, (SynthesisFormulas[name] as (...x: unknown[]) => unknown).bind(SynthesisFormulas))
