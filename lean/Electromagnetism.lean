-- lean/Electromagnetism.lean — GENERATED. ELECTROMAGNETISM — the field domain, as decidable arithmetic, demarcated. Coulomb's law sets the sign (like charges repel, opposites attract); Ohm's law is V = I·R (12 = 2·6); electric power is V·I = I²R = 24 W; resistances add in series (3+6=9) and combine reciprocally in parallel (3·12 = 6·6); Kirchhoff conserves current at a node (5 = 2+3) and voltage around a loop (12−4−8 = 0); and Faraday induces EMF only from a CHANGING flux (constant → 0). HONEST SCOPE: the arithmetic of circuits and fields — signs, sums and exact ratios — not a full Maxwell derivation, distinct from the light waves in Optics. Every proof `by decide`, sorry-free, no Mathlib.

-- Coulomb's law sets the sign of the force by the product of charges: like charges (product > 0) repel, opposite charges (product < 0) attract — 1·1 > 0 and 1·(−1) < 0. Same sign pushes apart, opposite pulls together.
theorem coulomb_sign : ((1 * 1 : Int) > 0) ∧ ((1 * (-1) : Int) < 0) := by decide

-- Ohm's law: the voltage across a resistor is the current times the resistance, V = I·R — 12 V = 2 A · 6 Ω. Push (voltage) equals flow times friction.
theorem ohms_law : 12 = 2 * 6 := by decide

-- Electric power is voltage times current, and equally I²R: P = V·I = 12·2 = 24 W, and P = I²R = 2²·6 = 24 W. Two routes to the same dissipated power.
theorem electric_power : (12 * 2 = 24) ∧ (2*2*6 = 24) := by decide

-- Resistances in series add: current passes through each in turn, so R = R₁ + R₂ = 3 + 6 = 9 Ω. More resistors in a row, more resistance.
theorem series_resistance_adds : 3 + 6 = 9 := by decide

-- Resistances in parallel combine reciprocally (1/R = 1/R₁ + 1/R₂): two 6 Ω resistors give 3 Ω, since R·(R₁+R₂) = R₁·R₂ — 3·(6+6) = 6·6 = 36. Another path lowers the total.
theorem parallel_resistance : 3 * (6 + 6) = 6 * 6 := by decide

-- Kirchhoff's current law conserves charge at a node: what flows in flows out — 5 A in = 2 A + 3 A out. A junction stores no charge.
theorem kirchhoff_current : 5 = 2 + 3 := by decide

-- Kirchhoff's voltage law: the voltages around a closed loop sum to zero — a 12 V source spent across 4 V and 8 V drops leaves 12 − 4 − 8 = 0. Energy per charge returns to where it started.
theorem kirchhoff_voltage : (12 - 4 - 8 : Int) = 0 := by decide

-- Faraday's law induces EMF only from a CHANGING magnetic flux (EMF = −dΦ/dt): a constant flux induces nothing — 5 − 5 = 0. No change, no current; it is the change that drives induction.
theorem faraday_needs_changing_flux : (5 - 5 : Int) = 0 := by decide
