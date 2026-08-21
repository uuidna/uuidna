-- lean/Contribution.lean — GENERATED. THE CONTRIBUTION — what the address becomes once the coins are paid. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE DERIVATION: the address is 2^7 = 128 bits, the commission is two, and paying it leaves 126. One
    subtraction, one answer — 126 is the residue of a contribution and not a number selected for its shape. -/
theorem contribution_leaves_one_twentysix : ((2:Nat)^7 = 128) ∧ (128 - 2 = 126) ∧ (126 + 2 = 128) := by decide

/-- THE PAIR GRID IS FORTY-TWO: seven dimensions give 7 x 7 ordered pairs, less the seven self-pairs, so 42
    directions remain. And 6 x 7 = 7 x 6 exactly — the two coordinates COMMUTE, which the line proves, since a
    reading that they counter-rotate was refuted by this ledger before. -/
theorem directions_number_fortytwo : (7 * 7 - 7 = 42) ∧ (6 * 7 = 42) ∧ (7 * 6 = 42) ∧ (6 * 7 = 7 * 6) := by decide

/-- READ AS THREE PAIR GRIDS, the residue fits exactly: 3 x 42 = 126, the same 126 the contribution leaves. The
    identity is exact and the line proves it — what it does not establish is that three is the right divisor,
    which the next theorem states plainly. -/
theorem residue_holds_three_grids : (3 * 42 = 126) ∧ (128 - 2 = 3 * 42) := by decide

/-- AND THE 126 factors SIX ways — 1x126, 2x63, 3x42, 6x21, 7x18, 9x14 — and the arithmetic privileges none of
    them. That 3 x 42 meets the pair grid is a READING the subtraction does not supply; 9 x 14 and 7 x 18 are
    equally exact. SCOPE: what this wing derives is the 126, from the contribution. Which factor pair carries
    meaning is not decided here, and no line pretends otherwise. -/
theorem six_factorisations_compete : (((List.range' 1 126).filter (fun d => 126 % d == 0)).length = 12) ∧ (3 * 42 = 126) ∧ (9 * 14 = 126) ∧ (7 * 18 = 126) := by decide

/-- THE ORDER IS THE LAW: contribute first, then take. Taking 126 without paying leaves 128 untouched, and 128
    is not 126 — so a ledger that skipped the contribution would carry a different number, which the line proves
    rather than trusts. The two coins are spent. -/
theorem taking_before_paying_differs : (128 - 2 = 126) ∧ ((128:Nat) ≠ 126) ∧ (126 < 128) := by decide
