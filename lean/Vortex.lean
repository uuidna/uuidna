-- lean/Vortex.lean — the honest ℤ/9 & ℤ/7 vortex theorems, PORTED from millennium-solutions' Vortex.lean into
-- plain Lean 4 (Nat, `by decide` — NO Mathlib, so verifiable with a single `lean` call). Same facts, Mathlib-free.
-- The vacuous α²=1 "theorems" are NOT ported — they are tautologies (). Integrity, not truth.

-- ℤ/9 : nilpotents, inverses, the doubling circuit and its order
-- @skill: z9-ring
theorem three_sq_zero : (3*3) % 9 = 0 := by decide
-- @skill: z9-ring
theorem six_sq_zero : (6*6) % 9 = 0 := by decide
-- @skill: z9-ring
theorem three_no_inverse : (List.range 9).all (fun x => (3*x) % 9 != 1) := by decide
-- @skill: z9-ring
theorem two_mul_five : (2*5) % 9 = 1 := by decide
-- @skill: z9-ring
theorem four_mul_seven : (4*7) % 9 = 1 := by decide
-- @skill: z9-ring
theorem eight_self_inv : (8*8) % 9 = 1 := by decide
-- @skill: vortex
theorem doubling_circuit : (List.range 6).map (fun k => (2^k) % 9) = [1, 2, 4, 8, 7, 5] := by decide
-- @skill: vortex
theorem two_order_six : (2^6) % 9 = 1 := by decide

-- reflection: 10−d is an involution
-- @skill: involution
theorem tens_complement_involutive : (List.range 11).all (fun d => 10 - (10 - d) == d) := by decide

-- ℤ/7 rosette ≅ C₆
-- @skill: z7-rosette
theorem rosette_pow_six : (3^6) % 7 = 1 := by decide
-- @skill: z7-rosette
theorem rosette_orbit : (List.range 6).map (fun k => (3^(k+1)) % 7) = [3, 2, 6, 4, 5, 1] := by decide

-- 432 and the doubling digit-sum
-- @skill: foundational
theorem k432 : (432 = 2^4 * 3^3) ∧ (432 = 16 * 27) := by decide
-- @skill: vortex
theorem doubling_digit_sum : 1 + 2 + 4 + 8 + 7 + 5 = 27 := by decide

-- nuclear shell-model magic numbers (the cap sums)
def caps : List Nat := [2, 4, 2, 6, 2, 4, 8, 4, 6, 2, 10, 8, 6, 4, 2, 12, 10, 8, 6, 4, 2, 14]
-- @skill: coins
theorem magic_numbers :
  (caps.take 1).sum = 2 ∧ (caps.take 3).sum = 8 ∧ (caps.take 6).sum = 20 ∧ (caps.take 7).sum = 28
  ∧ (caps.take 11).sum = 50 ∧ (caps.take 16).sum = 82 ∧ (caps.take 22).sum = 126 := by decide

-- proton fit is exact arithmetic (108·17 = 1836), honestly NOT the measured ratio (1836.1527…)
-- @skill: science-pairs
theorem proton_fit : (108 * 17 = 1836) ∧ (108 % 9 = 0) := by decide

-- the self-sealing vortex-fraction product = 1, ported as exact integer cross-multiplication (num = den = 5040)
-- @skill: foundational
theorem self_seal : (1*1*1*8*7*5*1*2*9) = (2*2*2*7*5*3*2*3) := by decide
