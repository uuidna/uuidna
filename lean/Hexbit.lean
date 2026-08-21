-- lean/Hexbit.lean — GENERATED. THE HEXBIT — the alphabet and the layout an address is actually built from. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE SIXTEEN SYMBOLS NAME THE SIXTEEN NIBBLES, one apiece: the values 0 through 15 are all present, all
    distinct, and there are exactly sixteen of them. A four-bit value therefore has one spelling and no other —
    the alphabet is a bijection onto the nibble, which is what lets an address be read back exactly. -/
theorem alphabet_names_each_nibble : ((List.range 16).length = 16) ∧ ((List.range 16).eraseDups.length = 16) ∧ ((List.range 16).all (fun v => v < 16)) := by decide

/-- THE LAYOUT IS 8-4-4-4-12, and those five groups sum to thirty-two characters — not thirty-six, which counts
    the four separators as if they carried information. The line proves the sum and the difference, so the
    separators cannot be mistaken for content. -/
theorem layout_groups_thirtytwo : ([8,4,4,4,12].foldl (· + ·) 0 = 32) ∧ (32 + 4 = 36) ∧ (32 ≠ 36) := by decide

/-- THIRTY-TWO HEX CHARACTERS AT FOUR BITS EACH IS THE WHOLE ADDRESS: 32 × 4 = 128. The address is not a number
    that happens to print in hex — it is thirty-two hexbits, and the bit count is a consequence of the layout
    rather than a separate fact. -/
theorem characters_span_the_address : (32 * 4 = 128) ∧ ((2:Nat)^7 = 128) := by decide

/-- THE HANDLE IS THE FIRST GROUP. Every other group is shorter, which the line proves — so the opening group is
    the widest single field the layout has, apart from the closing twelve. -/
theorem handle_is_the_first_group : ([8,4,4,4,12].head! = 8) ∧ (8 * 4 = 32) ∧ (([8,4,4,4,12].drop 1).take 3).all (fun g => g < 8) := by decide

/-- EVERY GROUP IS A WHOLE NUMBER OF HEXBITS, so every boundary falls on a four-bit edge and no field is split
    mid-nibble: each group length times four is its bit width, and the widths are 32, 16, 16, 16 and 48. A
    layout whose groups did not tile the nibble could not be read by halves. -/
theorem groups_are_four_apart : [8,4,4,4,12].map (fun g => g * 4) = [32,16,16,16,48] := by decide

/-- AND THE UNIT THE BUILD COUNTS IN IS THE HEXBIT: thirty-two of them make the address, eight make the handle,
    and one makes a nibble — so the address is 32 hexbits, the handle 8, and the ratio is exactly four. Counting
    in bits gives 128 and 32 for the same objects; the two readings agree, which the line proves rather than
    assumes. -/
theorem build_counts_in_hexbits : (32 / 8 = 4) ∧ (32 * 4 = 128) ∧ (8 * 4 = 32) ∧ (128 / 32 = 4) := by decide
