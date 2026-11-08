import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENTROPY — INFORMATION MEASURED IN BITS, AS ARITHMETIC. A source of `symbols` carries ⌊log2 symbols⌋ bits (Shannon),
 *  the ceiling is the most it can carry (max entropy); independent sources add (joint), what remains after one is known is
 *  conditional, what two share is mutual information, the excess of coding one law with another's code is relative entropy,
 *  the bits a measurement buys is information gain, and the branching factor is perplexity = 2^bits. Crosses to `statistics`
 *  — entropy is the statistic a distribution confesses. A measure. */

const PROOF = 'entropy arithmetic (shannon bits, max entropy, joint, conditional, mutual information, relative entropy, information gain, perplexity); information measured in bits; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'entropy', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `entropy.${name}`, params })

export class EntropyFormulas {
  /** SHANNON ENTROPY of a uniform source over `symbols`, in bits. value ⌊log2 symbols⌋. */
  static shannon(symbols: number): CrossFormula { return c('entropy-shannon', 'shannon(symbols) = ⌊log2 symbols⌋', symbols > 0 ? Math.floor(Math.log2(symbols)) : 0, nat(symbols) && symbols > 0, 'shannon', [symbols]) }
  /** MAX ENTROPY: the most bits an alphabet of `symbols` can carry. value ⌈log2 symbols⌉. */
  static maxentropy(symbols: number): CrossFormula { return c('entropy-maxentropy', 'maxentropy(symbols) = ⌈log2 symbols⌉', symbols > 0 ? Math.ceil(Math.log2(symbols)) : 0, nat(symbols) && symbols > 0, 'maxentropy', [symbols]) }
  /** JOINT ENTROPY of independent sources x and y: the bits add. value ⌊log2 x⌋ + ⌊log2 y⌋. */
  static jointentropy(x: number, y: number): CrossFormula { return c('entropy-jointentropy', 'jointentropy(x, y) = ⌊log2 x⌋ + ⌊log2 y⌋', x > 0 && y > 0 ? Math.floor(Math.log2(x)) + Math.floor(Math.log2(y)) : 0, nat(x, y) && x > 0 && y > 0, 'jointentropy', [x, y]) }
  /** CONDITIONAL ENTROPY: the joint bits that remain once x is known. value max(0, joint − x). */
  static conditionalentropy(joint: number, x: number): CrossFormula { return c('entropy-conditionalentropy', 'conditionalentropy(joint, x) = max(0, joint − x)', Math.max(0, joint - x), nat(joint, x), 'conditionalentropy', [joint, x]) }
  /** MUTUAL INFORMATION: the bits x and y share. value max(0, x + y − joint). */
  static mutualinformation(x: number, y: number, joint: number): CrossFormula { return c('entropy-mutualinformation', 'mutualinformation(x, y, joint) = max(0, x + y − joint)', Math.max(0, x + y - joint), nat(x, y, joint), 'mutualinformation', [x, y, joint]) }
  /** RELATIVE ENTROPY (KL): the excess bits of coding a p-law with a q-code. value max(0, ⌊log2 p⌋ − ⌊log2 q⌋). */
  static relativeentropy(p: number, q: number): CrossFormula { return c('entropy-relativeentropy', 'relativeentropy(p, q) = max(0, ⌊log2 p⌋ − ⌊log2 q⌋)', p > 0 && q > 0 ? Math.max(0, Math.floor(Math.log2(p)) - Math.floor(Math.log2(q))) : 0, nat(p, q) && p > 0 && q > 0, 'relativeentropy', [p, q]) }
  /** INFORMATION GAIN: the bits a measurement buys. value max(0, prior − posterior). */
  static informationgain(prior: number, posterior: number): CrossFormula { return c('entropy-informationgain', 'informationgain(prior, posterior) = max(0, prior − posterior)', Math.max(0, prior - posterior), nat(prior, posterior), 'informationgain', [prior, posterior]) }
  /** PERPLEXITY: the branching factor of `bits` of entropy. value 2^bits (0 when it overflows). */
  static perplexity(bits: number): CrossFormula { return c('entropy-perplexity', 'perplexity(bits) = 2^bits', Number.isSafeInteger(Math.pow(2, bits)) ? Math.pow(2, bits) : 0, nat(bits), 'perplexity', [bits]) }
}

for (const name of ['conditionalentropy', 'informationgain', 'jointentropy', 'maxentropy', 'mutualinformation', 'perplexity', 'relativeentropy', 'shannon'] as const)
  hexRegisterOf('entropy', name, (EntropyFormulas[name] as (...x: unknown[]) => unknown).bind(EntropyFormulas))
