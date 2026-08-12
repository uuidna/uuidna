-- lean/Typesetting.lean — GENERATED. THE MEASURES OF TYPE — points and picas, the folded signature, the harmonious page, as decidable arithmetic. Every proof `by decide`, sorry-free, no Mathlib.

-- The printer's units close exactly: 6 picas of 12 points each make the inch — 6 · 12 = 72 points to the inch, the measure every page is set in.
theorem inch_is_seventytwo_points : 6 * 12 = 72 := by decide

-- Fold a sheet and the leaves double: 2 leaves make a folio, 4 a quarto, 8 an octavo — and each leaf is two pages, so [2,4,8] leaves become [4,8,16] pages, the book built by halving.
theorem folio_quarto_octavo : [2,4,8].map (fun n => n * 2) = [4,8,16] := by decide

-- A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — why a book’s page count never lands on an odd remainder.
theorem signature_multiple_of_four : [4,8,16,32].all (fun p => p % 4 == 0) := by decide

-- The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.
theorem page_diagonal_three_four_five : 3 * 3 + 4 * 4 = 5 * 5 := by decide

-- The readable measure — characters per line — sits at 66, inside the 45–75 a typographer keeps: 45 ≤ 66 ∧ 66 ≤ 75. Too short and the eye jerks; too long and it loses the return.
theorem readable_measure_range : 45 ≤ 66 ∧ 66 ≤ 75 := by decide

-- Leading exceeds the type it carries: 12-point type is set on 14-point leading — 14 > 12 ∧ 14 = 12 + 2 — the extra measure that keeps lines from touching.
theorem leading_exceeds_type : 14 > 12 ∧ 14 = 12 + 2 := by decide

-- A ream is five hundred sheets: twenty quires of twenty-five — 20 · 25 = 500 — the count a paper mill sells the printer by.
theorem ream_is_five_hundred : 20 * 25 = 500 := by decide

-- Each leaf has two faces: the recto (front) carries the odd folios, the verso (back) the even — [1,3,5] all odd ∧ [2,4,6] all even — the parity that opens a book on the right.
theorem recto_odd_verso_even : [1,3,5].all (fun n => n % 2 == 1) ∧ [2,4,6].all (fun n => n % 2 == 0) := by decide
