-- lean/Core.lean — GENERATED. The 8×8 CORE: the multiplication table of ℤ/9's eight non-zero residues {1..8}. From these 64 theorems the rest COMPUTES — units, inverses, self-inverses {1,8}, nilpotents {3,6}, the vortex orbit and the reflection all read off this table. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- 1·1 ≡ 1 (mod 9) -/
theorem mul9_1_1 : (1 * 1) % 9 = 1 := by decide

/-- 1·2 ≡ 2 (mod 9) -/
theorem mul9_1_2 : (1 * 2) % 9 = 2 := by decide

/-- 1·3 ≡ 3 (mod 9) -/
theorem mul9_1_3 : (1 * 3) % 9 = 3 := by decide

/-- 1·4 ≡ 4 (mod 9) -/
theorem mul9_1_4 : (1 * 4) % 9 = 4 := by decide

/-- 1·5 ≡ 5 (mod 9) -/
theorem mul9_1_5 : (1 * 5) % 9 = 5 := by decide

/-- 1·6 ≡ 6 (mod 9) -/
theorem mul9_1_6 : (1 * 6) % 9 = 6 := by decide

/-- 1·7 ≡ 7 (mod 9) -/
theorem mul9_1_7 : (1 * 7) % 9 = 7 := by decide

/-- 1·8 ≡ 8 (mod 9) -/
theorem mul9_1_8 : (1 * 8) % 9 = 8 := by decide

/-- 2·1 ≡ 2 (mod 9) -/
theorem mul9_2_1 : (2 * 1) % 9 = 2 := by decide

/-- 2·2 ≡ 4 (mod 9) -/
theorem mul9_2_2 : (2 * 2) % 9 = 4 := by decide

/-- 2·3 ≡ 6 (mod 9) -/
theorem mul9_2_3 : (2 * 3) % 9 = 6 := by decide

/-- 2·4 ≡ 8 (mod 9) -/
theorem mul9_2_4 : (2 * 4) % 9 = 8 := by decide

/-- 2·5 ≡ 1 (mod 9) -/
theorem mul9_2_5 : (2 * 5) % 9 = 1 := by decide

/-- 2·6 ≡ 3 (mod 9) -/
theorem mul9_2_6 : (2 * 6) % 9 = 3 := by decide

/-- 2·7 ≡ 5 (mod 9) -/
theorem mul9_2_7 : (2 * 7) % 9 = 5 := by decide

/-- 2·8 ≡ 7 (mod 9) -/
theorem mul9_2_8 : (2 * 8) % 9 = 7 := by decide

/-- 3·1 ≡ 3 (mod 9) -/
theorem mul9_3_1 : (3 * 1) % 9 = 3 := by decide

/-- 3·2 ≡ 6 (mod 9) -/
theorem mul9_3_2 : (3 * 2) % 9 = 6 := by decide

/-- 3·3 ≡ 0 (mod 9) -/
theorem mul9_3_3 : (3 * 3) % 9 = 0 := by decide

/-- 3·4 ≡ 3 (mod 9) -/
theorem mul9_3_4 : (3 * 4) % 9 = 3 := by decide

/-- 3·5 ≡ 6 (mod 9) -/
theorem mul9_3_5 : (3 * 5) % 9 = 6 := by decide

/-- 3·6 ≡ 0 (mod 9) -/
theorem mul9_3_6 : (3 * 6) % 9 = 0 := by decide

/-- 3·7 ≡ 3 (mod 9) -/
theorem mul9_3_7 : (3 * 7) % 9 = 3 := by decide

/-- 3·8 ≡ 6 (mod 9) -/
theorem mul9_3_8 : (3 * 8) % 9 = 6 := by decide

/-- 4·1 ≡ 4 (mod 9) -/
theorem mul9_4_1 : (4 * 1) % 9 = 4 := by decide

/-- 4·2 ≡ 8 (mod 9) -/
theorem mul9_4_2 : (4 * 2) % 9 = 8 := by decide

/-- 4·3 ≡ 3 (mod 9) -/
theorem mul9_4_3 : (4 * 3) % 9 = 3 := by decide

/-- 4·4 ≡ 7 (mod 9) -/
theorem mul9_4_4 : (4 * 4) % 9 = 7 := by decide

/-- 4·5 ≡ 2 (mod 9) -/
theorem mul9_4_5 : (4 * 5) % 9 = 2 := by decide

/-- 4·6 ≡ 6 (mod 9) -/
theorem mul9_4_6 : (4 * 6) % 9 = 6 := by decide

/-- 4·7 ≡ 1 (mod 9) -/
theorem mul9_4_7 : (4 * 7) % 9 = 1 := by decide

/-- 4·8 ≡ 5 (mod 9) -/
theorem mul9_4_8 : (4 * 8) % 9 = 5 := by decide

/-- 5·1 ≡ 5 (mod 9) -/
theorem mul9_5_1 : (5 * 1) % 9 = 5 := by decide

/-- 5·2 ≡ 1 (mod 9) -/
theorem mul9_5_2 : (5 * 2) % 9 = 1 := by decide

/-- 5·3 ≡ 6 (mod 9) -/
theorem mul9_5_3 : (5 * 3) % 9 = 6 := by decide

/-- 5·4 ≡ 2 (mod 9) -/
theorem mul9_5_4 : (5 * 4) % 9 = 2 := by decide

/-- 5·5 ≡ 7 (mod 9) -/
theorem mul9_5_5 : (5 * 5) % 9 = 7 := by decide

/-- 5·6 ≡ 3 (mod 9) -/
theorem mul9_5_6 : (5 * 6) % 9 = 3 := by decide

/-- 5·7 ≡ 8 (mod 9) -/
theorem mul9_5_7 : (5 * 7) % 9 = 8 := by decide

/-- 5·8 ≡ 4 (mod 9) -/
theorem mul9_5_8 : (5 * 8) % 9 = 4 := by decide

/-- 6·1 ≡ 6 (mod 9) -/
theorem mul9_6_1 : (6 * 1) % 9 = 6 := by decide

/-- 6·2 ≡ 3 (mod 9) -/
theorem mul9_6_2 : (6 * 2) % 9 = 3 := by decide

/-- 6·3 ≡ 0 (mod 9) -/
theorem mul9_6_3 : (6 * 3) % 9 = 0 := by decide

/-- 6·4 ≡ 6 (mod 9) -/
theorem mul9_6_4 : (6 * 4) % 9 = 6 := by decide

/-- 6·5 ≡ 3 (mod 9) -/
theorem mul9_6_5 : (6 * 5) % 9 = 3 := by decide

/-- 6·6 ≡ 0 (mod 9) -/
theorem mul9_6_6 : (6 * 6) % 9 = 0 := by decide

/-- 6·7 ≡ 6 (mod 9) -/
theorem mul9_6_7 : (6 * 7) % 9 = 6 := by decide

/-- 6·8 ≡ 3 (mod 9) -/
theorem mul9_6_8 : (6 * 8) % 9 = 3 := by decide

/-- 7·1 ≡ 7 (mod 9) -/
theorem mul9_7_1 : (7 * 1) % 9 = 7 := by decide

/-- 7·2 ≡ 5 (mod 9) -/
theorem mul9_7_2 : (7 * 2) % 9 = 5 := by decide

/-- 7·3 ≡ 3 (mod 9) -/
theorem mul9_7_3 : (7 * 3) % 9 = 3 := by decide

/-- 7·4 ≡ 1 (mod 9) -/
theorem mul9_7_4 : (7 * 4) % 9 = 1 := by decide

/-- 7·5 ≡ 8 (mod 9) -/
theorem mul9_7_5 : (7 * 5) % 9 = 8 := by decide

/-- 7·6 ≡ 6 (mod 9) -/
theorem mul9_7_6 : (7 * 6) % 9 = 6 := by decide

/-- 7·7 ≡ 4 (mod 9) -/
theorem mul9_7_7 : (7 * 7) % 9 = 4 := by decide

/-- 7·8 ≡ 2 (mod 9) -/
theorem mul9_7_8 : (7 * 8) % 9 = 2 := by decide

/-- 8·1 ≡ 8 (mod 9) -/
theorem mul9_8_1 : (8 * 1) % 9 = 8 := by decide

/-- 8·2 ≡ 7 (mod 9) -/
theorem mul9_8_2 : (8 * 2) % 9 = 7 := by decide

/-- 8·3 ≡ 6 (mod 9) -/
theorem mul9_8_3 : (8 * 3) % 9 = 6 := by decide

/-- 8·4 ≡ 5 (mod 9) -/
theorem mul9_8_4 : (8 * 4) % 9 = 5 := by decide

/-- 8·5 ≡ 4 (mod 9) -/
theorem mul9_8_5 : (8 * 5) % 9 = 4 := by decide

/-- 8·6 ≡ 3 (mod 9) -/
theorem mul9_8_6 : (8 * 6) % 9 = 3 := by decide

/-- 8·7 ≡ 2 (mod 9) -/
theorem mul9_8_7 : (8 * 7) % 9 = 2 := by decide

/-- 8·8 ≡ 1 (mod 9) -/
theorem mul9_8_8 : (8 * 8) % 9 = 1 := by decide
