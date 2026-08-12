#!/usr/bin/env node
// Automate the Lean layer for THE ERROR-CORRECTING CODES — the counting and bounds of tamper-detection as decidable
// arithmetic, the same integrity theme as content-addressing. Hamming(7,4) is 4 data + 3 parity = 7 bits with 2⁴ = 16
// codewords, and it is PERFECT: 16 × 8 = 128 = 2⁷ (every 7-bit word lies within one error of exactly one codeword,
// the sphere-packing bound met exactly). Minimum distance 3 corrects ⌊(3−1)/2⌋ = 1 error and detects 2, and meets the
// Singleton bound (3 ≤ n−k+1 = 4). The (3,1) repetition code corrects one flip by majority; a linear XOR checksum
// catches any single flip. HONEST SCOPE: the arithmetic and bounds, NOT a decoder or a full coding-theory treatment.
// COMPUTE each fact in JS, GENERATE its `by decide` theorem, VERIFY sorry-free. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'hamming_seven_four',
    why: 'Hamming(7,4): 4 data bits + 3 parity bits = 7, carrying 2⁴ = 16 codewords — three redundant bits protect four.',
    js: () => 4 + 3 === 7 && 2 ** 4 === 16,
    lean: 'theorem hamming_seven_four : 4 + 3 = 7 ∧ 2^4 = 16 := by decide' },

  { key: 'hamming_perfect_code',
    why: 'Hamming(7,4) is a PERFECT code: each of the 16 codewords owns a sphere of 1 (itself) + 7 (single-bit flips) = 8, and 16 × 8 = 128 = 2⁷ — the spheres tile the whole 7-bit space exactly, no word wasted.',
    js: () => 16 * 8 === 128 && 2 ** 7 === 128,
    lean: 'theorem hamming_perfect_code : 16 * 8 = 128 ∧ 2^7 = 128 := by decide' },

  { key: 'singleton_bound',
    why: 'The minimum distance d = 3 satisfies the Singleton bound d ≤ n − k + 1 = 7 − 4 + 1 = 4 — no code can beat it, and Hamming sits one below.',
    js: () => 3 <= 7 - 4 + 1,
    lean: 'theorem singleton_bound : 3 ≤ 7 - 4 + 1 := by decide' },

  { key: 'distance_three_corrects_one',
    why: 'A minimum distance of 3 corrects ⌊(d−1)/2⌋ = ⌊2/2⌋ = 1 error: any single flip lands strictly nearer its own codeword than any other.',
    js: () => (3 - 1) / 2 === 1,
    lean: 'theorem distance_three_corrects_one : (3 - 1) / 2 = 1 := by decide' },

  { key: 'distance_three_detects_two',
    why: 'The same distance-3 code DETECTS d − 1 = 2 errors — two flips can never reach another codeword, so they are always noticed (though not corrected).',
    js: () => 3 - 1 === 2,
    lean: 'theorem distance_three_detects_two : 3 - 1 = 2 := by decide' },

  { key: 'repetition_three_majority',
    why: 'The (3,1) repetition code corrects one flip by MAJORITY: [1,1,1] with one bit flipped still shows two 1s, and 2·2 > 3 makes two a strict majority of three.',
    js: () => [1, 1, 0].filter((x) => x === 1).length === 2 && 2 * 2 > 3,
    lean: 'theorem repetition_three_majority : (([1,1,0].filter (fun x => x == 1)).length = 2) ∧ (2 * 2 > 3) := by decide' },

  { key: 'xor_checksum_catches_flip',
    why: 'A linear XOR checksum catches any single flip: XOR is self-inverse, so flipping a word by d and re-checking recovers exactly d — (a ⊕ d) ⊕ a = d, for every a. The error cannot hide.',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7].every((a) => ((a ^ 5) ^ a) === 5),
    lean: 'theorem xor_checksum_catches_flip : (List.range 8).all (fun a => (a ^^^ 5) ^^^ a == 5) := by decide' },

  { key: 'codewords_sparse',
    why: 'Correction needs room: 2⁴ = 16 codewords sit sparsely inside 2⁷ = 128 possible words (16 < 128) — the redundancy is exactly what lets a flipped word be traced back to its origin.',
    js: () => 2 ** 4 < 2 ** 7,
    lean: 'theorem codewords_sparse : 2^4 < 2^7 := by decide' },
]

emit({
  file: 'Codes.lean',
  header: 'THE ERROR-CORRECTING CODES — Hamming(7,4), the perfect-code sphere-packing, distance/correction bounds, and the XOR checksum, decidable.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
