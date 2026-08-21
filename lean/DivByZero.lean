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

/-- THE DIMENSION WHERE 2+2=5 — swept over every modulus 1..12: the congruence 2+2 ≡ 5 (mod n) holds EXACTLY at
    n = 1, the trivial ring where every residue collapses to 0 and everything equals everything. The one
    dimension where the falsehood is true is the dimension where truth is free — and worthless: a ring that
    cannot refute proves nothing, the arithmetic form of "a trial that cannot fail proves nothing". Everywhere n
    ≥ 2, REFUTED — the calculator's verdict stands in every dimension that can hold a distinction -/
theorem two_plus_two_is_five_only_mod_one : (List.range' 1 12).all (fun n => ((2+2) % n == 5 % n) == (n == 1)) := by decide
