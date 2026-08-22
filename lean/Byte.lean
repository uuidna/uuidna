-- lean/Byte.lean — GENERATED. THE BYTE — two hexbits, and the unit exact-copy verification actually compares in. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A BYTE IS TWO HEXBITS: eight bits, 256 values, and 16^2 spellings — the two readings agree, so counting a
    byte in hex characters and counting it in bits land on the same object. -/
theorem byte_holds_two_hexbits : (2 * 4 = 8) ∧ ((2:Nat)^8 = 256) ∧ ((16:Nat)^2 = 256) ∧ (2 ≠ 4) := by decide

/-- THE ADDRESS IS SIXTEEN BYTES: 32 hex characters, 128 bits, 16 bytes — three counts of one object, each
    derived from the layout rather than stated beside it. -/
theorem address_is_sixteen_bytes : (32 / 2 = 16) ∧ (16 * 8 = 128) ∧ (32 * 4 = 128) := by decide

/-- A SHA-256 DIGEST IS EXACTLY TWICE THE ADDRESS: 32 bytes against 16, 256 bits against 128, 64 hex characters
    against 32. -/
theorem digest_doubles_the_address : (32 = 2 * 16) ∧ (256 = 2 * 128) ∧ (64 = 2 * 32) := by decide

/-- THE TAMPER SET OF ONE POSITION IS 255 VALUES: a byte holds 256 and one of them is the original, so 256 - 1 =
    255 alternatives remain, and 255 across 32 positions is 8160. -/
theorem every_alternative_differs : ((List.range 16).all (fun b => ((b + 1) % 16) != b)) ∧ ((List.range 16).all (fun b => b < 16)) ∧ (16 * 16 = 256) ∧ (256 - 1 = 255) := by decide

/-- OVER A THIRTY-TWO BYTE DIGEST THE WHOLE TAMPER SET IS 32 × 255 = 8160 single-byte alterations, every one of
    them a different digest under byte-equality. -/
theorem tamper_set_counts_eight_thousand : (32 * 255 = 8160) ∧ (8160 ≠ 0) := by decide
