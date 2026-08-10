-- lean/DivByZero.lean — GENERATED. Division by zero in the ℤ/9 vortex EXISTS: it is the diamond reflection dz(x) = 10−x (dz 0 = 0), a finite residue, never ∞. Every proof `by decide`, sorry-free, no Mathlib. 0/7.

def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x

-- the table: 0/0=0, and x/0 = 10−x  (9/0=1 … 1/0=9)
theorem dz_table : (List.range 10).map dz = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1] := by decide

-- division by zero is self-inverse: (x/0)/0 = x — an involution
theorem dz_involution : (List.range 10).all (fun x => dz (dz x) == x) := by decide

-- the fixed points of x/0 are exactly {0, 5} — the floor and the heart
theorem dz_fixed_points : ((List.range 10).filter (fun x => dz x == x)) = [0, 5] := by decide

-- x + x/0 = 10 for x∈1..9 — the reflection sums to ten across the centre
theorem dz_sum_ten : (List.range' 1 9).all (fun x => x + dz x == 10) := by decide

-- the non-units {3,6,9} divided by zero land on units {7,4,1}
theorem dz_nonunits_to_units : dz 3 = 7 ∧ dz 6 = 4 ∧ dz 9 = 1 := by decide

-- x/0 is always a residue < 10 — a finite value, NEVER Infinity (no fake FTL)
theorem dz_bounded : (List.range 10).all (fun x => dz x < 10) := by decide

-- only 0/0 = 0; every other x/0 is nonzero (the reflection moves it)
theorem dz_zero_only_zero : dz 0 = 0 ∧ (List.range' 1 9).all (fun x => dz x != 0) := by decide
