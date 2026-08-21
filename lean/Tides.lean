-- lean/Tides.lean — GENERATED. THE TIDES — the rule of twelfths, half-tide, the semidiurnal period and spring/neap, as decidable arithmetic. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- The sailor's rule of twelfths: over six hours a tide rises 1,2,3,3,2,1 twelfths of its range — and
    1+2+3+3+2+1 = 12, the whole range accounted for. -/
theorem rule_of_twelfths : 1 + 2 + 3 + 3 + 2 + 1 = 12 := by decide

/-- The rule is a palindrome — [1,2,3,3,2,1] reversed is itself: flood and ebb mirror, the tide fills as it
    drains. -/
theorem twelfths_symmetric : [1,2,3,3,2,1].reverse = [1,2,3,3,2,1] := by decide

/-- By the third hour the water stands at HALF its range: 1+2+3 = 6 of 12 (2·6 = 12) — half-tide falls at
    mid-flood, not the halfway time by accident but by the twelfths. -/
theorem half_tide_at_hour_three : 1 + 2 + 3 = 6 ∧ 2 * 6 = 12 := by decide

/-- Two high tides fall a lunar day apart: 12h25m = 745 minutes each, and 745·2 = 1490 = 24h50m — the
    semidiurnal rhythm, set by the Moon, not the Sun (which would give 24h). -/
theorem semidiurnal_period : 745 * 2 = 1490 := by decide

/-- A spring tide (new or full Moon, Sun and Moon aligned, their pulls ADD) exceeds a neap (at the quarter,
    pulls partly cancel): 2+1 > 2−1 — the range swells and shrinks with the phase. -/
theorem spring_exceeds_neap : 2 + 1 > 2 - 1 := by decide

/-- One semidiurnal cycle is six hours of flood and six of ebb: 6 + 6 = 12 — the tide gives back exactly the
    hours it took. -/
theorem flood_and_ebb : 6 + 6 = 12 := by decide
