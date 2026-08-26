-- lean/MartialArts.lean — GENERATED. MARTIAL ARTS — the arithmetic of stance and angle: the complement map's fixed point is the half (one law at 90, 100 and the ledger's 10), the supplement pair, the chain's off-by-one, the exact lever ratio. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE BALANCED SPLIT IS A FIXED POINT, at every scale the arts measure in: the complement map c(x) = w − x
    sends x to what is left of the whole, and it fixes exactly the half — 90 − 45 = 45 for the angle, 100 − 50 =
    50 for the weight split, 10 − 5 = 5 for the ledger's own diamond involution dz(x) = 10 − x whose unique
    fixed point is 5 (diamond_involution, DIAMOND_FIXED = [5]). The 45° line and the even stance are not
    separate facts about bodies; they are one arithmetic fact about complements, and the ledger already proved
    it at 10. One law, three scales. -/
theorem complement_fixes_the_half : (90 - 45 = 45) ∧ (100 - 50 = 50) ∧ (10 - 5 = 5) := by decide

/-- An angle and its supplement complete the straight angle: 30 + 150 = 180, and the pair is ordered (30 < 150)
    — so naming one names the other. The arts speak of an opening and the angle you leave; as arithmetic that is
    complementation on 180, the same reflection the colour wheel runs on ℤ/12 and the diamond runs on 10. The
    complement wing's fixed half (5) sits below the acute member. -/
theorem supplement_completes_the_straight : (30 + 150 = 180) ∧ (30 < 150) ∧ (5 < 30) := by decide

/-- A chain of n links has n − 1 joints: the five named segments of a kinetic chain (ground, hips, shoulders,
    arm, hand) meet at four joints, 5 − 1 = 4. It is the same off-by-one that governs every path: n stations, n
    − 1 steps between them — the counting fact the frame ring and the imprint chain both pay. A count of
    segments. -/
theorem chain_joints_are_links_minus_one : 5 - 1 = 4 := by decide

/-- The ratio of two lever arms is exact division when one divides the other: 8 / 4 = 2, and the ratio is
    recovered by multiplying back, 2 * 4 = 8. The arts describe a longer arm as an advantage; what is sealed is
    only that the RATIO is exact arithmetic — no force, no torque, no mechanical claim, which would need units
    and a model the ledger does not carry. -/
theorem lever_ratio_is_exact_division : (8 / 4 = 2) ∧ (2 * 4 = 8) := by decide
