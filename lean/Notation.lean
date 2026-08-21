-- lean/Notation.lean — GENERATED. NOTATION — which harmonic facts are about NUMBERS and which are about how numbers are WRITTEN. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- EVERY POWER OF TEN IS ONE, MOD NINE: 10, 100, 1000, 10000 all leave remainder 1. That is the entire
    mechanism of the digital root — a digit in any column contributes its own value and nothing more, so the
    digit sum carries the number's remainder. -/
theorem ten_reduces_to_one : [10,100,1000,10000].all (fun p => p % 9 == 1) := by decide

/-- THE MODULUS IS CHOSEN BY THE BASE, NOT BY THE NUMBERS: b ≡ 1 (mod b−1) for every base, so base eight gives
    mod 7, base ten mod 9, hexadecimal mod 15. Three bases, three different rings, one construction. -/
theorem base_fixes_modulus : [8,10,16].all (fun b => b % (b - 1) == 1) := by decide

/-- THE SAME NUMBER HAS DIFFERENT ROOTS IN DIFFERENT BASES, and the disagreement is on this line: 432 leaves 0
    mod 9 (the sealed harmonic marker) but 5 mod 7, the base-eight invariant. Nine divides 432; seven does not.
    A number is not harmonic — a number WRITTEN IN A BASE is. -/
theorem bases_disagree_on_root : (432 % 9 = 0) ∧ (432 % 7 = 5) ∧ (432 % 9 ≠ 432 % 7) := by decide

/-- DIGIT REVERSAL ACTS ON THE SPELLING, NOT THE NUMBER. k432 fuses its two factorisations through rev(72) = 27,
    and 16 × 27 = 432 holds. It holds for that spelling alone: rev(75) = 57 gives 912 and rev(78) = 87 gives
    1392, neither of them 432. The line proves the identity AND its two failures, so what was read as an
    involution over wings is shown to be a property of one written number. -/
theorem reversal_escapes_arithmetic : (16 * 27 = 432) ∧ (16 * 57 ≠ 432) ∧ (16 * 87 ≠ 432) := by decide

/-- THE ARITHMETIC IS UNTOUCHED. Every digital-root fact the ledger seals stays exactly true — 432 % 9 = 0, and
    the nine units sum to 45 whose digits sum to 9. SCOPE: what this wing decides is that such facts are
    BASE-RELATIVE, never that they are wrong. The remainder is exact; the harmony read into it is notational,
    and the two are different claims. -/
theorem root_survives_the_reading : (432 % 9 = 0) ∧ (45 % 9 = 0) ∧ (4 + 5 = 9) := by decide

/-- AND WHY MULTIPLES OF NINE ARE NEVER EVIDENCE: every multiple of nine has digital root nine by construction,
    so finding one carries no information. Walked over the first eight multiples — 9, 18, 27, …, 72 — all leave
    remainder zero, every time, because that is what a multiple is. -/
theorem nine_divides_by_construction : ((List.range' 1 8).map (fun k => 9 * k)).all (fun n => n % 9 == 0) := by decide
