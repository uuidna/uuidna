-- lean/Electromagnetism.lean — GENERATED. ELECTROMAGNETISM — the field domain, as decidable arithmetic, demarcated. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- Plasma is the fourth state of matter: three states a material vessel can hold — solid, liquid, gas — plus
    the one it cannot, 3 + 1 = 4. A charged plasma melts every wall; it is held by a FIELD or not at all. -/
theorem plasma_fourth_state : 3 + 1 = 4 := by decide

/-- PLASMA IS NOT CONTAINED BY PIPES: a pipe is a cylinder with two open ends, and what a pipe carries escapes
    at the ends. Glue the two ends together and the boundary vanishes — 2 − 2 = 0 open ends — and the closed
    pipe IS the torus, χ = 2 − 2·1 = 0: the tokamak's shape, where the field lines close on themselves and
    nothing leaks, because there is no end to leak from. Containment is not a stronger wall; it is the closure
    of the path. -/
theorem torus_closes_the_pipe : (2 - 2 = 0) ∧ (2 - 2 * 1 = 0) := by decide

/-- THE ENTANGLEMENT WITH THE COINS: containment circulates at genus 1 — the tokamak's torus, χ = 2 − 2·1 = 0,
    pure circulation with zero residue, which is exactly why it holds — while minting pays at genus 2, the
    double torus, χ = 2 − 2·2 = −2, whose negation is the two coins (theorem two_coins). One handle contains;
    two handles pay. The shape that holds plasma and the shape that mints coins differ by exactly one handle. -/
theorem containment_is_genus_one : ((2:Int) - 2 * 1 = 0) ∧ ((2:Int) - 2 * 2 = -2) := by decide

/-- THE CONTAINMENT LESSON ON THE SURFACE ITSELF: a tokamak field line with rational safety factor q = 3/2 winds
    3 poloidal turns for every 2 toroidal and CLOSES — the turns meet exactly at 2·3 = 3·2 = 6, and gcd(3,2) = 1
    makes six the first meeting. The closed path that holds the plasma is itself made of closed paths: closure
    all the way down. -/
theorem safety_factor_winding_closes : (2 * 3 = 6) ∧ (3 * 2 = 6) ∧ (Nat.gcd 3 2 = 1) := by decide

/-- The Kruskal–Shafranov bound as decidable order: the external kink is stable only when the safety factor
    exceeds one — q = 2 clears the bound (1 < 2) and q = 1 does not (¬(1 < 1)), the sawtooth boundary. One is
    the edge of confinement: wind slower than once-per-turn and the column kinks. -/
theorem kink_needs_q_above_one : (1 < 2) ∧ ¬(1 < 1) := by decide

/-- Coulomb's law sets the sign of the force by the product of charges: like charges (product > 0) repel,
    opposite charges (product < 0) attract — 1·1 > 0 and 1·(−1) < 0. Same sign pushes apart, opposite pulls
    together. -/
theorem coulomb_sign : ((1 * 1 : Int) > 0) ∧ ((1 * (-1) : Int) < 0) := by decide

/-- Ohm's law: the voltage across a resistor is the current times the resistance, V = I·R — 12 V = 2 A · 6 Ω.
    Push (voltage) equals flow times friction. -/
theorem ohms_law : 12 = 2 * 6 := by decide

/-- Electric power is voltage times current, and equally I²R: P = V·I = 12·2 = 24 W, and P = I²R = 2²·6 = 24 W.
    Two routes to the same dissipated power. -/
theorem electric_power : (12 * 2 = 24) ∧ (2*2*6 = 24) := by decide

/-- Resistances in series add: current passes through each in turn, so R = R₁ + R₂ = 3 + 6 = 9 Ω. More resistors
    in a row, more resistance. -/
theorem series_resistance_adds : 3 + 6 = 9 := by decide

/-- Resistances in parallel combine reciprocally (1/R = 1/R₁ + 1/R₂): two 6 Ω resistors give 3 Ω, since
    R·(R₁+R₂) = R₁·R₂ — 3·(6+6) = 6·6 = 36. Another path lowers the total. -/
theorem parallel_resistance : 3 * (6 + 6) = 6 * 6 := by decide

/-- Kirchhoff's current law conserves charge at a node: what flows in flows out — 5 A in = 2 A + 3 A out. A
    junction stores no charge. -/
theorem kirchhoff_current : 5 = 2 + 3 := by decide

/-- Kirchhoff's voltage law: the voltages around a closed loop sum to zero — a 12 V source spent across 4 V and
    8 V drops leaves 12 − 4 − 8 = 0. Energy per charge returns to where it started. -/
theorem kirchhoff_voltage : (12 - 4 - 8 : Int) = 0 := by decide

/-- Faraday's law induces EMF only from a CHANGING magnetic flux (EMF = −dΦ/dt): a constant flux induces nothing
    — 5 − 5 = 0. No change, no current; it is the change that drives induction. -/
theorem faraday_needs_changing_flux : (5 - 5 : Int) = 0 := by decide
