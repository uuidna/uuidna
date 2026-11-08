import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TOKENIZATION — TEXT MADE COUNTABLE, AS ARITHMETIC. Splitting text into tokens is numbers: the tokens a string yields,
 *  the average token length, the vocabulary a BPE merge schedule builds, the subword share, how tightly text compresses,
 *  the out-of-vocabulary rate, bytes per token, and fertility (tokens per word). Crosses to `linguistics` — tokenization
 *  is how language is cut before it is counted. A measure. */

const PROOF = 'tokenization arithmetic (token count, avg token length, vocab size, subword ratio, compression, OOV rate, bytes/token, fertility); text made countable; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tokenization', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `tokenization.${name}`, params })

export class TokenizationFormulas {
  /** TOKEN COUNT: the tokens a string of chars yields at chars-per-token. value ⌊chars / perToken⌋. */
  static tokencount(chars: number, perToken: number): CrossFormula { return c('tokenization-tokencount', 'tokencount(chars, perToken) = ⌊chars / perToken⌋', perToken > 0 ? Math.floor(chars / perToken) : 0, nat(chars, perToken) && perToken > 0, 'tokencount', [chars, perToken]) }
  /** AVERAGE TOKEN LENGTH: chars over the tokens they split into. value ⌊chars / tokens⌋. */
  static avgtokenlength(chars: number, tokens: number): CrossFormula { return c('tokenization-avgtokenlength', 'avgtokenlength(chars, tokens) = ⌊chars / tokens⌋', tokens > 0 ? Math.floor(chars / tokens) : 0, nat(chars, tokens) && tokens > 0, 'avgtokenlength', [chars, tokens]) }
  /** VOCAB SIZE: a base alphabet plus the merges a BPE schedule adds. value base + merges. */
  static vocabsize(base: number, merges: number): CrossFormula { return c('tokenization-vocabsize', 'vocabsize(base, merges) = base + merges', base + merges, nat(base, merges), 'vocabsize', [base, merges]) }
  /** SUBWORD RATIO: subwords per hundred words. value ⌊subwords · 100 / words⌋. */
  static subwordratio(subwords: number, words: number): CrossFormula { return c('tokenization-subwordratio', 'subwordratio(subwords, words) = ⌊subwords · 100 / words⌋', words > 0 ? Math.floor((subwords * 100) / words) : 0, nat(subwords, words) && words > 0, 'subwordratio', [subwords, words]) }
  /** COMPRESSION RATIO: chars per token, scaled by a hundred. value ⌊chars · 100 / tokens⌋. */
  static compressionratio(chars: number, tokens: number): CrossFormula { return c('tokenization-compressionratio', 'compressionratio(chars, tokens) = ⌊chars · 100 / tokens⌋', tokens > 0 ? Math.floor((chars * 100) / tokens) : 0, nat(chars, tokens) && tokens > 0, 'compressionratio', [chars, tokens]) }
  /** OOV RATE: out-of-vocabulary tokens per hundred. value ⌊oov · 100 / total⌋. */
  static oovrate(oov: number, total: number): CrossFormula { return c('tokenization-oovrate', 'oovrate(oov, total) = ⌊oov · 100 / total⌋', total > 0 ? Math.floor((oov * 100) / total) : 0, nat(oov, total) && total > 0 && oov <= total, 'oovrate', [oov, total]) }
  /** BYTES PER TOKEN: bytes over the tokens they encode. value ⌊bytes / tokens⌋. */
  static charspertoken(bytes: number, tokens: number): CrossFormula { return c('tokenization-charspertoken', 'charspertoken(bytes, tokens) = ⌊bytes / tokens⌋', tokens > 0 ? Math.floor(bytes / tokens) : 0, nat(bytes, tokens) && tokens > 0, 'charspertoken', [bytes, tokens]) }
  /** FERTILITY: tokens per word, scaled by a hundred. value ⌊tokens · 100 / words⌋. */
  static fertility(tokens: number, words: number): CrossFormula { return c('tokenization-fertility', 'fertility(tokens, words) = ⌊tokens · 100 / words⌋', words > 0 ? Math.floor((tokens * 100) / words) : 0, nat(tokens, words) && words > 0, 'fertility', [tokens, words]) }
}

for (const name of ['avgtokenlength', 'charspertoken', 'compressionratio', 'fertility', 'oovrate', 'subwordratio', 'tokencount', 'vocabsize'] as const)
  hexRegisterOf('tokenization', name, (TokenizationFormulas[name] as (...x: unknown[]) => unknown).bind(TokenizationFormulas))
