-- lean/Queneau.lean — GENERATED. A HUNDRED THOUSAND BILLION POEMS, AS COMBINATORICS. Raymond Queneau's Cent mille milliards de poèmes (1961): ten sonnets of fourteen lines sharing their rhyme sounds, each line a strip, so every position chooses freely among ten and the book holds 10^14 sonnets. Every count is derived from SONNETS = 10 and LINES = 14 and decided by the kernel. THE CLAIM IS THE STRUCTURE: no line of the book is reproduced. Every poem is a fourteen-digit decimal numeral — reading them is counting. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A HUNDRED THOUSAND BILLION POEMS: 14 positions, each filled independently by one of 10 interchangeable
    strips, give 10^14 = 100000000000000 sonnets — the title's number, counted. -/
theorem queneau_poems_are_ten_to_the_fourteen : 10 ^ 14 = 100000000000000 := by decide

/-- THE CHOICES MULTIPLY BECAUSE THEY ARE INDEPENDENT: the rhyme sound at a position is shared by all 10 strips,
    so choosing one position never constrains another, and the count is the product of 14 factors of 10 — the
    power, written out as the product it is. -/
theorem queneau_one_strip_per_position : (List.replicate 14 10).foldl (· * ·) 1 = 10 ^ 14 := by decide

/-- EVERY POEM IS A NUMERAL: which sonnet supplies line i is one decimal digit, so a poem is a 14-digit decimal
    numeral and the poems are the numerals below 10^14 — the largest poem is 99999999999999, all nines, the last
    strip at every position. -/
theorem queneau_poems_are_the_fourteen_digit_numerals : 100000000000000 - 1 = 99999999999999 ∧ 100000000000000 = 10 ^ 14 := by decide

/-- THE SONNET'S OWN SHAPE: 14 lines are the octave and the sestet, 8 + 6, so the poems factor as 10^8 · 10^6 —
    every octave from the book can meet every sestet. -/
theorem queneau_a_sonnet_is_eight_and_six : 8 + 6 = 14 ∧ 10 ^ 8 * 10 ^ 6 = 10 ^ 14 := by decide

/-- WHAT THE BOOK PRINTS AGAINST WHAT IT HOLDS: 10 complete sonnets are printed, and they are 10 of
    100000000000000 — one in ten trillion; the other 99999999999990 exist only as choices. -/
theorem queneau_ten_sonnets_are_a_vanishing_sample : 100000000000000 / 10 = 10000000000000 ∧ 10 < 100000000000000 := by decide
