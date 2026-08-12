#!/usr/bin/env node
// Automate the Lean layer for THE MEASURES OF TYPE — typesetting and bookbinding as decidable arithmetic, the craft
// beneath /publications. The printer's units close exactly: 12 points to a pica, 6 picas (72 points) to the inch. A
// sheet folded once is a folio (2 leaves, 4 pages), folded again a quarto (8), again an octavo (16) — leaves double,
// pages are powers of two, and every bound signature is a multiple of four (a folded sheet is always 4 pages). The
// harmonious page is the 3:4 rectangle whose diagonal is 5 (3²+4²=5²); the readable measure sits at 66 characters,
// inside the 45–75 a typographer keeps; leading exceeds the type it carries (12 on 14); a ream is 500 sheets (20
// quires of 25); and a leaf has a recto (odd) and a verso (even). HONEST SCOPE: the arithmetic of the page — NOT a
// layout engine, a hyphenator, or a font renderer. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'inch_is_seventytwo_points',
    why: "The printer's units close exactly: 6 picas of 12 points each make the inch — 6 · 12 = 72 points to the inch, the measure every page is set in.",
    js: () => 6 * 12 === 72,
    lean: 'theorem inch_is_seventytwo_points : 6 * 12 = 72 := by decide' },

  { key: 'folio_quarto_octavo',
    why: 'Fold a sheet and the leaves double: 2 leaves make a folio, 4 a quarto, 8 an octavo — and each leaf is two pages, so [2,4,8] leaves become [4,8,16] pages, the book built by halving.',
    js: () => JSON.stringify([2, 4, 8].map((n) => n * 2)) === JSON.stringify([4, 8, 16]),
    lean: 'theorem folio_quarto_octavo : [2,4,8].map (fun n => n * 2) = [4,8,16] := by decide' },

  { key: 'signature_multiple_of_four',
    why: 'A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — why a book’s page count never lands on an odd remainder.',
    js: () => [4, 8, 16, 32].every((p) => p % 4 === 0),
    lean: 'theorem signature_multiple_of_four : [4,8,16,32].all (fun p => p % 4 == 0) := by decide' },

  { key: 'page_diagonal_three_four_five',
    why: 'The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.',
    js: () => 3 * 3 + 4 * 4 === 5 * 5,
    lean: 'theorem page_diagonal_three_four_five : 3 * 3 + 4 * 4 = 5 * 5 := by decide' },

  { key: 'readable_measure_range',
    why: 'The readable measure — characters per line — sits at 66, inside the 45–75 a typographer keeps: 45 ≤ 66 ∧ 66 ≤ 75. Too short and the eye jerks; too long and it loses the return.',
    js: () => 45 <= 66 && 66 <= 75,
    lean: 'theorem readable_measure_range : 45 ≤ 66 ∧ 66 ≤ 75 := by decide' },

  { key: 'leading_exceeds_type',
    why: 'Leading exceeds the type it carries: 12-point type is set on 14-point leading — 14 > 12 ∧ 14 = 12 + 2 — the extra measure that keeps lines from touching.',
    js: () => 14 > 12 && 14 === 12 + 2,
    lean: 'theorem leading_exceeds_type : 14 > 12 ∧ 14 = 12 + 2 := by decide' },

  { key: 'ream_is_five_hundred',
    why: 'A ream is five hundred sheets: twenty quires of twenty-five — 20 · 25 = 500 — the count a paper mill sells the printer by.',
    js: () => 20 * 25 === 500,
    lean: 'theorem ream_is_five_hundred : 20 * 25 = 500 := by decide' },

  { key: 'recto_odd_verso_even',
    why: 'Each leaf has two faces: the recto (front) carries the odd folios, the verso (back) the even — [1,3,5] all odd ∧ [2,4,6] all even — the parity that opens a book on the right.',
    js: () => [1, 3, 5].every((n) => n % 2 === 1) && [2, 4, 6].every((n) => n % 2 === 0),
    lean: 'theorem recto_odd_verso_even : [1,3,5].all (fun n => n % 2 == 1) ∧ [2,4,6].all (fun n => n % 2 == 0) := by decide' },
]

emit({
  file: 'Typesetting.lean',
  header: 'THE MEASURES OF TYPE — points and picas, the folded signature, the harmonious page, as decidable arithmetic.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
