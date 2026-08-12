#!/usr/bin/env node
// Automate the Lean layer for THE IDENTIFIERS — the check-digit arithmetic of ISBN/ISSN as decidable facts, the same
// integrity theme as content-addressing (a check digit is a one-symbol fold of the content that catches tampering,
// as a uuid is a 128-bit fold). ISBN-10 uses a weighted sum mod 11 (prime) — every weight is nonzero mod 11, so any
// single-digit error shifts the checksum, and consecutive weights differ by 1, so any adjacent transposition shifts
// it too. ISBN-13 uses alternating 1/3 weights mod 10 with the 978/979 Bookland prefix. HONEST SCOPE: the checksum
// arithmetic and what it catches — NOT a validator library. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const ISBN10 = [0, 3, 0, 6, 4, 0, 6, 1, 5, 2] // 0-306-40615-2, a valid ISBN-10
const W10 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const ISBN13 = [9, 7, 8, 0, 3, 0, 6, 4, 0, 6, 1, 5, 7] // 978-0-306-40615-7
const W13 = [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1]

const FACTS = [
  { key: 'isbn10_valid_check',
    why: 'ISBN-10 0-306-40615-2 checks out: its weighted sum Σ (11−i)·dᵢ = 132 = 12·11 ≡ 0 (mod 11) — the check digit 2 makes the whole thing divisible by 11.',
    js: () => W10.map((w, i) => w * ISBN10[i]).reduce((a, b) => a + b, 0) % 11 === 0,
    lean: 'theorem isbn10_valid_check : (([10,9,8,7,6,5,4,3,2,1].zip [0,3,0,6,4,0,6,1,5,2]).map (fun p => p.1 * p.2)).foldl (· + ·) 0 % 11 = 0 := by decide' },

  { key: 'isbn13_valid_check',
    why: 'ISBN-13 978-0-306-40615-7 checks out: its alternating 1,3,1,3… weighted sum = 100 ≡ 0 (mod 10) — the mod-10 check used by the EAN barcode.',
    js: () => W13.map((w, i) => w * ISBN13[i]).reduce((a, b) => a + b, 0) % 10 === 0,
    lean: 'theorem isbn13_valid_check : (([1,3,1,3,1,3,1,3,1,3,1,3,1].zip [9,7,8,0,3,0,6,4,0,6,1,5,7]).map (fun p => p.1 * p.2)).foldl (· + ·) 0 % 10 = 0 := by decide' },

  { key: 'isbn10_check_alphabet_eleven',
    why: 'A mod-11 check digit needs ELEVEN symbols: 0–9 and X for the value 10 — [0,1,…,10] has length 11. That is why an ISBN-10 can end in X.',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].length === 11,
    lean: 'theorem isbn10_check_alphabet_eleven : [0,1,2,3,4,5,6,7,8,9,10].length = 11 := by decide' },

  { key: 'isbn10_catches_single_error',
    why: 'ISBN-10 catches EVERY single-digit error: its weights 10..1 are each nonzero mod 11 (which is prime), so changing any digit by δ shifts the checksum by wᵢ·δ ≠ 0 — the error cannot hide.',
    js: () => W10.every((w) => w % 11 !== 0),
    lean: 'theorem isbn10_catches_single_error : [10,9,8,7,6,5,4,3,2,1].all (fun w => w % 11 != 0) := by decide' },

  { key: 'isbn10_catches_transposition',
    why: 'ISBN-10 catches EVERY adjacent transposition: consecutive weights differ by exactly 1, so swapping two neighbouring digits d,e shifts the checksum by (d−e) ≠ 0 (mod 11) — the commonest typo, caught.',
    js: () => W10.slice(0, 9).every((w, i) => w - W10[i + 1] === 1),
    lean: 'theorem isbn10_catches_transposition : ([10,9,8,7,6,5,4,3,2,1].zip [9,8,7,6,5,4,3,2,1]).all (fun p => p.1 - p.2 == 1) := by decide' },

  { key: 'isbn13_bookland_prefix',
    why: 'ISBN-13 lives in the Bookland EAN: books carry the prefix 978 or 979 (979 − 978 = 1) — the barcode namespace that folded ISBNs into the global product code.',
    js: () => 979 - 978 === 1 && 978 < 979,
    lean: 'theorem isbn13_bookland_prefix : 979 - 978 = 1 ∧ 978 < 979 := by decide' },
]

emit({
  file: 'Identifiers.lean',
  header: 'THE IDENTIFIERS — ISBN-10/13 check-digit arithmetic: the mod-11/mod-10 weighted sums and the errors they catch, decidable.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
