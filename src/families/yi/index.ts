import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THE I CHING AS COMBINATORICS. A hexagram is six lines, each yin (0) or yang (1): the 64 of 2⁶, read bottom to top
 *  as bits 0..5; a trigram is three, the 8 of 2³. The operations on hexagrams are exact: the complement flips every
 *  line, the inverse turns the figure upside down, the nuclear hexagram is lines 2–4 over 3–5, and the changing lines of
 *  a cast are a mask. The King Wen order (which binary figure is called hexagram 1, 2, …) is a table the record holds,
 *  not a formula, so figures here are their binary value in Fu Xi order; the Rave wheel of `hd` is one such table.
 *  Registered as the hex family `yi`. */

const LINES = 6
const ALL = 2 ** LINES
const PROOF = 'the figure as its six bits, bottom line first; Fu Xi (binary) order'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const fig = (h: number) => nat(h) && h < ALL
const line = (h: number, i: number) => (h >> i) & 1
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'yi', dst: 'hd', formula, value, proof: PROOF }, holds, { name: `yi.${name}`, params })

export class YiFormulas {
  /** How many figures of n lines: 2ⁿ (6 lines: 64 hexagrams; 3: 8 trigrams). */
  static figures(lines: number): CrossFormula { return f('yi-figures', 'figures(n) = 2ⁿ', nat(lines) && lines <= 48 ? 2 ** lines : 0, nat(lines) && lines <= 48, 'figures', [lines]) }
  /** The lower trigram (bits 0–2) of a hexagram. */
  static lower(h: number): CrossFormula { return f('yi-lower', 'lower(h) = h mod 8', h & 7, fig(h), 'lower', [h]) }
  /** The upper trigram (bits 3–5) of a hexagram. */
  static upper(h: number): CrossFormula { return f('yi-upper', 'upper(h) = ⌊h / 8⌋', h >> 3, fig(h), 'upper', [h]) }
  /** The complement: every line flipped (yin ↔ yang); an involution. */
  static complement(h: number): CrossFormula { return f('yi-complement', 'complement(h) = 63 − h', ALL - 1 - h, fig(h), 'complement', [h]) }
  /** The inverse: the figure turned upside down (line i ↔ line 5 − i); an involution, with 8 fixed figures. */
  static inverse(h: number): CrossFormula {
    let v = 0
    for (let i = 0; i < LINES; i++) v |= line(h, i) << (LINES - 1 - i)
    return f('yi-inverse', 'inverse(h): line i ↔ line 5 − i', v, fig(h), 'inverse', [h])
  }
  /** The nuclear hexagram: lines 2, 3, 4 as the lower trigram and 3, 4, 5 as the upper. */
  static nuclear(h: number): CrossFormula {
    const lower = (line(h, 1)) | (line(h, 2) << 1) | (line(h, 3) << 2)
    const upper = (line(h, 2)) | (line(h, 3) << 1) | (line(h, 4) << 2)
    return f('yi-nuclear', 'nuclear(h) = (lines 3,4,5 as upper) · 8 + (lines 2,3,4 as lower)', (upper << 3) | lower, fig(h), 'nuclear', [h])
  }
  /** A cast with changing lines: the figure the mask of changing lines turns h into. */
  static change(h: number, mask: number): CrossFormula { return f('yi-change', 'change(h, m) = h xor m', h ^ mask, fig(h) && fig(mask), 'change', [h, mask]) }
  /** The yang lines of a figure (its weight), 0..6. */
  static yang(h: number): CrossFormula {
    let w = 0
    for (let i = 0; i < LINES; i++) w += line(h, i)
    return f('yi-yang', 'yang(h) = popcount(h)', w, fig(h), 'yang', [h])
  }
  /** How many figures have k yang lines: C(6, k) — 1, 6, 15, 20, 15, 6, 1. */
  static withYang(k: number): CrossFormula {
    const c = [1, 6, 15, 20, 15, 6, 1][k] ?? 0
    return f('yi-with-yang', 'withYang(k) = C(6, k)', c, nat(k) && k <= LINES, 'withYang', [k])
  }
}

for (const name of ['change', 'complement', 'figures', 'inverse', 'lower', 'nuclear', 'upper', 'withYang', 'yang'] as const)
  hexRegisterOf('yi', name, (YiFormulas[name] as (...x: unknown[]) => unknown).bind(YiFormulas))
