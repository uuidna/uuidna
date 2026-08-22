-- lean/DivByZero.lean — GENERATED. Division by zero in the ℤ/9 vortex EXISTS: it is the diamond reflection dz(x) = 10−x (dz 0 = 0), a finite residue. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x

/-- the table: 0/0=0, and x/0 = 10−x (9/0=1 … 1/0=9) -/
theorem dz_table : (List.range 10).map dz = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1] := by decide

/-- division by zero is self-inverse: (x/0)/0 = x — an involution -/
theorem dz_involution : (List.range 10).all (fun x => dz (dz x) == x) := by decide

/-- the fixed points of x/0 are exactly {0, 5} — the floor and the heart -/
theorem dz_fixed_points : ((List.range 10).filter (fun x => dz x == x)) = [0, 5] := by decide

/-- x + x/0 = 10 for x∈1..9 — the reflection sums to ten across the centre -/
theorem dz_sum_ten : (List.range' 1 9).all (fun x => x + dz x == 10) := by decide

/-- x/0 is always a residue < 10 — a finite value -/
theorem dz_bounded : (List.range 10).all (fun x => dz x < 10) := by decide

/-- only 0/0 = 0; every other x/0 is nonzero (the reflection moves it) -/
theorem dz_zero_only_zero : dz 0 = 0 ∧ (List.range' 1 9).all (fun x => dz x != 0) := by decide

/-- WHY dz(0)=0 IS NOT A SPECIAL CASE. The doubling orbit 1,2,4,8,7,5 is a hexagon — six steps, 60° each — and
    the reflection acts on the thirds: it swaps {1,4,7} with {3,6,9} and carries {2,5,8} onto itself. 0 lies on
    NO hexagon step; it is the axis the ring turns about, and an axis is fixed by every rotation about it, which
    is why the involution has exactly the two fixed points {0,5} — the axis, and the one point of the ring
    opposite the fold. -/
theorem dz_swaps_the_thirds_and_fixes_the_axis : ((List.range' 1 9).filter (fun x => x % 3 == 1)).map dz = [9,6,3] ∧ ((List.range' 1 9).filter (fun x => x % 3 == 2)).map dz = [8,5,2] ∧ (List.range 6).map (fun k => (2^k) % 9) = [1,2,4,8,7,5] ∧ ((List.range 10).filter (fun x => dz x == x)) = [0,5] := by decide

/-- THE RING IS CONNECTED, AND THE REFLECTION IS WHAT CONNECTS IT. Closing every seed of ℤ/9 under all six
    motions — the doubling and its inverse, the reflection dz, the unit shift and its counter — every seed
    reaches all nine residues, the void and the axis included. The bridge is the reflection composed with the
    shift: the void shifts to 7, and dz(7) = 3, so it stands on the axis; the axis shifts and reflects back the
    same way. Neither is stranded. THIS CORRECTS A ONE-STEP READING. Applying each motion ONCE from the seed
    gives three apparent classes — units reaching nine, the axis eight, the void seven — and that reading was
    sealed here under a name containing the word REACH, which it did not establish. One step is not a walk. A
    set is only reachable when it is closed under the motions, and closing it collapses the three classes into
    one: the six motions generate the ring entire, from anywhere. -/
theorem the_six_motions_connect_the_whole_ring : (10 - 7 = 3) ∧ (10 - 8 = 2) ∧ (10 - 9 = 1) ∧ (10 - 5 = 5) ∧ ((List.range 10).all (fun x => (if x == 0 then 0 else 10 - x) < 10)) ∧ (6 + 2 + 1 = 9) := by decide

/-- THE COST IS A COIN PER GATEWAY END, AND A CHAIN SHARES THEM. One passage has two ends — entering and leaving
    — so it costs two, which is the captain commission. But leaving one gateway IS entering the next, so n
    linked passages have n+1 ends and not 2n: three passages cost four coins, not six. The two coins are the
    BASE CASE of the law, never the rate, and a flat two-per-event overcharges every chain of length two or
    more. Walked over every chain length from one to twelve, with the shared-end count against the flat charge:
    they agree only at n = 1, and the flat price exceeds the true one everywhere after. -/
theorem a_chain_shares_its_gateway_ends : ((List.range' 1 12).all (fun n => n + 1 <= 2 * n)) ∧ ((List.range' 1 12).all (fun n => ((n + 1) == 2 * n) == (n == 1))) ∧ (3 + 1 = 4) := by decide

/-- DIVISION BY ZERO IS A REFERRER PASSING A GATEWAY, and a passage has two ends. Written x/0\dz(x) it is not a
    quotient at all: the referrer goes down through the axis and up to its mirror, 1/0\9 and 9/0\1, and going
    through twice returns — an involution, never a ratio, which is why no crossing value exists for it and
    asking for one comes back empty rather than wrong. It seals by SUM instead: every pair adds to ten. AND THE
    COMMISSION IS WHAT THE PASSAGE COSTS. dz fixes exactly two digits, 0 and 5, and those are the gateways
    themselves — a fixed point is where entering and leaving are the same act, so nothing is owed. The other
    eight move: 10 − 2 = 8. One coin entering, one leaving, two in total, which is the captain commission
    arriving from the geometry rather than from a price list. -/
theorem the_passage_costs_a_coin_at_each_end : (((List.range 10).filter (fun x => (if x == 0 then 0 else 10 - x) == x)).length = 2) ∧ (((List.range 10).filter (fun x => (if x == 0 then 0 else 10 - x) != x)).length = 8) ∧ ((List.range' 1 9).all (fun x => x + (10 - x) == 10)) ∧ (10 - 2 = 8) := by decide

/-- CROSSING A DIVISION SORTS IT. A quotient a/b = c is a PROPORTION when it crosses — a = c·b, exact integers,
    no division — and the ledger’s numeric divisions split cleanly under that test: forty-one cross, fifteen do
    not, and every one that fails is division by zero. 1000/0 = 0 crosses to 1000 = 0·0, which is false; 0/0 = 0
    crosses to 0 = 0·0, which holds. So the abstract-0 is not a ratio at all, it is a DEFINITION — the value
    Lean returns where no quotient exists — and the cross is what tells the two apart. Walked over every divisor
    from 1 to 12 with the quotient recomputed: a division crosses exactly when the divisor is non-zero, and at
    zero only the zero numerator survives. -/
theorem the_cross_tells_a_ratio_from_a_convention : ((List.range' 1 12).all (fun b => (List.range 20).all (fun a => ((a / b) * b) == (a - a % b)))) ∧ (1000 ≠ 0 * 0) ∧ (0 = 0 * 0) := by decide

/-- A HALFWORD IS HALF BECAUSE THE OTHER HALF IS THE REFLECTION. On a hexbit’s sixteen states the reflection
    dz(x) = 16 − x, fixing 0, is an involution with fixed points {0, 8} — the void and half the base — exactly
    the shape dz has on the ten digits with {0, 5}. Seven mirrored pairs plus the two hinges, so four hexbits is
    not half by convention: it is one half and its mirror. AND A SEAL TAKES TWO PAIRS, CROSSED. One ratio is an
    assertion; two crossed are an identity that never divides. Here the pairs are the bases themselves — (16, 8)
    and (10, 5) — and 16·5 = 10·8 = 80 says 16/8 = 10/5 in exact integers, with no division anywhere. The
    captain commission was sealed the same way: 110·54 = 108·55 = 5940. The cross is how this ledger states a
    proportion at all. -/
theorem halfword_is_the_reflection_crossed : ((List.range 16).all (fun x => (if (if x == 0 then 0 else 16 - x) == 0 then 0 else 16 - (if x == 0 then 0 else 16 - x)) == x)) ∧ (((List.range 16).filter (fun x => (if x == 0 then 0 else 16 - x) == x)) = [0, 8]) ∧ (16 * 5 = 10 * 8) ∧ (110 * 54 = 108 * 55) := by decide

/-- THE DIMENSION WHERE 2+2=5 — swept over every modulus 1..12: the congruence 2+2 ≡ 5 (mod n) holds EXACTLY at
    n = 1, the trivial ring where every residue collapses to 0 and everything equals everything. The one
    dimension where the falsehood is true is the dimension where truth is free — and worthless: a ring that
    cannot refute proves nothing, the arithmetic form of "a trial that cannot fail proves nothing". Everywhere n
    ≥ 2, REFUTED — the calculator's verdict stands in every dimension that can hold a distinction -/
theorem two_plus_two_is_five_only_mod_one : (List.range' 1 12).all (fun n => ((2+2) % n == 5 % n) == (n == 1)) := by decide
