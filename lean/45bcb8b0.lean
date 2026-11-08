-- lean/Leadde5612a2.lean — SEALED LEAD de5612a2 of lean/leads.json (trial #1), the arithmetic of the 42-state paired walk.
--
-- LEAD: "The 42-state paired walk: doubling in Z/9 (period 6) against stepping by two in Z/7 (period 7). Coprime, so the
-- pair has period exactly 42 and visits all 42 states before returning. Forward and inverse walks meet at step 21 (8,1)
-- and step 42 (1,1) — two contact points per revolution."
--
-- WHAT THIS FILE ENCODES, AND WHAT IT DOES NOT. The walk is the pair (x_n, y_n) = (2^n mod 9, (1 + 2n) mod 7), with both
-- walks starting at 1. That start is the one under which the lead's own contact points hold; the lead text does not state
-- it, so the choice is recorded here, not hidden.
--   · UNCAPPED: the period. Both walks repeat, so the pair repeats every 42 steps for EVERY natural n. Proved below for all n.
--   · FINITE, BY NATURE: the claims that the first return is at step 42 and that all 42 states are visited. Both concern
--     the first 42 steps, so they are checked over that range by `decide`.
--   · NOT ENCODED: the INVERSE walk meets the forward one at those steps. No inverse walk is defined in the lead, so the
--     meeting is not encoded, and this file does not settle it. The boundary in leads.json says: refuse the identification
--     with the Z/9 vortex, keep the arithmetic. This file keeps the arithmetic.

-- ── the arithmetic of `%`, rebuilt axiom-free ──────────────────────────────────────────────────────────────────────────
--
-- WHY THESE EXIST. The uncapped periods were first proved with `Nat.pow_add`, `Nat.mul_mod`, `Nat.mod_mod` and `omega`, and
-- the kernel's `#print axioms` answered [propext, Quot.sound]: every `%` lemma in core is proved by `simp`/`omega` and
-- borrows propext (measured 2026-11-08: Nat.mod_eq, Nat.add_mul_mod_self_left, Nat.mul_mod, Nat.mod_eq_sub_mod, even
-- Nat.mul_assoc). This ledger's witness admits no axiom, so the periods are proved here from Nat.mod's OWN equations,
-- which are axiom-free — Nat.mod's match on a successor (definitional), Nat.modCore.eq_1 and Nat.modCore.go.eq_1 — plus
-- the core facts the kernel seals without axioms: Nat.succ_sub_succ_eq_sub, Nat.add_assoc, Nat.add_right_comm,
-- Nat.mul_two, Nat.pow_succ, Nat.le_add_left, dif_pos/dif_neg. Nothing here is a new claim; it is the same arithmetic
-- with the trust base the ledger states: the kernel alone.

/-- the fuel-bounded worker answers the same whatever fuel it was handed, once the fuel exceeds its argument -/
theorem de5612a2_go_fuel (y : Nat) (hy : 0 < y) : ∀ (f₁ x : Nat) (h₁ : x < f₁) (f₂ : Nat) (h₂ : x < f₂),
    Nat.modCore.go y hy f₁ x h₁ = Nat.modCore.go y hy f₂ x h₂ := by
  intro f₁
  induction f₁ with
  | zero => intro x h₁; exact absurd h₁ (Nat.not_succ_le_zero x)
  | succ f ih =>
    intro x h₁ f₂ h₂
    cases f₂ with
    | zero => exact absurd h₂ (Nat.not_succ_le_zero x)
    | succ g =>
      rw [Nat.modCore.go.eq_1, Nat.modCore.go.eq_1]
      by_cases h : y ≤ x
      · rw [dif_pos h, dif_pos h]; exact ih (x - y) _ g _
      · rw [dif_neg h, dif_neg h]

/-- x + m − m = x, by the definitional recursion of subtraction (core's Nat.add_sub_cancel borrows propext) -/
theorem de5612a2_add_sub_self (x : Nat) : ∀ m : Nat, x + m - m = x
  | 0 => rfl
  | m + 1 => by
    show (x + m).succ - m.succ = x
    rw [Nat.succ_sub_succ_eq_sub]
    exact de5612a2_add_sub_self x m

theorem de5612a2_go_congr (y : Nat) (hy : 0 < y) (f₁ a : Nat) (h₁ : a < f₁) (f₂ b : Nat) (h₂ : b < f₂) (hab : a = b) :
    Nat.modCore.go y hy f₁ a h₁ = Nat.modCore.go y hy f₂ b h₂ := by
  subst hab
  exact de5612a2_go_fuel y hy f₁ a h₁ f₂ h₂

/-- one subtraction of the modulus changes nothing: modCore (x + m) m = modCore x m -/
theorem de5612a2_modCore_add_self (x m : Nat) (hm : 0 < m) : Nat.modCore (x + m) m = Nat.modCore x m := by
  rw [Nat.modCore.eq_1, Nat.modCore.eq_1, dif_pos hm, dif_pos hm, Nat.modCore.go.eq_1 m hm (x + m) (x + m),
    dif_pos (Nat.le_add_left m x)]
  exact de5612a2_go_congr m hm (x + m) (x + m - m) _ x.succ x _ (de5612a2_add_sub_self x m)

/-- (x + (m+1)) % (m+1) = x % (m+1) — core's Nat.add_mod_right, without its propext -/
theorem de5612a2_mod_add_self (x m : Nat) : (x + (m + 1)) % (m + 1) = x % (m + 1) := by
  show (if m + 1 ≤ x + (m + 1) then Nat.modCore (x + (m + 1)) (m + 1) else x + (m + 1)) = x % (m + 1)
  rw [if_pos (Nat.le_add_left (m + 1) x), de5612a2_modCore_add_self x (m + 1) (Nat.zero_lt_succ m)]
  cases x with
  | zero =>
    show Nat.modCore 0 (m + 1) = 0
    rw [Nat.modCore.eq_1, dif_pos (Nat.zero_lt_succ m), Nat.modCore.go.eq_1, dif_neg (Nat.not_succ_le_zero m)]
  | succ y =>
    show Nat.modCore (y + 1) (m + 1) = if m + 1 ≤ y + 1 then Nat.modCore (y + 1) (m + 1) else y + 1
    by_cases h : m + 1 ≤ y + 1
    · rw [if_pos h]
    · rw [if_neg h, Nat.modCore.eq_1, dif_pos (Nat.zero_lt_succ m), Nat.modCore.go.eq_1, dif_neg h]

/-- (a + (m+1)·k) % (m+1) = a % (m+1) — core's Nat.add_mul_mod_self_left, without its propext -/
theorem de5612a2_add_mul_mod_self (a m : Nat) : ∀ k : Nat, (a + (m + 1) * k) % (m + 1) = a % (m + 1)
  | 0 => rfl
  | k + 1 => by
    rw [show a + (m + 1) * (k + 1) = a + (m + 1) * k + (m + 1) from (Nat.add_assoc a ((m + 1) * k) (m + 1)).symm,
      de5612a2_mod_add_self, de5612a2_add_mul_mod_self a m k]

theorem de5612a2_mod_add_nine (x : Nat) : (x + 9) % 9 = x % 9 := de5612a2_mod_add_self x 8
theorem de5612a2_mod_add_fourteen (x : Nat) : (x + 14) % 7 = x % 7 := de5612a2_add_mul_mod_self x 6 2
theorem de5612a2_mod_add_eighty_four (x : Nat) : (x + 84) % 7 = x % 7 := de5612a2_add_mul_mod_self x 6 12

/-- doubling mod 9 reads only the residue: (a·2) % 9 = ((a % 9)·2) % 9, by descent in steps of 9 -/
theorem de5612a2_mul_two_mod_nine : ∀ a : Nat, (a * 2) % 9 = ((a % 9) * 2) % 9
  | 0 => rfl | 1 => rfl | 2 => rfl | 3 => rfl | 4 => rfl | 5 => rfl | 6 => rfl | 7 => rfl | 8 => rfl
  | b + 9 => by
    have ih := de5612a2_mul_two_mod_nine b
    rw [Nat.mul_two] at ih
    rw [Nat.mul_two, de5612a2_mod_add_nine,
      show b + 9 + (b + 9) = b + b + 9 + 9 from by rw [← Nat.add_assoc, Nat.add_right_comm b 9 b],
      de5612a2_mod_add_nine, de5612a2_mod_add_nine]
    exact ih

theorem de5612a2_mul_two_mod_nine_congr (a b : Nat) (h : a % 9 = b % 9) : (a * 2) % 9 = (b * 2) % 9 := by
  rw [de5612a2_mul_two_mod_nine a, de5612a2_mul_two_mod_nine b, h]

-- ── uncapped periods, for every natural n ──────────────────────────────────────────────────────────────────────────────

theorem doubling_repeats_every_six (n : Nat) : 2 ^ (n + 6) % 9 = 2 ^ n % 9 := by
  induction n with
  | zero => decide +kernel
  | succ k ih =>
    rw [Nat.add_right_comm, Nat.pow_succ, Nat.pow_succ]
    exact de5612a2_mul_two_mod_nine_congr _ _ ih

/-- 42 = 7 · 6: the period-six theorem applied seven times. (The direct induction elaborated the same step the
period-six proof takes, yet timed out at `whnf` on 2^(k+42); seven rewrites by the sealed six-step do not.) -/
theorem doubling_repeats_every_forty_two (n : Nat) : 2 ^ (n + 42) % 9 = 2 ^ n % 9 := by
  rw [show n + 42 = n + 36 + 6 from (Nat.add_assoc n 36 6).symm, doubling_repeats_every_six,
    show n + 36 = n + 30 + 6 from (Nat.add_assoc n 30 6).symm, doubling_repeats_every_six,
    show n + 30 = n + 24 + 6 from (Nat.add_assoc n 24 6).symm, doubling_repeats_every_six,
    show n + 24 = n + 18 + 6 from (Nat.add_assoc n 18 6).symm, doubling_repeats_every_six,
    show n + 18 = n + 12 + 6 from (Nat.add_assoc n 12 6).symm, doubling_repeats_every_six,
    show n + 12 = n + 6 + 6 from (Nat.add_assoc n 6 6).symm, doubling_repeats_every_six,
    doubling_repeats_every_six]

theorem stepping_repeats_every_seven (n : Nat) : (1 + 2 * (n + 7)) % 7 = (1 + 2 * n) % 7 := by
  rw [show 1 + 2 * (n + 7) = 1 + 2 * n + 14 from (Nat.add_assoc 1 (2 * n) 14).symm]
  exact de5612a2_mod_add_fourteen _

theorem stepping_repeats_every_forty_two (n : Nat) : (1 + 2 * (n + 42)) % 7 = (1 + 2 * n) % 7 := by
  rw [show 1 + 2 * (n + 42) = 1 + 2 * n + 84 from (Nat.add_assoc 1 (2 * n) 84).symm]
  exact de5612a2_mod_add_eighty_four _

theorem pair_repeats_every_forty_two (n : Nat) :
    2 ^ (n + 42) % 9 = 2 ^ n % 9 ∧ (1 + 2 * (n + 42)) % 7 = (1 + 2 * n) % 7 :=
  ⟨doubling_repeats_every_forty_two n, stepping_repeats_every_forty_two n⟩

-- ── the lead ────────────────────────────────────────────────────────────────────────────────────────────────────────────

/-- The 42-state paired walk: the pair repeats for every n; it first returns to (1,1) at step 42; it visits all 42 states
within one period; and it passes through the two contact points (8,1) at step 21 and (1,1) at step 42. -/
def lead_de5612a2 : Prop :=
  (∀ n : Nat, 2 ^ (n + 42) % 9 = 2 ^ n % 9 ∧ (1 + 2 * (n + 42)) % 7 = (1 + 2 * n) % 7) ∧
  -- finite, by nature: no earlier return to the start (1,1) between steps 1 and 41
  ((List.range 42).all (fun n => n == 0 || !((2 ^ n % 9 == 1) && ((1 + 2 * n) % 7 == 1)))) = true ∧
  -- finite, by nature: every pair (x, y) with x a unit of Z/9 and y in Z/7 is visited within one period
  ([1, 2, 4, 8, 7, 5].all (fun x => (List.range 7).all (fun y =>
    (List.range 42).any (fun n => (2 ^ n % 9 == x) && ((1 + 2 * n) % 7 == y))))) = true ∧
  -- the two contact points named by the lead
  ((2 ^ 21 % 9 == 8) && ((1 + 2 * 21) % 7 == 1)) = true ∧
  ((2 ^ 42 % 9 == 1) && ((1 + 2 * 42) % 7 == 1)) = true

/-- The kernel proves lead de5612a2: the uncapped period for every n, and the finite parts over their ranges. -/
theorem lead_de5612a2_verified : lead_de5612a2 := by
  unfold lead_de5612a2
  refine ⟨pair_repeats_every_forty_two, ?_, ?_, ?_, ?_⟩
  all_goals decide
