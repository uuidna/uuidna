-- lean/SpectrumHex.lean — GENERATED. THE COLOUR AS SIX HEXBITS — the spectrum sized in the unit the machine writes it in. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A COLOUR IS SIX HEX CHARACTERS: #RRGGBB at four bits each is 24 bits, and 16^6 equals 2^24 exactly — the
    hexadecimal reading and the binary reading are one number, 16777216 colours. -/
theorem colour_is_six_hexbits : (6 * 4 = 24) ∧ ((16:Nat)^6 = (2:Nat)^24) ∧ ((16:Nat)^6 = 16777216) := by decide

/-- EACH CHANNEL IS TWO HEXBITS — one byte, 256 levels — and three channels of eight bits close the twenty-four.
    The colour is not a number that prints in hex; it is three bytes, and the hex is how a byte is spelled. -/
theorem channel_is_two_hexbits : (2 * 4 = 8) ∧ ((2:Nat)^8 = 256) ∧ (3 * 8 = 24) ∧ (3 * 2 = 6) := by decide

/-- THE GREYS ARE THE DIAGONAL: red, green and blue equal gives 256 colours out of 16777216 — one in 65536,
    which is 2^16. Two of the three channels carry no information on that diagonal, and the line proves the
    ratio rather than describing it. -/
theorem greys_are_one_in_sixtyfive_thousand : ((16:Nat)^6 / 256 = 65536) ∧ ((2:Nat)^16 = 65536) ∧ (256 * 65536 = 16777216) := by decide

/-- THE THREE-DIGIT SHORTHAND #RGB EXPANDS EACH CHARACTER TWICE, so it reaches 16^3 = 4096 colours — one in 4096
    of the full space. A palette written in shorthand is not a small notation for all colours; it is a notation
    for a sixteen-thousandth of them. -/
theorem shorthand_covers_one_in_four_thousand : ((16:Nat)^3 = 4096) ∧ ((16:Nat)^6 / (16:Nat)^3 = 4096) ∧ ((16:Nat)^3 * 4096 = 16777216) := by decide

/-- THE HUE WHEEL DOES NOT DIVIDE BY SIXTEEN: 16 x 22 = 352 and 16 x 23 = 368 straddle 360, so no whole-degree
    step cuts the circle into sixteen. It divides by NINE at 40 degrees and by SIX at 60 — the storage is
    hexadecimal while the geometry is not, and the line proves the failure rather than leaving it implied. -/
theorem spectrum_refuses_sixteen : (16 * 22 < 360) ∧ (360 < 16 * 23) ∧ (360 % 9 = 0) ∧ (360 % 6 = 0) ∧ (360 % 16 ≠ 0) := by decide

/-- THE DIVISORS THE WHEEL ADMITS below twenty are 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20 — nine and six
    among them, sixteen not. Forty degrees is the ninefold step the aura already walks, sixty the sextant of
    primaries and secondaries. -/
theorem wheel_divides_by_nine_and_six : (((List.range' 1 20).filter (fun d => 360 % d == 0)) = [1,2,3,4,5,6,8,9,10,12,15,18,20]) ∧ (360 / 9 = 40) ∧ (360 / 6 = 60) := by decide
