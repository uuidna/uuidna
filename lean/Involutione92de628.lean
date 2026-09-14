-- lean/Involutione92de628.lean — GENERATED. INVOLUTION e92de628: lead e92de628 of lean/leads.json (refuted), stated as lead_e92de628 over the objects its source derives, and involution_e92de628, the kernel's proof of its negation. Every proof checked by the kernel (by decide, by exact, by intro), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- DIMENSIONS, src/dimensions.ts: the seven locale rays. -/
def dimensions : List String := ["en", "bg", "de", "fr", "es", "ru", "zh"]

/-- PROJECTED, src/grid.ts: DIMENSIONS.slice(1), the rays a wing is projected into, the identity ray removed. -/
def projected : List String := dimensions.drop 1

/-- The pair grid as pairsGaps (src/grid.ts) and PAIR_SEATS (src/pairs.ts) count it: every ordered pair of
    distinct dimensions, n × (n − 1). -/
def pairGrid : Nat := dimensions.length * (dimensions.length - 1)

/-- The full grid at a wing count as gridSeats (src/grid.ts) counts it: projected rays × wings. -/
def fullGrid (wings : Nat) : Nat := projected.length * wings

/-- The claim's wing count: the lead's own full grid, 432, read back through the 6 projected rays. It is the
    historical count src/grid.ts records (the grid measured 6 × 72 = 432 when the ledger held 72 wings), kept
    because it is the lead's number; the live grid is the projected rays times the live wings. -/
def historicalWings : Nat := 72

/-- 42 tiles 432 (the pair grid divides the full grid) -/
def lead_e92de628 : Prop := pairGrid ∣ fullGrid historicalWings

/-- Non-divisibility from a bounded search: if no multiplier below n / d + 1 reaches n, and that bound already
    overshoots n, then d does not divide n. Core's decision for ∣ borrows propext, so the bound is argued here
    instead. -/
theorem not_dvd_of_bound_e92de628 : ∀ d n : Nat, (∀ j, j < n / d + 1 → d * j ≠ n) → ¬ d * (n / d + 1) ≤ n → ¬ d ∣ n := by
  intro d n hsmall hover ⟨k, hk⟩
  cases Nat.lt_or_ge k (n / d + 1) with
  | inl hlt => exact hsmall k hlt hk.symm
  | inr hge =>
    have h1 : d * (n / d + 1) ≤ d * k := Nat.mul_le_mul_left d hge
    exact hover (hk ▸ h1)

/-- The kernel refutes lead e92de628: the pair grid does not divide the full grid at the claim's 72 wings. -/
theorem involution_e92de628 : ¬ lead_e92de628 := by
  exact not_dvd_of_bound_e92de628 pairGrid (fullGrid historicalWings) (by decide) (by decide)

/-- Where the two widths part: the pair grid is 42 and the full grid 432, their greatest common divisor is the 6
    projected rays, and the 7 dimensions do not divide the 72 wings. -/
theorem anatomy_e92de628 : pairGrid = 42 ∧ fullGrid historicalWings = 432 ∧ Nat.gcd pairGrid (fullGrid historicalWings) = projected.length ∧ ¬ (dimensions.length ∣ historicalWings) := by
  exact ⟨by decide, by decide, by decide, not_dvd_of_bound_e92de628 dimensions.length historicalWings (by decide) (by decide)⟩
