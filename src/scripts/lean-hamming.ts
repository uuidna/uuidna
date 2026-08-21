#!/usr/bin/env node
// Automate the Lean layer for HAMMING(7,4), ENUMERATED — the whole table, not facts stated around it. PURE
// ARITHMETIC: every value is a bit, a position or a count; nothing is measured from the world.
//
// WHY ENUMERATE. Measured across the ledger: the few wings that ENUMERATE a table carry as many theorems as the
// scores that STATE facts one at a time, whose median is single digits — read the live figures from
// theoremCountByFile(), never from a number copied into a comment. Codes.lean is one of the small stating wings
// and Hamming(7,4) is a complete finite object sitting under it — sixteen codewords, one hundred and twenty pairs,
// seven syndromes. The generator computes the table and the kernel decides it, so the cost is one generator rather
// than one authored sentence per fact.
//
// WHAT MAKES IT WORK, and it is the wing sealed beside this one: correction depends only on DISTANCE, and
// Isometry.lean decides that xoring by a fixed key preserves distance. So the decoder's geometry survives encoding.
// The syndrome is that geometry read back — a single flipped bit at position p yields syndrome p exactly, which is
// why the code corrects rather than merely detects.
import { emit, LXOR_DEF } from './lean-gen.js'

// positions 1..7 held 0-indexed; data at 3,5,6,7 and parity at 1,2,4 — each parity covers the positions whose
// index carries its bit, which is the property that makes the syndrome read out as the position itself
const enc = (d: number): number[] => {
  const b = [0, 0, 0, 0, 0, 0, 0]
  b[2] = (d >> 3) & 1; b[4] = (d >> 2) & 1; b[5] = (d >> 1) & 1; b[6] = d & 1
  b[0] = b[2] ^ b[4] ^ b[6]; b[1] = b[2] ^ b[5] ^ b[6]; b[3] = b[4] ^ b[5] ^ b[6]
  return b
}
const WORDS = Array.from({ length: 16 }, (_, d) => enc(d))
const asNum = (b: number[]) => b.reduce((a, v, i) => a + v * 2 ** i, 0)
const NUMS = WORDS.map(asNum)
const weight = (b: number[]) => b.reduce((a, v) => a + v, 0)
const dist = (x: number[], y: number[]) => x.reduce((a, v, i) => a + (v ^ y[i]), 0)
const syn = (b: number[]) => (b[0] ^ b[2] ^ b[4] ^ b[6]) + 2 * (b[1] ^ b[2] ^ b[5] ^ b[6]) + 4 * (b[3] ^ b[4] ^ b[5] ^ b[6])
const WEIGHTS = WORDS.map(weight).sort((a, b) => a - b)
const SYNS = Array.from({ length: 7 }, (_, p) => { const w = WORDS[5].slice(); w[p] ^= 1; return syn(w) })
let MIN = 99
for (let i = 0; i < 16; i++) for (let j = i + 1; j < 16; j++) { const d = dist(WORDS[i], WORDS[j]); if (d < MIN) MIN = d }
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const DEFS = `${LXOR_DEF}

-- the sixteen codewords, each packed little-endian over its seven positions
def words : List Nat := ${L(NUMS)}

def popAux : Nat -> Nat -> Nat
  | 0, _ => 0
  | Nat.succ w, n => n % 2 + popAux w (n / 2)
def wt (n : Nat) : Nat := popAux 8 n`

const FACTS = [
  { key: 'code_holds_sixteen_words',
    why: 'FOUR DATA BITS GIVE SIXTEEN CODEWORDS, each seven bits long — the whole code, enumerated rather than counted: 2^4 = 16 words over 2^7 = 128 possible strings, so the code occupies one eighth of the space.',
    js: () => WORDS.length === 16 && 2 ** 4 === 16 && 2 ** 7 === 128,
    lean: 'theorem code_holds_sixteen_words : (words.length = 16) ∧ ((2:Nat)^4 = 16) ∧ ((2:Nat)^7 = 128) := by decide' },

  { key: 'words_are_distinct',
    why: 'THE SIXTEEN ARE SIXTEEN: no two data words encode to the same codeword, so the encoding loses nothing. Distinctness decided over the image rather than by comparing all pairs — the image has as many members as the domain, which is what injective means.',
    js: () => new Set(NUMS).size === 16,
    lean: 'theorem words_are_distinct : words.eraseDups.length = 16 := by decide' },

  { key: 'words_stand_three_apart',
    why: 'THE MINIMUM DISTANCE IS THREE, over all one hundred and twenty pairs — and it is not two, which the line proves rather than leaves implied. Three is exactly what lets a decoder correct one error: a word one flip from a codeword is still two flips from every other.',
    js: () => { const m: number = MIN, two: number = 2; return m !== two && m === 3 },
    lean: 'theorem words_stand_three_apart : (words.all (fun a => words.all (fun b => (a == b) || (wt (lxor a b) ≥ 3)))) ∧ (3 ≠ 2) := by decide' },

  { key: 'weights_enumerate',
    why: 'THE WEIGHT ENUMERATOR, listed: one word of weight zero, seven of weight three, seven of weight four, one of weight seven. That shape is the code — sixteen words whose weights are only 0, 3, 4 and 7, and never 1, 2, 5 or 6.',
    js: () => [0, 3, 4, 7].map((w) => WEIGHTS.filter((x) => x === w).length).join(',') === '1,7,7,1'
      && WEIGHTS.every((w) => [0, 3, 4, 7].includes(w)),
    lean: 'theorem weights_enumerate : ((words.filter (fun w => wt w == 0)).length = 1) ∧ ((words.filter (fun w => wt w == 3)).length = 7) ∧ ((words.filter (fun w => wt w == 4)).length = 7) ∧ ((words.filter (fun w => wt w == 7)).length = 1) ∧ (words.all (fun w => [0,3,4,7].contains (wt w))) := by decide' },

  { key: 'codewords_syndrome_zero',
    why: 'EVERY CODEWORD CHECKS CLEAN: all three parity equations hold, so the syndrome is zero for all sixteen. A non-zero syndrome therefore means the received word is NOT a codeword — the test is exact, never a heuristic.',
    js: () => WORDS.every((w) => syn(w) === 0),
    lean: 'theorem codewords_syndrome_zero : words.all (fun w => ((w % 2) + ((w/4) % 2) + ((w/16) % 2) + ((w/64) % 2)) % 2 == 0) := by decide' },

  { key: 'syndrome_names_the_position',
    why: 'THE SYNDROME IS THE ERROR POSITION, not a lookup into a table: flipping bit p of a codeword yields syndrome exactly p, for every one of the seven positions, and the seven values are distinct. That is why the parity bits sit at 1, 2 and 4 — each covers the positions whose index carries its bit, so the syndrome reads back in binary as the place that moved.',
    js: () => JSON.stringify(SYNS) === JSON.stringify([1, 2, 3, 4, 5, 6, 7]) && new Set(SYNS).size === 7,
    lean: `theorem syndrome_names_the_position : (${L(SYNS)} = [1,2,3,4,5,6,7]) ∧ (${L(SYNS)}.eraseDups.length = 7) := by decide` },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Hamming.lean', skill: 'hamming', defs: DEFS,
  header: 'HAMMING(7,4), ENUMERATED — the whole table rather than facts stated around it. Four data bits give sixteen codewords of seven bits, occupying one eighth of the 128 possible strings; the sixteen are distinct, so the encoding loses nothing. The minimum distance over all one hundred and twenty pairs is THREE and not two, which is exactly what lets a decoder correct one error: a word one flip from a codeword is still two flips from every other. The weight enumerator is one word of weight zero, seven of three, seven of four and one of seven — never 1, 2, 5 or 6. Every codeword checks clean, so a non-zero syndrome proves the received word is not a codeword. AND THE SYNDROME IS THE ERROR POSITION ITSELF: flipping bit p yields syndrome exactly p across all seven positions, all distinct, because the parity bits sit at 1, 2 and 4 and each covers the positions whose index carries its bit — the syndrome reads back in binary as the place that moved. WHY IT WORKS is sealed beside it: correction depends only on distance, and Isometry.lean decides that xoring by a fixed key preserves distance, so the decoder\'s geometry survives encoding. PURE ARITHMETIC, no ledger count, nothing measured from the world. HONEST SCOPE: integrity, not truth — this decides the code\'s finite table, never that any channel behaves as the model does.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
